// ---------- Part 4 scenes ----------
const morningSky = (id) => linGrad(id, [[0, '#8fb0cf'], [.6, '#f2c9a0'], [1, '#fbe3bd']]);

// 1 ---------------------------------------------------------------
S.recap4 = (t, d, T) => {
  const p = t / d;
  const r = S.sunrise(t + 1, d + 1, T);
  const ti = easeOut(seg(t, 0, .5));
  const svg = r.svg + `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="380" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 4</text></g>` +
    (t > capL('recap4', 2, T, t) ? `<g transform="translate(860,1520) scale(${back(seg(t, capL('recap4', 2, T, t), capL('recap4', 2, T, t) + .35))})">
      <circle r="46" fill="#e0473a" stroke="#fff" stroke-width="6"/><text y="20" text-anchor="middle" font-family="Anton" font-size="56" fill="#fff">?</text></g>` : '');
  return { svg, cam: 1.02 + .05 * p };
};

// 2 ---------------------------------------------------------------
S.listen = (t, d, T) => {
  const p = t / d;
  const r = S.cat_stairs(t, d, T);
  const sc = seg(t, capL('listen', 1, T, t), d);
  let marks = '';
  if (sc > 0) for (let i = 0; i < 4; i++) {
    const k = (t * .9 + i / 4) % 1;
    marks += `<ellipse cx="540" cy="900" rx="${80 + k * 380}" ry="${80 + k * 380}" fill="none" stroke="#e0473a" stroke-width="${5 * (1 - k)}" opacity="${(1 - k) * .7 * Math.min(1, sc * 3)}"/>`;
  }
  const svg = r.svg + marks +
    (t > capL('listen', 2, T, t) ? `<text x="540" y="620" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="90" fill="#e8e0d0" opacity="${.5 + Math.sin(t * 12) * .2}" transform="rotate(-6 540 620)">scrrtch… scrrtch…</text>` : '');
  return { svg, cam: r.cam };
};

// 3 ---------------------------------------------------------------
S.how = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, .2, .55));
  const svg = `<g transform="translate(540 1075) scale(${1 + easeIO(p) * .5}) translate(-540 -1075)">${doorRoom(t, { bolt: 1, dark: .2 })}</g>` +
    pill(540, 1460, 'STILL BOLTED ✓', { bg: '#4f8a6a', fg: '#fff', size: 34, bold: 700, sc: k }) +
    (t > capL('how', 1, T, t) ? `<text x="540" y="560" text-anchor="middle" font-family="Anton" font-size="220" fill="#e0473a" opacity=".9" transform="translate(540 480) scale(${back(seg(t, capL('how', 1, T, t), capL('how', 1, T, t) + .3))}) translate(-540 -480)">?</text>` : '') + vign(.7);
  return { svg, cam: 1.0 };
};

// shared: base of the tower outside, morning
function towerBase(t, o = {}) {
  const { flap = 1, theoO = null, shake = 0, marks = true, label = null } = o;
  const sx = shake ? (rnd(Math.floor(t * 60)) - .5) * shake : 0;
  const fa = lerp(0, 105, flap); // hatch flap opening angle
  return `
  <defs>${morningSky('msky')}</defs>
  <g transform="translate(${sx},0)">
  <rect width="${W}" height="${H}" fill="url(#msky)"/>
  <rect y="1150" width="${W}" height="200" fill="#6f8fae"/>
  ${waveDashes(1160, 1340, t, '#dce9f0', 16, 91, .5)}
  <path d="M180 -40 L900 -40 L960 1500 L120 1500 Z" fill="#ede6d6"/>
  <path d="M640 -40 L900 -40 L960 1500 L700 1500 Z" fill="#d7cebb"/>
  <path d="M150 700 L930 700 L940 900 L140 900 Z" fill="#c1453b"/>
  <path d="M700 700 L930 700 L940 900 L705 900 Z" fill="#a43b32"/>
  <rect y="1490" width="${W}" height="${H - 1490}" fill="#6c665b"/>
  ${[...Array(12)].map((_, i) => `<ellipse cx="${rnd(i + 3) * W}" cy="${1540 + rnd(i + 8) * 360}" rx="${50 + rnd(i) * 70}" ry="${18 + rnd(i + 1) * 14}" fill="#5c574e"/>`).join('')}
  <rect x="580" y="1250" width="220" height="200" fill="#121417"/>
  <rect x="566" y="1236" width="248" height="228" fill="none" stroke="#3a3d43" stroke-width="16"/>
  <g transform="translate(580,1250) skewY(${-fa * .08}) scale(${Math.cos(fa * Math.PI / 180) * .9 + .1},1)" >
    <rect x="0" y="0" width="220" height="200" fill="#5e6168"/>
    ${[40, 100, 160].map(y => `<rect x="10" y="${y}" width="200" height="10" fill="#4a4d53"/>`).join('')}
    <rect x="180" y="86" width="22" height="34" rx="6" fill="#2b2b2f"/>
  </g>
  ${marks && flap > .5 ? `<path d="M610 1470 l-30 60 M650 1470 l-20 70 M700 1470 l-10 60" stroke="#3a2a20" stroke-width="7" stroke-linecap="round" opacity=".7"/>` : ''}
  ${theoO ? theo(theoO) : ''}
  </g>
  ${label ? label : ''}`;
}

