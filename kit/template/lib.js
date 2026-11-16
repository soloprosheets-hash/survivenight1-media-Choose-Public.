// ---------- shared helpers, characters, props ----------
const W = 1080, H = 1920;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const easeIO = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const back = t => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const rad = d => d * Math.PI / 180;
// deterministic pseudo-random
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

const PAL = {
  coat: '#dba33a', coatD: '#b98329', skin: '#f1dcc0', skinD: '#dcc2a2', hat: '#2e3f57', hatD: '#223047',
  pants: '#4b5262', boot: '#2a2a2f', beard: '#a07b58', eye: '#2a2522',
  red: '#d9473a', yel: '#f2c230', ink: '#1d1f22',
};

function linGrad(id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) {
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">` +
    stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('') + `</linearGradient>`;
}
function radGrad(id, stops, cx = .5, cy = .5, r = .5) {
  return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">` +
    stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('') + `</radialGradient>`;
}
const blurF = (id, s) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${s}"/></filter>`;
const glowF = (id, s) => `<filter id="${id}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="${s}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;

function line(x1, y1, x2, y2, col, w, extra = '') {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
}

// arm from shoulder; a = upper angle (deg, 0 = straight down, + = forward), b = elbow bend added for forearm
function limb(sx, sy, a, b, L1, L2, col, w, endFn) {
  const ex = sx + Math.sin(rad(a)) * L1, ey = sy + Math.cos(rad(a)) * L1;
  const hx = ex + Math.sin(rad(a + b)) * L2, hy = ey + Math.cos(rad(a + b)) * L2;
  return `<path d="M${sx} ${sy} L${ex} ${ey} L${hx} ${hy}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` + (endFn ? endFn(hx, hy, a + b) : '');
}

