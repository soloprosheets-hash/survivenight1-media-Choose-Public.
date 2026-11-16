// ---------- Part 11 scenes ----------
function fogLayer(t, op = .8, y0 = 0, y1 = H, seed = 0) {
  let g = `<g filter="url(#fgblur)" opacity="${op}">`;
  for (let i = 0; i < 14; i++) {
    const x = ((rnd(i + seed) * 1600 + t * (20 + rnd(i + 3) * 30)) % 1600) - 260;
    const y = lerp(y0, y1, rnd(i + 7 + seed));
    g += `<ellipse cx="${x}" cy="${y}" rx="${260 + rnd(i) * 200}" ry="${70 + rnd(i + 1) * 60}" fill="#c9d3dc" opacity="${.35 + rnd(i + 2) * .3}"/>`;
  }
  return g + '</g>';
}
// the stolen boat with the crew aboard
function crewBoat(x, y, s, t, o = {}) {
  const { lit = .6, catOn = true } = o;
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${fishBoat(0, 0, 1, { t, crew: 0, lit })}
    ${theo({ x: 140, y: -85, s: .55, f: 1, look: 1 })}
    ${ines({ x: -60, y: -80, s: .55, f: -1, gun: false })}
    ${mateo({ x: -170, y: -80, s: .55, f: -1 })}
    ${catOn ? cat({ x: 30, y: -80, s: .35, f: 1, pose: 'sit' }) : ''}
  </g>`;
}

// 1 ---------------------------------------------------------------
S.recap11 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const lk = seg(t, capL('recap11', 1, T, t), capL('recap11', 1, T, t) + 1.2);
  let lights = '';
  for (let i = 0; i < 12; i++) { const on = seg(lk, i / 14, i / 14 + .1); lights += `<circle cx="${70 + i * 86}" cy="${1030}" r="${6 + on * 4}" fill="#ffe7a0" opacity="${on}"/>`; }
  const svg = seaNight(t, 51, 1020) + lights + crewBoat(540, 1500 + Math.sin(t * 2) * 6, .9, t) +
    `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 11</text>
    ${pill(540, 310, 'NIGHT 7 · 12:40 AM', { bg: PAL.yel, size: 28 })}</g>` + vign(.7);
  return { svg, cam: 1.0 + .04 * p };
};

// 2 ---------------------------------------------------------------
S.net = (t, d, T) => {
  const p = t / d;
  const k = easeOut(seg(t, 0, d));
  let dots = '';
  for (let i = 0; i < 12; i++) {
    const a = rad(-70 + i * 12.7);
    const r = lerp(250, 560, k);
    const x = 540 + Math.sin(a) * r * 1.4, y = 1500 - Math.cos(a) * r * .2 + lerp(250, 80, k);
    dots += `<circle cx="${x}" cy="${y}" r="16" fill="#e0473a" stroke="#2a0e0b" stroke-width="4"/><path d="M${x} ${y + 18} l-10 40 M${x} ${y + 18} l10 40" stroke="#9fc0d6" stroke-width="3" opacity=".5"/>`;
  }
  const svg = `<rect width="${W}" height="${H}" fill="#0b1624"/>
  ${waveDashes(0, 1900, t * 2, '#2c4560', 46, 341, .6)}
  <path d="M120 ${1500 + lerp(250, 80, k)} Q540 ${1250 + lerp(250, 80, k)} 960 ${1500 + lerp(250, 80, k)}" stroke="#e0473a" stroke-width="4" stroke-dasharray="14 12" fill="none" opacity=".6"/>
  ${dots}
  <circle cx="540" cy="700" r="24" fill="${PAL.coat}" stroke="#fff" stroke-width="6"/>
  <path d="M540 730 L520 820 M540 730 L560 820" stroke="#e8f2f6" stroke-width="6" opacity=".6"/>
  ${pill(540, 620, 'YOU ARE HERE', { bg: '#f4efe4', size: 28, bold: 700 })}
  ${pill(540, 1850, 'THE FLEET', { bg: '#c8352c', fg: '#fff', size: 30, bold: 700 })}
  ${vign(.55)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 3 ---------------------------------------------------------------
S.gap = (t, d, T) => {
  const p = t / d;
  const c1 = capL('gap', 1, T, t), c2 = capL('gap', 2, T, t);
  const dist = t < c1 ? 340 : t < c2 ? Math.round(lerp(300, 240, seg(t, c1, c2))) : Math.round(lerp(200, 185, seg(t, c2, d)));
  const near = seg(t, 0, d);
  let lights = '';
  for (let i = 0; i < 7; i++) {
    const x = 100 + i * 145, y = lerp(980, 1060, near) + Math.sin(t * 3 + i) * 6;
    lights += `<circle cx="${x}" cy="${y}" r="${lerp(8, 22, near)}" fill="#ffe7a0"/><circle cx="${x}" cy="${y}" r="${lerp(30, 70, near)}" fill="#ffe7a0" opacity=".15"/>`;
  }
  const svg = seaNight(t, 53, 1000) + lights +
    `<path d="M-40 ${H} L-40 1500 Q540 1380 1120 1500 L1120 ${H} Z" fill="#1c2a30"/><rect x="-40" y="1480" width="1160" height="20" fill="#3a2a22"/>
    <g transform="translate(540,600)"><rect x="-240" y="-90" width="480" height="180" rx="30" fill="#f3eee2" stroke="#2a2c30" stroke-width="6"/>
    <text x="0" y="40" text-anchor="middle" font-family="Anton" font-size="120" fill="${dist < 250 ? '#c8352c' : '#22252a'}">${dist} M</text></g>` + vign(.7);
  return { svg, cam: 1.0 + .06 * p + (dist < 250 ? (rnd(Math.floor(t * 40)) - .5) * .006 : 0) };
};

// 4 ---------------------------------------------------------------
S.fleet_flare = (t, d, T) => {
  const p = t / d;
  const fk = seg(t, .2, capL('fleet_flare', 1, T, t));
  const red = seg(t, capL('fleet_flare', 1, T, t) - .1, capL('fleet_flare', 1, T, t) + .5);
  const fx = lerp(300, 620, fk), fy = 1000 - Math.sin(fk * Math.PI * .6) * 700;
  const svg = seaNight(t, 55, 1050) +
    `<circle cx="${fx}" cy="${fy}" r="18" fill="#ffd0c0" filter="url(#zglow)"/><path d="M300 1000 Q${(300 + fx) / 2} ${fy + 200} ${fx} ${fy}" stroke="#ff6a4a" stroke-width="5" fill="none" opacity=".6"/>
    <rect width="${W}" height="${H}" fill="#ff3a2a" opacity="${red * .32}"/>
    ${[...Array(8)].map((_, i) => fishBoat(80 + i * 140, 1100 + (i % 2) * 30, .22, { t, crew: 0, lit: .5 })).join('')}
    ${crewBoat(540, 1560, .85, t)}
    <rect width="${W}" height="${H}" fill="#ff3a2a" opacity="${red * .12}"/>` + vign(.65);
  return { svg, cam: 1.0 + .05 * p };
};

// 5 ---------------------------------------------------------------
S.fogwall = (t, d, T) => {
  const p = t / d;
  const pt = easeOut(seg(t, 0, capL('fogwall', 1, T, t)));
  const svg = seaNight(t, 57, 1100) +
    `<g transform="translate(${lerp(500, 0, p)},0)">${fogLayer(t, .95, 500, 1300, 3)}${fogLayer(t + 4, .9, 600, 1200, 9)}</g>
    <rect x="0" y="0" width="${W}" height="${H}" fill="#c9d3dc" opacity="${p * .1}"/>
    ${ines({ x: 300, y: 1680, s: 2.6, f: 1, look: 1, gun: false, armF: [lerp(10, 95, pt), lerp(10, -5, pt)], armB: [-10, 10] })}` + vign(.6);
  return { svg, cam: 1.0 + .05 * p };
};

// 6 ---------------------------------------------------------------
S.into_fog = (t, d, T) => {
  const p = t / d;
  const svg = seaNight(t, 59, 1100) + crewBoat(lerp(540, 600, p), 1500, lerp(.9, .6, p), t) + fogLayer(t, .9, 900, 1700, 5) +
    `<rect width="${W}" height="${H}" fill="#c9d3dc" opacity="${easeIO(seg(p, .2, 1)) * .9}"/>` + vign(.4);
  return { svg, cam: 1.0 + .05 * p };
};

// 7 ---------------------------------------------------------------
S.ines_off = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 12)) > .45 ? 'o' : 'flat';
  const svg = `<rect width="${W}" height="${H}" fill="#7d8894"/>` + fogLayer(t, .8, 0, 1900, 11) +
    ines({ x: 470, y: 1720, s: 3.1, f: 1, look: .3, mouth: talk, gun: false, armF: [10, 10], armB: [-10, 10] }) +
    `<rect width="${W}" height="${H}" fill="#2a3442" opacity=".35"/>` + fogLayer(t + 3, .5, 0, 1900, 13) + vign(.7);
  return { svg, cam: 1.02 + .05 * p };
};

