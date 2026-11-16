// ---------- Part 15 (finale) scenes ----------
function shallowSea(t, sandK = .6) {
  return `<defs>${linGrad('ss15', [[0, '#c98a6a'], [1, '#f2c9a0']])}</defs>
  <rect width="${W}" height="1050" fill="url(#ss15)"/>
  <rect y="1040" width="${W}" height="${H}" fill="#2f5466"/>
  <path d="M-20 ${1300 + (1 - sandK) * 40} Q300 ${1250 + (1 - sandK) * 40} 540 ${1280 + (1 - sandK) * 40} Q800 ${1310 + (1 - sandK) * 40} 1100 ${1260 + (1 - sandK) * 40} L1100 1420 Q540 1460 -20 1420 Z" fill="#d9c08e" opacity="${.35 + .55 * sandK}"/>
  ${waveDashes(1050, 1900, t, '#cfe3ea', 30, 431, .4)}`;
}

// 1 ---------------------------------------------------------------
S.recap15 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const r = S.behind(t + 3, d + 3, T);
  const svg = r.svg.replace(/TIDE TURNING/, 'TIDE: GOING OUT') + `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="220" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">FINALE</text>
    ${pill(540, 300, 'PART 15 · DAWN', { bg: PAL.yel, size: 28 })}</g>`;
  return { svg, cam: 1.0 + .04 * p };
};

// 2 ---------------------------------------------------------------
S.sandbar = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, capL('sandbar', 1, T, t), capL('sandbar', 1, T, t) + .35));
  const svg = `<rect width="${W}" height="${H}" fill="#6e4a30"/>
  <g transform="rotate(-2 540 960)">
    <rect x="70" y="300" width="940" height="1260" rx="14" fill="#cfe0e6"/>
    ${[...Array(12)].map((_, i) => `<line x1="70" y1="${300 + i * 105}" x2="1010" y2="${300 + i * 105}" stroke="#b8cdd6" stroke-width="2"/>`).join('')}
    <path d="M120 820 Q400 760 560 800 Q760 850 960 790 L960 880 Q760 940 560 900 Q360 860 120 910 Z" fill="#e2cf9e" opacity="${seg(t, .2, 1.2)}"/>
    <circle cx="540" cy="1320" r="18" fill="${PAL.coat}" stroke="#22252a" stroke-width="5"/>
    ${[...Array(12)].map((_, i) => `<circle cx="${180 + i * 65}" cy="${1480 + (i % 2) * 20}" r="10" fill="#e0473a"/>`).join('')}
    ${k > 0 ? `<line x1="540" y1="1300" x2="540" y2="900" stroke="#22252a" stroke-width="5" stroke-dasharray="12 10"/>` : ''}
  </g>
  ${k > 0 ? pill(540, 680, 'SANDBAR', { sc: k, bg: '#c49a3a', fg: '#fff', size: 40, bold: 700 }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 3 ---------------------------------------------------------------
S.light_heavy = (t, d, T) => {
  const p = t / d;
  const k1 = back(seg(t, 0, .4)), k2 = back(seg(t, capL('light_heavy', 1, T, t), capL('light_heavy', 1, T, t) + .4));
  const svg = `<rect width="${W}" height="${H}" fill="#1b212c"/>
  <rect y="1150" width="${W}" height="${H}" fill="#2f5466"/>
  <g transform="translate(300,${1150 + 30}) scale(${k1})">${crewBoat(0, 0, .55, t, { lit: 0 })}</g>
  <g transform="translate(300,1300)" opacity="${clamp(k1)}"><line x1="0" y1="-100" x2="0" y2="-60" stroke="#4f8a6a" stroke-width="10"/><text y="40" text-anchor="middle" font-family="Anton" font-size="56" fill="#4f8a6a">LIGHT</text></g>
  <g transform="translate(790,${1150 + 90}) scale(${k2})">${fishBoat(0, 0, .65, { t, crew: 3 })}</g>
  <g transform="translate(790,1420)" opacity="${clamp(k2)}"><text y="0" text-anchor="middle" font-family="Anton" font-size="56" fill="#c8352c">HEAVY</text></g>
  <path d="M60 1180 L1020 1180" stroke="#d9c08e" stroke-width="10" stroke-dasharray="20 14" opacity=".8"/>
  ${pill(540, 1110, 'SANDBAR DEPTH', { bg: '#d9c08e', size: 26, bold: 700 })}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 4 ---------------------------------------------------------------
