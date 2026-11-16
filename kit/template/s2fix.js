S.recap_s2 = (t, d, T) => {
  const p = t / d, ti = easeOut(seg(t, 0, .5));
  const svg = islandWide(t, { kind: 'dawn', boatX: lerp(1100, 760, easeOut(p)) }) + `
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="230" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 315, 'PART 1 · DAY 13', { bg: PAL.yel, size: 30 })}</g>` + vign(.35);
  return { svg, cam: 1.0 + .04 * p };
};
S.hook2 = (t, d, T) => {
  const c1 = capL('hook2', 1, T, t);
  const zk = easeIO(seg(t, c1 - .4, c1 + .4)), z = 1 + .9 * zk;
  return { svg: `<g transform="translate(560 650) scale(${z}) translate(-560 -650)">${islandWide(t, { kind: 'dawn', shadow: seg(t, c1 - .2, c1 + 1.0) })}</g>` + vign(.35), cam: 1.0 };
};
S.end_card16 = tomorrowCard(2);