// ---------- Theo, the lighthouse keeper ----------
// origin = between the feet on the ground; facing right when f = 1
function theo(o = {}) {
  const { x = 0, y = 0, s = 1, f = 1, pose = 'stand', walk = null, lean = 0, armF = [12, 10], armB = [-8, 6],
    eyes = 'open', look = 0, mouth = 'flat', mug = false, headTilt = 0, sweat = 0 } = o;
  const C = PAL;
  let legs = '', hipY = -128;
  const boot = (fx, fy, dir = 1) => `<rect x="${fx - 14 + dir * 4}" y="${fy - 16}" width="38" height="18" rx="8" fill="${C.boot}" transform="${dir < 0 ? `translate(${2 * fx},0) scale(-1,1)` : ''}"/>`;
  if (pose === 'stand' || pose === 'walk') {
    const a = walk !== null ? Math.sin(walk) * 26 : 0;
    const bob = walk !== null ? Math.abs(Math.cos(walk)) * 5 : 0;
    hipY -= bob;
    for (const [sgn, sh] of [[-1, '#3f4553'], [1, C.pants]]) {
      const ang = sgn * a, kx = Math.sin(rad(ang)) * 64, ky = hipY + Math.cos(rad(ang)) * 64;
      const knee = Math.max(0, -sgn * Math.sin(walk || 0)) * 22;
      const fx = kx + Math.sin(rad(ang - knee)) * 64, fy = Math.min(0, ky + Math.cos(rad(ang - knee)) * 64);
      legs += `<path d="M${sgn * 6} ${hipY} L${kx + sgn * 6} ${ky} L${fx + sgn * 6} ${fy}" fill="none" stroke="${sh}" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>` + boot(fx + sgn * 6, fy);
    }
  } else if (pose === 'sit') {
    hipY = -150;
    legs = `<path d="M0 ${hipY} L66 ${hipY} L70 -6" fill="none" stroke="#3f4553" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>` + boot(70, -2) +
      `<path d="M8 ${hipY + 4} L74 ${hipY + 4} L84 -6" fill="none" stroke="${C.pants}" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>` + boot(84, -2);
  } else if (pose === 'kneel') {
    hipY = -112;
    legs = `<path d="M-4 ${hipY} L6 -14 L-58 -8" fill="none" stroke="#3f4553" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<rect x="-86" y="-22" width="36" height="18" rx="8" fill="${C.boot}"/>` +
      `<path d="M6 ${hipY} L64 ${hipY - 6} L66 -6" fill="none" stroke="${C.pants}" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>` + boot(66, -2);
  }
  const hand = (hx, hy) => `<circle cx="${hx}" cy="${hy}" r="11.5" fill="${C.skin}"/>` +
    (mug ? `<rect x="${hx - 2}" y="${hy - 26}" width="30" height="34" rx="5" fill="#e9e3d7"/><path d="M${hx + 28} ${hy - 18} q12 0 12 10 q0 10 -12 10" fill="none" stroke="#e9e3d7" stroke-width="5"/>` : '');
  const sh = hipY - 98;
  const plainHand = (hx, hy) => `<circle cx="${hx}" cy="${hy}" r="11.5" fill="${C.skin}"/>`;
  const backArm = limb(-4, sh + 6, armB[0], armB[1], 56, 54, C.coatD, 21, plainHand);
  const frontArm = limb(4, sh + 6, armF[0], armF[1], 56, 54, C.coat, 22, hand);
  const torso = `<path d="M-36 ${hipY + 26} Q-44 ${sh + 40} -30 ${sh + 2} Q0 ${sh - 14} 28 ${sh + 2} Q42 ${sh + 40} 38 ${hipY + 26} Z" fill="${C.coat}"/>` +
    `<path d="M-36 ${hipY + 26} Q-44 ${sh + 40} -30 ${sh + 2} Q-14 ${sh - 6} -10 ${sh} Q-22 ${sh + 50} -18 ${hipY + 26} Z" fill="${C.coatD}" opacity=".55"/>` +
    `<line x1="14" y1="${sh + 12}" x2="18" y2="${hipY + 22}" stroke="${C.coatD}" stroke-width="3"/>` +
    `<path d="M-22 ${sh + 2} L0 ${sh + 20} L24 ${sh + 2}" fill="${C.coatD}"/>`;
  const hy0 = sh - 52; // head centre
  const hy = hy0 + 4;
  let eyeSvg = '';
  const ex = 14 + look * 6;
  if (eyes === 'closed') eyeSvg = `<path d="M${ex - 7} ${hy + 2} q7 5 14 0" stroke="${C.eye}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M${ex + 15} ${hy + 2} q7 5 14 0" stroke="${C.eye}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  else if (eyes === 'wide') eyeSvg = `<circle cx="${ex}" cy="${hy}" r="8" fill="#fff"/><circle cx="${ex + 1 + look * 2}" cy="${hy}" r="4" fill="${C.eye}"/><circle cx="${ex + 22}" cy="${hy}" r="8" fill="#fff"/><circle cx="${ex + 23 + look * 2}" cy="${hy}" r="4" fill="${C.eye}"/>`;
  else eyeSvg = `<circle cx="${ex}" cy="${hy}" r="4.6" fill="${C.eye}"/><circle cx="${ex + 22}" cy="${hy}" r="4.6" fill="${C.eye}"/>`;
  const brow = `<path d="M${ex - 7} ${hy - 13} l12 -1" stroke="${C.eye}" stroke-width="3" stroke-linecap="round" opacity=".7"/><path d="M${ex + 16} ${hy - 14} l12 1" stroke="${C.eye}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  const mouthSvg = mouth === 'o' ? `<ellipse cx="${ex + 12}" cy="${hy + 24}" rx="5" ry="6" fill="${C.eye}"/>` : `<path d="M${ex + 4} ${hy + 24} q8 2 16 0" stroke="${C.eye}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const head = `<g transform="rotate(${headTilt} 0 ${hy + 30})">
    <rect x="-9" y="${hy + 30}" width="20" height="22" fill="${C.skinD}"/>
    <circle cx="4" cy="${hy}" r="48" fill="${C.skin}"/>
    <path d="M-42 ${hy + 14} A48 48 0 0 0 50 ${hy + 14} Q40 ${hy + 34} 30 ${hy + 16} Q4 ${hy + 30} -22 ${hy + 16} Q-34 ${hy + 32} -42 ${hy + 14} Z" fill="${C.beard}" opacity=".85"/>
    ${eyeSvg}${brow}${mouthSvg}
    <path d="M-44 ${hy - 26} Q-42 ${hy - 76} 4 ${hy - 78} Q50 ${hy - 76} 52 ${hy - 26} Z" fill="${C.hat}"/>
    <rect x="-48" y="${hy - 38}" width="104" height="18" rx="8" fill="${C.hatD}"/>
    <circle cx="4" cy="${hy - 80}" r="9" fill="${C.hatD}"/>
    ${sweat ? `<path d="M${ex + 44} ${hy - 22} q-7 12 0 16 q7 -4 0 -16" fill="#bfe3f2" opacity="${sweat}"/>` : ''}
  </g>`;
  const upper = `<g transform="rotate(${lean} 0 ${hipY})">${backArm}${torso}${head}${frontArm}</g>`;
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">${legs}${upper}</g>`;
}

