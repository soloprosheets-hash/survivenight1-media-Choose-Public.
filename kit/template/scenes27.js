// ---------- Season 2 · Part 7: THE TRADE ----------
function veraBoat(t, o = {}) {
  const { kind = 'dusk', x = 540, y = 1250, s = 1 } = o;
  return `<g transform="translate(${x},${y}) scale(${s})">${fishBoat(0, 0, 1, { t, crew: 0, dark: false })}
    ${vera({ x: 60, y: -85, s: .6, f: -1, look: 0 })}${ines({ x: -110, y: -85, s: .55, f: 1, gun: false, armF: [10, 0], armB: [10, 0], eyes: 'wide' })}
    <path d="M-150 -170 L-70 -170" stroke="#c9b48a" stroke-width="5"/></g>`;
}
S.t_hook = (t, d, T) => {
  const svg = `<defs>${skyG('th27', 'dusk')}</defs><rect width="${W}" height="${H}" fill="url(#th27)"/><rect y="1000" width="${W}" height="${H}" fill="#3c4a6a"/>${waveDashes(1010, 1900, t, '#f2b68a', 24, 611, .3)}` +
    veraBoat(t, { y: 1300 + Math.sin(t * 1.5) * 8, s: 1.3 }) + vign(.5);
  const z = 1 + .3 * easeIO(seg(t, 0, d));
  return { svg: `<g transform="translate(540 1000) scale(${z}) translate(-540 -1000)">${svg}</g>`, cam: 1 };
};
S.t_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = islandGround(t, { kind: 'dusk', hz: 760, gy: 860, lhX: 540, lhS: 1.25 }) + `<rect x="520" y="802" width="44" height="78" fill="#0a0c10"/>` +
    `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="170" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 250, 'PART 7 · DAY 16', { bg: PAL.yel, size: 30 })}</g>` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.t_clues = (t, d, T) => {
  const c1 = capL('t_clues', 1, T, t);
  const svg = lampRoom(t, { sky: 'dusk', needle: .4 }) + `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>
  <g transform="translate(260,1130) rotate(80)"><rect x="-60" y="-10" width="120" height="20" fill="#6b4a32"/><rect x="-50" y="10" width="14" height="80" fill="#6b4a32"/><rect x="36" y="10" width="14" height="80" fill="#6b4a32"/></g>
  ${t > c1 ? [...Array(6)].map((_, i) => `<g transform="translate(${180 + i * 130},${1300 + (i % 2) * 60}) rotate(-80)" opacity="${seg(t, c1 + i * .1, c1 + i * .1 + .2)}"><rect x="-34" y="-16" width="68" height="32" rx="14" fill="#1d1f22" opacity=".6"/><rect x="18" y="-14" width="20" height="28" rx="8" fill="#1d1f22" opacity=".6"/></g>`).join('') +
    `<path d="M620 980 q40 30 80 0 q40 -30 80 0" stroke="#c9b48a" stroke-width="10" fill="none" opacity="${seg(t, c1 + .6, c1 + 1)}"/>` + pill(540, 330, 'SIGNS OF A FIGHT', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 34, bold: 700 }) : ''}` + vign(.5);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.t_dock = (t, d, T) => {
  const svg = `<defs>${skyG('td27', 'dusk')}</defs><rect width="${W}" height="${H}" fill="url(#td27)"/><rect y="900" width="${W}" height="${H}" fill="#3c4a6a"/>${waveDashes(910, 1900, t, '#f2b68a', 24, 621, .3)}
  <path d="M-20 1300 L620 1100 L640 1140 L0 1360 Z" fill="#6b4a32"/>${[...Array(8)].map((_, i) => `<rect x="${40 + i * 75}" y="${1270 - i * 24}" width="16" height="200" fill="#4a3426"/>`).join('')}
  <rect x="600" y="1060" width="20" height="90" fill="#4a3426"/><path d="M610 1080 q40 20 60 70" stroke="#c9b48a" stroke-width="8" fill="none"/><path d="M668 1150 l10 14 M668 1150 l-6 16" stroke="#c9b48a" stroke-width="6"/>
  ${theo({ x: 420, y: 1180, s: 1.2, f: 1, look: 1, eyes: 'wide' })}${cat({ x: 300, y: 1230, s: .8, f: 1, pose: 'sit' })}
  ${pill(800, 980, 'BOAT: GONE', { sc: back(seg(t, .4, .7)), bg: PAL.red, fg: '#fff', size: 34, bold: 700 })}` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.t_radio = (t, d, T) => ({ svg: radioClose(t, { blink: 1 }) + vign(.55), cam: 1.0 + .05 * (t / d) });
S.t_vera = (t, d, T) => ({ svg: radioClose(t, { talk: 1 }) + vign(.6), cam: 1.03 + .04 * (t / d) });
S.t_vera2 = (t, d, T) => ({ svg: radioClose(t, { talk: 1 }) + `<rect width="${W}" height="${H}" fill="#b80f0f" opacity="${.05 + .05 * Math.sin(t * 4)}"/>` + vign(.6), cam: 1.07 + .04 * (t / d) });
S.t_who = (t, d, T) => {
  const svg = `<defs>${skyG('tw27', 'dusk')}</defs><rect width="${W}" height="${H}" fill="url(#tw27)"/>` + townWall(540, 1200, .8, t, {}) +
    `<rect width="${W}" height="${H}" fill="#2a0a0a" opacity=".35"/>` + vera({ x: 540, y: 1730, s: 3.0, f: -1, look: 0 }) +
    pill(540, 330, 'VERA', { sc: back(seg(t, .1, .4)), bg: PAL.red, fg: '#fff', size: 50, bold: 700 }) + vign(.55);
  return { svg, cam: 1.02 + .04 * (t / d) };
};
S.t_follow = (t, d, T) => {
  const c1 = capL('t_follow', 1, T, t), c2 = capL('t_follow', 2, T, t);
  let rings = '';
  if (t > c1) for (let i = 0; i < 3; i++) { const k = ((t - c1) * .5 + i / 3) % 1; rings += `<ellipse cx="560" cy="525" rx="${k * 900}" ry="${k * 520}" fill="none" stroke="#fff2b8" stroke-width="${6 * (1 - k)}" opacity="${1 - k}"/>`; }
  const bx = lerp(1150, 860, seg(t, 0, d));
  const svg = islandWide(t, { kind: 'night', lamp: 1 }) + `<circle cx="560" cy="525" r="40" fill="#fff6d0" filter="url(#zglow)"/>` + rings +
    `<g transform="translate(${bx},1100) scale(.35)">${fishBoat(0, 0, 1, { t, crew: 0, dark: true, lit: 1 })}</g>` +
    (t > c2 ? pill(540, 300, 'BOTH WAYS', { sc: back(seg(t, c2, c2 + .3)), bg: PAL.red, fg: '#fff', size: 40, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.t_mateo = (t, d, T) => ({ svg: nightLampRoom(t) + mateo({ x: 460, y: 1730, s: 3.0, f: 1, look: .6, mouth: talkM(t), armF: [60, 40] }) + vign(.55), cam: 1.02 + .04 * (t / d) });
S.t_nell = (t, d, T) => ({ svg: nightLampRoom(t) + nell({ x: 560, y: 1730, s: 3.0, f: -1, look: 0, mouth: talkM(t), armF: [40, 20] }) + vign(.55), cam: 1.02 + .04 * (t / d) });
S.t_plan = (t, d, T) => {
  const c1 = capL('t_plan', 1, T, t);
  const bars = [[260, 600, 1.0], [700, 820, .8], [420, 1080, 1.2], [760, 1400, .9]];
  const svg = `<rect width="${W}" height="${H}" fill="#6e4a30"/><g transform="rotate(-2 540 960)"><rect x="70" y="260" width="940" height="1320" rx="14" fill="#cfe0e6"/>
    ${[...Array(12)].map((_, i) => `<line x1="70" y1="${300 + i * 110}" x2="1010" y2="${300 + i * 110}" stroke="#b8cdd6" stroke-width="2"/>`).join('')}
    ${bars.map(([x, y, s], i) => `<ellipse cx="${x}" cy="${y}" rx="${160 * s}" ry="${50 * s}" fill="#e2cf9e" stroke="${i === 2 && t > c1 ? PAL.red : 'none'}" stroke-width="10" stroke-dasharray="20 14"/>`).join('')}
    <circle cx="200" cy="1450" r="60" fill="#7d9a5c"/><circle cx="200" cy="1450" r="18" fill="#e9e2d3"/>
    <path d="M200 1450 Q320 1250 420 1080" stroke="#22252a" stroke-width="5" stroke-dasharray="12 10" fill="none"/></g>
    ${t > c1 ? pill(420, 960, 'GONE IN 20 MIN', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 32, bold: 700 }) : pill(540, 200, "NELL'S CHART", { bg: '#2b3a55', fg: '#fff', size: 34, bold: 700 })}` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.t_blink = (t, d, T) => {
  const on = MORSE_ON(t * 1.8, [1, 1, 1, 3, 1]);
  const svg = seaView(t, { light: 0 }) + `<g transform="translate(820,945) scale(.3)">${fishBoat(0, 0, 1, { t, crew: 0, dark: true })}</g>` +
    (on ? `<circle cx="800" cy="900" r="10" fill="#ffe0a0" filter="url(#zglow)"/><circle cx="800" cy="900" r="40" fill="#ffe0a0" opacity=".2"/>` : '') +
    mateo({ x: 260, y: 1720, s: 1.6, f: 1, look: 1 }).replace(/#[0-9a-fA-F]{6}/g, '#0a0c10') + vign(.6);
  return { svg, cam: 1.0 + .06 * (t / d) };
};
S.t_ines = (t, d, T) => {
  const c1 = capL('t_ines', 1, T, t);
  const svg = notebook(t, `<text x="540" y="560" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="130" fill="#3a2214">— INES —</text>
    ${t > c1 ? `<text x="540" y="760" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="120" fill="#a82a1e" opacity="${seg(t, c1, c1 + .4)}">MORE BOATS</text><text x="540" y="900" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="120" fill="#a82a1e" opacity="${seg(t, c1 + .3, c1 + .7)}">COMING.</text>` : ''}`, { sub: 'night 16 — from vera\'s boat' }) + vign(.55);
  return { svg, cam: 1.0 + .06 * (t / d) };
};
S.end_t = tomorrowCard(8);