// 8 ---------------------------------------------------------------
function fogScene(t, inner = '') {
  return `<rect width="${W}" height="${H}" fill="#56606c"/>${fogLayer(t, .9, 0, 1900, 21)}${inner}${fogLayer(t + 2, .7, 0, 1900, 23)}<rect width="${W}" height="${H}" fill="#1a2230" opacity=".35"/>`;
}
S.circling_fog = (t, d, T) => {
  const p = t / d;
  let ghosts = '';
  for (let i = 0; i < 4; i++) {
    const x = ((i * 380 + t * (60 + i * 15)) % 1600) - 260, y = 900 + i * 180;
    ghosts += `<g opacity="${.35 + i * .1}">${fishBoat(x, y, .35 + i * .12, { t, crew: 0, lit: .9 })}</g><circle cx="${x + 30}" cy="${y - 60}" r="${40 + i * 10}" fill="#ffe7a0" opacity=".25" filter="url(#fgblur)"/>`;
  }
  return { svg: fogScene(t, ghosts) + vign(.65), cam: 1.0 + .04 * p };
};

// 9 ---------------------------------------------------------------
S.fleet_man = (t, d, T) => {
  const p = t / d;
  const svg = fogScene(t, `${fishBoat(560, 1350, 1.4, { t, crew: 0, lit: .9 })}<g opacity=".85">${driverMan({ x: 720, y: 1130, s: 1.1, f: -1, look: 1, armF: [40, 60] }).replace(/#e8742a/g, '#2f3440').replace(/#c45a18/g, '#262a33')}</g>`) + vign(.7);
  return { svg, cam: 1.0 + .06 * p };
};

