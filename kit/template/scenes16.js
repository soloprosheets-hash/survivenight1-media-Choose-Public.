// ---------- Season 2 · Part 1 scenes ----------
const PAL_LH = { body: '#e9e2d3', band: '#4f6b8a' };
function skyG(id, kind) {
  const k = {
    dawn: [[0, '#8fb3d6'], [.6, '#f3c9a0'], [1, '#ffe3b5']],
    day: [[0, '#7fb0d8'], [1, '#d8ecf2']],
    dusk: [[0, '#3a3a66'], [.55, '#c9607a'], [1, '#f2a65a']],
    night: [[0, '#0b1020'], [1, '#1f2b44']],
  }[kind];
  return linGrad(id, k);
}
// island wide shot seen from the sea
function islandWide(t, o = {}) {
  const { kind = 'dawn', lamp = 0, shadow = 0, boatX = 760 } = o;
  const nightish = kind === 'night' || kind === 'dusk';
  return `<defs>${skyG('iw_' + kind, kind)}</defs>
  <rect width="${W}" height="1100" fill="url(#iw_${kind})"/>
  ${kind === 'night' ? stars(40, 211, 900) : `<circle cx="780" cy="880" r="110" fill="#fff1c4" opacity=".9"/>`}
  <rect y="1090" width="${W}" height="${H}" fill="${nightish ? '#1d3048' : '#4f7898'}"/>${waveDashes(1100, 1900, t, '#d8e7ef', 30, 451, nightish ? .25 : .45)}
  ${islandShape(480, 1200, .95, nightish ? '#4c6340' : '#7d9a5c')}
  ${lighthouse(560, 1110, 1.05, lamp, PAL_LH)}
  ${shadow > 0 ? `<g transform="translate(560,1110) scale(1.05)"><ellipse cx="${lerp(-24, 24, shadow)}" cy="-446" rx="11" ry="26" fill="#1d1f22" opacity="${Math.sin(shadow * Math.PI) * .95}"/><circle cx="${lerp(-24, 24, shadow)}" cy="-476" r="10" fill="#1d1f22" opacity="${Math.sin(shadow * Math.PI) * .95}"/></g>` : ''}
  ${crewBoat(boatX, 1330, .5, t, { lit: 0 })}`;
}
// ground-level island view
function islandGround(t, o = {}) {
  const { kind = 'day', hz = 900, gy = 1000, lhX = 820, lhS = 1.0, lamp = 0 } = o;
  const n = kind === 'night', dk = kind === 'dusk';
  return `<defs>${skyG('ig_' + kind, kind)}</defs>
  <rect width="${W}" height="${hz + 20}" fill="url(#ig_${kind})"/>
  ${n ? stars(40, 221, hz - 100) : ''}
  <rect y="${hz}" width="${W}" height="${H}" fill="${n ? '#16263a' : dk ? '#3c4a6a' : '#5d86a6'}"/>${waveDashes(hz + 10, gy - 10, t, '#e3eef3', 14, 601, n ? .2 : .4)}
  ${lighthouse(lhX, gy + 20, lhS, lamp, PAL_LH)}
  <path d="M-20 ${gy} Q300 ${gy - 30} 600 ${gy - 6} Q850 ${gy + 14} 1100 ${gy - 24} L1100 ${H} L-20 ${H} Z" fill="${n ? '#2c3a2a' : dk ? '#55663f' : '#8aa765'}"/>
  <path d="M-20 ${gy + 120} Q400 ${gy + 90} 1100 ${gy + 130} L1100 ${H} L-20 ${H} Z" fill="${n ? '#243024' : dk ? '#4a5a37' : '#7a9658'}"/>`;
}
const talkM = t => Math.abs(Math.sin(t * 12)) > .45 ? 'o' : 'flat';

