// ---------- Part 8 scenes ----------
function fishBoat(x, y, s = 1, o = {}) {
  const { t = 0, crew = 3, dark = true, lit = 0, driver = 0, ph = 0, crewOp = 1 } = o;
  const hull = dark ? '#1c2a30' : '#2f5a63', cab = dark ? '#232c33' : '#d8d2c2', rust = dark ? '#3a2a22' : '#9a5a3a';
  let crewG = '';
  for (let i = 0; i < crew; i++) crewG += zomb({ x: -150 + i * 85, y: -70, s: .38, t, ph: ph + i, col: '#05070b', eyes: 1, armsUp: .8 });
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="70" y="-230" width="130" height="150" fill="${cab}"/><rect x="70" y="-230" width="130" height="16" fill="${rust}"/>
    <rect x="90" y="-196" width="90" height="56" fill="${lit ? '#ffcf7a' : '#0c1016'}" opacity="${lit ? .5 + lit * .5 : 1}"/>
    ${driver ? `<g opacity="${driver}"><circle cx="135" cy="-176" r="16" fill="#0a0c10"/><rect x="118" y="-162" width="34" height="26" rx="8" fill="#0a0c10"/><path d="M114 -186 L156 -186 L150 -198 L120 -198 Z" fill="#0a0c10"/></g>` : ''}
    <line x1="-40" y1="-80" x2="-40" y2="-330" stroke="${cab}" stroke-width="10"/><line x1="-40" y1="-310" x2="60" y2="-230" stroke="${cab}" stroke-width="4"/>
    <g opacity="${crewOp}">${crewG}</g>
    <path d="M-280 -80 L280 -80 Q260 30 190 50 L-220 50 Q-270 20 -280 -80 Z" fill="${hull}"/>
    <path d="M-280 -80 L280 -80 L276 -62 L-278 -62 Z" fill="${rust}"/>
    <path d="M-200 -20 l30 40 M-60 -30 l20 50 M100 -20 l10 40" stroke="${rust}" stroke-width="6" opacity=".6"/>
  </g>`;
}

// 1 ---------------------------------------------------------------
S.recap8 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const svg = `
  <defs>${linGrad('r8s', [[0, '#7d9cc4'], [.6, '#f2b08a'], [1, '#ffe0a8']])}${linGrad('r8sea', [[0, '#6f8fae'], [1, '#2f4a68']])}</defs>
  <rect width="${W}" height="1300" fill="url(#r8s)"/>
  <rect y="1300" width="${W}" height="${H}" fill="url(#r8sea)"/>
  ${waveDashes(1310, 1900, t, '#d8e7ef', 30, 271, .45)}
  ${platform(540, 1320, 1.45, { t, laundry: 1 })}
  ${theo({ x: 300, y: 830, s: .42, f: 1, look: 1 })}${ines({ x: 360, y: 830, s: .42, f: -1, gun: false })}${mateo({ x: 420, y: 830, s: .42, f: -1 })}
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 8</text>
    ${pill(540, 310, 'DAY 4 · 6:40 AM', { bg: PAL.yel, size: 28 })}</g>
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 2 ---------------------------------------------------------------
S.what = (t, d, T) => {
  const p = t / d;
  const pt = easeOut(seg(t, capL('what', 1, T, t), capL('what', 1, T, t) + .5));
  const svg = `
  <defs>${morningSky('w8s')}</defs>
  <rect width="${W}" height="${H}" fill="url(#w8s)"/>
  <rect y="1000" width="${W}" height="${H}" fill="#56789a"/>
  ${waveDashes(1010, 1900, t, '#d8e7ef', 30, 281, .4)}
  <rect x="-20" y="1110" width="${W + 40}" height="12" fill="#2a2e36"/>${[...Array(10)].map((_, i) => `<rect x="${i * 120}" y="1110" width="8" height="150" fill="#2a2e36"/>`).join('')}
  ${deckFloor(1250)}
  ${theo({ x: 170, y: 1400, s: 1.5, f: 1, look: 1, eyes: pt > .5 ? 'wide' : 'open' })}
  ${ines({ x: 410, y: 1400, s: 1.5, f: 1, look: 1, gun: false })}
  ${mateo({ x: 680, y: 1400, s: 1.55, f: 1, look: 1, armF: [lerp(10, 125, pt), 0], armB: [-10, 10] })}
  ${cat({ x: 900, y: 1405, s: .85, f: -1, pose: 'sit', look: -.4 })}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 3 ---------------------------------------------------------------
S.explain = (t, d, T) => {
  const p = t / d;
  let arrows = '';
  for (let i = 0; i < 5; i++) {
    const y0 = 420 + i * 120;
    arrows += `<path d="M60 ${y0} Q420 ${y0 + 160} 600 ${940 + (i - 2) * 30}" stroke="#7cb6e2" stroke-width="10" fill="none" stroke-dasharray="26 18" stroke-dashoffset="${-t * 80}" opacity=".7"/>`;
  }
  let boats = '';
  for (let i = 0; i < 4; i++) {
    const k = ((t * .12 + i * .25) % 1);
    const y0 = 420 + i * 140;
    const bx = lerp(60, 580, k), by = lerp(y0, 940, k) + Math.sin(k * 3.14) * 80;
    boats += `<g transform="translate(${bx},${by}) scale(.12)">${fishBoat(0, 0, 1, { t, crew: 2 })}</g>`;
  }
  const k2 = back(seg(t, .3, .7));
  const svg = `
  <rect width="${W}" height="${H}" fill="#14202e"/>
  ${[...Array(28)].map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${H}" stroke="#1a2838" stroke-width="2"/>`).join('')}
  ${[...Array(50)].map((_, i) => `<line x1="0" y1="${i * 40}" x2="${W}" y2="${i * 40}" stroke="#1a2838" stroke-width="2"/>`).join('')}
  ${arrows}${boats}
  <g transform="translate(680,960)"><rect x="-50" y="-50" width="100" height="100" fill="#cfc8b8"/>${[-30, 30].map(dx => `<rect x="${dx - 6}" y="50" width="12" height="40" fill="#cfc8b8"/>`).join('')}</g>
  ${pill(700, 1100, 'PLATFORM', { bg: '#f4efe4', size: 28, bold: 700 })}
  ${pill(300, 300, 'CURRENT', { bg: '#3f86c4', fg: '#fff', size: 30, bold: 700 })}
  ${k2 > 0 ? pill(540, 1520, 'EVERY 3RD NIGHT', { sc: k2, bg: '#c8352c', fg: '#fff', size: 44, bold: 700 }) : ''}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// night sea backdrop for platform-at-night scenes
function nightPlat(t, inner = '', o = {}) {
  return `
  <defs>${linGrad('np8', [[0, '#05080e'], [1, '#18233a']])}${radGrad('npm', [[0, '#dfe7f2', .4], [1, '#dfe7f2', 0]])}</defs>
  <rect width="${W}" height="${H}" fill="url(#np8)"/>${stars(40, 71, 900)}
  <circle cx="860" cy="260" r="56" fill="#e8edf2"/><circle cx="860" cy="260" r="240" fill="url(#npm)"/>
  <rect y="1300" width="${W}" height="${H}" fill="#0b1422"/>
  ${waveDashes(1310, 1900, t, '#2c4560', 30, 291, .6)}
  ${platform(540, 1320, 1.45, { t, sil: true })}
  ${inner}`;
}

// 4 ---------------------------------------------------------------
S.crash = (t, d, T) => {
  const p = t / d;
  const hitT = capL('crash', 1, T, t) + .3;
  const bx = t < hitT ? lerp(1400, 900, easeIn(seg(t, 0, hitT))) : 900 + Math.sin((t - hitT) * 20) * 8 * Math.exp(-(t - hitT) * 4);
  const climbK = seg(t, capL('crash', 3, T, t), d);
  let climbers = '';
  for (let i = 0; i < 3; i++) {
    const y = lerp(1340, 1150 - i * 30, clamp(climbK * 1.4 - i * .2));
    climbers += zomb({ x: 860 + i * 30, y, s: .45, t, ph: i, col: '#05070b', eyes: 1, armsUp: 1.9 });
  }
  const svg = nightPlat(t, `${fishBoat(bx, 1390, .7, { t, crew: 3, crewOp: clamp(1 - climbK * 1.5) })}${climbers}`) +
    `<rect width="${W}" height="${H}" fill="#fff" opacity="${t > hitT ? Math.max(0, .15 - (t - hitT) * .4) : 0}"/>` + vign(.65);
  return { svg, cam: 1.0 + .05 * p + (t > hitT && t < hitT + .3 ? .01 : 0) };
};
function easeIn(x) { return x * x * x; }

// 5 ---------------------------------------------------------------
S.cut_reason = (t, d, T) => {
  const p = t / d;
  const pull = easeIO(seg(t, .2, d * .7));
  const sl = seg(t, d * .55, d * .62);
  const svg = `<defs><filter id="sep8"><feColorMatrix type="matrix" values=".45 .55 .2 0 0  .38 .5 .17 0 0  .27 .38 .13 0 0  0 0 0 1 0"/></filter></defs>
  <g filter="url(#sep8)">
    <rect width="${W}" height="${H}" fill="#5c6068"/>
    <rect x="440" y="-40" width="18" height="${H + 80}" fill="#3a3d43" transform="translate(0,${-pull * 600})"/><rect x="620" y="-40" width="18" height="${H + 80}" fill="#3a3d43" transform="translate(0,${-pull * 600})"/>
    ${[...Array(24)].map((_, i) => `<rect x="440" y="${i * 100 - pull * 600}" width="198" height="14" rx="5" fill="#6a4a3a"/>`).join('')}
    <path d="M-100 ${1150 - pull * 200} L470 ${980 - pull * 200} L470 ${1100 - pull * 200} L-100 ${1300 - pull * 200} Z" fill="#5f6b5a"/>
    <ellipse cx="520" cy="${1040 - pull * 200}" rx="80" ry="60" fill="#e6d6c4"/>
    ${sl > 0 ? `<path d="M380 ${1050 - pull * 200} L${lerp(380, 300, sl)} ${1090 - pull * 200}" stroke="#a83a30" stroke-width="10" stroke-linecap="round"/>` : ''}
  </g>
  ${pill(540, 300, '9 DAYS AGO', { bg: '#f4efe4', size: 36, bold: 700 })}
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#f4efe4" stroke-width="4" opacity=".5"/>` + vign(.55);
  return { svg, cam: 1.0 + .05 * p };
};

// 6 ---------------------------------------------------------------
S.no_escape = (t, d, T) => {
  const r = S.fuel6(t, d, T);
  const k = back(seg(t, capL('no_escape', 2, T, t), capL('no_escape', 2, T, t) + .35));
  return { svg: r.svg + (k > 0 ? pill(540, 1520, 'RUNNING = DRIFTING', { sc: k, bg: '#c8352c', fg: '#fff', size: 44, bold: 700 }) : ''), cam: r.cam };
};

// 7 ---------------------------------------------------------------
S.idea = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, capL('idea', 2, T, t), capL('idea', 2, T, t) + .35));
  const barrel = (x, y, i) => `<g transform="translate(${x},${y})"><rect x="-70" y="-200" width="140" height="200" rx="14" fill="${['#2d4a6a', '#6a2d2d', '#2d4a6a', '#3d3d3d'][i]}"/>
    ${[-160, -100, -40].map(yy => `<rect x="-70" y="${yy}" width="140" height="10" fill="#000" opacity=".25"/>`).join('')}
    <rect x="-50" y="-140" width="100" height="56" fill="#e8e0cc"/><text x="0" y="-104" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="22" fill="#22252a">ENGINE OIL</text></g>`;
  const svg = `
  <defs>${morningSky('i8s')}</defs>
  <rect width="${W}" height="${H}" fill="url(#i8s)"/>
  <path d="M100 1100 L100 300 L900 140" stroke="#d9a13a" stroke-width="40" fill="none"/><line x1="900" y1="140" x2="900" y2="700" stroke="#3a3d43" stroke-width="6"/>
  <rect x="40" y="1060" width="140" height="80" fill="#4a4d55"/>
  ${deckFloor(1150)}
  ${[0, 1, 2, 3].map(i => barrel(330 + i * 160, 1260 + (i % 2) * 20, i)).join('')}
  ${theo({ x: 950, y: 1300, s: 1.5, f: -1, look: .6, eyes: k > 0 ? 'wide' : 'open' })}
  ${k > 0 ? pill(570, 900, '4 × 10 GAL = 40 GAL', { sc: k, bg: PAL.yel, size: 44, bold: 700 }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 8 ---------------------------------------------------------------
S.pour = (t, d, T) => {
  const p = t / d;
  const sunA = lerp(-30, 210, p);
  const sx = 540 + Math.cos(rad(sunA + 180)) * 600, sy = 900 + Math.sin(rad(sunA + 180)) * 600;
  const sky = p < .5 ? '#8fb0cf' : (p < .8 ? '#e7a273' : '#3a3f5c');
  const glossK = seg(p, .05, .9);
  let stream = '';
  for (let i = 0; i < 10; i++) { const k = (t * 1.5 + i / 10) % 1; stream += `<ellipse cx="${492 + Math.sin(i) * 4}" cy="${520 + k * 900}" rx="10" ry="26" fill="#1a1410" opacity=".85"/>`; }
  const svg = `
  <rect width="${W}" height="${H}" fill="${sky}"/>
  <circle cx="${sx}" cy="${sy}" r="70" fill="#fff1c4" opacity=".9"/>
  <rect y="1450" width="${W}" height="${H}" fill="#3e5d7c"/>
  <path d="M380 420 L620 420 L660 1500 L340 1500 Z" fill="#7a6b5c"/>
  <path d="M380 420 L${lerp(380, 620, glossK)} 420 L${lerp(340, 660, glossK) - 20} ${lerp(420, 1500, glossK)} L340 ${lerp(420, 1500, glossK)} Z" fill="#14100c" opacity=".55"/>
  ${[0, 1, 2, 3].map(i => `<path d="M${400 + i * 60} 440 L${380 + i * 70} ${lerp(440, 1480, glossK)}" stroke="#e8e0d0" stroke-width="5" opacity=".35"/>`).join('')}
  <path d="M340 700 L660 1000 M660 700 L340 1000" stroke="#6a5b4c" stroke-width="20"/>
  <rect x="200" y="380" width="680" height="50" fill="#5d5a55"/>
  ${stream}
  <g transform="translate(520,380) rotate(${-60 + Math.sin(t * 3) * 4})"><rect x="-50" y="-150" width="100" height="150" rx="12" fill="#2d4a6a"/></g>
  ${theo({ x: 680, y: 380, s: 1.0, f: -1, lean: 24, armF: [100, -10], armB: [90, -10], look: .3 })}
  ${pill(540, 160, `${String(Math.floor(lerp(9, 21, p))).padStart(2, '0')}:00`, { bg: '#f3eee2', size: 40, bold: 700, border: '#2a2c30' })}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 9 ---------------------------------------------------------------
S.night_hit = (t, d, T) => {
  const p = t / d;
  const hitT = capL('night_hit', 1, T, t) + .35;
  const bx = t < hitT ? lerp(1500, 920, easeIn(seg(t, 0, hitT))) : 920;
  const sh = t > hitT && t < hitT + .35 ? (rnd(Math.floor(t * 60)) - .5) * 30 : 0;
  const svg = `<g transform="translate(${sh},0)">${nightPlat(t, fishBoat(bx, 1390, .7, { t, crew: 3 }))}</g>` +
    `<rect width="${W}" height="${H}" fill="#fff" opacity="${t > hitT ? Math.max(0, .2 - (t - hitT) * .5) : 0}"/>` +
    pill(160, 140, '00:00', { bg: '#f3eee2', size: 34, bold: 700, border: '#2a2c30' }) + vign(.65);
  return { svg, cam: 1.0 + .05 * p };
};

// 10/11 -- the oily leg close-up ---------------------------------------
function legClose(t, figs) {
  return `
  <rect width="${W}" height="${H}" fill="#0a0e15"/>
  ${stars(20, 81, 600)}
  <rect y="1600" width="${W}" height="${H}" fill="#0b1422"/>
  ${waveDashes(1610, 1900, t * 1.5, '#2c4560', 18, 301, .7)}
  <path d="M360 -40 L720 -40 L760 1700 L320 1700 Z" fill="#2a2520"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${380 + i * 60} -40 Q${360 + i * 64} 800 ${350 + i * 70} 1700" stroke="#cfd8e4" stroke-width="${6 + (i % 2) * 4}" fill="none" opacity="${.18 + .1 * Math.sin(t * 2 + i)}"/>`).join('')}
  <path d="M330 500 L750 900 M750 500 L330 900" stroke="#1d1915" stroke-width="30"/>
  ${figs}`;
}
S.climb = (t, d, T) => {
  const p = t / d;
  let f = '';
  for (let i = 0; i < 4; i++) {
    const y = 1700 - easeOut(seg(t, i * .35, d)) * (360 + i * 90);
    f += zomb({ x: 420 + i * 80, y, s: .9, t: t * 1.6, ph: i, col: '#030406', eyes: 1, armsUp: 2.0 });
  }
  return { svg: legClose(t, f) + vign(.75), cam: 1.0 + .06 * p };
};
S.slip = (t, d, T) => {
  const p = t / d;
  let f = '', spl = '';
  for (let i = 0; i < 4; i++) {
    const t0 = capL('slip', 1, T, t) - .6 + i * .35;
    const startY = 1700 - (360 + i * 90);
    const k = seg(t, t0, t0 + .55);
    const y = lerp(startY, 1900, k * k);
    f += `<g opacity="${1 - seg(k, .75, 1)}">` + zomb({ x: 420 + i * 80, y, s: .9, t: t * 1.6, ph: i, col: '#030406', eyes: 1, armsUp: 2.0 - k }) + '</g>';
    if (t > t0 + .45) { const s2 = seg(t, t0 + .45, t0 + 1.2); spl += [...Array(8)].map((_, j) => `<circle cx="${420 + i * 80 + (rnd(j + i * 9) - .5) * 220 * s2}" cy="${1620 - Math.sin(s2 * 3.14) * (60 + rnd(j) * 120)}" r="${8 + rnd(j + 2) * 8}" fill="#e8f4f8" opacity="${1 - s2}"/>`).join(''); }
  }
  return { svg: legClose(t, f) + spl + vign(.75), cam: 1.0 + .04 * p };
};

// 12 --------------------------------------------------------------
S.relief = (t, d, T) => {
  const p = t / d;
  const laugh = Math.abs(Math.sin(t * 9)) > .3 ? 'o' : 'flat';
  const svg = `
  <defs>${linGrad('rl8', [[0, '#05080e'], [1, '#18233a']])}${radGrad('rlm', [[0, '#dfe7f2', .4], [1, '#dfe7f2', 0]])}</defs>
  <rect width="${W}" height="1110" fill="url(#rl8)"/>${stars(50, 91, 1000)}
  <circle cx="820" cy="300" r="56" fill="#e8edf2"/><circle cx="820" cy="300" r="240" fill="url(#rlm)"/>
  <rect x="-20" y="1110" width="${W + 40}" height="12" fill="#0f1116"/>${[...Array(10)].map((_, i) => `<rect x="${i * 120}" y="1110" width="8" height="150" fill="#0f1116"/>`).join('')}
  ${deckFloor(1250, true)}
  ${theo({ x: 230, y: 1400, s: 1.6, f: 1, look: .8 })}
  ${ines({ x: 520, y: 1400, s: 1.6, f: -1, look: -.3, eyes: 'closed', mouth: laugh, headTilt: -10 + Math.sin(t * 9) * 3, gun: false, armF: [50, 60], armB: [30, 60] })}
  ${mateo({ x: 790, y: 1400, s: 1.6, f: -1, look: -.6 })}
  ${cat({ x: 980, y: 1405, s: .8, f: -1, pose: 'sit' })}
  ${night(.2)}${vign(.6)}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 13 --------------------------------------------------------------
