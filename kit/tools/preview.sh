#!/bin/bash
# usage: preview.sh N  -> renders 2 stills per scene, builds review sheets
N=$1; D=/home/claude/video$N; cd $D && rm -f stills/*.jpg review_*.jpg
TS=$(python3 -c "
import json
tl=json.load(open('timeline.json')); ts=[]
for s in tl['segments']:
    a,b=s['start'],s['end']; ts += [round(a+(b-a)*0.4,2), round(a+(b-a)*0.9,2)]
print(','.join(map(str,ts)))")
python3 render.py stills "$TS" 2>&1 | grep -iE "error|exception" | head -5
python3 -c "
from PIL import Image; import glob
fs=sorted(glob.glob('stills/*.jpg')); w,h=240,427; cols=8
for k in range(0,len(fs),16):
    ch=fs[k:k+16]; rows=(len(ch)+cols-1)//cols
    sh=Image.new('RGB',(cols*w,rows*h),'white')
    for i,f in enumerate(ch): sh.paste(Image.open(f).resize((w,h)),((i%cols)*w,(i//cols)*h))
    sh.save(f'review_{k//16}.jpg',quality=82)
print(len(fs),'stills')"
