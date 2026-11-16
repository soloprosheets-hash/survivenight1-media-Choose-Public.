import json, sys, subprocess
from playwright.sync_api import sync_playwright

FPS = 30
mode = sys.argv[1]  # "stills" t1,t2,...  |  "part" idx n
tl = json.load(open('/home/claude/video48/timeline.json'))
t0 = next(s['start'] for s in tl['segments'] if s['scene'] == 'wc_float')

def setup(p):
    b = p.chromium.launch(args=['--disable-gpu', '--font-render-hinting=none'])
    pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    pg.goto('file:///home/claude/video48/render.html')
    pg.evaluate(f"window.TL = {json.dumps(tl)}; window.TIMER_T0 = {t0};")
    pg.evaluate("Promise.all([document.fonts.load('700 70px Oswald'), document.fonts.load('70px Anton'), document.fonts.load('700 70px Caveat'), document.fonts.load('500 30px Oswald')])")
    pg.evaluate("document.fonts.ready")
    return b, pg

with sync_playwright() as p:
    b, pg = setup(p)
    if mode == 'stills':
        for tt in sys.argv[2].split(','):
            name = pg.evaluate(f"renderAt({float(tt)})")
            pg.screenshot(path=f'/home/claude/video48/stills/s_{float(tt):06.2f}.jpg', type='jpeg', quality=85)
            print(tt, name)
    else:
        idx, n = int(sys.argv[2]), int(sys.argv[3])
        total = int(round(tl['duration'] * FPS))
        per = (total + n - 1) // n
        a, z = idx * per, min(total, (idx + 1) * per)
        ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', str(FPS), '-c:v', 'mjpeg', '-i', '-',
                               '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
                               f'/home/claude/video48/part{idx}.mp4'], stdin=subprocess.PIPE)
        for f in range(a, z):
            pg.evaluate(f"renderAt({f / FPS})")
            ff.stdin.write(pg.screenshot(type='jpeg', quality=93))
            if (f - a) % 150 == 0:
                print(idx, f, '/', z, flush=True)
        ff.stdin.close(); ff.wait()
        print('done', idx, z - a)
    b.close()