// 1 ---------------------------------------------------------------
S.hook2 = (t, d, T) => {
  const p = t / d, ti = easeOut(seg(t, 0, .5));
  const c1 = capL('hook2', 1, T, t);
  const zk = easeIO(seg(t, c1 - .3, c1 + .6));
  const z = 1 + .9 * zk;
  const svg = `<g transform="translate(560 650) scale(${z}) translate(-560 -650)">${islandWide(t, { kind: 'dawn', shadow: seg(t, c1 - .1, c1 + 1.2) })}</g>
  <g opacity="${ti * (1 - zk)}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="230" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 315, 'PART 1 · THE LIGHT', { bg: PAL.yel, size: 30 })}</g>
  ${vign(.35)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 2 ---------------------------------------------------------------
S.crew2 = (t, d, T) => {
  const k = [0, 1, 2].map(i => back(seg(t, capL('crew2', i, T, t), capL('crew2', i, T, t) + .4)));
  const lab = (x, txt, kk, bg) => kk > 0 ? pill(x, 520, txt, { sc: kk, bg, size: 30, bold: 700 }) : '';
  const svg = `<rect width="${W}" height="${H}" fill="#e9dcc3"/>
  <circle cx="540" cy="820" r="520" fill="#f3e8d2"/>
  <rect y="1150" width="${W}" height="${H}" fill="#cdbb98"/>
  <g transform="translate(250,1150) scale(${k[0]}) translate(-250,-1150)">${theo({ x: 250, y: 1150, s: 1.3, f: 1, look: .4, armF: [30, 30] })}</g>
  <g transform="translate(430,1150) scale(${k[1]}) translate(-430,-1150)">${cat({ x: 430, y: 1150, s: 1.25, f: -1, pose: 'sit', look: -.3 })}</g>
  <g transform="translate(680,1150) scale(${k[2]}) translate(-680,-1150)">${ines({ x: 680, y: 1150, s: 1.3, f: -1, gun: false })}</g>
  <g transform="translate(870,1150) scale(${k[2]}) translate(-870,-1150)">${mateo({ x: 870, y: 1150, s: 1.3, f: -1, armF: [-10, 20] })}</g>
  ${lab(250, 'THEO', k[0], PAL.yel)}${lab(430, 'MANGO', k[1], '#e8a25a')}${lab(680, 'INES', k[2], '#e98a76')}${lab(870, 'MATEO', k[2], '#a9b89a')}`;
  return { svg, cam: 1.0 + .03 * (t / d) };
};

// 3 ---------------------------------------------------------------
S.door_barred = (t, d, T) => {
  const c1 = capL('door_barred', 1, T, t);
  const shove = t > .4 && t < c1 ? Math.max(0, Math.sin((t - .4) * 9)) : 0;
  const xr = seg(t, c1 - .1, c1 + .4);
  const svg = `<rect width="${W}" height="${H}" fill="#cfc6b4"/>
  ${[...Array(9)].map((_, i) => `<rect x="0" y="${i * 150 + (i % 2) * 20}" width="${W}" height="6" fill="#bdb3a0"/>`).join('')}
  <rect y="1150" width="${W}" height="${H}" fill="#8f8a7d"/>
  <g transform="translate(${shove * 6},0)">
    <path d="M340 1150 L340 600 Q540 420 740 600 L740 1150 Z" fill="#5b4330"/>
    ${[400, 470, 540, 610, 680].map(x => `<line x1="${x}" y1="${x === 540 ? 470 : 540}" x2="${x}" y2="1150" stroke="#4a3626" stroke-width="5"/>`).join('')}
    <rect x="360" y="760" width="360" height="22" fill="#3a3f48"/><rect x="360" y="980" width="360" height="22" fill="#3a3f48"/>
    <circle cx="700" cy="880" r="14" fill="#c9a24a"/>
  </g>
  <g opacity="${xr}">
    <path d="M340 1150 L340 600 Q540 420 740 600 L740 1150 Z" fill="#0d1218" opacity=".55"/>
    ${[[-14, 700], [12, 820], [-8, 950], [16, 1060]].map(([a, y]) => `<rect x="300" y="${y}" width="480" height="46" rx="6" fill="#a8743f" stroke="#6a4522" stroke-width="5" transform="rotate(${a} 540 ${y + 23})"/>`).join('')}
    <rect x="390" y="1010" width="140" height="130" fill="#6b4a2a" stroke="#4a3018" stroke-width="5"/>
  </g>
  ${xr > 0 ? pill(540, 400, 'BARRED FROM INSIDE', { sc: back(xr), bg: PAL.red, fg: '#fff', size: 34, bold: 700 }) : ''}
  ${theo({ x: 200, y: 1170, s: 1.45, f: 1, lean: 8 + shove * 6, armF: [80, 10], armB: [70, 10], look: 1, eyes: xr > .5 ? 'wide' : 'open' })}
  ${vign(.4)}`;
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 4 ---------------------------------------------------------------
S.inside2 = (t, d, T) => {
  const c1 = capL('inside2', 1, T, t);
  const pop = (a) => back(seg(t, a, a + .35));
  const dim = seg(t, c1 - .1, c1 + .5);
  const svg = `<defs>${radGrad('in2', [[0, '#f0d7a8', 1], [1, '#5c4a3a', 1]], .5, .35, .8)}</defs>
  <rect width="${W}" height="${H}" fill="url(#in2)"/>
  <rect y="1150" width="${W}" height="${H}" fill="#4a3a2c"/>
  <!-- shelf with cans -->
  <g transform="translate(130,520) scale(${pop(.1)})"><rect x="0" y="120" width="300" height="16" fill="#6b4a2a"/><rect x="0" y="260" width="300" height="16" fill="#6b4a2a"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${12 + i * 56}" y="${54}" width="44" height="66" rx="5" fill="${['#c94a3a', '#d9a03a', '#5d8a6a', '#c94a3a', '#4f6b8a'][i]}"/><rect x="${12 + i * 56}" y="72" width="44" height="18" fill="#efe7d6"/>`).join('')}
    ${[0, 1, 2, 3].map(i => `<rect x="${30 + i * 64}" y="${194}" width="44" height="66" rx="5" fill="${['#d9a03a', '#5d8a6a', '#c94a3a', '#d9a03a'][i]}"/><rect x="${30 + i * 64}" y="212" width="44" height="18" fill="#efe7d6"/>`).join('')}</g>
  <!-- rain barrel -->
  <g transform="translate(800,1150) scale(${pop(.45)})"><rect x="-90" y="-260" width="180" height="260" rx="22" fill="#3f6a8a"/><rect x="-90" y="-200" width="180" height="14" fill="#2f5470"/><rect x="-90" y="-80" width="180" height="14" fill="#2f5470"/>
    <text x="0" y="-120" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="36" fill="#dfeaf2">RAIN</text></g>
  <!-- neat bed -->
  <g transform="translate(330,1150) scale(${pop(.85)})"><rect x="-210" y="-120" width="420" height="80" rx="12" fill="#6b4a2a"/><rect x="-200" y="-170" width="400" height="70" rx="20" fill="#a3b4c2"/>
    <rect x="-190" y="-196" width="120" height="50" rx="20" fill="#efe7d6"/><path d="M-60 -170 L200 -170" stroke="#8597a6" stroke-width="5"/>
    <rect x="-210" y="-40" width="20" height="40" fill="#5a3e23"/><rect x="190" y="-40" width="20" height="40" fill="#5a3e23"/></g>
  ${cat({ x: 600, y: 1150, s: 1.0, f: -1, pose: 'sit', look: -.4 })}
  <rect width="${W}" height="${H}" fill="#101418" opacity="${dim * .35}"/>
  ${dim > 0 ? pill(540, 360, 'NOBODY HOME', { sc: back(dim), bg: '#25282c', fg: '#fff', size: 36, bold: 700 }) : ''}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 5 ---------------------------------------------------------------
S.logbook2 = (t, d, T) => {
  const c1 = capL('logbook2', 1, T, t);
  const k = back(seg(t, c1, c1 + .4));
  let tally = '';
  const n = Math.floor(lerp(8, 62, seg(t, .2, c1 + .3)));
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), r = i % 5, gx = 600 + (g % 6) * 60, gy = 560 + Math.floor(g / 6) * 90;
    tally += r < 4 ? `<line x1="${gx + r * 10}" y1="${gy}" x2="${gx + r * 10 + 2}" y2="${gy + 56}" stroke="#3a2a1c" stroke-width="5" stroke-linecap="round"/>` : `<line x1="${gx - 6}" y1="${gy + 44}" x2="${gx + 40}" y2="${gy + 10}" stroke="#3a2a1c" stroke-width="5" stroke-linecap="round"/>`;
  }
  const svg = `<rect width="${W}" height="${H}" fill="#5a3e28"/>
  ${[...Array(6)].map((_, i) => `<rect x="0" y="${i * 330}" width="${W}" height="4" fill="#4b331f"/>`).join('')}
  <g transform="rotate(-3 540 800)">
    <rect x="70" y="380" width="940" height="840" rx="16" fill="#3a2a1c"/>
    <rect x="90" y="400" width="440" height="800" fill="#efe4c8"/><rect x="550" y="400" width="440" height="800" fill="#f3e9d0"/>
    <rect x="532" y="400" width="16" height="800" fill="#d4c6a4"/>
    ${[...Array(12)].map((_, i) => `<path d="M130 ${470 + i * 58} q90 ${-6 + (i % 3) * 4} ${160 + rnd(i) * 160} 0" stroke="#5a4a3a" stroke-width="4" fill="none" opacity=".55"/>`).join('')}
    ${tally}
  </g>
  ${k > 0 ? `<g transform="translate(540 1020) scale(${k})"><rect x="-230" y="-80" width="460" height="130" rx="18" fill="${PAL.red}"/><text x="0" y="22" text-anchor="middle" font-family="Anton" font-size="96" fill="#fff">DAY 311</text></g>` : ''}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .06 * (t / d) };
};

// 6 ---------------------------------------------------------------
S.last_page = (t, d, T) => {
  const c1 = capL('last_page', 1, T, t);
  const w1 = seg(t, c1 - .05, c1 + 1.0), w2 = seg(t, c1 + .5, c1 + 1.7);
  const svg = `<rect width="${W}" height="${H}" fill="#2a1e14"/>
  <g transform="rotate(2 540 760)">
    <rect x="100" y="300" width="880" height="900" fill="#f0e3c2"/>
    ${[...Array(14)].map((_, i) => `<line x1="140" y1="${380 + i * 58}" x2="940" y2="${380 + i * 58}" stroke="#c7b48c" stroke-width="2"/>`).join('')}
    <clipPath id="lp1"><rect x="120" y="560" width="${840 * w1}" height="140"/></clipPath>
    <clipPath id="lp2"><rect x="120" y="700" width="${840 * w2}" height="160"/></clipPath>
    <text x="540" y="660" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="104" fill="#3a2214" clip-path="url(#lp1)">Never let the</text>
    <text x="540" y="800" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="118" fill="#9a2a1e" clip-path="url(#lp2)">light go out.</text>
    <path d="M300 830 Q540 ${850} 800 826" stroke="#9a2a1e" stroke-width="6" fill="none" stroke-dasharray="${600 * seg(t, c1 + 1.5, c1 + 2.0)} 999"/>
  </g>
  <ellipse cx="540" cy="700" rx="600" ry="500" fill="#ffd28a" opacity=".08"/>
  ${vign(.65)}`;
  return { svg, cam: 1.0 + .07 * (t / d) };
};

// 7 ---------------------------------------------------------------
function lampRoom(t, o = {}) {
  const { lens = 0, frost = 0, needle = .5, sky = 'day' } = o;
  return `<defs>${skyG('lr_' + sky, sky)}${radGrad('lens7', [[0, '#fff6d0', 1], [1, '#e2a83a', 1]])}</defs>
  <rect width="${W}" height="${H}" fill="url(#lr_${sky})"/>
  <rect y="980" width="${W}" height="200" fill="${sky === 'dusk' ? '#3c4a6a' : '#5d86a6'}"/>
  ${[60, 330, 600, 870].map(x => `<rect x="${x}" y="200" width="22" height="1000" fill="#2b2f36"/>`).join('')}
  <rect x="0" y="180" width="${W}" height="40" fill="#2b2f36"/>
  <rect y="1150" width="${W}" height="${H}" fill="#3a3f48"/>
  <rect x="300" y="1060" width="480" height="100" rx="8" fill="#2b2f36"/>
  <g transform="translate(540,800)">
    <ellipse cx="0" cy="0" rx="200" ry="240" fill="${lens ? 'url(#lens7)' : '#8ea0ad'}" opacity="${lens ? 1 : .9}" ${lens ? 'filter="url(#zglow)"' : ''}/>
    ${[-160, -100, -40, 20, 80, 140].map(y => `<path d="M${-Math.sqrt(Math.max(0, 1 - (y / 240) ** 2)) * 200} ${y} L${Math.sqrt(Math.max(0, 1 - (y / 240) ** 2)) * 200} ${y}" stroke="${lens ? '#c98a2a' : '#6f808c'}" stroke-width="6"/>`).join('')}
    <ellipse cx="0" cy="0" rx="200" ry="240" fill="#d8eefa" opacity="${frost * .55}"/>
    <rect x="-40" y="240" width="80" height="60" fill="#2b2f36"/>
  </g>
  <g transform="translate(860,1290)"><circle r="96" fill="#e9e3d7" stroke="#2b2f36" stroke-width="12"/>
    <text x="-62" y="16" font-family="Anton" font-size="44" fill="${PAL.red}">E</text><text x="40" y="16" font-family="Anton" font-size="44" fill="#2b2f36">F</text>
    <line x1="0" y1="0" x2="${Math.cos(rad(180 + needle * 180)) * 70}" y2="${Math.sin(rad(180 + needle * 180)) * 70}" stroke="${PAL.red}" stroke-width="8" stroke-linecap="round"/><circle r="10" fill="#2b2f36"/>
    <text x="0" y="132" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="30" fill="#e9e3d7">FUEL</text></g>`;
}
S.lamp_cold = (t, d, T) => {
  const c1 = capL('lamp_cold', 1, T, t), c2 = capL('lamp_cold', 2, T, t);
  const rise = easeOut(seg(t, 0, 1.0));
  const svg = lampRoom(t, { frost: seg(t, c1, c1 + .5), needle: lerp(.45, 0, easeIO(seg(t, c2 + .2, c2 + 1.2))) }) +
    `<g transform="translate(0,${(1 - rise) * 500})">${theo({ x: 180, y: 1500, s: 1.5, f: 1, look: 1, eyes: t > c1 ? 'wide' : 'open', armF: [40, 30] })}</g>
    <rect x="0" y="1360" width="${W}" height="600" fill="#3a3f48"/>
    ${t > c1 ? pill(540, 470, 'COLD', { sc: back(seg(t, c1, c1 + .35)), bg: '#bfe3f2', fg: '#1d3a4a', size: 40, bold: 700 }) : ''}
    ${t > c2 ? pill(860, 1460, 'EMPTY', { sc: back(seg(t, c2 + .8, c2 + 1.15)), bg: PAL.red, fg: '#fff', size: 34, bold: 700 }) : ''}
    ${vign(.45)}`;
  return { svg, cam: 1.0 + .03 * (t / d) };
};

// 8 ---------------------------------------------------------------
S.sunset2 = (t, d, T) => {
  const p = t / d;
  const sy = lerp(900, 1000, p);
  const svg = `<defs>${skyG('ss2', 'dusk')}<clipPath id="sun2"><rect width="${W}" height="1000"/></clipPath></defs>
  <rect width="${W}" height="1010" fill="url(#ss2)"/>
  <circle cx="540" cy="${sy}" r="150" fill="#ffcf7a" clip-path="url(#sun2)"/>
  <rect y="1000" width="${W}" height="${H}" fill="#3c4a6a"/>
  <path d="M440 1010 L640 1010 L600 1200 L480 1200 Z" fill="#ffcf7a" opacity=".25"/>
  ${waveDashes(1010, 1500, t, '#f2b68a', 24, 471, .35)}
  <rect x="0" y="1500" width="${W}" height="20" fill="#1d1f22"/>
  ${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="1500" width="12" height="420" fill="#1d1f22"/>`).join('')}
  <rect x="0" y="1640" width="${W}" height="14" fill="#1d1f22"/>
  ${cat({ x: 300, y: 1500, s: 1.4, f: 1, pose: 'sit', look: .3 }).replace(/#d98a3c|#b86d27|#f4d7b0/g, '#1d1f22')}
  ${pill(540, 300, 'SUNSET', { bg: '#25282c', fg: '#ffcf7a', size: 34, bold: 700, sc: back(seg(t, .1, .45)) })}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 9 ---------------------------------------------------------------
S.ines_why = (t, d, T) => {
  const svg = islandGround(t, { kind: 'dusk', hz: 760, gy: 860, lhX: 860, lhS: .8 }) +
    ines({ x: 420, y: 1700, s: 3.0, f: 1, look: .6, mouth: talkM(t), armF: [50, 40], gun: false }) + vign(.5);
  return { svg, cam: 1.02 + .04 * (t / d) };
};

// 10 --------------------------------------------------------------
function ferryWreck(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s}) rotate(-9)">
    <path d="M-300 0 L-280 -150 L260 -150 L320 -60 L300 0 Z" fill="#6e4636"/>
    <path d="M-300 0 L300 0 L290 -30 L-296 -30 Z" fill="#4a2e24"/>
    <rect x="-220" y="-250" width="360" height="100" fill="#8a7a6a"/><rect x="-160" y="-320" width="220" height="70" fill="#9a8a78"/>
    ${[...Array(7)].map((_, i) => `<rect x="${-200 + i * 48}" y="-226" width="30" height="34" rx="6" fill="#1d1f22"/>`).join('')}
    <rect x="-40" y="-380" width="34" height="60" fill="#5a4a3e"/>
    <path d="M-120 -150 l30 -10 l20 40 l-50 10 Z M140 -140 l40 20 l-30 30 Z" fill="#a0583e" opacity=".8"/>
  </g>`;
}
S.wreck_walk = (t, d, T) => {
  const c1 = capL('wreck_walk', 1, T, t), c2 = capL('wreck_walk', 2, T, t);
  const wk = back(seg(t, c1, c1 + .4));
  let zs = '';
  if (t > c2 - .2) for (let i = 0; i < 9; i++) {
    const st = c2 - .2 + i * .18, kk = seg(t, st, d + 1.5);
    const zx = 680 + (rnd(i) - .5) * 300 - kk * (120 + rnd(i + 3) * 260);
    const zy = 930 + kk * (120 + rnd(i + 5) * 120);
    zs += `<g opacity="${seg(t, st, st + .3)}">${zomb({ x: zx, y: zy, s: .32 + kk * .2, t, ph: i, col: '#141820', f: -1, armsUp: .7 })}</g>`;
  }
  const svg = `<defs>${skyG('ww2', 'dusk')}</defs><rect width="${W}" height="${H}" fill="url(#ww2)"/>
  <circle cx="200" cy="860" r="70" fill="#ffcf7a" opacity=".7"/>
  <rect y="880" width="${W}" height="${H}" fill="#2f3d5a"/>${waveDashes(890, 1500, t, '#e9a88a', 24, 481, .3)}
  <g transform="translate(700 900) scale(${wk}) translate(-700 -900)">${ferryWreck(700, 920, .85)}<path d="M380 930 Q700 900 1060 940" stroke="#e9d9c0" stroke-width="8" fill="none" opacity=".5"/></g>
  ${zs}
  <path d="M-20 1520 Q300 1470 620 1500 Q860 1520 1100 1480 L1100 ${H} L-20 ${H} Z" fill="#3a4a30"/>
  ${[180, 330].map((x, i) => i ? ines({ x, y: 1640, s: 1.05, f: 1, gun: false, look: 1 }) : theo({ x, y: 1640, s: 1.05, f: 1, look: 1, eyes: t > c2 ? 'wide' : 'open' })).join('')}
  ${cat({ x: 450, y: 1640, s: .8, f: 1, pose: 'sit', ears: t > c2 ? 1 : 0 })}
  ${vign(.55)}`;
  return { svg, cam: 1.0 + .05 * (t / d) };
};

