// ---------- WHAT IF: SINKING CAR (non-zombie what-if #1) ----------
function kid(o = {}, col = '#e8a020') { return recolor(o, { coat: col, coatD: col, hat: '#3a2e26', hatD: '#3a2e26', beard: '#f1dcc0', pants: '#2f3a4a' }); }
function wcTimer(T) {
  const sg = window.TL.segments, a = sg.find(s => s.scene === 'wc_float').start, b = sg.find(s => s.scene === 'wc_out').start;
  if (T < a || T >= b) return '';
  return timerChip(40, 400, Math.max(0, 60 - (T - a) * (52 / (b - a))));
}
function bubbles(t, x0, x1, y0, y1, n = 24, seed = 3, sp = 160) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + rnd(i + seed) * (x1 - x0) + Math.sin(t * 3 + i) * 8, h = y1 - y0;
    const y = y1 - ((rnd(i + seed + 9) * h + t * sp * (.6 + rnd(i + seed + 4))) % h);
    s += `<circle cx="${x}" cy="${y}" r="${4 + rnd(i + seed + 2) * 10}" fill="none" stroke="#bfe6ff" stroke-width="3" opacity=".55"/>`;
  }
  return s;
}
function nightLake(t, wy = 1150, o = {}) {
  const { trees = 1 } = o;
  return `<defs>${linGrad('wcsky', [[0, '#03050c'], [1, '#16243c']])}${linGrad('wcwat', [[0, '#123049'], [1, '#050d16']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#wcsky)"/>${stars(60, 48, wy - 200)}
  <circle cx="820" cy="300" r="70" fill="#f1ead2"/><circle cx="820" cy="300" r="120" fill="#f1ead2" opacity=".08"/>
  ${trees ? `<path d="M0 ${wy} L0 ${wy - 120} ${[...Array(18)].map((_, i) => `L${30 + i * 60} ${wy - 90 - rnd(i + 3) * 120} L${60 + i * 60} ${wy - 60}`).join(' ')} L${W} ${wy - 80} L${W} ${wy} Z" fill="#070b12"/>` : ''}
  <rect y="${wy}" width="${W}" height="${H - wy}" fill="url(#wcwat)"/>
  ${[0, 1, 2, 3].map(i => waves(wy + 30 + i * 90, '#3d6a8c', t + i, 6, 160, 30, 4, .45 - i * .08)).join('')}
  <rect x="770" y="${wy + 20}" width="100" height="${300}" fill="#f1ead2" opacity=".06"/>`;
}
function underwater(t) {
  return `<defs>${linGrad('wcuw', [[0, '#1d5a7a'], [1, '#031019']])}</defs><rect width="${W}" height="${H}" fill="url(#wcuw)"/>
  ${[0, 1, 2].map(i => `<path d="M${200 + i * 300 + Math.sin(t + i) * 30} 0 L${120 + i * 300} ${H} L${260 + i * 300} ${H} Z" fill="#9fd8ff" opacity=".05"/>`).join('')}`;
}
// side-view car facing right; origin = ground under the middle
function car(x, y, s = 1, o = {}) {
  const { col = '#2f6fb0', win = 0, inside = '', level = 0, rot = 0, head = 1, glass = .85 } = o;
  const fw = 'M10 -238 L110 -238 L172 -156 L10 -156 Z', rw = 'M-100 -238 L-10 -238 L-10 -156 L-160 -156 Z';
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <defs><clipPath id="wccab"><path d="M-160 -150 L-105 -250 L118 -250 L205 -150 Z"/></clipPath></defs>
    ${head ? `<path d="M280 -120 L760 -200 L760 -20 Z" fill="#fff6c8" opacity=".12"/>` : ''}
    <path d="M-170 -150 L-108 -252 L120 -252 L208 -150 Z" fill="${col}"/>
    <path d="M-160 -150 L-105 -248 L118 -248 L200 -150 Z" fill="#141a24"/>
    ${inside}
    <g clip-path="url(#wccab)"><rect x="-180" y="${-150 - level * 100}" width="400" height="140" fill="#3fa0d8" opacity=".72"/><rect x="-180" y="${-152 - level * 100}" width="400" height="5" fill="#dff3ff" opacity="${level > 0 ? .9 : 0}"/></g>
    <path d="${fw}" fill="#a9d4f0" opacity="${glass * .35}" transform="translate(0 ${win * 82}) "/>
    <path d="${rw}" fill="#a9d4f0" opacity="${glass * .35}"/>
    <rect x="-8" y="-250" width="18" height="100" fill="${col}"/>
    <rect x="-290" y="-156" width="580" height="116" rx="40" fill="${col}"/>
    <rect x="-290" y="-110" width="580" height="10" fill="#000" opacity=".12"/>
    <path d="M-10 -150 L-10 -50 M180 -150 L180 -60 M-250 -150 L-250 -60" stroke="#000" stroke-width="5" opacity=".25"/>
    <rect x="30" y="-120" width="44" height="10" rx="5" fill="#1a2230"/>
    <rect x="270" y="-136" width="26" height="30" rx="8" fill="#ffe9a0"/><rect x="-296" y="-136" width="22" height="30" rx="8" fill="#d9473a"/>
    ${[-170, 170].map(wx => `<circle cx="${wx}" cy="-36" r="50" fill="#1c1f26"/><circle cx="${wx}" cy="-36" r="22" fill="#8a9098"/>`).join('')}
  </g>`;
}
const driverIn = (o = {}) => `<g transform="translate(60,-80) scale(.42)">${youGuy({ x: 0, y: 0, s: 1, f: 1, pose: 'sit', armF: [60, 40], ...o })}</g>`;
const wcCam = (t, d) => 1.0 + .04 * (t / d);

S.wc_hook = (t, d, T) => {
  const c1 = capL('wc_hook', 1, T, t);
  const k = easeIO(seg(t, .2, 1.6)), sx = lerp(330, 660, k), sy = lerp(640, 1180, k * k), rot = lerp(0, 38, k);
  const splash = seg(t, 1.5, 2.6);
  let sp = '';
  if (splash > 0) for (let i = 0; i < 26; i++) { const a = -Math.PI * (.1 + .8 * rnd(i)), v = 300 + rnd(i + 4) * 400, tt = splash * 1.1; sp += `<circle cx="${700 + Math.cos(a) * v * tt}" cy="${1150 + Math.sin(a) * v * tt + 500 * tt * tt}" r="${8 + rnd(i) * 14}" fill="#cfeaff" opacity="${1 - splash}"/>`; }
  const bridge = `<rect x="-20" y="640" width="560" height="40" fill="#3a4250"/><rect x="-20" y="680" width="560" height="26" fill="#252b35"/>
    ${[...Array(9)].map((_, i) => `<rect x="${i * 60}" y="560" width="10" height="80" fill="#5a6270"/>`).join('')}<rect x="-20" y="560" width="480" height="10" fill="#5a6270"/>
    <path d="M470 560 L520 520 M470 600 L540 590" stroke="#5a6270" stroke-width="10"/>${[120, 420].map(px => `<rect x="${px}" y="706" width="40" height="450" fill="#252b35"/>`).join('')}`;
  const svg = nightLake(t, 1150) + bridge + (splash < .5 ? car(sx, sy, .55, { rot }) : car(700, 1230, .55, { rot: 38, head: 0 })) + sp +
    (t > c1 ? pill(540, 300, '60 SECONDS', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 52, bold: 700 }) : '') + vign(.45);
  return { svg: zoomAt(svg, 640, 1100, 1 + .12 * easeIO(seg(t, 0, d))), cam: 1 };
};
S.wc_setup = (t, d, T) => {
  const c1 = capL('wc_setup', 1, T, t);
  if (t < c1 - .15) {
    const sw = Math.sin(t * 5) * 14 * seg(t, .8, c1);
    const road = `<rect width="${W}" height="${H}" fill="#05070d"/>${stars(40, 9, 700)}<rect y="900" width="${W}" height="${H}" fill="#1b1f27"/>
      <rect y="1180" width="${W}" height="16" fill="#e8c840" opacity=".7"/>${[...Array(6)].map((_, i) => `<ellipse cx="${(i * 260 - t * 300) % 1400}" cy="1300" rx="120" ry="16" fill="#cfe8ff" opacity=".18"/>`).join('')}`;
    return { svg: road + car(500 + t * 30, 1260, .9, { rot: sw }) + pill(540, 300, 'BLACK ICE', { sc: back(seg(t, .1, .4)), bg: '#cfe8ff', size: 44, bold: 700 }) + vign(.5), cam: wcCam(t, d) };
  }
  const k = seg(t, c1 - .15, d);
  return { svg: nightLake(t, 1150) + car(540, 1240 + 20 * k, .9, { rot: 22, head: 0 }) + vign(.5), cam: 1.0 + .06 * k };
};
S.wc_float = (t, d, T) => {
  const bob = Math.sin(t * 2.2) * 8, rot = 14 + 8 * seg(t, 0, d);
  const svg = nightLake(t, 1150) + car(540, 1235 + bob, .9, { rot, head: 0, inside: driverIn({ look: 1, sweat: 1 }) }) +
    `<rect y="1180" width="${W}" height="${H}" fill="#123049" opacity=".55"/>` + waves(1185, '#6e9ab8', t, 8, 140, 50, 6, .6) + wcTimer(T) + vign(.5);
  return { svg, cam: wcCam(t, d) };
};
S.wc_r1 = (t, d, T) => {
  const c1 = capL('wc_r1', 1, T, t), u = easeOut(seg(t, .9, 1.4));
  const bg = `<rect width="${W}" height="${H}" fill="#10151e"/><rect x="0" y="${1500 - 60 * seg(t, 0, d)}" width="${W}" height="600" fill="#2a6f99" opacity=".55"/>${waves(1500 - 60 * seg(t, 0, d), '#7fb8dc', t, 6, 120, 60, 5, .6)}`;
  const strap = `<path d="M180 260 L${470 - u * 30} ${760 - u * 30}" stroke="#3a3f48" stroke-width="80" stroke-linecap="butt"/>`;
  const buckle = `<g transform="translate(540 820)"><rect x="-90" y="-60" width="230" height="150" rx="26" fill="#2b2f36"/><rect x="40" y="-30" width="80" height="40" rx="8" fill="${PAL.red}"/>
    <text x="80" y="0" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="24" fill="#fff">PRESS</text></g>`;
  const tongue = `<g transform="translate(${-u * 200} ${-u * 200})"><rect x="430" y="740" width="150" height="70" rx="10" fill="#b9bec6" transform="rotate(45 505 775)"/></g>`;
  const ok = u > .9 ? pill(540, 1460, 'UNBUCKLED', { sc: back(seg(t, 1.4, 1.7)), bg: '#3fae5a', fg: '#fff', size: 44, bold: 700 }) : '';
  const crew = t > c1 ? [0, 1, 2].map(i => `<g transform="translate(${180 + i * 360} 1720)"><text x="0" y="0" text-anchor="middle" font-family="Anton" font-size="80" fill="${PAL.yel}" opacity="${seg(t, c1 + i * .3, c1 + i * .3 + .2)}">UNBUCKLE!</text></g>`).join('') : '';
  const dr = `<rect x="200" y="560" width="680" height="560" rx="60" fill="#1d2532"/>` + youGuy({ x: 520, y: 1480, s: 2.4, f: 1, pose: 'sit', armF: [u > 0 ? 150 : 40, 30], look: 0, sweat: 1 });
  const belt = `<g transform="translate(${-u * 260} ${-u * 320})" opacity="${1 - u * .6}"><path d="M430 880 L640 1140" stroke="#2b2f36" stroke-width="44" stroke-linecap="round"/></g><rect x="610" y="1110" width="80" height="56" rx="12" fill="${PAL.red}"/>`;
  return { svg: bg + dr + belt + ok + crew + rulePill(1, t) + wcTimer(T) + vign(.5), cam: wcCam(t, d) };
};
S.wc_r2 = (t, d, T) => {
  const c1 = capL('wc_r2', 1, T, t), wd = easeIO(seg(t, c1 + .2, c1 + 1.4));
  let arrows = '';
  for (let i = 0; i < 6; i++) { const ax = 120 + i * 170, push = Math.sin(t * 6 + i) * 10; arrows += `<path d="M${ax} ${560 + push} L${ax} ${640 + push} M${ax - 26} ${612 + push} L${ax} ${644 + push} L${ax + 26} ${612 + push}" stroke="#9fd8ff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/>`; }
  const svg = underwater(t) + bubbles(t, 0, W, 0, H, 20, 7) + car(460, 1180, 2.0, { head: 0, win: wd, inside: driverIn({ look: 0 }), level: .25 + .15 * seg(t, 0, d) }) +
    (t < c1 ? arrows + bigX(t, .8, 540, 980, 150) + pill(540, 1460, 'DOOR WON\'T OPEN', { sc: back(seg(t, .6, .9)), bg: PAL.red, fg: '#fff', size: 40, bold: 700 })
      : pill(540, 1460, 'WINDOW DOWN', { sc: back(seg(t, c1 + .2, c1 + .5)), bg: '#3fae5a', fg: '#fff', size: 44, bold: 700 })) + rulePill(2, t) + wcTimer(T) + vign(.45);
  return { svg, cam: wcCam(t, d) };
};
S.wc_r3 = (t, d, T) => {
  const c1 = capL('wc_r3', 1, T, t);
  if (t < c1) {
    const sw = seg(t, .7, 1.0), hit = t > 1.0, cr = easeOut(seg(t, 1.0, 1.4));
    let crack = '';
    if (hit) for (let i = 0; i < 12; i++) { const a = Math.PI * (.5 + .5 * i / 11) + rnd(i) * .2, L = 120 + rnd(i + 3) * 520; crack += `<path d="M880 560 L${880 + Math.cos(a) * L * cr * .5 + rnd(i) * 20} ${560 + Math.sin(a) * L * cr * .5} L${880 + Math.cos(a) * L * cr} ${560 + Math.sin(a) * L * cr}" stroke="#fff" stroke-width="5" fill="none" opacity=".85"/>`; }
    const hx = lerp(1100, 900, easeIO(sw)), hy = lerp(300, 540, easeIO(sw));
    const tool = `<g transform="translate(${hx} ${hy}) rotate(${lerp(-30, 10, sw)})"><rect x="-20" y="0" width="40" height="190" rx="14" fill="${PAL.red}"/><path d="M-36 -10 L36 -10 L0 -60 Z" fill="#c9ced6"/></g>`;
    const svg = underwater(t) + `<rect x="120" y="500" width="840" height="640" rx="30" fill="#a9d4f0" opacity=".28" stroke="#1a2230" stroke-width="30"/>` + crack + tool +
      pill(540, 1460, 'SIDE WINDOW · CORNER', { sc: back(seg(t, .3, .6)), bg: PAL.yel, size: 40, bold: 700 }) + rulePill(3, t) + wcTimer(T) + vign(.45);
    return { svg, cam: hit ? 1.0 + .04 * Math.exp(-(t - 1) * 8) * Math.sin(t * 60) + .02 : 1 };
  }
  const ws = `<g transform="translate(540 820)"><path d="M-380 260 L-300 -180 L300 -180 L380 260 Z" fill="#a9d4f0" opacity=".35" stroke="#1a2230" stroke-width="30"/>
    <rect x="-420" y="260" width="840" height="120" rx="20" fill="#2f6fb0"/></g>`;
  return { svg: underwater(t) + ws + bigX(t, c1 + .4, 540, 760, 230) + pill(540, 1460, 'WINDSHIELD = NO', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 44, bold: 700 }) + rulePill(3, t) + wcTimer(T) + vign(.45), cam: wcCam(t, d) };
};
S.wc_kids = (t, d, T) => {
  const c1 = capL('wc_kids', 1, T, t);
  const cols = ['#e8a020', '#3fae5a', '#d06aa0'];
  let ins = driverIn({ look: -1 }), out = '';
  cols.forEach((c, i) => {
    const go = easeIO(seg(t, c1 + .2 + i * .55, c1 + .9 + i * .55));
    const sc = [.34, .29, .24][i];
    if (go <= 0) ins += `<g transform="translate(${-120 + i * 40},-80) scale(${sc})">${kid({ x: 0, y: 0, f: 1, pose: 'sit', armF: [80, 40] }, c)}</g>`;
    else out += `<g transform="translate(${lerp(560 - i * 30, 640 - i * 150, go)} ${lerp(820, 460, go)}) rotate(-15) scale(${sc * 2})">${kid({ x: 0, y: 0, f: -1, armF: [170, 10], armB: [170, 10] }, c)}</g>`;
  });
  const svg = underwater(t) + bubbles(t, 0, W, 0, H, 18, 21) + car(560, 1180, 2.0, { head: 0, win: 1, inside: ins, level: .45 }) + out +
    (t > c1 ? pill(540, 1460, 'OLDEST → YOUNGEST', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 42, bold: 700 }) : pill(540, 1460, 'KIDS FIRST', { sc: back(seg(t, .2, .5)), bg: PAL.yel, size: 44, bold: 700 })) + wcTimer(T) + vign(.45);
  return { svg, cam: wcCam(t, d) };
};
S.wc_mistake = (t, d, T) => {
  const c1 = capL('wc_mistake', 1, T, t), lv = seg(t, 0, d);
  const ph = `<g transform="translate(540 860)"><rect x="-200" y="-380" width="400" height="760" rx="56" fill="#121418"/><rect x="-184" y="-364" width="368" height="728" rx="44" fill="#16233a"/>
    ${t > c1 ? `<text x="0" y="-230" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="40" fill="#c9d1e3">Calling...</text>
    <text x="0" y="-60" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff">911</text>
    <circle cx="0" cy="230" r="56" fill="${PAL.red}"/>` : `<text x="0" y="0" text-anchor="middle" font-family="Anton" font-size="70" fill="#3a4a66">?</text>`}
    <rect x="-184" y="${364 - 728 * lv * .7}" width="368" height="${728 * lv * .7}" fill="#2a6f99" opacity=".75"/></g>`;
  return { svg: `<rect width="${W}" height="${H}" fill="#14171c"/>` + ph + mistakeFx(t, d) + wcTimer(T) + vign(.5), cam: 1.0 + .05 * (t / d) };
};
S.wc_why = (t, d, T) => {
  const c1 = capL('wc_why', 1, T, t);
  const lv = t < c1 ? lerp(.3, .62, easeIO(seg(t, 0, c1))) : .62;
  const svg = underwater(t) + bubbles(t, 0, W, 0, H, 26, 31, 220) + car(460, 1180, 2.0, { head: 0, inside: driverIn({ look: 1, sweat: 1, armF: [140, 30] }), level: lv }) +
    (t > c1 ? pill(540, 1460, 'GET OUT FIRST', { sc: back(seg(t, c1, c1 + .3)), bg: '#3fae5a', fg: '#fff', size: 46, bold: 700 }) +
      `<path d="M540 ${560 - 20 * Math.abs(Math.sin(t * 5))} l0 -160 m-50 50 l50 -50 l50 50" stroke="#3fae5a" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : '') + wcTimer(T) + vign(.45);
  return { svg, cam: wcCam(t, d) };
};
S.wc_out = (t, d, T) => {
  const c1 = capL('wc_out', 1, T, t);
  if (t < c1) {
    const k = easeIO(seg(t, .3, c1));
    const svg = underwater(t) + bubbles(t, 0, W, 0, H, 30, 41, 260) + car(560, 1500 + 120 * k, 2.0, { head: 0, win: 1, level: 1 }) +
      `<g transform="translate(${lerp(640, 560, k)} ${lerp(1180, 520, k)}) rotate(${lerp(-60, -10, k)})">${youGuy({ x: 0, y: 0, s: 1.1, f: 1, armF: [170 + Math.sin(t * 9) * 20, 10], armB: [160 - Math.sin(t * 9) * 20, 10], walk: t * 8 })}</g>` + vign(.45);
    return { svg, cam: 1 };
  }
  const svg = nightLake(t, 1100) + car(540, 1320, .9, { rot: 30, head: 0 }) + `<rect y="1110" width="${W}" height="${H}" fill="#123049" opacity=".75"/>` + waves(1112, '#6e9ab8', t, 8, 140, 50, 6, .6) +
    youGuy({ x: 420, y: 1240, s: .9, f: 1, armF: [120, 20], look: 0 }) + `<rect y="1150" width="${W}" height="${H}" fill="#123049" opacity=".8"/>` +
    pill(540, 300, 'YOU MADE IT', { sc: back(seg(t, c1 + .5, c1 + .8)), bg: '#3fae5a', fg: '#fff', size: 48, bold: 700 }) + vign(.45);
  return { svg, cam: wcCam(t, d) };
};
S.wc_twist = (t, d, T) => {
  const c = [0, 1, 2].map(i => capL('wc_twist', i, T, t));
  const knock = (t > .5) ? [0, 1, 2].map(i => { const ph = ((t - .5) * 1.6 + i * .33) % 1; return `<text x="${420 + i * 80}" y="${930 - ph * 120}" text-anchor="middle" font-family="Anton" font-size="${70 - i * 8}" fill="${PAL.red}" opacity="${1 - ph}" transform="rotate(${-10 + i * 8} ${420 + i * 80} 920)">KNOCK</text>`; }).join('') : '';
  let svg = nightLake(t, 1100) + car(600, 1250, .9, { rot: 32, head: 0 }) + `<rect y="1110" width="${W}" height="${H}" fill="#123049" opacity=".75"/>` + waves(1112, '#6e9ab8', t, 8, 140, 50, 6, .6) +
    youGuy({ x: 700, y: 1260, s: .8, f: -1, armF: [120, 20], look: -1, sweat: 1 }) + `<rect y="1170" width="${W}" height="${H}" fill="#123049" opacity=".8"/>` + knock;
  const z = 1 + .8 * easeIO(seg(t, c[1], c[1] + .9)) + .5 * easeIO(seg(t, c[2], c[2] + 1.2));
  svg = zoomAt(svg, 460, 1000, z);
  if (t > c[2]) svg += `<rect width="${W}" height="${H}" fill="#b80f0f" opacity="${.12 + .06 * Math.sin(t * 6)}"/>`;
  return { svg: svg + vign(.6), cam: 1 };
};
S.wc_end = (t, d, T) => part2Card(t, d, 'THE SINKING CAR');
