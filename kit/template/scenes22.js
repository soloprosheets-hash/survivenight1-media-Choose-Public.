// ---------- Season 2 · Part 2: THE OTHER LIGHT ----------
const MORSE_ON = (t, pat = [1, 1, 3], unit = .22) => {
  // returns true when the far light is on for a looping short-short-long pattern
  const seq = []; pat.forEach(p => { seq.push([1, p]); seq.push([0, 1]); }); seq.push([0, 4]);
  const tot = seq.reduce((a, b) => a + b[1], 0) * unit;
  let x = (t % tot) / unit;
  for (const [on, len] of seq) { if (x < len) return !!on; x -= len; }
  return false;
};
function seaView(t, o = {}) {
  const { light = 0, lx = 820, ly = 930, beam = 1 } = o;
  const ang = Math.sin(t * .7) * 18;
  return `<defs>${skyG('sv22', 'night')}</defs><rect width="${W}" height="${H}" fill="url(#sv22)"/>${stars(60, 261, 900)}
  <rect y="940" width="${W}" height="${H}" fill="#0f1d34"/>${waveDashes(950, 1700, t, '#8aa6c4', 26, 511, .25)}
  ${beam ? `<path d="M-80 640 L1200 ${760 + ang * 6} L1200 ${980 + ang * 6} Z" fill="#fff2b8" opacity=".08"/>` : ''}
  ${light ? `<circle cx="${lx}" cy="${ly}" r="14" fill="#ffe0a0" filter="url(#zglow)"/><circle cx="${lx}" cy="${ly}" r="70" fill="#ffe0a0" opacity=".16"/>` : `<circle cx="${lx}" cy="${ly}" r="5" fill="#3a3a30"/>`}
  <rect x="0" y="1720" width="${W}" height="16" fill="#0a0c10"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="1720" width="12" height="240" fill="#0a0c10"/>`).join('')}`;
}
function nightLampRoom(t, o = {}) {
  return lampRoom(t, { lens: 1, needle: .5, sky: 'night', ...o }).replace(/fill="#5d86a6"/, 'fill="#0f1d34"').replace(/<g transform="translate\(860,1290\)">[\s\S]*?FUEL<\/text><\/g>/, '');
}
function notebook(t, words, o = {}) {
  const { col = '#3a2214', sub = '' } = o;
  return `<rect width="${W}" height="${H}" fill="#2a1e14"/>
  <circle cx="540" cy="700" r="560" fill="#ffd28a" opacity=".07"/>
  <g transform="rotate(-2 540 760)"><rect x="110" y="260" width="860" height="920" fill="#efe4c8"/>
    ${[...Array(15)].map((_, i) => `<line x1="150" y1="${340 + i * 56}" x2="930" y2="${340 + i * 56}" stroke="#c7b48c" stroke-width="2"/>`).join('')}
    <text x="160" y="330" font-family="Caveat" font-weight="700" font-size="44" fill="#7a6a5a">${sub}</text>
    ${words}</g>`;
}

// 1 ---------------------------------------------------------------
S.m_hook = (t, d, T) => {
  const z = 1 + .35 * easeIO(seg(t, 0, d));
  const svg = seaView(t, { light: MORSE_ON(t) });
  return { svg: `<g transform="translate(820 930) scale(${z}) translate(-820 -930)">${svg}</g>` + vign(.6), cam: 1 };
};

// 2 ---------------------------------------------------------------
S.m_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5)), ang = t * 60;
  const svg = islandWide(t, { kind: 'night', lamp: 1 }) +
    `<path d="M560 525 L${560 + Math.cos(rad(ang)) * 1400} ${525 + Math.sin(rad(ang)) * 260 - 90} L${560 + Math.cos(rad(ang)) * 1400} ${525 + Math.sin(rad(ang)) * 260 + 90} Z" fill="#fff2b8" opacity=".16"/>
    <circle cx="560" cy="525" r="40" fill="#fff6d0" filter="url(#zglow)"/>
    <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="230" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 315, 'PART 2 · NIGHT 13', { bg: PAL.yel, size: 30 })}</g>` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 3 ---------------------------------------------------------------
S.m_watch = (t, d, T) => {
  const c1 = capL('m_watch', 1, T, t);
  const svg = nightLampRoom(t) +
    `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>` +
    (t > c1 ? theo({ x: 260, y: 1150, s: 1.45, f: 1, pose: 'sit', look: 1, mug: true, armF: [70, 60] }) + cat({ x: 820, y: 1150, s: 1.3, f: -1, pose: 'sit', look: -.4 }) : mateo({ x: 260, y: 1150, s: 1.45, f: 1, eyes: 'closed' }) + ines({ x: 820, y: 1150, s: 1.45, f: -1, gun: false })) + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 4 ---------------------------------------------------------------
S.m_pattern = (t, d, T) => {
  const c1 = capL('m_pattern', 1, T, t);
  const on = MORSE_ON(t);
  let dots = '';
  if (t > c1) [[0, 0], [1, 0], [2, 1]].forEach(([i, long]) => {
    const k = back(seg(t, c1 + i * .45, c1 + i * .45 + .3));
    dots += `<g transform="translate(${380 + i * 140},1520) scale(${k})">${long ? '<rect x="-60" y="-18" width="120" height="36" rx="18" fill="#ffe0a0"/>' : '<circle r="22" fill="#ffe0a0"/>'}</g>`;
  });
  const svg = seaView(t, { light: on }) + dots + cat({ x: 160, y: 1720, s: 1.4, f: 1, pose: 'sit', look: .8 }).replace(/#d98a3c|#b86d27|#f4d7b0/g, '#0a0c10') + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};

// 5 ---------------------------------------------------------------
S.m_mateo = (t, d, T) => {
  const svg = nightLampRoom(t) + mateo({ x: 460, y: 1730, s: 3.0, f: 1, look: .6, mouth: talkM(t), armF: [60, 40] }) + vign(.5);
  return { svg, cam: 1.02 + .04 * (t / d) };
};

// 6 ---------------------------------------------------------------
S.m_write = (t, d, T) => {
  const c1 = capL('m_write', 1, T, t);
  const n = Math.floor(seg(t, c1, d) * 9);
  const marks = '• • —   — • — •   • — • •'.slice(0, n * 3);
  const svg = t < c1
    ? nightLampRoom(t) + `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>` + mateo({ x: 420, y: 1150, s: 1.5, f: 1, pose: 'sit', look: 1, armF: [70, 70] }) +
      pill(540, 330, 'EX RADIO OPERATOR', { sc: back(seg(t, .2, .5)), bg: PAL.yel, size: 32, bold: 700 })
    : notebook(t, `<text x="170" y="460" font-family="Caveat" font-weight="700" font-size="80" fill="#3a2214">${marks}</text>
       <g transform="translate(${300 + n * 50},${520}) rotate(30)"><rect x="-10" y="-120" width="20" height="160" rx="8" fill="#d9a03a"/><path d="M-10 40 L0 70 L10 40 Z" fill="#3a2214"/></g>`, { sub: 'night 13 — light at sea' });
  return { svg: svg + vign(.5), cam: 1.0 + .04 * (t / d) };
};

// 7 ---------------------------------------------------------------
function codeWords(t, T, scene, words, col) {
  return words.map((w, i) => {
    const k = back(seg(t, capL(scene, i, T, t), capL(scene, i, T, t) + .3));
    return k > 0 ? `<text x="540" y="${560 + i * 190}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="190" fill="${col}" transform="translate(540 ${500 + i * 190}) scale(${k}) translate(-540 ${-(500 + i * 190)})">${w}</text>` : '';
  }).join('');
}
S.m_code = (t, d, T) => {
  const svg = notebook(t, codeWords(t, T, 'm_code', ['STAY', 'LIGHT', 'ON'], '#3a2214'), { sub: '• • —  — • — •  • — • •' }) + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};

