// ---------- LIBERTY LAND · Part 1 ----------
function riley(o = {}) { return recolor(o, { coat: '#3a7a5a', coatD: '#2e6448', hat: '#c8352c', hatD: '#a82a22', beard: '#f1dcc0', pants: '#2b2f38' }); }
function buck(o = {}) {
  const { x = 0, y = 0, s = 1, f = 1, wave = 0, still = false, t = 0, tilt = 0, armsUp = 0, sweat = 0 } = o;
  const w = still ? 0 : Math.sin(t * 8) * 25 * wave;
  const armR = armsUp ? -150 : -40 - wave * 80 + w, armL = armsUp ? -150 : 40;
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <rect x="-46" y="-120" width="34" height="110" rx="14" fill="#24407a"/><rect x="14" y="-120" width="34" height="110" rx="14" fill="#24407a"/>
    <ellipse cx="-30" cy="-6" rx="44" ry="18" fill="#e8a020"/><ellipse cx="32" cy="-6" rx="44" ry="18" fill="#e8a020"/>
    <g transform="rotate(${armL} -70 -250)"><ellipse cx="-70" cy="-180" rx="30" ry="80" fill="#f4f4f2"/></g>
    <ellipse cx="0" cy="-230" rx="105" ry="130" fill="#2f4f9a"/>
    <rect x="-100" y="-190" width="200" height="30" fill="#c8352c"/><rect x="-100" y="-160" width="200" height="12" fill="#f4f4f2"/>
    <path d="M0 -300 l14 30 l32 2 l-25 20 l9 32 l-30 -18 l-30 18 l9 -32 l-25 -20 l32 -2 Z" fill="#f4f4f2"/>
    <g transform="rotate(${armR} 70 -250)"><ellipse cx="70" cy="-180" rx="30" ry="80" fill="#f4f4f2"/></g>
    <g transform="rotate(${tilt} 0 -360)">
      <circle cx="0" cy="-420" r="110" fill="#f4f4f2"/>
      <path d="M-90 -480 q-30 -60 10 -70 M-40 -515 q-10 -60 30 -55 M20 -520 q20 -50 50 -30" stroke="#e8e8e6" stroke-width="22" fill="none" stroke-linecap="round"/>
      <circle cx="-38" cy="-440" r="26" fill="#fff"/><circle cx="38" cy="-440" r="26" fill="#fff"/>
      <circle cx="${-34 + (still ? 0 : 4)}" cy="-436" r="14" fill="#1d1f22"/><circle cx="${42 + (still ? 0 : 4)}" cy="-436" r="14" fill="#1d1f22"/>
      <path d="M-56 -478 q18 -12 34 -4 M56 -478 q-18 -12 -34 -4" stroke="#1d1f22" stroke-width="8" stroke-linecap="round"/>
      <path d="M-50 -400 Q0 -390 50 -400 L20 -340 Q0 -330 -20 -340 Z" fill="#f2b220"/><path d="M-50 -400 Q0 -390 50 -400 L30 -380 Q0 -372 -30 -380 Z" fill="#d8961a"/>
      <rect x="-22" y="-330" width="44" height="10" rx="5" fill="#1d1f22" opacity=".5"/>
    </g>
    ${sweat ? [0, 1, 2].map(i => `<path d="M${120 + i * 30} ${-500 + ((t * 120 + i * 40) % 80)} q-8 14 0 18 q8 -4 0 -18" fill="#bfe3f2" opacity="${sweat}"/>`).join('') : ''}
  </g>`;
}
function raccoon(x, y, s = 1, o = {}) {
  const { f = 1, t = 0, churro = 1 } = o;
  const chew = Math.abs(Math.sin(t * 8)) * 4;
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">
    <g transform="rotate(${Math.sin(t * 2) * 6} -60 -40)">${[0, 1, 2, 3, 4].map(i => `<ellipse cx="${-70 - i * 18}" cy="${-40 - i * 10}" rx="16" ry="14" fill="${i % 2 ? '#2b2b2e' : '#8a8a90'}"/>`).join('')}</g>
    <ellipse cx="0" cy="-50" rx="62" ry="46" fill="#8a8a90"/><ellipse cx="10" cy="-36" rx="40" ry="26" fill="#a8a8ae"/>
    <rect x="-40" y="-14" width="16" height="16" rx="6" fill="#3a3a3e"/><rect x="24" y="-14" width="16" height="16" rx="6" fill="#3a3a3e"/>
    <g transform="translate(50,-100)"><path d="M-30 -20 l-6 -26 l20 14 Z M20 -24 l10 -24 l6 26 Z" fill="#6a6a70"/>
      <ellipse cx="0" cy="0" rx="46" ry="38" fill="#9a9aa0"/><path d="M-44 -6 Q0 -30 44 -6 Q30 14 0 6 Q-30 14 -44 -6 Z" fill="#2b2b2e"/>
      <circle cx="-16" cy="-6" r="6" fill="#fff"/><circle cx="16" cy="-6" r="6" fill="#fff"/><circle cx="-16" cy="-6" r="3" fill="#1d1f22"/><circle cx="16" cy="-6" r="3" fill="#1d1f22"/>
      <ellipse cx="0" cy="${20 + chew}" rx="20" ry="12" fill="#e8e8ea"/><circle cx="0" cy="14" r="6" fill="#1d1f22"/></g>
    ${churro ? `<rect x="66" y="-92" width="70" height="16" rx="8" fill="#c88a3a" transform="rotate(-25 66 -84)"/>` : ''}
  </g>`;
}
function libertyPark(t, o = {}) {
  const { kind = 'day', crowd = 0, gate = true, wheel = true } = o;
  const ang = t * 8;
  let wh = '';
  if (wheel) {
    wh = `<g transform="translate(820,560)"><circle r="260" fill="none" stroke="#e8e8ea" stroke-width="12"/>
      ${[...Array(12)].map((_, i) => { const a = rad(ang + i * 30); return `<line x1="0" y1="0" x2="${Math.cos(a) * 260}" y2="${Math.sin(a) * 260}" stroke="#e8e8ea" stroke-width="5"/><rect x="${Math.cos(a) * 260 - 22}" y="${Math.sin(a) * 260 - 10}" width="44" height="40" rx="8" fill="${['#c8352c', '#2f4f9a', '#f4f4f2'][i % 3]}"/>`; }).join('')}
      <circle r="24" fill="#c8352c"/><path d="M-120 420 L0 0 L120 420" stroke="#e8e8ea" stroke-width="12" fill="none"/></g>`;
  }
  const coaster = `<path d="M-20 820 Q120 420 260 700 Q360 900 460 560 Q560 300 640 760" stroke="#c8352c" stroke-width="14" fill="none"/>${[...Array(14)].map((_, i) => `<line x1="${i * 48}" y1="${980}" x2="${i * 48}" y2="${600 + Math.sin(i) * 120}" stroke="#a82a22" stroke-width="5" opacity=".6"/>`).join('')}`;
  let people = '';
  for (let i = 0; i < crowd; i++) people += `<circle cx="${(i * 47) % 1100}" cy="${1160 + (i % 6) * 22}" r="13" fill="${['#c8352c', '#2f4f9a', '#f4f4f2', '#e8a020', '#3a7a5a'][i % 5]}"/>`;
  return `<defs>${skyG('lp_' + kind, kind)}</defs><rect width="${W}" height="${H}" fill="url(#lp_${kind})"/>
  ${coaster}${wh}
  <rect x="440" y="300" width="70" height="680" fill="#e9e2d3"/><path d="M420 300 L475 140 L530 300 Z" fill="#2f4f9a"/><circle cx="475" cy="380" r="22" fill="#c8352c"/>
  <rect y="980" width="${W}" height="${H}" fill="#d8cdb8"/><rect y="980" width="${W}" height="24" fill="#c8bca4"/>
  ${gate ? `<rect x="80" y="760" width="60" height="400" fill="#c8352c"/><rect x="940" y="760" width="60" height="400" fill="#c8352c"/>
    <path d="M60 780 Q540 600 1020 780 L1020 900 Q540 720 60 900 Z" fill="#2f4f9a"/>
    <text x="540" y="835" text-anchor="middle" font-family="Anton" font-size="110" fill="#f4f4f2" letter-spacing="8">LIBERTY LAND</text>
    ${[...Array(9)].map((_, i) => `<path transform="translate(${140 + i * 100},${760 - Math.sin((i + .5) / 9 * Math.PI) * 140}) scale(.5)" d="M0 -30 l9 20 l22 2 l-17 14 l6 22 l-20 -12 l-20 12 l6 -22 l-17 -14 l22 -2 Z" fill="#f2c230"/>`).join('')}` : ''}
  ${people}`;
}
function streetCrowd(t, o = {}) {
  const { run = 0, phones = 0, red = 0, n = 10, y0 = 1180 } = o;
  let p = '';
  for (let i = 0; i < n; i++) {
    const side = i % 2 ? 1 : -1;
    const x = run ? ((i * 160 + t * 600 * (i % 3 + 1) * .5) % 1400) - 200 : 60 + (i * 113) % 980;
    const y = y0 + (i % 3) * 60;
    p += townsfolk(x, y, .95 + (i % 3) * .1, ['#c8352c', '#2f4f9a', '#e8a020', '#3a7a5a', '#f4f4f2'][i % 5], run ? 1 : side, t + i, run);
    if (phones && !run) p += `<rect x="${x + 30}" y="${y - 330 - (i % 3) * 30}" width="34" height="60" rx="6" fill="#121418"/><rect x="${x + 34}" y="${y - 326 - (i % 3) * 30}" width="26" height="46" fill="#7fb0d8"/>`;
  }
  return p + (red ? `<rect width="${W}" height="${H}" fill="#c8352c" opacity="${red}"/>` : '');
}

