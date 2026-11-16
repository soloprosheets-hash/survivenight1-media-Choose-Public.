// ---------- Part 2 scenes ----------
const night = (op = .45) => `<rect width="${W}" height="${H}" fill="#0a1830" opacity="${op}"/>`;
const capT = (scene, idx) => {
  const s = window.TL.segments.find(g => g.scene === scene);
  return s && s.caps[idx] ? s.caps[idx].start : 1e9;
};
const count90 = T => Math.max(0, 90 - (T - (window.TIMER_T0 || 0)) * 2.2);

function stars(n = 40, seed = 0, ymax = 800) {
  return [...Array(n)].map((_, i) => `<circle cx="${rnd(i + seed) * W}" cy="${rnd(i + 50 + seed) * ymax}" r="${1 + rnd(i + 9) * 2}" fill="#dfe6f0" opacity="${.3 + rnd(i + 3) * .5}"/>`).join('');
}

// interior at the foot of the tower
function doorRoom(t, o = {}) {
  const { bolt = 0, shake = 0, theoO = null, catO = null, dark = 0, dust = 0 } = o;
  const sx = shake ? (rnd(Math.floor(t * 60)) - .5) * shake : 0, sy = shake ? (rnd(Math.floor(t * 60) + 3) - .5) * shake : 0;
  const flick = 1 + Math.sin(t * 11) * .05 + Math.sin(t * 6.1) * .05;
  let stones = '';
  for (let r = 0; r < 18; r++) for (let c = 0; c < 7; c++) {
    const x = c * 180 - (r % 2) * 90 - 40, y = r * 90;
    stones += `<rect x="${x + 4}" y="${y + 4}" width="172" height="82" rx="14" fill="${rnd(r * 7 + c) > .5 ? '#3f434c' : '#383b43'}"/>`;
  }
  let dst = '';
  if (dust > 0) for (let i = 0; i < 26; i++) {
    const k = dust;
    dst += `<circle cx="${320 + rnd(i) * 380}" cy="${640 + rnd(i + 4) * 200 + k * 500 * rnd(i + 9)}" r="${2 + rnd(i + 2) * 4}" fill="#c9bfae" opacity="${(1 - k) * .8}"/>`;
  }
  return `
  <defs>${radGrad('lant', [[0, '#ffcf7a', .6], [1, '#ffcf7a', 0]])}</defs>
  <g transform="translate(${sx},${sy})">
  <rect width="${W}" height="${H}" fill="#2e3138"/>${stones}
  <path d="M290 1500 L290 760 Q290 600 500 600 Q710 600 710 760 L710 1500 Z" fill="#1e1f24"/>
  <path d="M310 1500 L310 770 Q310 625 500 625 Q690 625 690 770 L690 1500 Z" fill="#6b4a30"/>
  ${[390, 470, 550, 630].map(x => `<line x1="${x}" y1="640" x2="${x}" y2="1500" stroke="#563a24" stroke-width="5"/>`).join('')}
  <rect x="310" y="800" width="380" height="34" fill="#2b2b2f"/><rect x="310" y="1300" width="380" height="34" fill="#2b2b2f"/>
  ${[330, 670].map(x => `<circle cx="${x}" cy="817" r="7" fill="#55575c"/><circle cx="${x}" cy="1317" r="7" fill="#55575c"/>`).join('')}
  <circle cx="380" cy="1080" r="26" fill="none" stroke="#2b2b2f" stroke-width="9"/>
  <rect x="600" y="1040" width="60" height="70" rx="8" fill="#2b2b2f"/>
  <rect x="740" y="1040" width="70" height="70" rx="8" fill="#2b2b2f"/>
  <rect x="${lerp(470, 640, bolt)}" y="1058" width="200" height="34" rx="10" fill="#8e9298"/>
  <rect x="${lerp(470, 640, bolt) + 40}" y="1018" width="22" height="50" rx="8" fill="#8e9298"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${830 + i * 50}" y="${1440 - i * 90}" width="300" height="60" fill="#4a4d55"/><rect x="${830 + i * 50}" y="${1440 - i * 90}" width="300" height="12" fill="#5c6068"/>`).join('')}
  <rect y="1500" width="${W}" height="${H - 1500}" fill="#232428"/>
  ${dst}
  ${catO ? cat(catO) : ''}
  ${theoO ? theo(theoO) : ''}
  ${theoO && theoO.holdCat ? cat({ x: theoO.x + 26 * (theoO.f || 1), y: theoO.y - 250, s: .62, f: theoO.f || 1, pose: 'sit', look: .3 }) : ''}
  <g transform="translate(900,1500)"><rect x="-34" y="-90" width="68" height="90" rx="10" fill="#2b2b2f"/><rect x="-24" y="-80" width="48" height="60" rx="6" fill="#ffd27a" opacity="${.8 * flick}"/><path d="M-30 -90 Q0 -130 30 -90" fill="none" stroke="#2b2b2f" stroke-width="6"/></g>
  <ellipse cx="900" cy="1440" rx="${620 * flick}" ry="${620 * flick}" fill="url(#lant)"/>
  </g>
  <rect width="${W}" height="${H}" fill="#06080e" opacity="${dark}"/>`;
}

// 1 ---------------------------------------------------------------
S.recap_island = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const pw = back(seg(t, capT('recap_island', 3) - (T - t), capT('recap_island', 3) - (T - t) + .35));
  const pa = back(seg(t, capT('recap_island', 4) - (T - t), capT('recap_island', 4) - (T - t) + .35));
  const svg = `
  <defs>${linGrad('sky21', [[0, '#070b14'], [1, '#1d2a40']])}${linGrad('sea21', [[0, '#1b2c40'], [1, '#0b1422']])}${radGrad('moon21', [[0, '#dfe7f2', .45], [1, '#dfe7f2', 0]])}</defs>
  <rect width="${W}" height="800" fill="url(#sky21)"/>${stars(50, 3, 760)}
  <circle cx="200" cy="420" r="56" fill="#e8edf2"/><circle cx="200" cy="420" r="220" fill="url(#moon21)"/>
  <path d="M0 786 L120 770 L240 778 L380 764 L520 776 L700 760 L860 772 L1080 762 L1080 800 L0 800 Z" fill="#1e2733"/>
  <rect y="796" width="${W}" height="${H - 796}" fill="url(#sea21)"/>
  ${waveDashes(820, 1900, t, '#3d5570', 40, 3, .7)}
  <path d="M470 1020 L540 1020 L585 800 L560 800 Z" fill="#4a4740" opacity="${.9}"/>
  ${[...Array(10)].map((_, i) => { const k = i / 10; return `<ellipse cx="${lerp(505, 572, k)}" cy="${lerp(1015, 805, k)}" rx="${lerp(30, 8, k)}" ry="${lerp(8, 2, k)}" fill="#5e5a50"/>`; }).join('')}
  <ellipse cx="540" cy="1110" rx="420" ry="70" fill="#0b1626" opacity=".6"/>
  ${islandShape(540, 1060, 1.0, '#3e5236')}
  ${cottage(400, 960, .85)}
  ${lighthouse(660, 960, .9, 0, { glass: '#5a6070' })}
  <rect x="170" y="1040" width="210" height="16" fill="#4a3a2a"/>${[190, 250, 310, 370].map(x => `<rect x="${x}" y="1052" width="10" height="50" fill="#3a2b1e"/>`).join('')}
  <g transform="translate(110,${1080 + Math.sin(t * 2) * 4})">${boat(0, 0, .42)}</g>
  ${night(.38)}
  <rect x="${405}" y="${940}" width="10" height="14" fill="#ffcf7a" opacity=".8"/>
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 2</text>
    ${pill(540, 310, 'NIGHT 1 · 9:14 PM', { bg: PAL.yel, size: 28 })}
  </g>
  ${pw > 0 ? `<line x1="660" y1="520" x2="830" y2="470" stroke="#f4efe4" stroke-width="4"/>` + pill(860, 470, 'POWER: OFF', { sc: pw, size: 30, icon: true, iconCol: '#7a7f88' }) : ''}
  ${pa > 0 ? `<line x1="570" y1="860" x2="760" y2="700" stroke="#f4efe4" stroke-width="4"/>` + pill(800, 690, 'PATH: OPEN', { sc: pa, size: 30, icon: true, iconCol: PAL.red }) : ''}
  ${vign(.55)}`;
  return { svg, cam: 1.02 + .06 * p };
};

// 2 ---------------------------------------------------------------
S.causeway_figures = (t, d, T) => {
  const r = S.causeway_night(t, d / .55 + 1, T);
  return { svg: r.svg, cam: 1.0 + .08 * (t / d) };
};

// 3 ---------------------------------------------------------------
S.tide_table = (t, d, T) => {
  const p = t / d;
  const X = h => lerp(-300, 300, (h - 20) / 4);           // hour 20..24 -> x
  const Y = h => -40 - 120 * Math.cos((h - 21.23) / 5.3 * Math.PI * 2 + Math.PI); // low near 21.23
  let curve = '';
  for (let h = 20; h <= 24.001; h += .05) curve += (h === 20 ? 'M' : 'L') + X(h).toFixed(1) + ' ' + (Y(h)).toFixed(1);
  const floodY = Y(23.87);
  const mk = lerp(21.23, 23.87, easeIO(seg(t, capT('tide_table', 3) - (T - t), d)));
  const draw = easeOut(seg(t, .1, 1.2));
  const pop = back(seg(t, capT('tide_table', 3) - (T - t), capT('tide_table', 3) - (T - t) + .35));
  const svg = `
  <g filter="url(#bgblur)">${S.notebook(d, d, T).svg}</g>
  <rect width="${W}" height="${H}" fill="#120c08" opacity=".35"/>
  <g transform="translate(540,${800 + (1 - easeOut(seg(t, 0, .3))) * 300}) rotate(-1.5)">
    <rect x="-380" y="-400" width="760" height="800" rx="26" fill="#000" opacity=".3" transform="translate(10,18)"/>
    <rect x="-380" y="-400" width="760" height="800" rx="26" fill="#fffdf6"/>
    <text x="0" y="-320" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="46" fill="#22252a" letter-spacing="2">TIDE TABLE <tspan fill="${PAL.red}">—</tspan> TONIGHT</text>
    <g transform="translate(0,0)">
      <rect x="-320" y="-220" width="640" height="340" rx="12" fill="#eef4f6"/>
      <line x1="-320" y1="${floodY}" x2="320" y2="${floodY}" stroke="${PAL.red}" stroke-width="4" stroke-dasharray="14 10"/>
      <text x="-310" y="${floodY - 14}" font-family="Oswald" font-weight="600" font-size="24" fill="${PAL.red}" letter-spacing="1">PATH FLOODS</text>
      <clipPath id="drawc"><rect x="-320" y="-240" width="${640 * draw}" height="380"/></clipPath>
      <path d="${curve} L300 120 L-300 120 Z" fill="#9cc6dc" opacity=".55" clip-path="url(#drawc)"/>
      <path d="${curve}" fill="none" stroke="#3f86c4" stroke-width="7" clip-path="url(#drawc)"/>
      <circle cx="${X(21.23)}" cy="${Y(21.23)}" r="12" fill="#22252a"/>
      <text x="${X(21.23)}" y="${Y(21.23) - 26}" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="28" fill="#22252a">LOW 9:14</text>
      ${pop > 0 ? `<circle cx="${X(23.87)}" cy="${Y(23.87)}" r="${14 * pop}" fill="${PAL.yel}" stroke="#22252a" stroke-width="4"/>` : ''}
      ${pop > 0 ? `<circle cx="${X(mk)}" cy="${Y(mk)}" r="10" fill="${PAL.red}"/>` : ''}
      ${['8PM', '9PM', '10PM', '11PM', '12AM'].map((l, i) => `<text x="${-300 + i * 150}" y="${165}" text-anchor="middle" font-family="Oswald" font-size="24" fill="#6b6d70">${l}</text>`).join('')}
    </g>
    <g transform="translate(0,290) scale(${pop})" opacity="${clamp(pop)}">
      <rect x="-250" y="-54" width="500" height="108" rx="54" fill="${PAL.yel}" stroke="#2a2c30" stroke-width="5"/>
      <text x="0" y="20" text-anchor="middle" font-family="Anton" font-size="56" fill="#22252a">FLOODS AT 11:52</text>
    </g>
  </g>
  ${vign(.55)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 4 ---------------------------------------------------------------
S.door_bar = (t, d, T) => {
  const p = t / d;
  const b = easeIO(seg(t, capT('door_bar', 3) - (T - t) - .2, capT('door_bar', 3) - (T - t) + .5));
  const walkIn = seg(p, 0, .45);
  const x = lerp(1000, 830, easeOut(walkIn));
  const reach = seg(p, .4, .55);
  const svg = doorRoom(t, {
    bolt: b, shake: b > .95 && b < 1 ? 6 : 0,
    theoO: { x, y: 1505, s: 1.6, f: -1, pose: walkIn < 1 ? 'walk' : 'stand', walk: walkIn < 1 ? t * 8 : null,
      armF: [lerp(10, 112, reach), lerp(10, -6, reach)], armB: [-10, 10], look: .2 }
  }) + vign(.65);
  return { svg, cam: 1.0 + .05 * p };
};

// 5 ---------------------------------------------------------------
S.stairs = (t, d, T) => {
  const p = t / d;
  const rot = t * 9;
  const n = Math.round(easeOut(seg(t, capT('stairs', 1) - (T - t), capT('stairs', 1) - (T - t) + 1.2)) * 112);
  let st = '';
  for (let i = 0; i < 64; i++) {
    const k = i / 64;
    const r = lerp(520, 70, k), a = i * 26;
    const w = lerp(260, 34, k);
    st += `<g transform="rotate(${a + rot})"><path d="M${r - w * .5} -${lerp(60, 8, k)} L${r + w * .5} -${lerp(90, 12, k)} L${r + w * .5} ${lerp(30, 4, k)} L${r - w * .5} ${lerp(30, 4, k)} Z" fill="${`rgb(${lerp(95, 30, k) | 0},${lerp(98, 34, k) | 0},${lerp(108, 44, k) | 0})`}"/></g>`;
  }
  const svg = `
  <defs>${radGrad('shaft', [[0, '#c9d6ea', .9], [.15, '#6f7d99', .6], [1, '#14161c', 1]])}</defs>
  <rect width="${W}" height="${H}" fill="#14161c"/>
  <circle cx="540" cy="900" r="900" fill="url(#shaft)"/>
  <g transform="translate(540,900)">${st}<circle r="64" fill="#cfdcef"/><circle r="64" fill="none" stroke="#20232a" stroke-width="10"/></g>
  <g transform="translate(540,330)" opacity="${n > 0 ? 1 : 0}">
    <rect x="-200" y="-80" width="400" height="160" rx="24" fill="#fff" stroke="#2a2c30" stroke-width="5"/>
    <text x="0" y="40" text-anchor="middle" font-family="Anton" font-size="104" fill="#22252a">${n}<tspan font-family="Oswald" font-weight="700" font-size="40" fill="${PAL.coatD}" dx="12">STEPS</tspan></text>
  </g>
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 6 ---------------------------------------------------------------
S.cat_window = (t, d, T) => {
  const p = t / d;
  const shock = t > capT('cat_window', 2) - (T - t);
  const zoom = easeIO(seg(t, capT('cat_window', 3) - (T - t) - .2, d));
  const svg = `
  <defs>${linGrad('wsky', [[0, '#0b1222'], [1, '#22324a']])}
  <clipPath id="win6"><circle cx="640" cy="660" r="270"/></clipPath></defs>
  <rect width="${W}" height="${H}" fill="#24272e"/>
  ${[...Array(20)].map((_, r) => `<rect x="${(r % 2) * -90 - 40}" y="${r * 100}" width="1200" height="96" fill="none" stroke="#1d2026" stroke-width="6"/>`).join('')}
  <g transform="translate(640 660) scale(${1 + zoom * .9}) translate(-640 -660)">
  <g clip-path="url(#win6)">
    <rect x="300" y="360" width="700" height="600" fill="url(#wsky)"/>${stars(20, 7, 300).replace(/cx="([\d.]+)"/g, (m, v) => `cx="${300 + v * .65}"`).replace(/cy="([\d.]+)"/g, (m, v) => `cy="${380 + +v}"`)}
    <rect x="300" y="690" width="700" height="300" fill="#132034"/>
    ${waveDashes(700, 940, t, '#3d5570', 16, 2, .6)}
    <path d="M300 860 Q420 780 560 800 Q660 812 720 860 L720 960 L300 960 Z" fill="#2b2d33"/>
    <rect x="700" y="806" width="300" height="14" fill="#3e3226"/>${[740, 820, 900].map(x => `<rect x="${x}" y="818" width="8" height="60" fill="#2e251c"/>`).join('')}
    ${cat({ x: 600, y: 806, s: .55, pose: 'sit', look: Math.sin(t * 1.5) * .4 })}
    <circle cx="600" cy="740" r="${50 + Math.sin(t * 3) * 4}" fill="none" stroke="${PAL.yel}" stroke-width="5" opacity="${shock ? .9 : 0}"/>
  </g>
  <circle cx="640" cy="660" r="270" fill="none" stroke="#141518" stroke-width="44"/>
  <line x1="640" y1="390" x2="640" y2="930" stroke="#141518" stroke-width="12"/><line x1="370" y1="660" x2="910" y2="660" stroke="#141518" stroke-width="12"/>
  </g>
  <g opacity="${1 - zoom}">${theo({ x: 170, y: 1960, s: 2.7, f: 1, look: 1, eyes: shock ? 'wide' : 'open', mouth: shock ? 'o' : 'flat', headTilt: -4 })}</g>
  ${night(.22)}
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 7 ---------------------------------------------------------------
function islandMap(t, o = {}) {
  const { figK = 0, catOn = true, theoPos = null, pathK = 1, showDist = true, red = 0 } = o;
  const path = 'M520 840 C470 620 600 400 520 200 S480 0 500 -60';
  const pt = k => { // approx along path (sampled cubic)
    const P = [[520, 840], [470, 620], [600, 400], [520, 200], [440, 0], [500, -60]];
    if (k < .5) { const u = k * 2; const [a, b, c, e] = [P[0], P[1], P[2], P[3]]; const m = 1 - u;
      return [m * m * m * a[0] + 3 * m * m * u * b[0] + 3 * m * u * u * c[0] + u * u * u * e[0], m * m * m * a[1] + 3 * m * m * u * b[1] + 3 * m * u * u * c[1] + u * u * u * e[1]]; }
    const u = (k - .5) * 2; return [lerp(520, 500, u), lerp(200, -60, u)];
  };
  let figs = '';
  for (let i = 0; i < 3; i++) {
    const k = clamp(1 - figK - i * .05);
    const [x, y] = pt(k);
    figs += `<circle cx="${x + (i - 1) * 22}" cy="${y}" r="16" fill="#e0473a" stroke="#2a0e0b" stroke-width="4"/>`;
  }
  return `
  <defs>${linGrad('sea27', [[0, '#13243a'], [1, '#0b1624']])}
  <mask id="pm27"><rect width="${W}" height="${H}" fill="#fff"/><path d="${path}" stroke="#000" stroke-width="${200 * pathK}" fill="none" stroke-linecap="round"/></mask></defs>
  <rect width="${W}" height="${H}" fill="#3b3a35"/>
  <path d="${path}" stroke="#4e4b44" stroke-width="${70 * pathK}" fill="none" stroke-linecap="round"/>
  <rect width="${W}" height="${H}" fill="url(#sea27)" mask="url(#pm27)"/>
  ${waveDashes(0, 1900, t, '#2c4560', 40, 61, .55)}
  <path d="M220 900 Q300 780 540 790 Q820 800 900 960 Q980 1180 860 1420 Q700 1620 480 1600 Q260 1580 190 1380 Q120 1140 220 900 Z" fill="#3a3b38"/>
  <path d="M260 940 Q340 830 540 840 Q780 850 850 990 Q920 1180 820 1380 Q690 1540 490 1530 Q300 1520 240 1360 Q180 1150 260 940 Z" fill="#33452f"/>
  <rect x="160" y="1380" width="200" height="22" fill="#5a4632" transform="rotate(35 260 1390)"/>
  <circle cx="600" cy="1140" r="56" fill="#cfc8b8"/><circle cx="600" cy="1140" r="26" fill="#3a3f48"/>
  ${pill(600, 1240, 'LIGHTHOUSE', { bg: '#f4efe4', size: 24, bold: 700 })}
  ${catOn ? `<circle cx="190" cy="1470" r="26" fill="#d98a3c" stroke="#fff" stroke-width="5"/><path d="M174 1452 l4 -16 l10 10 Z M206 1452 l-4 -16 l-10 10 Z" fill="#d98a3c"/>` +
      pill(200, 1550, 'MANGO', { bg: '#d98a3c', fg: '#fff', size: 26, bold: 700 }) : ''}
  ${showDist ? `<line x1="575" y1="1170" x2="215" y2="1450" stroke="${PAL.yel}" stroke-width="5" stroke-dasharray="14 12"/>` + pill(390, 1290, '50 M', { bg: PAL.yel, size: 30, bold: 700 }) : ''}
  ${theoPos ? `<circle cx="${theoPos[0]}" cy="${theoPos[1]}" r="20" fill="${PAL.coat}" stroke="#fff" stroke-width="5"/>` : ''}
  ${figs}
  ${red > 0 ? `<circle cx="520" cy="840" r="${60 + red * 120}" fill="none" stroke="#e0473a" stroke-width="${8 * (1 - red)}" opacity="${1 - red}"/>` : ''}
  <path d="M-20 -20 L1100 -20 L1100 40 Q540 80 -20 40 Z" fill="#202a22"/>`;
}
S.distance_map = (t, d, T) => {
  const p = t / d;
  const reachT = capT('distance_map', 4) - (T - t);
  const fk = clamp(easeIO(seg(t, 0, reachT + .3)) * .99);
  const svg = islandMap(t, { figK: fk, red: t > reachT ? (t - reachT) * 1.2 % 1 : 0 }) +
    night(.15) + timerChip(60, 1720, count90(T), seg(t, 0, .25)) + vign(.55);
  return { svg, cam: 1.0 + .04 * p };
};

// 8 ---------------------------------------------------------------
function nightRocks(t, o = {}) {
  return `
  <defs>${linGrad('sky28', [[0, '#070b14'], [1, '#1b2740']])}${radGrad('moon28', [[0, '#dfe7f2', .45], [1, '#dfe7f2', 0]])}</defs>
  <rect width="${W}" height="1000" fill="url(#sky28)"/>${stars(40, 11, 900)}
  <circle cx="860" cy="300" r="56" fill="#e8edf2"/><circle cx="860" cy="300" r="240" fill="url(#moon28)"/>
  <rect y="980" width="${W}" height="${H}" fill="#101b2b"/>
  ${waveDashes(990, 1200, t, '#3d5570', 18, 15, .6)}
  ${o.lighthouse !== false ? lighthouse(160, 1240, 1.1, 0, { body: '#262b36', band: '#262b36', shade: '#20242d', dark: '#161920', glass: '#3a4050' }) : ''}
  <path d="M-20 1200 Q200 1160 420 1190 Q700 1220 900 1180 Q1000 1170 1100 1190 L1100 ${H} L-20 ${H} Z" fill="#2c2f36"/>
  ${[...Array(10)].map((_, i) => `<ellipse cx="${rnd(i + 20) * W}" cy="${1260 + rnd(i + 30) * 500}" rx="${50 + rnd(i) * 80}" ry="${18 + rnd(i + 1) * 14}" fill="#24272d"/>`).join('')}`;
}
S.run_out = (t, d, T) => {
  const p = t / d;
  const x = lerp(160, 900, p);
  const svg = nightRocks(t) +
    theo({ x, y: 1215, s: 1.5, pose: 'walk', walk: t * 13, lean: 14, armF: [Math.sin(t * 13) * 45, 40], armB: [-Math.sin(t * 13) * 45, 40], look: 1 }) +
    night(.35) + timerChip(60, 120, count90(T)) + fgGrass(t, '#0d1016', 1860, .9) + vign(.65);
  return { svg, cam: 1.0 + .04 * p };
};

// 9 ---------------------------------------------------------------
S.grab_cat = (t, d, T) => {
  const p = t / d;
  const up = easeOut(seg(p, .3, .6));
  const svg = nightRocks(t, { lighthouse: false }) +
    `<rect x="560" y="1196" width="600" height="18" fill="#3e3226"/>${[620, 760, 900, 1040].map(x => `<rect x="${x}" y="1210" width="12" height="90" fill="#2e251c"/>`).join('')}` +
    theo({ x: 430, y: 1215, s: 1.55, pose: up < .5 ? 'kneel' : 'stand', lean: lerp(20, 0, up), armF: [lerp(110, 60, up), lerp(-10, 70, up)], armB: [lerp(90, 50, up), lerp(0, 70, up)], look: .5, eyes: 'wide' }) +
    cat({ x: lerp(600, 470, up), y: lerp(1215, 1215 - 300 * 1.0, up), s: lerp(1, .95, up), pose: 'sit', look: -.3 }) +
    night(.35) + timerChip(60, 120, count90(T)) + vign(.65);
  return { svg, cam: 1.05 + .05 * p };
};

// 10 --------------------------------------------------------------
S.dock_steps = (t, d, T) => {
  const p = t / d;
  const shake = Math.pow(Math.max(0, Math.sin(t * 7)), 6) * 6;
  const zx = lerp(-120, 160, p);
  const svg = nightRocks(t, { lighthouse: false }) +
    `<g transform="translate(0,${(rnd(Math.floor(t * 40)) - .5) * shake})">
    <rect x="-40" y="1300" width="1160" height="40" fill="#3e3226"/><rect x="-40" y="1340" width="1160" height="16" fill="#2a2018"/>
    ${[...Array(18)].map((_, i) => `<line x1="${i * 66}" y1="1300" x2="${i * 66}" y2="1340" stroke="#30261c" stroke-width="3"/>`).join('')}
    ${[40, 360, 680, 1000].map(x => `<rect x="${x}" y="1356" width="24" height="200" fill="#241c14"/>`).join('')}
    </g>` +
    zomb({ x: zx, y: 1305, s: 1.25, f: 1, t: t * 1.4, ph: 0, col: '#05070b' }) +
    zomb({ x: zx - 210, y: 1305, s: 1.15, f: 1, t: t * 1.4, ph: 2, col: '#05070b' }) +
    theo({ x: lerp(760, 1000, p), y: 1305, s: 1.25, pose: 'walk', walk: t * 13, lean: 10, armF: [55, 75], armB: [45, 75], look: -1, eyes: 'wide' }) +
    cat({ x: lerp(790, 1030, p), y: 1305 - 245, s: .5, pose: 'sit' }) +
    night(.3) + timerChip(60, 120, count90(T)) + vign(.7);
  return { svg, cam: 1.03 + .05 * p };
};

// 11 --------------------------------------------------------------
S.door_slam = (t, d, T) => {
  const p = t / d;
  const slamT = capT('door_slam', 2) - (T - t);
  const b = easeOut(seg(t, slamT, slamT + .18));
  const inK = easeOut(seg(t, 0, slamT));
  const svg = doorRoom(t, {
    bolt: b, shake: t > slamT && t < slamT + .3 ? 16 : 0,
    theoO: { x: lerp(560, 760, inK), y: 1505, s: 1.6, f: 1, pose: 'stand', lean: -4, armF: [55, 75], armB: [45, 75], look: -.6, eyes: 'wide', holdCat: true, sweat: .8 }
  }) + vign(.65);
  return { svg, cam: 1.0 + .06 * p };
};

// 12 --------------------------------------------------------------
S.bang = (t, d, T) => {
  const p = t / d;
  const t0 = T - t;
  const hitA = capT('bang', 1) - t0 - .05, hitB = capT('bang', 2) - t0 - .05;
  const imp = h => t > h ? Math.max(0, 1 - (t - h) * 3.5) : 0;
  const s = Math.max(imp(hitA), imp(hitB));
  const dust = t > hitB ? seg(t, hitB, hitB + 1.2) : t > hitA ? seg(t, hitA, hitA + 1.2) : 0;
  const svg = doorRoom(t, {
    bolt: 1, shake: s * 34, dust,
    theoO: { x: 820, y: 1505, s: 1.6, f: -1, pose: 'stand', lean: s * -8, armF: [55, 75], armB: [45, 75], look: .2, eyes: 'wide', mouth: 'o', holdCat: true }
  }) + `<rect width="${W}" height="${H}" fill="#fff" opacity="${s * .12}"/>` + vign(.7 + s * .2);
  return { svg, cam: 1.0 + .03 * p + s * .03 };
};

// 13 --------------------------------------------------------------
S.quiet = (t, d, T) => {
  const p = t / d;
  const svg = doorRoom(t, {
    bolt: 1, dark: .45,
    theoO: { x: 820, y: 1505, s: 1.6, f: -1, pose: 'stand', armF: [55, 75], armB: [45, 75], look: .2, eyes: 'wide', holdCat: true }
  }) + vign(.85);
  return { svg, cam: 1.04 + .05 * p };
};

// 14 --------------------------------------------------------------
S.tide_in = (t, d, T) => {
  const p = t / d;
  const k = 1 - easeIO(seg(p, .1, .85));
  const svg = islandMap(t, { figK: 1, catOn: false, showDist: false, pathK: k, theoPos: [600, 1140] }) + night(.18) +
    `<g transform="translate(60,1700)">
      <rect x="0" y="-60" width="360" height="120" rx="20" fill="#f3eee2" stroke="#2a2c30" stroke-width="4"/>
      <path d="M44 ${16 + Math.sin(t * 3) * 6} L44 ${-26 + Math.sin(t * 3) * 6} M28 ${-10 + Math.sin(t * 3) * 6} L44 ${-28 + Math.sin(t * 3) * 6} L60 ${-10 + Math.sin(t * 3) * 6}" stroke="#3f86c4" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="84" y="-6" font-family="Oswald" font-weight="700" font-size="40" fill="#22252a">HIGH TIDE</text>
      <text x="84" y="36" font-family="Oswald" font-weight="500" font-size="28" fill="#6b6d70">11:52 PM · PATH GONE</text>
    </g>` + vign(.5);
  return { svg, cam: 1.0 + .04 * p };
};

// 15 --------------------------------------------------------------
S.trapped = (t, d, T) => {
  const p = t / d;
  const z = easeIO(seg(p, .55, 1));
  const svg = `
  <defs>${linGrad('sky30', [[0, '#05080e'], [1, '#18233a']])}${radGrad('moon30', [[0, '#dfe7f2', .45], [1, '#dfe7f2', 0]])}${radGrad('wglow', [[0, '#ffcf7a', .8], [1, '#ffcf7a', 0]])}</defs>
  <g transform="translate(560 640) scale(${1 + z * .7}) translate(-560 -640)">
  <rect width="${W}" height="1080" fill="url(#sky30)"/>${stars(50, 21, 1000)}
  <circle cx="230" cy="280" r="60" fill="#e8edf2"/><circle cx="230" cy="280" r="240" fill="url(#moon30)"/>
  <rect y="1070" width="${W}" height="${H}" fill="#0e1828"/>
  ${waveDashes(1080, 1900, t, '#3d5570', 40, 25, .7)}
  ${lighthouse(560, 1260, 1.45, 0, { body: '#2b303c', band: '#2b303c', shade: '#232833', dark: '#14171d', glass: '#3a4050' })}
  <rect x="548" y="944" width="24" height="44" rx="10" fill="#ffcf7a"/>
  <circle cx="560" cy="966" r="${70 + Math.sin(t * 9) * 5}" fill="url(#wglow)"/>
  <path d="M-20 1300 Q200 1180 420 1230 Q560 1250 720 1230 Q940 1200 1100 1290 L1100 1500 Q560 1560 -20 1500 Z" fill="#23262d"/>
  ${zomb({ x: 300, y: 1330, s: .95, t, ph: 0, back: true, col: '#05070b' })}
  ${zomb({ x: 820, y: 1360, s: 1.05, t, ph: 1.7, back: true, col: '#05070b' })}
  ${zomb({ x: 640, y: 1460, s: 1.2, t, ph: 3.1, back: true, col: '#05070b' })}
  ${waves(1520, '#5d7590', t, 10, 160, 60, 6, .7)}${waves(1600, '#5d7590', t + 1, 12, 180, 50, 6, .6)}
  <rect y="1540" width="${W}" height="${H}" fill="#0b1422" opacity=".7"/>
  </g>
  ${night(.2)}${vign(.75)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 16 --------------------------------------------------------------
S.end_card2 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 3</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">TRAPPED</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
