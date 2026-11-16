// ---------- Season 2 · Part 9: LIGHTS OUT ----------
function beamOver(t, on = 1) {
  const a = t * 60;
  return on ? `<path d="M560 525 L${560 + Math.cos(rad(a)) * 1400} ${525 + Math.sin(rad(a)) * 260 - 90} L${560 + Math.cos(rad(a)) * 1400} ${525 + Math.sin(rad(a)) * 260 + 90} Z" fill="#fff2b8" opacity=".16"/><circle cx="560" cy="525" r="40" fill="#fff6d0" filter="url(#zglow)"/>` : '';
}
function towerSide(t, o = {}) {
  const { scroll = 0, dark = 0 } = o;
  let rungs = '';
  for (let i = -2; i < 22; i++) { const y = ((i * 110 + scroll) % 2420) - 200; rungs += `<rect x="600" y="${y}" width="160" height="14" rx="6" fill="#55595f"/>`; }
  return `<defs>${skyG('ts29', 'night')}</defs><rect width="${W}" height="${H}" fill="url(#ts29)"/>${stars(50, 661, 1900)}
  <path d="M160 0 L900 0 L940 ${H} L120 ${H} Z" fill="#cfc8b8"/><path d="M640 0 L900 0 L940 ${H} L700 ${H} Z" fill="#b8b0a0" opacity=".6"/>
  ${[0, 1].map(i => { const y = ((i * 1100 + scroll * .9) % 2200) - 300; return `<rect x="150" y="${y}" width="800" height="200" fill="#4f6b8a"/>`; }).join('')}
  <rect x="590" y="0" width="12" height="${H}" fill="#55595f"/><rect x="758" y="0" width="12" height="${H}" fill="#55595f"/>${rungs}
  <rect width="${W}" height="${H}" fill="#05070f" opacity="${.3 + dark * .4}"/>`;
}

