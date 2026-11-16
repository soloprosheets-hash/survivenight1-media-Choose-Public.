// ---------- Part 13 scenes ----------
function vera(o = {}) {
  const save = { ...PAL };
  Object.assign(PAL, { coat: '#2f5a63', coatD: '#24474e', hat: '#c9c9ce', hatD: '#b3b3b8', beard: '#efdcc4', skin: '#efdcc4', skinD: '#d8c3a8', pants: '#2b2f38' });
  const g = theo(o);
  Object.assign(PAL, save);
  return g;
}
function townsfolk(x, y, s, col, f = 1, t = 0, walk = false) {
  return theo({ x, y, s, f, pose: walk ? 'walk' : 'stand', walk: walk ? t * 7 : null, look: .3 }).replace(/#dba33a/g, col).replace(/#b98329/g, col);
}
function nightHarbor(t, o = {}) {
  return `<defs>${linGrad('nh13', [[0, '#070b14'], [1, '#1d2a40']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#nh13)"/>${stars(40, 141, 700)}
  <rect y="1300" width="${W}" height="${H}" fill="#0b1422"/>${waveDashes(1310, 1900, t, '#2c4560', 20, 391, .6)}`;
}

// 1 ---------------------------------------------------------------
S.recap13 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const svg = `<defs>${morningSky('r13')}</defs><rect width="${W}" height="${H}" fill="url(#r13)"/>
  <rect y="1500" width="${W}" height="${H}" fill="#3e5d7c"/>
  <g transform="translate(540 760) scale(${1.1 + p * .2}) translate(-540 -760)">${townWall(540, 1500, 1.9, t, { lit: 1, waver: 1 })}</g>
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 13</text>
    ${pill(540, 310, 'DAY 10 · 7:30 AM', { bg: PAL.yel, size: 28 })}</g>
  ${vign(.45)}`;
  return { svg, cam: 1.0 };
};

