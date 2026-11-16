// ---------- Season 2 · Part 3: THE DARK SIDE ----------
// the dark beach behind the tower
function darkBeach(t, o = {}) {
  const { kind = 'night', wall = 0, fire = 0, heads = 0, sink = 0, sunk = 0 } = o;
  const n = kind === 'night';
  let wood = '';
  for (let i = 0; i < Math.floor(wall * 14); i++) {
    const x = 40 + i * 74, y = 1180 + (i % 2) * 18;
    wood += `<rect x="${x - 50}" y="${y - 14}" width="110" height="26" rx="12" fill="#7a5a3a" transform="rotate(${(rnd(i) - .5) * 40} ${x} ${y})"/><rect x="${x - 40}" y="${y - 36}" width="90" height="22" rx="10" fill="#8a6a46" transform="rotate(${(rnd(i + 4) - .5) * 50} ${x} ${y - 25})"/>`;
  }
  let flames = '';
  if (fire > 0) for (let i = 0; i < 16; i++) {
    const x = 20 + i * 68, h = (120 + rnd(i) * 120 + Math.sin(t * 9 + i) * 30) * fire;
    flames += `<path d="M${x - 40} 1200 Q${x - 20} ${1200 - h * .6} ${x + Math.sin(t * 7 + i) * 10} ${1200 - h} Q${x + 24} ${1200 - h * .5} ${x + 40} 1200 Z" fill="#ff8a2a" opacity=".9"/><path d="M${x - 20} 1200 Q${x} ${1200 - h * .5} ${x + 20} 1200 Z" fill="#ffd27a"/>`;
  }
  let hs = '';
  if (heads > 0) for (let i = 0; i < 9; i++) {
    const x = 80 + i * 115 + (i % 2) * 20, rise = clamp(heads * 1.4 - i * .05) * (1 - sink);
    const y = 1440 + (i % 3) * 70 - rise * 70;
    hs += `<g opacity="${clamp(heads * 2)}"><circle cx="${x}" cy="${y}" r="30" fill="#0b0f14"/><circle cx="${x + 8}" cy="${y - 6}" r="5" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="${x + 22}" cy="${y - 5}" r="5" fill="#e9f5d0" filter="url(#zglow)"/>
      <rect x="${x - 40}" y="${y + 18}" width="80" height="40" fill="${n ? '#0f1d34' : '#4f7898'}"/></g>`;
  }
  return `<defs>${skyG('db_' + kind, kind)}</defs><rect width="${W}" height="${H}" fill="url(#db_${kind})"/>
  ${n ? stars(40, 271, 700) : ''}
  ${lighthouse(820, 980, 1.0, n ? 1 : 0, PAL_LH).replace(/<g transform/, '<g opacity=".9" transform')}
  <rect y="960" width="${W}" height="260" fill="${n ? '#2a2a24' : '#cdb98a'}"/>
  ${wood}${flames}
  ${fire > 0 ? `<rect width="${W}" height="${H}" fill="#ff7a2a" opacity="${fire * .12}"/>` : ''}
  <rect y="1220" width="${W}" height="${H}" fill="${n ? '#0f1d34' : '#4f7898'}"/>${waveDashes(1230, 1900, t, n ? '#8aa6c4' : '#e3eef3', 26, 531, n ? .25 : .4)}
  ${fire > 0 ? `<rect y="1220" width="${W}" height="200" fill="#ff8a2a" opacity="${fire * .18}"/>` : ''}
  ${hs}`;
}

// 1 ---------------------------------------------------------------
S.d_hook = (t, d, T) => {
  const svg = darkBeach(t, { heads: seg(t, .4, d) });
  const z = 1.15 - .15 * easeOut(seg(t, 0, d));
  return { svg: `<g transform="translate(540 1300) scale(${z}) translate(-540 -1300)">${svg}</g>` + vign(.6), cam: 1 };
};

// 2 ---------------------------------------------------------------
S.d_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = notebook(t, `<text x="540" y="620" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="170" fill="#a82a1e">THEY CAN</text><text x="540" y="800" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="190" fill="#a82a1e">SWIM.</text>`, { sub: 'night 13' }) +
    `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="170" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 250, 'PART 3 · DAY 14', { bg: PAL.yel, size: 30 })}</g>` + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 3 ---------------------------------------------------------------