// 4 ---------------------------------------------------------------
S.hatch = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, capL('hatch', 1, T, t), capL('hatch', 1, T, t) + .35));
  const k2 = back(seg(t, capL('hatch', 3, T, t), capL('hatch', 3, T, t) + .35));
  const creak = Math.sin(t * 2.2) * .06;
  const svg = `<g filter="url(#sepia4)">${towerBase(t, { flap: .92 + creak })}</g>` +
    `<defs><filter id="sepia4"><feColorMatrix type="matrix" values=".9 .1 0 0 0  .1 .85 .05 0 0  .05 .1 .7 0 0  0 0 0 1 0"/></filter></defs>` +
    (k > 0 ? `<line x1="690" y1="1230" x2="760" y2="1080" stroke="#fff" stroke-width="5"/>` + pill(780, 1050, 'OIL HATCH', { sc: k, size: 34, bold: 700, icon: true, iconCol: PAL.yel }) : '') +
    (k2 > 0 ? pill(690, 1590, 'OPEN', { sc: k2, size: 40, bold: 700, bg: '#c8352c', fg: '#fff' }) : '') +
    `<rect width="${W}" height="${H}" fill="#0a1830" opacity=".18"/>` + vign(.6);
  return { svg, cam: 1.0 + .07 * p };
};

// 5 ---------------------------------------------------------------
S.climbing = (t, d, T) => {
  const p = t / d;
  const r = S.stairs(t * .6, d, T);
  const zs = lerp(.12, .5, easeIO(seg(t, capL('climbing', 1, T, t) - .8, d)));
  const step = Math.floor(lerp(12, 64, easeIO(p)));
  const svg = `<g opacity=".8">${r.svg}</g><rect width="${W}" height="${H}" fill="#06080e" opacity=".5"/>` +
    zomb({ x: 540, y: 900 + 330 * zs, s: zs, t: t * 1.5, col: '#020305', eyes: 1, armsUp: .6 }) +
    `<g transform="translate(540,300)"><rect x="-230" y="-70" width="460" height="140" rx="22" fill="#fff" stroke="#2a2c30" stroke-width="5"/>
     <text x="0" y="34" text-anchor="middle" font-family="Anton" font-size="84" fill="#22252a">STEP ${step}<tspan font-family="Oswald" font-weight="700" font-size="44" fill="#e0473a" dx="14">▲</tspan></text></g>` +
    vign(.8);
  return { svg, cam: 1.0 + .1 * p };
};