S.p_hook = (t, d, T) => {
  const c1 = capL('p_hook', 1, T, t);
  const z = 1 + .5 * easeIO(seg(t, c1 - .3, d));
  const svg = libertyPark(t, { gate: false }) + streetCrowd(t, { run: 1, n: 12, red: .12 }) + buck({ x: 540, y: 1330, s: 1.5, still: true, t }) + vign(.5);
  return { svg: `<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${svg}</g>`, cam: 1 };
};
S.p_park = (t, d, T) => {
  const c1 = capL('p_park', 1, T, t);
  const svg = libertyPark(t, { crowd: 120 }) + (t > c1 ? pill(540, 260, '4TH OF JULY · 90,000 GUESTS', { sc: back(seg(t, c1, c1 + .3)), bg: '#c8352c', fg: '#fff', size: 34, bold: 700 }) : pill(540, 260, 'DAY 1', { sc: back(seg(t, .1, .4)), bg: PAL.yel, size: 44, bold: 700 })) + vign(.35);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.p_riley = (t, d, T) => {
  const c1 = capL('p_riley', 1, T, t);
  let svg;
  if (t < c1) svg = `<rect width="${W}" height="${H}" fill="#cfc6b4"/><rect y="1150" width="${W}" height="${H}" fill="#8f8a7d"/>
    <rect x="620" y="420" width="360" height="200" fill="#2f4f9a"/><text x="800" y="540" text-anchor="middle" font-family="Anton" font-size="56" fill="#fff">BACKSTAGE</text>` +
    riley({ x: 360, y: 1180, s: 1.5, f: 1, look: 1, armF: [70, 40] }) + `<g transform="translate(600,880)"><circle r="70" fill="#f4f4f2"/><circle cx="-22" cy="-12" r="14" fill="#fff" stroke="#ddd"/><circle cx="22" cy="-12" r="14" fill="#fff" stroke="#ddd"/><circle cx="-20" cy="-10" r="7" fill="#1d1f22"/><circle cx="24" cy="-10" r="7" fill="#1d1f22"/><path d="M-30 20 Q0 26 30 20 L12 56 L-12 56 Z" fill="#f2b220"/></g>` +
    pill(360, 560, 'RILEY · 19', { sc: back(seg(t, .1, .4)), bg: '#3a7a5a', fg: '#fff', size: 34, bold: 700 });
  else svg = libertyPark(t, { gate: false }) + buck({ x: 540, y: 1300, s: 1.5, wave: 1, t, sweat: 1 }) + pill(540, 300, '8 HRS · 95°F', { sc: back(seg(t, c1, c1 + .3)), bg: '#c8352c', fg: '#fff', size: 40, bold: 700 });
  return { svg: svg + vign(.4), cam: 1.0 + .04 * (t / d) };
};
function paradeFloat(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-260" y="-180" width="520" height="180" rx="20" fill="#2f4f9a"/>
    ${[...Array(5)].map((_, i) => `<rect x="-260" y="${-150 + i * 30}" width="520" height="14" fill="${i % 2 ? '#c8352c' : '#f4f4f2'}"/>`).join('')}
    <circle cx="-170" cy="10" r="40" fill="#1d1f22"/><circle cx="170" cy="10" r="40" fill="#1d1f22"/>
    <path d="M-120 -180 L0 -330 L120 -180 Z" fill="#f2c230"/><path transform="translate(0,-240) scale(1.2)" d="M0 -30 l9 20 l22 2 l-17 14 l6 22 l-20 -12 l-20 12 l6 -22 l-17 -14 l22 -2 Z" fill="#c8352c"/></g>`;
}
S.p_parade = (t, d, T) => {
  const c1 = capL('p_parade', 1, T, t);
  const fall = easeIn(seg(t, .8, 1.6));
  const bite = t > c1;
  const svg = libertyPark(t, { gate: false }) + paradeFloat(lerp(1300, 700, seg(t, 0, d)), 1100, .9) + buck({ x: 260, y: 1150, s: .9, wave: 1, t }) +
    streetCrowd(t, { n: 6, y0: 1350 }) +
    (bite ? zomb({ x: 640, y: 1500, s: 1.1, t, col: '#3a4a3a', eyes: 1, armsUp: 1.2 }) + townsfolk(760, 1500, 1.2, '#e8a020', -1, t, false) + `<rect width="${W}" height="${H}" fill="#c8352c" opacity="${t < c1 + .3 ? .35 : 0}"/>`
      : `<g transform="rotate(${fall * 85} 640 1500)">${townsfolk(640, 1500, 1.2, '#5a6a5a', 1, t, false)}</g>`) + vign(.4);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.p_clap = (t, d, T) => {
  const c1 = capL('p_clap', 1, T, t);
  const svg = libertyPark(t, { gate: false }) + streetCrowd(t, { n: 9, phones: t > c1 ? 1 : 0, y0: 1220 }) +
    (t > c1 ? `<text x="200" y="${700 - Math.abs(Math.sin(t * 6)) * 20}" font-family="Anton" font-size="70" fill="#fff" stroke="#1d1f22" stroke-width="6" paint-order="stroke">CLAP CLAP</text>` : '') +
    pill(540, 300, 'PART OF THE SHOW?', { sc: back(seg(t, .1, .4)), bg: '#25282c', fg: '#fff', size: 36, bold: 700 }) + vign(.4);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.p_scream = (t, d, T) => {
  const sh = (rnd(Math.floor(t * 40)) - .5) * 14;
  const svg = libertyPark(t, { gate: false }) + streetCrowd(t, { run: 1, n: 12, red: .15 + .1 * Math.sin(t * 8) }) +
    `<text x="540" y="560" text-anchor="middle" font-family="Anton" font-size="140" fill="#c8352c" stroke="#fff" stroke-width="8" paint-order="stroke" opacity="${seg(t, .1, .3)}">AAAAAH</text>` + vign(.45);
  return { svg: `<g transform="translate(${sh},0)">${svg}</g>`, cam: 1.03 };
};
S.p_gate = (t, d, T) => {
  let dots = '';
  for (let i = 0; i < 400; i++) {
    const k = ((t * .15 + rnd(i)) % 1);
    const x0 = rnd(i + 3) * W, y0 = 1900 - rnd(i + 7) * 700;
    const x = lerp(x0, 540 + (rnd(i + 2) - .5) * 260, k), y = lerp(y0, 900, k);
    dots += `<circle cx="${x}" cy="${y}" r="9" fill="${['#c8352c', '#2f4f9a', '#f4f4f2', '#e8a020'][i % 4]}"/>`;
  }
  const svg = `<rect width="${W}" height="${H}" fill="#d8cdb8"/><rect x="0" y="0" width="${W}" height="820" fill="#7fa86a"/>
  <rect x="300" y="700" width="480" height="200" fill="#c8352c"/><text x="540" y="830" text-anchor="middle" font-family="Anton" font-size="90" fill="#fff">EXIT</text>
  ${dots}${pill(540, 300, '1 EXIT · 90,000 PEOPLE', { bg: '#c8352c', fg: '#fff', size: 36, bold: 700, sc: back(seg(t, .2, .5)) })}` + vign(.4);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.p_stuck = (t, d, T) => {
  const c1 = capL('p_stuck', 1, T, t);
  const tug = Math.sin(t * 9) * 8;
  const svg = libertyPark(t, { gate: false }) + streetCrowd(t, { run: 1, n: 6, red: .1 }) + buck({ x: 540, y: 1600, s: 2.0, t, armsUp: t > c1 ? 1 : 0, tilt: t > c1 ? tug : 0, sweat: 1 }) +
    (t > c1 ? pill(540, 220, '40 LBS · HEAD STUCK', { sc: back(seg(t, c1, c1 + .3)), bg: '#c8352c', fg: '#fff', size: 34, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.p_statue = (t, d, T) => {
  const c1 = capL('p_statue', 1, T, t);
  const svg = libertyPark(t, { gate: false }) + `<rect width="${W}" height="${H}" fill="#000" opacity="${seg(t, c1, d) * .25}"/>` + streetCrowd(t * 1.5, { run: 1, n: 10 }) +
    buck({ x: 540, y: 1300, s: 1.5, still: true, t }) + (t > c1 ? pill(540, 260, "DON'T. MOVE.", { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 44, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.p_past = (t, d, T) => {
  const c1 = capL('p_past', 1, T, t);
  let zs = '';
  for (let i = 0; i < 6; i++) zs += zomb({ x: ((i * 230 + t * 260) % 1500) - 200, y: 1250 + (i % 2) * 140, s: .9, t, ph: i, col: '#2e3a34', eyes: 1, armsUp: .9 });
  const sniff = zomb({ x: 760, y: 1300, s: 1.0, t, col: '#2e3a34', eyes: 1, armsUp: .5, f: -1 });
  const svg = libertyPark(t, { gate: false, kind: 'dusk' }) + `<rect width="${W}" height="${H}" fill="#2a0a1a" opacity=".2"/>` + buck({ x: 460, y: 1300, s: 1.4, still: true, t }) + (t < c1 + 1 ? sniff : '') + zs +
    (t > c1 ? pill(540, 260, 'FOAM = NO SMELL', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 38, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.p_door = (t, d, T) => {
  const k = easeIO(seg(t, capL('p_door', 1, T, t) - .3, d));
  const svg = `<rect width="${W}" height="${H}" fill="#cfc6b4"/>${[...Array(9)].map((_, i) => `<rect x="0" y="${i * 150}" width="${W}" height="6" fill="#bdb3a0"/>`).join('')}
  <rect y="1150" width="${W}" height="${H}" fill="#8f8a7d"/>
  <rect x="380" y="480" width="360" height="680" fill="#55606c"/><rect x="${380 + k * 300}" y="480" width="${360 - k * 300}" height="680" fill="#6a7684"/>
  <rect x="400" y="560" width="320" height="110" rx="10" fill="#f4f4f2"/><text x="560" y="610" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="34" fill="#c8352c">CAST MEMBERS</text><text x="560" y="652" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="34" fill="#c8352c">ONLY</text>
  ${[0, 1, 2, 3].map(i => `<circle cx="${80 + i * 60}" cy="1120" r="80" fill="#4f8a4a"/>`).join('')}${[0, 1, 2].map(i => `<circle cx="${880 + i * 70}" cy="1120" r="80" fill="#4f8a4a"/>`).join('')}
  ${buck({ x: lerp(200, 560, k), y: 1180, s: .85, t: t * 2, wave: 0 })}` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
function serviceTunnel(t, o = {}) {
  return `<rect width="${W}" height="${H}" fill="#4a4e54"/>
  <path d="M0 0 L380 760 L700 760 L1080 0 Z" fill="#5a5f66"/><path d="M0 1920 L380 1060 L700 1060 L1080 1920 Z" fill="#3a3e44"/>
  <path d="M0 0 L380 760 L380 1060 L0 1920 Z" fill="#62676e"/><path d="M1080 0 L700 760 L700 1060 L1080 1920 Z" fill="#565b62"/>
  <rect x="380" y="760" width="320" height="300" fill="#2a2d32"/>
  <path d="M0 260 L380 860" stroke="#8a8f96" stroke-width="22"/><path d="M0 330 L380 880" stroke="#c8352c" stroke-width="14"/><path d="M1080 300 L700 870" stroke="#8a8f96" stroke-width="22"/>
  <path d="M120 1920 L470 1060 M960 1920 L610 1060" stroke="#f2c230" stroke-width="10" stroke-dasharray="40 30"/>
  ${[0, 1].map(i => `<rect x="${i ? 760 : 180}" y="${i ? 520 : 480}" width="140" height="60" rx="6" fill="#f2c230"/><text x="${i ? 830 : 250}" y="${i ? 562 : 522}" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="30" fill="#1d1f22">${i ? 'ZONE C' : 'ZONE B'}</text>`).join('')}
  <circle cx="540" cy="500" r="${30 + Math.sin(t * 2) * 2}" fill="#fff6d0" opacity=".7"/><circle cx="540" cy="500" r="160" fill="#fff6d0" opacity=".08"/>`;
}
S.p_raccoon = (t, d, T) => {
  const c1 = capL('p_raccoon', 1, T, t), c2 = capL('p_raccoon', 2, T, t);
  const svg = serviceTunnel(t) + buck({ x: 300, y: 1250, s: 1.2, still: t < c1, t }) +
    (t > c1 ? `<rect x="600" y="1120" width="260" height="150" fill="#8a6a46"/><rect x="600" y="1120" width="260" height="16" fill="#a07a50"/><path d="M600 1120 L860 1270 M860 1120 L600 1270" stroke="#6a4a32" stroke-width="8"/>` + raccoon(720, 1120, 1.5, { f: -1, t }) : '') + (t > c2 ? pill(720, 820, 'BANDIT', { sc: back(seg(t, c2, c2 + .3)), bg: '#8a8a90', fg: '#fff', size: 40, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.p_music = (t, d, T) => {
  const c1 = capL('p_music', 1, T, t), c2 = capL('p_music', 2, T, t);
  let svg;
  if (t < c2) {
    const play = t > c1;
    const notes = play ? [...Array(6)].map((_, i) => { const k = ((t * .8 + i / 6) % 1); return `<text x="${560 + Math.sin(i * 2 + t) * 120}" y="${560 - k * 300}" font-family="DejaVu Sans, sans-serif" font-size="80" fill="#f2c230" opacity="${1 - k}">♪</text>`; }).join('') : '';
    svg = serviceTunnel(t) + `<g transform="translate(540,700)"><path d="M-60 -40 L60 -110 L60 110 L-60 40 Z" fill="#2b2f36"/><rect x="-100" y="-50" width="50" height="100" rx="8" fill="#1d1f22"/></g>` + notes +
      buck({ x: 300, y: 1250, s: 1.2, still: true, t, tilt: play ? 10 : 0 }) + `<rect x="640" y="1120" width="260" height="150" fill="#8a6a46"/><rect x="640" y="1120" width="260" height="16" fill="#a07a50"/><path d="M640 1120 L900 1270 M900 1120 L600 1270" stroke="#6a4a32" stroke-width="8"/>` + raccoon(760, 1120, 1.4, { f: -1, t, churro: 0 });
  } else {
    let zs = '';
    for (let i = 0; i < 9; i++) zs += zomb({ x: 100 + i * 110, y: 1180 + (i % 3) * 50, s: .55, t, ph: i, col: '#141820', eyes: 1, armsUp: .4, back: true });
    svg = libertyPark(t, { gate: false, kind: 'dusk' }) + paradeFloat(540, 1100, .8) + zs + `<rect width="${W}" height="${H}" fill="#2a0a1a" opacity=".25"/>` + pill(540, 300, 'WHO?', { sc: back(seg(t, c2 + .4, c2 + .7)), bg: PAL.red, fg: '#fff', size: 50, bold: 700 });
  }
  return { svg: svg + vign(.5), cam: 1.0 + .05 * (t / d) };
};
S.end_p = (t, d, T) => {
  const r = tomorrowCard(2)(t, d, T);
  return { svg: r.svg.replace('FOLLOW SO YOU', 'LIBERTY LAND · FOLLOW SO YOU'), cam: 1 };
};
