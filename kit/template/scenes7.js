// ---------- Part 7 scenes ----------
function mateo(o = {}) {
  const save = { ...PAL };
  Object.assign(PAL, { coat: '#5f6b5a', coatD: '#4a5446', hat: '#2a221c', hatD: '#221b16', beard: '#4a3a2e', skin: '#e6d6c4', skinD: '#cdbca8', pants: '#3b3f4a' });
  const g = theo(o);
  Object.assign(PAL, save);
  return g;
}
// knock times inside the "pattern" scene (local time), derived from caption ends
function patternHits(T, t) {
  const sg = window.TL.segments.find(g => g.scene === 'pattern');
  const t0 = T - t, hits = [];
  [[1, .26, false], [2, .42, true], [3, .26, false]].forEach(([ci, gap, long]) => {
    const c = sg.caps[ci];
    const pauseStart = (ci < 3 ? sg.caps[ci + 1].start : sg.end) - (long ? 1.45 : 1.05) - t0;
    for (let j = 0; j < 3; j++) hits.push([pauseStart + .12 + j * gap, long, ci]);
  });
  return hits;
}

// 1 ---------------------------------------------------------------
S.recap7 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const svg = hatchTop(t, { night: true }) + night(.3) + `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 7</text>
    ${pill(540, 310, 'NIGHT 3 · 1:12 AM', { bg: PAL.yel, size: 28 })}</g>` + vign(.75);
  return { svg, cam: 1.0 + .06 * p };
};

// 2 ---------------------------------------------------------------
S.pattern = (t, d, T) => {
  const p = t / d;
  const hits = patternHits(T, t);
  let s = 0, marks = '';
  hits.forEach(([h, long, ci], i) => {
    if (t > h) {
      s = Math.max(s, Math.max(0, 1 - (t - h) * (long ? 3 : 5)) * (long ? 1.2 : .8));
      const k = back(seg(t, h, h + .2));
      const x = 150 + i * 98, y = 400;
      marks += long ? `<rect x="${x - 34}" y="${y - 12}" width="68" height="24" rx="12" fill="${PAL.yel}" transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})"/>`
                    : `<circle cx="${x}" cy="${y}" r="${16 * k}" fill="${PAL.yel}"/>`;
    }
  });
  const svg = hatchTop(t, { night: true, shake: s * 30, tug: s * .6 }) + night(.3) +
    `<rect x="80" y="330" width="920" height="140" rx="70" fill="#0b0d12" opacity=".75"/>` + marks +
    `<rect width="${W}" height="${H}" fill="#fff" opacity="${s * .06}"/>` + vign(.75);
  return { svg, cam: 1.03 + .04 * p + s * .015 };
};