S.circling = (t, d, T) => {
  const p = t / d;
  const c1 = capL('circling', 1, T, t);
  const a = t * .9;
  const bx = 540 + Math.cos(a) * 330, by = 1380 + Math.sin(a) * 110;
  const show = t > c1 - .2;
  const k3 = back(seg(t, capL('circling', 3, T, t), capL('circling', 3, T, t) + .35));
  const svg = `
  <defs>${linGrad('c8', [[0, '#05080e'], [1, '#18233a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#c8)"/>${stars(40, 101, 900)}
  <rect y="1150" width="${W}" height="${H}" fill="#0b1422"/>
  ${waveDashes(1160, 1900, t, '#2c4560', 30, 311, .6)}
  ${!show ? mateo({ x: 540, y: 2050, s: 3.2, f: 1, look: 1, eyes: 'wide', headTilt: -4 }) : `
  <ellipse cx="540" cy="1380" rx="330" ry="110" fill="none" stroke="#9fc0d6" stroke-width="6" stroke-dasharray="20 16" opacity=".55"/>
  <g transform="translate(${bx},${by}) scale(${(Math.sin(a) > 0 ? -1 : 1) * .55},.55)">${fishBoat(0, 0, 1, { t, crew: 0, lit: .6 })}</g>
  <g filter="url(#smk)">${[...Array(5)].map((_, i) => { const k = (t * 1.5 + i / 5) % 1; return `<circle cx="${bx - Math.cos(a) * 60 * k}" cy="${by - 90 - k * 120}" r="${10 + k * 26}" fill="#5a5f66" opacity="${(1 - k) * .6}"/>`; }).join('')}</g>
  ${k3 > 0 ? pill(540, 700, 'ENGINE: RUNNING', { sc: k3, bg: '#c8352c', fg: '#fff', size: 40, bold: 700 }) : ''}`}
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 14 --------------------------------------------------------------
S.driver = (t, d, T) => {
  const p = t / d;
  const dk = seg(t, capL('driver', 1, T, t) - .1, capL('driver', 1, T, t) + .4);
  const svg = `
  <defs>${linGrad('d8', [[0, '#05080e'], [1, '#18233a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#d8)"/>${stars(30, 111, 700)}
  <rect y="1250" width="${W}" height="${H}" fill="#0b1422"/>
  ${waveDashes(1260, 1900, t, '#2c4560', 26, 321, .6)}
  <g transform="translate(540 1000) scale(${1 + easeIO(p) * .5}) translate(-540 -1000)">
    ${fishBoat(420, 1300, 2.2, { t, crew: 0, lit: .9, driver: dk })}
  </g>
  ${vign(.75)}`;
  return { svg, cam: 1.0 };
};

// 15 --------------------------------------------------------------
S.end_card8 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 9</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE DRIVER</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
