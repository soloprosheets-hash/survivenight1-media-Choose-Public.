// ---------- Part 12 scenes ----------
function townWall(x, y, s, t, o = {}) {
  const { lit = 1, smokeOn = true, waver = 0, dawn = true } = o;
  let houses = '';
  const cols = ['#b8432f', '#5d6b7a', '#a0583a', '#4f6b4a', '#7a5a8a', '#c49a3a'];
  for (let i = 0; i < 9; i++) {
    const hx = -560 + i * 135 + (i % 2) * 20, hh = 120 + rnd(i + 3) * 120, hy = -300 - (i % 3) * 40;
    houses += `<rect x="${hx}" y="${hy - hh}" width="110" height="${hh}" fill="${dawn ? '#d8cdb8' : '#2a2e36'}"/>
      <path d="M${hx - 10} ${hy - hh} L${hx + 55} ${hy - hh - 60} L${hx + 120} ${hy - hh} Z" fill="${cols[i % 6]}"/>
      ${[0, 1].map(r => [0, 1].map(c => `<rect x="${hx + 18 + c * 46}" y="${hy - hh + 24 + r * 46}" width="26" height="28" fill="${rnd(i * 4 + r * 2 + c) > .4 ? '#ffd27a' : '#3a4352'}" opacity="${lit}"/>`).join('')).join('')}
      ${i % 3 === 0 && smokeOn ? `<rect x="${hx + 80}" y="${hy - hh - 70}" width="18" height="40" fill="#5a4a40"/>` + smoke(hx + 89, hy - hh - 70, t + i, 180, 12, '#c8c4bc', 5, i) : ''}`;
  }
  let crenel = '';
  for (let i = 0; i < 22; i++) crenel += `<rect x="${-620 + i * 58}" y="-330" width="34" height="30" fill="#7e8288"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${houses}
    <rect x="-640" y="-300" width="1280" height="320" fill="#8e9298"/>${crenel}
    ${[...Array(10)].map((_, i) => `<line x1="-640" y1="${-300 + i * 32}" x2="640" y2="${-300 + i * 32}" stroke="#7e8288" stroke-width="3"/>`).join('')}
    <path d="M-80 20 L-80 -140 Q0 -200 80 -140 L80 20 Z" fill="#3a3f48"/>
    ${waver ? `<g transform="translate(120,-330)">${theo({ x: 0, y: 0, s: .35, f: -1, armF: [150 + Math.sin(t * 8) * 20, 0], look: 0 }).replace(/#dba33a/g, '#5d6b7a').replace(/#b98329/g, '#4a5866')}</g>` : ''}
  </g>`;
}

// 1 ---------------------------------------------------------------
S.recap12 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const svg = `<rect width="${W}" height="${H}" fill="#6e4a30"/>
  <g transform="rotate(-2 540 1000)">
    <rect x="70" y="420" width="940" height="1260" rx="14" fill="#e9e1cc"/>
    ${[[260, 680], [420, 880], [700, 720], [820, 1020], [330, 1170]].map(([x, y]) => `<rect x="${x - 16}" y="${y - 16}" width="32" height="32" fill="#7a6b5c"/><path d="M${x - 32} ${y - 32} L${x + 32} ${y + 32} M${x + 32} ${y - 32} L${x - 32} ${y + 32}" stroke="#c8352c" stroke-width="10" stroke-linecap="round"/>`).join('')}
    <ellipse cx="880" cy="1540" rx="110" ry="90" fill="none" stroke="#c8352c" stroke-width="10"/>
    <text x="620" y="1660" font-family="Caveat" font-weight="700" font-size="110" fill="#c8352c" transform="rotate(-8 620 1660)">SAFE</text>
  </g>
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 12</text>
    ${pill(540, 310, 'DAY 8 · 6:10 AM', { bg: PAL.yel, size: 28 })}</g>
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 2-3 -------------------------------------------------------------
function cabinBg(t) {
  return `<defs>${morningSky('cb12')}</defs><rect width="${W}" height="${H}" fill="url(#cb12)"/>
  <rect y="1100" width="${W}" height="${H}" fill="#56789a"/>${waveDashes(1110, 1900, t, '#d8e7ef', 26, 351, .4)}
  <rect x="-20" y="0" width="${W + 40}" height="160" fill="#2a343c"/><rect x="-20" y="0" width="60" height="${H}" fill="#2a343c"/><rect x="${W - 40}" y="0" width="60" height="${H}" fill="#2a343c"/>`;
}
S.ines_trap = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 12)) > .45 ? 'o' : 'flat';
  return { svg: cabinBg(t) + ines({ x: 480, y: 1720, s: 3.1, f: 1, look: .4, mouth: talk, gun: false, armF: [20, 10], armB: [-10, 10] }) + vign(.55), cam: 1.02 + .05 * p };
};
S.mateo_why = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 11)) > .45 ? 'o' : 'flat';
  return { svg: cabinBg(t + 5) + mateo({ x: 560, y: 1720, s: 3.1, f: -1, look: .4, mouth: talk, headTilt: 4 }) + vign(.55), cam: 1.02 + .05 * p };
};

