// ---------- Season 2 · Part 8: THE SANDBAR ----------
function sandStrip(t, water = 0, o = {}) {
  const { kind = 'dusk' } = o;
  const top = lerp(1060, 1160, water), op = 1 - clamp((water - .85) / .15);
  return `<defs>${skyG('ss28' + kind, kind)}</defs><rect width="${W}" height="${H}" fill="url(#ss28${kind})"/>
  ${kind === 'dusk' ? `<circle cx="540" cy="${900}" r="110" fill="#ffcf7a" opacity=".85"/>` : ''}
  <rect y="920" width="${W}" height="${H}" fill="#3c4a6a"/>${waveDashes(930, 1900, t, '#f2b68a', 28, 631, .3)}
  <g transform="translate(110,930) scale(.32)">${islandShape(0, 0, 1, '#55663f')}${lighthouse(40, -80, 1, 0, PAL_LH)}</g>
  ${ferryWreck(960, 940, .3)}
  <path d="M-20 ${top} Q540 ${top - 30} 1100 ${top} L1100 ${top + 120 * (1 - water)} Q540 ${top + 110 * (1 - water)} -20 ${top + 120 * (1 - water)} Z" fill="#d9c592" opacity="${op}"/>`;
}
function waterOver(x, y, w, h) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#3c4a6a" opacity=".85"/>${waves(y, '#f2b68a', 0, 4, 40, 0, 4, .5, x, x + w)}`; }

