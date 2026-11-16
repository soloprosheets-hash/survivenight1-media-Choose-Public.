// ---------- Part 5 scenes ----------
function rain(t, op = .5, n = 70, ang = 14) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const x = (rnd(i) * (W + 400) - 200 + t * 300 * Math.tan(rad(ang))) % (W + 400) - 100;
    const y = ((rnd(i + 40) * (H + 300)) + t * 1800 * (0.8 + rnd(i + 7) * .4)) % (H + 300) - 150;
    g += `<line x1="${x}" y1="${y}" x2="${x - 30 * Math.tan(rad(ang))}" y2="${y - 70}" stroke="#c9d6e6" stroke-width="3" opacity="${op * (.4 + rnd(i + 3) * .6)}"/>`;
  }
  return g;
}
function bolt(x, y, s = 1, op = 1) {
  return `<path d="M${x} ${y} l${-40 * s} ${160 * s} l${50 * s} ${-10 * s} l${-60 * s} ${200 * s} l${110 * s} ${-250 * s} l${-55 * s} ${10 * s} l${40 * s} ${-110 * s} Z" fill="#f4f7ff" opacity="${op}"/>`;
}

function platform(x, y, s = 1, o = {}) {
  const { t = 0, ladder = 'up', laundry = 0, win = 0, smokeOn = 0, sil = false, spot = 0 } = o;
  const leg = sil ? '#1a1d24' : '#7a6b5c', deck = sil ? '#1a1d24' : '#5d5a55', mod = sil ? '#1a1d24' : '#c8bba5', rust = sil ? '#1a1d24' : '#a0583a', crane = sil ? '#1a1d24' : '#d9a13a';
  let legs = '';
  for (const lx of [-240, -90, 90, 240]) {
    legs += `<path d="M${lx - 26} -270 L${lx + 26} -270 L${lx + 34} 40 L${lx - 34} 40 Z" fill="${leg}"/>`;
  }
  for (const [a, b] of [[-240, -90], [-90, 90], [90, 240]]) {
    legs += `<path d="M${a} -240 L${b} -40 M${b} -240 L${a} -40 M${a} -140 L${b} -140" stroke="${leg}" stroke-width="12" fill="none"/>`;
  }
  let lad = '';
  const ly0 = -270, ly1 = ladder === 'up' ? -150 : 20;
  lad = `<line x1="280" y1="${ly0}" x2="280" y2="${ly1}" stroke="${deck}" stroke-width="7"/><line x1="320" y1="${ly0}" x2="320" y2="${ly1}" stroke="${deck}" stroke-width="7"/>` +
    [...Array(12)].map((_, i) => { const yy = ly0 + 14 + i * 22; return yy < ly1 ? `<line x1="280" y1="${yy}" x2="320" y2="${yy}" stroke="${deck}" stroke-width="5"/>` : ''; }).join('');
  let lau = '';
  if (laundry > 0) {
    lau = `<path d="M-280 -332 Q-170 -318 -60 -332" stroke="#f0ece4" stroke-width="3" fill="none"/>`;
    [['#e0473a', -250], ['#3f86c4', -200], ['#f2c230', -150], ['#ece4d4', -105]].forEach(([c, lx], i) => {
      const sw = Math.sin(t * 3 + i) * 8;
      lau += `<path d="M${lx - 18} -326 L${lx + 18} -326 L${lx + 16 + sw} -288 L${lx - 16 + sw} -288 Z" fill="${c}" opacity="${laundry}"/>`;
    });
  }
  const sm = smokeOn ? smoke(-110, -470, t, 160, 14, '#c8c4bc', 6, 3) : '';
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${legs}
    <rect x="-330" y="-300" width="660" height="34" fill="${deck}"/>
    <rect x="-280" y="-430" width="250" height="130" fill="${mod}"/><rect x="-280" y="-430" width="250" height="18" fill="${rust}"/>
    ${[-260, -200, -140, -80].map((wx, i) => `<rect x="${wx}" y="-395" width="38" height="34" fill="${i === 1 && win ? '#ffd27a' : (sil ? '#1a1d24' : '#3a4352')}"/>`).join('')}
    ${win && !sil ? `<rect x="-200" y="-395" width="${18 + Math.sin(t * 1.3) * 8}" height="34" fill="#9a5a3a"/><circle cx="-176" cy="-370" r="8" fill="#2a2a2a" opacity="${win}"/>` : ''}
    <rect x="-130" y="-470" width="16" height="44" fill="${deck}"/>
    <rect x="10" y="-390" width="200" height="90" fill="${mod}"/><rect x="10" y="-390" width="200" height="14" fill="${rust}"/>
    <path d="M140 -390 L170 -640 L200 -390 Z M150 -470 L190 -470 M155 -550 L185 -550" stroke="${leg}" stroke-width="8" fill="none"/>
    <path d="M-40 -430 L-40 -520 L-300 -600" stroke="${crane}" stroke-width="14" fill="none"/><line x1="-300" y1="-600" x2="-300" y2="-500" stroke="${deck}" stroke-width="3"/>
    <path d="M330 -290 L470 -430" stroke="${leg}" stroke-width="14"/>
    <rect x="-330" y="-336" width="660" height="6" fill="${deck}"/>${[...Array(12)].map((_, i) => `<rect x="${-330 + i * 60}" y="-336" width="5" height="36" fill="${deck}"/>`).join('')}
    ${lau}${lad}${sm}
    ${spot ? `<circle cx="300" cy="-450" r="22" fill="#fffbe8"/>` : ''}
  </g>`;
}

// 1 ---------------------------------------------------------------
S.recap5 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const bob = Math.sin(t * 2) * 6, rot = Math.sin(t * 1.6) * 2;
  const svg = `
  <defs>${morningSky('r5sky')}${linGrad('r5sea', [[0, '#7b9cba'], [1, '#3e5d7c']])}</defs>
  <rect width="${W}" height="900" fill="url(#r5sky)"/>
  <rect y="896" width="${W}" height="${H}" fill="url(#r5sea)"/>
  <g transform="translate(150,905) scale(.22)">${islandShape(0, 0, 1, '#7d9a5c')}${lighthouse(60, -90, 1, 0)}</g>
  ${waveDashes(910, 1900, t, '#d8e7ef', 40, 131, .45)}
  <g transform="translate(0,${bob}) rotate(${rot} 560 1300)">
    ${theo({ x: 380, y: 1250, s: 1.25, f: 1, look: .6 })}
    ${cat({ x: 760, y: 1240, s: .75, f: -1, pose: 'sit', look: -.3 })}
    <g transform="translate(560,1330) scale(1.35)">${boat(0, 0, 1)}</g>
  </g>
  ${waves(1420, '#d8e7ef', t, 8, 130, 50, 5, .5)}
  ${gulls(t, [[200, 520, 1, 0], [280, 560, .8, 1]])}
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 5</text>
    ${pill(540, 310, 'DAY 2 · 10:20 AM', { bg: PAL.yel, size: 28 })}
  </g>
  ${t > capL('recap5', 2, T, t) ? pill(540, 1620, 'FUEL: 11 GAL', { sc: back(seg(t, capL('recap5', 2, T, t), capL('recap5', 2, T, t) + .35)), bg: '#c8352c', fg: '#fff', size: 38, bold: 700 }) : ''}
  ${vign(.35)}`;
  return { svg, cam: 1.02 + .05 * p };
};

// 2 ---------------------------------------------------------------
S.chart = (t, d, T) => {
  const p = t / d;
  const rk = easeOut(seg(t, .2, 1.2));
  const pk = seg(t, capL('chart', 2, T, t), capL('chart', 2, T, t) + 1.0);
  const lk = back(seg(t, capL('chart', 2, T, t) + .4, capL('chart', 2, T, t) + .75));
  const sx = 260, sy = 1300, px = 760, py = 620;
  const svg = `
  <rect width="${W}" height="${H}" fill="#6e4a30"/>
  <g transform="rotate(-2 540 960)">
  <rect x="60" y="200" width="960" height="1520" rx="18" fill="#e9eef0"/>
  ${[...Array(12)].map((_, i) => `<line x1="${60 + i * 80}" y1="200" x2="${60 + i * 80}" y2="1720" stroke="#cfdbe2" stroke-width="2"/>`).join('')}
  ${[...Array(19)].map((_, i) => `<line x1="60" y1="${200 + i * 80}" x2="1020" y2="${200 + i * 80}" stroke="#cfdbe2" stroke-width="2"/>`).join('')}
  <path d="M60 200 L560 200 Q520 360 400 420 Q300 470 260 600 Q220 760 60 820 Z" fill="#c9d4a8"/>
  <path d="M560 200 Q520 360 400 420 Q300 470 260 600 Q220 760 60 820" stroke="#8a9a72" stroke-width="4" fill="none"/>
  <circle cx="${sx}" cy="${sy}" r="${lerp(0, 760, rk)}" fill="#3f86c4" opacity=".1"/>
  <circle cx="${sx}" cy="${sy}" r="${lerp(0, 760, rk)}" fill="none" stroke="#3f86c4" stroke-width="5" stroke-dasharray="16 12"/>
  <text x="${sx + 40}" y="${sy + 560}" font-family="Oswald" font-weight="600" font-size="28" fill="#3f86c4" opacity="${rk}">FUEL RANGE</text>
  <circle cx="${sx}" cy="${sy}" r="16" fill="${PAL.coat}" stroke="#22252a" stroke-width="5"/>
  ${pill(sx, sy + 60, 'THEO', { bg: PAL.coat, size: 24, bold: 700 })}
  <path d="M${sx} ${sy} Q${(sx + px) / 2 + 160} ${(sy + py) / 2 + 80} ${px} ${py}" stroke="#22252a" stroke-width="5" stroke-dasharray="12 10" fill="none" pathLength="1" stroke-dashoffset="0" opacity="${pk}"/>
  <g transform="translate(${px},${py})"><rect x="-26" y="-26" width="52" height="52" fill="#e0473a" stroke="#22252a" stroke-width="5" transform="rotate(45)"/></g>
  ${lk > 0 ? pill(px, py - 80, 'OIL PLATFORM · 12 MI', { sc: lk, bg: '#22252a', fg: '#fff', size: 30, bold: 700 }) : ''}
  <g transform="translate(860,1560)"><circle r="80" fill="none" stroke="#22252a" stroke-width="4"/><path d="M0 -90 L14 0 L0 90 L-14 0 Z" fill="#22252a"/><text y="-104" text-anchor="middle" font-family="Anton" font-size="34" fill="#22252a">N</text></g>
  </g>
  ${vign(.4)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 3 ---------------------------------------------------------------
S.why = (t, d, T) => {
  const p = t / d;
  const items = ['NO ROADS', 'NO BRIDGES', 'CAN’T BE WALKED TO'];
  const its = items.map((lab, i) => {
    const k = back(seg(t, capL('why', i, T, t), capL('why', i, T, t) + .3));
    return k > 0 ? pill(540, 1440 + i * 110, lab + '  ✓', { sc: k, bg: '#fff', fg: '#2f7a52', size: 38, bold: 700, border: '#2a2c30' }) : '';
  }).join('');
  const svg = `
  <defs>${morningSky('wsky5')}${linGrad('wsea5', [[0, '#7b9cba'], [1, '#3e5d7c']])}</defs>
  <rect width="${W}" height="1000" fill="url(#wsky5)"/>
  <rect y="996" width="${W}" height="${H}" fill="url(#wsea5)"/>
  ${waveDashes(1010, 1900, t, '#d8e7ef', 40, 141, .45)}
  ${platform(540, 1010, .9, { t, sil: false })}
  ${waves(1040, '#d8e7ef', t, 6, 120, 40, 4, .5)}
  ${its}
  ${vign(.35)}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 4 ---------------------------------------------------------------
S.storm = (t, d, T) => {
  const p = t / d;
  const k = easeIO(seg(p, 0, .85));
  const mix = (a, b) => { const A = a.match(/\w\w/g).map(h => parseInt(h, 16)), B = b.match(/\w\w/g).map(h => parseInt(h, 16)); return 'rgb(' + A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',') + ')'; };
  const fl = t > d * .82 ? Math.max(0, 1 - (t - d * .82) * 5) : 0;
  const svg = `
  <defs><linearGradient id="st5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('8fb0cf', '0a0d14')}"/><stop offset="1" stop-color="${mix('f2c9a0', '232a36')}"/></linearGradient>
  <linearGradient id="ss5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('7b9cba', '1a2636')}"/><stop offset="1" stop-color="${mix('3e5d7c', '0b111a')}"/></linearGradient></defs>
  <rect width="${W}" height="1000" fill="url(#st5)"/>
  ${[...Array(9)].map((_, i) => `<ellipse cx="${lerp(-400, rnd(i) * W, k) + Math.sin(t + i) * 20}" cy="${150 + rnd(i + 5) * 600}" rx="${300 + rnd(i + 2) * 200}" ry="${90 + rnd(i + 8) * 60}" fill="#1c222c" opacity="${.85 * k}"/>`).join('')}
  <rect y="996" width="${W}" height="${H}" fill="url(#ss5)"/>
  ${waveDashes(1010, 1900, t * (1 + k), '#9fb2c6', 46, 151, .4 + .2 * k)}
  <g transform="translate(540,${1260 + Math.sin(t * 3) * 10 * k}) rotate(${Math.sin(t * 2.4) * 6 * k}) scale(.7)">${theo({ x: -150, y: -60, s: 1.1, look: 1, eyes: k > .5 ? 'wide' : 'open' })}${boat(0, 0, 1)}</g>
  ${fl > 0 ? bolt(820, 120, 2.2, fl) : ''}
  <rect width="${W}" height="${H}" fill="#e8eeff" opacity="${fl * .5}"/>
  ${rain(t, .5 * k)}
  ${vign(.4 + .3 * k)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 5 ---------------------------------------------------------------
S.waves = (t, d, T) => {
  const p = t / d;
  const sw = Math.sin(t * 2.2);
  const catK = seg(t, capL('waves', 2, T, t), capL('waves', 2, T, t) + .5);
  const wv = (y, amp, ph, col, op) => {
    let dd = `M-100 ${H}`;
    for (let x = -100; x <= W + 100; x += 30) dd += ` L${x} ${y + Math.sin(x / 260 + t * 1.8 + ph) * amp}`;
    return `<path d="${dd} L${W + 100} ${H} Z" fill="${col}" opacity="${op}"/>`;
  };
  const fl = Math.pow(Math.max(0, Math.sin(t * 1.7 + 2)), 30);
  const svg = `
  <defs>${linGrad('wsk', [[0, '#05070c'], [1, '#1a2230']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#wsk)"/>
  ${wv(780, 160, 0, '#152233', 1)}
  <g transform="translate(540,${1180 + sw * 90}) rotate(${sw * 20})">
    ${theo({ x: -150, y: -50, s: 1.2, f: 1, lean: -sw * 10, armF: [70, 40], armB: [60, 40], eyes: 'wide', look: .5 })}
    ${boat(0, 0, 1.25)}
    <rect x="40" y="-70" width="160" height="14" fill="#8a6a4a"/>
    <g opacity="${catK}"><circle cx="120" cy="-38" r="20" fill="#d98a3c"/><path d="M104 -50 l2 -16 l12 10 Z M136 -50 l-2 -16 l-12 10 Z" fill="#d98a3c"/>
    <circle cx="113" cy="-40" r="4" fill="#fff"/><circle cx="127" cy="-40" r="4" fill="#fff"/><circle cx="113" cy="-40" r="2" fill="#111"/><circle cx="127" cy="-40" r="2" fill="#111"/></g>
  </g>
  ${wv(1300, 140, 2, '#1d3248', 1)}
  ${waves(1270, '#d8e7ef', t * 2, 120, 520, 60, 10, .5)}
  ${wv(1560, 120, 4, '#0f1c2b', 1)}
  <rect width="${W}" height="${H}" fill="#e8eeff" opacity="${fl * .4}"/>
  ${rain(t, .6, 90, 20)}
  ${vign(.7)}`;
  return { svg, cam: 1.03 + .03 * p };
};

// 6 ---------------------------------------------------------------
function motorClose(t, o = {}) {
  const { running = 1, shake = 0, open = false, night = true } = o;
  const jx = (rnd(Math.floor(t * 40)) - .5) * shake, jy = (rnd(Math.floor(t * 40) + 9) - .5) * shake;
  let puffs = '';
  if (running > 0) for (let i = 0; i < 6; i++) {
    const k = (t * 1.6 * running + i / 6) % 1;
    puffs += `<circle cx="${700 + k * 220}" cy="${640 - k * 180}" r="${20 + k * 60}" fill="#8e949c" opacity="${(1 - k) * .55 * running}"/>`;
  }
  return `
  <defs>${linGrad('mbg', [[0, night ? '#0a0f18' : '#8fb0cf'], [1, night ? '#1b2636' : '#3e5d7c']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mbg)"/>
  ${waveDashes(1100, 1900, t, '#33506e', 30, 161, .6)}
  <g filter="url(#smk)">${puffs}</g>
  <g transform="translate(${540 + jx},${980 + jy})">
    <rect x="-220" y="-380" width="440" height="330" rx="70" fill="${open ? '#2b2e33' : '#33373e'}"/>
    ${open ? '' : `<rect x="-200" y="-360" width="400" height="60" rx="26" fill="#d9473a"/><text x="0" y="-316" text-anchor="middle" font-family="Anton" font-size="44" fill="#fff">MARINER 15</text>`}
    <rect x="-70" y="-50" width="140" height="520" fill="#2a2d33"/>
    <rect x="-150" y="420" width="300" height="70" rx="20" fill="#2a2d33"/>
    <g transform="translate(0,455) scale(1,${running > 0 ? Math.cos(t * 40) : 1})"><rect x="-200" y="-14" width="400" height="28" rx="14" fill="#7d838b"/></g>
  </g>
  ${line(540 + jx + 220, 760 + jy, 800, 860, '#1d1d1d', 6)}`;
}
S.engine = (t, d, T) => {
  const p = t / d;
  const dieT = capL('engine', 1, T, t);
  const running = t < dieT ? 1 : Math.max(0, 1 - (t - dieT) * 3);
  const cough = t < dieT ? Math.pow(Math.max(0, Math.sin(t * 9)), 6) * 22 : (t - dieT < .3 ? 30 : 0);
  const svg = motorClose(t, { running, shake: cough }) + rain(t, .45) +
    (t > dieT ? pill(540, 300, 'ENGINE: DEAD', { sc: back(seg(t, dieT, dieT + .3)), bg: '#c8352c', fg: '#fff', size: 44, bold: 700 }) : '') + vign(.65);
  return { svg, cam: 1.0 + .06 * p };
};

// 7 ---------------------------------------------------------------
S.cause = (t, d, T) => {
  const p = t / d;
  const wk = seg(t, capL('cause', 1, T, t) - .2, d);
  const lvl = lerp(0, 150, easeOut(wk));
  let drops = '';
  for (let i = 0; i < 14; i++) {
    const k = ((t * .7 + rnd(i)) % 1);
    if (wk > 0) drops += `<circle cx="${-220 + rnd(i + 3) * 440}" cy="${-240 + k * (440 - lvl)}" r="${10 + rnd(i) * 6}" fill="#3f86c4" opacity="${wk}"/>`;
  }
  const svg = `
  <rect width="${W}" height="${H}" fill="#ece4d3"/>
  ${[...Array(28)].map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${H}" stroke="#d9cfba" stroke-width="2"/>`).join('')}
  ${[...Array(50)].map((_, i) => `<line x1="0" y1="${i * 40}" x2="${W}" y2="${i * 40}" stroke="#d9cfba" stroke-width="2"/>`).join('')}
  <text x="540" y="300" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="48" fill="#22252a" letter-spacing="3">FUEL TANK</text>
  <g transform="translate(540,880)">
    <clipPath id="ftk"><rect x="-260" y="-300" width="520" height="520" rx="40"/></clipPath>
    <rect x="-260" y="-300" width="520" height="520" rx="40" fill="#f8f4ea"/>
    <g clip-path="url(#ftk)">
      <rect x="-260" y="-240" width="520" height="480" fill="#e2a64a"/>
      <rect x="-260" y="${220 - lvl}" width="520" height="${lvl}" fill="#3f86c4"/>
      ${drops}
    </g>
    <rect x="-260" y="-300" width="520" height="520" rx="40" fill="none" stroke="#2b2f35" stroke-width="10"/>
    <path d="M0 220 L0 330 L360 330" stroke="#2b2f35" stroke-width="16" fill="none"/>
    ${pill(360 + 80, 330, 'ENGINE', { bg: '#22252a', fg: '#fff', size: 26, bold: 700 })}
    ${wk > .5 ? `<g transform="translate(200,330) scale(${back(seg(wk, .5, .7))})"><circle r="30" fill="#e0473a"/><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>` : ''}
    ${pill(-380, -60, 'FUEL', { bg: '#e2a64a', fg: '#22252a', size: 30, bold: 700 })}<line x1="-320" y1="-60" x2="-250" y2="-60" stroke="#22252a" stroke-width="4"/>
    ${wk > 0 ? pill(-380, 170, 'SEAWATER', { bg: '#3f86c4', fg: '#fff', size: 30, bold: 700, op: wk }) + `<line x1="-290" y1="170" x2="-250" y2="170" stroke="#22252a" stroke-width="4" opacity="${wk}"/>` : ''}
  </g>
  ${pill(540, 1500, 'WATER SINKS · ENGINE CHOKES', { bg: 'transparent', fg: '#5d6166', size: 32, op: wk })}
  ${vign(.25)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 8 ---------------------------------------------------------------
S.fix = (t, d, T) => {
  const p = t / d;
  const secs = Math.floor(lerp(0, 240, seg(t, capL('fix', 4, T, t) - 1.5, capL('fix', 4, T, t) + .8)));
  const drain = seg(t, capL('fix', 2, T, t), d * .95);
  const rot = Math.sin(t * 1.9) * 5;
  const water = lerp(120, 6, drain);
  let drips = '';
  for (let i = 0; i < 3; i++) { const k = (t * 2.2 + i / 3) % 1; drips += `<circle cx="540" cy="${1300 + k * 300}" r="9" fill="#5fa3d6" opacity="${(1 - k) * (drain < 1 ? 1 : 0)}"/>`; }
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b1018"/>
  <g transform="rotate(${rot} 540 1000)">
    <rect x="160" y="520" width="760" height="900" rx="40" fill="#2b2e33"/>
    <rect x="200" y="560" width="680" height="200" rx="20" fill="#24272c"/>
    ${[260, 380, 500].map(x => `<circle cx="${x}" cy="660" r="40" fill="#1c1e22"/>`).join('')}
    <g transform="translate(540,1040)">
      <rect x="-90" y="-200" width="180" height="40" rx="10" fill="#5e6168"/>
      <rect x="-80" y="-160" width="160" height="300" rx="24" fill="#e2a64a" opacity=".85"/>
      <rect x="-80" y="${140 - water}" width="160" height="${water}" rx="10" fill="#3f86c4"/>
      <rect x="-80" y="-160" width="160" height="300" rx="24" fill="none" stroke="#d7dde4" stroke-width="8" opacity=".8"/>
      <rect x="-14" y="140" width="28" height="60" fill="#5e6168"/>
      <rect x="-40" y="${180}" width="80" height="18" rx="6" fill="#d9473a" transform="rotate(${drain > 0 ? 90 : 0} 0 189)"/>
    </g>
  </g>
  ${drips}
  <path d="M1200 1500 L700 1250 L650 1320 L1200 1650 Z" fill="${PAL.coat}"/>
  <ellipse cx="640" cy="1240" rx="70" ry="54" fill="${PAL.skin}"/>
  <path d="M-120 1500 L380 1250 L430 1320 L-120 1650 Z" fill="${PAL.coatD}"/>
  <ellipse cx="440" cy="1240" rx="66" ry="50" fill="${PAL.skin}"/>
  <path d="M540 200 L300 1000 L780 1000 Z" fill="#fff7d6" opacity=".08"/>
  ${pill(540, 150, `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')} ELAPSED`, { bg: '#f3eee2', size: 36, bold: 700, border: '#2a2c30' })}
  ${rain(t, .5)}
  ${vign(.75)}`;
  return { svg, cam: 1.03 + .05 * p };
};

// 9 ---------------------------------------------------------------
S.roar = (t, d, T) => {
  const p = t / d;
  const fl = t > d * .7 ? Math.max(0, 1 - (t - d * .7) * 3) : 0;
  const svg = motorClose(t, { running: 1.6, shake: 6 }) +
    `${[...Array(16)].map((_, i) => { const k = (t * 3 + i / 16) % 1; return `<circle cx="${540 + (rnd(i) - .5) * 400 * k}" cy="${1460 + k * 300}" r="${8 + k * 20}" fill="#e8f4f8" opacity="${(1 - k) * .8}"/>`; }).join('')}` +
    (fl > 0 ? `<rect width="${W}" height="${H}" fill="#e8eeff" opacity="${fl * .55}"/>` + platform(820, 1080, .35, { sil: true }) : '') +
    pill(540, 300, 'ENGINE: RUNNING', { sc: back(seg(t, .1, .4)), bg: '#4f8a6a', fg: '#fff', size: 44, bold: 700 }) +
    rain(t, .4) + vign(.6);
  return { svg, cam: 1.0 + .05 * p };
};

// 10 --------------------------------------------------------------
S.dawn = (t, d, T) => {
  const p = t / d;
  const ps = lerp(.38, .6, easeIO(p));
  const svg = `
  <defs>${linGrad('dsky5', [[0, '#7d9cc4'], [.6, '#f2b08a'], [1, '#ffe0a8']])}${linGrad('dsea5', [[0, '#6f8fae'], [1, '#2f4a68']])}</defs>
  <rect width="${W}" height="1000" fill="url(#dsky5)"/>
  <circle cx="260" cy="${lerp(980, 900, p)}" r="100" fill="#fff1c4" opacity=".95"/>
  <rect y="996" width="${W}" height="${H}" fill="url(#dsea5)"/>
  ${[...Array(10)].map((_, i) => `<rect x="${260 - (50 - i * 3)}" y="${1010 + i * 34}" width="${100 - i * 6}" height="7" rx="3" fill="#fff1c4" opacity="${.7 - i * .05}"/>`).join('')}
  ${waveDashes(1010, 1900, t, '#c9d8e6', 34, 171, .4)}
  ${platform(700, 1010, ps, { sil: true })}
  <g transform="translate(540,${1600 + Math.sin(t * 2) * 5})">${theo({ x: -120, y: -60, s: .9, f: 1, look: 1 })}${boat(0, 0, .8)}</g>
  <path d="M540 1640 Q520 1760 440 1920" stroke="#e8f2f6" stroke-width="40" fill="none" opacity=".35"/>
  ${gulls(t, [[560, 600, 1, 0], [640, 640, .8, 1]])}
  ${vign(.35)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 11 --------------------------------------------------------------
S.signs = (t, d, T) => {
  const p = t / d;
  const k1 = back(seg(t, capL('signs', 1, T, t), capL('signs', 1, T, t) + .35));
  const k2 = back(seg(t, capL('signs', 2, T, t), capL('signs', 2, T, t) + .35));
  const svg = `
  <defs>${morningSky('sgsky')}${linGrad('sgsea', [[0, '#7b9cba'], [1, '#3e5d7c']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sgsky)"/>
  <rect y="1300" width="${W}" height="${H}" fill="url(#sgsea)"/>
  ${waveDashes(1310, 1900, t, '#d8e7ef', 30, 181, .45)}
  ${platform(540, 1320, 1.45, { t, laundry: k2 > 0 ? 1 : 0 })}
  ${waves(1340, '#d8e7ef', t, 7, 130, 40, 5, .5)}
  ${k1 > 0 ? `<g opacity="${clamp(k1)}"><path d="M1030 1110 L1050 1110 L1050 1350 L1030 1350" stroke="#e0473a" stroke-width="7" fill="none" stroke-dasharray="14 10"/></g>` + pill(870, 1520, 'LADDER PULLED UP', { sc: k1, bg: '#c8352c', fg: '#fff', size: 32, bold: 700 }) : ''}
  ${k2 > 0 ? `<line x1="290" y1="760" x2="290" y2="620" stroke="#fff" stroke-width="5"/>` + pill(290, 590, 'FRESH LAUNDRY', { sc: k2, size: 32, bold: 700, icon: true, iconCol: PAL.yel }) : ''}
  ${vign(.4)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 12 --------------------------------------------------------------
S.someone = (t, d, T) => {
  const p = t / d;
  const z = 1 + easeIO(p) * 1.6;
  const svg = `
  <defs>${morningSky('sosky')}</defs>
  <rect width="${W}" height="${H}" fill="url(#sosky)"/>
  <rect y="1300" width="${W}" height="${H}" fill="#56789a"/>
  <g transform="translate(330 770) scale(${z}) translate(-330 -770)">
  ${platform(540, 1320, 1.45, { t, laundry: 1, win: 1, smokeOn: 1 })}
  </g>
  ${vign(.55)}`;
  return { svg, cam: 1.0 };
};

// 13/14 -- the radio --------------------------------------------------
function radioClose(t, o = {}) {
  const { talk = 0, blink = 1, glare = 0 } = o;
  let bars = '';
  for (let i = 0; i < 18; i++) {
    const h = talk ? (8 + Math.abs(Math.sin(t * 22 + i * 1.7) * Math.sin(t * 7 + i)) * 70) : 4;
    bars += `<rect x="${-160 + i * 19}" y="${-h / 2}" width="12" height="${h}" rx="4" fill="#9ef0a8"/>`;
  }
  const on = blink && Math.floor(t * 4) % 2 === 0;
  let arcs = '';
  for (let i = 0; i < 3; i++) { const k = (t * 1.4 + i / 3) % 1; arcs += `<path d="M${640 + k * 120} ${380 - k * 60} q${40 + k * 40} ${60 + k * 40} 0 ${120 + k * 80}" stroke="#ff6a5a" stroke-width="${7 * (1 - k)}" fill="none" opacity="${(1 - k) * (talk || blink ? 1 : 0)}"/>`; }
  return `
  <rect width="${W}" height="${H}" fill="#3b2c22"/>
  <rect y="1400" width="${W}" height="${H}" fill="#2c2119"/>
  ${[...Array(8)].map((_, i) => `<line x1="0" y1="${1100 + i * 110}" x2="${W}" y2="${1100 + i * 110}" stroke="#2a1f17" stroke-width="5"/>`).join('')}
  ${cat({ x: 180, y: 1480, s: 1.5, f: 1, pose: 'sit', look: .8, ears: talk ? -1 : 0 })}
  <line x1="560" y1="560" x2="600" y2="200" stroke="#1d1f22" stroke-width="22" stroke-linecap="round"/>
  <g transform="translate(560,1000) rotate(-4)">
    <rect x="-220" y="-460" width="440" height="900" rx="60" fill="#262a30"/>
    <rect x="-190" y="-420" width="380" height="240" rx="24" fill="#0f2014"/>
    <g transform="translate(0,-300)">${bars}</g>
    ${[...Array(5)].map((_, r) => [...Array(6)].map((_, c) => `<circle cx="${-125 + c * 50}" cy="${-80 + r * 50}" r="12" fill="#1a1d22"/>`).join('')).join('')}
    <rect x="-150" y="230" width="300" height="80" rx="20" fill="#3a3f48"/>
    <text x="0" y="285" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="40" fill="#cfd4da">CH 16</text>
    <circle cx="150" cy="-440" r="20" fill="${on || talk ? '#ff3b2e' : '#5a2a25'}"/>
  </g>
  ${arcs}
  <rect width="${W}" height="${H}" fill="#fffbe8" opacity="${glare}"/>`;
}
S.radio_on = (t, d, T) => {
  const p = t / d;
  return { svg: radioClose(t, { blink: 1 }) + vign(.6), cam: 1.0 + .06 * p };
};
S.radio_voice = (t, d, T) => {
  const p = t / d;
  const c2 = capL('radio_voice', 1, T, t);
  if (t < c2 + .1) return { svg: radioClose(t, { talk: 1 }) + vign(.6), cam: 1.06 + .04 * p };
  const k = seg(t, c2 + .1, c2 + .5);
  const svg = `
  <rect width="${W}" height="${H}" fill="#7e9cbc"/>
  <rect y="1300" width="${W}" height="${H}" fill="#3e5d7c"/>
  ${platform(540, 1320, 1.45, { t, laundry: 1, spot: 1 })}
  <defs>${radGrad('spotg', [[0, '#fffbe8', 1], [.3, '#fffbe8', .6], [1, '#fffbe8', 0]])}</defs>
  <circle cx="${540 + 300 * 1.45}" cy="${1320 - 450 * 1.45}" r="${200 + k * 900}" fill="url(#spotg)" opacity="${k}"/>
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 15 --------------------------------------------------------------
S.end_card5 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 6</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE PLATFORM</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
