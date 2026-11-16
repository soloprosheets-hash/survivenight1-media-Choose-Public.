// ---------- Part 9 scenes ----------
function driverMan(o = {}) {
  const save = { ...PAL };
  Object.assign(PAL, { coat: '#e8742a', coatD: '#c45a18', hat: '#1d1f22', hatD: '#141518', beard: '#3a2e26', skin: '#e9cfb0', skinD: '#d4b896', pants: '#2f3440' });
  const g = theo(o);
  Object.assign(PAL, save);
  return g;
}
function seaNight(t, seed = 0, horizon = 1150) {
  return `<defs>${linGrad('sn9', [[0, '#05080e'], [1, '#18233a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sn9)"/>${stars(40, 121 + seed, horizon - 100)}
  <rect y="${horizon}" width="${W}" height="${H}" fill="#0b1422"/>
  ${waveDashes(horizon + 10, 1900, t, '#2c4560', 30, 331 + seed, .6)}`;
}

// 1 ---------------------------------------------------------------
S.recap9 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const a = t * .8;
  const bx = 540 + Math.cos(a) * 330, by = 1380 + Math.sin(a) * 110;
  const svg = seaNight(t) + `
  <ellipse cx="540" cy="1380" rx="330" ry="110" fill="none" stroke="#9fc0d6" stroke-width="6" stroke-dasharray="20 16" opacity=".5"/>
  <g transform="translate(${bx},${by}) scale(${(Math.sin(a) > 0 ? -1 : 1) * .55},.55)">${fishBoat(0, 0, 1, { t, crew: 0, lit: .7, driver: .9 })}</g>
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 9</text>
    ${pill(540, 310, 'NIGHT 4 · 12:20 AM', { bg: PAL.yel, size: 28 })}</g>
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 2 ---------------------------------------------------------------
S.binoculars = (t, d, T) => {
  const p = t / d;
  const c1 = capL('binoculars', 1, T, t);
  if (t < c1) {
    const lift = easeOut(seg(t, 0, c1));
    return { svg: seaNight(t, 3, 1000) + `${platform(540, 1700, 1.2, { t, sil: true })}` +
      ines({ x: 540, y: 1900, s: 2.6, f: 1, look: 1, gun: false, armF: [lerp(10, 150, lift), lerp(10, 20, lift)], armB: [lerp(-10, 140, lift), lerp(10, 30, lift)] }) +
      `<g transform="translate(${lerp(560, 640, lift)},${lerp(1500, 1110, lift)})"><rect x="-70" y="-30" width="60" height="60" rx="14" fill="#1d1f22"/><rect x="10" y="-30" width="60" height="60" rx="14" fill="#1d1f22"/><rect x="-14" y="-14" width="28" height="20" fill="#1d1f22"/></g>` + vign(.65), cam: 1.03 };
  }
  const k2 = back(seg(t, capL('binoculars', 2, T, t), capL('binoculars', 2, T, t) + .35));
  const k3 = back(seg(t, capL('binoculars', 3, T, t), capL('binoculars', 3, T, t) + .35));
  const sway = Math.sin(t * 1.3) * 14;
  const svg = `
  <defs><mask id="bino"><rect width="${W}" height="${H}" fill="#000"/><circle cx="330" cy="860" r="330" fill="#fff"/><circle cx="750" cy="860" r="330" fill="#fff"/></mask></defs>
  <rect width="${W}" height="${H}" fill="#000"/>
  <g mask="url(#bino)"><g transform="translate(${sway},${Math.cos(t) * 8})">
    ${seaNight(t, 5, 1000)}
    <g transform="translate(0,110)"><rect x="160" y="420" width="760" height="560" fill="#2a343c"/>
    <rect x="200" y="460" width="680" height="380" fill="#ffcf7a" opacity=".55"/>
    ${driverMan({ x: 540, y: 1250, s: 2.3, f: -1, look: .2 })}
    <circle cx="540" cy="1000" r="130" fill="none" stroke="#3a3d43" stroke-width="22"/>${[0, 60, 120].map(a => `<line x1="${540 + Math.cos(rad(a)) * 130}" y1="${1000 + Math.sin(rad(a)) * 130}" x2="${540 - Math.cos(rad(a)) * 130}" y2="${1000 - Math.sin(rad(a)) * 130}" stroke="#3a3d43" stroke-width="12"/>`).join('')}
    <rect x="160" y="980" width="760" height="40" fill="#1c2a30"/></g>
  </g></g>
  ${k2 > 0 ? pill(300, 1400, 'ORANGE JACKET', { sc: k2, bg: '#e8742a', fg: '#fff', size: 34, bold: 700 }) : ''}
  ${k3 > 0 ? pill(780, 1400, 'NOT INFECTED', { sc: k3, bg: '#c8352c', fg: '#fff', size: 34, bold: 700 }) : ''}
  ${vign(.4)}`;
  return { svg, cam: 1.0 };
};

// 3 ---------------------------------------------------------------
S.rope = (t, d, T) => {
  const p = t / d;
  const pan = easeIO(seg(t, .2, d * .8));
  const by = 1320 + Math.sin(t * 2) * 6;
  let chain = '', rope = `M${300 - pan * 0} ${by - 40}`;
  for (let i = 1; i <= 3; i++) {
    const x = 300 + i * 480, y = 1330 + Math.sin(t * 2 + i) * 8;
    rope += ` Q${x - 240} ${y + 20} ${x - 200} ${y - 40}`;
    chain += fishBoat(x, y, .55, { t, crew: 3, ph: i * 2 });
  }
  const svg = seaNight(t, 7, 1150) + `<g transform="translate(${-pan * 1100},0)">
    <path d="${rope}" stroke="#c9b48a" stroke-width="7" fill="none"/>
    ${fishBoat(300, by, .7, { t, crew: 0, lit: .7, driver: 1 })}
    ${chain}
  </g>` + vign(.7);
  return { svg, cam: 1.0 + .03 * p };
};

// 4 ---------------------------------------------------------------
S.mateo9 = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 12)) > .45 ? 'o' : 'flat';
  const svg = seaNight(t, 9, 1300) + mateo({ x: 520, y: 1880, s: 3.3, f: 1, look: -.6, mouth: talk, headTilt: -3, eyes: 'wide' }) + night(.15) + vign(.75);
  return { svg, cam: 1.02 + .06 * p };
};

// 5 ---------------------------------------------------------------
S.cycle = (t, d, T) => {
  const p = t / d;
  const steps = [['TOW', '#3f86c4', 'boat'], ['WAIT', '#e8742a', 'clock'], ['LOOT', '#c8352c', 'bag']];
  const pos = [[540, 520], [820, 1000], [260, 1000]];
  let g = '';
  steps.forEach(([lab, col, ic], i) => {
    const k = back(seg(t, capL('cycle', i, T, t), capL('cycle', i, T, t) + .35));
    if (k <= 0) return;
    const [x, y] = pos[i];
    let icon = '';
    if (ic === 'boat') icon = `<path d="M-60 0 L60 0 Q50 30 30 34 L-40 34 Q-56 24 -60 0 Z" fill="#fff"/><rect x="10" y="-40" width="34" height="40" fill="#fff"/>`;
    if (ic === 'clock') icon = `<circle r="50" fill="none" stroke="#fff" stroke-width="10"/><path d="M0 -30 L0 0 L22 14" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    if (ic === 'bag') icon = `<path d="M-46 -10 Q-50 50 0 50 Q50 50 46 -10 Z" fill="#fff"/><path d="M-20 -10 Q0 -50 20 -10" stroke="#fff" stroke-width="10" fill="none"/>`;
    g += `<g transform="translate(${x},${y}) scale(${k})"><circle r="130" fill="${col}"/>${icon}<text y="190" text-anchor="middle" font-family="Anton" font-size="56" fill="#f4efe4">${lab}</text></g>`;
  });
  const ak = seg(t, capL('cycle', 2, T, t) + .4, d);
  const arrows = ak > 0 ? `<g opacity="${ak}" stroke="#f4efe4" stroke-width="8" fill="none" stroke-dasharray="18 14" stroke-dashoffset="${-t * 60}">
    <path d="M660 600 Q800 720 810 840"/><path d="M670 1080 Q540 1170 410 1080"/><path d="M250 840 Q280 680 420 600"/></g>` : '';
  const svg = `<rect width="${W}" height="${H}" fill="#161b24"/>
  ${[...Array(28)].map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${H}" stroke="#1b212c" stroke-width="2"/>`).join('')}
  ${arrows}${g}
  ${ak > .5 ? pill(540, 1460, 'REPEAT · EVERY 3 NIGHTS', { sc: back(seg(ak, .5, .7)), bg: '#f4efe4', size: 34, bold: 700 }) : ''}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 6 ---------------------------------------------------------------