// ---------- ginger cat ----------
function cat(o = {}) {
  const { x = 0, y = 0, s = 1, f = 1, pose = 'sit', t = 0, look = 0, ears = 0 } = o;
  const c = '#d98a3c', d = '#b86d27', l = '#f4d7b0';
  let g = '';
  if (pose === 'sleep') {
    const br = 1 + Math.sin(t * 3) * .03;
    g = `<g transform="scale(1,${br})" style="transform-origin:0 0">
      <ellipse cx="0" cy="-26" rx="62" ry="28" fill="${c}"/>
      <path d="M-58 -16 Q-70 4 -20 2 Q30 4 54 -8" fill="none" stroke="${d}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="44" cy="-36" r="22" fill="${c}"/>
      <path d="M30 -52 l6 -18 l12 14 Z M50 -54 l10 -16 l6 18 Z" fill="${c}"/>
      <path d="M38 -36 q5 4 10 0 M52 -36 q5 4 10 0" stroke="#3a2a1c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M-30 -48 q6 10 0 20 M-6 -52 q6 10 0 22 M18 -50 q6 10 0 20" stroke="${d}" stroke-width="5" fill="none" opacity=".6"/>
    </g>`;
  } else if (pose === 'walk') {
    const a = Math.sin(t * 9) * 16;
    g = [[-34, a], [-22, -a], [26, -a], [38, a]].map(([lx, aa]) => line(lx, -36, lx + Math.sin(rad(aa)) * 34, -2, lx % 2 ? d : c, 10)).join('') +
      `<ellipse cx="0" cy="-48" rx="50" ry="22" fill="${c}"/>
      <path d="M-46 -52 Q-80 -70 -76 -104" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round"/>
      <circle cx="52" cy="-66" r="21" fill="${c}"/>
      <path d="M38 -80 l4 -20 l14 14 Z M56 -84 l10 -18 l6 20 Z" fill="${c}"/>
      <circle cx="58" cy="-68" r="3.4" fill="#2a1d12"/><circle cx="68" cy="-68" r="3.4" fill="#2a1d12"/>
      <path d="M-24 -66 q6 10 0 20 M0 -68 q6 10 0 22" stroke="${d}" stroke-width="5" fill="none" opacity=".6"/>`;
  } else { // sit
    g = `<path d="M-30 -6 Q-70 -4 -66 -40" fill="none" stroke="${d}" stroke-width="11" stroke-linecap="round"/>
      <path d="M-34 0 Q-40 -70 0 -84 Q36 -70 32 0 Z" fill="${c}"/>
      <path d="M-6 -60 Q0 -30 -4 0 L12 0 Q16 -30 10 -62 Z" fill="${l}" opacity=".8"/>
      <g transform="rotate(${look * 18} 0 -96)">
      <circle cx="0" cy="-100" r="26" fill="${c}"/>
      <path d="M-22 -112 l2 -${24 + ears * 6} l18 16 Z M22 -112 l-2 -${24 + ears * 6} l-18 16 Z" fill="${c}"/>
      <path d="M-18 -116 l2 -12 l8 8 Z M18 -116 l-2 -12 l-8 8 Z" fill="#e8a3a0" opacity=".6"/>
      <circle cx="${-9 + look * 6}" cy="-102" r="3.6" fill="#2a1d12"/><circle cx="${9 + look * 6}" cy="-102" r="3.6" fill="#2a1d12"/>
      <path d="M${-3 + look * 6} -93 l3 3 l3 -3" fill="#b5524a"/></g>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">${g}</g>`;
}

// ---------- zombie silhouette ----------
function zomb(o = {}) {
  const { x = 0, y = 0, s = 1, f = 1, t = 0, col = '#0b0f14', eyes = 1, back = false, armsUp = 1, ph = 0 } = o;
  const sw = Math.sin(t * 4 + ph) * 6, lg = Math.sin(t * 3 + ph) * 12;
  let g = line(-8, -120, -8 + lg * .6, 0, col, 24) + line(10, -120, 10 - lg * .6, 0, col, 24) +
    `<path d="M-34 -110 Q-40 -230 -10 -250 Q22 -252 32 -230 Q42 -170 34 -110 Z" fill="${col}"/>` +
    `<circle cx="${6 + sw * .3}" cy="-285" r="40" fill="${col}"/>`;
  if (!back) {
    g += limb(-10, -225, 70 * armsUp + sw, 10, 60, 58, col, 18) + limb(16, -228, 78 * armsUp - sw, 8, 60, 58, col, 18);
    if (eyes > 0) g += `<g filter="url(#zglow)" opacity="${eyes}"><circle cx="${18 + sw * .3}" cy="-290" r="5.5" fill="#e9f5d0"/><circle cx="${38 + sw * .3}" cy="-288" r="5.5" fill="#e9f5d0"/></g>`;
  } else {
    g += limb(-24, -225, -6 + sw * .5, 6, 60, 58, col, 18) + limb(28, -225, 6 - sw * .5, -6, 60, 58, col, 18);
  }
  return `<g transform="translate(${x},${y}) scale(${s * f},${s})">${g}</g>`;
}

// ---------- props ----------
function waves(y0, col, t, amp = 8, len = 140, speed = 40, w = 4, op = .5, x0 = -100, x1 = W + 100) {
  let d = '';
  for (let x = x0; x <= x1; x += 20) {
    const yy = y0 + Math.sin((x + t * speed) / len * Math.PI * 2) * amp;
    d += (x === x0 ? 'M' : 'L') + x.toFixed(1) + ' ' + yy.toFixed(1);
  }
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${op}" stroke-linecap="round"/>`;
}
function waveDashes(y0, y1, t, col = '#dce9e6', n = 26, seed = 1, op = .45) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const yy = lerp(y0, y1, rnd(i + seed));
    const sc = .4 + (yy - y0) / (y1 - y0 + 1);
    const xx = (rnd(i * 3 + seed) * (W + 300) + t * 18 * sc) % (W + 300) - 150;
    const ww = 30 + 60 * sc;
    g += `<path d="M${xx} ${yy} q${ww / 2} ${-6 * sc} ${ww} 0" stroke="${col}" stroke-width="${2 + 3 * sc}" fill="none" opacity="${op}" stroke-linecap="round"/>`;
  }
  return g;
}
function lighthouse(x, y, s = 1, lamp = 1, o = {}) {
  const { body = '#efe9dc', band = '#c1453b', shade = '#d5ccbb', dark = '#3a3f48', glass = '#f6d98a' } = o;
  // base at (x,y), height ~ 520*s
  const g = `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-70 0 L-46 -400 L46 -400 L70 0 Z" fill="${body}"/>
    <path d="M14 0 L10 -400 L46 -400 L70 0 Z" fill="${shade}" opacity=".7"/>
    <path d="M-65 -80 L-60 -150 L60 -150 L65 -80 Z" fill="${band}"/>
    <path d="M-55 -250 L-52 -310 L52 -310 L55 -250 Z" fill="${band}"/>
    <rect x="-16" y="-62" width="32" height="62" rx="14" fill="${dark}"/>
    <rect x="-10" y="-210" width="20" height="30" rx="8" fill="${dark}"/>
    <rect x="-66" y="-412" width="132" height="16" rx="4" fill="${dark}"/>
    ${[-62, -40, -18, 4, 26, 48].map(px => `<rect x="${px}" y="-438" width="5" height="26" fill="${dark}"/>`).join('')}
    <rect x="-66" y="-442" width="132" height="6" fill="${dark}"/>
    <rect x="-36" y="-490" width="72" height="80" fill="${dark}"/>
    <rect x="-30" y="-484" width="60" height="70" fill="${glass}" opacity="${.35 + .65 * lamp}"/>
    <line x1="0" y1="-484" x2="0" y2="-414" stroke="${dark}" stroke-width="4"/>
    <path d="M-44 -490 Q0 -545 44 -490 Z" fill="${band}"/>
    <circle cx="0" cy="-546" r="7" fill="${dark}"/><line x1="0" y1="-552" x2="0" y2="-580" stroke="${dark}" stroke-width="4"/>
  </g>`;
  return g;
}
function cottage(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-90" y="-110" width="180" height="110" fill="#ede6d6"/>
    <rect x="30" y="-110" width="60" height="110" fill="#d6cdb9"/>
    <path d="M-104 -106 L0 -176 L104 -106 Z" fill="#a8463c"/>
    <rect x="-60" y="-80" width="40" height="40" fill="#5c7480"/><rect x="-14" y="-62" width="28" height="62" fill="#6b5240"/>
    <rect x="44" y="-160" width="20" height="44" fill="#6e6a64"/>
  </g>`;
}
function rainTank(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-50" y="-120" width="100" height="120" rx="10" fill="#4f6b4f"/>
    <rect x="10" y="-120" width="40" height="120" rx="10" fill="#3f5a40"/>
    <ellipse cx="0" cy="-120" rx="50" ry="12" fill="#5f7c5e"/>
    ${[-90, -60, -30].map(yy => `<line x1="-50" y1="${yy}" x2="50" y2="${yy}" stroke="#3b543c" stroke-width="4"/>`).join('')}
  </g>`;
}
function boat(x, y, s = 1, o = {}) {
  const { hull = '#c95f3f', trim = '#ece4d4', motor = true } = o;
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${motor ? `<rect x="-215" y="-110" width="50" height="62" rx="10" fill="#33373e"/><rect x="-200" y="-56" width="16" height="96" fill="#2a2d33"/><path d="M-210 36 l40 0 l-10 14 l-24 0 Z" fill="#2a2d33"/><rect x="-212" y="-104" width="38" height="10" rx="4" fill="#d9473a"/>` : ''}
    <path d="M-180 -60 L190 -60 Q170 30 120 40 L-150 40 Q-176 20 -180 -60 Z" fill="${hull}"/>
    <path d="M-180 -60 L190 -60 L186 -40 L-178 -40 Z" fill="${trim}"/>
    <path d="M-160 10 L150 10" stroke="#a54a30" stroke-width="5" opacity=".6"/>
  </g>`;
}
function islandShape(cx, cy, s = 1, grass = '#7d9a5c') {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M-360 40 Q-330 -40 -240 -70 Q-150 -120 -40 -126 Q90 -140 200 -96 Q320 -60 360 30 Q300 80 0 86 Q-300 84 -360 40 Z" fill="#6c665b"/>
    <path d="M-360 40 Q-300 84 0 86 Q300 80 360 30 Q330 60 0 64 Q-310 62 -360 40 Z" fill="#4f4b44"/>
    <path d="M-250 -68 Q-150 -116 -40 -122 Q90 -134 196 -94 Q120 -86 30 -78 Q-120 -70 -250 -68 Z" fill="${grass}"/>
    <path d="M-120 -20 l40 -10 l30 14 M120 -30 l50 -6 M-260 10 l40 -8" stroke="#57524a" stroke-width="5" fill="none" opacity=".6"/>
  </g>`;
}
function gulls(t, items) {
  return items.map(([x, y, s, ph]) => {
    const fl = Math.sin(t * 7 + ph) * 8;
    const xx = x + t * 22;
    return `<path d="M${xx - 18 * s} ${y + fl * s * .3} Q${xx - 8 * s} ${y - 10 * s - fl * s * .4} ${xx} ${y} Q${xx + 8 * s} ${y - 10 * s - fl * s * .4} ${xx + 18 * s} ${y + fl * s * .3}" stroke="#2f3638" stroke-width="${3.4 * s}" fill="none" stroke-linecap="round"/>`;
  }).join('');
}
function smoke(x, y, t, h = 260, w = 40, col = '#3d3f44', n = 7, seed = 0) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const k = ((t * .25 + i / n + rnd(seed + i) * .1) % 1);
    const yy = y - k * h, xx = x + Math.sin(k * 3 + seed) * 18 + k * 50;
    g += `<circle cx="${xx}" cy="${yy}" r="${w * (.7 + k * 1.4)}" fill="${col}" opacity="${(1 - k) * .6}"/>`;
  }
  return `<g filter="url(#smk)">${g}</g>`;
}

