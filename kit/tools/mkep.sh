#!/bin/bash
# usage: mkep.sh N PREV TIMER_SCENE
N=$1; P=$2; TS=$3
bash /home/claude/newpart.sh $N $P $TS >/dev/null
D=/home/claude/video$N
sed "s#/home/claude/video23/#/home/claude/video$N/#g" /home/claude/music_generic.py > $D/music.py
cp /home/claude/video$P/s2fix.js $D/ 2>/dev/null
grep -q s2lib $D/render.html || sed -i 's#<script src="../s1fix.js"></script>#<script src="../s1fix.js"></script>\n<script src="../s2lib.js"></script>#' $D/render.html
sed -i "s#== '[a-z_0-9]*')#== '$TS')#" $D/render.py
grep -n "s1fix\|s2lib\|scenes$N" $D/render.html
