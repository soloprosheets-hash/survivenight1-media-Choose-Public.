// ---------- Part 14 scenes ----------
function gateScene(t, o = {}) {
  const { open = 0, boat = null, alarm = 0, shake = 0 } = o;
  const sx = shake ? (rnd(Math.floor(t * 50)) - .5) * shake : 0;
  const gw = lerp(0, 420, open);
  return `<g transform="translate(${sx},0)">${nightHarbor(t)}
  <rect x="-20" y="300" width="${W + 40}" height="1060" fill="#4a4d55"/>
  ${[...Array(24)].map((_, i) => `<line x1="0" y1="${300 + i * 44}" x2="${W}" y2="${300 + i * 44}" stroke="#3f4249" stroke-width="3"/>`).join('')}
  ${[...Array(20)].map((_, i) => `<rect x="${i * 58}" y="270" width="34" height="30" fill="#4a4d55"/>`).join('')}
  <rect x="${540 - gw / 2}" y="560" width="${gw}" height="800" fill="#0b1422"/>
  ${waveDashes(1300, 1360, t, '#2c4560', 6, 401, .6).replace(/M-100/g, `M${540 - gw / 2}`)}
  <rect x="${540 - gw / 2 - 230}" y="560" width="230" height="800" fill="#5c5348"/><rect x="${540 + gw / 2}" y="560" width="230" height="800" fill="#5c5348"/>
  ${[0, 1, 2, 3, 4].map(i => `<rect x="${540 - gw / 2 - 230}" y="${600 + i * 150}" width="230" height="14" fill="#3a332c"/><rect x="${540 + gw / 2}" y="${600 + i * 150}" width="230" height="14" fill="#3a332c"/>`).join('')}
  <rect y="1360" width="${W}" height="${H}" fill="#0b1422"/>${waveDashes(1370, 1900, t, '#2c4560', 20, 411, .6)}
  ${boat || ''}
  ${alarm ? `<rect width="${W}" height="${H}" fill="#ff3a2a" opacity="${alarm * (.12 + .1 * Math.sin(t * 14))}"/>` : ''}
  </g>`;
}

// 1 ---------------------------------------------------------------
S.recap14 = (t, d, T) => {
  const p = t / d;
  const ti = easeOut(seg(t, 0, .5));
  const svg = S.truth(d, d, T).svg.replace(/SAFE = BAIT/, '') + `<g opacity="${ti}" transform="translate(0,${(1 - ti) * -40})">
    <text x="540" y="240" text-anchor="middle" font-family="Anton" font-size="130" fill="#fff" stroke="#1d1f22" stroke-width="8" paint-order="stroke">PART 14</text>
    ${pill(540, 310, 'NIGHT 10 · 2:14 AM', { bg: PAL.yel, size: 28 })}</g>` +
    (t > capL('recap14', 1, T, t) ? `<g transform="translate(540,1500) scale(${back(seg(t, capL('recap14', 1, T, t), capL('recap14', 1, T, t) + .35))})"><circle r="150" fill="none" stroke="#c8352c" stroke-width="10" stroke-dasharray="22 14"/>${crewBoat(0, 60, .35, t, { lit: 0 })}</g>` : '');
  return { svg, cam: 1.0 + .04 * p };
};

