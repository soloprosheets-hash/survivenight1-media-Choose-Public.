// ---------- Part 10 scenes ----------
// 1 ---------------------------------------------------------------
S.recap10 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const k = back(seg(t, capL('recap10', 2, T, t), capL('recap10', 2, T, t) + .35));
  const svg = seaNight(t, 21, 1150) + `<g transform="translate(540 1300) scale(${1 + p * .15}) translate(-540 -1300)">${fishBoat(540, 1330, .9, { t, crew: 0, lit: .8, driver: 1 })}</g>
  <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 10</text>
    ${pill(540, 310, 'DAY 5 · THE PLAN', { bg: PAL.yel, size: 28 })}</g>
  ${k > 0 ? `<g transform="translate(540,1330) scale(${k})"><circle r="260" fill="none" stroke="#c8352c" stroke-width="10" stroke-dasharray="26 16"/></g>` + pill(540, 1640, 'TARGET: HIS BOAT', { sc: k, bg: '#c8352c', fg: '#fff', size: 38, bold: 700 }) : ''}
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 2 ---------------------------------------------------------------
S.roles = (t, d, T) => {
  const p = t / d;
  const card = (i, y, who, tool, col, inner) => {
    const k = back(seg(t, capL('roles', i, T, t), capL('roles', i, T, t) + .35));
    return k <= 0 ? '' : `<g transform="translate(540,${y}) scale(${k})">
      <rect x="-440" y="-150" width="880" height="300" rx="30" fill="#f3eee2" stroke="#2a2c30" stroke-width="6"/>
      <clipPath id="rc${i}"><rect x="-440" y="-150" width="300" height="300" rx="30"/></clipPath>
      <g clip-path="url(#rc${i})"><rect x="-440" y="-150" width="300" height="300" fill="${col}"/>${inner}</g>
      <text x="-100" y="-30" font-family="Anton" font-size="78" fill="#22252a">${who}</text>
      <text x="-100" y="60" font-family="Oswald" font-weight="700" font-size="48" fill="${col}" letter-spacing="2">${tool}</text></g>`;
  };
  const mk = back(seg(t, capL('roles', 3, T, t), capL('roles', 3, T, t) + .35));
  const svg = `<rect width="${W}" height="${H}" fill="#1b212c"/>
  ${card(0, 330, 'INES', 'FLARE GUN', '#b8432f', `<g transform="translate(-290,330) scale(1.1)">${ines({ x: 0, y: 0, s: 1, f: 1, gun: true, look: .5, armF: [80, 0] })}</g>`)}
  ${card(1, 680, 'MATEO', 'CRANE', '#d9a13a', `<g transform="translate(-290,330) scale(1.1)">${mateo({ x: 0, y: 0, s: 1, f: 1, look: .5 })}</g>`)}
  ${card(2, 1030, 'THEO', 'ROPE', '#4f8a6a', `<g transform="translate(-290,330) scale(1.1)">${theo({ x: 0, y: 0, s: 1, f: 1, look: .5 })}</g>`)}
  ${mk > 0 ? `<g transform="translate(860,1120) scale(${mk}) rotate(-8)">${cat({ x: 0, y: 0, s: 1.3, f: -1, pose: 'sit', look: -.5 })}</g>` + pill(860, 1180, '+ MANGO', { sc: mk, bg: '#d98a3c', fg: '#fff', size: 34, bold: 700 }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .03 * p };
};

// 3 ---------------------------------------------------------------
S.night10 = (t, d, T) => {
  const p = t / d;
  let boats = '';
  for (let i = 0; i < 4; i++) boats += fishBoat(lerp(1500 + i * 380, 860 + i * 300, easeOut(p)), 1390 + i * 20, .5, { t, crew: 3, ph: i });
  const svg = nightPlat(t, boats) + pill(540, 300, 'NIGHT 7 · 11:58 PM', { bg: PAL.yel, size: 36, bold: 700, sc: back(seg(t, 0, .35)) }) + vign(.65);
  return { svg, cam: 1.0 + .04 * p };
};