// 3 ---------------------------------------------------------------
S.sos = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, capL('sos', 1, T, t), capL('sos', 1, T, t) + .35));
  const row = (y, letter, code, i) => {
    const r = back(seg(t, .1 + i * .25, .4 + i * .25));
    return `<g transform="translate(0,${y})" opacity="${clamp(r)}"><text x="250" y="30" text-anchor="middle" font-family="Anton" font-size="110" fill="#22252a">${letter}</text>
      ${code.split('').map((c, j) => c === '.' ? `<circle cx="${430 + j * 130}" cy="0" r="26" fill="#22252a"/>` : `<rect x="${380 + j * 130}" y="-20" width="100" height="40" rx="20" fill="#22252a"/>`).join('')}</g>`;
  };
  const svg = `
  <rect width="${W}" height="${H}" fill="#ece4d3"/>
  ${[...Array(28)].map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${H}" stroke="#d9cfba" stroke-width="2"/>`).join('')}
  ${[...Array(50)].map((_, i) => `<line x1="0" y1="${i * 40}" x2="${W}" y2="${i * 40}" stroke="#d9cfba" stroke-width="2"/>`).join('')}
  <text x="540" y="300" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="46" fill="#6b6d70" letter-spacing="6">MORSE CODE</text>
  ${row(500, 'S', '...', 0)}${row(700, 'O', '---', 1)}${row(900, 'S', '...', 2)}
  ${k > 0 ? `<g transform="translate(540,1520) rotate(-8) scale(${k})"><rect x="-260" y="-110" width="520" height="220" rx="20" fill="none" stroke="#c8352c" stroke-width="16"/><text x="0" y="62" text-anchor="middle" font-family="Anton" font-size="170" fill="#c8352c" letter-spacing="10">SOS</text></g>` : ''}
  ${vign(.25)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// quarters interior (dim lantern)
function quarters(t, inner = '', dark = .25) {
  const fl = 1 + Math.sin(t * 11) * .05 + Math.sin(t * 6.3) * .04;
  return `
  <defs>${radGrad('qlamp', [[0, '#ffcf7a', .55], [1, '#ffcf7a', 0]])}</defs>
  <rect width="${W}" height="${H}" fill="#3a3f47"/>
  ${[...Array(8)].map((_, i) => `<line x1="${i * 150}" y1="0" x2="${i * 150}" y2="1300" stroke="#33373e" stroke-width="6"/>`).join('')}
  <rect x="620" y="420" width="260" height="200" rx="16" fill="#151a22"/><rect x="636" y="436" width="228" height="168" rx="10" fill="#0d1118"/>
  ${stars(8, 51, 160).replace(/cx="([\d.]+)"/g, (m, v) => `cx="${640 + v * .2}"`).replace(/cy="([\d.]+)"/g, (m, v) => `cy="${440 + +v}"`)}
  <rect x="60" y="1060" width="560" height="60" rx="10" fill="#5a4636"/><rect x="60" y="980" width="560" height="90" rx="20" fill="#7d8a95"/>
  <rect y="1300" width="${W}" height="${H}" fill="#2a2d33"/>
  ${inner}
  <g transform="translate(860,1300)"><rect x="-30" y="-80" width="60" height="80" rx="10" fill="#2b2b2f"/><rect x="-20" y="-70" width="40" height="52" rx="6" fill="#ffd27a" opacity="${.75 * fl}"/></g>
  <ellipse cx="860" cy="1250" rx="${560 * fl}" ry="${560 * fl}" fill="url(#qlamp)"/>
  <rect width="${W}" height="${H}" fill="#06080e" opacity="${dark}"/>`;
}

// 4 ---------------------------------------------------------------
S.confront = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 14)) > .4 ? 'o' : 'flat';
  const svg = quarters(t,
    ines({ x: 300, y: 1060, s: 1.35, f: 1, pose: 'sit', look: .8, eyes: 'open', gun: false, armF: [40, 50], armB: [20, 40] }) +
    theo({ x: 760, y: 1310, s: 1.7, f: -1, look: .6, mouth: talk, armF: [70, -20], armB: [-10, 10], eyes: 'wide' })) + vign(.6);
  return { svg, cam: 1.0 + .05 * p };
};

// 5 ---------------------------------------------------------------
S.ines_answer = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 13)) > .45 ? 'o' : 'flat';
  const photo = back(seg(t, capL('ines_answer', 1, T, t), capL('ines_answer', 1, T, t) + .4));
  const svg = quarters(t, '', .2) +
    ines({ x: 470, y: 1860, s: 3.1, f: 1, look: -.3, mouth: talk, headTilt: 6, gun: false, armF: [20, 10], armB: [-10, 10] }) +
    (photo > 0 ? `<g transform="translate(820,560) rotate(8) scale(${photo})"><rect x="-150" y="-180" width="300" height="360" fill="#f3eee2"/><rect x="-130" y="-160" width="260" height="250" fill="#9fb4c4"/>
      <g transform="translate(-40,90) scale(.62)">${ines({ x: 0, y: 0, s: 1, f: 1, gun: false, look: .3 })}</g><g transform="translate(55,90) scale(.66)">${mateo({ x: 0, y: 0, s: 1, f: -1, look: .3 })}</g>
      <text x="0" y="150" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="40" fill="#22252a">me &amp; Mateo</text></g>` : '') + vign(.6);
  return { svg, cam: 1.0 + .05 * p };
};

