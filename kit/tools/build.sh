#!/bin/bash
# usage: build.sh N  -> mix, render, encode to exact timeline length, verify
N=$1; D=/home/claude/video$N; cd $D
python3 music.py || exit 1
rm -f r0.log r1.log part0.mp4 part1.mp4
python3 render.py part 0 2 > r0.log 2>&1 &
python3 render.py part 1 2 > r1.log 2>&1 &
wait
grep -h done r0.log r1.log
L=$(python3 -c "import json;print(json.load(open('timeline.json'))['duration'])")
printf "file 'part0.mp4'\nfile 'part1.mp4'\n" > parts.txt
ffmpeg -v error -y -f concat -safe 0 -i parts.txt -i mix.wav -map 0:v -map 1:a -t $L -c:v libx264 -preset medium -crf 25 -maxrate 6M -bufsize 12M -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart lighthouse_zombie_part$N.mp4
echo "== part $N target $L"
ffprobe -v error -show_entries format=duration:stream=codec_type,duration -of default=nw=1 lighthouse_zombie_part$N.mp4 | tr '\n' ' '; echo
