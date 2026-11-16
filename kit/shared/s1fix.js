// ---------- Season 1 remake: cold hooks + "Part X tomorrow" cards ----------
function replayScene(name, frac, t, extraZoom = .06) {
  const s = window.TL.segments.find(g => g.scene === name);
  const d = s.end - s.start, tt = Math.min(d - .05, d * frac + t);
  const r = S[name](tt, d, s.start + tt);
  return { svg: r.svg, cam: (r.cam || 1) + extraZoom };
}
function tomorrowCard(n, label = null) {
  return (t, d, T) => {
    const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .45, .95)), c = easeOut(seg(t, .9, 1.4));
    const g = lerp(110, 245, a) | 0;
    return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
    <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="${label ? 130 : 180}" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">${label || 'PART ' + n}</text>
    <rect x="${540 - 220 * b}" y="955" width="${440 * b}" height="6" fill="${PAL.red}"/>
    <text x="540" y="1060" text-anchor="middle" font-family="Anton" font-size="96" fill="${PAL.red}" letter-spacing="10" opacity="${b}">TOMORROW</text>
    <text x="540" y="1160" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW SO YOU DON'T MISS IT</text>`, cam: 1 };
  };
}
// cold hooks (first 3 seconds)
S.hook11 = (t, d, T) => replayScene('circling_fog', .55, t);
S.hook12 = (t, d, T) => replayScene('broadcast', .3, t);
S.hook13 = (t, d, T) => replayScene('fence', .75, t);
S.hook14 = (t, d, T) => replayScene('mango_slip', .2, t);
S.hook15 = (t, d, T) => replayScene('aground', .45, t);
// end cards
S.end_card11 = tomorrowCard(12);
S.end_card12 = tomorrowCard(13);
S.end_card13 = tomorrowCard(14);
S.end_card14 = tomorrowCard(15);
S.the_end = tomorrowCard(0, 'SEASON 2');
// finale cliffhanger: a light blinking out at sea
S.blink15 = (t, d, T) => {
  const c1 = capL('blink15', 1, T, t);
  const on = t > c1 && (Math.floor((t - c1) * 3) % 2 === 0);
  const svg = `<defs>${linGrad('bl15', [[0, '#05070f'], [1, '#1a2340']])}</defs><rect width="${W}" height="${H}" fill="url(#bl15)"/>${stars(60, 251, 950)}
  <rect y="980" width="${W}" height="${H}" fill="#0e1c34"/>${waveDashes(990, 1650, t, '#8aa6c4', 24, 501, .25)}
  ${t > c1 ? `<circle cx="860" cy="975" r="${on ? 14 : 6}" fill="#ffe0a0" filter="url(#zglow)"/><circle cx="860" cy="975" r="${on ? 70 : 22}" fill="#ffe0a0" opacity=".16"/>` : ''}
  <rect x="0" y="1700" width="${W}" height="16" fill="#08090d"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="1700" width="12" height="260" fill="#08090d"/>`).join('')}
  ${cat({ x: 300, y: 1700, s: 1.5, f: 1, pose: 'sit', look: .8, ears: t > c1 ? 1 : 0 }).replace(/#d98a3c|#b86d27|#f4d7b0/g, '#08090d')}` + vign(.6);
  const z = 1 + .25 * easeIO(seg(t, c1, d));
  return { svg: `<g transform="translate(860 975) scale(${z}) translate(-860 -975)">${svg}</g>`, cam: 1 };
};
