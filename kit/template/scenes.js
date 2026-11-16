// each scene: (t local seconds, d duration, T global seconds) -> {svg, cam}
const S = {};
const vign = (op = .55) => `<rect width="${W}" height="${H}" fill="url(#vig)" opacity="${op}"/>`;
const fgGrass = (t, col = '#2f3a2a', y = 1820, op = .9) => {
  let g = `<g filter="url(#fgblur)" opacity="${op}">`;
  for (let i = 0; i < 16; i++) {
    const x = rnd(i + 40) * W, h = 160 + rnd(i + 9) * 220, sw = Math.sin(t * 1.4 + i) * 10;
    g += `<path d="M${x - 14} ${H + 20} Q${x + sw} ${y - h * .5} ${x + sw * 2 + 10} ${y - h} Q${x + 8} ${y - h * .4} ${x + 22} ${H + 20} Z" fill="${col}"/>`;
  }
  return g + '</g>';
};
const timerAt = T => {
  const t0 = window.TIMER_T0 || 0;
  return Math.max(0, 3600 - 18 - (T - t0) * 37);
};

// 1 ---------------------------------------------------------------
S.intro_room = (t, d, T, opt = {}) => {
  const p = t / d;
  const spoon = Math.max(0, Math.sin(t * 2.6));
  const blink = (rnd(Math.floor(t * 2)) > .85 && (t * 2) % 1 < .25) ? 'closed' : 'open';
  const beep = p > .62 ? (Math.floor(t * 6) % 2) : 0;
  const svg = `
  <defs>${linGrad('wall', [[0, '#dccdb0'], [1, '#c9b691']])}${linGrad('psky', [[0, '#b7cbd0'], [1, '#eee5cc']])}
  ${radGrad('lampg', [[0, '#ffe7b0', .55], [1, '#ffe7b0', 0]])}</defs>
  <rect width="${W}" height="1190" fill="url(#wall)"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 150 - 20} 0 L${i * 150 - 20} 1190" stroke="#bda884" stroke-width="3" opacity=".5"/>`).join('')}
  <g>
    <clipPath id="port"><circle cx="760" cy="500" r="168"/></clipPath>
    <g clip-path="url(#port)">
      <rect x="560" y="300" width="400" height="230" fill="url(#psky)"/>
      <rect x="560" y="520" width="400" height="200" fill="#5b8994"/>
      <path d="M560 522 L660 512 L700 516 L760 508 L800 514 L960 518 L960 524 L560 524 Z" fill="#91a39c"/>
      ${waves(560, '#d6e6e3', t, 4, 90, 30, 3, .6, 560, 960)}${waves(610, '#d6e6e3', t + 2, 5, 110, 26, 3, .5, 560, 960)}
      ${gulls(t, [[640, 420, .8, 0], [700, 440, .6, 2]])}
    </g>
    <circle cx="760" cy="500" r="168" fill="none" stroke="#6d5a45" stroke-width="30"/>
    <circle cx="760" cy="500" r="186" fill="none" stroke="#86705a" stroke-width="8"/>
    ${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${760 + Math.cos(rad(a)) * 168}" cy="${500 + Math.sin(rad(a)) * 168}" r="7" fill="#4c3f31"/>`).join('')}
  </g>
  <rect x="120" y="220" width="190" height="14" fill="#7a5a3e"/>
  <rect x="140" y="160" width="40" height="60" rx="6" fill="#4f6d7a"/><rect x="196" y="176" width="34" height="44" rx="4" fill="#b2533c"/><rect x="244" y="150" width="30" height="70" rx="4" fill="#e1d6c0"/>
  <ellipse cx="560" cy="160" rx="300" ry="200" fill="url(#lampg)"/>
  <rect y="1190" width="${W}" height="${H - 1190}" fill="#6a4c35"/>
  ${[0, 1, 2, 3, 4].map(i => `<line x1="0" y1="${1230 + i * 70}" x2="${W}" y2="${1230 + i * 70}" stroke="#5a3f2b" stroke-width="4"/>`).join('')}
  ${cat({ x: 820, y: 1196, s: 1.35, pose: 'sleep', t })}
  <rect x="200" y="960" width="110" height="20" rx="6" fill="#7b5236"/><rect x="210" y="980" width="16" height="210" fill="#5f3f29"/><rect x="284" y="980" width="16" height="210" fill="#5f3f29"/>
  ${theo({ x: 250, y: 1192, s: 1.62, pose: 'sit', armF: [62 + spoon * 30, 70 + spoon * 50], armB: [40, 30], eyes: blink, look: .3, headTilt: 4 })}
  <rect x="430" y="900" width="700" height="26" rx="6" fill="#7b5236"/><rect x="430" y="926" width="700" height="14" fill="#5f3f29"/>
  <rect x="470" y="940" width="20" height="250" fill="#5f3f29"/>
  <path d="M470 868 Q470 902 520 902 Q570 902 570 868 Z" fill="#3f6a78"/><ellipse cx="520" cy="868" rx="50" ry="10" fill="#c7863f"/>
  ${[0, 1, 2].map(i => { const k = (t * .6 + i / 3) % 1; return `<path d="M${505 + i * 14} ${860 - k * 90} q10 -15 0 -30" stroke="#fff" stroke-width="5" fill="none" opacity="${(1 - k) * .5}" stroke-linecap="round"/>`; }).join('')}
  <rect x="800" y="830" width="130" height="72" rx="10" fill="#3c4148"/><circle cx="836" cy="866" r="20" fill="#2a2e33"/><rect x="866" y="850" width="50" height="10" rx="4" fill="#9aa0a6"/>
  <line x1="912" y1="830" x2="940" y2="760" stroke="#2a2e33" stroke-width="5"/>
  <circle cx="900" cy="884" r="7" fill="${beep ? '#ff4b3a' : '#5a2a25'}"/>
  ${beep ? `<path d="M950 770 q14 14 0 28 M966 758 q24 26 0 52" stroke="#ff4b3a" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}
  <g filter="url(#fgblur)">
    <rect x="-40" y="1560" width="1160" height="420" fill="#4a3424"/>
    <ellipse cx="160" cy="1560" rx="130" ry="60" fill="#c99a52"/>
    <rect x="760" y="1400" width="90" height="170" rx="20" fill="#e8e2d5"/><rect x="880" y="1450" width="70" height="120" rx="10" fill="#d6a23d"/>
  </g>
  ${vign()}`;
  return { svg, cam: 1.0 + .06 * p };
};

// 2 ---------------------------------------------------------------
S.phone_alert = (t, d, T) => {
  const p = t / d;
  const shake = t < .5 ? Math.sin(t * 90) * 7 * (1 - t / .5) : 0;
  const bg = S.intro_room(t + 4, 4, T).svg;
  const svg = `
  <g filter="url(#bgblur)">${bg}</g>
  <rect width="${W}" height="${H}" fill="#1b1410" opacity=".35"/>
  <g transform="translate(${540 + shake},${700 + (1 - easeOut(seg(t, 0, .35))) * 260}) rotate(${-7 + shake * .3})">
    <rect x="-225" y="-440" width="450" height="880" rx="56" fill="#17181b"/>
    <rect x="-205" y="-420" width="410" height="840" rx="42" fill="#c4302a"/>
    <rect x="-205" y="-420" width="410" height="840" rx="42" fill="url(#scr)"/>
    <rect x="-55" y="-404" width="110" height="26" rx="13" fill="#17181b"/>
    <g transform="translate(0,-250) scale(${1 + Math.sin(t * 8) * .04})">
      <path d="M0 -80 L80 60 L-80 60 Z" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"/>
      <rect x="-7" y="-28" width="14" height="52" rx="6" fill="#fff"/><circle cx="0" cy="40" r="8" fill="#fff"/>
    </g>
    <text x="0" y="-120" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="34" fill="#ffd9d4" letter-spacing="3">EMERGENCY ALERT</text>
    <text x="0" y="-20" text-anchor="middle" font-family="Anton" font-size="74" fill="#fff">OUTBREAK</text>
    <text x="0" y="62" text-anchor="middle" font-family="Anton" font-size="74" fill="#fff">CONFIRMED</text>
    <rect x="-150" y="110" width="300" height="3" fill="#ffb0a6"/>
    <text x="0" y="170" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="40" fill="#fff">STAY INDOORS</text>
    <text x="0" y="222" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="30" fill="#ffd9d4" letter-spacing="2">AVOID ALL ROADS &amp; HARBORS</text>
    <rect x="-70" y="380" width="140" height="8" rx="4" fill="#fff" opacity=".6"/>
  </g>
  <g transform="translate(${shake},${(1 - easeOut(seg(t, 0, .35))) * 260})">
    <path d="M1180 1500 L830 1100 L700 1180 L980 1700 Z" fill="${PAL.coat}"/>
    <path d="M1180 1500 L980 1700 L900 1560 L1100 1380 Z" fill="${PAL.coatD}" opacity=".6"/>
    <ellipse cx="760" cy="1100" rx="80" ry="64" fill="${PAL.skin}" transform="rotate(-38 760 1100)"/>
    ${[0, 1, 2].map(i => `<rect x="${706 - i * 4}" y="${1000 + i * 40}" width="70" height="30" rx="15" fill="${PAL.skin}" transform="rotate(-10 740 1040)"/>`).join('')}
  </g>
  <g filter="url(#fgblur)">${theo({ x: 120, y: 1990, s: 2.6, f: 1, eyes: 'wide', look: 1 })}</g>
  ${vign(.7)}`;
  return { svg: `<defs>${linGrad('scr', [[0, '#d63a31'], [1, '#9e1f1b']])}</defs>` + svg, cam: 1 + .04 * p };
};

// 3 ---------------------------------------------------------------
S.island_wide = (t, d, T) => {
  const p = t / d;
  const lbl = (i, x, y, lx, ly, txt) => {
    const k = back(seg(t, d * .32 + i * .3, d * .32 + i * .3 + .35));
    return k <= 0 ? '' : `<line x1="${lx}" y1="${ly}" x2="${lerp(lx, x, k)}" y2="${lerp(ly, y, k)}" stroke="#f4efe4" stroke-width="4" opacity=".9"/><circle cx="${lx}" cy="${ly}" r="9" fill="#f4efe4"/>` +
      pill(x, y, txt, { sc: k, size: 30, icon: true, iconCol: i === 0 ? '#4c8ea3' : i === 1 ? PAL.yel : i === 2 ? '#5e9bd0' : PAL.red });
  };
  const ti = easeOut(seg(t, .1, .5));
  const svg = `
  <defs>${linGrad('sky3', [[0, '#a9c2c9'], [.75, '#e9e2cb']])}${linGrad('sea3', [[0, '#6c98a0'], [1, '#2f5a68']])}</defs>
  <rect width="${W}" height="800" fill="url(#sky3)"/>
  <ellipse cx="300" cy="300" rx="260" ry="50" fill="#fff" opacity=".35"/><ellipse cx="820" cy="420" rx="200" ry="36" fill="#fff" opacity=".3"/>
  <path d="M0 786 L120 770 L240 778 L380 764 L520 776 L700 760 L860 772 L1080 762 L1080 800 L0 800 Z" fill="#8fa49b"/>
  ${[760, 830, 905].map((x, i) => smoke(x, 770, t + i, 200, 14, '#5b5d60', 6, i * 5)).join('')}
  <rect y="796" width="${W}" height="${H - 796}" fill="url(#sea3)"/>
  ${waveDashes(820, 1900, t, '#dce9e6', 40, 3)}
  <g transform="translate(0,${-30 + 30 * (1 - p)})">
  <ellipse cx="540" cy="1110" rx="420" ry="70" fill="#25505d" opacity=".5"/>
  ${islandShape(540, 1060, 1.0)}
  ${rainTank(300, 950, .7)}
  ${cottage(400, 960, .85)}
  ${lighthouse(660, 960, .9, .3)}
  <rect x="170" y="1040" width="210" height="16" fill="#7a5a3e"/>${[190, 250, 310, 370].map(x => `<rect x="${x}" y="1052" width="10" height="50" fill="#5a3f2b"/>`).join('')}
  <g transform="translate(110,${1080 + Math.sin(t * 2) * 4})">${boat(0, 0, .42)}</g>
  </g>
  ${gulls(t, [[200, 600, 1, 0], [260, 640, .8, 1.2], [700, 560, .7, 2]])}
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <rect x="${540 - 230}" y="120" width="460" height="80" rx="6" fill="#b8322b"/>
    <text x="540" y="178" text-anchor="middle" font-family="Anton" font-size="52" fill="#fff" letter-spacing="2">ZOMBIE OUTBREAK</text>
    <text x="540" y="320" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">DAY 1</text>
    ${pill(540, 372, '6:12 PM', { bg: PAL.yel, size: 28 })}
  </g>
  ${lbl(0, 230, 1430, 240, 1210, 'OPEN SEA')}
  ${lbl(1, 860, 560, 670, 530, 'HIGH GROUND')}
  ${lbl(2, 200, 800, 300, 880, 'RAIN WATER')}
  ${lbl(3, 860, 1430, 720, 1150, 'ONE WAY IN')}
  ${vign(.45)}`;
  return { svg, cam: 1.02 + .05 * p };
};

// 4 ---------------------------------------------------------------
S.dock_walk = (t, d, T) => {
  const p = t / d;
  const tx = lerp(240, 560, p);
  const svg = `
  <defs>${linGrad('sky4', [[0, '#a3bcc4'], [1, '#e6dcc4']])}${linGrad('sea4', [[0, '#5f8c95'], [1, '#2c5562']])}</defs>
  <rect width="${W}" height="900" fill="url(#sky4)"/>
  <path d="M0 892 L160 870 L300 880 L460 860 L620 874 L820 856 L1080 870 L1080 900 L0 900 Z" fill="#8c9e96"/>
  ${[600, 700, 860].map((x, i) => smoke(x, 866, t + i * .7, 300, 20, '#4c4f53', 7, i * 3)).join('')}
  <rect y="896" width="${W}" height="${H - 896}" fill="url(#sea4)"/>
  ${waveDashes(910, 1900, t, '#d8e7e4', 38, 7)}
  <g transform="translate(900,${1270 + Math.sin(t * 2.2) * 6}) rotate(${Math.sin(t * 1.7) * 2})">${boat(0, 0, .95)}</g>
  <rect x="-40" y="1180" width="1000" height="34" fill="#8a6a4a"/><rect x="-40" y="1214" width="1000" height="14" fill="#5f4530"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => `<line x1="${i * 70}" y1="1180" x2="${i * 70}" y2="1214" stroke="#6e5238" stroke-width="3"/>`).join('')}
  ${[60, 340, 620, 900].map(x => `<rect x="${x}" y="1214" width="26" height="240" fill="#4e3a28"/>`).join('')}
  ${waves(1300, '#d8e7e4', t, 6, 120, 40, 4, .5)}
  ${cat({ x: tx - 190, y: 1184, s: .95, pose: 'walk', t })}
  ${theo({ x: tx, y: 1184, s: 1.55, pose: 'walk', walk: t * 7, armF: [Math.sin(t * 7) * 28, 14], armB: [-Math.sin(t * 7) * 28, 12], look: .6 })}
  <g filter="url(#fgblur)">
    <rect x="-60" y="1500" width="190" height="520" fill="#3f2f22"/>
    <ellipse cx="900" cy="1880" rx="300" ry="120" fill="#4a4740"/><ellipse cx="150" cy="1940" rx="320" ry="110" fill="#3c3a35"/>
  </g>
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 5 ---------------------------------------------------------------
S.boat_motor = (t, d, T) => {
  const p = t / d;
  const pull = Math.max(0, Math.sin(t * 5));
  const z = 1 + easeIO(seg(p, .45, 1)) * .35;
  const svg = `
  <defs>${linGrad('sky5', [[0, '#9fb3bd'], [1, '#e8cfa6']])}${linGrad('sea5', [[0, '#557f8a'], [1, '#26495a']])}</defs>
  <g transform="translate(760 820) scale(${z}) translate(-760 -820)">
  <rect width="${W}" height="880" fill="url(#sky5)"/>
  <path d="M380 860 L460 820 L520 832 L560 800 L600 812 L620 780 L640 790 L660 770 L690 800 L740 790 L780 760 L800 770 L830 740 L860 780 L920 790 L980 810 L1080 830 L1080 880 L380 880 Z" fill="#5f6964"/>
  ${[[640, 760], [760, 740], [880, 770]].map(([x, y], i) => smoke(x, y, t + i, 520, 34, '#2f3136', 9, i * 11)).join('')}
  ${[[640, 770], [770, 756]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${10 + Math.sin(t * 9) * 3}" fill="#ff8c3a" opacity=".8"/>`).join('')}
  <rect y="876" width="${W}" height="${H - 876}" fill="url(#sea5)"/>
  ${waveDashes(890, 1900, t, '#d2e3e2', 40, 13)}
  </g>
  ${theo({ x: 330, y: 1250 + Math.sin(t * 2) * 6, s: 1.5, f: -1, pose: 'stand', lean: 22, armF: [70 + pull * 60, -40 - pull * 30], armB: [30, 10], look: .2, eyes: 'open' })}
  <g transform="translate(560,${1290 + Math.sin(t * 2) * 6}) rotate(${Math.sin(t * 1.6) * 1.5}) scale(1.7)">
    ${boat(0, 0, 1)}
  </g>
  ${line(222, 1130, lerp(222, 280, pull), lerp(1130, 1030, pull), '#1d1d1d', 3)}
  ${waves(1380, '#d2e3e2', t, 7, 130, 50, 5, .6)}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 6 ---------------------------------------------------------------
S.harbor_map = (t, d, T) => {
  const p = t / d;
  const hx = 420, hy = 760;
  const roads = [[-60, 200], [200, -60], [620, -60], [1140, 160], [-60, 620], [-60, 1060], [900, -60]];
  let rd = '', dots = '';
  roads.forEach(([x, y], i) => {
    rd += `<line x1="${x}" y1="${y}" x2="${hx}" y2="${hy}" stroke="#3c4549" stroke-width="16" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${hx}" y2="${hy}" stroke="#6c7478" stroke-width="3" stroke-dasharray="18 16"/>`;
    for (let j = 0; j < 14; j++) {
      const k = (j / 14 + t * (.16 + rnd(i) * .08)) % 1;
      dots += `<circle cx="${lerp(x, hx, k) + (rnd(i * 31 + j) - .5) * 16}" cy="${lerp(y, hy, k) + (rnd(i * 17 + j) - .5) * 16}" r="6" fill="#efe6d2" opacity="${.4 + .6 * k}"/>`;
    }
  });
  const ring = k => `<circle cx="${hx}" cy="${hy}" r="${60 + k * 190}" fill="none" stroke="#e0473a" stroke-width="${6 * (1 - k)}" opacity="${1 - k}"/>`;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0f1b25"/>
  ${waveDashes(1000, 1900, t, '#2c4456', 30, 5, .6)}
  <path d="M-20 -20 L1100 -20 L1100 380 Q900 420 800 560 Q700 700 560 820 Q420 960 300 1120 Q200 1260 -20 1300 Z" fill="#1b2924"/>
  <path d="M1100 380 Q900 420 800 560 Q700 700 560 820 Q420 960 300 1120 Q200 1260 -20 1300" fill="none" stroke="#2f4a44" stroke-width="10"/>
  ${[...Array(60)].map((_, i) => `<rect x="${rnd(i) * 700}" y="${rnd(i + 99) * 900}" width="${10 + rnd(i + 5) * 20}" height="${10 + rnd(i + 7) * 20}" fill="#24342f"/>`).join('')}
  ${rd}${dots}
  ${ring((t * .8) % 1)}${ring((t * .8 + .5) % 1)}
  <circle cx="${hx}" cy="${hy}" r="70" fill="#e0473a" opacity=".25"/><circle cx="${hx}" cy="${hy}" r="18" fill="#e0473a"/>
  ${pill(hx, hy - 120, 'HARBOR', { bg: '#c8352c', fg: '#fff', size: 34, bold: 700 })}
  <line x1="${hx + 40}" y1="${hy + 40}" x2="780" y2="1460" stroke="#7d8a8f" stroke-width="3" stroke-dasharray="10 12" opacity="${seg(p, .3, .6)}"/>
  <circle cx="800" cy="1500" r="38" fill="#4f6b4a"/><circle cx="800" cy="1500" r="12" fill="#f6d98a"/>
  ${pill(800, 1590, "THEO'S ISLAND", { bg: '#3d6b45', fg: '#e8f2e6', size: 28, bold: 700, op: seg(p, .15, .4) })}
  ${vign(.6)}`;
  return { svg, cam: 1.08 - .06 * p };
};

// 7 ---------------------------------------------------------------
S.sunset_timer = (t, d, T) => {
  const p = t / d;
  const sy = lerp(900, 975, p);
  const svg = `
  <defs>${linGrad('sky7', [[0, '#4d5b82'], [.55, '#e3956a'], [1, '#f6cf8c']])}${linGrad('sea7', [[0, '#5a5f78'], [1, '#22293b']])}
  <clipPath id="above"><rect width="${W}" height="1000"/></clipPath></defs>
  <rect width="${W}" height="1000" fill="url(#sky7)"/>
  <circle cx="680" cy="${sy}" r="120" fill="#ffe2a3" clip-path="url(#above)"/>
  <circle cx="680" cy="${sy}" r="200" fill="#ffd38a" opacity=".25" clip-path="url(#above)"/>
  <ellipse cx="300" cy="420" rx="260" ry="26" fill="#f3b285" opacity=".5"/><ellipse cx="860" cy="560" rx="200" ry="20" fill="#f3b285" opacity=".45"/>
  <rect y="1000" width="${W}" height="${H - 1000}" fill="url(#sea7)"/>
  ${[...Array(14)].map((_, i) => `<rect x="${680 - (60 - i * 3) + Math.sin(t * 2 + i) * 14}" y="${1010 + i * 34}" width="${(120 - i * 6)}" height="7" rx="3" fill="#ffd38a" opacity="${.7 - i * .04}"/>`).join('')}
  ${waveDashes(1010, 1900, t, '#8a8aa0', 30, 21, .4)}
  <path d="M-40 1140 Q60 1040 220 1050 Q360 1060 420 1140 L420 1300 L-40 1300 Z" fill="#20232c"/>
  ${lighthouse(210, 1070, 1.05, .2, { body: '#2b2f3a', band: '#2b2f3a', shade: '#262a33', dark: '#1d2028', glass: '#ffe2a3' })}
  ${theo({ x: 236, y: 610, s: .38, f: 1, look: 1 })}
  ${timerChip(60, 120, timerAt(T), seg(t, 0, .25))}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 8 ---------------------------------------------------------------
S.rain_tank = (t, d, T) => {
  const p = t / d;
  const fill = clamp(p * 1.1);
  const svg = `
  <defs>${linGrad('sky8', [[0, '#d1a07e'], [1, '#e9c9a0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sky8)"/>
  <rect x="-20" y="260" width="620" height="980" fill="#e3d9c6"/><rect x="420" y="260" width="180" height="980" fill="#cfc3ac"/>
  <rect x="80" y="420" width="200" height="220" fill="#56707c"/><rect x="80" y="420" width="200" height="220" fill="none" stroke="#7b5c40" stroke-width="16"/><line x1="180" y1="420" x2="180" y2="640" stroke="#7b5c40" stroke-width="10"/>
  <path d="M-40 270 L640 270 L600 220 L0 220 Z" fill="#a8463c"/>
  <path d="M600 300 L700 300 L700 560" stroke="#6f6a63" stroke-width="18" fill="none"/>
  <g transform="translate(790,1240)">
    <rect x="-190" y="-720" width="380" height="720" rx="24" fill="#4e6b4e"/>
    <rect x="60" y="-720" width="130" height="720" rx="24" fill="#3d573f"/>
    <ellipse cx="0" cy="-720" rx="190" ry="34" fill="#617e60"/>
    ${[-560, -400, -240, -80].map(y => `<line x1="-190" y1="${y}" x2="190" y2="${y}" stroke="#3a523b" stroke-width="10"/>`).join('')}
    <rect x="-226" y="-150" width="50" height="26" rx="6" fill="#8b9096"/><rect x="-236" y="-170" width="18" height="22" rx="4" fill="#d9473a"/>
  </g>
  <rect y="1236" width="${W}" height="${H - 1236}" fill="#7a7266"/>
  ${[...Array(12)].map((_, i) => `<ellipse cx="${rnd(i) * W}" cy="${1300 + rnd(i + 3) * 500}" rx="${40 + rnd(i + 6) * 50}" ry="${14 + rnd(i + 2) * 10}" fill="#6a6358"/>`).join('')}
  <rect x="${568 - 3 + Math.sin(t * 30) * 1.5}" y="1116" width="10" height="${1182 - 1116}" fill="#7fc4e6" opacity=".85"/>
  <g transform="translate(560,1240)">
    <rect x="-46" y="-120" width="92" height="120" rx="14" fill="#2f6fa8"/><rect x="-46" y="${-120 * fill}" width="92" height="${120 * fill}" rx="14" fill="#3f86c4"/>
    <rect x="-16" y="-142" width="32" height="26" rx="6" fill="#26557f"/>
  </g>
  ${[[150, 1250], [260, 1250]].map(([x, y]) => `<g transform="translate(${x},${y})"><rect x="-46" y="-120" width="92" height="120" rx="14" fill="#3f86c4"/><rect x="-16" y="-142" width="32" height="26" rx="6" fill="#26557f"/></g>`).join('')}
  ${theo({ x: 420, y: 1240, s: 1.55, pose: 'kneel', lean: 18, armF: [96, -20], armB: [70, 0], look: .5 })}
  ${timerChip(60, 120, timerAt(T))}
  ${pill(800, 120, 'WATER: TANK ONLY', { bg: '#f3eee2', size: 30, icon: true, iconCol: '#3f86c4', border: '#2a2c30' })}
  ${fgGrass(t, '#4f4a40', 1880, .8)}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 9 ---------------------------------------------------------------
S.tank_gauge = (t, d, T) => {
  const p = t / d;
  const lv = easeOut(seg(t, 0, .8));
  const gal = Math.round(lv * 200);
  const pop = back(seg(t, d * .55, d * .55 + .35));
  const top = 1240 - 680 * lv * .9;
  let wave = `M-200 ${top}`;
  for (let x = -200; x <= 200; x += 20) wave += ` L${x} ${top + Math.sin(x / 40 + t * 5) * 8}`;
  const svg = `
  <rect width="${W}" height="${H}" fill="#ece4d3"/>
  ${[...Array(28)].map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${H}" stroke="#d9cfba" stroke-width="2"/>`).join('')}
  ${[...Array(50)].map((_, i) => `<line x1="0" y1="${i * 40}" x2="${W}" y2="${i * 40}" stroke="#d9cfba" stroke-width="2"/>`).join('')}
  <g transform="translate(540,0)">
    <clipPath id="tankc"><rect x="-200" y="540" width="400" height="700" rx="40"/></clipPath>
    <rect x="-200" y="540" width="400" height="700" rx="40" fill="#f8f4ea"/>
    <g clip-path="url(#tankc)"><path d="${wave} L200 1300 L-200 1300 Z" fill="#4c95cf"/><path d="${wave} L200 1300 L-200 1300 Z" fill="#7cb6e2" transform="translate(0,14)" opacity=".5"/></g>
    <rect x="-200" y="540" width="400" height="700" rx="40" fill="none" stroke="#2b2f35" stroke-width="10"/>
    ${[0, 1, 2, 3, 4].map(i => `<line x1="200" y1="${1240 - i * 153}" x2="236" y2="${1240 - i * 153}" stroke="#2b2f35" stroke-width="6"/><text x="250" y="${1250 - i * 153}" font-family="Oswald" font-size="30" fill="#5d6166">${i * 50}</text>`).join('')}
  </g>
  <g transform="translate(540,330)">
    <rect x="-250" y="-110" width="500" height="200" rx="26" fill="#fff" stroke="#2a2c30" stroke-width="5"/>
    <text x="0" y="-48" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="30" fill="#6b6d70" letter-spacing="3">WATER STORED</text>
    <path d="M-150 ${-2} q-26 36 0 50 q26 -14 0 -50" fill="#3f86c4" transform="translate(-30,0)"/>
    <text x="10" y="58" text-anchor="middle" font-family="Anton" font-size="104" fill="#22252a">${gal}<tspan font-family="Oswald" font-weight="700" font-size="44" fill="#3f86c4" dx="10">GAL</tspan></text>
  </g>
  <g transform="translate(540,1430) scale(${pop})" opacity="${clamp(pop)}">
    <rect x="-230" y="-60" width="460" height="120" rx="60" fill="${PAL.yel}" stroke="#2a2c30" stroke-width="5"/>
    <text x="0" y="22" text-anchor="middle" font-family="Anton" font-size="62" fill="#22252a">≈ 60 DAYS</text>
  </g>
  ${pill(540, 1560, '1 PERSON · ~3 GAL / DAY', { bg: 'transparent', fg: '#5d6166', size: 30, op: clamp(pop) })}
  ${timerChip(60, 120, timerAt(T))}
  ${vign(.25)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 10 --------------------------------------------------------------
S.lamp_room = (t, d, T) => {
  const p = t / d;
  const gl = .75 + Math.sin(t * 6) * .1;
  const svg = `
  <defs>${linGrad('dusk10', [[0, '#1d2742'], [1, '#5a4d6e']])}${radGrad('lens', [[0, '#fff3c4'], [.45, '#f6c45a'], [1, '#b8741f']])}${radGrad('halo', [[0, '#ffd77a', .7], [1, '#ffd77a', 0]])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dusk10)"/>
  ${waveDashes(1500, 1900, t, '#7d7090', 20, 2, .3)}
  ${[0, 1, 2, 3, 4].map(i => `<rect x="${i * 270 - 20}" y="0" width="22" height="${H}" fill="#151820"/>`).join('')}
  <rect y="1380" width="${W}" height="40" fill="#151820"/><rect y="1420" width="${W}" height="${H - 1420}" fill="#232731"/>
  <ellipse cx="540" cy="820" rx="560" ry="560" fill="url(#halo)" opacity="${gl}"/>
  <g transform="translate(540,820)">
    <path d="M-230 -360 Q-290 0 -230 360 L230 360 Q290 0 230 -360 Z" fill="url(#lens)"/>
    ${[...Array(13)].map((_, i) => { const y = -330 + i * 55; const w = 230 + 60 * Math.cos(y / 360 * 1.3); return `<rect x="${-w}" y="${y}" width="${w * 2}" height="10" rx="5" fill="#a86a1a" opacity=".45"/>`; }).join('')}
    <ellipse cx="0" cy="0" rx="90" ry="90" fill="#fff9e0" opacity="${gl}"/>
    <rect x="-250" y="360" width="500" height="70" fill="#3b3f48"/><rect x="-200" y="430" width="400" height="140" fill="#2c3038"/>
    <path d="M-240 -360 L240 -360 L200 -420 L-200 -420 Z" fill="#3b3f48"/>
  </g>
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .12 * easeOut(p) };
};

// 11 --------------------------------------------------------------
S.beam_rings = (t, d, T) => {
  const p = t / d;
  const ix = 540, iy = 1560;
  const ang = -90 + Math.sin(t * .9) * 40;
  const rings = [[260, '5 MI', .12], [560, '10 MI', .32], [1000, '20 MI', .58]];
  let rg = '';
  rings.forEach(([r, lab, at], i) => {
    const k = easeOut(seg(p, at, at + .18));
    if (k <= 0) return;
    rg += `<circle cx="${ix}" cy="${iy}" r="${r * k}" fill="none" stroke="#f2c230" stroke-width="5" stroke-dasharray="16 14" opacity=".85"/>`;
    rg += pill(ix + Math.cos(rad(-60)) * r * k, iy + Math.sin(rad(-60)) * r * k, lab, { bg: '#f2c230', size: 30, sc: k, bold: 700 });
  });
  const hit = seg(p, .72, .85);
  const svg = `
  <defs>${radGrad('beam', [[0, '#fff0b8', .85], [1, '#fff0b8', 0]], 0, .5, 1)}</defs>
  <rect width="${W}" height="${H}" fill="#0b1520"/>
  ${waveDashes(600, 1900, t, '#1f3446', 40, 31, .7)}
  <path d="M-20 -20 L1100 -20 L1100 520 Q900 600 700 560 Q500 520 300 600 Q120 660 -20 600 Z" fill="#121d19"/>
  <path d="M1100 520 Q900 600 700 560 Q500 520 300 600 Q120 660 -20 600" fill="none" stroke="#e0473a" stroke-width="${8 * hit}" opacity="${hit}"/>
  ${[...Array(30)].map((_, i) => `<circle cx="${rnd(i + 4) * W}" cy="${100 + rnd(i + 8) * 420}" r="${3 + rnd(i) * 3}" fill="#f6d98a" opacity="${.3 + rnd(i + 2) * .5}"/>`).join('')}
  <g transform="translate(${ix},${iy}) rotate(${ang})">
    <path d="M0 0 L1700 -260 L1700 260 Z" fill="url(#beam)" opacity=".75"/>
  </g>
  ${rg}
  <ellipse cx="${ix}" cy="${iy}" rx="90" ry="60" fill="#3c4a3a"/>
  <circle cx="${ix}" cy="${iy}" r="16" fill="#fff4c4" filter="url(#zglow)"/>
  ${pill(ix, iy + 110, 'YOU', { bg: '#f4efe4', size: 28, bold: 700 })}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 12 --------------------------------------------------------------
S.shore_heads = (t, d, T) => {
  const p = t / d;
  const flash = Math.pow(Math.max(0, Math.sin(t * 3.2 + 1.2)), 4);
  const z = [[620, 1420, .9, 1.3], [930, 1460, 1.05, 3], [380, 1640, 1.45, 2.1], [130, 1980, 2.1, 0]];
  const svg = `
  <defs>${linGrad('sky12', [[0, '#0a1019'], [1, '#1d2a3b']])}${radGrad('fl', [[0, '#fff3c4', .9], [1, '#fff3c4', 0]])}</defs>
  <rect width="${W}" height="1000" fill="url(#sky12)"/>
  ${[...Array(40)].map((_, i) => `<circle cx="${rnd(i) * W}" cy="${rnd(i + 50) * 700}" r="${1 + rnd(i + 9) * 2}" fill="#dfe6f0" opacity="${.3 + rnd(i + 3) * .5}"/>`).join('')}
  <rect y="996" width="${W}" height="200" fill="#121c28"/>
  ${waveDashes(1000, 1180, t, '#33465a', 20, 9, .7)}
  <rect x="756" y="968" width="8" height="34" fill="#0a0e14"/>
  <circle cx="760" cy="966" r="${6 + flash * 10}" fill="#fff3c4"/>
  <ellipse cx="760" cy="966" rx="${40 + flash * 420}" ry="${10 + flash * 24}" fill="url(#fl)" opacity="${.3 + flash * .7}"/>
  <path d="M-20 1180 Q300 1150 600 1170 Q900 1190 1100 1160 L1100 ${H} L-20 ${H} Z" fill="#232b38"/>
  <path d="M-20 1180 Q300 1150 600 1170 Q900 1190 1100 1160 L1100 1240 Q600 1220 -20 1250 Z" fill="#3a4658" opacity=".6"/>
  <path d="M-20 900 Q20 700 60 900 Q90 600 140 900 L140 1300 L-20 1300 Z" fill="#06080c"/>
  ${z.map(([x, y, s, ph]) => zomb({ x: x + Math.sin(t + ph) * 8 + (p > .35 ? (p - .35) * 30 * Math.sin(ph) : 0), y: y - (p > .4 ? (p - .4) * 60 * s : 0), s, t, ph, back: true, col: '#07090d' })).join('')}
  ${z.map(([x, y, s]) => `<path d="M${x - 30 * s} ${y - 250 * s} q${30 * s} ${-60 * s} ${60 * s} 0" stroke="#fff3c4" stroke-width="${4 * s}" fill="none" opacity="${flash * .8}"/>`).join('')}
  ${vign(.75)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 13 --------------------------------------------------------------
S.breaker = (t, d, T) => {
  const p = t / d;
  const k = easeIO(seg(t, d * .4, d * .55));
  const dark = seg(t, d * .52, d * .7);
  const leverA = lerp(-35, 35, k);
  let sparks = '';
  if (t > d * .5 && t < d * .75) {
    for (let i = 0; i < 14; i++) {
      const a = rnd(i) * Math.PI * 2, r = (t - d * .5) * (400 + rnd(i + 3) * 400);
      sparks += `<circle cx="${540 + Math.cos(a) * r}" cy="${880 + Math.sin(a) * r}" r="${5 * (1 - seg(t, d * .5, d * .75))}" fill="#ffd36b"/>`;
    }
  }
  const svg = `
  <defs>${radGrad('warm', [[0, '#ffdf9a', .65], [1, '#ffdf9a', 0]])}</defs>
  <rect width="${W}" height="${H}" fill="#5a5f66"/>
  ${[...Array(10)].map((_, i) => `<line x1="0" y1="${i * 210}" x2="${W}" y2="${i * 210}" stroke="#4d5258" stroke-width="6"/>`).join('')}
  <ellipse cx="540" cy="260" rx="700" ry="520" fill="url(#warm)" opacity="${1 - dark}"/>
  <g transform="translate(540,880)">
    <rect x="-300" y="-420" width="600" height="840" rx="26" fill="#8b9196"/>
    <rect x="-280" y="-400" width="560" height="800" rx="18" fill="#9ca2a8"/>
    <rect x="-120" y="-330" width="240" height="64" rx="8" fill="#e9e3d6"/><text x="0" y="-284" text-anchor="middle" font-family="Anton" font-size="46" fill="#2a2c30">LAMP</text>
    <rect x="-70" y="-200" width="140" height="400" rx="20" fill="#3a3e45"/>
    <g transform="rotate(${leverA} 0 0)">
      <rect x="-22" y="-210" width="44" height="210" rx="12" fill="#c9cdd1"/>
      <rect x="-60" y="-250" width="120" height="60" rx="26" fill="#d9473a"/>
    </g>
    <circle cx="0" cy="0" r="40" fill="#2b2e33"/>
    <circle cx="-200" cy="300" r="22" fill="${k < .5 ? '#55d36b' : '#3a3e45'}"/><circle cx="200" cy="300" r="22" fill="${k > .5 ? '#e0473a' : '#3a3e45'}"/>
    <text x="-200" y="356" text-anchor="middle" font-family="Oswald" font-size="26" fill="#3a3e45">ON</text><text x="200" y="356" text-anchor="middle" font-family="Oswald" font-size="26" fill="#3a3e45">OFF</text>
  </g>
  ${(() => { const a = rad(leverA); const hx = 540 + Math.sin(a) * 220, hy = 880 - Math.cos(a) * 220;
    return `<path d="M1200 ${hy + 240} L${hx + 80} ${hy + 30} L${hx + 40} ${hy - 50} L1200 ${hy + 60} Z" fill="${PAL.coat}"/>
    <ellipse cx="${hx + 30}" cy="${hy}" rx="64" ry="54" fill="${PAL.skin}"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${hx - 50}" y="${hy - 50 + i * 26}" width="70" height="24" rx="12" fill="${PAL.skin}"/>`).join('')}`; })()}
  ${sparks}
  <rect width="${W}" height="${H}" fill="#08101c" opacity="${dark * .62}"/>
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 14 --------------------------------------------------------------
S.notebook = (t, d, T, blur = false) => {
  const p = t / d;
  const w1 = seg(t, .1, d * .5), w2 = seg(t, d * .5, d * .95);
  const flick = 1 + Math.sin(t * 13) * .05 + Math.sin(t * 7.3) * .04;
  const penX = w2 > 0 && w2 < 1 ? 330 + w2 * 380 : 330 + w1 * 520, penY = w2 > 0 ? 960 : 860;
  const svg = `
  <defs>${radGrad('cand', [[0, '#ffcf7a', .55], [1, '#ffcf7a', 0]])}<clipPath id="w1c"><rect x="300" y="780" width="${600 * w1}" height="120"/></clipPath><clipPath id="w2c"><rect x="300" y="900" width="${520 * w2}" height="100"/></clipPath></defs>
  <rect width="${W}" height="${H}" fill="#6e4a30"/>
  ${[...Array(14)].map((_, i) => `<path d="M0 ${i * 150 + 40} Q540 ${i * 150 + 20 + Math.sin(i) * 30} ${W} ${i * 150 + 50}" stroke="#5e3f28" stroke-width="5" fill="none"/>`).join('')}
  <g transform="rotate(-4 540 1000)">
    <rect x="230" y="620" width="640" height="840" rx="10" fill="#f6f1e4"/>
    ${[...Array(15)].map((_, i) => `<line x1="250" y1="${760 + i * 46}" x2="850" y2="${760 + i * 46}" stroke="#bcd0de" stroke-width="3"/>`).join('')}
    <line x1="320" y1="640" x2="320" y2="1440" stroke="#e5a6a0" stroke-width="3"/>
    ${[...Array(12)].map((_, i) => `<circle cx="${270 + i * 50}" cy="620" r="13" fill="none" stroke="#6d6f73" stroke-width="6"/>`).join('')}
    <text x="340" y="870" font-family="Caveat" font-weight="700" font-size="84" fill="#25303d" clip-path="url(#w1c)">Day 1 — Supplies</text>
    <text x="340" y="972" font-family="Caveat" font-weight="600" font-size="64" fill="#3a4a5e" clip-path="url(#w2c)">Water: 200 gal ✓</text>
  </g>
  <g transform="translate(${penX},${penY}) rotate(35)"><rect x="-10" y="-300" width="22" height="300" rx="8" fill="#1f2328"/><path d="M-10 0 L12 0 L1 30 Z" fill="#c9a24a"/></g>
  <g transform="translate(860,450)"><circle r="96" fill="#e9e3d7"/><circle r="74" fill="#5a3a22"/><path d="M96 -20 q50 0 50 30 q0 30 -50 30" fill="none" stroke="#e9e3d7" stroke-width="18"/></g>
  <g transform="translate(200,420)"><circle r="70" fill="#efe6d0"/><circle r="10" fill="#2a2a2a"/><ellipse cx="0" cy="-6" rx="${14 * flick}" ry="${24 * flick}" fill="#ffcf5a"/></g>
  <ellipse cx="200" cy="420" rx="${700 * flick}" ry="${700 * flick}" fill="url(#cand)"/>
  <rect width="${W}" height="${H}" fill="#0c0a10" opacity=".25"/>
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 15 --------------------------------------------------------------
S.supplies = (t, d, T) => {
  const p = t / d;
  const rows = [['WATER', '200', 'GAL', 8, '#3f86c4', 0], ['FOOD', '~26', 'DAYS', 6, '#6b5a48', 0], ['FUEL', '11', 'GAL', 4, '#c9a24a', 0],
    ['FISHING GEAR', 'OK', '', 7, '#4f8a6a', 0], ['MEDICAL', 'LOW', '', 1, '#d9473a', 1]];
  let rs = '';
  rows.forEach(([lab, val, unit, n, col, bad], i) => {
    const k = back(seg(t, .15 + i * .2, .15 + i * .2 + .3));
    if (k <= 0) return;
    const y = -200 + i * 128;
    rs += `<g transform="translate(${(1 - k) * 60},${y})" opacity="${clamp(k)}">
      <rect x="-330" y="-50" width="660" height="104" rx="14" fill="${bad ? '#fbe9e6' : '#f7f4ec'}" stroke="${bad ? '#d9473a' : '#d8d1c0'}" stroke-width="3"/>
      <circle cx="-282" cy="2" r="22" fill="${col}"/>
      <text x="-244" y="-6" font-family="Oswald" font-weight="700" font-size="30" fill="${bad ? '#b8322b' : '#2a2c30'}" letter-spacing="1">${lab}</text>
      ${[...Array(10)].map((_, j) => `<rect x="${-244 + j * 26}" y="12" width="20" height="18" rx="4" fill="${j < n ? col : '#ddd6c6'}"/>`).join('')}
      <text x="${unit ? 180 : 210}" y="20" text-anchor="end" font-family="Anton" font-size="${bad ? 50 : 52}" fill="${bad ? '#d9473a' : '#22252a'}">${val}</text>
      ${unit ? `<text x="190" y="20" font-family="Oswald" font-weight="600" font-size="24" fill="#6b6d70">${unit}</text>` : ''}
      ${bad ? `<circle cx="282" cy="2" r="${22 + Math.sin(t * 9) * 3}" fill="#d9473a"/><text x="282" y="14" text-anchor="middle" font-family="Anton" font-size="34" fill="#fff">!</text>`
            : `<circle cx="282" cy="2" r="22" fill="#4f8a6a"/><path d="M270 2 l8 9 l16 -18" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}
    </g>`;
  });
  const svg = `
  <g filter="url(#bgblur)">${S.notebook(d, d, T).svg}</g>
  <rect width="${W}" height="${H}" fill="#120c08" opacity=".25"/>
  <g transform="translate(540,${760 + (1 - easeOut(seg(t, 0, .3))) * 300}) rotate(-2)">
    <rect x="-372" y="-370" width="744" height="760" rx="26" fill="#000" opacity=".3" transform="translate(10,18)"/>
    <rect x="-372" y="-370" width="744" height="760" rx="26" fill="#fffdf6"/>
    <rect x="-80" y="-392" width="160" height="44" fill="#e9dcb5" opacity=".9" transform="rotate(3)"/>
    <text x="0" y="-292" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="46" fill="#22252a" letter-spacing="2">SUPPLIES <tspan fill="${PAL.red}">—</tspan> DAY 1</text>
    ${rs}
  </g>
  ${vign(.55)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 16 --------------------------------------------------------------
S.gallery_dusk = (t, d, T) => {
  const p = t / d;
  const turn = easeIO(seg(p, .35, .6));
  const svg = `
  <defs>${linGrad('sky16', [[0, '#27304f'], [.7, '#8a6f8c'], [1, '#d99a84']])}${linGrad('sea16', [[0, '#3a4560'], [1, '#1a2032']])}</defs>
  <rect width="${W}" height="1100" fill="url(#sky16)"/>
  <rect y="1100" width="${W}" height="${H - 1100}" fill="url(#sea16)"/>
  <path d="M0 1092 L200 1080 L420 1088 L700 1076 L1080 1086 L1080 1102 L0 1102 Z" fill="#3b3d50"/>
  ${waveDashes(1110, 1900, t, '#5a6584', 30, 41, .5)}
  <rect x="-20" y="1180" width="${W + 40}" height="${H}" fill="#2a2e38"/>
  <rect x="-20" y="1180" width="${W + 40}" height="18" fill="#1e2129"/>
  ${theo({ x: 360, y: 1190, s: 1.75, look: .4 + turn * .8, armF: [40, 80], armB: [10, 10], mug: true, eyes: p > .55 ? 'wide' : 'open' })}
  <rect x="-20" y="960" width="${W + 40}" height="16" rx="6" fill="#1e2129"/>
  ${[...Array(10)].map((_, i) => `<rect x="${i * 120}" y="960" width="12" height="230" fill="#1e2129"/>`).join('')}
  ${cat({ x: 760, y: 962, s: 1.05, pose: 'sit', look: turn, ears: turn })}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .07 * p };
};

// 17 --------------------------------------------------------------
S.low_tide = (t, d, T) => {
  const p = t / d;
  const k = easeIO(seg(p, .15, .85));
  const path = 'M540 1520 C420 1340 720 1160 580 960 S360 640 520 420';
  const tickY = Math.sin(t * 3) * 6;
  const svg = `
  <defs>${linGrad('sea17', [[0, '#3b6274'], [1, '#2b4d5e']])}
  <mask id="tidem"><rect width="${W}" height="${H}" fill="#fff"/><path d="${path}" stroke="#000" stroke-width="${10 + 190 * k}" fill="none" stroke-linecap="round"/></mask></defs>
  <rect width="${W}" height="${H}" fill="#c9b58d"/>
  <path d="${path}" stroke="#8d8270" stroke-width="${70 * clamp(k * 1.5)}" fill="none" stroke-linecap="round"/>
  ${[...Array(36)].map((_, i) => { const L = i / 35; return ''; }).join('')}
  <g id="stones"></g>
  <rect width="${W}" height="${H}" fill="url(#sea17)" mask="url(#tidem)"/>
  ${waveDashes(500, 1900, t, '#9fc0cc', 34, 51, .45)}
  <path d="M-20 -20 L1100 -20 L1100 420 Q800 470 540 420 Q260 380 -20 450 Z" fill="#6f8a5e"/>
  <path d="M1100 420 Q800 470 540 420 Q260 380 -20 450" stroke="#c9b58d" stroke-width="22" fill="none"/>
  ${[...Array(18)].map((_, i) => `<circle cx="${rnd(i + 70) * W}" cy="${60 + rnd(i + 80) * 300}" r="${18 + rnd(i) * 22}" fill="#56704a"/>`).join('')}
  <ellipse cx="540" cy="1600" rx="230" ry="150" fill="#6c665b"/><ellipse cx="530" cy="1580" rx="160" ry="100" fill="#7d9a5c"/>
  <circle cx="560" cy="1570" r="30" fill="#efe9dc"/><circle cx="560" cy="1570" r="14" fill="#c1453b"/>
  ${pill(540, 1790, "THEO'S ISLAND", { bg: '#3d6b45', fg: '#e8f2e6', size: 28, bold: 700 })}
  ${pill(540, 290, 'MAINLAND', { bg: '#2a2c30', fg: '#f4efe4', size: 28, bold: 700 })}
  <g transform="translate(60,640)" opacity="${seg(p, .05, .2)}">
    <rect x="0" y="-60" width="330" height="120" rx="20" fill="#f3eee2" stroke="#2a2c30" stroke-width="4"/>
    <path d="M44 ${-22 + tickY} L44 ${22 + tickY} M28 ${8 + tickY} L44 ${24 + tickY} L60 ${8 + tickY}" stroke="${PAL.red}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="84" y="-6" font-family="Oswald" font-weight="700" font-size="40" fill="#22252a">LOW TIDE</text>
    <text x="84" y="36" font-family="Oswald" font-weight="500" font-size="28" fill="#6b6d70">TONIGHT · 9:14 PM</text>
  </g>
  ${k > .7 ? pill(800, 1000, 'WALKABLE', { bg: PAL.red, fg: '#fff', size: 30, bold: 700, sc: back(seg(p, .7, .8)) }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 18 --------------------------------------------------------------
S.causeway_night = (t, d, T) => {
  const p = t / d;
  const cut = d * .6;
  if (t < cut) {
    const q = t / cut;
    const figs = [[540, .18, 0], [500, .26, 1.4], [585, .34, 2.6], [520, .46, .7]];
    const svg = `
    <defs>${linGrad('sky18', [[0, '#05080e'], [1, '#18233a']])}${radGrad('moon', [[0, '#dfe7f2', .5], [1, '#dfe7f2', 0]])}</defs>
    <rect width="${W}" height="900" fill="url(#sky18)"/>
    <circle cx="830" cy="290" r="70" fill="#e8edf2"/><circle cx="830" cy="290" r="260" fill="url(#moon)"/>
    <rect y="896" width="${W}" height="${H}" fill="#0c1320"/>
    ${[...Array(16)].map((_, i) => `<rect x="${830 - 80 + i * 10 - Math.sin(t * 2 + i) * 20}" y="${910 + i * 60}" width="${60 + i * 12}" height="6" rx="3" fill="#cfd8e4" opacity="${.5 - i * .025}"/>`).join('')}
    <path d="M510 900 L570 900 L980 ${H} L100 ${H} Z" fill="#2a2f38"/>
    ${[...Array(18)].map((_, i) => { const y = 900 + Math.pow(i / 18, 2) * 1020; const wv = lerp(30, 440, (y - 900) / 1020); return `<line x1="${540 - wv}" y1="${y}" x2="${540 + wv}" y2="${y}" stroke="#1d2129" stroke-width="${2 + i * .4}"/>`; }).join('')}
    <rect y="860" width="${W}" height="120" fill="#5d6a80" opacity=".18"/>
    ${figs.map(([x, s0, ph]) => { const s = s0 + q * .12; const y = 900 + (s - .1) * 900; return zomb({ x: lerp(540, x, 1) + Math.sin(t * 2 + ph) * 10 * s, y, s, t, ph, col: '#06080c', eyes: 1 }); }).join('')}
    ${vign(.8)}`;
    return { svg, cam: 1.0 + .08 * q };
  }
  const q = (t - cut) / (d - cut);
  const svg = `
  <defs>${linGrad('in18', [[0, '#0e1524'], [1, '#1c2536']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#in18)"/>
  <rect x="640" y="320" width="300" height="420" rx="150" fill="#0a0f19"/><rect x="660" y="340" width="260" height="380" rx="130" fill="#26344d"/>
  ${[0, 1, 2].map(i => zomb({ x: 720 + i * 70, y: 700, s: .14, t, ph: i, col: '#05070b', eyes: 1 })).join('')}
  ${theo({ x: 360, y: 1950, s: 3.3, look: 1, eyes: 'wide', mouth: 'o', sweat: q })}
  <rect width="${W}" height="${H}" fill="#2a4a8a" opacity=".18"/>
  ${vign(.85)}`;
  return { svg, cam: 1.0 + .1 * q };
};

// 19 --------------------------------------------------------------
S.end_card = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${lerp(110, 245, a)},${lerp(110, 245, a)},${lerp(110, 245, a)})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 2</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">LOW TIDE</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