S.d_door = (t, d, T) => {
  const c1 = capL('d_door', 1, T, t);
  const svg = `<defs>${skyG('dd23', 'dawn')}</defs><rect width="${W}" height="${H}" fill="url(#dd23)"/>
  <rect x="380" y="300" width="360" height="760" fill="#e9e2d3"/>
  <path d="M440 1060 L440 690 Q560 570 680 690 L680 1060 Z" fill="#5b4330"/>
  ${[[470, 700, -12], [600, 760, 10], [520, 880, 6], [640, 940, -8]].map(([x, y, a]) => `<path d="M${x} ${y} l20 40 M${x + 14} ${y} l20 40 M${x + 28} ${y} l20 40" stroke="#3a2a1c" stroke-width="6" transform="rotate(${a} ${x} ${y})" opacity=".8"/>`).join('')}
  <rect y="1060" width="${W}" height="${H}" fill="#cdb98a"/>
  ${[...Array(10)].map((_, i) => `<ellipse cx="${lerp(560, 200, i / 9) + (i % 2 ? 20 : -20)}" cy="${lerp(1090, 1800, i / 9)}" rx="${lerp(12, 26, i / 9)}" ry="${lerp(18, 36, i / 9)}" fill="#a8946a" opacity="${t > c1 ? .5 : .8}"/>`).join('')}
  ${theo({ x: 860, y: 1150, s: 1.3, f: -1, look: -.5, mug: true })}${cat({ x: 300, y: 1150, s: 1.1, f: 1, pose: 'sit', look: .5 })}
  ${pill(540, 220, 'CLAW MARKS', { sc: back(seg(t, .4, .7)), bg: PAL.red, fg: '#fff', size: 32, bold: 700 })}` + vign(.4);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 4 ---------------------------------------------------------------
S.d_plan = (t, d, T) => {
  const svg = islandGround(t, { kind: 'day', hz: 760, gy: 860, lhX: 860, lhS: .8 }) +
    ines({ x: 420, y: 1700, s: 3.0, f: 1, look: .6, mouth: talkM(t), armF: [60, 40], gun: false }) + vign(.45);
  return { svg, cam: 1.02 + .04 * (t / d) };
};

// 5 ---------------------------------------------------------------
S.d_fire = (t, d, T) => {
  const svg = darkBeach(t, { kind: 'day', wall: 1, fire: seg(t, .3, 1.0) * .8 }) +
    pill(540, 330, 'PLAN: WALL OF FIRE', { sc: back(seg(t, .1, .4)), bg: PAL.red, fg: '#fff', size: 36, bold: 700 }) + vign(.4);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 6 ---------------------------------------------------------------
S.d_drag = (t, d, T) => {
  const c1 = capL('d_drag', 1, T, t);
  let svg;
  if (t < c1) {
    const w = seg(t, 0, c1);
    svg = darkBeach(t, { kind: 'day', wall: w }) +
      `<g transform="translate(${lerp(-100, 700, (t * .35) % 1)},0)">${mateo({ x: 0, y: 1190, s: 1.2, f: 1, walk: t * 10, lean: 10, armB: [120, 10] })}<rect x="-170" y="1090" width="160" height="24" rx="10" fill="#7a5a3a" transform="rotate(-10 -90 1100)"/></g>` +
      ines({ x: lerp(1100, 300, (t * .3) % 1), y: 1190, s: 1.2, f: -1, walk: t * 10, gun: false, armF: [90, 10] }) +
      pill(540, 330, `DRIFTWOOD: ${Math.floor(w * 60)}`, { bg: PAL.yel, size: 34, bold: 700 });
  } else {
    svg = darkBeach(t, { kind: 'day', wall: 1 }).replace(/<rect y="1220"[^>]*>/, m => m) +
      `<rect x="250" y="980" width="580" height="200" rx="40" fill="#7a5a3a"/>${[...Array(6)].map((_, i) => `<rect x="${270 + i * 90}" y="${960 - (i % 2) * 20}" width="140" height="30" rx="14" fill="#8a6a46" transform="rotate(${(rnd(i) - .5) * 30} ${340 + i * 90} 975)"/>`).join('')}
      ${cat({ x: 540, y: 960, s: 1.7, f: 1, pose: 'sleep', t })}
      <text x="${700 + ((t * 30) % 40)}" y="${800 - ((t * 30) % 40)}" font-family="Anton" font-size="70" fill="#fff" stroke="#1d1f22" stroke-width="6" paint-order="stroke">z</text>
      ${pill(540, 330, 'HELPING', { sc: back(seg(t, c1 + .3, c1 + .6)), bg: '#e8a25a', size: 38, bold: 700 })}`;
  }
  return { svg: svg + vign(.4), cam: 1.0 + .04 * (t / d) };
};

// 7 ---------------------------------------------------------------
S.d_fuel = (t, d, T) => {
  const c1 = capL('d_fuel', 1, T, t);
  const pour = t > c1 ? seg(t, c1, d) : 0;
  const svg = darkBeach(t, { kind: 'dusk', wall: 1 }) +
    theo({ x: 420, y: 1190, s: 1.3, f: 1, look: 1, armF: [70 + pour * 20, 10] }) +
    `<g transform="translate(560,1000) rotate(${pour * 70})"><rect x="-40" y="-60" width="80" height="110" rx="10" fill="#c8352c"/><rect x="-14" y="-82" width="28" height="24" fill="#2b2f36"/></g>` +
    (pour > 0 ? `<path d="M620 960 Q660 1040 640 1160" stroke="#c9a85a" stroke-width="10" fill="none" opacity=".8"/>` : '') +
    `<g transform="translate(900,500)"><rect x="-90" y="-140" width="180" height="280" rx="16" fill="#25282c"/><rect x="-60" y="${-110 + (1 - lerp(.8, .25, pour)) * 220}" width="120" height="${lerp(.8, .25, pour) * 220}" fill="${pour > .5 ? PAL.red : PAL.yel}"/><text x="0" y="180" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="30" fill="#fff">FUEL</text></g>` + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 8 ---------------------------------------------------------------
S.d_wait = (t, d, T) => {
  const svg = darkBeach(t, { kind: 'dusk', wall: 1 }).replace(/<rect width="1080" height="1920" fill="url\(#db_dusk\)"\/>/, m => m) +
    `<rect width="${W}" height="${H}" fill="#05070f" opacity="${seg(t, 0, d) * .5}"/>` +
    `<rect x="0" y="1620" width="${W}" height="16" fill="#0a0c10"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="1620" width="12" height="320" fill="#0a0c10"/>`).join('')}` +
    [[200, theo], [330, ines], [460, mateo]].map(([x, fn]) => fn({ x, y: 1630, s: 1.0, f: 1, gun: false }).replace(/#[0-9a-fA-F]{6}/g, '#0a0c10')).join('') +
    cat({ x: 600, y: 1620, s: 1.0, f: 1, pose: 'sit' }).replace(/#[0-9a-fA-F]{6}/g, '#0a0c10') + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};

// 9 ---------------------------------------------------------------
S.d_rise = (t, d, T) => {
  const c1 = capL('d_rise', 1, T, t);
  const svg = darkBeach(t, { wall: 1, heads: t > c1 ? seg(t, c1, d + .5) : 0 }) +
    `<path d="M820 430 L${820 + Math.cos(rad(t * 70)) * 1400} ${430 + Math.sin(rad(t * 70)) * 200 - 80} L${820 + Math.cos(rad(t * 70)) * 1400} ${430 + Math.sin(rad(t * 70)) * 200 + 80} Z" fill="#fff2b8" opacity=".12"/>` + vign(.6);
  return { svg, cam: 1.0 + .05 * (t / d) };
};

// 10 --------------------------------------------------------------
S.d_torch = (t, d, T) => {
  const k = easeIn(seg(t, .1, d));
  const x = lerp(260, 620, k), y = lerp(700, 1150, k) - Math.sin(k * 3.14) * 250;
  const svg = darkBeach(t, { wall: 1, heads: 1 }) +
    `<g transform="translate(${x},${y}) rotate(${t * 720})"><rect x="-10" y="-60" width="20" height="120" fill="#6a4a32"/><circle cx="0" cy="-66" r="${22 + Math.sin(t * 30) * 4}" fill="#ffb03a" filter="url(#zglow)"/></g>` + vign(.6);
  return { svg, cam: 1.02 };
};

// 11 --------------------------------------------------------------
S.d_flames = (t, d, T) => {
  const c1 = capL('d_flames', 1, T, t);
  const sh = t < .4 ? (rnd(Math.floor(t * 60)) - .5) * 20 : 0;
  const svg = darkBeach(t, { wall: 1, fire: easeOut(seg(t, 0, .6)), heads: 1, sink: t > c1 ? seg(t, c1, c1 + 1.8) : 0 }) +
    `<rect width="${W}" height="${H}" fill="#fff2c8" opacity="${(1 - seg(t, 0, .3)) * .6}"/>` + vign(.5);
  return { svg: `<g transform="translate(${sh},0)">${svg}</g>`, cam: 1.0 + .04 * (t / d) };
};

// 12 --------------------------------------------------------------
S.d_count = (t, d, T) => {
  const svg = darkBeach(t, { wall: 1, fire: .5 }) + `<rect width="${W}" height="${H}" fill="#000" opacity=".3"/>` +
    mateo({ x: 460, y: 1730, s: 3.0, f: 1, look: .6, mouth: talkM(t), armF: [40, 30] }) + vign(.5);
  return { svg, cam: 1.02 + .04 * (t / d) };
};

// 13 --------------------------------------------------------------
S.d_blink = (t, d, T) => {
  const c1 = capL('d_blink', 1, T, t), c2 = capL('d_blink', 2, T, t);
  if (t < c1) return { svg: seaView(t, { light: MORSE_ON(t * 1.4, [1, 3, 1, 1]) }) + vign(.6), cam: 1.0 + .04 * (t / d) };
  const svg = notebook(t, `<text x="540" y="620" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="150" fill="#3a2214" opacity="${seg(t, c1, c1 + .3)}">I HAVE FUEL.</text>
    ${t > c2 ? `<text x="540" y="840" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="104" fill="#3a2214" opacity="${seg(t, c2, c2 + .3)}">COME AT LOW TIDE.</text>` : ''}`, { sub: 'night 14 — new message' });
  return { svg: svg + vign(.55), cam: 1.0 + .05 * (t / d) };
};

// 14 --------------------------------------------------------------
S.d_where = (t, d, T) => {
  const c1 = capL('d_where', 1, T, t);
  const on = MORSE_ON(t * 1.4, [1, 3, 1, 1]);
  const svg = `<defs>${skyG('dw23', 'night')}</defs><rect width="${W}" height="${H}" fill="url(#dw23)"/>${stars(60, 281, 850)}
  <rect y="880" width="${W}" height="${H}" fill="#0f1d34"/>${waveDashes(890, 1600, t, '#8aa6c4', 24, 541, .22)}
  ${ferryWreck(640, 900, .85).replace(/#6e4636|#4a2e24|#8a7a6a|#9a8a78|#5a4a3e|#a0583e/g, '#151a22')}
  ${on ? `<circle cx="560" cy="700" r="16" fill="#ffe0a0" filter="url(#zglow)"/><circle cx="560" cy="700" r="80" fill="#ffe0a0" opacity=".18"/>` : `<circle cx="560" cy="700" r="6" fill="#3a3a30"/>`}
  <rect x="0" y="1720" width="${W}" height="16" fill="#0a0c10"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="1720" width="12" height="240" fill="#0a0c10"/>`).join('')}
  ${cat({ x: 820, y: 1720, s: 1.5, f: -1, pose: 'sit', look: -.6, ears: 1 }).replace(/#d98a3c|#b86d27|#f4d7b0/g, '#0a0c10')}
  ${t > c1 ? pill(540, 330, 'THE FERRY WRECK', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 40, bold: 700 }) : ''}` + vign(.6);
  const z = t > c1 ? 1 + .45 * easeIO(seg(t, c1, d)) : 1;
  return { svg: `<g transform="translate(560 760) scale(${z}) translate(-560 -760)">${svg}</g>`, cam: 1 };
};

S.end_d = tomorrowCard(4);
