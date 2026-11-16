// ---------- shared helpers for Season 2 Parts 4+ ----------
if (typeof recolor === "undefined") { var recolor = function (o, pal) { const save = { ...PAL }; Object.assign(PAL, pal); const g = theo(o); Object.assign(PAL, save); return g; }; }
function nell(o = {}) {
  const g = recolor(o, { coat: '#2b3a55', coatD: '#1f2b40', hat: '#efece6', hatD: '#1d1f22', beard: '#ead2b8', skin: '#ead2b8', skinD: '#d4b99c', pants: '#3a3f48' });
  return g;
}
function flareGun(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-6" y="-14" width="58" height="22" rx="8" fill="#e8742a"/><rect x="-6" y="-2" width="18" height="34" rx="6" fill="#c95f20"/></g>`;
}
// top-down: island bottom-left, wreck top-right, sand path between. water: 0 = path fully out, 1 = covered
function sandbarMap(t, water = 0, o = {}) {
  const { walkers = '' } = o;
  const w = lerp(90, 0, water);
  return `<rect width="${W}" height="${H}" fill="#3f6f8f"/>${waveDashes(0, 1900, t, '#dce9f0', 40, 551, .3)}
  <path d="M260 1500 C 420 1200, 520 1000, 760 520" stroke="#d9c592" stroke-width="${w * 2}" fill="none" stroke-linecap="round" opacity="${w > 2 ? 1 : 0}"/>
  <path d="M260 1500 C 420 1200, 520 1000, 760 520" stroke="#cbb27a" stroke-width="${w * .6}" fill="none" stroke-linecap="round" stroke-dasharray="4 26" opacity="${w > 2 ? .6 : 0}"/>
  <circle cx="220" cy="1600" r="260" fill="#cdb98a"/><circle cx="220" cy="1600" r="210" fill="#5f7d48"/>
  <circle cx="230" cy="1580" r="44" fill="#e9e2d3"/><circle cx="230" cy="1580" r="20" fill="#4f6b8a"/>
  <g transform="translate(800,470) rotate(-25)"><rect x="-200" y="-60" width="400" height="120" rx="40" fill="#6e4636"/><rect x="-120" y="-40" width="200" height="80" fill="#8a7a6a"/><rect x="-60" y="-26" width="60" height="52" fill="#5a4a3e"/></g>
  ${walkers}`;
}
function wreckClose(t, o = {}) {
  const { kind = 'day', hole = 1 } = o;
  return `<defs>${skyG('wc_' + kind, kind)}</defs><rect width="${W}" height="${H}" fill="url(#wc_${kind})"/>
  <g transform="rotate(-6 540 900)">
    <path d="M-100 1250 L-60 520 L1160 560 L1180 1250 Z" fill="#6e4636"/>
    <rect x="-80" y="520" width="1260" height="40" fill="#4a2e24"/>
    <rect x="-80" y="300" width="900" height="230" fill="#8a7a6a"/>
    ${[...Array(9)].map((_, i) => `<rect x="${-40 + i * 96}" y="350" width="66" height="74" rx="10" fill="#1d1f22"/>`).join('')}
    ${[...Array(6)].map((_, i) => `<circle cx="${80 + i * 180}" cy="760" r="30" fill="#2a1e18" stroke="#4a2e24" stroke-width="8"/>`).join('')}
    ${[[100, 640, 140], [700, 900, 100], [400, 1050, 80]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .5}" fill="#a0583e" opacity=".6"/>`).join('')}
    ${hole ? `<path d="M560 1000 L600 880 L700 860 L760 930 L740 1060 L620 1090 Z" fill="#0a0c10"/>` : ''}
    <text x="200" y="680" font-family="Anton" font-size="70" fill="#d8cfc0" opacity=".55" letter-spacing="6">ST. AGNES</text>
  </g>
  <rect y="1180" width="${W}" height="${H}" fill="${kind === 'night' ? '#0f1d34' : '#cdb98a'}"/>`;
}
function wreckHall(t, o = {}) {
  const { beam = 1, water = .4, beamX = 540 } = o;
  let doors = '';
  for (let i = 0; i < 4; i++) {
    const k = i / 4, sc = 1 - k * .7;
    const lx = lerp(120, 440, k), rx = lerp(960, 640, k), y0 = lerp(380, 760, k), h = lerp(900, 300, k);
    doors += `<rect x="${lx - 40 * sc}" y="${y0 + 60 * sc}" width="${70 * sc}" height="${h * .7}" fill="#3a2e26"/><rect x="${rx - 30 * sc}" y="${y0 + 60 * sc}" width="${70 * sc}" height="${h * .7}" fill="#3a2e26"/>`;
  }
  return `<rect width="${W}" height="${H}" fill="#14110f"/>
  <path d="M0 0 L440 760 L640 760 L1080 0 Z" fill="#1c1814"/><path d="M0 1920 L440 1060 L640 1060 L1080 1920 Z" fill="#1a1612"/>
  <path d="M0 0 L440 760 L440 1060 L0 1920 Z" fill="#221d18"/><path d="M1080 0 L640 760 L640 1060 L1080 1920 Z" fill="#1e1a16"/>
  ${doors}
  <rect x="440" y="760" width="200" height="300" fill="#08090b"/>
  <path d="M0 ${1920 - water * 900} L440 ${1060 - water * 200} L640 ${1060 - water * 200} L1080 ${1920 - water * 900} L1080 1920 L0 1920 Z" fill="#0d1a24" opacity=".9"/>
  ${waveDashes(1920 - water * 860, 1900, t, '#6a8aa4', 14, 561, .25)}
  ${beam ? `<path d="M${beamX} 1900 L${beamX - 260} 700 L${beamX + 260} 700 Z" fill="#fff3c8" opacity=".12"/><ellipse cx="${beamX}" cy="820" rx="200" ry="120" fill="#fff3c8" opacity=".1"/>` : ''}`;
}
function bridgeRoom(t, o = {}) {
  const { kind = 'day', bar = 1, sea = 'bar' } = o;
  const n = kind === 'night';
  return `<defs>${skyG('br_' + kind, kind)}</defs><rect width="${W}" height="${H}" fill="#3a3430"/>
  <rect x="60" y="260" width="960" height="460" fill="url(#br_${kind})"/>
  <rect x="60" y="560" width="960" height="160" fill="${n ? '#0f1d34' : '#4f7898'}"/>
  ${bar > 0 ? `<path d="M60 ${700 - bar * 30} Q500 ${640 - bar * 20} 1020 ${690 - bar * 30} L1020 720 L60 720 Z" fill="#d9c592" opacity="${bar}"/>` : ''}
  ${n ? '' : `<circle cx="180" cy="660" r="30" fill="#e9e2d3"/>`}
  ${[60, 380, 700, 1000].map(x => `<rect x="${x}" y="260" width="20" height="460" fill="#2a2420"/>`).join('')}
  <rect x="40" y="240" width="1000" height="30" fill="#2a2420"/><rect x="40" y="710" width="1000" height="40" fill="#2a2420"/>
  <rect y="750" width="${W}" height="${H}" fill="#4a3e34"/>
  <rect x="60" y="900" width="960" height="60" fill="#5a4a3e"/>
  <g transform="translate(540,1000)"><circle r="120" fill="none" stroke="#7a5a3a" stroke-width="22"/>${[...Array(8)].map((_, i) => `<line x1="0" y1="0" x2="${Math.cos(i * .785) * 150}" y2="${Math.sin(i * .785) * 150}" stroke="#7a5a3a" stroke-width="14" stroke-linecap="round"/>`).join('')}<circle r="22" fill="#5a3e23"/></g>
  ${[0, 1, 2].map(i => `<g transform="translate(${830 + i * 70},1150)"><rect x="-34" y="-130" width="68" height="130" rx="10" fill="${['#c8352c', '#2f5a63', '#c8352c'][i]}"/><rect x="-34" y="-100" width="68" height="10" fill="#1d1f22" opacity=".4"/></g>`).join('')}
  <g transform="translate(200,880)"><rect x="-50" y="-80" width="100" height="80" rx="16" fill="#2b2f36"/><circle cx="0" cy="-40" r="30" fill="#fff6d0" opacity=".85"/></g>`;
}
function stairsDown(t, o = {}) {
  const { water = .5, rise = 0 } = o;
  let steps = '';
  for (let i = 0; i < 9; i++) steps += `<rect x="${200 + i * 20}" y="${600 + i * 110}" width="${680 - i * 40}" height="34" fill="${i % 2 ? '#3a2e26' : '#433529'}"/>`;
  const wy = lerp(1600, 1100, water);
  return `<rect width="${W}" height="${H}" fill="#100d0b"/>${steps}
  <rect x="140" y="400" width="30" height="1300" fill="#5a4a3e"/><rect x="910" y="400" width="30" height="1300" fill="#5a4a3e"/>
  <rect y="${wy}" width="${W}" height="${H}" fill="#0b1720" opacity=".95"/>${waveDashes(wy + 10, 1900, t, '#4a6a84', 10, 571, .3)}
  ${rise > 0 ? `<g opacity="${clamp(rise * 2)}"><circle cx="540" cy="${wy + 60 - rise * 220}" r="56" fill="#0b0f14"/><circle cx="526" cy="${wy + 50 - rise * 220}" r="8" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="556" cy="${wy + 52 - rise * 220}" r="8" fill="#e9f5d0" filter="url(#zglow)"/>
    <path d="M440 ${wy - rise * 160} l-30 -60 M460 ${wy - rise * 160} l-10 -70" stroke="#0b0f14" stroke-width="20" stroke-linecap="round"/></g>` : ''}`;
}
function timerPill(x, y, secs, o = {}) {
  const m = Math.floor(secs / 60), s = Math.floor(secs % 60);
  return pill(x, y, `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`, { bg: secs < 900 ? PAL.red : '#25282c', fg: '#fff', size: 44, bold: 700, ...o });
}