// 11 --------------------------------------------------------------
function batteryBox(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-80" y="-90" width="160" height="90" rx="8" fill="#26292f"/><rect x="-80" y="-90" width="160" height="22" rx="8" fill="#3a3f48"/>
    <rect x="-56" y="-104" width="22" height="16" fill="#c94a3a"/><rect x="34" y="-104" width="22" height="16" fill="#3a3f48"/>
    <text x="0" y="-26" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="30" fill="${PAL.yel}">12V</text></g>`;
}
S.battery = (t, d, T) => {
  const c1 = capL('battery', 1, T, t), c2 = capL('battery', 2, T, t);
  let svg;
  if (t < c1) {
    const lift = easeOut(seg(t, .1, .9));
    svg = `<rect width="${W}" height="${H}" fill="#2a3448"/><rect y="1100" width="${W}" height="${H}" fill="#6b4a32"/>
    ${[...Array(8)].map((_, i) => `<rect x="0" y="${1120 + i * 110}" width="${W}" height="5" fill="#5a3c27"/>`).join('')}
    <rect x="560" y="900" width="380" height="200" rx="10" fill="#33373e"/><rect x="580" y="920" width="340" height="40" fill="#2a2d33"/>
    ${mateo({ x: 420, y: 1130, s: 1.6, f: 1, lean: 6, armF: [150 - 40 * lift, 20], armB: [140 - 40 * lift, 20], mouth: 'o' })}
    ${batteryBox(430 + 50, lerp(1000, 640, lift), 1.15)}`;
  } else if (t < c2) {
    const sp = Math.sin(t * 40) > .3;
    svg = lampRoom(t, { sky: 'dusk', needle: 0 }) + `
    ${theo({ x: 360, y: 1180, s: 1.5, f: 1, pose: 'kneel', look: 1, armF: [70, 30], armB: [60, 30] })}
    ${batteryBox(640, 1160, 1.0)}
    <path d="M590 1060 Q560 1000 500 1010" stroke="#c94a3a" stroke-width="9" fill="none"/><path d="M680 1060 Q700 980 560 960" stroke="#222" stroke-width="9" fill="none"/>
    ${sp ? [...Array(6)].map((_, i) => `<line x1="510" y1="1000" x2="${510 + Math.cos(i) * 50}" y2="${1000 + Math.sin(i * 2) * 50}" stroke="#ffe27a" stroke-width="5"/>`).join('') : ''}
    <rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>`;
  } else {
    const k = back(seg(t, c2, c2 + .35));
    svg = lampRoom(t, { sky: 'dusk', needle: 0 }) + `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>
    ${batteryBox(540, 1100, 2.0)}
    ${cat({ x: 540, y: 900, s: 1.7, f: 1, pose: 'sit', look: Math.sin(t * 2) * .5 })}
    ${pill(540, 360, 'SUPERVISOR', { sc: k, bg: PAL.yel, size: 38, bold: 700 })}`;
  }
  return { svg: svg + vign(.45), cam: 1.0 + .04 * (t / d) };
};

// 12 --------------------------------------------------------------
S.light_on = (t, d, T) => {
  const c1 = capL('light_on', 1, T, t), c2 = capL('light_on', 2, T, t);
  const on = seg(t, .15, .5);
  const ang = t * 50;
  let zs = '';
  for (let i = 0; i < 10; i++) {
    const side = i % 2 ? 1 : -1;
    const a = rad(200 + i * 14 + (i % 3) * 3);
    const stop = c1 + .2 + (i % 4) * .08;
    const r0 = 760, r1 = 470;
    const r = lerp(r0, r1, clamp((Math.min(t, stop)) / stop));
    const zx = 330 + Math.cos(a) * r * 1.0 * -1, zy = 1080 + Math.abs(Math.sin(a)) * r * .45 + 120;
    zs += zomb({ x: zx, y: zy, s: .55, t: t < stop ? t : stop, ph: i, col: '#0c1016', f: zx < 330 ? 1 : -1, armsUp: t < stop ? .8 : .3, eyes: 1 });
  }
  const svg = `<defs>${skyG('lo2', 'night')}${radGrad('pool2', [[0, '#ffe7a0', .5], [.85, '#ffe7a0', .32], [1, '#ffe7a0', 0]])}</defs>
  <rect width="${W}" height="${H}" fill="url(#lo2)"/>${stars(40, 231, 800)}
  <rect y="860" width="${W}" height="${H}" fill="#14243a"/>
  <path d="M-20 1000 Q540 950 1100 1000 L1100 ${H} L-20 ${H} Z" fill="#3a3a30"/>
  <g opacity="${on}"><path d="M330 590 L${330 + Math.cos(rad(ang)) * 1600} ${590 + Math.sin(rad(ang)) * 300 - 120} L${330 + Math.cos(rad(ang)) * 1600} ${590 + Math.sin(rad(ang)) * 300 + 120} Z" fill="#fff2b8" opacity=".22"/></g>
  <ellipse cx="330" cy="1200" rx="${470 * on}" ry="${220 * on}" fill="url(#pool2)"/>
  ${lighthouse(330, 1100, .9, on, PAL_LH)}
  <circle cx="330" cy="660" r="${60 * on}" fill="#fff6d0" filter="url(#zglow)" opacity="${on}"/>
  ${zs}
  ${t > c2 ? `<ellipse cx="330" cy="1200" rx="470" ry="220" fill="none" stroke="${PAL.yel}" stroke-width="6" stroke-dasharray="20 16" opacity="${seg(t, c2, c2 + .4)}"/>` : ''}
  ${vign(.55)}`;
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 13 --------------------------------------------------------------
S.answer = (t, d, T) => {
  const c1 = capL('answer', 1, T, t);
  const blink = t > c1 && (Math.floor((t - c1) * 3) % 2 === 0) ? 1 : 0;
  const ang = 180 + Math.sin(t * .8) * 20;
  const svg = `<defs>${skyG('an2', 'night')}</defs>
  <rect width="${W}" height="${H}" fill="url(#an2)"/>${stars(60, 241, 950)}
  <rect y="980" width="${W}" height="${H}" fill="#10203a"/>${waveDashes(990, 1650, t, '#8aa6c4', 24, 491, .25)}
  <path d="M1100 700 L-200 ${880 + Math.sin(rad(ang)) * 200} L-200 ${1080 + Math.sin(rad(ang)) * 200} Z" fill="#fff2b8" opacity=".1"/>
  ${t > c1 ? `<circle cx="880" cy="975" r="${blink ? 14 : 6}" fill="#ffe0a0" filter="url(#zglow)"/><circle cx="880" cy="975" r="${blink ? 60 : 20}" fill="#ffe0a0" opacity=".18"/>` : ''}
  ${t > c1 ? pill(880, 880, '???', { sc: back(seg(t, c1 + .3, c1 + .6)), bg: PAL.red, fg: '#fff', size: 30, bold: 700 }) : ''}
  <rect x="0" y="1700" width="${W}" height="16" fill="#0a0c10"/>
  ${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="1700" width="12" height="260" fill="#0a0c10"/>`).join('')}
  ${cat({ x: 300, y: 1700, s: 1.5, f: 1, pose: 'sit', look: .8, ears: t > c1 ? 1 : 0 }).replace(/#d98a3c|#b86d27|#f4d7b0/g, '#0a0c10')}
  ${vign(.6)}`;
  const z = 1 + .25 * easeIO(seg(t, c1, d));
  return { svg: `<g transform="translate(880 975) scale(${z}) translate(-880 -975)">${svg}</g>`, cam: 1 };
};

// 14 --------------------------------------------------------------
S.end_card16 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="690" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="40" fill="#e8e8ea" opacity="${a * .7}" letter-spacing="10">SEASON 2</text>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 2</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE OTHER LIGHT</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`, cam: 1 };
};

// 15 -------- reusable CTA: "how these videos are made — guide in bio" --------
S.cta = (t, d, T) => {
  const a = back(seg(t, 0, .45)), b = back(seg(t, .3, .75));
  const bob = Math.sin(t * 6) * 14;
  // miniature of an episode playing inside a phone
  const mini = islandWide(t, { kind: 'night', lamp: 1 });
  const prog = (t / d);
  const svg = `<rect width="${W}" height="${H}" fill="#0f1116"/>
  <circle cx="540" cy="760" r="560" fill="#1a1d26"/>
  <g transform="translate(540,${200 + bob * .3}) scale(${a})">
    <path d="M0 -70 L44 -14 L16 -14 L16 40 L-16 40 L-16 -14 L-44 -14 Z" fill="${PAL.yel}" transform="translate(0,${bob})"/>
  </g>
  ${pill(540, 340, 'LINK IN BIO', { sc: a, bg: PAL.yel, size: 46, bold: 700 })}
  <g transform="translate(540 760) scale(${b}) translate(-540 -760)">
    <rect x="300" y="430" width="480" height="680" rx="56" fill="#2a2d35"/>
    <svg x="324" y="454" width="432" height="632" viewBox="324 300 432 1000" preserveAspectRatio="xMidYMid slice"><rect width="1080" height="1920" fill="#000"/>${mini}</svg>
    <rect x="324" y="454" width="432" height="632" rx="34" fill="none" stroke="#2a2d35" stroke-width="18"/>
    <rect x="490" y="470" width="100" height="18" rx="9" fill="#2a2d35"/>
    <rect x="360" y="1040" width="360" height="8" rx="4" fill="#ffffff" opacity=".3"/><rect x="360" y="1040" width="${360 * prog}" height="8" rx="4" fill="${PAL.red}"/>
  </g>
  ${cat({ x: 820, y: 1700, s: 1.6, f: -1, pose: 'sit', look: -.5 + Math.sin(t * 2) * .2 })}
  ${theo({ x: 250, y: 1760, s: 1.25, f: 1, look: .6, armF: [150 + Math.sin(t * 5) * 12, 30] })}
  <text x="540" y="1560" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="38" fill="#e8e8ea" letter-spacing="4" opacity="${seg(t, .8, 1.3) * .9}">STEP-BY-STEP GUIDE</text>`;
  return { svg, cam: 1 };
};
