#!/bin/bash
# Rebuilds the survivenight1 pipeline in a fresh workspace. Run from the unzipped kit folder.
# Result: /home/claude/{s1fix.js,s2lib.js,wi/wi.js,fonts,tts/,*.sh,music_generic.py} and /home/claude/video48 (template episode).
set -e
K=$(cd "$(dirname "$0")" && pwd); H=/home/claude
pip install --break-system-packages -q kokoro-onnx soundfile numpy pillow >/dev/null 2>&1
mkdir -p $H/tts $H/wi
for f in kokoro-v1.0.onnx voices-v1.0.bin; do
  [ -s $H/tts/$f ] || curl -sSL -o $H/tts/$f "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/$f"
done
cp $K/shared/s1fix.js $K/shared/s2lib.js $H/; cp $K/shared/wi.js $H/wi/
cp -r $K/fonts $H/
cp $K/tools/*.sh $K/tools/music_generic.py $H/; chmod +x $H/*.sh
mkdir -p $H/video48/stills $H/video48/check; cp $K/template/* $H/video48/
python3 -c "import kokoro_onnx, playwright" && which ffmpeg >/dev/null && echo "SETUP OK"