// 4 ---------------------------------------------------------------
S.slide10 = (t, d, T) => {
  const p = t / d;
  let f = '', spl = '';
  for (let i = 0; i < 4; i++) {
    const up = easeOut(seg(t, i * .15, 1.0 + i * .15));
    const t0 = capL('slide10', 1, T, t) - .5 + i * .2;
    const k = seg(t, t0, t0 + .5);
    const y = lerp(1700, 1700 - (300 + i * 80), up) + (1900 - (1700 - (300 + i * 80))) * k * k;
    f += `<g opacity="${1 - seg(k, .75, 1)}">` + zomb({ x: 420 + i * 80, y, s: .9, t: t * 1.6, ph: i, col: '#030406', eyes: 1, armsUp: 2.0 - k }) + '</g>';
    if (t > t0 + .4) { const s2 = seg(t, t0 + .4, t0 + 1.1); spl += [...Array(8)].map((_, j) => `<circle cx="${420 + i * 80 + (rnd(j + i * 9) - .5) * 220 * s2}" cy="${1620 - Math.sin(s2 * 3.14) * (60 + rnd(j) * 120)}" r="${8 + rnd(j + 2) * 8}" fill="#e8f4f8" opacity="${1 - s2}"/>`).join(''); }
  }
  return { svg: legClose(t, f) + spl + vign(.75), cam: 1.0 + .04 * p };
};

// 5 ---------------------------------------------------------------
S.watching = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, .2, .55));
  const svg = seaNight(t, 23, 1150) + `
  <g transform="translate(540 1250) scale(${1 + p * .2}) translate(-540 -1250)">
    ${fishBoat(560, 1300, 1.3, { t, crew: 0, lit: .8, driver: 0 })}
    ${driverMan({ x: 740, y: 1080, s: .75, f: -1, look: 1, armF: [150, 30], armB: [140, 40] })}
    <g transform="translate(700,875)"><rect x="-34" y="-14" width="30" height="28" rx="8" fill="#1d1f22"/><rect x="4" y="-14" width="30" height="28" rx="8" fill="#1d1f22"/></g>
    <rect x="770" y="1135" width="16" height="12" fill="#e8742a" opacity="${.5 + .5 * Math.sin(t * 6)}"/>
  </g>
  ${k > 0 ? `<line x1="120" y1="640" x2="460" y2="640" stroke="#f4efe4" stroke-width="5" stroke-dasharray="14 10"/>` + pill(290, 590, '50 M', { sc: k, bg: PAL.yel, size: 40, bold: 700 }) : ''}
  ${vign(.65)}`;
  return { svg, cam: 1.0 };
};

// 6 ---------------------------------------------------------------
S.flare = (t, d, T) => {
  const p = t / d;
  const c1 = capL('flare', 1, T, t);
  const fk = seg(t, .3, c1 - .1);
  if (t < c1 - .05) {
    const fx = lerp(160, 820, fk), fy = 760 - Math.sin(fk * Math.PI) * 420 + fk * 200;
    let trail = '';
    for (let i = 1; i < 14; i++) { const q = Math.max(0, fk - i * .02); trail += `<circle cx="${lerp(160, 820, q)}" cy="${760 - Math.sin(q * Math.PI) * 420 + q * 200}" r="${14 - i * .8}" fill="#ff7a3a" opacity="${(1 - i / 14) * .8}"/>`; }
    return { svg: seaNight(t, 25, 1150) + platform(80, 1150, .9, { t, sil: true }) + fishBoat(820, 1320, .6, { t, crew: 0, lit: .7, driver: 1 }) + trail +
      `<circle cx="${fx}" cy="${fy}" r="20" fill="#fff2c4" filter="url(#zglow)"/><circle cx="${fx}" cy="${fy}" r="${120 + Math.sin(t * 30) * 10}" fill="#ff7a3a" opacity=".18"/>` + vign(.6), cam: 1.0 };
  }
  const w = clamp(1 - (t - c1) * .7);
  const svg = `<defs><mask id="bino2"><rect width="${W}" height="${H}" fill="#000"/><circle cx="330" cy="860" r="330" fill="#fff"/><circle cx="750" cy="860" r="330" fill="#fff"/></mask></defs>
  <rect width="${W}" height="${H}" fill="#000"/>
  <g mask="url(#bino2)"><rect width="${W}" height="${H}" fill="#ff9a5a"/><rect width="${W}" height="${H}" fill="#fff" opacity="${.6 + .4 * w}"/></g>
  <rect width="${W}" height="${H}" fill="#fff" opacity="${w * .5}"/>`;
  return { svg, cam: 1.0 };
};