S.s_hook = (t, d, T) => {
  const wtr = lerp(.2, .6, seg(t, 0, d));
  const svg = sandStrip(t, wtr) + theo({ x: 220, y: 1130, s: 1.1, f: 1, look: 1 }) + `<g transform="translate(880,1150) scale(.8)">${fishBoat(0, 0, 1, { t, crew: 0, dark: false })}${vera({ x: 60, y: -85, s: .6, f: -1 })}</g>` +
    waterOver(0, lerp(1180, 1110, wtr), W, 900) + vign(.5);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.s_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = radioClose(t, { blink: 1 }) + `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="170" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 250, 'PART 8 · DAY 17', { bg: PAL.yel, size: 30 })}</g>` + vign(.55);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.s_spot = (t, d, T) => {
  const c1 = capL('s_spot', 1, T, t);
  const bars = [[260, 600, 1.0], [700, 820, .8], [420, 1080, 1.2], [760, 1400, .9]];
  const svg = `<rect width="${W}" height="${H}" fill="#6e4a30"/><g transform="rotate(-2 540 960)"><rect x="70" y="260" width="940" height="1320" rx="14" fill="#cfe0e6"/>
    ${[...Array(12)].map((_, i) => `<line x1="70" y1="${300 + i * 110}" x2="1010" y2="${300 + i * 110}" stroke="#b8cdd6" stroke-width="2"/>`).join('')}
    ${bars.map(([x, y, s], i) => `<ellipse cx="${x}" cy="${y}" rx="${160 * s}" ry="${50 * s}" fill="#e2cf9e" stroke="${i === 2 && t > c1 ? PAL.red : 'none'}" stroke-width="10" stroke-dasharray="20 14"/>`).join('')}
    ${t > c1 ? `<text x="420" y="1095" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="70" fill="${PAL.red}">X</text>` : ''}</g>
    ${pill(540, 200, 'MEETING SPOT', { bg: '#2b3a55', fg: '#fff', size: 34, bold: 700 })}` + vign(.45);
  return { svg, cam: 1.0 + .06 * (t / d) };
};
S.s_barrel = (t, d, T) => {
  const k = seg(t, 0, d);
  const bx = lerp(260, 560, k);
  const svg = sandStrip(t, .1) + theo({ x: bx - 120, y: 1130, s: 1.1, f: 1, lean: 14, walk: t * 6, armF: [80, 0], armB: [70, 0] }) +
    `<g transform="translate(${bx},1095) rotate(${k * 400})"><rect x="-38" y="-38" width="76" height="76" rx="12" fill="#c8352c"/><line x1="-38" y1="0" x2="38" y2="0" stroke="#1d1f22" stroke-width="5" opacity=".4"/></g>` + vign(.45);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.s_hide = (t, d, T) => {
  const c1 = capL('s_hide', 1, T, t);
  let svg;
  if (t < c1) svg = sandStrip(t, .1) + `<path d="M0 1920 L0 1250 Q200 1150 420 1240 Q600 1180 760 1300 L760 1920 Z" fill="#4a4436"/>` + mateo({ x: 520, y: 1400, s: 1.5, f: 1, look: 1 }) +
    `<path d="M300 1920 L300 1400 Q500 1330 720 1420 L720 1920 Z" fill="#3a3428"/>`;
  else {
    const on = MORSE_ON(t * 1.5, [1, 1]);
    svg = `<defs>${skyG('sh28', 'dusk')}</defs><rect width="${W}" height="${H}" fill="url(#sh28)"/><rect y="1100" width="${W}" height="${H}" fill="#3c4a6a"/>${waveDashes(1110, 1900, t, '#f2b68a', 24, 641, .3)}
      ${ferryWreck(540, 1150, 1.0)}${nell({ x: 470, y: 820, s: .9, f: -1 })}${on ? `<circle cx="400" cy="660" r="20" fill="#fff6d0" filter="url(#zglow)"/>` : ''}`;
  }
  return { svg: svg + vign(.45), cam: 1.0 + .04 * (t / d) };
};
S.s_arrive = (t, d, T) => {
  const k = easeOut(seg(t, 0, 1.5));
  const svg = sandStrip(t, .2) + `<g transform="translate(${lerp(1300, 860, k)},1160) scale(.9)">${fishBoat(0, 0, 1, { t, crew: 0, dark: false })}${vera({ x: 60, y: -85, s: .6, f: -1 })}${ines({ x: -110, y: -85, s: .55, f: 1, gun: false, armF: [10, 0], armB: [10, 0], eyes: 'wide' })}</g>` +
    theo({ x: 220, y: 1130, s: 1.1, f: 1, look: 1 }) + `<g transform="translate(380,1095)"><rect x="-38" y="-38" width="76" height="76" rx="12" fill="#c8352c"/></g>` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.s_vera = (t, d, T) => ({ svg: sandStrip(t, .25) + `<rect width="${W}" height="${H}" fill="#2a0a0a" opacity=".2"/>` + vera({ x: 560, y: 1730, s: 3.0, f: -1, mouth: talkM(t), armF: [60, 20] }) + vign(.55), cam: 1.02 + .04 * (t / d) });
S.s_theo = (t, d, T) => ({ svg: sandStrip(t, .25) + theo({ x: 460, y: 1730, s: 3.0, f: 1, look: .6, mouth: talkM(t) }) + vign(.55), cam: 1.03 });
S.s_stare = (t, d, T) => {
  const c1 = capL('s_stare', 1, T, t);
  const svg = sandStrip(t, .3) + `<g transform="translate(860,1160) scale(.9)">${fishBoat(0, 0, 1, { t, crew: 0, dark: false })}${vera({ x: 60, y: -85, s: .6, f: -1 })}${ines({ x: -110, y: -85, s: .55, f: 1, gun: false, armF: [10, 0], armB: [10, 0] })}</g>` +
    theo({ x: 220, y: 1130, s: 1.1, f: 1, look: 1 }) + cat({ x: 330, y: 1130, s: 1.0, f: 1, pose: 'sit', ears: 1 }) +
    (t > c1 ? `<text x="300" y="900" font-family="Anton" font-size="80" fill="#fff" stroke="#1d1f22" stroke-width="7" paint-order="stroke" opacity="${seg(t, c1, c1 + .2)}">GRRR</text>` : '') + vign(.5);
  return { svg, cam: 1.0 + .06 * (t / d) };
};
S.s_walk = (t, d, T) => {
  const k = seg(t, 0, d), wtr = lerp(.3, .55, k);
  const svg = sandStrip(t, wtr) + theo({ x: 160, y: 1130, s: 1.0, f: 1, look: 1 }) + ines({ x: lerp(760, 480, k), y: 1150, s: 1.2, f: -1, walk: t * 6, gun: false, armF: [10, 0], armB: [10, 0] }) +
    `<g transform="translate(940,1180) scale(.8)">${fishBoat(0, 0, 1, { t, crew: 0, dark: false })}${vera({ x: 60, y: -85, s: .6, f: -1 })}</g>` +
    waterOver(0, lerp(1180, 1130, wtr), W, 900) + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.s_keys = (t, d, T) => {
  const c1 = capL('s_keys', 1, T, t);
  const k = seg(t, .2, c1 + .2);
  const kx = lerp(260, 820, k), ky = lerp(900, 980, k) - Math.sin(k * 3.14) * 300;
  const svg = sandStrip(t, .55) + theo({ x: 200, y: 1130, s: 1.1, f: 1, armF: [k < .1 ? 150 : 60, 0] }) + ines({ x: 420, y: 1150, s: 1.1, f: -1, gun: false }) +
    `<g transform="translate(900,1180) scale(.9)">${fishBoat(0, 0, 1, { t, crew: 0, dark: false })}${vera({ x: 60, y: -85, s: .6, f: -1, armF: [130, 0], mouth: t > c1 + .6 ? 'o' : 'flat' })}</g>` +
    (k < 1 ? `<g transform="translate(${kx},${ky}) rotate(${t * 600})"><circle r="16" fill="none" stroke="#c9a24a" stroke-width="6"/><rect x="10" y="-4" width="40" height="8" fill="#c9a24a"/></g>` : '') + waterOver(0, 1150, W, 900) + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.s_smile = (t, d, T) => ({ svg: sandStrip(t, .6) + `<rect width="${W}" height="${H}" fill="#2a0a0a" opacity=".3"/>` + vera({ x: 560, y: 1730, s: 3.0, f: -1, mouth: talkM(t), armF: [140, 30] }) + vign(.6), cam: 1.04 + .05 * (t / d) });
S.s_boats = (t, d, T) => {
  const svg = islandWide(t, { kind: 'dusk', boatX: -500 }) + [0, 1, 2].map(i => `<g transform="translate(${lerp(1300, [150, 860, 990][i], easeOut(seg(t, i * .3, 1.6 + i * .3)))},${1170 + i * 15}) scale(.42)">${fishBoat(0, 0, 1, { t, crew: 3, dark: false })}</g>`).join('') +
    pill(540, 300, '+3 BOATS', { sc: back(seg(t, .4, .7)), bg: PAL.red, fg: '#fff', size: 44, bold: 700 }) + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.s_sink = (t, d, T) => {
  const k = seg(t, 0, d), wtr = lerp(.6, 1, k);
  const svg = sandStrip(t, wtr) + theo({ x: lerp(300, 120, k), y: 1150, s: 1.1, f: -1, walk: t * 12 }) + ines({ x: lerp(560, 260, k), y: 1150, s: 1.1, f: -1, walk: t * 12, gun: false }) +
    cat({ x: lerp(400, 200, k), y: 1150, s: .8, f: -1, pose: 'walk', t: t * 2 }) + waterOver(0, lerp(1150, 1090, k), W, 900) + vign(.5);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.s_swim = (t, d, T) => {
  const c1 = capL('s_swim', 1, T, t);
  const head = (x, y, col) => `<circle cx="${x}" cy="${y}" r="48" fill="${PAL.skin}"/><path d="M${x - 46} ${y - 10} Q${x - 44} ${y - 62} ${x} ${y - 64} Q${x + 46} ${y - 62} ${x + 48} ${y - 10} Z" fill="${col}"/>`;
  const bob = Math.sin(t * 4) * 8;
  const svg = `<defs>${skyG('sw28', 'dusk')}</defs><rect width="${W}" height="${H}" fill="url(#sw28)"/><rect y="900" width="${W}" height="${H}" fill="#3c4a6a"/>${waveDashes(910, 1900, t, '#f2b68a', 30, 651, .35)}
  <path d="M-20 900 L200 760 L360 900 Z" fill="#4a4436"/>
  ${head(420, 1100 + bob, PAL.hat)}${head(640, 1140 - bob, '#4a2e1a')}
  ${t > c1 ? cat({ x: 420, y: 1040 + bob, s: .8, f: 1, pose: 'sit', look: .3 }) + pill(420, 820, 'CAPTAIN MANGO', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 28, bold: 700 }) : ''}
  ${[0, 1, 2].map(i => `<ellipse cx="${420 + i * 30}" cy="${1150 + bob}" rx="${60 + ((t * 80 + i * 30) % 90)}" ry="18" fill="none" stroke="#f2b68a" stroke-width="3" opacity="${1 - ((t * 80 + i * 30) % 90) / 90}"/>`).join('')}` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.s_top = (t, d, T) => {
  const c1 = capL('s_top', 1, T, t);
  const z = 1 + .9 * easeIO(seg(t, .3, c1));
  const svg = `<g transform="translate(560 640) scale(${z}) translate(-560 -640)">${islandWide(t, { kind: 'dusk', boatX: -500 })}
    ${vera({ x: 600, y: 652, s: .17, f: -1 })}</g>` + `<rect width="${W}" height="${H}" fill="#2a0a1a" opacity="${seg(t, c1, d) * .35}"/>` + vign(.5);
  return { svg, cam: 1 };
};
S.end_s = tomorrowCard(9);
