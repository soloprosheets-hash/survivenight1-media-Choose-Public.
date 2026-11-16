// ---------- Season 2 · Part 4: THE WRECK ----------
const walkerDots = (k, t) => [0, 1, 2].map(i => {
  const u = clamp(k - i * .03);
  // bezier along sand path
  const p0 = [260, 1500], p1 = [420, 1200], p2 = [520, 1000], p3 = [760, 520];
  const b = (a, b2, c, d, s) => (1 - s) ** 3 * a + 3 * (1 - s) ** 2 * s * b2 + 3 * (1 - s) * s * s * c + s ** 3 * d;
  const x = b(p0[0], p1[0], p2[0], p3[0], u), y = b(p0[1], p1[1], p2[1], p3[1], u);
  return `<circle cx="${x + (i - 1) * 14}" cy="${y}" r="${i === 2 ? 9 : 13}" fill="${['#dba33a', '#5f6b5a', '#d98a3c'][i]}" stroke="#1d1f22" stroke-width="3"/>`;
}).join('');

S.w_hook = (t, d, T) => {
  const water = seg(t, 0, d) * .8;
  const svg = sandbarMap(t, water, { walkers: walkerDots(.4 + t * .05, t) }) + timerPill(540, 300, 3600 - t * 900) + vign(.4);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.w_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = notebook(t, `<text x="540" y="620" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="150" fill="#3a2214">I HAVE FUEL.</text><text x="540" y="820" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="104" fill="#3a2214">COME AT LOW TIDE.</text>`, { sub: 'night 14' }) +
    `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="170" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 250, 'PART 4 · DAY 15', { bg: PAL.yel, size: 30 })}</g>` + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.w_tide = (t, d, T) => {
  const water = 1 - easeIO(seg(t, .2, d - .3));
  return { svg: sandbarMap(t, water) + pill(540, 300, 'LOW TIDE', { sc: back(seg(t, .1, .4)), bg: '#d9c592', size: 40, bold: 700 }) + vign(.35), cam: 1.0 + .03 * (t / d) };
};
S.w_team = (t, d, T) => {
  const c1 = capL('w_team', 1, T, t);
  const svg = islandGround(t, { kind: 'day', hz: 820, gy: 900, lhX: 860, lhS: .9 }) +
    theo({ x: lerp(300, 420, t / d), y: 1180, s: 1.3, f: 1, walk: t * 7 }) + mateo({ x: lerp(160, 280, t / d), y: 1180, s: 1.3, f: 1, walk: t * 7 + 1 }) +
    (t > c1 ? ines({ x: 880, y: 1000, s: .9, f: -1, armF: [160 + Math.sin(t * 8) * 15, 10], gun: false }) + pill(880, 560, 'GUARDS THE LIGHT', { sc: back(seg(t, c1, c1 + .3)), bg: '#e98a76', fg: '#fff', size: 26, bold: 700 }) : '') + vign(.4);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.w_mango = (t, d, T) => {
  const c1 = capL('w_mango', 1, T, t);
  const svg = islandGround(t, { kind: 'day', hz: 820, gy: 900, lhX: 860, lhS: .9 }) +
    theo({ x: 700, y: 1180, s: 1.3, f: 1, walk: t * 7 }) + mateo({ x: 560, y: 1180, s: 1.3, f: 1, walk: t * 7 + 1 }) +
    (t > c1 ? cat({ x: lerp(100, 380, seg(t, c1, d)), y: 1180, s: 1.1, f: 1, pose: 'walk', t }) : cat({ x: 140, y: 1180, s: 1.1, f: 1, pose: 'sit', look: .4 })) +
    `<g transform="translate(250,700) scale(${back(seg(t, .2, .5))})"><rect x="-100" y="-50" width="200" height="100" rx="20" fill="#fff"/><text x="0" y="22" text-anchor="middle" font-family="Anton" font-size="60" fill="#1d1f22">STAY.</text>
      ${t > c1 ? `<line x1="-110" y1="40" x2="110" y2="-40" stroke="${PAL.red}" stroke-width="14" stroke-linecap="round" opacity="${seg(t, c1, c1 + .2)}"/>` : ''}</g>` + vign(.4);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.w_walk = (t, d, T) => {
  const c1 = capL('w_walk', 1, T, t);
  const wet = seg(t, 0, d);
  const svg = `<defs>${skyG('ww24', 'day')}</defs><rect width="${W}" height="${H}" fill="url(#ww24)"/>
  <rect y="760" width="${W}" height="${H}" fill="#4f7898"/>${waveDashes(770, 1900, t, '#e3eef3', 30, 581, .4)}
  ${ferryWreck(820, 800, .45)}
  <path d="M${lerp(320, 400, wet)} 1920 L500 800 L580 800 L${lerp(760, 680, wet)} 1920 Z" fill="#d9c592"/>
  <path d="M${lerp(320, 400, wet)} 1920 L500 800 L520 800 L${lerp(380, 440, wet)} 1920 Z" fill="#bfa46a" opacity="${wet}"/>
  <path d="M${lerp(760, 680, wet)} 1920 L580 800 L560 800 L${lerp(700, 620, wet)} 1920 Z" fill="#bfa46a" opacity="${wet}"/>
  ${mateo({ x: 470, y: 1300, s: 1.0, f: 1, walk: t * 8 })}${theo({ x: 600, y: 1340, s: 1.05, f: 1, walk: t * 8 + 1 })}${cat({ x: 540, y: 1520, s: .9, f: 1, pose: 'walk', t })}
  ${t > c1 ? timerPill(540, 300, 3600 - (t - c1) * 30, { sc: back(seg(t, c1, c1 + .3)) }) : ''}` + vign(.4);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.w_climb = (t, d, T) => {
  const k = easeOut(seg(t, .2, d));
  const svg = wreckClose(t, {}) +
    `<g transform="rotate(-6 540 900)">${theo({ x: 650, y: lerp(1250, 1080, k), s: 1.0, f: 1, armF: [170, 0], armB: [160, 0] })}</g>` +
    mateo({ x: 400, y: 1300, s: 1.1, f: 1, look: 1 }) + cat({ x: 260, y: 1300, s: .9, f: 1, pose: 'sit', look: .6 }) + vign(.4);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.w_inside = (t, d, T) => {
  const c2 = capL('w_inside', 2, T, t);
  const bx = 540 + Math.sin(t * 1.3) * 120;
  const br = t > c2 ? `<g opacity="${seg(t, c2, c2 + .4)}">${[0, 1, 2].map(i => `<ellipse cx="540" cy="1500" rx="${(80 + ((t * 120 + i * 60) % 180))}" ry="${(30 + ((t * 45 + i * 22) % 66))}" fill="none" stroke="#6a8aa4" stroke-width="4" opacity="${1 - ((t * 120 + i * 60) % 180) / 180}"/>`).join('')}</g>` : '';
  return { svg: wreckHall(t, { beamX: bx }) + br + vign(.6), cam: 1.0 + .06 * (t / d) };
};
S.w_cabins = (t, d, T) => {
  const c = [0, 1, 2].map(i => capL('w_cabins', i, T, t));
  const svg = `<rect width="${W}" height="${H}" fill="#1c1814"/>
  <rect x="140" y="420" width="800" height="760" fill="#2a231d"/><rect x="140" y="1100" width="800" height="80" fill="#3a2e26"/>
  <rect x="180" y="840" width="420" height="120" rx="14" fill="#4a3e34"/><rect x="200" y="800" width="380" height="60" rx="20" fill="#6a5a4e"/>
  ${t > c[1] ? `<g transform="translate(720,1060) scale(${back(seg(t, c[1], c[1] + .3))})"><rect x="-90" y="-120" width="180" height="120" rx="14" fill="#7a3a32"/><rect x="-30" y="-150" width="60" height="30" rx="10" fill="none" stroke="#5a2a22" stroke-width="10"/></g>
    <g transform="translate(400,1150) scale(${back(seg(t, c[1] + .3, c[1] + .6))})"><path d="M-60 0 L-60 -40 Q-40 -60 0 -50 L40 -20 L40 0 Z" fill="#c8352c"/><path d="M10 0 L10 -40 Q30 -60 70 -50 L110 -20 L110 0 Z" fill="#c8352c"/></g>` : ''}
  <path d="M540 1900 L${300 + Math.sin(t) * 80} 600 L${780 + Math.sin(t) * 80} 600 Z" fill="#fff3c8" opacity=".1"/>
  ${t > c[2] ? pill(540, 330, 'NOBODY', { sc: back(seg(t, c[2], c[2] + .3)), bg: '#25282c', fg: '#fff', size: 40, bold: 700 }) : ''}` + vign(.6);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.w_bridge = (t, d, T) => {
  const c1 = capL('w_bridge', 1, T, t);
  const nk = easeOut(seg(t, c1, c1 + .5));
  const svg = bridgeRoom(t, {}) +
    theo({ x: 300, y: 1450, s: 1.5, f: 1, look: 1, eyes: t > c1 ? 'wide' : 'open', armF: t > c1 ? [150, 10] : [20, 20], armB: t > c1 ? [140, 10] : [10, 10] }) +
    (t > c1 ? nell({ x: lerp(1200, 820, nk), y: 1450, s: 1.5, f: -1, look: 0, armF: [90, 0] }) + flareGun(lerp(1200, 820, nk) - 140, 1450 - 1.5 * 230, 1.5, 180) : '') + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.w_nell = (t, d, T) => {
  const svg = bridgeRoom(t, {}) + nell({ x: 540, y: 1730, s: 3.0, f: -1, look: 0, mouth: talkM(t), armF: [70, 10] }) + vign(.5);
  return { svg, cam: 1.02 + .04 * (t / d) };
};
S.w_name = (t, d, T) => {
  const c1 = capL('w_name', 1, T, t), c2 = capL('w_name', 2, T, t);
  let svg;
  if (t < c2) {
    svg = bridgeRoom(t, {}) + nell({ x: 700, y: 1450, s: 1.5, f: -1, look: 0 }) + theo({ x: 300, y: 1450, s: 1.5, f: 1, look: 1 }) +
      pill(700, 760, 'NELL', { sc: back(seg(t, .1, .4)), bg: '#2b3a55', fg: '#fff', size: 40, bold: 700 }) +
      (t > c1 ? pill(700, 850, 'KEEPER · 31 YEARS', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 30, bold: 700 }) : '');
  } else {
    svg = notebook(t, `<text x="540" y="560" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="104" fill="#3a2214">Never let the</text><text x="540" y="700" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="118" fill="#9a2a1e">light go out.</text><text x="760" y="860" font-family="Caveat" font-weight="700" font-size="70" fill="#3a2214">— Nell</text>`, { sub: 'day 311' });
  }
  return { svg: svg + vign(.5), cam: 1.0 + .04 * (t / d) };
};
S.w_gone = (t, d, T) => {
  const c1 = capL('w_gone', 1, T, t);
  const bar = t > c1 ? 1 - easeIO(seg(t, c1, c1 + .8)) : 1;
  const z = 1 + .4 * easeIO(seg(t, 0, c1));
  const svg = `<g transform="translate(540 600) scale(${z}) translate(-540 -600)">${bridgeRoom(t, { bar })}</g>` + mateo({ x: 260, y: 1500, s: 1.4, f: 1, look: 1, eyes: t > c1 ? 'wide' : 'open' }) +
    (t > c1 ? pill(540, 330, 'SANDBAR: GONE', { sc: back(seg(t, c1 + .5, c1 + .8)), bg: PAL.red, fg: '#fff', size: 40, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1 };
};
S.w_stairs = (t, d, T) => {
  const c1 = capL('w_stairs', 1, T, t);
  const svg = stairsDown(t, { water: .85, rise: t > c1 ? seg(t, c1, d + .4) : 0 }) + vign(.65);
  return { svg, cam: 1.0 + .08 * (t / d) };
};
S.end_w = tomorrowCard(5);