// 10 --------------------------------------------------------------
S.tip = (t, d, T) => {
  const p = t / d;
  const c1 = capL('tip', 1, T, t), c2 = capL('tip', 2, T, t);
  const tilt = t < c1 ? Math.sin(t * 6) * 2 * seg(t, 0, c1) : lerp(4, 62, easeIn(seg(t, c1, c2 + .4)));
  const caught = t > c2 + .4;
  const ang = caught ? 62 : tilt;
  const reach = easeOut(seg(t, c2, c2 + .45));
  const svg = `<rect width="${W}" height="${H}" fill="#3a4350"/>
  ${deckFloor(1300, true)}
  <g transform="translate(560,1300) rotate(${ang} 100 0)"><rect x="0" y="-260" width="200" height="260" rx="20" fill="#c8352c"/><rect x="70" y="-290" width="60" height="36" rx="8" fill="#8a2420"/><text x="100" y="-110" text-anchor="middle" font-family="Anton" font-size="52" fill="#fff">FUEL</text></g>
  ${cat({ x: 420, y: 1300, s: 1.6, f: 1, pose: 'sit', look: .6, ears: t > c1 ? -1 : 0 })}
  ${reach > 0 ? `<path d="M1300 ${lerp(900, 1050, reach)} L${lerp(1300, 860, reach)} ${lerp(980, 1110, reach)} L${lerp(1300, 870, reach)} ${lerp(1060, 1190, reach)} L1300 ${lerp(1020, 1150, reach)} Z" fill="#5f6b5a"/>
    <ellipse cx="${lerp(1300, 840, reach)}" cy="${lerp(1050, 1160, reach)}" rx="64" ry="50" fill="#e6d6c4"/>` : ''}
  ${caught ? pill(540, 700, 'CAUGHT', { sc: back(seg(t, c2 + .4, c2 + .7)), bg: '#4f8a6a', fg: '#fff', size: 44, bold: 700 }) : ''}
  ${fogLayer(t, .35, 0, 1900, 31)}
  ${vign(.65)}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 11 --------------------------------------------------------------
S.fade_away = (t, d, T) => {
  const p = t / d;
  let ghosts = '';
  for (let i = 0; i < 3; i++) {
    const x = 300 + i * 260 + p * 400, op = (1 - p) * (.4 + i * .1);
    ghosts += `<g opacity="${op}">${fishBoat(x, 950 + i * 120, .3 + i * .08, { t, crew: 0, lit: .9 })}</g>`;
  }
  return { svg: fogScene(t, ghosts + crewBoat(400, 1550, .7, t, { lit: 0 })) + vign(.65), cam: 1.0 + .03 * p };
};

// 12 --------------------------------------------------------------
S.hour = (t, d, T) => {
  const p = t / d;
  const k = seg(t, capL('hour', 1, T, t), d);
  const svg = `<rect width="${W}" height="${H}" fill="#56606c"/>${fogLayer(t * .5, .7, 0, 1900, 41)}
  ${deckFloor(1300, true)}
  <g transform="translate(440,1300)"><rect x="0" y="-260" width="200" height="260" rx="20" fill="#c8352c"/><rect x="70" y="-290" width="60" height="36" rx="8" fill="#8a2420"/><text x="100" y="-110" text-anchor="middle" font-family="Anton" font-size="52" fill="#fff">FUEL</text></g>
  ${k > 0 ? `<g opacity="${clamp(k * 3)}">${cat({ x: 540, y: 1012, s: 1.4, f: 1, pose: 'sleep', t })}</g>
    <text x="700" y="${880 - (t * 30) % 60}" font-family="Anton" font-size="60" fill="#f4efe4" opacity=".7">z</text><text x="750" y="${820 - (t * 30) % 60}" font-family="Anton" font-size="44" fill="#f4efe4" opacity=".5">z</text>` : cat({ x: 300, y: 1300, s: 1.4, f: 1, pose: 'sit' })}
  ${pill(540, 300, `${String(1 + Math.floor(p * 59)).padStart(2, '0')} MIN`, { bg: '#f3eee2', size: 38, bold: 700, border: '#2a2c30' })}
  <rect width="${W}" height="${H}" fill="#1a2230" opacity=".3"/>${vign(.6)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 13 --------------------------------------------------------------
S.map11 = (t, d, T) => {
  const p = t / d;
  const c1 = capL('map11', 1, T, t), c2 = capL('map11', 2, T, t), c3 = capL('map11', 3, T, t);
  const plats = [[260, 560], [420, 760], [700, 600], [820, 900], [330, 1050], [600, 1180]];
  let xs = '';
  plats.forEach(([x, y], i) => {
    const k = seg(t, c1 + i * .25, c1 + i * .25 + .25);
    xs += `<rect x="${x - 16}" y="${y - 16}" width="32" height="32" fill="#7a6b5c"/>` + (k > 0 ? `<path d="M${x - 32} ${y - 32} L${x - 32 + 64 * k} ${y - 32 + 64 * k} M${x + 32} ${y - 32} L${x + 32 - 64 * Math.max(0, k * 2 - 1)} ${y - 32 + 64 * Math.max(0, k * 2 - 1)}" stroke="#c8352c" stroke-width="10" stroke-linecap="round"/>` : '');
  });
  const ck = seg(t, c3, c3 + .9);
  const svg = `<rect width="${W}" height="${H}" fill="#6e4a30"/>
  <g transform="rotate(-2 540 960)">
    <rect x="70" y="300" width="940" height="1260" rx="14" fill="#e9e1cc"/>
    <path d="M70 300 L1010 300 L1010 420 Q760 470 560 440 Q300 400 70 480 Z" fill="#c9d4a8"/>
    <path d="M1010 1300 Q860 1280 820 1360 Q780 1460 860 1560 L1010 1560 Z" fill="#c9d4a8"/>
    ${xs}
    <g transform="translate(900,1430)"><rect x="-26" y="-20" width="52" height="40" fill="#3a4352"/><path d="M-40 20 L40 20 L40 30 L-40 30 Z" fill="#7a6b5c"/></g>
    ${ck > 0 ? `<ellipse cx="900" cy="1420" rx="${110 * ck}" ry="${90 * ck}" fill="none" stroke="#c8352c" stroke-width="10"/>` : ''}
    ${t > c3 + .6 ? `<text x="620" y="1560" font-family="Caveat" font-weight="700" font-size="110" fill="#c8352c" transform="rotate(-8 620 1560)">SAFE</text>` : ''}
  </g>
  ${vign(.45)}`;
  return { svg, cam: 1.0 + (t > c3 ? .12 * easeIO(seg(t, c3, d)) : 0) };
};

// 14 --------------------------------------------------------------
S.end_card11 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 12</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE MAP</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`, cam: 1 };
};
