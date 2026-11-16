// ---------- Season 2 · Part 5: NELL ----------
function bridgeNight(t, o = {}) { return bridgeRoom(t, { kind: 'night', bar: 0, ...o }) + `<rect width="${W}" height="${H}" fill="#05070f" opacity=".25"/>`; }
function doorClose(t, o = {}) {
  const { pipe = 1, shake = 0 } = o;
  return `<rect width="${W}" height="${H}" fill="#2a2420"/>
  <g transform="translate(${shake},0)"><rect x="200" y="260" width="680" height="1180" rx="10" fill="#5a4e44"/><rect x="230" y="290" width="620" height="1120" fill="#6a5a4e"/>
  <rect x="300" y="380" width="200" height="200" rx="100" fill="#1a2030"/><rect x="580" y="380" width="200" height="200" rx="100" fill="#1a2030"/>
  <rect x="380" y="820" width="40" height="160" rx="12" fill="#9aa3ab"/><rect x="660" y="820" width="40" height="160" rx="12" fill="#9aa3ab"/></g>
  <rect x="${lerp(1100, 300, pipe)}" y="880" width="560" height="40" rx="14" fill="#8a8f96"/><rect x="${lerp(1100, 300, pipe)}" y="880" width="560" height="12" rx="6" fill="#b8bec5"/>`;
}

