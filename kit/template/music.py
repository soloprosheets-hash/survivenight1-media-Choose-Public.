import json
import numpy as np
import soundfile as sf

SR = 48000
DIR = '/home/claude/video48/'
tl = json.load(open(DIR + 'timeline.json'))
D = tl['duration'] + 0.5
n = int(D * SR); t = np.arange(n) / SR
rng = np.random.default_rng(7)
seg = {s['scene']: s for s in tl['segments']}

def lowpass(x, a):  # one-pole
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc += a * (x[i] - acc); y[i] = acc
    return y

# drone: A minor-ish, slow breathing
drone = np.zeros(n)
for f, amp in [(55, .5), (82.41, .35), (110, .25), (130.81, .12), (164.81, .08)]:
    lfo = .6 + .4 * np.sin(2 * np.pi * (0.05 + f / 5000) * t + f)
    drone += amp * lfo * np.sin(2 * np.pi * f * t + 0.3 * np.sin(2 * np.pi * .2 * t))
noise = lowpass(rng.normal(0, 1, n).astype(np.float64), 0.02)
drone += noise * 1.2 * (.5 + .5 * np.sin(2 * np.pi * .07 * t))
# tension rises over time, drops for the end card
env = np.clip(0.55 + 0.45 * t / tl['duration'], 0, 1)
env *= np.clip((t - 0) / 1.0, 0, 1)
drone *= env

# ---- generic fx from script.json "fx" fields ----
script = json.load(open(DIR + 'script.json'))
segs = tl['segments']
pulse = np.zeros(n)
def thump(at, amp):
    i = int(at * SR); L = int(0.35 * SR)
    if i + L >= n: return
    k = np.arange(L) / SR
    pulse[i:i + L] += amp * np.sin(2 * np.pi * (60 - 25 * k) * k) * np.exp(-k * 14)
hits = np.zeros(n)
def boom(at, amp=1.0):
    i = int(at * SR); L = int(2.2 * SR)
    if i < 0 or i >= n: return
    L = min(L, n - i)
    k = np.arange(L) / SR
    hits[i:i + L] += amp * (np.sin(2 * np.pi * (48 - 14 * k) * k) * np.exp(-k * 2.2)
                           + 0.25 * lowpass(rng.normal(0, 1, L), 0.05) * np.exp(-k * 5))
def riser(at, dur=0.6, amp=.5):
    i = int((at - dur) * SR); L = int(dur * SR)
    if i < 0: return
    k = np.linspace(0, 1, L)
    hits[i:i + L] += amp * lowpass(rng.normal(0, 1, L), 0.08) * k ** 2
pulsing = []
for sc, s in zip(script, segs):
    fx = sc.get('fx', {})
    if not sc.get('say'):
        boom(s['start'], 1.0)
    if 'hit' in fx: boom(s['start'], fx['hit'])
    for ci, off, amp in fx.get('booms', []):
        if ci < len(s['caps']): boom(s['caps'][ci]['start'] + off, amp)
    if fx.get('riser'): riser(s['start'])
    if fx.get('pulse'): pulsing.append((s['start'], s['end']))
for a0, a1 in pulsing:
    tt = a0
    while tt < a1:
        prog = (tt - a0) / max(.1, a1 - a0)
        thump(tt, .55 + .35 * prog); thump(tt + .22, .35 + .25 * prog)
        tt += 60 / (70 + 40 * prog)

mix = drone / np.max(np.abs(drone)) * 0.10 + pulse * 0.20 + hits * 0.30
# fade out after the end card text
fo = np.clip((D - t) / 1.2, 0, 1); mix *= fo

voice, vsr = sf.read('/home/claude/video48/voice.wav')
assert vsr == 24000
vi = np.interp(np.arange(n) / SR, np.arange(len(voice)) / vsr, voice, right=0)
# gentle ducking of the bed under speech
venv = lowpass(np.abs(vi), 0.0008)
duck = 1 - 0.45 * np.clip(venv / 0.06, 0, 1)
out = vi * 0.95 + mix * duck
out = out / max(1e-9, np.max(np.abs(out))) * 0.95
sf.write('/home/claude/video48/mix.wav', np.stack([out, out], 1).astype(np.float32), SR)
print('mix ok', round(D, 2))