// 8 ---------------------------------------------------------------
S.m_reply = (t, d, T) => {
  const flash = [.5, 1.1].some(f => t > f && t < f + .3);
  const svg = nightLampRoom(t) + `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>` +
    theo({ x: 300, y: 1150, s: 1.45, f: 1, look: 1, armF: [flash ? 120 : 90, 10] }) +
    `<rect width="${W}" height="${H}" fill="#fff8dc" opacity="${flash ? .7 : 0}"/>` +
    (t > 1.6 ? pill(540, 330, 'MESSAGE RECEIVED', { sc: back(seg(t, 1.6, 1.9)), bg: PAL.yel, size: 34, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 9 ---------------------------------------------------------------
S.m_wait = (t, d, T) => ({ svg: seaView(t, { light: 0 }) + pill(540, 330, `0:${String(Math.min(59, Math.floor(t * 18))).padStart(2, '0')}`, { bg: '#25282c', fg: '#fff', size: 40, bold: 700 }) + vign(.6), cam: 1.0 + .05 * (t / d) });

// 10 --------------------------------------------------------------
S.m_ines = (t, d, T) => {
  const svg = seaView(t, { light: 0, beam: 0 }) + ines({ x: 420, y: 1700, s: 3.0, f: 1, look: .6, mouth: talkM(t), armF: [40, 30], gun: false }) + vign(.55);
  return { svg, cam: 1.02 + .04 * (t / d) };
};

// 11 --------------------------------------------------------------
S.m_change = (t, d, T) => {
  const c1 = capL('m_change', 1, T, t);
  const svg = seaView(t, { light: MORSE_ON(t * 1.6, [3, 1, 1, 3]) }) +
    pill(540, 330, 'NEW MESSAGE', { sc: back(seg(t, .2, .5)), bg: PAL.red, fg: '#fff', size: 38, bold: 700 }) +
    (t > c1 ? `<text x="540" y="1520" text-anchor="middle" font-family="Anton" font-size="120" fill="#ffe0a0" opacity="${seg(t, c1, c1 + .3)}">3 WORDS</text>` : '') + vign(.55);
  return { svg, cam: 1.0 + .06 * (t / d) };
};

// 12 --------------------------------------------------------------
S.m_swim = (t, d, T) => {
  const svg = notebook(t, codeWords(t, T, 'm_swim', ['THEY', 'CAN', 'SWIM.'], '#a82a1e'), { sub: '— • • • •  — • — •  • • • — —' }) + vign(.6);
  const sh = t > capL('m_swim', 2, T, t) && t < capL('m_swim', 2, T, t) + .3 ? (rnd(Math.floor(t * 60)) - .5) * 16 : 0;
  return { svg: `<g transform="translate(${sh},0)">${svg}</g>`, cam: 1.0 + .07 * (t / d) };
};

// 13 --------------------------------------------------------------
S.m_puff = (t, d, T) => {
  const c1 = capL('m_puff', 1, T, t);
  const puff = easeOut(seg(t, c1, c1 + .3));
  const tail = puff > 0 ? `<g transform="translate(560,1150) scale(-1.6,1.6)">${[...Array(10)].map((_, i) => `<circle cx="${-48 - i * 3}" cy="${-10 - i * 7}" r="${(9 + 24 * puff) + Math.sin(i * 3) * 4}" fill="#d98a3c" stroke="#b86d27" stroke-width="3"/>`).join('')}</g>` : '';
  const svg = nightLampRoom(t) + `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>` +
    theo({ x: 200, y: 1150, s: 1.3, f: 1, look: 1 }) + ines({ x: 870, y: 1150, s: 1.3, f: -1, gun: false, eyes: 'wide' }) + mateo({ x: 360, y: 1150, s: 1.3, f: 1, look: 1 }) +
    tail + cat({ x: 560, y: 1150, s: 1.6, f: -1, pose: 'sit', look: -.3, ears: puff }) + (puff > 0 ? `<text x="760" y="820" font-family="Anton" font-size="80" fill="#fff" stroke="#1d1f22" stroke-width="7" paint-order="stroke" opacity="${1 - seg(t, c1 + .6, c1 + 1.4)}">POOF</text>` : '') + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};

// 14 --------------------------------------------------------------
S.m_beam = (t, d, T) => {
  const c1 = capL('m_beam', 1, T, t);
  const ang = t * 90;
  const blind = seg(t, c1, c1 + .4);
  const svg = `<rect width="${W}" height="${H}" fill="#0f1d34"/>${waveDashes(0, 1900, t, '#8aa6c4', 40, 521, .2)}
  <circle cx="540" cy="820" r="380" fill="#3a3a30"/><circle cx="540" cy="820" r="320" fill="#2c3a2a"/>
  <g transform="rotate(${ang} 540 820)"><path d="M540 820 L1200 640 L1200 1000 Z" fill="#fff2b8" opacity=".25"/></g>
  <path d="M540 820 L${540 + Math.cos(rad(60)) * 420} ${820 + Math.sin(rad(60)) * 420} A420 420 0 0 1 ${540 + Math.cos(rad(120)) * 420} ${820 + Math.sin(rad(120)) * 420} Z" fill="#0a0c10" opacity=".85"/>
  ${blind > 0 ? `<path d="M540 820 L${540 + Math.cos(rad(60)) * 420} ${820 + Math.sin(rad(60)) * 420} A420 420 0 0 1 ${540 + Math.cos(rad(120)) * 420} ${820 + Math.sin(rad(120)) * 420} Z" fill="none" stroke="${PAL.red}" stroke-width="10" stroke-dasharray="24 14" opacity="${blind}"/>` : ''}
  <circle cx="540" cy="820" r="46" fill="#e9e2d3"/><circle cx="540" cy="820" r="22" fill="#fff6d0" filter="url(#zglow)"/>
  ${blind > 0 ? pill(540, 330, 'BLIND SPOT', { sc: back(blind), bg: PAL.red, fg: '#fff', size: 42, bold: 700 }) : pill(540, 330, 'TOP VIEW', { bg: '#25282c', fg: '#fff', size: 30 })}` + vign(.4);
  return { svg, cam: 1.0 + .03 * (t / d) };
};

// 15 --------------------------------------------------------------
S.m_steps = (t, d, T) => {
  const c = [0, 1, 2, 3].map(i => capL('m_steps', i, T, t));
  const prog = seg(t, c[1], c[3] + .6);
  let prints = '';
  const n = 14;
  for (let i = 0; i < n; i++) {
    if (i / n > prog) break;
    const k = i / (n - 1), x = lerp(260, 560, k) + (i % 2 ? 30 : -30), y = lerp(1660, 1020, k), s = lerp(1.9, .8, k);
    prints += `<g transform="translate(${x},${y}) scale(${s}) rotate(${-20 + k * 10})"><ellipse rx="18" ry="30" fill="#0b141c" opacity=".85"/><ellipse cx="4" cy="-6" rx="6" ry="9" fill="#9fc3d6" opacity=".25"/>${[...Array(5)].map((_, j) => `<circle cx="${-14 + j * 7}" cy="-40" r="4.5" fill="#0b141c" opacity=".85"/>`).join('')}</g>`;
  }
  const svg = `<defs>${radGrad('fl22', [[0, '#fff6d0', .55], [1, '#fff6d0', 0]])}</defs>
  <rect width="${W}" height="${H}" fill="#08090d"/>
  <rect x="380" y="380" width="360" height="640" fill="#cfc6b4" opacity=".25"/>
  <path d="M440 1010 L440 640 Q560 520 680 640 L680 1010 Z" fill="#3a2a1c"/><rect x="${t > c[3] + .6 ? 610 : 640}" y="800" width="20" height="40" rx="6" fill="#c9a24a"/>
  ${t > c[3] + .6 ? `<path d="M680 1010 L680 640 L700 650 L700 1010 Z" fill="#0a0c10"/>` : ''}
  <rect y="1010" width="${W}" height="${H}" fill="#4a4436"/>
  <path d="M-20 1700 Q300 1650 600 1720 Q850 1780 1100 1700 L1100 ${H} L-20 ${H} Z" fill="#0f1d34"/>
  ${prints}
  <ellipse cx="${lerp(300, 560, prog)}" cy="${lerp(1600, 1060, prog)}" rx="360" ry="240" fill="url(#fl22)"/>
  ${theo({ x: 920, y: 1230, s: 1.0, f: -1, look: -.6, eyes: t > c[1] ? 'wide' : 'open', armF: [80, 20] })}
  <rect width="${W}" height="${H}" fill="#000" opacity=".2"/>` + vign(.65);
  return { svg, cam: 1.0 + .06 * (t / d) };
};

S.end_m = tomorrowCard(3);
