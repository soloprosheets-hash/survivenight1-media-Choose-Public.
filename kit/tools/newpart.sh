#!/bin/bash
# usage: newpart.sh N PREV TIMER_SCENE
N=$1; P=$2; TS=$3
D=/home/claude/video$N; S=/home/claude/video$P
mkdir -p $D/stills $D/check
cp $S/tts.py $S/render.py $S/music.py $S/render.html $S/lib.js $S/grain.png $D/
cp $S/scenes*.js $D/
sed -i "s#/home/claude/video$P/#/home/claude/video$N/#g" $D/tts.py $D/render.py $D/music.py
sed -i "s#if s\['scene'\] == '[a-z_0-9]*'#if s['scene'] == '$TS'#" $D/render.py
last=$(ls $S/scenes*.js | sed 's#.*/##' | sort -V | tail -1)
sed -i "s#<script src=\"$last\"></script>#<script src=\"$last\"></script>\n<script src=\"scenes$N.js\"></script>#" $D/render.html
grep -c "video$N" $D/render.py; grep -o "scenes[0-9]*.js" $D/render.html | tr '\n' ' '; echo