S.n_hook = (t, d, T) => {
  let eyes = '';
  for (let i = 0; i < 14; i++) {
    const k = seg(t, .2 + i * .15, .5 + i * .15);
    const x = 200 + rnd(i) * 680, y = 900 + rnd(i + 5) * 900;
    eyes += `<g opacity="${k}"><circle cx="${x}" cy="${y}" r="7" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="${x + 24}" cy="${y + 2}" r="7" fill="#e9f5d0" filter="url(#zglow)"/></g>`;
  }
  return { svg: wreckHall(t, { beamX: 540 + Math.sin(t * 2) * 100, water: .5 }) + eyes + vign(.6), cam: 1.02 + .06 * (t / d) };
};
S.n_recap = (t, d, T) => {
  const ti = easeOut(seg(t, 0, .5));
  const svg = wreckClose(t, { kind: 'night', hole: 1 }).replace(/fill="#cdb98a"/, 'fill="#0f1d34"') + `<circle cx="860" cy="200" r="70" fill="#e8edf2" opacity=".9"/>
    <g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})"><text x="540" y="170" text-anchor="middle" font-family="Anton" font-size="120" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">SEASON 2</text>
    ${pill(540, 250, 'PART 5 · NIGHT 15', { bg: PAL.yel, size: 30 })}</g>` + `<rect width="${W}" height="${H}" fill="#05070f" opacity=".35"/>` + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.n_door = (t, d, T) => {
  const p = easeIO(seg(t, d * .45, d - .2));
  const slam = t < .5 ? (rnd(Math.floor(t * 60)) - .5) * 20 : 0;
  return { svg: doorClose(t, { pipe: p, shake: slam }) + nell({ x: 960, y: 1700, s: 1.5, f: -1, armF: [80, 0], armB: [70, 0] }) + vign(.5), cam: 1.02 };
};
S.n_bang = (t, d, T) => {
  const c = [0, 1, 2].map(i => capL('n_bang', i, T, t));
  const hits = [c[0] + .3, c[1] + .1];
  let sh = 0, txt = '';
  hits.forEach((h, i) => { if (t > h && t < h + .2) sh = 22 * (rnd(Math.floor(t * 60)) - .5); if (t > h) txt += `<text x="${300 + i * 260}" y="${360 + i * 60}" font-family="Anton" font-size="110" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke" opacity="${t > c[2] ? .25 : 1}">BANG</text>`; });
  return { svg: doorClose(t, { shake: sh }) + txt + (t > c[2] ? `<rect width="${W}" height="${H}" fill="#000" opacity="${seg(t, c[2], d) * .3}"/>` : '') + vign(.55), cam: 1.03 };
};
S.n_nell = (t, d, T) => ({ svg: bridgeNight(t) + nell({ x: 540, y: 1730, s: 3.0, f: -1, look: 0, mouth: talkM(t), armF: [40, 20] }) + vign(.55), cam: 1.02 + .04 * (t / d) });
S.n_story = (t, d, T) => {
  const c1 = capL('n_story', 1, T, t);
  let svg;
  if (t < c1) svg = islandWide(t, { kind: 'dusk', lamp: Math.max(0, 1 - seg(t, .3, c1 - .2)) }) + pill(540, 300, 'BEFORE', { bg: '#25282c', fg: '#e8d8b0', size: 34, bold: 700 });
  else {
    const k = seg(t, c1, d);
    svg = `<defs>${skyG('ns25', 'dusk')}</defs><rect width="${W}" height="${H}" fill="url(#ns25)"/><rect y="900" width="${W}" height="${H}" fill="#3c4a6a"/>${waveDashes(910, 1900, t, '#f2b68a', 24, 591, .3)}
      ${ferryWreck(820, 880, .55)}${islandShape(160, 1000, .4, '#55663f')}
      <g transform="translate(${lerp(260, 640, k)},${lerp(1250, 1000, k)}) scale(${lerp(1, .6, k)})"><path d="M-110 0 L110 0 L90 40 L-90 40 Z" fill="#6b4a32"/>${nell({ x: 0, y: 0, s: .7, f: 1, pose: 'sit', armF: [60 + Math.sin(t * 4) * 30, 20] })}</g>`;
  }
  return { svg: svg + `<rect width="${W}" height="${H}" fill="#b08a50" opacity=".22"/>` + vign(.55), cam: 1.0 + .03 * (t / d) };
};
S.n_signal = (t, d, T) => {
  const on = MORSE_ON(t * 1.3);
  const svg = bridgeNight(t) + `<g transform="translate(540,620)">${on ? `<path d="M0 0 L-400 -60 L-400 60 Z" fill="#fff2b8" opacity=".3"/>` : ''}</g>` +
    `<g transform="translate(330,500) scale(.4)">${lighthouse(0, 0, 1, 0, PAL_LH)}</g>` +
    nell({ x: 700, y: 1450, s: 1.5, f: -1, armF: [100, 10] }) + `<g transform="translate(560,1100)"><rect x="-60" y="-70" width="120" height="90" rx="16" fill="#2b2f36"/><circle cx="-10" cy="-25" r="34" fill="${on ? '#fff6d0' : '#4a4a40'}" ${on ? 'filter="url(#zglow)"' : ''}/></g>` + vign(.55);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.n_theo = (t, d, T) => ({ svg: bridgeNight(t) + theo({ x: 460, y: 1720, s: 3.0, f: 1, look: .6, mouth: talkM(t) }) + vign(.55), cam: 1.03 });
S.n_count = (t, d, T) => {
  const c1 = capL('n_count', 1, T, t);
  let eyes = '';
  if (t > c1) for (let i = 0; i < 20; i++) {
    const k = seg(t, c1 + i * .06, c1 + i * .06 + .3);
    eyes += `<g opacity="${k}" transform="rotate(-6 540 900)"><circle cx="${-30 + (i % 9) * 96 + 18}" cy="${380 + Math.floor(i / 9) * 380 + 20}" r="6" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="${-30 + (i % 9) * 96 + 40}" cy="${380 + Math.floor(i / 9) * 380 + 20}" r="6" fill="#e9f5d0" filter="url(#zglow)"/></g>`;
  }
  const svg = wreckClose(t, { kind: 'night' }).replace(/fill="#cdb98a"/, 'fill="#0f1d34"') + `<rect width="${W}" height="${H}" fill="#05070f" opacity=".4"/>` + eyes +
    pill(540, 220, '200 PASSENGERS', { sc: back(seg(t, .2, .5)), bg: PAL.red, fg: '#fff', size: 40, bold: 700 }) + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.n_night = (t, d, T) => {
  const c1 = capL('n_night', 1, T, t);
  const scr = t > c1 ? [0, 1, 2].map(i => `<text x="${[120, 640, 360][i]}" y="${[1600, 1500, 1750][i]}" font-family="Anton" font-size="${60 + i * 6}" fill="#c8352c" opacity="${.3 + .5 * Math.abs(Math.sin(t * 3 + i))}" transform="rotate(${-10 + i * 8} 400 1600)">SCRTCH</text>`).join('') : '';
  const svg = bridgeNight(t) + `<rect width="${W}" height="${H}" fill="#000" opacity=".25"/>` +
    theo({ x: 300, y: 1450, s: 1.3, f: 1, pose: 'sit', eyes: 'wide' }) + mateo({ x: 520, y: 1450, s: 1.3, f: 1, pose: 'sit', eyes: 'wide' }) + nell({ x: 760, y: 1450, s: 1.3, f: -1, pose: 'sit' }) + scr + vign(.6);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.n_lap = (t, d, T) => {
  const svg = bridgeNight(t) + nell({ x: 600, y: 1450, s: 1.6, f: -1, pose: 'sit', eyes: 'closed', armF: [70, 70] }) +
    cat({ x: 520, y: 1200, s: 1.1, f: 1, pose: 'sleep', t }) +
    `<text x="${420 + ((t * 30) % 40)}" y="${1020 - ((t * 30) % 40)}" font-family="Anton" font-size="60" fill="#f4efe4" opacity=".7">z</text>` +
    theo({ x: 250, y: 1450, s: 1.3, f: 1, pose: 'sit', eyes: 'closed' }) + vign(.55);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.n_dawn = (t, d, T) => ({ svg: bridgeRoom(t, { kind: 'dawn', bar: easeIO(seg(t, 0, d)) }) + pill(540, 820, 'LOW TIDE', { sc: back(seg(t, .4, .7)), bg: '#d9c592', size: 36, bold: 700 }) + vign(.4), cam: 1.0 + .04 * (t / d) });
S.n_missing = (t, d, T) => {
  const c1 = capL('n_missing', 1, T, t);
  const svg = bridgeRoom(t, { kind: 'dawn', bar: 1 }) + nell({ x: 640, y: 1450, s: 1.6, f: -1, pose: 'sit', eyes: t > c1 ? 'wide' : 'closed', armF: [70, 70] }) +
    theo({ x: 300, y: 1450, s: 1.5, f: 1, look: 1, armF: [lerp(20, 90, seg(t, .2, c1)), 0], eyes: t > c1 ? 'wide' : 'open' }) +
    (t > c1 ? pill(540, 330, 'MANGO?', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.red, fg: '#fff', size: 46, bold: 700 }) : '') + vign(.45);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.n_hole = (t, d, T) => {
  const z = 1 + .8 * easeIO(seg(t, 0, d));
  let paws = '';
  for (let i = 0; i < 6; i++) paws += `<g transform="translate(${300 + i * 45 + (i % 2) * 20},${300 + i * 90}) rotate(160)" opacity="${seg(t, .1 + i * .1, .3 + i * .1)}"><ellipse rx="14" ry="12" fill="#3a2a1c"/>${[-12, -4, 4, 12].map(x => `<circle cx="${x}" cy="-16" r="5" fill="#3a2a1c"/>`).join('')}</g>`;
  const svg = `<rect width="${W}" height="${H}" fill="#4a3e34"/>${[...Array(10)].map((_, i) => `<rect x="0" y="${i * 200}" width="${W}" height="6" fill="#3a3028"/>`).join('')}
  ${paws}<ellipse cx="560" cy="900" rx="130" ry="80" fill="#0a0c10"/><ellipse cx="560" cy="900" rx="130" ry="80" fill="none" stroke="#2a2018" stroke-width="10"/>
  ${t > capL('n_hole', 1, T, t) ? `<g opacity="${seg(t, capL('n_hole', 1, T, t), d)}"><circle cx="540" cy="910" r="5" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="566" cy="910" r="5" fill="#e9f5d0" filter="url(#zglow)"/></g>` : ''}`;
  return { svg: `<g transform="translate(560 900) scale(${z}) translate(-560 -900)">${svg}</g>` + vign(.6), cam: 1 };
};
S.end_n = tomorrowCard(6);