// 4 ---------------------------------------------------------------
S.decide = (t, d, T) => {
  const p = t / d;
  const k = easeIO(seg(t, capL('decide', 1, T, t), d));
  const sx = 240, sy = 560, ex = 880, ey = 1540;
  const svg = `<rect width="${W}" height="${H}" fill="#6e4a30"/>
  <g transform="rotate(-2 540 1000)">
    <rect x="70" y="420" width="940" height="1260" rx="14" fill="#e9e1cc"/>
    <path d="M${sx} ${sy} C 500 700, 400 1200, ${ex} ${ey}" stroke="#22252a" stroke-width="7" stroke-dasharray="18 14" fill="none" pathLength="1000" stroke-dashoffset="${1000 - 1000 * k}" style="stroke-dasharray:${1000 * k} 1000"/>
    <circle cx="${sx}" cy="${sy}" r="20" fill="${PAL.coat}" stroke="#22252a" stroke-width="5"/>
    <ellipse cx="${ex}" cy="${ey}" rx="110" ry="90" fill="none" stroke="#c8352c" stroke-width="10"/>
  </g>
  ${pill(540, 300, 'FUEL: 40 GAL', { bg: '#4f8a6a', fg: '#fff', size: 36, bold: 700 })}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 5 ---------------------------------------------------------------
S.journey = (t, d, T) => {
  const p = t / d;
  const day = p < .5 ? 1 : 2;
  const sa = rad(lerp(200, 340, (p * 2) % 1));
  const sx = 540 + Math.cos(sa) * 520, sy = 1050 + Math.sin(sa) * 650;
  const sky = ((p * 2) % 1) < .15 || ((p * 2) % 1) > .85 ? '#e7a273' : '#8fb0cf';
  const svg = `<rect width="${W}" height="${H}" fill="${sky}"/>
  <circle cx="${sx}" cy="${sy}" r="70" fill="#fff1c4"/>
  <rect y="1050" width="${W}" height="${H}" fill="#3e5d7c"/>${waveDashes(1060, 1900, t * 2, '#d8e7ef', 34, 361, .45)}
  ${crewBoat(540, 1500 + Math.sin(t * 2) * 8, .9, t, { lit: 0 })}
  ${pill(540, 300, `DAY ${day}`, { bg: PAL.yel, size: 40, bold: 700 })}
  ${t > capL('journey', 1, T, t) ? pill(540, 400, 'WATER: RATIONED', { bg: '#3f86c4', fg: '#fff', size: 30, bold: 700 }) : ''}
  ${vign(.4)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 6 ---------------------------------------------------------------
S.fish = (t, d, T) => {
  const p = t / d;
  const c1 = capL('fish', 1, T, t);
  const svg = `<defs>${morningSky('f12')}</defs><rect width="${W}" height="${H}" fill="url(#f12)"/>
  <rect y="1000" width="${W}" height="${H}" fill="#56789a"/>
  ${deckFloor(1250)}
  ${cat({ x: 540, y: 1300, s: 2.4, f: 1, pose: 'sit', look: .2, ears: .5 })}
  <g transform="translate(570,${1300 - 240 * 2.4 / 2.4 - 0}) rotate(${Math.sin(t * 2) * 4})">
    <g transform="translate(-10,-10)"><path d="M0 0 Q60 -36 120 0 Q60 36 0 0 Z" fill="#9fb4c4"/><path d="M120 0 L160 -26 L160 26 Z" fill="#8aa0b0"/>
    ${t > c1 ? `<path d="M22 -10 l12 12 M34 -10 l-12 12" stroke="#22252a" stroke-width="5"/>` : `<circle cx="28" cy="-4" r="6" fill="#22252a"/>`}</g>
  </g>
  ${t > c1 ? `<text x="540" y="600" text-anchor="middle" font-family="Anton" font-size="90" fill="#22252a" opacity=".8">( ._.)</text>` : `<text x="760" y="820" font-family="Anton" font-size="80" fill="${PAL.yel}">!!</text>`}
  ${vign(.35)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 7 ---------------------------------------------------------------
S.water_low = (t, d, T) => {
  const p = t / d;
  const lvl = lerp(.55, .12, easeIO(seg(t, 0, d * .8)));
  const svg = `<rect width="${W}" height="${H}" fill="#2a3a4c"/>
  <g transform="translate(540,900)">
    <rect x="-200" y="-380" width="400" height="560" rx="40" fill="#e9eef0" opacity=".2" stroke="#e9eef0" stroke-width="10"/>
    <clipPath id="jug12"><rect x="-195" y="-375" width="390" height="550" rx="36"/></clipPath>
    <g clip-path="url(#jug12)"><rect x="-200" y="${180 - 560 * lvl}" width="400" height="${560 * lvl}" fill="#5fa3d6"/></g>
    <rect x="-70" y="-440" width="140" height="70" rx="12" fill="#e9eef0" opacity=".5"/>
  </g>
  ${[0, 1, 2].map(i => `<g transform="translate(${300 + i * 240},1500)"><path d="M-50 -80 L50 -80 L40 40 L-40 40 Z" fill="#e9eef0" opacity=".85"/><rect x="-46" y="-20" width="92" height="56" fill="#5fa3d6" opacity="${seg(t, capL('water_low', 1, T, t) + i * .2, capL('water_low', 1, T, t) + i * .2 + .3)}"/></g>`).join('')}
  ${pill(540, 300, `WATER: ${Math.round(lvl * 10)} L`, { bg: lvl < .25 ? '#c8352c' : '#3f86c4', fg: '#fff', size: 38, bold: 700 })}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 8 ---------------------------------------------------------------
S.ghost_boat = (t, d, T) => {
  const p = t / d;
  const bx = lerp(900, 380, p);
  const glow = .5 + .5 * Math.sin(t * 5);
  const svg = seaNight(t, 61, 1150) + fogLayer(t, .35, 900, 1300, 61) + `
  <g transform="translate(${bx},1350) scale(1.1) rotate(${Math.sin(t * 1.4) * 4})">
    <path d="M-260 -40 L260 -40 Q240 40 170 60 L-200 60 Q-250 30 -260 -40 Z" fill="#d8d2c2" opacity=".8"/>
    <line x1="-20" y1="-40" x2="-20" y2="-560" stroke="#8e9298" stroke-width="10"/>
    <path d="M-14 -540 L180 -120 L-14 -120 Z" fill="#e9e3d6" opacity=".55"/><path d="M-26 -500 L-180 -140 L-26 -140 Z" fill="#e9e3d6" opacity=".35"/>
    <path d="M60 -330 l40 60 M90 -250 l30 50" stroke="#56606c" stroke-width="6"/>
    <rect x="80" y="-110" width="120" height="70" fill="#3a3f48"/><rect x="96" y="-98" width="88" height="46" fill="#9ef0a8" opacity="${.3 + glow * .5}"/>
  </g>
  <circle cx="${bx + 150}" cy="1270" r="${60 + glow * 20}" fill="#9ef0a8" opacity=".15" filter="url(#fgblur)"/>
  ${crewBoat(240, 1650, .55, t, { lit: 0 })}
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 9 ---------------------------------------------------------------
S.broadcast = (t, d, T) => ({ svg: radioClose(t, { talk: 1 }) + `<rect width="${W}" height="${H}" fill="#0a1830" opacity=".25"/>` + vign(.65), cam: 1.04 + .04 * (t / d) });

// 10 --------------------------------------------------------------
S.same_place = (t, d, T) => {
  const p = t / d;
  const k = easeOut(seg(t, 0, 1.2));
  let rings = '';
  for (let i = 0; i < 4; i++) { const r = ((t * .8 + i / 4) % 1); rings += `<circle cx="880" cy="1540" r="${60 + r * 300}" fill="none" stroke="#9ef0a8" stroke-width="${8 * (1 - r)}" opacity="${1 - r}"/>`; }
  const svg = `<rect width="${W}" height="${H}" fill="#6e4a30"/>
  <g transform="rotate(-2 540 1000)">
    <rect x="70" y="420" width="940" height="1260" rx="14" fill="#e9e1cc"/>
    <path d="M240 560 C 500 700, 400 1200, 880 1540" stroke="#22252a" stroke-width="7" stroke-dasharray="18 14" fill="none"/>
    <ellipse cx="880" cy="1540" rx="110" ry="90" fill="none" stroke="#c8352c" stroke-width="10"/>
    ${rings}
  </g>
  ${pill(540, 300, 'SIGNAL SOURCE', { bg: '#2f7a52', fg: '#fff', size: 36, bold: 700, sc: back(seg(t, .2, .5)) })}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .1 * k };
};

// 11 --------------------------------------------------------------
S.arrival = (t, d, T) => {
  const p = t / d;
  const reveal = easeIO(seg(t, 0, capL('arrival', 1, T, t) + .5));
  const svg = `<defs>${linGrad('ar12', [[0, '#7d9cc4'], [.6, '#f2b08a'], [1, '#ffe0a8']])}</defs>
  <rect width="${W}" height="1200" fill="url(#ar12)"/>
  <rect y="1150" width="${W}" height="${H}" fill="#3e5d7c"/>${waveDashes(1160, 1900, t, '#d8e7ef', 30, 371, .45)}
  ${fogLayer(t, .6 * (1 - reveal), 700, 1200, 71)}
  <g opacity="${.3 + .7 * reveal}">${townWall(540, 1160, lerp(.45, .6, p), t, { lit: .5 })}</g>
  ${crewBoat(540, 1700, .7, t, { lit: 0 })}
  ${vign(.4)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 12 --------------------------------------------------------------
S.alive_town = (t, d, T) => {
  const p = t / d;
  const svg = `<defs>${linGrad('at12', [[0, '#7d9cc4'], [.6, '#f2b08a'], [1, '#ffe0a8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#at12)"/>
  <rect y="1450" width="${W}" height="${H}" fill="#3e5d7c"/>${waveDashes(1460, 1900, t, '#d8e7ef', 20, 381, .45)}
  ${townWall(540, 1460, lerp(1.0, 1.15, p), t, { lit: seg(t, capL('alive_town', 1, T, t) - .2, capL('alive_town', 1, T, t) + .6) })}
  ${vign(.4)}`;
  return { svg, cam: 1.0 };
};

// 13 --------------------------------------------------------------
S.waving = (t, d, T) => {
  const p = t / d;
  const c1 = capL('waving', 1, T, t);
  if (t < c1) {
    const svg = `<defs>${morningSky('wv12')}</defs><rect width="${W}" height="${H}" fill="url(#wv12)"/>
    <rect y="1500" width="${W}" height="${H}" fill="#3e5d7c"/>
    <g transform="translate(540 760) scale(${1 + p * .4}) translate(-540 -760)">${townWall(540, 1500, 1.9, t, { lit: 1, waver: 1 })}</g>` + vign(.4);
    return { svg, cam: 1.0 };
  }
  const svg = `<defs>${morningSky('wv12b')}</defs><rect width="${W}" height="${H}" fill="url(#wv12b)"/>
  <rect y="1300" width="${W}" height="${H}" fill="#56789a"/>
  ${townWall(780, 1200, .4, t, { lit: 1 })}
  ${theo({ x: 400, y: 1840, s: 3.2, f: 1, look: 1, eyes: t > capL('waving', 2, T, t) ? 'wide' : 'open', headTilt: -4 })}
  ${vign(.55)}`;
  return { svg, cam: 1.02 + .06 * seg(t, c1, d) };
};

// 14 --------------------------------------------------------------
S.end_card12 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 13</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE HARBOR</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`, cam: 1 };
};