// 6 ---------------------------------------------------------------
S.gallery = (t, d, T) => {
  const p = t / d;
  const out = easeOut(seg(t, 0, 1.4));
  const k = back(seg(t, capL('gallery', 3, T, t), capL('gallery', 3, T, t) + .35));
  const svg = `
  <defs>${morningSky('gsky')}${linGrad('gsea', [[0, '#7b9cba'], [1, '#3e5d7c']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#gsky)"/>
  <rect y="760" width="${W}" height="${H}" fill="url(#gsea)"/>
  ${waveDashes(780, 1900, t, '#d8e7ef', 40, 95, .45)}
  <g transform="translate(560,1750)">
    <path d="M-260 60 Q-200 -40 -40 -60 Q140 -70 260 20 Q120 90 -260 60 Z" fill="#6c665b"/><path d="M-200 -30 Q-60 -64 120 -54 Q40 -30 -200 -30 Z" fill="#7d9a5c"/>
    <path d="M-60 10 l-6 -40 l12 0 Z" fill="#ece4d4"/>
  </g>
  <path d="M-40 1040 L320 1040 L300 ${H} L-40 ${H} Z" fill="#ede6d6"/><path d="M200 1040 L320 1040 L300 ${H} L190 ${H} Z" fill="#d7cebb"/>
  <rect x="-40" y="1020" width="${W + 80}" height="30" fill="#2a2e36"/>
  ${theo({ x: lerp(140, 520, out), y: 1022, s: 1.6, pose: out < 1 ? 'walk' : 'stand', walk: out < 1 ? t * 8 : null, look: out < 1 ? .5 : .2, eyes: p > .5 ? 'wide' : 'open', headTilt: p > .5 ? 10 : 0, armF: [30, 20], armB: [-10, 10] })}
  <rect x="-40" y="820" width="${W + 80}" height="14" rx="6" fill="#2a2e36"/>
  ${[...Array(10)].map((_, i) => `<rect x="${i * 120 + 20}" y="820" width="10" height="210" fill="#2a2e36"/>`).join('')}
  ${k > 0 ? `<g opacity="${clamp(k)}"><line x1="900" y1="1060" x2="900" y2="1680" stroke="#fff" stroke-width="6" stroke-dasharray="16 12"/><path d="M880 1660 L900 1700 L920 1660 Z" fill="#fff"/></g>` + pill(900, 1360, '30 M', { sc: k, bg: PAL.yel, size: 40, bold: 700 }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 7/8 -- climbing down the outside ----------------------------------
function ladderScene(t, o = {}) {
  const { scroll = 0, theoY = 900, face = 0, wide = false, flash = 0 } = o;
  const rungs = [...Array(30)].map((_, i) => { const y = ((i * 90 - scroll) % 2700 + 2700) % 2700 - 300; return `<rect x="430" y="${y}" width="160" height="12" rx="5" fill="#3a3d43"/>`; }).join('');
  const wy = 760 - scroll * .0 + (o.winY || 0);
  const climb = Math.sin(t * 6);
  return `
  <defs>${morningSky('lsky')}</defs>
  <rect width="${W}" height="${H}" fill="url(#lsky)"/>
  <rect y="${1400 - scroll * .1}" width="${W}" height="${H}" fill="#6f8fae"/>
  <path d="M60 -40 L1020 -40 L1020 ${H + 40} L60 ${H + 40} Z" fill="#ede6d6"/>
  <path d="M760 -40 L1020 -40 L1020 ${H + 40} L760 ${H + 40} Z" fill="#d7cebb"/>
  ${[0, 1].map(i => { const y = ((i * 1300 + 400 - scroll) % 2600 + 2600) % 2600 - 600; return `<rect x="40" y="${y}" width="1000" height="220" fill="#c1453b"/>`; }).join('')}
  <g transform="translate(0,${wy})">
    <rect x="660" y="0" width="260" height="360" rx="130" fill="#26282e"/>
    <rect x="680" y="20" width="220" height="320" rx="110" fill="#11141a"/>
    ${face > 0 ? `<g opacity="${face}"><circle cx="790" cy="170" r="${80}" fill="#0b0d12"/>
       <g filter="url(#zglow)"><circle cx="762" cy="160" r="9" fill="#e9f5d0"/><circle cx="818" cy="160" r="9" fill="#e9f5d0"/></g>
       ${[[-70, 250], [70, 250]].map(([dx, dy]) => `<ellipse cx="${790 + dx}" cy="${dy}" rx="34" ry="44" fill="#0b0d12"/>`).join('')}</g>` : ''}
    <path d="M700 40 L880 300" stroke="#fff" stroke-width="8" opacity=".12"/>
  </g>
  <rect x="440" y="-40" width="14" height="${H + 80}" fill="#2e3136"/><rect x="566" y="-40" width="14" height="${H + 80}" fill="#2e3136"/>
  ${rungs}
  ${theo({ x: 510, y: theoY, s: 1.5, f: -1, look: wide ? -1 : -.2, eyes: wide ? 'wide' : 'open', mouth: wide ? 'o' : 'flat', armF: [152 + climb * 6, 6], armB: [-152 + climb * 6, -6], sweat: wide ? 1 : 0, headTilt: wide ? -12 : 0 })}
  <g transform="translate(${510 + 10},${theoY - 270})">${cat({ x: 0, y: 0, s: .5, f: -1, pose: 'sit', look: wide ? 1 : 0, ears: wide ? -1 : 0 }).replace(/<path d="M-30 -6[^>]*>/, '')}</g>
  <rect width="${W}" height="${H}" fill="#fff" opacity="${flash}"/>`;
}
S.ladder = (t, d, T) => {
  const p = t / d;
  const svg = ladderScene(t, { scroll: t * 160, theoY: 1000, winY: 2600 }) + vign(.45);
  return { svg, cam: 1.0 + .04 * p };
};
S.face = (t, d, T) => {
  const p = t / d;
  const fT = capL('face', 1, T, t);
  const f = seg(t, fT - .05, fT + .12);
  const scroll = (S.__ladderEnd || 0) + Math.min(t, fT) * 160;
  const svg = ladderScene(t, { scroll, theoY: 1000, winY: lerp(1200, -300, easeOut(clamp(t / fT))), face: f, wide: t > fT, flash: Math.max(0, .35 - Math.abs(t - fT) * 1.5) }) + vign(.55);
  return { svg, cam: 1.0 + (t > fT ? .08 * easeOut(seg(t, fT, fT + .4)) : 0) };
};

// 9 ---------------------------------------------------------------
S.hatch_slam = (t, d, T) => {
  const p = t / d;
  const slamT = capL('hatch_slam', 2, T, t);
  const flap = 1 - easeOut(seg(t, slamT - .1, slamT + .15));
  const runK = easeOut(seg(t, capL('hatch_slam', 1, T, t), slamT));
  const sh = t > slamT && t < slamT + .35 ? 20 : 0;
  const svg = towerBase(t, {
    flap, shake: sh, marks: true,
    theoO: { x: lerp(160, 470, runK), y: 1500, s: 1.55, pose: runK < 1 ? 'walk' : 'stand', walk: runK < 1 ? t * 13 : null, lean: runK < 1 ? 12 : 22, armF: runK < 1 ? [Math.sin(t * 13) * 40, 30] : [100, -10], armB: [-20, 20], look: .5, eyes: 'wide' }
  }) + (t > slamT ? pill(690, 1590, 'SEALED', { sc: back(seg(t, slamT, slamT + .35)), size: 40, bold: 700, bg: '#4f8a6a', fg: '#fff' }) : '') +
    `<rect width="${W}" height="${H}" fill="#0a1830" opacity=".1"/>` + vign(.5);
  return { svg, cam: 1.0 + .05 * p };
};

// 10 --------------------------------------------------------------
S.reverse = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, capL('reverse', 1, T, t), capL('reverse', 1, T, t) + .35));
  const ring = (t * .9) % 1;
  const svg = map3(t, { figs: [], tint: 0 }) +
    `<circle cx="${TOWER[0]}" cy="${TOWER[1]}" r="${70 + ring * 150}" fill="none" stroke="#e0473a" stroke-width="${8 * (1 - ring)}" opacity="${1 - ring}"/>
     <circle cx="${TOWER[0]}" cy="${TOWER[1]}" r="18" fill="#e0473a"/>
     <circle cx="${lerp(560, 300, p)}" cy="${lerp(1260, 1420, p)}" r="20" fill="${PAL.coat}" stroke="#fff" stroke-width="5"/>` +
    pill(lerp(560, 300, p), lerp(1330, 1490, p), 'THEO', { bg: PAL.coat, size: 24, bold: 700 }) +
    (k > 0 ? pill(TOWER[0], 960, 'TRAPPED INSIDE', { sc: k, bg: '#c8352c', fg: '#fff', size: 34, bold: 700 }) : '') + vign(.45);
  return { svg, cam: 1.06 - .04 * p };
};

// 11 --------------------------------------------------------------
S.boat_load = (t, d, T) => {
  const p = t / d;
  const items = [['WATER', '#3f86c4'], ['FOOD', '#6b5a48'], ['FUEL', '#d9473a']];
  const c2 = capL('boat_load', 2, T, t), c3 = capL('boat_load', 3, T, t);
  const its = items.map(([lab, col], i) => {
    const k = back(seg(t, c2 + i * .45, c2 + i * .45 + .3));
    return k > 0 ? pill(220 + i * 320, 340, lab + ' ✓', { sc: k, bg: '#fff', fg: col, size: 36, bold: 700, border: '#2a2c30' }) : '';
  }).join('');
  const kc = back(seg(t, c3, c3 + .35));
  const bob = Math.sin(t * 2.2) * 6;
  const svg = `
  <defs>${morningSky('bsky')}${linGrad('bsea', [[0, '#7b9cba'], [1, '#3e5d7c']])}</defs>
  <rect width="${W}" height="900" fill="url(#bsky)"/>
  <rect y="896" width="${W}" height="${H}" fill="url(#bsea)"/>
  ${waveDashes(910, 1900, t, '#d8e7ef', 38, 101, .45)}
  <g transform="translate(560,${1300 + bob}) rotate(${Math.sin(t * 1.7) * 1.5}) scale(1.6)">
    ${boat(0, 0, 1)}
    <rect x="-120" y="-118" width="56" height="62" rx="10" fill="#3f86c4"/><rect x="-56" y="-118" width="56" height="62" rx="10" fill="#3f86c4"/>
    <rect x="10" y="-108" width="90" height="52" rx="4" fill="#9a7148"/><line x1="10" y1="-82" x2="100" y2="-82" stroke="#7a5636" stroke-width="4"/>
    <rect x="110" y="-120" width="44" height="64" rx="6" fill="#d9473a"/>
  </g>
  ${cat({ x: 820 + 0, y: 1218 + bob, s: .9, f: -1, pose: 'sit', look: -.4, ears: -1 })}
  ${kc > 0 ? `<g transform="translate(830,${1030 + bob}) scale(${kc})"><path d="M-40 -30 l20 20 M-10 -40 l0 26 M22 -32 l-16 20" stroke="#e0473a" stroke-width="8" stroke-linecap="round"/></g>` : ''}
  <rect x="-40" y="1180" width="420" height="34" fill="#8a6a4a"/>${[60, 300].map(x => `<rect x="${x}" y="1214" width="26" height="240" fill="#4e3a28"/>`).join('')}
  ${theo({ x: 230, y: 1184, s: 1.55, f: 1, lean: 12, armF: [100, -20], armB: [90, -10], look: .4 })}
  ${its}
  ${vign(.4)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 12 --------------------------------------------------------------
S.leave = (t, d, T) => {
  const p = t / d;
  const bx = lerp(420, 860, easeIO(p)), by = lerp(1500, 1090, easeIO(p)), bs = lerp(.55, .18, easeIO(p));
  const svg = `
  <defs>${morningSky('lvsky')}${linGrad('lvsea', [[0, '#7b9cba'], [1, '#3e5d7c']])}</defs>
  <rect width="${W}" height="1000" fill="url(#lvsky)"/>
  <circle cx="820" cy="760" r="90" fill="#fff1c4" opacity=".9"/>
  <rect y="996" width="${W}" height="${H}" fill="url(#lvsea)"/>
  ${waveDashes(1010, 1900, t, '#d8e7ef', 34, 111, .45)}
  <path d="M${bx - 60 * bs * 2} ${by + 10} Q${(bx + 300) / 2} ${by + 220} 300 1560" stroke="#e8f2f6" stroke-width="${30 * bs + 6}" fill="none" opacity=".45" stroke-linecap="round"/>
  ${islandShape(230, 1460, .9, '#7d9a5c')}
  ${lighthouse(260, 1380, 1.05, 0)}
  <g opacity="${seg(p, .5, .8)}" filter="url(#zglow)"><circle cx="255" cy="1150" r="4" fill="#e9f5d0"/><circle cx="267" cy="1150" r="4" fill="#e9f5d0"/></g>
  <g transform="translate(${bx},${by + Math.sin(t * 3) * 4 * bs})">${boat(0, 0, bs)}${theo({ x: -20 * bs, y: -60 * bs, s: bs * .9, f: 1, look: -1 })}</g>
  ${gulls(t, [[300, 600, 1, 0], [380, 640, .8, 1.3]])}
  ${vign(.35)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 13 --------------------------------------------------------------
S.fuel_hook = (t, d, T) => {
  const p = t / d;
  const needle = lerp(-80, -52, easeOut(seg(t, .2, 1.2))) + Math.sin(t * 9) * 1.5;
  const k2 = seg(t, capL('fuel_hook', 1, T, t), capL('fuel_hook', 1, T, t) + 1.2);
  const svg = `
  <rect width="${W}" height="${H}" fill="#1d2a3a"/>
  ${waveDashes(0, 1900, t, '#2e4258', 40, 121, .5)}
  <g transform="translate(540,620)">
    <circle r="300" fill="#22252a"/><circle r="280" fill="#f3eee2"/>
    <path d="M${Math.cos(rad(-170)) * 230} ${Math.sin(rad(-170)) * 230} A230 230 0 0 1 ${Math.cos(rad(-125)) * 230} ${Math.sin(rad(-125)) * 230}" stroke="#e0473a" stroke-width="34" fill="none"/>
    ${[...Array(9)].map((_, i) => { const a = rad(-170 + i * 20); return `<line x1="${Math.cos(a) * 200}" y1="${Math.sin(a) * 200}" x2="${Math.cos(a) * 250}" y2="${Math.sin(a) * 250}" stroke="#22252a" stroke-width="8"/>`; }).join('')}
    <text x="-210" y="40" font-family="Anton" font-size="56" fill="#e0473a">E</text><text x="180" y="40" font-family="Anton" font-size="56" fill="#22252a">F</text>
    <line x1="0" y1="0" x2="0" y2="-220" stroke="#e0473a" stroke-width="14" stroke-linecap="round" transform="rotate(${needle})"/>
    <circle r="26" fill="#22252a"/>
    <text x="0" y="150" text-anchor="middle" font-family="Anton" font-size="84" fill="#22252a">11 GAL</text>
  </g>
  <g opacity="${clamp(k2 * 2)}" transform="translate(0,${(1 - easeOut(clamp(k2 * 2))) * 80})">
    <rect x="90" y="1420" width="900" height="420" rx="26" fill="#f3eee2"/>
    <path d="M90 1500 Q300 1470 500 1520 Q700 1560 990 1490 L990 1446 Q990 1420 964 1420 L116 1420 Q90 1420 90 1446 Z" fill="#9db08f"/>
    <circle cx="260" cy="1760" r="14" fill="${PAL.coat}" stroke="#22252a" stroke-width="4"/>
    <circle cx="260" cy="1760" r="${lerp(0, 600, easeOut(k2))}" fill="#3f86c4" opacity=".12"/>
    <circle cx="260" cy="1760" r="${lerp(0, 600, easeOut(k2))}" fill="none" stroke="#3f86c4" stroke-width="5" stroke-dasharray="14 10"/>
    <path d="M260 1760 Q520 1700 800 1640" stroke="#22252a" stroke-width="5" stroke-dasharray="12 10" fill="none" opacity="${seg(k2, .6, 1)}"/>
    <circle cx="820" cy="1630" r="${22 + Math.sin(t * 6) * 3}" fill="#e0473a" opacity="${seg(k2, .6, 1)}"/>
    <text x="820" y="1645" text-anchor="middle" font-family="Anton" font-size="30" fill="#fff" opacity="${seg(k2, .6, 1)}">?</text>
  </g>
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 14 --------------------------------------------------------------
S.end_card4 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 5</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">OPEN WATER</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