S.scrape = (t, d, T) => {
  const p = t / d;
  const c1 = capL('scrape', 1, T, t);
  const bx = lerp(-100, 1100, easeIO(seg(t, 0, d)));
  const tilt = t < c1 && t > .4 ? Math.sin(t * 30) * 2 : 0;
  const sparks = t > .5 && t < c1 + .3 ? [...Array(8)].map((_, i) => `<circle cx="${bx - 120 + rnd(i + Math.floor(t * 20)) * 240}" cy="${1330 + rnd(i + 2) * 30}" r="${5 + rnd(i) * 6}" fill="#e9dcb0" opacity=".8"/>`).join('') : '';
  const svg = shallowSea(t, .9) + `<g transform="rotate(${tilt} ${bx} 1300)">${crewBoat(bx, 1310, .75, t, { lit: 0 })}</g>${sparks}` + vign(.4);
  return { svg, cam: 1.0 + .04 * p };
};

// 5 ---------------------------------------------------------------
S.aground = (t, d, T) => {
  const p = t / d;
  const hits = [capL('aground', 1, T, t) - .1, capL('aground', 2, T, t) + .2, capL('aground', 2, T, t) + .9];
  let boats = '', sh = 0;
  hits.forEach((h, i) => {
    const x = lerp(-400, 260 + i * 260, easeIn(clamp(t / h)));
    const tilt = t > h ? lerp(0, 9, seg(t, h, h + .3)) : 0;
    if (t > h && t < h + .3) sh = 12;
    boats += `<g transform="rotate(${tilt} ${x} 1320)">${fishBoat(x, 1320 - i * 20, .62, { t, crew: 3, ph: i })}</g>`;
    if (t > h) boats += [...Array(8)].map((_, j) => { const s2 = seg(t, h, h + .8); return `<circle cx="${x + 180 + (rnd(j + i) - .5) * 160 * s2}" cy="${1340 - Math.sin(s2 * 3.14) * (40 + rnd(j) * 90)}" r="${6 + rnd(j) * 8}" fill="#e9dcb0" opacity="${1 - s2}"/>`; }).join('');
  });
  const svg = `<g transform="translate(${(rnd(Math.floor(t * 50)) - .5) * sh},0)">${shallowSea(t, .9)}${boats}</g>` + vign(.4);
  return { svg, cam: 1.0 + .03 * p };
};

// 6 ---------------------------------------------------------------
S.stuck = (t, d, T) => {
  const p = t / d;
  let boats = '';
  for (let i = 0; i < 12; i++) boats += `<g transform="rotate(${(rnd(i) - .5) * 14} ${80 + (i % 6) * 180} ${1300 + Math.floor(i / 6) * 120})">${fishBoat(80 + (i % 6) * 180, 1300 + Math.floor(i / 6) * 120, .28, { t, crew: 2, ph: i })}</g>`;
  const svg = shallowSea(t, 1) + boats + pill(540, 300, 'STUCK UNTIL HIGH TIDE', { bg: '#c49a3a', fg: '#fff', size: 36, bold: 700, sc: back(seg(t, .3, .6)) }) + vign(.4);
  return { svg, cam: 1.06 - .04 * p };
};