// 6 ---------------------------------------------------------------
S.flashback = (t, d, T) => {
  const p = t / d;
  const close = easeIO(seg(t, .2, 1.6));
  const svg = `<defs><filter id="sep7"><feColorMatrix type="matrix" values=".45 .55 .2 0 0  .38 .5 .17 0 0  .27 .38 .13 0 0  0 0 0 1 0"/></filter></defs>
  <g filter="url(#sep7)">${hatchTop(t)}
    <g transform="translate(540,960) scale(1,${lerp(-.9, 1, close)})" opacity="${close < .5 ? 1 : 0}"><rect x="-340" y="-340" width="680" height="680" fill="#0b0d12"/></g>
    <path d="M1300 1500 L${lerp(1000, 760, close)} 1200 L${lerp(1040, 800, close)} 1280 L1300 1640 Z" fill="#b8432f"/>
    <ellipse cx="${lerp(990, 740, close)}" cy="1220" rx="56" ry="44" fill="${PAL.skin}"/>
  </g>
  ${pill(540, 300, '9 DAYS AGO', { bg: '#f4efe4', size: 36, bold: 700 })}
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#f4efe4" stroke-width="4" opacity=".5"/>` + vign(.6);
  return { svg, cam: 1.0 + .05 * p };
};

// 7 ---------------------------------------------------------------
S.theo_think = (t, d, T) => {
  const p = t / d;
  const k = seg(t, capL('theo_think', 1, T, t), d);
  let morse = '';
  const code = '...---...';
  for (let i = 0; i < 9; i++) {
    const a = rad(-160 + i * 16), r = 380 + Math.sin(t * 2 + i) * 10;
    const x = 420 + Math.cos(a) * r, y = 900 + Math.sin(a) * r;
    const o = clamp(k * 3 - i * .15);
    morse += code[i] === '.' ? `<circle cx="${x}" cy="${y}" r="16" fill="${PAL.yel}" opacity="${o}"/>` : `<rect x="${x - 30}" y="${y - 11}" width="60" height="22" rx="11" fill="${PAL.yel}" opacity="${o}"/>`;
  }
  const svg = quarters(t, '', .35) + theo({ x: 400, y: 1880, s: 3.2, f: 1, look: .4, eyes: k > .3 ? 'wide' : 'open', headTilt: -4 }) + morse + vign(.7);
  return { svg, cam: 1.0 + .06 * p };
};

