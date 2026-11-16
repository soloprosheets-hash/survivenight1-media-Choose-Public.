// ---------- Season 2 · Part 10: FINALE ----------
function oldLamp(x, y, s = 1, flame = 0, t = 0) {
  const fl = flame * (1 + Math.sin(t * 20) * .08);
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${flame > 0 ? `<circle cx="0" cy="-120" r="${60 + fl * 260}" fill="#ffb03a" opacity="${.12 + fl * .2}"/>` : ''}
    <rect x="-70" y="-20" width="140" height="30" rx="8" fill="#8a6a2a"/><rect x="-50" y="-200" width="100" height="180" rx="40" fill="#e8dcc0" opacity=".35" stroke="#8a6a2a" stroke-width="10"/>
    <path d="M-60 -200 L60 -200 L30 -240 L-30 -240 Z" fill="#8a6a2a"/><circle cx="0" cy="-252" r="14" fill="none" stroke="#8a6a2a" stroke-width="8"/>
    ${flame > 0 ? `<path d="M-${16 + fl * 20} -40 Q0 ${-80 - fl * 120} ${16 + fl * 20} -40 Z" fill="#ffd27a"/><path d="M-8 -40 Q0 ${-60 - fl * 60} 8 -40 Z" fill="#fff6d0"/>` : ''}
  </g>`;
}
function darkTop(t, o = {}) {
  const { glow = 0 } = o;
  return `<defs>${skyG('dt30', 'night')}</defs><rect width="${W}" height="${H}" fill="url(#dt30)"/>${stars(60, 701, 900)}
  ${[60, 330, 600, 870].map(x => `<rect x="${x}" y="200" width="22" height="1000" fill="#1d2028"/>`).join('')}<rect x="0" y="180" width="${W}" height="40" fill="#1d2028"/>
  <rect y="1150" width="${W}" height="${H}" fill="#24272e"/>
  <rect width="${W}" height="${H}" fill="#ffb03a" opacity="${glow * .15}"/>`;
}
function windLines(t, n = 6, op = .5) {
  return [...Array(n)].map((_, i) => { const x = ((t * 900 + i * 260) % 1400) - 200; return `<path d="M${x} ${700 + i * 70} q60 -20 120 0 q60 20 120 0" stroke="#cfe0ea" stroke-width="5" fill="none" opacity="${op}"/>`; }).join('');
}
function seasonCard(t, title, sub) {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .45, .95)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  ${cat({ x: 540, y: 640, s: 1.2, f: 1, pose: 'sit' }).replace(/<g transform="translate\(540,640\)/, `<g opacity="${c}" transform="translate(540,640)`)}
  <text x="540" y="880" text-anchor="middle" font-family="Anton" font-size="140" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6">${title}</text>
  <rect x="${540 - 220 * b}" y="935" width="${440 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Anton" font-size="90" fill="${PAL.red}" letter-spacing="10" opacity="${b}">${sub}</text>
  <text x="540" y="1140" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW SO YOU DON'T MISS IT</text>`, cam: 1 };
}