// 2 ---------------------------------------------------------------
S.gate_open = (t, d, T) => {
  const p = t / d;
  const op = easeIO(seg(t, .2, capL('gate_open', 1, T, t)));
  const inside = seg(t, capL('gate_open', 1, T, t) - .3, capL('gate_open', 1, T, t) + .5);
  const stalls = [...Array(4)].map((_, i) => `<g transform="translate(${170 + i * 250},1180)"><rect x="-90" y="-40" width="180" height="80" fill="#8a6a4a"/><path d="M-100 -40 L100 -40 L80 -110 L-80 -110 Z" fill="${['#c8352c', '#3f86c4', '#f2c230', '#4f8a6a'][i]}"/>${[-50, 0, 50].map(x => `<circle cx="${x}" cy="-50" r="14" fill="${['#e8742a', '#7cb342', '#d9473a'][(i + x) % 3 < 0 ? 0 : Math.abs(i + x) % 3]}"/>`).join('')}</g>`).join('');
  const kids = [0, 1].map(i => townsfolk(380 + i * 300 + Math.sin(t * 3 + i) * 60, 1300, .55, ['#e8742a', '#7a5a8a'][i], i ? -1 : 1, t, true)).join('');
  const svg = `<defs>${morningSky('g13')}</defs><rect width="${W}" height="${H}" fill="url(#g13)"/>
  <g opacity="${inside}">${townWall(540, 1060, .9, t, { lit: .3 }).replace(/<rect x="-640" y="-300"[^>]*>.*?<path d="M-80 20/s, '<path d="M-80 20')}
    <rect y="1060" width="${W}" height="400" fill="#b8ab94"/>${stalls}${kids}</g>
  <rect y="1300" width="${W}" height="${H}" fill="#3e5d7c"/>${waveDashes(1310, 1900, t, '#d8e7ef', 18, 401, .45)}
  <rect x="-20" y="0" width="${lerp(560, 120, op)}" height="1310" fill="#8e9298"/><rect x="${lerp(520, 960, op)}" y="0" width="600" height="1310" fill="#8e9298"/>
  ${[...Array(30)].map((_, i) => `<line x1="0" y1="${i * 44}" x2="${W}" y2="${i * 44}" stroke="#7e8288" stroke-width="3" opacity="${1 - inside * .9}"/>`).join('')}
  ${vign(.4)}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 3 ---------------------------------------------------------------
S.vera_hello = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 11)) > .45 ? 'o' : 'flat';
  const k = back(seg(t, capL('vera_hello', 1, T, t), capL('vera_hello', 1, T, t) + .35));
  const svg = `<defs>${morningSky('v13')}</defs><rect width="${W}" height="${H}" fill="url(#v13)"/>
  <g opacity=".6">${townWall(540, 1500, 1.3, t, { lit: .6 })}</g>
  ${vera({ x: 520, y: 1720, s: 3.1, f: 1, look: .2, mouth: talk, armF: [30, 20], armB: [-10, 10] })}
  ${k > 0 ? pill(540, 300, 'VERA · HARBOR LEADER', { sc: k, bg: '#2f5a63', fg: '#fff', size: 34, bold: 700 }) : ''}
  ${vign(.5)}`;
  return { svg, cam: 1.02 + .04 * p };
};

// 4 ---------------------------------------------------------------
S.meal = (t, d, T) => {
  const p = t / d;
  const c2 = capL('meal', 2, T, t);
  const steam = x => [0, 1, 2].map(i => { const k = (t * .6 + i / 3) % 1; return `<path d="M${x - 20 + i * 20} ${-60 - k * 120} q16 -20 0 -40" stroke="#fff" stroke-width="7" fill="none" opacity="${(1 - k) * .5}" stroke-linecap="round"/>`; }).join('');
  const svg = `<rect width="${W}" height="${H}" fill="#7a5236"/>
  ${[...Array(14)].map((_, i) => `<path d="M0 ${i * 150 + 40} Q540 ${i * 150 + 20} ${W} ${i * 150 + 50}" stroke="#6a4630" stroke-width="5" fill="none"/>`).join('')}
  ${[[300, 600], [780, 600], [540, 980]].map(([x, y]) => `<g transform="translate(${x},${y})"><circle r="150" fill="#e9e3d7"/><circle r="120" fill="#d98a3c"/><circle r="120" fill="#c4702a" opacity=".3"/>${steam(0)}</g>`).join('')}
  ${t > c2 - .2 ? `<g transform="translate(540,1520)"><ellipse rx="150" ry="70" fill="#e9e3d7"/><ellipse rx="120" ry="52" fill="#fbfaf5"/></g>${cat({ x: 540, y: 1560, s: 1.6, f: 1, pose: 'sit', look: 0 })}` : ''}
  ${t > capL('meal', 1, T, t) ? pill(540, 300, 'BEDS: 4', { bg: '#f3eee2', size: 34, bold: 700, border: '#2a2c30', sc: back(seg(t, capL('meal', 1, T, t), capL('meal', 1, T, t) + .3)) }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 5 ---------------------------------------------------------------
S.catch = (t, d, T) => {
  const p = t / d;
  const look = Math.sin(t * 1.6) > 0 ? 1 : -1;
  const svg = `<defs>${linGrad('c13', [[0, '#3a2a40'], [1, '#e7a273']])}</defs><rect width="${W}" height="${H}" fill="url(#c13)"/>
  <g opacity=".7">${townWall(540, 1600, 1.4, t, { lit: 1 })}</g>
  ${ines({ x: 480, y: 1720, s: 3.1, f: 1, look, gun: false, eyes: 'open', armF: [40, 90], armB: [30, 90] })}
  ${vign(.55)}`;
  return { svg, cam: 1.02 + .04 * p };
};

// 6 ---------------------------------------------------------------
S.engine_fix = (t, d, T) => {
  const p = t / d;
  const svg = motorClose(t, { running: seg(t, d * .6, d), shake: 0, night: false }) +
    townsfolk(840, 1500, 1.4, '#5d6b7a', -1, t).replace(/<g transform="translate\(840/, '<g transform="translate(840') +
    `<g transform="translate(760,1180) rotate(-30)"><rect x="-10" y="-80" width="20" height="120" rx="8" fill="#8e9298"/><circle cy="-80" r="24" fill="none" stroke="#8e9298" stroke-width="12"/></g>` +
    (t > capL('engine_fix', 1, T, t) ? pill(540, 300, 'COST: $0', { sc: back(seg(t, capL('engine_fix', 1, T, t), capL('engine_fix', 1, T, t) + .3)), bg: '#4f8a6a', fg: '#fff', size: 44, bold: 700 }) : '') + vign(.45);
  return { svg, cam: 1.0 + .04 * p };
};

// 7 ---------------------------------------------------------------
S.wall_walk = (t, d, T) => {
  const p = t / d;
  let lights = '';
  for (let i = 0; i < 26; i++) lights += `<rect x="${rnd(i) * W}" y="${1400 + rnd(i + 5) * 400}" width="16" height="18" fill="#ffd27a" opacity="${.4 + .6 * rnd(i + 2)}"/>`;
  const svg = nightHarbor(t) + `
  <rect y="1360" width="${W}" height="${H}" fill="#1a1d24"/>${lights}
  <rect x="-20" y="1180" width="${W + 40}" height="180" fill="#3a3d43"/>${[...Array(20)].map((_, i) => `<rect x="${i * 60}" y="1150" width="34" height="30" fill="#3a3d43"/>`).join('')}
  ${theo({ x: lerp(200, 760, p), y: 1182, s: 1.4, f: 1, pose: 'walk', walk: t * 5, look: .6, armF: [Math.sin(t * 5) * 20, 10], armB: [-Math.sin(t * 5) * 20, 10] })}
  ${night(.2)}${vign(.65)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 8 ---------------------------------------------------------------
S.fence = (t, d, T) => {
  const p = t / d;
  const reveal = seg(t, capL('fence', 1, T, t) - .2, capL('fence', 1, T, t) + .8);
  let mesh = '';
  for (let i = -20; i < 40; i++) mesh += `<line x1="${i * 60}" y1="400" x2="${i * 60 + 900}" y2="1500" stroke="#8e9298" stroke-width="3" opacity=".55"/><line x1="${i * 60}" y1="1500" x2="${i * 60 + 900}" y2="400" stroke="#8e9298" stroke-width="3" opacity=".55"/>`;
  let boats = '';
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) boats += fishBoat(120 + i * 170 + r * 80, 1150 + r * 160, .22 + r * .06, { t, crew: 0, lit: .35, dark: false });
  const svg = nightHarbor(t) + `<g opacity="${.25 + .75 * reveal}">${boats}</g>
  <clipPath id="fc13"><rect x="0" y="400" width="${W}" height="1100"/></clipPath><g clip-path="url(#fc13)">${mesh}</g>
  <rect x="0" y="392" width="${W}" height="14" fill="#8e9298"/><rect x="0" y="1494" width="${W}" height="14" fill="#8e9298"/>
  <g transform="translate(540,960)"><path d="M-30 -40 Q-30 -80 0 -80 Q30 -80 30 -40" stroke="#b9bdc2" stroke-width="10" fill="none"/><rect x="-46" y="-44" width="92" height="80" rx="12" fill="#e0a830"/></g>
  ${reveal > .5 ? pill(540, 300, '12 BOATS', { sc: back(seg(reveal, .5, .8)), bg: '#c8352c', fg: '#fff', size: 44, bold: 700 }) : ''}
  ${vign(.65)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 9 ---------------------------------------------------------------
S.recognize = (t, d, T) => {
  const p = t / d;
  const svg = nightHarbor(t) + `<g transform="translate(540 1200) scale(${1 + p * .2}) translate(-540 -1200)">${fishBoat(540, 1400, 2.4, { t, crew: 0, lit: 0 })}
  <g transform="translate(330,1250)">${[0, 1, 2, 3].map(i => `<ellipse cx="0" cy="${-i * 14}" rx="${110 - i * 6}" ry="34" fill="none" stroke="#c9b48a" stroke-width="12"/>`).join('')}</g></g>
  ${pill(540, 300, 'SAME FLEET', { sc: back(seg(t, capL('recognize', 1, T, t), capL('recognize', 1, T, t) + .35)), bg: '#c8352c', fg: '#fff', size: 44, bold: 700 })}
  ${night(.2)}${vign(.7)}`;
  return { svg, cam: 1.0 };
};

// 10 --------------------------------------------------------------
S.jacket = (t, d, T) => {
  const p = t / d;
  const k = seg(t, capL('jacket', 1, T, t) - .2, capL('jacket', 1, T, t) + .6);
  const sw = Math.sin(t * 1.5) * 4;
  const svg = `<rect width="${W}" height="${H}" fill="#14181e"/>
  <rect x="140" y="300" width="800" height="1000" fill="#232830"/><rect x="180" y="340" width="720" height="520" fill="#0d1118"/>
  ${stars(10, 151, 400).replace(/cx="([\d.]+)"/g, (m, v) => `cx="${200 + v * .6}"`).replace(/cy="([\d.]+)"/g, (m, v) => `cy="${360 + +v}"`)}
  <circle cx="380" cy="1080" r="150" fill="none" stroke="#3a3d43" stroke-width="30"/>${[0, 60, 120].map(a => `<line x1="${380 + Math.cos(rad(a)) * 150}" y1="${1080 + Math.sin(rad(a)) * 150}" x2="${380 - Math.cos(rad(a)) * 150}" y2="${1080 - Math.sin(rad(a)) * 150}" stroke="#3a3d43" stroke-width="18"/>`).join('')}
  <g transform="translate(720,560) rotate(${sw})" opacity="${.15 + .85 * k}">
    <circle cx="0" cy="0" r="12" fill="#8e9298"/><path d="M-120 40 Q0 0 120 40 L140 420 L-140 420 Z" fill="#e8742a"/>
    <path d="M-120 40 L-200 300 L-150 320 L-100 120 Z M120 40 L200 300 L150 320 L100 120 Z" fill="#c45a18"/>
    <line x1="0" y1="40" x2="0" y2="420" stroke="#c45a18" stroke-width="6"/>
  </g>
  <path d="M1200 100 L700 900 L1200 1200 Z" fill="#fff7d6" opacity="${.08 * k}"/>
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 11 --------------------------------------------------------------
S.radio_room = (t, d, T) => {
  const p = t / d;
  const svg = nightHarbor(t) + `<rect x="0" y="0" width="${W}" height="1380" fill="#2a2e36"/>
  ${[...Array(8)].map((_, i) => `<line x1="0" y1="${i * 180}" x2="${W}" y2="${i * 180}" stroke="#23272e" stroke-width="6"/>`).join('')}
  <rect x="220" y="380" width="640" height="560" fill="#ffcf7a" opacity=".9"/>
  <rect x="220" y="380" width="640" height="560" fill="none" stroke="#1a1d22" stroke-width="24"/><line x1="540" y1="380" x2="540" y2="940" stroke="#1a1d22" stroke-width="14"/>
  <g transform="translate(560,940)" opacity=".92">${vera({ x: 0, y: 0, s: 1.05, f: -1, look: .5, armF: [80, 20] }).replace(/fill="#[0-9a-f]{6}"/gi, 'fill="#2a2016"')}</g>
  <rect x="320" y="820" width="180" height="100" rx="10" fill="#2a2016"/><line x1="460" y1="820" x2="480" y2="700" stroke="#2a2016" stroke-width="8"/>
  ${theo({ x: 160, y: 1980, s: 2.6, f: 1, look: 1, eyes: 'wide' })}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 12 --------------------------------------------------------------
S.vera_cold = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 10)) > .45 ? 'o' : 'flat';
  const svg = `<rect width="${W}" height="${H}" fill="#2a1e14"/>
  <path d="M540 0 L100 1200 L980 1200 Z" fill="#ffcf7a" opacity=".12"/>
  <g transform="translate(820,1130)"><rect x="-150" y="-120" width="300" height="160" rx="16" fill="#1a1d22"/><circle cx="-60" cy="-40" r="34" fill="#2c3036"/><rect x="10" y="-80" width="110" height="60" rx="8" fill="#0f2014"/><line x1="100" y1="-120" x2="120" y2="-300" stroke="#1a1d22" stroke-width="10"/></g>
  ${vera({ x: 420, y: 1720, s: 3.1, f: 1, look: .6, mouth: talk, eyes: 'open', armF: [70, 30], armB: [-10, 10] })}
  <rect width="${W}" height="${H}" fill="#3a1408" opacity=".12"/>
  ${vign(.75)}`;
  return { svg, cam: 1.02 + .06 * p };
};

// 13 --------------------------------------------------------------
S.truth = (t, d, T) => {
  const p = t / d;
  const on = seg(t, 0, d * .6);
  let lights = '';
  for (let i = 0; i < 12; i++) { const k = seg(on, i / 14, i / 14 + .1); lights += `<circle cx="${120 + (i % 6) * 170 + Math.floor(i / 6) * 80}" cy="${1210 + Math.floor(i / 6) * 160}" r="${5 + 6 * k}" fill="#ffe7a0" opacity="${k}"/>`; }
  const svg = nightHarbor(t) + `<g opacity=".9">${townWall(540, 1100, .55, t, { lit: 1, dawn: false })}</g>` +
    [...Array(2)].map((_, r) => [...Array(6)].map((_, i) => fishBoat(120 + i * 170 + r * 80, 1250 + r * 160, .22 + r * .06, { t, crew: 0, lit: 0 })).join('')).join('') + lights +
    (t > capL('truth', 2, T, t) ? pill(540, 300, 'SAFE = BAIT', { sc: back(seg(t, capL('truth', 2, T, t), capL('truth', 2, T, t) + .35)), bg: '#c8352c', fg: '#fff', size: 48, bold: 700 }) : '') + vign(.7);
  return { svg, cam: 1.0 + .05 * p };
};

// 14 --------------------------------------------------------------
S.end_card13 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 14</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE GATE</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`, cam: 1 };
};