// chips / HUD
function pill(x, y, text, o = {}) {
  const { bg = '#f4efe4', fg = '#25282c', size = 30, pad = 18, icon = null, iconCol = PAL.red, op = 1, sc = 1, anchor = 'middle', bold = 600, border = null } = o;
  const w = text.length * size * .52 + pad * 2 + (icon ? size * 1.1 : 0);
  const x0 = anchor === 'middle' ? -w / 2 : anchor === 'end' ? -w : 0;
  return `<g transform="translate(${x},${y}) scale(${sc})" opacity="${op}">
    <rect x="${x0}" y="${-size * .95}" width="${w}" height="${size * 1.9}" rx="${size * .95}" fill="${bg}" ${border ? `stroke="${border}" stroke-width="3"` : ''}/>
    ${icon ? `<circle cx="${x0 + pad + size * .4}" cy="0" r="${size * .32}" fill="${iconCol}"/>` : ''}
    <text x="${x0 + pad + (icon ? size * 1.1 : 0)}" y="${size * .36}" font-family="Oswald" font-weight="${bold}" font-size="${size}" fill="${fg}" letter-spacing="1">${text}</text>
  </g>`;
}
function timerChip(x, y, secs, op = 1) {
  const m = Math.floor(secs / 60), s = Math.floor(secs % 60);
  const txt = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `<g transform="translate(${x},${y})" opacity="${op}">
    <rect x="0" y="-36" width="250" height="72" rx="36" fill="#f3eee2" stroke="#2a2c30" stroke-width="3"/>
    <circle cx="38" cy="0" r="18" fill="none" stroke="${PAL.yel}" stroke-width="5"/><path d="M38 -9 L38 0 L45 5" stroke="#2a2c30" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="68" y="13" font-family="Oswald" font-weight="700" font-size="38" fill="#24262a">${txt}</text>
    <text x="180" y="11" font-family="Oswald" font-weight="500" font-size="22" fill="#6b6d70" letter-spacing="2">LEFT</text>
  </g>`;
}