S.f_hook = (t, d, T) => {
  let eyes = '';
  for (let i = 0; i < 46; i++) { const a = rnd(i) * 6.28, r = 200 + rnd(i + 3) * 700, k = seg(t, i * .04, i * .04 + .3); const x = 480 + Math.cos(a) * r, y = 1180 + Math.sin(a) * r * .3; eyes += `<g opacity="${k}"><circle cx="${x}" cy="${y}" r="5" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="${x + 16}" cy="${y}" r="5" fill="#e9f5d0" filter="url(#zglow)"/></g>`; }
  return { svg: islandWide(t, { kind: 'night', lamp: 0, boatX: -500 }) + `<rect width="${W}" height="${H}" fill="#000" opacity=".5"/>` + eyes + vign(.6), cam: 1.04 + .05 * (t / d) };
};
S.f_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = darkTop(t) + `<rect x="0" y="900" width="${W}" height="30" fill="#2b2f36"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="900" width="12" height="260" fill="#2b2f36"/>`).join('')}` +
    theo({ x: 360, y: 1150, s: 1.5, f: 1, look: .8, eyes: 'wide' }) + cat({ x: 520, y: 1150, s: 1.0, f: 1, pose: 'sit', ears: 1 }) +
    `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="170" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">FINALE</text>
    ${pill(540, 250, 'SEASON 2 · PART 10', { bg: PAL.yel, size: 30 })}</g>` + vign(.55);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.f_kick = (t, d, T) => {
  const c1 = capL('f_kick', 1, T, t);
  const fall = easeIn(seg(t, c1 - .3, d));
  const svg = darkTop(t) + `<rect x="0" y="900" width="${W}" height="30" fill="#2b2f36"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="900" width="12" height="260" fill="#2b2f36"/>`).join('')}` +
    `<g transform="rotate(${fall * 40} 726 1900) translate(0,${fall * 500})"><rect x="640" y="1170" width="12" height="900" fill="#55595f"/><rect x="800" y="1170" width="12" height="900" fill="#55595f"/>${[...Array(7)].map((_, i) => `<rect x="640" y="${1200 + i * 110}" width="172" height="12" fill="#55595f"/>`).join('')}
    ${zomb({ x: 726, y: 1450, s: 1.1, t, col: '#0a0d12', eyes: 1, armsUp: 1.6 })}</g>` +
    theo({ x: 560, y: 1150, s: 1.5, f: 1, lean: t < c1 ? 10 : 0, look: .5 }) + vign(.55);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.f_below = (t, d, T) => {
  const c1 = capL('f_below', 1, T, t);
  let zs = '';
  for (let i = 0; i < 18; i++) zs += zomb({ x: 160 + (i * 97) % 760 + Math.sin(t + i) * 10, y: 1150 + (i % 3) * 40, s: .22, t, ph: i, col: '#0a0d12', eyes: 1, armsUp: .4 });
  const svg = islandWide(t, { kind: 'night', lamp: 0, boatX: -500 }) + `<rect width="${W}" height="${H}" fill="#000" opacity=".35"/>` + zs +
    (t > c1 ? [0, 1, 2].map(i => `<g transform="translate(${lerp(900, 1250, seg(t, c1, d)) + i * 60},${1300 + i * 40}) scale(.25)">${fishBoat(0, 0, 1, { t, crew: 0, dark: true })}</g>`).join('') : '') + vign(.6);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.f_radio = (t, d, T) => ({ svg: radioClose(t, { talk: 1 }) + vign(.6), cam: 1.03 + .04 * (t / d) });
S.f_pour = (t, d, T) => {
  const c1 = capL('f_pour', 1, T, t);
  const tarp = easeOut(seg(t, .1, .7));
  const svg = darkTop(t) + oldLamp(560, 1130, 1.3, 0) +
    `<g transform="translate(${860 + tarp * 200},1150)"><rect x="-60" y="-140" width="120" height="140" rx="12" fill="#c8352c"/></g><path d="M${780 + tarp * 300} 990 L${940 + tarp * 300} 990 L${980 + tarp * 300} 1150 L${740 + tarp * 300} 1150 Z" fill="#4a5a3a" opacity="${1 - tarp}"/>` +
    theo({ x: 300, y: 1150, s: 1.4, f: 1, look: 1, armF: [t > c1 ? 100 : 40, 20] }) +
    (t > c1 + 1 ? `<circle cx="480" cy="900" r="10" fill="#ffd27a" filter="url(#zglow)"/>` : '') + vign(.6);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.f_wind = (t, d, T) => {
  const c = [0, 1, 2].map(i => capL('f_wind', i, T, t));
  const lit = (t > c[0] - .3 && t < c[0] + .2) || (t > c[1] - .5 && t < c[1] + .05);
  const svg = `<rect width="${W}" height="${H}" fill="#0c0d12"/>${windLines(t, 8, .45)}
  <g transform="translate(540,900) rotate(-20)"><rect x="-12" y="0" width="24" height="320" rx="6" fill="#e8d8b0"/><circle cx="0" cy="-6" r="22" fill="#c8352c"/>
  ${lit ? `<path d="M-30 -10 Q0 -150 30 -10 Z" fill="#ffb03a"/><path d="M-14 -10 Q0 -80 14 -10 Z" fill="#fff6d0"/>` : `<path d="M0 -30 q20 -40 0 -80 q-20 -40 0 -80" stroke="#8a8f96" stroke-width="6" fill="none" opacity=".6"/>`}</g>
  ${t > c[2] ? `<g transform="translate(540,1500) scale(${back(seg(t, c[2], c[2] + .3))})"><rect x="-150" y="-70" width="300" height="140" rx="14" fill="#c8352c"/><text x="0" y="22" text-anchor="middle" font-family="Anton" font-size="60" fill="#fff">2 LEFT</text></g>` : ''}` + vign(.6);
  return { svg, cam: 1.03 + .05 * (t / d) };
};
S.f_mango = (t, d, T) => {
  const c1 = capL('f_mango', 1, T, t);
  const svg = darkTop(t) + windLines(t, 6, .4) + `<rect x="0" y="600" width="300" height="600" fill="#0c0d12" opacity="0"/>` +
    oldLamp(700, 1130, 1.3, 0) + cat({ x: 460, y: 1150, s: 1.8, f: 1, pose: 'sit', look: -.5, ears: 0 }) +
    (t > c1 ? pill(460, 760, 'WIND BLOCKER', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 34, bold: 700 }) : '') + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.f_light = (t, d, T) => {
  const c1 = capL('f_light', 1, T, t);
  const fl = t < c1 ? seg(t, .2, .6) * .15 : .15 + .85 * easeOut(seg(t, c1, c1 + .8));
  const svg = darkTop(t, { glow: fl }) + oldLamp(560, 1130, 1.5, fl, t) + cat({ x: 300, y: 1150, s: 1.3, f: 1, pose: 'sit', look: .6 }) +
    theo({ x: 840, y: 1150, s: 1.4, f: -1, look: 0, eyes: t > c1 ? 'wide' : 'open' }) + vign(.5 - fl * .2);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.f_beam = (t, d, T) => {
  const c1 = capL('f_beam', 1, T, t);
  const away = t > c1 ? seg(t, c1, d) : 0;
  let zs = '';
  for (let i = 0; i < 14; i++) { const x0 = 220 + (i * 61) % 600, x1 = x0 < 480 ? x0 - 400 : x0 + 400; zs += `<g opacity="${1 - clamp(away * 1.2 - (i % 5) * .1)}">${zomb({ x: lerp(x0, x1, away), y: 1150 + (i % 3) * 40 + away * 200, s: .22, t, ph: i, col: '#0a0d12', eyes: 1, back: away > 0, armsUp: .3 })}</g>`; }
  const a = t * 60;
  const svg = islandWide(t, { kind: 'night', lamp: 1, boatX: -500 }).replace(/#f6d98a/g, '#ffb03a') +
    `<path d="M560 525 L${560 + Math.cos(rad(a)) * 1400} ${525 + Math.sin(rad(a)) * 300 - 100} L${560 + Math.cos(rad(a)) * 1400} ${525 + Math.sin(rad(a)) * 300 + 100} Z" fill="#ffcf7a" opacity=".2"/><circle cx="560" cy="525" r="46" fill="#ffd27a" filter="url(#zglow)"/>` + zs + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.f_dawn = (t, d, T) => {
  const c1 = capL('f_dawn', 1, T, t);
  const svg = sandStrip(t, .1, { kind: 'dawn' }) + `<g transform="translate(560,1110) rotate(-8) scale(1.1)">${fishBoat(0, 0, 1, { t: 0, crew: 0, dark: false })}</g>` +
    (t > c1 ? pill(560, 820, 'EMPTY', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 40, bold: 700 }) : '') + vign(.4);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.f_keeper = (t, d, T) => {
  const k = easeOut(seg(t, 0, d * .7));
  const svg = lampRoom(t, { lens: 0, sky: 'dawn', needle: .2 }).replace(/<g transform="translate\(860,1290\)">[\s\S]*?FUEL<\/text><\/g>/, '') + `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/>` +
    oldLamp(540, 1130, 1.2, .5, t) + `<g transform="translate(0,${(1 - k) * 500})">${nell({ x: 820, y: 1150, s: 1.4, f: -1, look: 0 })}</g>` +
    theo({ x: 230, y: 1150, s: 1.4, f: 1, look: 1 }) + ines({ x: 380, y: 1150, s: 1.2, f: 1, gun: false }) + mateo({ x: 110, y: 1150, s: 1.2, f: 1 }) + cat({ x: 640, y: 1150, s: 1.0, f: -1, pose: 'sit' }) + vign(.4);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.f_never = (t, d, T) => ({ svg: lampRoom(t, { lens: 0, sky: 'dawn', needle: .2 }).replace(/<g transform="translate\(860,1290\)">[\s\S]*?FUEL<\/text><\/g>/, '') + oldLamp(820, 1100, 1.0, .5, t) + nell({ x: 500, y: 1730, s: 3.0, f: 1, look: .5, mouth: talkM(t), armF: [40, 30] }) + vign(.45), cam: 1.02 + .04 * (t / d) });
S.f_voices = (t, d, T) => {
  const c = [0, 1, 2, 3].map(i => capL('f_voices', i, T, t));
  let svg;
  if (t < c[2]) svg = radioClose(t, { talk: t > c[1] ? 1 : 0 }) + (t > c[1] ? [...Array(8)].map((_, i) => `<text x="${100 + (i * 137) % 860}" y="${300 + (i * 211) % 900}" font-family="Oswald" font-weight="600" font-size="34" fill="#9ef0a8" opacity="${.3 + .4 * Math.abs(Math.sin(t * 3 + i))}">${['...we see it...', '...is anyone there...', '...the lighthouse...', '...we have kids...', '...coming tonight...', '...hello?...', '...please...', '...light on the island...'][i]}</text>`).join('') : '');
  else {
    let lights = '';
    for (let i = 0; i < 60; i++) { const k = seg(t, c[2] + i * .02, c[2] + i * .02 + .3); lights += `<circle cx="${rnd(i) * W}" cy="${930 + rnd(i + 9) * 40}" r="${3 + rnd(i) * 3}" fill="#ffd98a" opacity="${k * (.5 + .5 * Math.sin(t * 5 + i))}" filter="url(#zglow)"/>`; }
    svg = `<defs>${skyG('fv30', 'night')}</defs><rect width="${W}" height="${H}" fill="url(#fv30)"/>${stars(60, 711, 850)}
      <path d="M-20 960 Q200 900 400 940 Q700 890 1100 950 L1100 980 L-20 980 Z" fill="#0a0c12"/>${lights}
      <rect y="975" width="${W}" height="${H}" fill="#0f1d34"/>${waveDashes(985, 1900, t, '#8aa6c4', 24, 721, .2)}
      ${[0, 1, 2, 3, 4].map(i => `<g transform="translate(${100 + i * 220},${1000 + (i % 2) * 20}) scale(.12)">${fishBoat(0, 0, 1, { t, crew: 0, dark: true, lit: 1 })}</g>`).join('')}
      <rect x="0" y="1720" width="${W}" height="16" fill="#0a0c10"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="1720" width="12" height="240" fill="#0a0c10"/>`).join('')}
      ${theo({ x: 300, y: 1720, s: 1.5, f: 1, look: 1 }).replace(/#[0-9a-fA-F]{6}/g, '#0a0c10')}${cat({ x: 460, y: 1720, s: 1.1, f: 1, pose: 'sit', ears: 1 }).replace(/#d98a3c|#b86d27|#f4d7b0/g, '#0a0c10')}`;
  }
  return { svg: svg + vign(.55), cam: 1.0 + .04 * (t / d) };
};
S.end_f = (t, d, T) => seasonCard(t, 'SEASON 3', 'COMING SOON');
