import json, re, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

VOICE = sys.argv[1] if len(sys.argv) > 1 else "am_michael"
SPEED = float(sys.argv[2]) if len(sys.argv) > 2 else 1.05
SR = 24000
GAP = 0.14          # silence between segments
LEAD = 0.20         # silence at very start

k = Kokoro("/home/claude/tts/kokoro-v1.0.onnx", "/home/claude/tts/voices-v1.0.bin")
script = json.load(open("/home/claude/video48/script.json"))

def strip(c):
    return re.sub(r"\{[ry]:([^}]*)\}", r"\1", c)

def radio(x):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X[(f < 350) | (f > 3200)] = 0
    y = np.fft.irfft(X, len(x))
    y = np.tanh(y / (np.max(np.abs(y)) + 1e-9) * 2.2) * .42
    y += np.random.default_rng(5).normal(0, .025, len(y))
    return y.astype(np.float32)

def trim(x, thr=0.008):
    idx = np.where(np.abs(x) > thr)[0]
    if len(idx) == 0:
        return x
    a = max(0, idx[0] - int(0.02 * SR)); b = min(len(x), idx[-1] + int(0.06 * SR))
    return x[a:b]

audio = [np.zeros(int(LEAD * SR), dtype=np.float32)]
t = LEAD
timeline = []
for i, seg in enumerate(script):
    if not seg["say"]:
        d = seg.get("hold", 2.5)
        if "fill_to" in seg:
            d = seg["fill_to"] - t
            assert d >= 2.5, f"end card too short: {d:.2f}s"
        timeline.append({"i": i, "scene": seg["scene"], "start": t, "end": t + d, "caps": []})
        audio.append(np.zeros(int(d * SR), dtype=np.float32)); t += d
        continue
    parts = seg.get("parts")
    if parts:
        chunks=[]; offs=[]; acc=0.0
        for ptxt, ppause in parts:
            a, sr = k.create(ptxt, voice=seg.get("voice", VOICE), speed=seg.get("speed", SPEED), lang="en-us")
            a = trim(np.asarray(a, dtype=np.float32)); offs.append(acc); acc += len(a)/SR + ppause
            chunks.append(a); chunks.append(np.zeros(int(ppause*SR), dtype=np.float32))
        s = np.concatenate(chunks[:-1])
    else:
        s, sr = k.create(seg["say"], voice=seg.get("voice", VOICE), speed=seg.get("speed", SPEED), lang="en-us")
    assert sr == SR
    s = s if parts else trim(np.asarray(s, dtype=np.float32))
    if seg.get("radio"):
        s = radio(s)
    s = (s * seg.get("gain", 1.0)).astype(np.float32)
    d = len(s) / SR
    gap = GAP + (0.22 if seg["say"].rstrip().endswith("...") else 0.0) + seg.get("pad", 0.0)
    # caption chunk timing proportional to character count (+ small weight per chunk)
    lens = [len(strip(c)) + 4 for c in seg["caps"]]
    tot = sum(lens); caps = []; ct = t
    for c, L in zip(seg["caps"], lens):
        cd = d * L / tot
        caps.append({"text": c, "start": round(ct, 3), "end": round(ct + cd, 3)})
        ct += cd
    if parts and len(parts) == len(seg['caps']):
        for j, c in enumerate(caps):
            c['start'] = round(t + offs[j], 3)
            c['end'] = round(t + (offs[j+1] if j+1 < len(offs) else d), 3)
    caps[-1]["end"] = round(t + d + gap, 3)
    timeline.append({"i": i, "scene": seg["scene"], "start": round(t, 3), "end": round(t + d + gap, 3), "caps": caps})
    audio.append(s); audio.append(np.zeros(int(gap * SR), dtype=np.float32))
    t += d + gap
    print(f"{i:2d} {seg['scene']:15s} {d:5.2f}s")

full = np.concatenate(audio)
peak = np.max(np.abs(full)); full = full / peak * 0.89
sf.write("/home/claude/video48/voice.wav", full, SR)
json.dump({"duration": round(t, 3), "segments": timeline}, open("/home/claude/video48/timeline.json", "w"), indent=1)
print("total", round(t, 2))