// 7 ---------------------------------------------------------------
S.flare_sand = (t, d, T) => {
  const p = t / d;
  const fk = seg(t, .2, capL('flare_sand', 1, T, t) - .3);
  const lit = seg(t, capL('flare_sand', 1, T, t) - .3, capL('flare_sand', 1, T, t) + .4);
  const fx = 540, fy = lerp(700, 1380, easeIn(fk));
  let figs = '';
  for (let i = 0; i < 8; i++) {
    const bx = 80 + i * 135;
    const turn = seg(t, capL('flare_sand', 1, T, t) + i * .12, capL('flare_sand', 1, T, t) + i * .12 + .3);
    figs += zomb({ x: bx + (540 - bx) * turn * .15, y: 1290, s: .5, t, ph: i, col: '#05070b', eyes: turn, f: bx < 540 ? 1 : -1, armsUp: .3 + turn });
  }
  const svg = `<rect width="${W}" height="${H}" fill="#151a24"/>${stars(30, 161, 800)}
  <rect y="1040" width="${W}" height="${H}" fill="#0f1c2b"/>
  <path d="M-20 1290 Q540 1260 1100 1290 L1100 1420 Q540 1450 -20 1420 Z" fill="#6a5a3e"/>
  ${[...Array(8)].map((_, i) => fishBoat(80 + i * 135, 1270, .2, { t, crew: 0, lit: 0 })).join('')}
  ${figs}
  ${fk > 0 ? `<circle cx="${fx}" cy="${fy}" r="${16 + lit * 8}" fill="#ffd0c0" filter="url(#zglow)"/>` : ''}
  <circle cx="540" cy="1380" r="${lit * 420}" fill="#ff4a2a" opacity="${lit * .18}"/>
  ${crewBoat(540, 1700, .6, t, { lit: 0 })}
  ${vign(.65)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 8 ---------------------------------------------------------------
S.vera_radio = (t, d, T) => ({ svg: radioClose(t, { talk: 1 }) + vign(.6), cam: 1.03 + .04 * (t / d) });

// 9 ---------------------------------------------------------------
S.theo_answer = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 12)) > .45 ? 'o' : 'flat';
  const svg = `<defs>${morningSky('ta15')}</defs><rect width="${W}" height="${H}" fill="url(#ta15)"/><rect y="1100" width="${W}" height="${H}" fill="#56789a"/>${waveDashes(1110, 1900, t, '#d8e7ef', 24, 441, .4)}
  ${theo({ x: 340, y: 1720, s: 3.0, f: 1, look: 1, mouth: talk, armF: [120, 20], armB: [10, 10] })}
  <g transform="translate(640,960) rotate(-14)"><rect x="-50" y="-110" width="100" height="200" rx="18" fill="#262a30"/><rect x="-36" y="-92" width="72" height="56" rx="8" fill="#0f2014"/><line x1="26" y1="-110" x2="36" y2="-200" stroke="#1d1f22" stroke-width="10" stroke-linecap="round"/></g>
  ${vign(.45)}`;
  return { svg, cam: 1.02 + .04 * p };
};

// 10 --------------------------------------------------------------
S.radio_off = (t, d, T) => {
  const p = t / d;
  const off = t > d * .45;
  const svg = radioClose(t, { blink: off ? 0 : 1 }).replace(/#ff3b2e/g, off ? '#3a2a25' : '#ff3b2e') +
    `<path d="M1300 ${lerp(1200, 1000, seg(t, 0, d * .45))} L${lerp(1300, 760, seg(t, 0, d * .45))} 900 L${lerp(1300, 760, seg(t, 0, d * .45))} 1000 L1300 ${lerp(1320, 1100, seg(t, 0, d * .45))} Z" fill="${PAL.coat}"/>
    <ellipse cx="${lerp(1300, 720, seg(t, 0, d * .45))}" cy="950" rx="60" ry="48" fill="${PAL.skin}"/>
    <rect width="${W}" height="${H}" fill="#000" opacity="${off ? .25 : 0}"/>` + vign(.6);
  return { svg, cam: 1.0 + .04 * p };
};

// 11 --------------------------------------------------------------
S.new_island = (t, d, T) => {
  const p = t / d;
  const c2 = capL('new_island', 2, T, t);
  const svg = `<defs>${linGrad('ni15', [[0, '#7d9cc4'], [.6, '#f2b08a'], [1, '#ffe0a8']])}</defs>
  <rect width="${W}" height="1100" fill="url(#ni15)"/>
  <circle cx="780" cy="${lerp(1000, 900, p)}" r="100" fill="#fff1c4" opacity=".95"/>
  <rect y="1090" width="${W}" height="${H}" fill="#3e5d7c"/>${waveDashes(1100, 1900, t, '#d8e7ef', 30, 451, .45)}
  <g transform="translate(540 1200) scale(${lerp(.7, 1, easeIO(p))}) translate(-540 -1200)">
    ${islandShape(480, 1200, .85, '#7d9a5c')}
    ${lighthouse(560, 1120, .95, t > c2 ? .4 + .2 * Math.sin(t * 3) : 0, { body: '#e9e2d3', band: '#4f6b8a' })}
  </g>
  ${crewBoat(lerp(1000, 760, p), 1650, .6, t, { lit: 0 })}
  ${gulls(t, [[300, 600, 1, 0], [380, 640, .8, 1.2]])}
  ${vign(.35)}`;
  return { svg, cam: 1.0 };
};

// 12 --------------------------------------------------------------
S.sleep = (t, d, T) => {
  const p = t / d;
  const c2 = capL('sleep', 2, T, t);
  const z = (t * 25) % 50;
  const svg = `<defs>${linGrad('sl15', [[0, '#2a2e3e'], [1, '#3a3346']])}${linGrad('psk15', [[0, '#0b1222'], [1, '#22324a']])}</defs>
  <rect width="${W}" height="1190" fill="url(#sl15)"/>
  <clipPath id="port15"><circle cx="760" cy="500" r="168"/></clipPath>
  <g clip-path="url(#port15)"><rect x="560" y="300" width="400" height="420" fill="url(#psk15)"/>${stars(14, 171, 200).replace(/cx="([\d.]+)"/g, (m, v) => `cx="${590 + v * .32}"`).replace(/cy="([\d.]+)"/g, (m, v) => `cy="${330 + +v}"`)}
    <circle cx="840" cy="400" r="30" fill="#e8edf2"/><rect x="560" y="540" width="400" height="200" fill="#132034"/></g>
  <circle cx="760" cy="500" r="168" fill="none" stroke="#4a3f33" stroke-width="30"/>
  ${t > c2 - .3 ? `<g opacity="${seg(t, c2 - .3, c2 + .3)}">${cat({ x: 760, y: 600, s: 1.1, f: 1, pose: 'sit', look: .6 }).replace(/#d98a3c/g, '#c07a34')}</g>` : ''}
  <rect y="1190" width="${W}" height="${H}" fill="#3a2c22"/>
  <rect x="120" y="1050" width="620" height="90" rx="20" fill="#5a4636"/><rect x="120" y="980" width="620" height="90" rx="30" fill="#8a9aa8"/>
  <rect x="560" y="930" width="160" height="70" rx="30" fill="#e9e3d7"/>
  <g transform="translate(300,975) rotate(90)">${theo({ x: 0, y: 0, s: 1.15, f: 1, eyes: 'closed', look: 0 })}</g>
  <rect x="140" y="890" width="420" height="140" rx="34" fill="#b8432f"/><rect x="140" y="890" width="420" height="26" rx="13" fill="#d65a44"/>
  <text x="${300 + z * .4}" y="${800 - z}" font-family="Anton" font-size="70" fill="#f4efe4" opacity=".7">z</text><text x="${360 + z * .3}" y="${720 - z}" font-family="Anton" font-size="50" fill="#f4efe4" opacity=".5">z</text>
  <ellipse cx="760" cy="500" rx="300" ry="300" fill="#dfe7f2" opacity=".06"/>
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 13 --------------------------------------------------------------
S.the_end = (t, d, T) => {
  const a = easeOut(seg(t, 0, .8)), b = easeOut(seg(t, .7, 1.3)), c = easeOut(seg(t, 1.3, 2.0));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  ${cat({ x: 540, y: 640, s: 1.2, f: 1, pose: 'sit', look: 0 }).replace(/<g transform="translate\(540,640\)/, `<g opacity="${c}" transform="translate(540,640)`)}
  <text x="540" y="880" text-anchor="middle" font-family="Anton" font-size="150" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6">THE END</text>
  <rect x="${540 - 210 * b}" y="930" width="${420 * b}" height="6" fill="${PAL.yel}"/>
  <text x="540" y="1020" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="50" fill="${PAL.yel}" letter-spacing="8" opacity="${b}">SEASON 1</text>
  <text x="540" y="1130" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .85}">FOLLOW FOR SEASON 2</text>`, cam: 1 };
};
