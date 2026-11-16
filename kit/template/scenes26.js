// ---------- Season 2 · Part 6: BELOW DECK ----------
function lowerDeck(t, o = {}) {
  const { eyes = 0, beam = null, wy = 1150, n = 22 } = o;
  let bodies = '';
  for (let i = 0; i < n; i++) {
    const x = 60 + (i * 157) % 960 + Math.sin(t * .6 + i) * 6, y = wy + 40 + (i % 5) * 150 + Math.floor(i / 5) * 12;
    const s = .6 + (i % 5) * .18;
    const open = clamp(eyes * 1.6 - (i % 7) * .12);
    bodies += `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="90" ry="26" fill="#2a3640" stroke="#3e4e5a" stroke-width="4"/><circle cx="96" cy="-4" r="30" fill="#33424e" stroke="#46586a" stroke-width="4"/><path d="M-60 -6 L-100 -20 M-40 6 L-90 18" stroke="#2a3640" stroke-width="14" stroke-linecap="round"/>
      ${open > 0 ? `<g opacity="${open}"><circle cx="100" cy="-10" r="6" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="116" cy="-6" r="6" fill="#e9f5d0" filter="url(#zglow)"/></g>` : ''}</g>`;
  }
  return `<rect width="${W}" height="${H}" fill="#0c0b0a"/>
  ${[...Array(7)].map((_, i) => `<rect x="${i * 170}" y="300" width="20" height="${wy - 300}" fill="#1a1612"/>`).join('')}
  <rect x="0" y="280" width="${W}" height="40" fill="#1a1612"/>
  ${[...Array(5)].map((_, i) => `<circle cx="${120 + i * 210}" cy="620" r="40" fill="#141a22" stroke="#2a221c" stroke-width="10"/>`).join('')}
  <rect y="${wy}" width="${W}" height="${H}" fill="#0b141c"/>${waveDashes(wy + 10, 1900, t, '#3a5a74', 20, 601, .25)}
  ${bodies}
  ${beam !== null ? `<g transform="rotate(${beam} 540 1950)"><path d="M540 1950 L380 900 L700 900 Z" fill="#fff3c8" opacity=".14"/></g>` : ''}`;
}
function wading(fn, x, wy, s, o = {}) {
  // character drawn then water band over legs
  return fn({ x, y: wy + 90 * s, s, ...o }) + `<rect x="${x - 120 * s}" y="${wy}" width="${240 * s}" height="${110 * s}" fill="#0b141c" opacity=".9"/>${waves(wy, '#3a5a74', 0, 4, 40, 0, 4, .5, x - 120 * s, x + 120 * s)}`;
}