S.l_hook = (t, d, T) => {
  const off = t > d - .9;
  const flick = !off && t > d - 1.4 ? Math.floor(t * 20) % 2 : 1;
  const svg = islandWide(t, { kind: 'night', lamp: off ? 0 : flick }) + beamOver(t, !off && flick) + (off ? `<rect width="${W}" height="${H}" fill="#000" opacity=".45"/>` : '') + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.l_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = islandWide(t, { kind: 'night', lamp: 1 }) + beamOver(t) +
    `<path d="M-20 1920 L-20 1350 Q200 1260 420 1340 Q640 1280 900 1380 Q1000 1360 1100 1400 L1100 1920 Z" fill="#14171c"/>` +
    [[200, theo], [340, ines], [480, mateo], [620, nell]].map(([x, fn]) => fn({ x, y: 1420, s: .9, f: 1, look: 1, gun: false }).replace(/#[0-9a-fA-F]{6}/g, '#0a0c10')).join('') +
    cat({ x: 740, y: 1410, s: .8, f: 1, pose: 'sit' }).replace(/#[0-9a-fA-F]{6}/g, '#0a0c10') +
    `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="170" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 250, 'PART 9 · NIGHT 17', { bg: PAL.yel, size: 30 })}</g>` + vign(.55);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.l_on = (t, d, T) => {
  const on = t > .4;
  const svg = islandWide(t, { kind: 'night', lamp: on ? 1 : 0 }) + beamOver(t, on) + [0, 1, 2].map(i => `<g transform="translate(${1180 - i * 40},${1240 + i * 20}) scale(.28)">${fishBoat(0, 0, 1, { t, crew: 0, dark: false })}</g>`).join('') +
    (t > capL('l_on', 1, T, t) ? pill(540, 300, 'SAFE?', { sc: back(seg(t, capL('l_on', 1, T, t), capL('l_on', 1, T, t) + .3)), bg: '#25282c', fg: '#fff', size: 40, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.l_blind = (t, d, T) => {
  const c1 = capL('l_blind', 1, T, t);
  const ang = t * 90;
  const svg = `<rect width="${W}" height="${H}" fill="#0f1d34"/>${waveDashes(0, 1900, t, '#8aa6c4', 40, 671, .2)}
  <circle cx="540" cy="820" r="380" fill="#3a3a30"/><circle cx="540" cy="820" r="320" fill="#2c3a2a"/>
  <g transform="rotate(${ang} 540 820)"><path d="M540 820 L1200 640 L1200 1000 Z" fill="#fff2b8" opacity=".25"/></g>
  <path d="M540 820 L${540 + Math.cos(rad(60)) * 420} ${820 + Math.sin(rad(60)) * 420} A420 420 0 0 1 ${540 + Math.cos(rad(120)) * 420} ${820 + Math.sin(rad(120)) * 420} Z" fill="#0a0c10" opacity=".85" stroke="${PAL.red}" stroke-width="10" stroke-dasharray="24 14"/>
  ${t > c1 ? `<path d="M${540 + Math.cos(rad(65)) * 330} ${820 + Math.sin(rad(65)) * 330} A330 330 0 0 1 ${540 + Math.cos(rad(115)) * 330} ${820 + Math.sin(rad(115)) * 330}" stroke="#7a5a3a" stroke-width="26" fill="none" opacity="${seg(t, c1, c1 + .3)}"/>` + pill(540, 1500, 'FIRE WALL: NO FUEL', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 34, bold: 700 }) : ''}
  <circle cx="540" cy="820" r="46" fill="#e9e2d3"/><circle cx="540" cy="820" r="22" fill="#fff6d0" filter="url(#zglow)"/>
  ${pill(540, 330, 'BLIND SPOT', { sc: back(seg(t, .1, .4)), bg: PAL.red, fg: '#fff', size: 40, bold: 700 })}` + vign(.4);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.l_heads = (t, d, T) => ({ svg: darkBeach(t, { wall: 1, heads: seg(t, .3, d + .5) }) + vign(.6), cam: 1.0 + .05 * (t / d) });
S.l_ines = (t, d, T) => ({ svg: islandWide(t, { kind: 'night', lamp: 1 }) + beamOver(t) + `<rect width="${W}" height="${H}" fill="#000" opacity=".3"/>` + ines({ x: 420, y: 1700, s: 3.0, f: 1, look: .6, mouth: talkM(t), gun: false, armF: [40, 30] }) + vign(.6), cam: 1.02 + .04 * (t / d) });
S.l_plan = (t, d, T) => ({ svg: islandWide(t, { kind: 'night', lamp: 1 }) + beamOver(t) + `<rect width="${W}" height="${H}" fill="#000" opacity=".3"/>` + theo({ x: 460, y: 1720, s: 3.0, f: 1, look: .6, eyes: capL('l_plan', 1, T, t) < t ? 'open' : 'closed', armF: [100, 120] }) + vign(.6), cam: 1.02 + .05 * (t / d) });
S.l_rule = (t, d, T) => {
  const c1 = capL('l_rule', 1, T, t);
  const x = seg(t, c1, c1 + .5);
  const svg = notebook(t, `<text x="540" y="560" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="104" fill="#3a2214">Never let the</text><text x="540" y="700" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="118" fill="#9a2a1e">light go out.</text>
    ${x > 0 ? `<line x1="200" y1="${700 - 220 * x}" x2="${200 + 680 * x}" y2="${480 + 220 * x}" stroke="${PAL.red}" stroke-width="22" stroke-linecap="round"/>` : ''}`, { sub: '— Nell' }) + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.l_climb = (t, d, T) => {
  const svg = towerSide(t, { scroll: t * 140 }) + theo({ x: 640, y: 1180, s: 1.4, f: 1, armF: [125 + Math.sin(t * 5) * 10, 30], armB: [140 - Math.sin(t * 5) * 10, 20], look: -.5 }) +
    cat({ x: 690, y: 560, s: 1.0, f: 1, pose: 'sit', look: -.4 }) + vign(.55);
  return { svg, cam: 1.0 + .03 * (t / d) };
};
S.l_mango = (t, d, T) => {
  const c1 = capL('l_mango', 1, T, t);
  const svg = towerSide(t, { scroll: 20 }) + cat({ x: 680, y: 900, s: 2.0, f: -1, pose: 'sit', look: t > c1 ? -.8 : 0 }) + theo({ x: 640, y: 1900, s: 1.6, f: 1, armF: [125, 30], armB: [140, 20], look: -1, sweat: 1 }) +
    (t > c1 ? pill(540, 360, 'LEADER', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 40, bold: 700 }) : '') + vign(.55);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
function lampTop(t, o = {}) {
  return nightLampRoom(t, o) + `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48"/><path d="M540 1100 Q520 1200 300 1220 Q100 1240 60 1300" stroke="#1d1f22" stroke-width="22" fill="none"/>`;
}
S.l_cable = (t, d, T) => {
  const c1 = capL('l_cable', 1, T, t);
  const svg = lampTop(t) + theo({ x: 200, y: 1300, s: 1.4, f: 1, pose: 'kneel', look: 1, armF: [60, 40] }) +
    vera({ x: 860, y: 1200, s: 1.4, f: t > c1 + .3 ? -1 : 1, look: 0, eyes: t > c1 + .3 ? 'wide' : 'open' }) + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.l_vera = (t, d, T) => ({ svg: lampTop(t) + `<rect width="${W}" height="${H}" fill="#2a0a0a" opacity=".3"/>` + vera({ x: 560, y: 1730, s: 3.0, f: -1, mouth: talkM(t), armF: [90, 10] }) + vign(.6), cam: 1.03 + .05 * (t / d) });
S.l_pull = (t, d, T) => {
  const pulled = t > .6;
  const sp = t > .5 && t < .9;
  const svg = (pulled ? lampRoom(t, { lens: 0, sky: 'night' }).replace(/fill="#5d86a6"/, 'fill="#0f1d34"').replace(/<g transform="translate\(860,1290\)">[\s\S]*?FUEL<\/text><\/g>/, '') + `<rect width="${W}" height="${H}" fill="#000" opacity=".55"/>` : lampTop(t)) +
    `<rect x="0" y="1150" width="${W}" height="800" fill="#3a3f48" opacity="${pulled ? .4 : 1}"/>` +
    theo({ x: 300, y: 1300, s: 1.5, f: 1, lean: pulled ? -20 : 0, armF: [pulled ? 140 : 60, 10], armB: [pulled ? 130 : 50, 10] }) +
    (sp ? [...Array(10)].map((_, i) => `<line x1="460" y1="1080" x2="${460 + Math.cos(i * .7) * 90}" y2="${1080 + Math.sin(i * 1.3) * 90}" stroke="#ffe27a" stroke-width="6"/>`).join('') : '') + vign(.6);
  const sh = sp ? (rnd(Math.floor(t * 60)) - .5) * 18 : 0;
  return { svg: `<g transform="translate(${sh},0)">${svg}</g>`, cam: 1.03 };
};
S.l_dark = (t, d, T) => {
  const c1 = capL('l_dark', 1, T, t);
  let eyes = '';
  if (t > c1) for (let i = 0; i < 40; i++) {
    const a = rnd(i) * 6.28, r = 520 + rnd(i + 3) * 380, k = seg(t, c1 + i * .03, c1 + i * .03 + .4);
    const x = 480 + Math.cos(a) * r, y = 1200 + Math.sin(a) * r * .35;
    eyes += `<g opacity="${k}"><circle cx="${x}" cy="${y}" r="5" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="${x + 16}" cy="${y}" r="5" fill="#e9f5d0" filter="url(#zglow)"/></g>`;
  }
  const svg = islandWide(t, { kind: 'night', lamp: 0, boatX: -500 }) + `<rect width="${W}" height="${H}" fill="#000" opacity=".5"/>` + eyes + vign(.6);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.l_run = (t, d, T) => {
  const c1 = capL('l_run', 1, T, t);
  const k = seg(t, 0, d);
  let crew = '';
  for (let i = 0; i < 5; i++) crew += driverMan({ x: lerp(200 + i * 60, 760 + i * 40, k), y: 1150 + (i % 2) * 30, s: 1.0, f: 1, walk: t * 12 + i }).replace(/#e8742a/g, '#2f5a63').replace(/#c45a18/g, '#24474e');
  const svg = `<defs>${skyG('lr29', 'night')}</defs><rect width="${W}" height="${H}" fill="url(#lr29)"/>${stars(40, 681, 800)}
  <rect y="1000" width="${W}" height="${H}" fill="#0f1d34"/><rect y="1000" width="${W}" height="200" fill="#2a2a24"/>
  ${[0, 1, 2].map(i => `<g transform="translate(${880 + i * 70},${1250 + i * 30}) scale(.45)">${fishBoat(0, 0, 1, { t, crew: 0, dark: true })}</g>`).join('')}
  ${crew}${t > c1 ? vera({ x: lerp(300, 820, seg(t, c1, d)), y: 1170, s: 1.1, f: 1, walk: t * 12 }) : ''}
  ${[...Array(6)].map((_, i) => zomb({ x: lerp(-120, 300, k) - i * 70, y: 1180, s: .5, t, ph: i, col: '#0a0d12', eyes: 1 })).join('')}` + `<rect width="${W}" height="${H}" fill="#000" opacity=".25"/>` + vign(.55);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.l_ladder = (t, d, T) => {
  const c1 = capL('l_ladder', 1, T, t);
  const rise = t > c1 ? seg(t, c1, d + .3) : 0;
  const svg = `<defs>${skyG('ll29', 'night')}</defs><rect width="${W}" height="${H}" fill="url(#ll29)"/>${stars(60, 691, 900)}
  <rect x="0" y="900" width="${W}" height="30" fill="#2b2f36"/>${[...Array(12)].map((_, i) => `<rect x="${i * 96}" y="900" width="12" height="260" fill="#2b2f36"/>`).join('')}<rect x="0" y="1150" width="${W}" height="20" fill="#2b2f36"/>
  <rect y="1170" width="${W}" height="${H}" fill="#1a1d22"/>
  <rect x="640" y="1170" width="12" height="800" fill="#55595f"/><rect x="800" y="1170" width="12" height="800" fill="#55595f"/>${[...Array(7)].map((_, i) => `<rect x="640" y="${1200 + i * 110}" width="172" height="12" fill="#55595f"/>`).join('')}
  ${theo({ x: 360, y: 1150, s: 1.5, f: 1, look: .8, eyes: t > c1 ? 'wide' : 'open' })}${cat({ x: 520, y: 1150, s: 1.0, f: 1, pose: 'sit', ears: t > c1 ? 1 : 0 })}
  ${rise > 0 ? `<g transform="translate(726,${lerp(2000, 1230, rise)})">${zomb({ x: 0, y: 0, s: 1.1, t, col: '#0a0d12', eyes: 1, armsUp: 1.6 })}</g>` : ''}` + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.end_l = tomorrowCard(0, 'FINALE');