S.spotted = (t, d, T) => {
  const p = t / d;
  const k1 = back(seg(t, capL('spotted', 1, T, t), capL('spotted', 1, T, t) + .35));
  const k2 = seg(t, capL('spotted', 2, T, t), capL('spotted', 2, T, t) + .6);
  const svg = nightPlat(t) +
    (k1 > 0 ? pill(540, 360, 'STILL STANDING', { sc: k1, bg: '#4f8a6a', fg: '#fff', size: 40, bold: 700 }) : '') +
    (k2 > 0 ? `<g transform="translate(540,1560)" opacity="${k2}"><path d="M-110 0 Q0 -80 110 0 Q0 80 -110 0 Z" fill="#f4efe4"/><circle r="40" fill="#c8352c"/><circle r="16" fill="#111"/></g>` : '') + vign(.65);
  return { svg, cam: 1.0 + .05 * p };
};

// 7 ---------------------------------------------------------------
S.searchlight = (t, d, T) => {
  const p = t / d;
  const down = easeOut(seg(t, capL('searchlight', 1, T, t), capL('searchlight', 1, T, t) + .5));
  const ang = -20 + Math.sin(t * 1.4) * 38;
  const lie = (fn, x, extra = {}) => `<g transform="translate(${x},${lerp(1400, 1430, down)}) rotate(${lerp(0, -82, down)})">${fn({ x: 0, y: 0, s: 1.4, f: 1, look: .5, eyes: 'wide', ...extra })}</g>`;
  const svg = `
  <defs>${linGrad('sl9', [[0, '#05080e'], [1, '#18233a']])}${linGrad('beam9', [[0, '#fffbe8', .75], [1, '#fffbe8', 0]], 0, 0, 1, 0)}</defs>
  <rect width="${W}" height="1110" fill="url(#sl9)"/>${stars(40, 131, 1000)}
  <rect x="-20" y="1110" width="${W + 40}" height="12" fill="#0f1116"/>${[...Array(10)].map((_, i) => `<rect x="${i * 120}" y="1110" width="8" height="150" fill="#0f1116"/>`).join('')}
  ${deckFloor(1250, true)}
  ${lie(theo, 260)}${lie((o) => ines({ ...o, gun: false }), 520)}${lie(mateo, 780)}
  <g transform="translate(980,${lerp(1405, 1440, down)}) scale(1,${lerp(1, .55, down)})">${cat({ x: 0, y: 0, s: .8, f: -1, pose: 'sit', ears: -1 })}</g>
  <g transform="translate(1180,700) rotate(${180 + ang})"><path d="M0 0 L1500 -170 L1500 170 Z" fill="url(#beam9)"/></g>
  ${pill(540, 260, 'RULE 1: NO LIGHTS', { bg: '#efe8d8', size: 34, bold: 700, border: '#8a7a62' })}
  ${vign(.65)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 8/9 --------------------------------------------------------------
S.radio9 = (t, d, T) => ({ svg: radioClose(t, { blink: 1 }) + vign(.6), cam: 1.0 + .05 * (t / d) });
S.driver_voice = (t, d, T) => {
  const p = t / d;
  const c1 = capL('driver_voice', 1, T, t);
  if (t < c1) return { svg: radioClose(t, { talk: 1 }) + vign(.6), cam: 1.05 + .03 * p };
  const svg = seaNight(t, 11, 1250) + `<g transform="translate(540 1000) scale(1.3) translate(-540 -1000)">${fishBoat(420, 1300, 2.0, { t, crew: 0, lit: .9, driver: 1 })}</g>`  + vign(.7);
  return { svg, cam: 1.0 + .06 * p };
};

// 10 --------------------------------------------------------------
S.odds = (t, d, T) => {
  const p = t / d;
  const tile = (i, big, small, col, y) => {
    const k = back(seg(t, capL('odds', i, T, t), capL('odds', i, T, t) + .35));
    return k > 0 ? `<g transform="translate(540,${y}) scale(${k})"><rect x="-380" y="-110" width="760" height="220" rx="28" fill="#f3eee2" stroke="#2a2c30" stroke-width="6"/>
      <text x="-330" y="40" font-family="Anton" font-size="120" fill="${col}">${big}</text><text x="-80" y="22" font-family="Oswald" font-weight="700" font-size="52" fill="#22252a" letter-spacing="2">${small}</text></g>` : '';
  };
  const svg = `<rect width="${W}" height="${H}" fill="#1b212c"/>
  ${tile(0, '3', 'NIGHTS LEFT', '#c8352c', 400)}${tile(1, '2', 'GALLONS OF FUEL', '#c8352c', 680)}${tile(2, '1', 'MAN HUNTING THEM', '#e8742a', 960)}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 11 --------------------------------------------------------------
S.heist_hook = (t, d, T) => {
  const p = t / d;
  const c1 = capL('heist_hook', 1, T, t), c3 = capL('heist_hook', 3, T, t);
  if (t < c1 - .1) return { svg: seaNight(t, 13, 1300) + theo({ x: 420, y: 1880, s: 3.2, f: 1, look: 1, eyes: 'open', headTilt: -3 }) + night(.15) + vign(.75), cam: 1.02 + .05 * p };
  if (t < c3) {
    const k = back(seg(t, c1, c1 + .4));
    const svg = `<rect width="${W}" height="${H}" fill="#1c2a30"/><rect y="1150" width="${W}" height="${H}" fill="#151f24"/>
    <defs><filter id="sep9"><feColorMatrix type="matrix" values=".5 .5 .2 0 0  .4 .5 .15 0 0  .3 .4 .12 0 0  0 0 0 1 0"/></filter></defs>
    <g filter="url(#sep9)">${[...Array(6)].map((_, i) => `<g transform="translate(${190 + (i % 3) * 260},${880 + Math.floor(i / 3) * 280})"><rect x="-100" y="-130" width="200" height="260" rx="20" fill="#c8352c"/><rect x="-30" y="-160" width="60" height="40" rx="8" fill="#8a2420"/><text y="20" text-anchor="middle" font-family="Anton" font-size="52" fill="#fff">FUEL</text></g>`).join('')}</g>
    ${pill(540, 520, 'FULL FUEL CANS', { sc: k, bg: PAL.yel, size: 48, bold: 700 })}
    <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#f4efe4" stroke-width="4" opacity=".5"/>` + vign(.55);
    return { svg, cam: 1.0 + .05 * p };
  }
  const svg = seaNight(t, 15, 1250) + `<g transform="translate(540 1000) scale(${1.2 + easeIO(seg(t, c3, d)) * .2}) translate(-540 -1000)">${fishBoat(540, 1320, 1.6, { t, crew: 0, lit: .8, driver: .9 })}</g>` +
    `<path d="M200 1500 Q540 1300 880 1500" stroke="#c8352c" stroke-width="8" fill="none" stroke-dasharray="20 14" opacity="${seg(t, c3 + .5, c3 + 1)}"/>` +
    (t > c3 + .8 ? pill(540, 400, 'TARGET', { sc: back(seg(t, c3 + .8, c3 + 1.1)), bg: '#c8352c', fg: '#fff', size: 44, bold: 700 }) : '') + vign(.7);
  return { svg, cam: 1.0 };
};

// 12 --------------------------------------------------------------
S.end_card9 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 10</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE HEIST</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