// 8 ---------------------------------------------------------------
S.tally = (t, d, T) => {
  const p = t / d;
  const n = Math.floor(clamp(seg(t, .3, capL('tally', 2, T, t) + .5)) * 9.99);
  let marks = '';
  for (let i = 0; i < Math.min(n, 9); i++) {
    if (i === 4) marks += `<line x1="250" y1="760" x2="560" y2="560" stroke="#efe8d8" stroke-width="16" stroke-linecap="round"/>`;
    else { const x = 280 + (i > 4 ? i - 5 : i) * 80 + (i > 4 ? 420 : 0); marks += `<line x1="${x}" y1="540" x2="${x + 10}" y2="790" stroke="#efe8d8" stroke-width="16" stroke-linecap="round"/>`; }
  }
  const k2 = back(seg(t, capL('tally', 3, T, t), capL('tally', 3, T, t) + .35));
  const svg = `
  <rect width="${W}" height="${H}" fill="#4a4f57"/>
  ${[...Array(10)].map((_, i) => `<line x1="0" y1="${i * 210}" x2="${W}" y2="${i * 210}" stroke="#42464d" stroke-width="6"/>`).join('')}
  <rect x="160" y="440" width="860" height="460" rx="12" fill="#2f3339" opacity=".6"/>
  ${marks}
  <text x="590" y="1000" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="80" fill="#efe8d8" opacity="${n >= 9 ? 1 : 0}">day 9 — still knocking</text>
  ${k2 > 0 ? pill(540, 1120, 'NOBODY TURNS THAT SLOWLY', { sc: k2, bg: '#c8352c', fg: '#fff', size: 36, bold: 700 }) : ''}
  ${vign(.5)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 9 ---------------------------------------------------------------
S.open_hatch = (t, d, T) => {
  const p = t / d;
  const ok = easeIO(seg(t, capL('open_hatch', 2, T, t) - .1, d));
  const svg = `${deckFloor(0)}
  <rect width="${W}" height="${H}" fill="#f2c9a0" opacity=".12"/>
  <rect x="200" y="620" width="680" height="680" rx="20" fill="#050608"/>
  <g transform="translate(540,620) scale(1,${lerp(1, -.25, ok)}) translate(-540,-620)">
    <rect x="200" y="620" width="680" height="680" rx="20" fill="#6e737b" stroke="#3c4046" stroke-width="18"/>
    ${[0, 1, 2, 3].map(i => `<rect x="240" y="${680 + i * 150}" width="600" height="18" rx="9" fill="#5c6168"/>`).join('')}
    <text x="540" y="1220" text-anchor="middle" font-family="Anton" font-size="64" fill="#e3b23c" letter-spacing="6">LOWER DECK</text>
  </g>
  <g transform="translate(870,1420) rotate(20)"><path d="M0 0 q-60 40 -20 120" stroke="#9aa0a6" stroke-width="14" fill="none"/><rect x="-60" y="110" width="100" height="90" rx="14" fill="#e0a830"/></g>
  <path d="M1300 1700 L780 1500 L760 1580 L1300 1820 Z" fill="#b8432f"/><ellipse cx="770" cy="1540" rx="54" ry="44" fill="${PAL.skin}"/>
  <g transform="translate(700,1500) rotate(-25)"><rect x="-6" y="-14" width="80" height="30" rx="10" fill="#e8742a"/><rect x="-6" y="2" width="24" height="44" rx="8" fill="#c95f20"/></g>
  ` + vign(.5);
  return { svg, cam: 1.0 + .06 * p };
};

// 10 --------------------------------------------------------------
S.corridor = (t, d, T) => {
  const p = t / d;
  const fig = seg(t, capL('corridor', 3, T, t), capL('corridor', 3, T, t) + .8);
  const z = 1 + easeIO(seg(t, capL('corridor', 2, T, t), d)) * .55;
  let ribs = '';
  for (let i = 0; i < 9; i++) {
    const k = Math.pow(i / 9, 1.6), w = lerp(560, 70, k), y0 = lerp(100, 820, k), y1 = lerp(1820, 1050, k);
    ribs += `<rect x="${540 - w}" y="${y0}" width="${w * 2}" height="${y1 - y0}" fill="none" stroke="#2a2e35" stroke-width="${lerp(26, 4, k)}"/>`;
  }
  const svg = `
  <g transform="translate(540 960) scale(${z}) translate(-540 -960)">
  <rect width="${W}" height="${H}" fill="#0d1014"/>
  <path d="M-20 -20 L470 820 L610 820 L1100 -20 Z" fill="#14181e"/>
  <path d="M-20 1940 L470 1050 L610 1050 L1100 1940 Z" fill="#101a24"/>
  ${[...Array(10)].map((_, i) => `<path d="M${-60 + i * 130} ${1940} L${470 + i * 15} 1050" stroke="#1d2c3a" stroke-width="3"/>`).join('')}
  ${ribs}
  ${waveDashes(1100, 1900, t * .5, '#2c4560', 22, 241, .6)}
  <g opacity="${fig}"><g transform="translate(540,1035) scale(.28)">${mateo({ x: 0, y: 0, s: 1, pose: 'sit', look: 0, eyes: 'closed', headTilt: 14 })}</g></g>
  <path d="M540 2100 L120 900 L960 900 Z" fill="#fff7d6" opacity=".07"/>
  </g>
  ${vign(.8)}`;
  return { svg, cam: 1.0 };
};

// 11 --------------------------------------------------------------
S.reveal = (t, d, T) => {
  const p = t / d;
  const up = easeOut(seg(t, 0, .7));
  const eyesOk = t > capL('reveal', 2, T, t);
  const svg = `
  <rect width="${W}" height="${H}" fill="#14181e"/>
  ${[...Array(8)].map((_, i) => `<line x1="${i * 160}" y1="0" x2="${i * 160}" y2="${H}" stroke="#1c2027" stroke-width="10"/>`).join('')}
  <path d="M900 -100 L-100 1400 L700 1700 Z" fill="#fff7d6" opacity=".08"/>
  ${mateo({ x: 520, y: 1880, s: 3.4, f: 1, look: lerp(-.5, -1, up), headTilt: lerp(18, -2, up), eyes: eyesOk ? 'wide' : 'open' })}
  <rect y="1380" width="${W}" height="${H}" fill="#3e4a3a" opacity=".85"/>
  ${eyesOk ? pill(540, 360, 'EYES: NORMAL  ✓', { sc: back(seg(t, capL('reveal', 2, T, t), capL('reveal', 2, T, t) + .35)), bg: '#4f8a6a', fg: '#fff', size: 40, bold: 700 }) : ''}
  ${vign(.75)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 12 --------------------------------------------------------------
S.cut = (t, d, T) => {
  const p = t / d;
  const k1 = back(seg(t, .2, .55)), k2 = back(seg(t, capL('cut', 1, T, t), capL('cut', 1, T, t) + .35));
  const card = (x, title, ok, inner, k) => k <= 0 ? '' : `<g transform="translate(${x},740) scale(${k})">
    <rect x="-210" y="-300" width="420" height="600" rx="24" fill="#fffdf6" stroke="${ok ? '#4f8a6a' : '#c8352c'}" stroke-width="10"/>
    <text x="0" y="-220" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="48" fill="#22252a" letter-spacing="3">${title}</text>
    <ellipse cx="0" cy="0" rx="150" ry="110" fill="${PAL.skin}"/>${inner}
    <g transform="translate(0,220)"><circle r="46" fill="${ok ? '#4f8a6a' : '#c8352c'}"/>${ok ? `<path d="M-20 0 l13 15 l26 -30" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-18 -18 L18 18 M18 -18 L-18 18" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`}</g></g>`;
  const bite = [...Array(10)].map((_, i) => { const a = i / 10 * Math.PI * 2; return `<ellipse cx="${Math.cos(a) * 70}" cy="${Math.sin(a) * 45}" rx="10" ry="14" fill="#8a2a24" transform="rotate(${a * 57} ${Math.cos(a) * 70} ${Math.sin(a) * 45})"/>`; }).join('');
  const cutL = `<path d="M-100 30 L100 -30" stroke="#a83a30" stroke-width="10" stroke-linecap="round"/><path d="M-90 40 L90 -20" stroke="#e8a0a0" stroke-width="4" opacity=".7"/>`;
  const svg = `<rect width="${W}" height="${H}" fill="#2a2e35"/>
  ${card(290, 'BITE', false, bite, k1)}${card(790, 'CUT', true, cutL, k2)}
  ${k2 > 0 ? pill(540, 1440, 'RUSTY LADDER, NOT TEETH', { sc: k2, bg: PAL.yel, size: 36, bold: 700 }) : ''}
  ${vign(.45)}`;
  return { svg, cam: 1.0 + .04 * p };
};

// 13 --------------------------------------------------------------
S.drop = (t, d, T) => {
  const p = t / d;
  const fall = easeIO(seg(t, .1, .7)), bounce = t > .7 ? Math.abs(Math.sin((t - .7) * 12)) * Math.exp(-(t - .7) * 6) * 40 : 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#14181e"/>
  <path d="M900 -100 L-100 1400 L700 1700 Z" fill="#fff7d6" opacity=".1"/>
  <rect y="1450" width="${W}" height="${H}" fill="#101a24"/>
  ${waveDashes(1460, 1900, t * .5, '#2c4560', 20, 251, .6)}
  ${mateo({ x: 360, y: 1440, s: 1.6, f: 1, pose: 'sit', look: .5, eyes: 'closed', armF: [70, 40], armB: [60, 40] })}
  ${ines({ x: 640, y: 1450, s: 1.6, f: -1, pose: 'kneel', lean: 26, look: -.5, eyes: 'closed', gun: false, armF: [95, 30], armB: [80, 30] })}
  <g transform="translate(${lerp(780, 860, fall)},${lerp(1150, 1430, fall) - bounce}) rotate(${lerp(0, 160, fall)})"><rect x="-6" y="-14" width="80" height="30" rx="10" fill="#e8742a"/><rect x="-6" y="2" width="24" height="44" rx="8" fill="#c95f20"/></g>
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .07 * p };
};

// 14 --------------------------------------------------------------
S.mateo_warn = (t, d, T) => {
  const p = t / d;
  const grab = easeOut(seg(t, .1, .6));
  const svg = `<rect width="${W}" height="${H}" fill="#14181e"/>
  <path d="M-200 1100 L700 1000 L720 1140 L-200 1300 Z" fill="${PAL.coat}"/>
  <ellipse cx="${lerp(1250, 680, grab)}" cy="1080" rx="110" ry="80" fill="#e6d6c4"/>
  <path d="M1300 980 L${lerp(1300, 760, grab)} 1020 L${lerp(1300, 760, grab)} 1150 L1300 1200 Z" fill="#5f6b5a"/>
  ${[0, 1, 2, 3].map(i => `<rect x="${lerp(1180, 610, grab) + i * 6}" y="${1010 + i * 36}" width="110" height="30" rx="15" fill="#e6d6c4"/>`).join('')}
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .08 * p };
};

// 15 --------------------------------------------------------------
S.mateo_line = (t, d, T) => {
  const p = t / d;
  const c2 = capL('mateo_line', 2, T, t);
  if (t < c2 + .2) {
    const talk = Math.abs(Math.sin(t * 12)) > .45 ? 'o' : 'flat';
    return { svg: `<rect width="${W}" height="${H}" fill="#14181e"/><path d="M900 -100 L-100 1400 L700 1700 Z" fill="#fff7d6" opacity=".08"/>` +
      mateo({ x: 520, y: 1880, s: 3.4, f: 1, look: -1, eyes: 'wide', mouth: talk, headTilt: -4 }) + vign(.75), cam: 1.02 + .06 * p };
  }
  const k = seg(t, c2 + .2, d - .3);
  let lights = '';
  for (let i = 0; i < 6; i++) {
    const x = 160 + i * 150 + Math.sin(i * 3) * 30, on = seg(k, i * .1, i * .1 + .15);
    lights += `<circle cx="${x}" cy="${1000 + Math.sin(t * 2 + i) * 3}" r="${7 + on * 3}" fill="#ffe7a0" opacity="${on}"/><rect x="${x - 2}" y="1010" width="4" height="${40 * on}" fill="#ffe7a0" opacity="${on * .35}"/>`;
  }
  const svg = `<defs>${linGrad('bsk7', [[0, '#05080e'], [1, '#18233a']])}</defs>
  <rect width="${W}" height="1000" fill="url(#bsk7)"/>${stars(40, 61, 900)}
  <rect y="996" width="${W}" height="${H}" fill="#0b1422"/>
  ${waveDashes(1010, 1900, t, '#2c4560', 30, 261, .6)}
  ${lights}
  ${k > .7 ? pill(540, 600, 'BOATS INCOMING', { sc: back(seg(k, .7, .85)), bg: '#c8352c', fg: '#fff', size: 40, bold: 700 }) : ''}
  ${vign(.7)}`;
  return { svg, cam: 1.0 + .06 * k };
};

// 16 --------------------------------------------------------------
S.end_card7 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  const svg = `
  <rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="170" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 8</text>
  <rect x="${540 - 210 * b}" y="950" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1040" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">THE BOATS</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`;
  return { svg, cam: 1 };
};