// 7 ---------------------------------------------------------------
S.crane = (t, d, T) => {
  const p = t / d;
  const c1 = capL('crane', 1, T, t);
  const swing = easeIO(seg(t, .1, c1));
  const drop = easeIO(seg(t, c1, d - .3));
  const pivot = [200, 520];
  const ang = lerp(-30, 25, swing);
  const tipX = pivot[0] + Math.cos(rad(ang)) * 680, tipY = pivot[1] + Math.sin(rad(ang)) * 680 - 200;
  const hookY = lerp(tipY + 160, 1180, drop);
  const svg = seaNight(t, 27, 1250) + `
  <path d="M-40 1250 L-40 560 L360 560 L360 1250 Z" fill="#1a1d24"/>
  <rect x="140" y="440" width="120" height="140" fill="#2a2e36"/>
  <line x1="${pivot[0]}" y1="${pivot[1]}" x2="${tipX}" y2="${tipY}" stroke="#b88a30" stroke-width="30" stroke-linecap="round"/>
  <line x1="${tipX}" y1="${tipY}" x2="${tipX}" y2="${hookY - 60}" stroke="#cfd4da" stroke-width="5"/>
  ${theo({ x: tipX, y: hookY + 260, s: 1.0, f: 1, look: 1, armF: [175, 0], armB: [170, 0], eyes: 'wide' })}
  <path d="M${tipX - 14} ${hookY - 70} q0 30 14 30 q14 0 14 -18" stroke="#cfd4da" stroke-width="8" fill="none"/>
  ${fishBoat(860, 1420, 1.0, { t, crew: 0, lit: .8, driver: 0 })}
  ${mateo({ x: 260, y: 560, s: .6, f: 1, look: .8, armF: [60, 20] })}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 8 ---------------------------------------------------------------
S.spin = (t, d, T) => {
  const p = t / d;
  const c1 = capL('spin', 1, T, t);
  const turn = t > c1 * .45 ? 1 : -1;
  const jump = seg(t, c1, c1 + .55);
  const cx = lerp(1150, 560, jump), cy = lerp(1500, 760, jump) - Math.sin(jump * Math.PI) * 300;
  const svg = `<rect width="${W}" height="${H}" fill="#121821"/>
  <rect x="0" y="1150" width="${W}" height="${H}" fill="#1c2a30"/>
  <rect x="80" y="300" width="380" height="300" fill="#ffcf7a" opacity=".35"/>
  ${driverMan({ x: 540, y: 1700, s: 2.6, f: turn, look: 1, eyes: jump > .8 ? 'closed' : 'wide', mouth: jump > .5 ? 'o' : 'flat', armF: jump > .8 ? [160, 20] : [20, 20], armB: jump > .8 ? [150, 20] : [-10, 10] })}
  ${jump > 0 ? `<g transform="translate(${cx},${cy}) rotate(${-30 + jump * 30})">${cat({ x: 0, y: 0, s: 1.6, f: -1, pose: 'walk', t: t * 3 })}</g>` : ''}
  ${jump > .85 ? `<text x="560" y="560" font-family="Anton" font-size="110" fill="#d98a3c" transform="rotate(12 560 560)">MRRAOW!</text>` : ''}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 9 ---------------------------------------------------------------
S.overboard = (t, d, T) => {
  const p = t / d;
  const fall = seg(t, .1, .9);
  const c1 = capL('overboard', 1, T, t), c2 = capL('overboard', 2, T, t);
  const cut = t > c1 + .6;
  const go = easeIn(seg(t, c2, d));
  const svg = seaNight(t, 29, 1250) + `<g transform="translate(${-go * 500},0)">
  ${!cut ? `<path d="M1000 1290 Q1150 1330 1300 1300" stroke="#c9b48a" stroke-width="7" fill="none"/>` : `<path d="M1000 1290 Q1030 1340 1050 1360" stroke="#c9b48a" stroke-width="7" fill="none"/><path d="M1300 1300 Q1260 1340 1240 1370" stroke="#c9b48a" stroke-width="7" fill="none" transform="translate(${(t - c1) * 200},0)"/>`}
  ${fishBoat(700, 1330, 1.2, { t, crew: 0, lit: .8, driver: 0 })}
  ${theo({ x: 760, y: 1240, s: .9, f: 1, look: 1 })}
  ${cat({ x: 870, y: 1240, s: .55, f: -1, pose: 'sit' })}
  </g>
  ${fall < 1 ? driverMan({ x: lerp(380, 240, fall), y: lerp(1240, 1500, fall * fall), s: .9, f: -1, look: -1, eyes: 'wide', mouth: 'o', armF: [160, 0], armB: [150, 0] }) : ''}
  ${fall > .8 ? [...Array(10)].map((_, j) => { const s2 = seg(t, .8, 1.6); return `<circle cx="${240 + (rnd(j) - .5) * 260 * s2}" cy="${1380 - Math.sin(s2 * 3.14) * (60 + rnd(j + 1) * 140)}" r="${10 + rnd(j + 2) * 10}" fill="#e8f4f8" opacity="${1 - s2}"/>`; }).join('') : ''}
  ${go > 0 ? `<path d="M${1300 - go * 500} 1360 Q${1600} 1400 ${1900} 1380" stroke="#e8f2f6" stroke-width="30" fill="none" opacity=".5"/>` : ''}
  ${cut ? pill(1060, 1180, 'ROPE CUT', { sc: back(seg(t, c1 + .6, c1 + .9)), bg: '#c8352c', fg: '#fff', size: 30, bold: 700 }) : ''}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 10 --------------------------------------------------------------
S.tanks = (t, d, T) => {
  const p = t / d;
  const needle = lerp(-80, 80, easeOut(seg(t, .1, 1.0)));
  const k = back(seg(t, capL('tanks', 1, T, t), capL('tanks', 1, T, t) + .35));
  const svg = `<rect width="${W}" height="${H}" fill="#2a3a4c"/>
  <g transform="translate(540,760)"><circle r="300" fill="#22252a"/><circle r="280" fill="#f3eee2"/>
    ${[...Array(9)].map((_, i) => { const a = rad(-170 + i * 20); return `<line x1="${Math.cos(a) * 200}" y1="${Math.sin(a) * 200}" x2="${Math.cos(a) * 250}" y2="${Math.sin(a) * 250}" stroke="#22252a" stroke-width="8"/>`; }).join('')}
    <path d="M${Math.cos(rad(-55)) * 230} ${Math.sin(rad(-55)) * 230} A230 230 0 0 1 ${Math.cos(rad(-10)) * 230} ${Math.sin(rad(-10)) * 230}" stroke="#4f8a6a" stroke-width="34" fill="none"/>
    <text x="-210" y="40" font-family="Anton" font-size="56" fill="#22252a">E</text><text x="180" y="40" font-family="Anton" font-size="56" fill="#4f8a6a">F</text>
    <line x1="0" y1="0" x2="0" y2="-220" stroke="#4f8a6a" stroke-width="14" stroke-linecap="round" transform="rotate(${needle})"/><circle r="26" fill="#22252a"/>
    <text x="0" y="150" text-anchor="middle" font-family="Anton" font-size="84" fill="#4f8a6a">40 GAL</text></g>
  ${k > 0 ? pill(540, 1440, 'THEIRS NOW  ✓', { sc: k, bg: '#4f8a6a', fg: '#fff', size: 48, bold: 700 }) : ''}
  ${vign(.55)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 11-13 -----------------------------------------------------------
S.radio10 = (t, d, T) => ({ svg: radioClose(t, { blink: 1 }) + vign(.6), cam: 1.0 + .05 * (t / d) });
S.fleet_voice = (t, d, T) => ({ svg: radioClose(t, { talk: 1 }) + vign(.6), cam: 1.05 + .04 * (t / d) });
S.not_alone = (t, d, T) => {
  const p = t / d;
  const svg = seaNight(t, 31, 1300) + theo({ x: 420, y: 1880, s: 3.2, f: 1, look: 1, eyes: 'wide', mouth: 'o', sweat: 1 }) + night(.15) + vign(.75);
  return { svg, cam: 1.02 + .06 * p };
};
S.fleet = (t, d, T) => {
  const p = t / d;
  const c1 = capL('fleet', 1, T, t);
  let lights = '';
  for (let i = 0; i < 12; i++) {
    const x = 70 + i * 86 + Math.sin(i * 7) * 20;
    const on = seg(t, c1 + i * .06, c1 + i * .06 + .12);
    lights += `<circle cx="${x}" cy="${1020 + Math.sin(t * 2 + i) * 3}" r="${6 + on * 4}" fill="#ffe7a0" opacity="${on}"/><rect x="${x - 2}" y="1030" width="4" height="${36 * on}" fill="#ffe7a0" opacity="${on * .35}"/>`;
  }
  const svg = seaNight(t, 33, 1010) + lights +
    `<g transform="translate(540,1520)">${fishBoat(0, 0, .55, { t, crew: 0, lit: .6 })}${theo({ x: 60, y: -60, s: .45, f: 1, look: 1 })}</g>` +
    (t > c1 + .8 ? pill(540, 640, '12 BOATS', { sc: back(seg(t, c1 + .8, c1 + 1.1)), bg: '#c8352c', fg: '#fff', size: 44, bold: 700 }) : '') + vign(.7);
  return { svg, cam: 1.0 + .05 * p };
};

// 14 --------------------------------------------------------------
S.end_card10 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 11</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE FLEET</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};

// added beat: Mango claims the fuel cans
S.mango_cans = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, .15, .6));
  const sp = [...Array(6)].map((_, i) => { const a = t * 2 + i; return `<path d="M${540 + Math.cos(a + i) * 260} ${640 + Math.sin(a * 1.3 + i) * 120} l8 -22 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 Z" fill="${PAL.yel}" opacity="${.5 + .5 * Math.sin(t * 6 + i)}"/>`; }).join('');
  const svg = seaNight(t, 41, 1250) + `
  <rect y="1150" width="${W}" height="${H}" fill="#1c2a30"/>
  ${[...Array(6)].map((_, i) => `<g transform="translate(${310 + (i % 3) * 230},${i < 3 ? 1150 : 890})"><rect x="-95" y="-120" width="190" height="240" rx="18" fill="#c8352c"/><rect x="-28" y="-150" width="56" height="36" rx="8" fill="#8a2420"/><text y="18" text-anchor="middle" font-family="Anton" font-size="46" fill="#fff">FUEL</text></g>`).join('')}
  <g transform="translate(540,770) scale(${1.6 * k})">${cat({ x: 0, y: 0, s: 1, f: 1, pose: 'sit', look: .2 })}</g>
  <g transform="translate(540,${560 - 30 * k}) scale(${k})"><path d="M-60 0 L-60 -50 L-30 -20 L0 -60 L30 -20 L60 -50 L60 0 Z" fill="${PAL.yel}" stroke="#a67c10" stroke-width="5"/></g>
  ${sp}
  ${vign(.6)}`;
  return { svg, cam: 1.0 + .05 * p };
};
