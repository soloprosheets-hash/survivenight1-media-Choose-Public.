// ---------- Part 3 scenes ----------
const segStart = name => { const s = window.TL.segments.find(g => g.scene === name); return s ? s.start : 0; };
const capL = (scene, idx, T, t) => capT(scene, idx) - (T - t); // caption start in local scene time

// overhead night map of the island (no causeway)
const TOWER = [600, 1140];
const ROCKS = [215, 1660];
function map3(t, o = {}) {
  const { figs = [], beamTo = null, beamOp = 1, icons = false, xK = 0, hideUnder = false, tint = .18 } = o;
  let f = '';
  figs.forEach(([x, y, op = 1]) => { f += `<circle cx="${x}" cy="${y}" r="17" fill="#e0473a" stroke="#2a0e0b" stroke-width="4" opacity="${op}"/>`; });
  let beam = '';
  if (beamTo) {
    const a = Math.atan2(beamTo[1] - TOWER[1], beamTo[0] - TOWER[0]);
    beam = `<g transform="translate(${TOWER[0]},${TOWER[1]}) rotate(${a * 180 / Math.PI})" opacity="${beamOp}"><path d="M0 0 L760 -190 L760 190 Z" fill="url(#beam3)"/></g>`;
  }
  const xmark = (x, y, k) => k <= 0 ? '' : `<g transform="translate(${x},${y}) scale(${k})"><circle r="30" fill="#e0473a"/><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`;
  return `
  <defs>${linGrad('sea3m', [[0, '#13243a'], [1, '#0b1624']])}${radGrad('beam3', [[0, '#fff0b8', .85], [1, '#fff0b8', 0]], 0, .5, 1)}</defs>
  <rect width="${W}" height="${H}" fill="url(#sea3m)"/>
  ${waveDashes(0, 1900, t, '#2c4560', 46, 61, .55)}
  <path d="M220 900 Q300 780 540 790 Q820 800 900 960 Q980 1180 860 1420 Q700 1620 480 1600 Q330 1600 250 1560 Q150 1640 160 1720 Q240 1760 290 1690 Q250 1620 300 1590 Q200 1500 190 1380 Q120 1140 220 900 Z" fill="#3a3b38"/>
  <path d="M260 940 Q340 830 540 840 Q780 850 850 990 Q920 1180 820 1380 Q690 1540 490 1530 Q300 1520 240 1360 Q180 1150 260 940 Z" fill="#33452f"/>
  ${[[180, 1700, 30], [235, 1640, 26], [150, 1660, 20], [270, 1700, 18]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4a4a46"/>`).join('')}
  <rect x="160" y="1380" width="200" height="22" fill="#5a4632" transform="rotate(35 260 1390)"/>
  <g transform="translate(150,1480) rotate(35)"><path d="M-40 -14 L40 -14 Q34 14 20 16 L-34 16 Q-42 6 -40 -14 Z" fill="#c95f3f"/></g>
  <circle cx="790" cy="1010" r="34" fill="#4f6b4f" stroke="#2e3d2e" stroke-width="6"/>
  ${beam}
  ${f}
  <circle cx="${TOWER[0]}" cy="${TOWER[1]}" r="60" fill="#cfc8b8"/><circle cx="${TOWER[0]}" cy="${TOWER[1]}" r="28" fill="${beamTo ? '#ffe7a0' : '#3a3f48'}"/>
  ${icons ? pill(150, 1560, 'BOAT', { bg: '#f4efe4', size: 26, bold: 700 }) + pill(790, 920, 'WATER TANK', { bg: '#f4efe4', size: 26, bold: 700 }) + xmark(205, 1440, xK) + xmark(830, 975, xK) : ''}
  <rect width="${W}" height="${H}" fill="#0a1830" opacity="${tint}"/>`;
}
const circling = (t, i, r0 = 170) => {
  const a = t * .55 + i * 2.1;
  const r = r0 + Math.sin(t * 1.3 + i) * 18;
  return [TOWER[0] + Math.cos(a) * r, TOWER[1] + Math.sin(a) * r * .9];
};

// 1 ---------------------------------------------------------------
S.recap3 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const svg = `
  <defs>${linGrad('sky31', [[0, '#070b14'], [1, '#1d2a40']])}${linGrad('sea31', [[0, '#1b2c40'], [1, '#0b1422']])}${radGrad('moon31', [[0, '#dfe7f2', .45], [1, '#dfe7f2', 0]])}${radGrad('wg31', [[0, '#ffcf7a', .8], [1, '#ffcf7a', 0]])}</defs>
  <rect width="${W}" height="800" fill="url(#sky31)"/>${stars(50, 31, 760)}
  <circle cx="860" cy="430" r="56" fill="#e8edf2"/><circle cx="860" cy="430" r="220" fill="url(#moon31)"/>
  <path d="M0 786 L120 770 L240 778 L380 764 L520 776 L700 760 L860 772 L1080 762 L1080 800 L0 800 Z" fill="#1e2733"/>
  <rect y="796" width="${W}" height="${H - 796}" fill="url(#sea31)"/>
  ${waveDashes(820, 1900, t, '#3d5570', 46, 5, .75)}
  ${waves(1010, '#4b6684', t, 8, 120, 50, 5, .6)}
  <ellipse cx="540" cy="1110" rx="420" ry="70" fill="#0b1626" opacity=".6"/>
  ${islandShape(540, 1060, 1.0, '#3e5236')}
  ${cottage(400, 960, .85)}
  ${lighthouse(660, 960, .9, 0, { glass: '#5a6070' })}
  <rect x="170" y="1040" width="210" height="16" fill="#4a3a2a"/>${[190, 250, 310, 370].map(x => `<rect x="${x}" y="1052" width="10" height="50" fill="#3a2b1e"/>`).join('')}
  <g transform="translate(110,${1080 + Math.sin(t * 2) * 4})">${boat(0, 0, .42)}</g>
  ${night(.38)}
  <rect x="652" y="770" width="16" height="26" rx="7" fill="#ffcf7a"/><circle cx="660" cy="783" r="${50 + Math.sin(t * 9) * 4}" fill="url(#wg31)"/>
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 3</text>
    ${pill(540, 310, 'NIGHT 1 · 11:58 PM', { bg: PAL.yel, size: 28 })}
  </g>
  ${(() => { const k = back(seg(t, capL('recap3', 2, T, t), capL('recap3', 2, T, t) + .35)); return k > 0 ? pill(540, 1460, 'PATH: UNDERWATER', { sc: k, size: 32, icon: true, iconCol: '#3f86c4' }) : ''; })()}
  ${vign(.55)}`;
  return { svg, cam: 1.02 + .06 * p };
};

// 2 ---------------------------------------------------------------
S.trapped_view = (t, d, T) => {
  const p = t / d;
  const pop = back(seg(t, 0, .4));
  const figs = [0, 1, 2].map(i => circling(t, i));
  const svg = map3(t, { figs }) +
    `<circle cx="${TOWER[0]}" cy="${TOWER[1]}" r="200" fill="none" stroke="#e0473a" stroke-width="4" stroke-dasharray="12 12" opacity=".7" transform="rotate(${t * 20} ${TOWER[0]} ${TOWER[1]})"/>` +
    pill(540, 640, '3 TRAPPED', { bg: '#c8352c', fg: '#fff', size: 36, bold: 700, sc: pop }) + vign(.55);
  return { svg, cam: 1.1 - .06 * p };
};

// 3 ---------------------------------------------------------------
S.tide_clock = (t, d, T) => {
  const p = t / d;
  const pop = back(seg(t, capL('tide_clock', 3, T, t), capL('tide_clock', 3, T, t) + .35));
  const hrs = 9.68 - Math.min(.02, t * .001);
  const H_ = Math.floor(hrs), M_ = Math.round((hrs - H_) * 60);
  const svg = `
  <g filter="url(#bgblur)">${S.notebook(d, d, T).svg}</g>
  <rect width="${W}" height="${H}" fill="#120c08" opacity=".45"/>
  <g transform="translate(540,${780 + (1 - easeOut(seg(t, 0, .3))) * 300}) rotate(1.5)">
    <rect x="-370" y="-360" width="740" height="720" rx="26" fill="#000" opacity=".3" transform="translate(10,18)"/>
    <rect x="-370" y="-360" width="740" height="720" rx="26" fill="#fffdf6"/>
    <text x="0" y="-270" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="44" fill="#22252a" letter-spacing="2">NEXT LOW TIDE</text>
    <g transform="translate(0,-60)">
      <circle r="150" fill="#f3eee2" stroke="#22252a" stroke-width="10"/>
      ${[...Array(12)].map((_, i) => `<line x1="0" y1="-128" x2="0" y2="-112" stroke="#22252a" stroke-width="6" transform="rotate(${i * 30})"/>`).join('')}
      <line x1="0" y1="0" x2="0" y2="-70" stroke="#22252a" stroke-width="12" stroke-linecap="round" transform="rotate(${(9 + 39 / 60) * 30})"/>
      <line x1="0" y1="0" x2="0" y2="-108" stroke="${PAL.red}" stroke-width="7" stroke-linecap="round" transform="rotate(${39 * 6})"/>
      <circle r="12" fill="#22252a"/>
    </g>
    <text x="0" y="180" text-anchor="middle" font-family="Anton" font-size="96" fill="#22252a">9:39 AM</text>
    <g transform="translate(0,280) scale(${pop})" opacity="${clamp(pop)}">
      <rect x="-250" y="-52" width="500" height="104" rx="52" fill="${PAL.yel}" stroke="#2a2c30" stroke-width="5"/>
      <text x="0" y="20" text-anchor="middle" font-family="Anton" font-size="54" fill="#22252a">${H_}H ${String(M_).padStart(2, '0')}M AWAY</text>
    </g>
  </g>
  ${vign(.55)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 4 ---------------------------------------------------------------
S.cant_leave = (t, d, T) => {
  const p = t / d;
  const xK = back(seg(t, capL('cant_leave', 3, T, t), capL('cant_leave', 3, T, t) + .3));
  const xK2 = back(seg(t, capL('cant_leave', 4, T, t), capL('cant_leave', 4, T, t) + .3));
  const figs = [0, 1, 2].map(i => circling(t + 4, i));
  const svg = map3(t, { figs, icons: true, xK: Math.min(xK, 1) }) +
    (xK2 > 0 ? `<g transform="translate(830,975) scale(${xK2})"><circle r="30" fill="#e0473a"/><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>` : '') +
    pill(600, 1250, 'THEO', { bg: PAL.coat, fg: '#22252a', size: 26, bold: 700 }) + vign(.55);
  return { svg, cam: 1.0 + .05 * p };
};

// 5 ---------------------------------------------------------------
S.remember = (t, d, T) => {
  const p = t / d;
  const r = S.shore_heads(t + .3, d, T);
  const svg = `<g filter="url(#sepia)">${r.svg}</g>
  <rect width="${W}" height="${H}" fill="#3a2a10" opacity=".18"/>
  ${pill(540, 220, 'DAY 1', { bg: '#f4efe4', size: 34, bold: 700 })}
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#f4efe4" stroke-width="4" opacity=".5"/>`;
  return { svg: `<defs><filter id="sepia"><feColorMatrix type="matrix" values=".45 .55 .2 0 0  .38 .5 .17 0 0  .27 .38 .13 0 0  0 0 0 1 0"/></filter></defs>` + svg, cam: 1.0 + .06 * p };
};

// 6 ---------------------------------------------------------------
S.climb = (t, d, T) => {
  const p = t / d;
  const r = S.stairs(t, d, T); // counter stays hidden (different scene name)
  const step = Math.floor(lerp(1, 112, easeIO(seg(t, capL('climb', 2, T, t), d))));
  const svg = r.svg + timerChip(60, 120, 0, 0) +
    pill(200, 140, '3:00 AM', { bg: '#f3eee2', size: 34, bold: 700, border: '#2a2c30' }) +
    (t > capL('climb', 2, T, t) ? `<g transform="translate(540,330)"><rect x="-200" y="-80" width="400" height="160" rx="24" fill="#fff" stroke="#2a2c30" stroke-width="5"/>
      <text x="0" y="40" text-anchor="middle" font-family="Anton" font-size="104" fill="#22252a">${step}<tspan font-family="Oswald" font-weight="700" font-size="40" fill="${PAL.coatD}" dx="12">/ 112</tspan></text></g>` : '');
  return { svg, cam: 1.0 + .06 * p };
};

// 7 ---------------------------------------------------------------
S.lamp_on = (t, d, T) => {
  const p = t / d;
  const r = S.breaker(d - t, d, T);
  return { svg: r.svg, cam: 1.0 + .05 * p };
};

// 8 ---------------------------------------------------------------
S.aim = (t, d, T) => {
  const p = t / d;
  const lockT = capL('aim', 2, T, t);
  const spinA = -90 + t * 140;
  const target = Math.atan2(ROCKS[1] - TOWER[1], ROCKS[0] - TOWER[0]) * 180 / Math.PI;
  let ang;
  if (t < lockT) ang = spinA;
  else { const k = easeOut(seg(t, lockT, lockT + .5)); ang = lerp(-90 + lockT * 140, target + 360 * Math.ceil(((-90 + lockT * 140) - target) / 360), k); }
  const bx = TOWER[0] + Math.cos(ang * Math.PI / 180) * 600, by = TOWER[1] + Math.sin(ang * Math.PI / 180) * 600;
  const figs = [0, 1, 2].map(i => circling(t + 9, i));
  const rise = seg(t, capL('aim', 4, T, t), d);
  const svg = map3(t, { figs, beamTo: [bx, by] }) +
    (t > capL('aim', 3, T, t) ? pill(330, 1800, 'FAR ROCKS', { bg: '#f4efe4', size: 28, bold: 700 }) : '') +
    (rise > 0 ? `<circle cx="${ROCKS[0]}" cy="${ROCKS[1] + 20}" r="${90 + rise * 60}" fill="none" stroke="#7cc0e8" stroke-width="6" opacity="${.9 - rise * .5}"/>` + pill(700, 1800, 'SEA RISING ▲', { bg: '#3f86c4', fg: '#fff', size: 28, bold: 700, sc: back(clamp(rise * 4)) }) : '') +
    vign(.55);
  return { svg, cam: 1.0 + .04 * p };
};

// 9 ---------------------------------------------------------------
S.walk_light = (t, d, T) => {
  const p = t / d;
  const start = [0, 1, 2].map(i => circling(segStart('walk_light') - segStart('aim') + 9, i));
  const k = easeIO(seg(p, .1, .95));
  const figs = [
    [lerp(start[0][0], 205, k), lerp(start[0][1], 1650, k)],
    [lerp(start[1][0], 250, clamp(k * 1.05)), lerp(start[1][1], 1690, clamp(k * 1.05))],
    // the third one drifts toward the tower... and disappears under it
    [lerp(start[2][0], TOWER[0], clamp(k * 1.6)), lerp(start[2][1], TOWER[1], clamp(k * 1.6)), 1],
  ];
  const svg = map3(t, { figs, beamTo: ROCKS }) + vign(.55);
  return { svg, cam: 1.0 + .05 * p };
};

// 10/11 -- view from the gallery down onto the far rocks ------------
function rocksView(t, o = {}) {
  const { waveK = 0, figsOp = 1, nums = [] } = o;
  const wy = lerp(1900, 1080, waveK);
  const fig = (x, y, s, ph, i) => zomb({ x: x + Math.sin(t * 1.5 + ph) * 6, y, s, t, ph, col: '#06080c', eyes: 1 });
  return `
  <defs>${linGrad('sea3r', [[0, '#16263c'], [1, '#0a121e']])}${linGrad('cone', [[0, '#fff0b8', .0], [1, '#fff0b8', .55]], 0, 0, 0, 1)}</defs>
  <rect width="${W}" height="${H}" fill="url(#sea3r)"/>
  ${waveDashes(0, 1900, t, '#33506e', 50, 71, .7)}
  <path d="M120 1500 Q200 1240 420 1200 Q640 1180 820 1290 Q960 1380 980 1560 Q760 1640 520 1630 Q260 1620 120 1500 Z" fill="#2b2d33"/>
  <path d="M200 1460 Q280 1280 440 1250 Q600 1230 760 1320 Q600 1300 460 1320 Q300 1350 200 1460 Z" fill="#3b3e46"/>
  <path d="M540 -100 L1180 1700 L-100 1700 Z" fill="url(#cone)"/>
  <g opacity="${figsOp}">
    ${fig(420, 1330, .85, 0, 0)}${fig(660, 1360, .9, 1.7, 1)}
  </g>
  ${nums.map(([x, y, n, k]) => k > 0 ? `<g transform="translate(${x},${y}) scale(${k})"><circle r="46" fill="${PAL.yel}" stroke="#22252a" stroke-width="6"/><text y="22" text-anchor="middle" font-family="Anton" font-size="64" fill="#22252a">${n}</text></g>` : '').join('')}
  ${waveK > 0 ? `<path d="M-50 ${wy + 60} Q200 ${wy - 140} 420 ${wy - 40} Q640 ${wy + 40} 860 ${wy - 120} Q1000 ${wy - 170} 1130 ${wy - 40} L1130 ${H} L-50 ${H} Z" fill="#1f4a66"/>
    <path d="M-50 ${wy + 60} Q200 ${wy - 140} 420 ${wy - 40} Q640 ${wy + 40} 860 ${wy - 120} Q1000 ${wy - 170} 1130 ${wy - 40}" fill="none" stroke="#e8f4f8" stroke-width="26" stroke-linecap="round" opacity=".9"/>
    ${[...Array(20)].map((_, i) => `<circle cx="${rnd(i) * W}" cy="${wy - 60 - rnd(i + 5) * 160}" r="${6 + rnd(i + 2) * 12}" fill="#e8f4f8" opacity="${.8 * (1 - waveK * .3)}"/>`).join('')}` : ''}
  <rect width="${W}" height="${H}" fill="#0a1830" opacity=".15"/>`;
}
S.count = (t, d, T) => {
  const p = t / d;
  const k1 = back(seg(t, capL('count', 1, T, t), capL('count', 1, T, t) + .3));
  const k2 = back(seg(t, capL('count', 2, T, t), capL('count', 2, T, t) + .3));
  const svg = rocksView(t, { nums: [[420, 980, 1, k1], [660, 1010, 2, k2]] }) + vign(.6);
  return { svg, cam: 1.0 + .06 * p };
};
S.wave = (t, d, T) => {
  const p = t / d;
  const wk = easeIO(seg(t, .15, capL('wave', 1, T, t) + .1));
  const recede = seg(t, capL('wave', 1, T, t) + .2, d);
  const svg = rocksView(t, { waveK: wk * (1 - recede * .8), figsOp: t > capL('wave', 1, T, t) ? 0 : 1 }) +
    `<rect width="${W}" height="${H}" fill="#fff" opacity="${Math.max(0, .25 - Math.abs(t - capL('wave', 1, T, t)) * .8)}"/>` + vign(.6);
  return { svg, cam: 1.0 + .03 * p + (wk > .5 && wk < 1 ? (rnd(Math.floor(t * 50)) - .5) * .01 : 0) };
};

// 12 --------------------------------------------------------------
S.sunrise = (t, d, T) => {
  const p = t / d;
  const sy = lerp(980, 900, p);
  const svg = `
  <defs>${linGrad('sky312', [[0, '#7d9cc4'], [.55, '#f2b08a'], [1, '#ffe0a8']])}${linGrad('sea312', [[0, '#6f8fae'], [1, '#2f4a68']])}<clipPath id="ab312"><rect width="${W}" height="1000"/></clipPath></defs>
  <rect width="${W}" height="1000" fill="url(#sky312)"/>
  <circle cx="780" cy="${sy}" r="110" fill="#fff1c4" clip-path="url(#ab312)"/><circle cx="780" cy="${sy}" r="200" fill="#ffe0a8" opacity=".3" clip-path="url(#ab312)"/>
  <ellipse cx="300" cy="420" rx="240" ry="26" fill="#ffd2b0" opacity=".55"/>
  <rect y="1000" width="${W}" height="${H - 1000}" fill="url(#sea312)"/>
  ${[...Array(12)].map((_, i) => `<rect x="${780 - (55 - i * 3) + Math.sin(t * 2 + i) * 12}" y="${1010 + i * 34}" width="${110 - i * 6}" height="7" rx="3" fill="#fff1c4" opacity="${.7 - i * .05}"/>`).join('')}
  ${waveDashes(1010, 1900, t, '#c9d8e6', 30, 81, .4)}
  ${islandShape(420, 1260, 1.05, '#7d9a5c')}
  ${cottage(300, 1160, .8)}
  ${lighthouse(500, 1170, 1.0, 0)}
  ${theo({ x: 515, y: 742, s: .34, f: 1, look: 1, mug: true, armF: [40, 80] })}
  ${gulls(t, [[600, 520, 1, 0], [680, 560, .8, 1.3], [120, 600, .7, 2]])}
  ${pill(540, 200, 'DAY 2 · 6:48 AM', { bg: PAL.yel, size: 32, bold: 700, sc: back(seg(t, 0, .35)) })}
  ${vign(.35)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 13 --------------------------------------------------------------
S.cat_stairs = (t, d, T) => {
  const p = t / d;
  const r = S.stairs(t + 2, d, T);
  const ears = -easeOut(seg(p, .2, .5));
  const svg = `<g opacity=".85">${r.svg}</g><rect width="${W}" height="${H}" fill="#06080e" opacity=".45"/>
  <ellipse cx="540" cy="900" rx="70" ry="70" fill="#06080e"/>
  <g transform="translate(540,1800) scale(2.6)">
    <path d="M-36 -6 Q-90 0 -86 -50" fill="none" stroke="#b86d27" stroke-width="${16 + ears * -6}" stroke-linecap="round"/>
    <path d="M-40 0 Q-46 -80 0 -96 Q42 -80 38 0 Z" fill="#d98a3c"/>
    <circle cx="0" cy="-112" r="30" fill="#d98a3c"/>
    <path d="M-26 -126 l${-2 + ears * 12} -${26 + ears * 10} l20 18 Z M26 -126 l${2 - ears * 12} -${26 + ears * 10} l-20 18 Z" fill="#d98a3c"/>
    <path d="M-30 -60 q8 12 0 24 M0 -66 q8 12 0 24 M26 -60 q8 12 0 24" stroke="#b86d27" stroke-width="6" fill="none" opacity=".6"/>
  </g>
  ${vign(.8)}`;
  return { svg, cam: 1.0 + .08 * p };
};

// 14 --------------------------------------------------------------
S.only_two = (t, d, T) => {
  const p = t / d;
  const eyes = seg(t, d * .45, d * .7);
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0f18"/>
  <g transform="translate(760,700)">
    ${[...Array(8)].map((_, i) => `<ellipse cx="0" cy="${i * 26}" rx="${260 - i * 28}" ry="${120 - i * 12}" fill="none" stroke="#1d2330" stroke-width="16"/>`).join('')}
    <ellipse cx="0" cy="210" rx="40" ry="20" fill="#020305"/>
    <g opacity="${eyes}" filter="url(#zglow)"><circle cx="-12" cy="206" r="5" fill="#e9f5d0"/><circle cx="12" cy="206" r="5" fill="#e9f5d0"/></g>
  </g>
  ${theo({ x: 300, y: 1980, s: 3.3, f: 1, look: 1, eyes: 'wide', mouth: 'o', sweat: 1, headTilt: 3 })}
  <rect width="${W}" height="${H}" fill="#2a4a8a" opacity=".16"/>
  ${vign(.85)}`;
  return { svg, cam: 1.0 + .12 * p };
};

// 15 --------------------------------------------------------------
S.end_card3 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 4</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE THIRD ONE</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
