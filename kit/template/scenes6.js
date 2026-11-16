// ---------- Part 6 scenes ----------
function ines(o = {}) {
  const save = { ...PAL };
  Object.assign(PAL, { coat: '#b8432f', coatD: '#93321f', hat: '#4a2e1a', hatD: '#3a2414', beard: PAL.skin, pants: '#3b3f4a' });
  const g = theo(o);
  Object.assign(PAL, save);
  const { x = 0, y = 0, s = 1, f = 1, gun = true } = o;
  const hx = x + f * s * 50, hy = y - s * 122;
  return g + (gun ? `<g transform="translate(${hx},${hy}) scale(${s * f},${s})"><rect x="-6" y="-14" width="58" height="22" rx="8" fill="#e8742a"/><rect x="-6" y="-2" width="18" height="34" rx="6" fill="#c95f20"/></g>` : '');
}
function deckFloor(y0 = 1250, night = false) {
  let g = `<rect y="${y0}" width="${W}" height="${H - y0}" fill="${night ? '#22262d' : '#5b5f66'}"/>`;
  for (let r = 0; r < 18; r++) for (let c = 0; c < 14; c++) {
    const x = c * 80 + (r % 2) * 40, y = y0 + 20 + r * 40;
    g += `<rect x="${x}" y="${y}" width="22" height="6" rx="3" fill="${night ? '#1a1d23' : '#4d5158'}" transform="rotate(${(r + c) % 2 ? 35 : -35} ${x + 11} ${y + 3})"/>`;
  }
  return g;
}
function platformSpot(t, k = 1, extra = '') {
  return `
  <rect width="${W}" height="${H}" fill="#7e9cbc"/>
  <rect y="1300" width="${W}" height="${H}" fill="#3e5d7c"/>
  ${waveDashes(1310, 1900, t, '#d8e7ef', 30, 191, .45)}
  ${platform(540, 1320, 1.45, { t, laundry: 1, spot: 1 })}
  ${extra}
  <defs>${radGrad('spotg6', [[0, '#fffbe8', 1], [.3, '#fffbe8', .55], [1, '#fffbe8', 0]])}</defs>
  <circle cx="${540 + 300 * 1.45}" cy="${1320 - 450 * 1.45}" r="${200 + k * 500}" fill="url(#spotg6)" opacity="${.85 * k}"/>`;
}

// 1 ---------------------------------------------------------------
S.recap6 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const svg = platformSpot(t, .8) + `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 6</text>
    ${pill(540, 310, 'DAY 3 · 7:05 AM', { bg: PAL.yel, size: 28 })}</g>` + vign(.45);
  return { svg, cam: 1.0 + .06 * p };
};