S.b_hook = (t, d, T) => {
  const svg = lowerDeck(t, { beam: Math.sin(t * .8) * 8 }) + wading(theo, 380, 1150, 1.0, { look: 1, armF: [80, 10] }) +
    `<rect x="760" y="1110" width="120" height="70" fill="#5a4a3e"/>` + cat({ x: 820, y: 1110, s: .7, f: -1, pose: 'sit' }) + vign(.6);
  return { svg, cam: 1.02 + .05 * (t / d) };
};
S.b_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = `<rect width="${W}" height="${H}" fill="#4a3e34"/>${[...Array(10)].map((_, i) => `<rect x="0" y="${i * 200}" width="${W}" height="6" fill="#3a3028"/>`).join('')}
  <ellipse cx="560" cy="900" rx="130" ry="80" fill="#0a0c10"/><ellipse cx="560" cy="900" rx="130" ry="80" fill="none" stroke="#2a2018" stroke-width="10"/>
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="230" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
  ${pill(540, 310, 'PART 6 · DAY 16', { bg: PAL.yel, size: 30 })}</g>` + vign(.55);
  return { svg, cam: 1.0 + .06 * (t / d) };
};
S.b_stairs = (t, d, T) => {
  const k = easeIO(seg(t, capL('b_stairs', 1, T, t), d));
  return { svg: stairsDown(t, { water: .5 }) + theo({ x: lerp(380, 600, k), y: lerp(700, 1150, k), s: lerp(1.3, 1.0, k), f: 1, walk: t * 5, look: .8 }) + `<rect width="${W}" height="${H}" fill="#000" opacity="${k * .3}"/>` + vign(.6), cam: 1.0 + .04 * (t / d) };
};
S.b_water = (t, d, T) => ({ svg: lowerDeck(t, { beam: -5 + Math.sin(t) * 10 }) + wading(theo, 540, 1150, 1.2, { look: 0, armF: [80, 10], eyes: 'wide' }) + vign(.6), cam: 1.0 + .05 * (t / d) });
S.b_sleep = (t, d, T) => {
  const z = 1.6;
  const svg = `<g transform="translate(540 1450) scale(${z}) translate(-540 -1450)">${lowerDeck(t, { beam: 0 })}</g>` +
    [...Array(6)].map((_, i) => `<circle cx="${300 + i * 90}" cy="${1300 - ((t * 60 + i * 50) % 200)}" r="${5 + i % 3 * 3}" fill="none" stroke="#6a8aa4" stroke-width="3" opacity=".6"/>`).join('') + vign(.6);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.b_rule = (t, d, T) => ({ svg: stairsDown(t, { water: .3 }) + `<rect width="${W}" height="${H}" fill="#000" opacity=".3"/>` + nell({ x: 540, y: 1730, s: 3.0, f: -1, mouth: talkM(t), armF: [130, 10] }) + vign(.6), cam: 1.02 + .04 * (t / d) });
S.b_step = (t, d, T) => {
  const ph = (t * 1.2) % 1;
  const svg = lowerDeck(t, { beam: 0, n: 14 }) + wading(theo, lerp(200, 700, t / d), 1150, 1.25, { walk: Math.floor(t * 1.2) * 3.14 + ph * 1.5, look: 0, eyes: 'wide', sweat: .8 }) + vign(.6);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.b_meow = (t, d, T) => {
  const c1 = capL('b_meow', 1, T, t);
  const svg = lowerDeck(t, { beam: t > c1 ? lerp(0, 25, seg(t, c1, c1 + .5)) : 0 }) + wading(theo, 400, 1150, 1.2, { look: t > c1 ? 1 : 0, eyes: 'wide' }) +
    (t > c1 ? `<text x="800" y="980" font-family="Caveat" font-weight="700" font-size="80" fill="#f4efe4" opacity="${seg(t, c1, c1 + .3)}">meow</text>` : '') + vign(.65);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.b_crate = (t, d, T) => {
  const c1 = capL('b_crate', 1, T, t);
  const bob = Math.sin(t * 2) * 6;
  const svg = lowerDeck(t, {}) + `<ellipse cx="540" cy="1000" rx="320" ry="420" fill="#fff3c8" opacity=".12"/>
  <g transform="translate(0,${bob})"><rect x="400" y="1080" width="280" height="120" fill="#7a5a3a"/><rect x="400" y="1080" width="280" height="16" fill="#8a6a46"/>
  ${cat({ x: 540, y: 1080, s: 1.6, f: 1, pose: 'sit', look: t > c1 ? .6 : 0 })}</g>
  ${t > c1 ? pill(540, 560, 'PROUD', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 40, bold: 700 }) : ''}` + vign(.6);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.b_yawn = (t, d, T) => {
  const c1 = capL('b_yawn', 1, T, t);
  const y = t > c1 ? Math.sin(seg(t, c1, c1 + 1) * 3.14) : 0;
  const svg = lowerDeck(t, {}) + `<rect x="0" y="0" width="${W}" height="${H}" fill="#000" opacity=".2"/>` +
    `<g transform="translate(540,1000)"><circle r="160" fill="#d98a3c"/><path d="M-130 -90 l20 -120 l80 70 Z M130 -90 l-20 -120 l-80 70 Z" fill="#d98a3c"/>
    <path d="M-70 -20 q20 ${y ? 10 : -10} 40 0 M30 -20 q20 ${y ? 10 : -10} 40 0" stroke="#2a1d12" stroke-width="8" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="${50 + y * 20}" rx="${20 + y * 40}" ry="${8 + y * 60}" fill="#7a2a22"/></g>
    ${y > .3 ? `<text x="740" y="760" font-family="Anton" font-size="80" fill="#fff" stroke="#1d1f22" stroke-width="7" paint-order="stroke">YAAAWN</text>` : ''}
    ${theo({ x: 150, y: 1800, s: 1.8, f: 1, look: 1, eyes: 'wide', sweat: 1 })}` + vign(.6);
  return { svg, cam: 1.03 };
};
S.b_reach = (t, d, T) => {
  const c2 = capL('b_reach', 2, T, t);
  const turn = capL('b_reach', 1, T, t) < t ? -1 : 1;
  const hit = t > c2 + .2;
  const svg = lowerDeck(t, { beam: hit ? Math.sin(t * 12) * 40 : 0 }) + wading(theo, 540, 1150, 1.3, { f: turn, look: 0, armF: [70, 60], eyes: hit ? 'wide' : 'open' }) +
    cat({ x: 540 + turn * 70, y: 1150 - 1.3 * 150, s: .8, f: turn, pose: 'sit' }) + vign(.6);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.b_eyes = (t, d, T) => {
  const c1 = capL('b_eyes', 1, T, t);
  const svg = lowerDeck(t, { beam: Math.sin(t * 3) * 35, eyes: t > c1 ? seg(t, c1, d) : 0, n: 26 }) + vign(.6);
  return { svg, cam: 1.0 + .06 * (t / d) };
};
S.b_run = (t, d, T) => {
  const c1 = capL('b_run', 1, T, t), c2 = capL('b_run', 2, T, t);
  let svg;
  if (t < c2) {
    const k = seg(t, 0, c2);
    svg = stairsDown(t, { water: .5, rise: k }) + theo({ x: lerp(600, 380, k), y: lerp(1150, 700, k), s: lerp(1.0, 1.3, k), f: -1, walk: t * 14, lean: -12, armF: [70, 60], eyes: 'wide' }) +
      cat({ x: lerp(600, 380, k) - 80, y: lerp(1150, 700, k) - 200, s: .7, f: -1, pose: 'sit', ears: 1 });
  } else svg = doorClose(t, { pipe: easeOut(seg(t, c2 + .1, c2 + .5)), shake: t < c2 + .4 ? (rnd(Math.floor(t * 60)) - .5) * 20 : 0 }) + nell({ x: 960, y: 1700, s: 1.5, f: -1, armF: [80, 0] });
  return { svg: svg + vign(.6), cam: 1.02 };
};
S.b_back = (t, d, T) => {
  const k = seg(t, 0, d);
  const walkers = [0, 1, 2, 3].map(i => {
    const u = clamp(1 - k - i * .04);
    const b = (a, b2, c, d2, s) => (1 - s) ** 3 * a + 3 * (1 - s) ** 2 * s * b2 + 3 * (1 - s) * s * s * c + s ** 3 * d2;
    const x = b(260, 420, 520, 760, u), y = b(1500, 1200, 1000, 520, u);
    return `<circle cx="${x + (i - 1.5) * 16}" cy="${y}" r="${i === 3 ? 9 : 13}" fill="${['#dba33a', '#5f6b5a', '#2b3a55', '#d98a3c'][i]}" stroke="#1d1f22" stroke-width="3"/>`;
  }).join('');
  return { svg: sandbarMap(t, 0, { walkers }) + pill(540, 300, '+2 BARRELS · +1 NELL', { sc: back(seg(t, .2, .5)), bg: PAL.yel, size: 34, bold: 700 }) + vign(.35), cam: 1.0 + .03 * (t / d) };
};
S.b_open = (t, d, T) => {
  const c1 = capL('b_open', 1, T, t);
  const svg = islandGround(t, { kind: 'dusk', hz: 760, gy: 860, lhX: 540, lhS: 1.25 }) +
    `<rect x="${540 - 20}" y="${880 - 78}" width="44" height="78" fill="#0a0c10"/>` +
    theo({ x: 230, y: 1200, s: 1.3, f: 1, look: 1, eyes: 'wide' }) + mateo({ x: 660, y: 1200, s: 1.3, f: -1, look: 1 }) + nell({ x: 850, y: 1200, s: 1.3, f: -1 }) + cat({ x: 360, y: 1200, s: .9, f: 1, pose: 'sit', ears: 1 }) +
    (t > c1 ? pill(540, 330, 'INES?', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 50, bold: 700 }) : '') + vign(.5);
  const z = 1 + .3 * easeIO(seg(t, 0, d));
  return { svg: `<g transform="translate(540 820) scale(${z}) translate(-540 -820)">${svg}</g>`, cam: 1 };
};
S.end_b = tomorrowCard(7);