// 2 ---------------------------------------------------------------
S.wake = (t, d, T) => {
  const p = t / d;
  const up = easeOut(seg(t, .2, 1.2));
  const svg = `<rect width="${W}" height="${H}" fill="#14181e"/>
  ${[...Array(8)].map((_, i) => `<line x1="${i * 150}" y1="0" x2="${i * 150}" y2="1300" stroke="#1a1f27" stroke-width="6"/>`).join('')}
  <rect x="80" y="1000" width="420" height="70" fill="#3a3046"/><rect x="580" y="1000" width="420" height="70" fill="#3a3046"/>
  <g transform="translate(290,1000) rotate(${lerp(-80, 0, up)})">${ines({ x: 0, y: 0, s: 1.25, f: 1, pose: up > .5 ? 'sit' : 'stand', eyes: up > .3 ? 'open' : 'closed', gun: false })}</g>
  <g transform="translate(790,1000) rotate(${lerp(-80, 0, up)})">${mateo({ x: 0, y: 0, s: 1.25, f: -1, pose: up > .5 ? 'sit' : 'stand', eyes: up > .3 ? 'open' : 'closed' })}</g>
  ${theo({ x: 540, y: 1520, s: 1.7, f: 1, look: 0, armF: [140, 40], armB: [-10, 10] })}
  <rect y="1300" width="${W}" height="${H}" fill="#1a1d24" opacity=".6"/>
  ${pill(540, 300, 'NO LIGHTS · NO NOISE', { bg: '#efe8d8', size: 34, bold: 700, border: '#8a7a62', sc: back(seg(t, capL('wake', 1, T, t), capL('wake', 1, T, t) + .3)) })}
  ${night(.25)}${vign(.7)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 3 ---------------------------------------------------------------
S.ines_plan = (t, d, T) => {
  const p = t / d;
  const talk = Math.abs(Math.sin(t * 12)) > .45 ? 'o' : 'flat';
  return { svg: `<rect width="${W}" height="${H}" fill="#14181e"/>` + ines({ x: 480, y: 1720, s: 3.1, f: 1, look: .3, mouth: talk, gun: false }) + night(.25) + vign(.75), cam: 1.02 + .05 * p };
};

// 4 ---------------------------------------------------------------
S.locked = (t, d, T) => {
  const p = t / d;
  const k = seg(t, capL('locked', 1, T, t), d);
  const svg = gateScene(t, { open: 0 }) +
    `<g transform="translate(540,960)"><path d="M-50 -60 Q-50 -120 0 -120 Q50 -120 50 -60" stroke="#b9bdc2" stroke-width="16" fill="none"/><rect x="-80" y="-66" width="160" height="140" rx="20" fill="#e0a830"/><circle r="16" fill="#2b2b2f"/></g>
    <g transform="translate(900,800)" opacity="${k}"><rect x="-130" y="-160" width="260" height="320" fill="#5c5348"/><rect x="-60" y="-90" width="120" height="90" fill="#ffcf7a"/><circle cx="20" cy="-50" r="10" fill="#8e9298"/><path d="M20 -40 l-10 30 h20 Z M20 -40 l14 26" stroke="#c9b48a" stroke-width="5" fill="none"/></g>
    ${k > .2 ? pill(900, 600, 'GUARD BOOTH', { bg: '#f4efe4', size: 28, bold: 700 }) : ''}` + vign(.65);
  return { svg, cam: 1.0 + .05 * p };
};

// 5 ---------------------------------------------------------------
function booth(t, o = {}) {
  const { keysOn = 1, catIn = 0, keyFall = 0 } = o;
  const zz = (t * 30) % 60;
  return `<rect width="${W}" height="${H}" fill="#1b1f27"/>
  <rect x="140" y="300" width="800" height="1100" fill="#5c5348"/>
  <rect x="260" y="420" width="380" height="300" fill="#ffcf7a"/><rect x="260" y="420" width="380" height="300" fill="none" stroke="#2a2420" stroke-width="16"/>
  <g clip-path="url(#bw14)"><clipPath id="bw14"><rect x="260" y="420" width="380" height="300"/></clipPath>
    ${townsfolk(400, 900, 1.0, '#5d6b7a', 1, t).replace(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="4.6"/g, '<path d="M$1 $2 m-6 0 q6 4 12 0" stroke="#2a2522" stroke-width="3" fill="none"/><circle cx="-9999" cy="0" r="0"')}
    <circle cx="600" cy="480" r="10" fill="#8e9298"/>
    ${keysOn ? `<g transform="translate(600,490)"><circle r="20" fill="none" stroke="#c9b48a" stroke-width="6"/><rect x="-4" y="16" width="8" height="40" fill="#c9b48a"/><rect x="10" y="10" width="8" height="34" fill="#c9b48a" transform="rotate(30)"/></g>` : ''}
    ${catIn ? cat({ x: lerp(700, 560, catIn), y: 560, s: .7, f: -1, pose: 'walk', t }) : ''}
  </g>
  <text x="${520 + zz * .3}" y="${560 - zz}" font-family="Anton" font-size="40" fill="#2a2420" opacity=".6">z</text>
  <rect x="700" y="760" width="110" height="90" fill="#0b0d12"/><rect x="700" y="760" width="110" height="90" fill="none" stroke="#2a2420" stroke-width="10"/>
  ${keyFall > 0 ? `<g transform="translate(755,${lerp(860, 1500, keyFall * keyFall)}) rotate(${keyFall * 300})"><circle r="20" fill="none" stroke="#c9b48a" stroke-width="6"/><rect x="-4" y="16" width="8" height="40" fill="#c9b48a"/></g>` : ''}`;
}
S.guard = (t, d, T) => {
  const p = t / d;
  const k = back(seg(t, capL('guard', 1, T, t), capL('guard', 1, T, t) + .35));
  return { svg: booth(t) + (k > 0 ? `<rect x="690" y="750" width="130" height="110" fill="none" stroke="#c8352c" stroke-width="8" stroke-dasharray="14 10"/>` + pill(755, 940, 'TOO SMALL', { sc: k, bg: '#c8352c', fg: '#fff', size: 32, bold: 700 }) : '') + night(.2) + vign(.65), cam: 1.0 + .05 * p };
};
S.mango_slip = (t, d, T) => {
  const p = t / d;
  const c1 = capL('mango_slip', 1, T, t), c2 = capL('mango_slip', 2, T, t);
  if (t < c1) return { svg: booth(t) + cat({ x: 755, y: 1100, s: 1.2, f: -1, pose: 'sit', look: .6 }) + night(.2) + vign(.65), cam: 1.03 };
  const inK = seg(t, c1, c2);
  const knock = seg(t, c2 + .3, c2 + .6);
  return { svg: booth(t, { catIn: inK, keysOn: knock < .5 }) + (knock >= .5 ? `<g transform="translate(600,${lerp(500, 700, seg(t, c2 + .45, d))})"><circle r="20" fill="none" stroke="#c9b48a" stroke-width="6"/><rect x="-4" y="16" width="8" height="40" fill="#c9b48a"/></g>` : '') + night(.2) + vign(.65), cam: 1.0 + .08 * seg(t, c1, d) };
};

// 6 ---------------------------------------------------------------
S.keys = (t, d, T) => {
  const p = t / d;
  const fall = easeIn(seg(t, 0, .7));
  const svg = `<rect width="${W}" height="${H}" fill="#1b1f27"/><rect x="140" y="-200" width="800" height="900" fill="#5c5348"/><rect x="700" y="400" width="110" height="90" fill="#0b0d12"/>
  <path d="M-100 1500 L460 1300 L460 1440 L-100 1650 Z" fill="${PAL.coat}"/><path d="M1180 1500 L620 1300 L620 1440 L1180 1650 Z" fill="${PAL.coatD}"/>
  <ellipse cx="480" cy="1370" rx="80" ry="56" fill="${PAL.skin}"/><ellipse cx="600" cy="1370" rx="80" ry="56" fill="${PAL.skin}"/>
  <g transform="translate(${lerp(755, 545, fall)},${lerp(500, 1320, fall)}) rotate(${fall * 340})"><circle r="30" fill="none" stroke="#c9b48a" stroke-width="9"/><rect x="-6" y="24" width="12" height="60" fill="#c9b48a"/><rect x="16" y="14" width="12" height="50" fill="#c9b48a" transform="rotate(30)"/></g>
  ${t > capL('keys', 1, T, t) ? pill(540, 300, 'SILENT ✓', { sc: back(seg(t, capL('keys', 1, T, t), capL('keys', 1, T, t) + .3)), bg: '#4f8a6a', fg: '#fff', size: 40, bold: 700 }) : ''}
  ${night(.2)}${vign(.65)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 7 ---------------------------------------------------------------
S.gate_creak = (t, d, T) => {
  const p = t / d;
  const cs = [0, 1, 2, 3].map(i => capL('gate_creak', i, T, t));
  const open = t < cs[1] ? lerp(0, .15, seg(t, cs[0] + .3, cs[1])) : t < cs[2] ? lerp(.15, .3, seg(t, cs[1], cs[2])) : t < cs[3] ? lerp(.3, .5, seg(t, cs[2], cs[3])) : .55;
  return { svg: gateScene(t, { open, boat: crewBoat(540, 1520, .55, t, { lit: 0 }) }) + vign(.65), cam: 1.0 + .05 * p };
};

// 8 ---------------------------------------------------------------
S.bell = (t, d, T) => {
  const p = t / d;
  const sw = Math.sin(t * 12) * 25;
  const svg = nightHarbor(t) + `<g opacity=".7">${townWall(540, 1300, .9, t, { lit: 1, dawn: false })}</g>
  <g transform="translate(540,520)"><rect x="-140" y="-200" width="280" height="40" fill="#3a332c"/><line x1="0" y1="-160" x2="0" y2="-110" stroke="#3a332c" stroke-width="10"/>
  <g transform="rotate(${sw} 0 -110)"><path d="M-90 80 Q-90 -110 0 -110 Q90 -110 90 80 Z" fill="#c9a24a"/><rect x="-100" y="70" width="200" height="22" rx="10" fill="#a8842e"/><circle cx="${sw * .6}" cy="96" r="18" fill="#7a5a1e"/></g></g>
  ${[0, 1, 2].map(i => { const k = (t * 1.6 + i / 3) % 1; return `<path d="M${400 - k * 200} ${520 - k * 60} q-${30 + k * 40} 80 0 160 M${680 + k * 200} ${520 - k * 60} q${30 + k * 40} 80 0 160" stroke="#f2c230" stroke-width="${8 * (1 - k)}" fill="none" opacity="${1 - k}"/>`; }).join('')}
  <rect width="${W}" height="${H}" fill="#ff3a2a" opacity="${.08 + .06 * Math.sin(t * 14)}"/>${vign(.65)}`;
  return { svg, cam: 1.0 + .04 * p + (rnd(Math.floor(t * 30)) - .5) * .004 };
};

// 9 ---------------------------------------------------------------
S.vera_shout = (t, d, T) => {
  const p = t / d;
  const svg = nightHarbor(t) + `<rect x="-20" y="1180" width="${W + 40}" height="${H}" fill="#3a3d43"/>${[...Array(20)].map((_, i) => `<rect x="${i * 60}" y="1150" width="34" height="30" fill="#3a3d43"/>`).join('')}
  ${vera({ x: 520, y: 1720, s: 3.1, f: 1, look: .4, mouth: 'o', eyes: 'wide', armF: [125, 0], armB: [-20, 10] })}
  <rect width="${W}" height="${H}" fill="#ff3a2a" opacity="${.08 + .06 * Math.sin(t * 14)}"/>${vign(.7)}`;
  return { svg, cam: 1.02 + .08 * p };
};

// 10 --------------------------------------------------------------
S.closing = (t, d, T) => {
  const p = t / d;
  const open = lerp(.55, .38, seg(t, capL('closing', 1, T, t), d));
  let lights = '';
  for (let i = 0; i < 5; i++) lights += `<circle cx="${140 + i * 200}" cy="${1700 + Math.sin(t * 3 + i) * 6}" r="${12 + p * 8}" fill="#ffe7a0"/>`;
  return { svg: gateScene(t, { open, alarm: 1, boat: crewBoat(540, 1500, .55, t, { lit: 0 }) + lights }) + vign(.65), cam: 1.0 + .04 * p };
};

// 11 --------------------------------------------------------------
S.cutoff = (t, d, T) => {
  const p = t / d;
  const c1 = capL('cutoff', 1, T, t), c2 = capL('cutoff', 2, T, t);
  const fbx = t < c2 ? lerp(1300, 760, easeOut(seg(t, 0, c1))) : lerp(760, 1200, easeIO(seg(t, c2, d)));
  const fk = seg(t, c1 + .3, c2);
  const svg = seaNight(t, 81, 1000) + `${fishBoat(fbx, 1260, .6, { t, crew: 0, lit: .8 })}
  ${fk > 0 && fk < 1 ? `<circle cx="${lerp(400, 1000, fk)}" cy="${1250 - Math.sin(fk * Math.PI) * 220}" r="18" fill="#ffd0c0" filter="url(#zglow)"/>` : ''}
  <rect width="${W}" height="${H}" fill="#ff3a2a" opacity="${fk > .8 ? .2 * (1 - seg(t, c2, c2 + .8)) : 0}"/>
  ${crewBoat(380, 1580, .8, t, { lit: 0 })}` + vign(.65);
  return { svg, cam: 1.0 + .04 * p };
};

// 12 --------------------------------------------------------------
S.squeeze = (t, d, T) => {
  const p = t / d;
  const c1 = capL('squeeze', 1, T, t);
  const go = easeIn(seg(t, c1 - .4, d));
  const open = lerp(.38, .3, p);
  const sparks = go > .4 && go < .9 ? [...Array(10)].map((_, i) => `<circle cx="${540 + (i % 2 ? 1 : -1) * (100 + rnd(i) * 60)}" cy="${1250 + rnd(i + 3) * 100}" r="${4 + rnd(i) * 5}" fill="#ffd36b"/>`).join('') : '';
  return { svg: gateScene(t, { open, alarm: 1, shake: go > .4 && go < .9 ? 14 : 0, boat: crewBoat(540, lerp(1520, 1100, go), lerp(.55, .3, go), t, { lit: 0 }) }) + sparks + vign(.65), cam: 1.0 + .06 * p };
};

// 13 --------------------------------------------------------------
S.behind = (t, d, T) => {
  const p = t / d;
  const c2 = capL('behind', 2, T, t);
  let lights = '';
  for (let i = 0; i < 12; i++) lights += `<circle cx="${70 + i * 86}" cy="${1060 + Math.sin(t * 2 + i) * 4}" r="9" fill="#ffe7a0"/>`;
  const svg = `<defs>${linGrad('bh14', [[0, '#1b2236'], [1, '#c98a6a']])}</defs><rect width="${W}" height="1050" fill="url(#bh14)"/>
  <rect y="1040" width="${W}" height="${H}" fill="#0f1c2b"/>${waveDashes(1050, 1900, t * 1.5, '#2c4560', 34, 421, .6)}
  ${lights}
  ${crewBoat(540, 1600, .9, t, { lit: 0 })}
  <path d="M540 1640 Q560 1780 640 1920" stroke="#e8f2f6" stroke-width="40" fill="none" opacity=".35"/>
  ${t > c2 ? `<g transform="translate(800,360)"><rect x="-160" y="-60" width="370" height="120" rx="20" fill="#f3eee2" stroke="#2a2c30" stroke-width="4"/><path d="M-110 ${-20 + Math.sin(t * 3) * 5} L-110 ${20 + Math.sin(t * 3) * 5} M-126 ${4 + Math.sin(t * 3) * 5} L-110 ${20 + Math.sin(t * 3) * 5} L-94 ${4 + Math.sin(t * 3) * 5}" stroke="#3f86c4" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="-70" y="16" font-family="Oswald" font-weight="700" font-size="40" fill="#22252a">TIDE TURNING</text></g>` : ''}
  ${vign(.65)}`;
  return { svg, cam: 1.0 + .05 * p };
};

// 14 --------------------------------------------------------------
S.end_card14 = (t, d, T) => {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .5, 1.0)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="860" text-anchor="middle" font-family="Anton" font-size="130" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 820) scale(${lerp(1.15, 1, a)}) translate(-540 -820)">FINALE</text>
  <text x="540" y="930" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="44" fill="#e8e8ea" opacity="${a * .8}" letter-spacing="8">PART 15</text>
  <rect x="${540 - 210 * b}" y="965" width="${420 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1050" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="54" fill="${PAL.red}" letter-spacing="6" opacity="${b}">NIGHT ONE</text>
  <text x="540" y="1150" text-anchor="middle" font-family="Oswald" font-weight="500" font-size="32" fill="#e8e8ea" letter-spacing="7" opacity="${c * .8}">FOLLOW TO SURVIVE NIGHT 1</text>`, cam: 1 };
};