// 2 ---------------------------------------------------------------
S.fuel6 = (t, d, T) => {
  const p = t / d;
  const needle = lerp(-60, -78, easeOut(seg(t, .1, 1.2))) + Math.sin(t * 9) * 1.2;
  const k = back(seg(t, capL('fuel6', 2, T, t), capL('fuel6', 2, T, t) + .35));
  const svg = `
  <rect width="${W}" height="${H}" fill="#2a3a4c"/>
  ${waveDashes(0, 1900, t, '#3b5068', 40, 201, .5)}
  <g transform="translate(540,780)">
    <circle r="320" fill="#22252a"/><circle r="300" fill="#f3eee2"/>
    <path d="M${Math.cos(rad(-170)) * 245} ${Math.sin(rad(-170)) * 245} A245 245 0 0 1 ${Math.cos(rad(-125)) * 245} ${Math.sin(rad(-125)) * 245}" stroke="#e0473a" stroke-width="36" fill="none"/>
    ${[...Array(9)].map((_, i) => { const a = rad(-170 + i * 20); return `<line x1="${Math.cos(a) * 215}" y1="${Math.sin(a) * 215}" x2="${Math.cos(a) * 268}" y2="${Math.sin(a) * 268}" stroke="#22252a" stroke-width="8"/>`; }).join('')}
    <text x="-226" y="44" font-family="Anton" font-size="60" fill="#e0473a">E</text><text x="190" y="44" font-family="Anton" font-size="60" fill="#22252a">F</text>
    <line x1="0" y1="0" x2="0" y2="-235" stroke="#e0473a" stroke-width="14" stroke-linecap="round" transform="rotate(${needle})"/>
    <circle r="28" fill="#22252a"/>
    <text x="0" y="160" text-anchor="middle" font-family="Anton" font-size="92" fill="#e0473a">2 GAL</text>
  </g>
  ${k > 0 ? pill(540, 1520, 'TURN BACK = DRIFT', { sc: k, bg: '#c8352c', fg: '#fff', size: 44, bold: 700 }) : ''}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 3 ---------------------------------------------------------------
S.theo_reply = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 14)) > .4 ? 'o' : 'flat';
  const svg = `
  <defs>${morningSky('trsky')}</defs>
  <rect width="${W}" height="${H}" fill="url(#trsky)"/>
  <rect y="1150" width="${W}" height="${H}" fill="#56789a"/>
  ${waveDashes(1160, 1900, t, '#d8e7ef', 26, 211, .4)}
  ${platform(820, 1160, .75, { t, laundry: 1, sil: false })}
  ${theo({ x: 340, y: 2050, s: 3.0, f: 1, look: 1, mouth: talk, armF: [120, 20], armB: [10, 10] })}
  <g transform="translate(650,1070) rotate(-14)"><rect x="-50" y="-110" width="100" height="200" rx="18" fill="#262a30"/><rect x="-36" y="-92" width="72" height="56" rx="8" fill="#0f2014"/><line x1="26" y1="-110" x2="36" y2="-200" stroke="#1d1f22" stroke-width="10" stroke-linecap="round"/><circle cx="34" cy="-100" r="8" fill="#ff3b2e"/></g>
  ${vign(.45)}`;
  return { svg, cam: 1.02 + .04 * p };
};

// 4 ---------------------------------------------------------------
S.silence = (t, d, T) => {
  const p = t / d;
  const svg = `
  <defs>${morningSky('slsky')}</defs>
  <rect width="${W}" height="${H}" fill="url(#slsky)"/>
  <rect y="1500" width="${W}" height="${H}" fill="#56789a"/>
  ${waveDashes(1510, 1900, t * .4, '#d8e7ef', 20, 221, .35)}
  <g transform="translate(540 1520) scale(${1.9 + p * .2}) translate(-540 -1520)">
    ${platform(540, 1520, 1.0, { t, laundry: 1 })}
    ${zomb({ x: 300, y: 1185, s: .16, col: '#1d1f22', eyes: 0, back: true, t: 0 })}
  </g>
  ${gulls(t, [[300, 380, 1, 0]])}
  ${vign(.5)}`;
  return { svg, cam: 1.0 };
};

// 5 ---------------------------------------------------------------
S.ines_radio = (t, d, T) => ({ svg: radioClose(t, { talk: 1 }) + vign(.6), cam: 1.04 + .04 * (t / d) });

// 6 ---------------------------------------------------------------
S.sleeves = (t, d, T) => {
  const p = t / d;
  const up = easeOut(seg(t, .1, .9));
  const k = back(seg(t, capL('sleeves', 2, T, t), capL('sleeves', 2, T, t) + .35));
  const bob = Math.sin(t * 2) * 5;
  const svg = `
  <rect width="${W}" height="${H}" fill="#6f8daa"/>
  <rect y="1000" width="${W}" height="${H}" fill="#3e5d7c"/>
  ${waveDashes(1010, 1900, t, '#d8e7ef', 34, 231, .4)}
  <path d="M1000 -40 L120 1500 L900 1500 Z" fill="#fffbe8" opacity=".28"/>
  <g transform="translate(0,${bob})">
    ${theo({ x: 540, y: 1280, s: 1.8, f: 1, look: -.5, armF: [lerp(10, 135, up), lerp(10, 20, up)], armB: [lerp(-10, -135, up), lerp(10, -20, up)], eyes: 'open' })}
    <g transform="translate(560,1380) scale(1.5)">${boat(0, 0, 1)}</g>
  </g>
  ${cat({ x: 820, y: 1300 + bob, s: .8, f: -1, pose: 'sit', look: -.5 })}
  ${k > 0 ? pill(540, 360, 'NO BITES  ✓', { sc: k, bg: '#4f8a6a', fg: '#fff', size: 48, bold: 700 }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 7 ---------------------------------------------------------------
S.ladder_down = (t, d, T) => {
  const p = t / d;
  const k = easeIO(seg(t, capL('ladder_down', 1, T, t) - .3, d - .2));
  const X = lx => 540 + lx * 1.45, Y = ly => 1320 + ly * 1.45;
  const yEnd = lerp(-150, 20, k);
  let lad = `<line x1="${X(280)}" y1="${Y(-150)}" x2="${X(280)}" y2="${Y(yEnd)}" stroke="#5d5a55" stroke-width="10"/><line x1="${X(320)}" y1="${Y(-150)}" x2="${X(320)}" y2="${Y(yEnd)}" stroke="#5d5a55" stroke-width="10"/>`;
  for (let ly = -140; ly < yEnd; ly += 22) lad += `<line x1="${X(280)}" y1="${Y(ly)}" x2="${X(320)}" y2="${Y(ly)}" stroke="#5d5a55" stroke-width="7"/>`;
  const svg = platformSpot(t, 0, lad) +
    `<g transform="translate(${X(300) - 40},${1500 + Math.sin(t * 2) * 5})">${boat(0, 0, .55)}${theo({ x: -60, y: -30, s: .6, look: 1, f: 1 })}</g>` + vign(.45);
  return { svg, cam: 1.0 + .05 * p };
};

// 8 ---------------------------------------------------------------
S.meet = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, capL('meet', 3, T, t), capL('meet', 3, T, t) + .35));
  const k2 = back(seg(t, capL('meet', 5, T, t), capL('meet', 5, T, t) + .35));
  const svg = `
  <defs>${morningSky('mtsky')}</defs>
  <rect width="${W}" height="${H}" fill="url(#mtsky)"/>
  <rect y="980" width="${W}" height="300" fill="#56789a"/>
  <rect x="-20" y="560" width="520" height="700" fill="#c8bba5"/><rect x="-20" y="560" width="520" height="40" fill="#a0583a"/>
  ${[60, 200, 340].map(x => `<rect x="${x}" y="680" width="90" height="80" fill="#3a4352"/>`).join('')}
  <rect x="-20" y="1110" width="${W + 40}" height="12" fill="#2a2e36"/>${[...Array(10)].map((_, i) => `<rect x="${i * 120}" y="1110" width="8" height="150" fill="#2a2e36"/>`).join('')}
  ${deckFloor(1250)}
  ${theo({ x: 300, y: 1400, s: 1.7, f: 1, look: .8, armF: [10, 10], armB: [-8, 8] })}
  ${cat({ x: 120, y: 1420, s: .9, f: 1, pose: 'sit', look: .6 })}
  ${ines({ x: 800, y: 1400, s: 1.7, f: -1, look: .3, armF: [35, 40], armB: [-10, 20] })}
  ${k > 0 ? pill(800, 700, 'INES', { sc: k, bg: '#b8432f', fg: '#fff', size: 44, bold: 700 }) : ''}
  ${k2 > 0 ? pill(800, 790, 'DAY 9 ON THE PLATFORM', { sc: k2, bg: '#f3eee2', size: 28, bold: 700, border: '#2a2c30' }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 9 ---------------------------------------------------------------
S.rules = (t, d, T) => {
  const p = t / d;
  const lines = [['1. NO LIGHTS AFTER DARK', '#1d1f22'], ['2. NO NOISE', '#1d1f22'], ['3. NOBODY GOES BELOW DECK', '#c8352c']];
  const ls = lines.map(([tx, col], i) => {
    const r = seg(t, capL('rules', i + 1, T, t), capL('rules', i + 1, T, t) + .6);
    return r > 0 ? `<clipPath id="rl${i}"><rect x="130" y="${830 + i * 135 - 80}" width="${860 * r}" height="120"/></clipPath>
      <text x="140" y="${830 + i * 135}" font-family="Caveat" font-weight="700" font-size="${i === 2 ? 66 : 72}" fill="${col}" clip-path="url(#rl${i})">${tx}</text>` : '';
  }).join('');
  const svg = `
  <rect width="${W}" height="${H}" fill="#6a6e75"/>
  ${[...Array(10)].map((_, i) => `<line x1="0" y1="${i * 210}" x2="${W}" y2="${i * 210}" stroke="#5c6067" stroke-width="6"/>`).join('')}
  ${[...Array(30)].map((_, i) => `<circle cx="${30 + (i % 10) * 110}" cy="${105 + Math.floor(i / 10) * 630}" r="6" fill="#4f5359"/>`).join('')}
  <g transform="rotate(-1.5 540 960)">
    <rect x="90" y="460" width="900" height="1000" rx="10" fill="#efe8d8"/>
    <rect x="90" y="460" width="900" height="1000" rx="10" fill="none" stroke="#8a7a62" stroke-width="10"/>
    <text x="540" y="650" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="150" fill="#1d1f22">RULES</text>
    <path d="M300 690 Q540 710 780 685" stroke="#c8352c" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${ls}
    <path d="M200 1400 q30 -20 60 0" stroke="#8a7a62" stroke-width="6" fill="none"/>
  </g>
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 10 -- the hatch -----------------------------------------------------
function hatchTop(t, o = {}) {
  const { shake = 0, tug = 0, night = false, dust = 0 } = o;
  const sx = shake ? (rnd(Math.floor(t * 60)) - .5) * shake : 0, sy = shake ? (rnd(Math.floor(t * 60) + 5) - .5) * shake : 0;
  let ds = '';
  if (dust > 0) for (let i = 0; i < 24; i++) ds += `<circle cx="${540 + (rnd(i) - .5) * 600 * (.3 + dust)}" cy="${960 + (rnd(i + 3) - .5) * 600 * (.3 + dust)}" r="${3 + rnd(i + 1) * 4}" fill="#c9bfae" opacity="${(1 - dust) * .8}"/>`;
  return `
  ${deckFloor(0, night)}
  <g transform="translate(${sx},${sy})">
    <rect x="200" y="620" width="680" height="680" rx="20" fill="${night ? '#30343b' : '#6e737b'}" stroke="${night ? '#16181c' : '#3c4046'}" stroke-width="18"/>
    ${[0, 1, 2, 3].map(i => `<rect x="240" y="${680 + i * 150}" width="600" height="18" rx="9" fill="${night ? '#262a30' : '#5c6168'}"/>`).join('')}
    <text x="540" y="1220" text-anchor="middle" font-family="Anton" font-size="64" fill="${night ? '#6a5a20' : '#e3b23c'}" letter-spacing="6">LOWER DECK</text>
    <rect x="490" y="900" width="100" height="40" rx="10" fill="#2b2b2f"/>
    <g transform="translate(${tug * 18},${tug * 10})">
      <path d="M540 940 q-90 90 -40 200 M540 940 q90 90 40 200" stroke="#9aa0a6" stroke-width="16" fill="none"/>
      <g transform="translate(540,1180)"><path d="M-36 -40 Q-36 -90 0 -90 Q36 -90 36 -40" stroke="#b9bdc2" stroke-width="14" fill="none"/>
      <rect x="-56" y="-44" width="112" height="100" rx="16" fill="#e0a830"/><circle cx="0" cy="0" r="12" fill="#2b2b2f"/><rect x="-4" y="0" width="8" height="26" fill="#2b2b2f"/></g>
    </g>
  </g>
  ${ds}`;
}
S.below = (t, d, T) => {
  const p = t / d;
  const svg = hatchTop(t) + `<g transform="translate(540,${lerp(1980, 1720, easeOut(seg(t, 0, .8)))})"><ellipse cx="0" cy="120" rx="260" ry="130" fill="${PAL.coat}"/><ellipse cx="-150" cy="60" rx="60" ry="90" fill="${PAL.coatD}" transform="rotate(-30 -150 60)"/><circle cx="0" cy="0" r="120" fill="${PAL.hat}"/><circle cx="0" cy="0" r="120" fill="none" stroke="${PAL.hatD}" stroke-width="26"/><circle cx="0" cy="-6" r="30" fill="${PAL.hatD}"/></g>` + vign(.5);
  return { svg, cam: 1.0 + .06 * p };
};

// 11 --------------------------------------------------------------
S.padlock = (t, d, T) => {
  const p = t / d;
  const t1 = capL('padlock', 1, T, t) + 1.0, t2 = capL('padlock', 2, T, t);
  const tg = h => t > h ? Math.max(0, Math.sin((t - h) * 18) * Math.exp(-(t - h) * 7)) : 0;
  const tug = tg(t1) + tg(t2);
  const reach = easeOut(seg(t, capL('padlock', 1, T, t), t1));
  const svg = `<g transform="translate(540 1100) scale(1.9) translate(-540 -1100)">${hatchTop(t, { tug })}
    <path d="M1300 ${1500 - reach * 200} L${lerp(1100, 640, reach) + tug * 18} ${lerp(1500, 1180, reach)} L${lerp(1140, 680, reach) + tug * 18} ${lerp(1580, 1260, reach)} L1300 ${1640 - reach * 200} Z" fill="#b8432f"/>
    <ellipse cx="${lerp(1100, 610, reach) + tug * 18}" cy="${lerp(1500, 1210, reach)}" rx="50" ry="40" fill="${PAL.skin}"/></g>` + vign(.55);
  return { svg, cam: 1.0 };
};

// 12 --------------------------------------------------------------
S.night6 = (t, d, T) => {
  const p = t / d;
  const tail = Math.sin(t * 5) * 14;
  const svg = `
  <defs>${linGrad('n6sky', [[0, '#05080e'], [1, '#18233a']])}${radGrad('n6moon', [[0, '#dfe7f2', .4], [1, '#dfe7f2', 0]])}</defs>
  <rect width="${W}" height="860" fill="url(#n6sky)"/>${stars(50, 41, 700)}
  <circle cx="820" cy="260" r="60" fill="#e8edf2"/><circle cx="820" cy="260" r="240" fill="url(#n6moon)"/>
  <rect x="-20" y="700" width="${W + 40}" height="12" fill="#0f1116"/>${[...Array(10)].map((_, i) => `<rect x="${i * 120}" y="700" width="8" height="160" fill="#0f1116"/>`).join('')}
  ${deckFloor(850, true)}
  <path d="M160 1000 L860 1000 L940 1110 L80 1110 Z" fill="#30343b"/><rect x="80" y="1110" width="860" height="50" fill="#22262d"/>
  <rect x="470" y="1030" width="90" height="30" rx="8" fill="#6a5a20"/>
  <g transform="translate(700,1010) scale(1.7)">
    <path d="M-30 -6 Q-70 -4 ${-66 + tail} -40" fill="none" stroke="#b86d27" stroke-width="11" stroke-linecap="round"/>
  </g>
  ${cat({ x: 700, y: 1012, s: 1.7, f: -1, pose: 'sit', look: -1, ears: -1 }).replace(/<path d="M-30 -6 Q-70 -4 -66 -40"[^>]*>/, '')}
  ${night(.25)}${vign(.7)}`;
  return { svg, cam: 1.0 + .08 * p };
};

// 13 --------------------------------------------------------------
S.knock = (t, d, T) => {
  const p = t / d;
  const base = capL('knock', 2, T, t) + .95;
  const hits = [base, base + .38, base + .76];
  let s = 0, dust = 0, lastK = -1;
  hits.forEach((h, i) => { if (t > h) { s = Math.max(s, Math.max(0, 1 - (t - h) * 5)); dust = seg(t, h, h + .9); lastK = i; } });
  const svg = hatchTop(t, { night: true, shake: s * 40, tug: s * .8, dust }) +
    hits.map((h, i) => t > h ? `<text x="${[290, 560, 800][i]}" y="${[560, 400, 600][i]}" text-anchor="middle" font-family="Anton" font-size="${100 + 30 * Math.max(0, 1 - (t - h) * 4)}" fill="#e0473a" opacity="${clamp(1.4 - (t - h) * .6)}" transform="rotate(${-8 + i * 8} ${[290, 560, 800][i]} ${[540, 380, 580][i]})">KNOCK</text>` : '').join('') +
    night(.3) + `<rect width="${W}" height="${H}" fill="#fff" opacity="${s * .08}"/>` + vign(.8);
  return { svg, cam: 1.02 + .06 * p + s * .02 };
};

// 14 --------------------------------------------------------------
S.end_card6 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 7</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">BELOW DECK</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
