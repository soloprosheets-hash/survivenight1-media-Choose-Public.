// ---------- WHAT IF: ANTARCTICA ----------
function parka(o = {}, col = '#c8352c') { return recolor(o, { coat: col, coatD: col, hat: '#2b2f36', hatD: '#1f2228', beard: '#f1dcc0', pants: '#2b2f38' }); }
function iceScape(t, o = {}) {
  const { kind = 'day', snow = 1, runway = 0 } = o;
  const sky = kind === 'night' ? [[0, '#05070f'], [1, '#1a2a44']] : [[0, '#8fb8e0'], [1, '#e8f2fa']];
  let fl = '';
  if (snow) for (let i = 0; i < 50; i++) fl += `<circle cx="${(rnd(i) * W + t * 140 * (1 + rnd(i + 2))) % W}" cy="${(rnd(i + 5) * H + t * 60) % H}" r="${2 + rnd(i) * 4}" fill="#fff" opacity=".7"/>`;
  return `<defs>${linGrad('ic47' + kind, sky)}</defs><rect width="${W}" height="${H}" fill="url(#ic47${kind})"/>
  ${kind === 'night' ? `<path d="M0 300 Q300 200 600 320 Q900 420 1080 300" stroke="#5fd0a0" stroke-width="40" fill="none" opacity=".25" filter="url(#bgblur)"/>` + stars(50, 801, 800) : ''}
  <path d="M0 900 L200 760 L360 880 L560 700 L760 860 L900 760 L1080 880 L1080 1000 L0 1000 Z" fill="#dfe8f0"/>
  <rect y="980" width="${W}" height="${H}" fill="#f2f6fa"/>
  ${runway ? [...Array(8)].map((_, i) => `<circle cx="${100 + i * 125}" cy="${1350 + Math.sin(i) * 4}" r="12" fill="#ffb03a" filter="url(#zglow)"/>`).join('') : ''}
  ${fl}`;
}
function station(x, y, s = 1, lit = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-300" y="-180" width="600" height="180" rx="20" fill="#c8352c"/><rect x="-300" y="-180" width="600" height="30" fill="#a82a22"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${-250 + i * 110}" y="-130" width="70" height="50" rx="8" fill="${lit ? '#ffd98a' : '#3a4048'}"/>`).join('')}
    ${[-260, 240].map(px => `<rect x="${px}" y="0" width="20" height="60" fill="#55595f"/>`).join('')}<rect x="220" y="-320" width="12" height="140" fill="#55595f"/><circle cx="226" cy="-330" r="30" fill="#e8e8ea"/></g>`;
}
function smallPlane(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="240" ry="50" fill="#e8742a"/><path d="M-60 0 L-140 -170 L-80 -170 L40 0 Z" fill="#c95f20"/><path d="M-220 -10 L-280 -110 L-240 -110 L-180 -10 Z" fill="#c95f20"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${-120 + i * 60}" y="-20" width="34" height="24" rx="8" fill="#2b3a55"/>`).join('')}<rect x="-180" y="40" width="360" height="12" fill="#55595f"/><circle cx="240" cy="0" r="20" fill="#55595f"/></g>`;
}
S.ic_hook = (t, d, T) => ({ svg: zoomAt(iceScape(t) + station(540, 1040, .9), 540, 1100, 1 + .2 * easeIO(seg(t, 0, d))) + pill(540, 300, 'ANTARCTICA', { sc: back(seg(t, .1, .4)), bg: '#2f7aa8', fg: '#fff', size: 46, bold: 700 }) + vign(.4), cam: 1 });
S.ic_setup = (t, d, T) => {
  const c1 = capL('ic_setup', 1, T, t);
  const svg = iceScape(t) + station(540, 1040, .9) + pill(540, 300, t > c1 ? '-40°F' : '40 SCIENTISTS', { sc: back(seg(t, t > c1 ? c1 : .1, (t > c1 ? c1 : .1) + .3)), bg: t > c1 ? '#5fd0ff' : '#25282c', fg: t > c1 ? '#1d1f22' : '#fff', size: 46, bold: 700 }) + vign(.4);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.ic_news = (t, d, T) => {
  const c1 = capL('ic_news', 1, T, t);
  let dots = '';
  for (let i = 0; i < 40; i++) { const off = seg(t, rnd(i) * (c1 + .5), rnd(i) * (c1 + .5) + .3); dots += `<circle cx="${120 + rnd(i + 3) * 840}" cy="${420 + rnd(i + 7) * 500}" r="10" fill="${off >= 1 ? '#3a4048' : '#ffd98a'}" opacity="${1 - off * .7}"/>`; }
  const svg = `<rect width="${W}" height="${H}" fill="#14171c"/><rect x="80" y="360" width="920" height="620" rx="20" fill="#1d2a40"/><path d="M200 500 Q400 420 520 560 Q700 700 880 520 L900 900 L180 900 Z" fill="#2f4a6a"/>${dots}
  ${t > c1 ? `<g transform="translate(540,1300)"><rect x="-260" y="-80" width="520" height="160" rx="20" fill="#2b2f36"/>${[...Array(30)].map((_, i) => `<rect x="${-230 + i * 15}" y="${-5 - rnd(i + Math.floor(t * 20)) * 50}" width="8" height="${10 + rnd(i + Math.floor(t * 20)) * 100}" fill="#8a9098"/>`).join('')}</g>` : ''}` + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.ic_r1 = (t, d, T) => {
  const c1 = capL('ic_r1', 1, T, t);
  const fr = seg(t, c1, d);
  return { svg: iceScape(t) + `<g opacity="1">${zomb({ x: 540, y: 1400, s: 1.3, t: t * (1 - fr), col: '#3a4a5a', eyes: 1 - fr, armsUp: 1 })}</g><rect x="420" y="900" width="240" height="520" rx="40" fill="#cfefff" opacity="${fr * .6}"/>` + (fr > .5 ? pill(540, 1550, 'FROZEN SOLID', { sc: back(seg(t, c1 + .6, c1 + .9)), bg: '#5fd0ff', size: 38, bold: 700 }) : '') + rulePill(1, t) + vign(.4), cam: 1.0 + .04 * (t / d) };
};
S.ic_r2 = (t, d, T) => {
  const svg = `<rect width="${W}" height="${H}" fill="#cfc6b4"/>${[...Array(3)].map((_, r) => [...Array(4)].map((_, c) => `<rect x="${100 + c * 230}" y="${420 + r * 220}" width="190" height="180" fill="${['#c8a878', '#c8352c', '#8a9098'][(r + c) % 3]}"/>`).join('')).join('')}
  <rect y="1150" width="${W}" height="${H}" fill="#8a8a84"/>` + pill(540, 1500, '6 MONTHS', { sc: back(seg(t, capL('ic_r2', 1, T, t), capL('ic_r2', 1, T, t) + .3)), bg: '#3fae5a', fg: '#fff', size: 44, bold: 700 });
  return { svg: svg + rulePill(2, t) + vign(.4), cam: 1.0 + .04 * (t / d) };
};
S.ic_r3 = (t, d, T) => ({ svg: iceScape(t, { snow: 1 }) + station(540, 1040, .9) + [['SHIPS', 300], ['PLANES', 780]].map(([w, x], i) => pill(x, 1550, w, { bg: '#25282c', fg: '#fff', size: 36, bold: 700 }) + bigX(t, capL('ic_r3', 1, T, t) + i * .4, x, 1550, 80)).join('') + rulePill(3, t) + vign(.4), cam: 1.0 + .04 * (t / d) });
S.ic_mistake = (t, d, T) => {
  const c1 = capL('ic_mistake', 1, T, t);
  const svg = `<rect width="${W}" height="${H}" fill="#2b2f36"/><g transform="translate(540,900)"><rect x="-300" y="-220" width="600" height="440" rx="30" fill="#3a3e46"/><rect x="-250" y="-170" width="300" height="160" fill="#0f2014"/>
    <circle cx="160" cy="-90" r="60" fill="#55595f"/><rect x="-60" y="60" width="120" height="120" rx="20" fill="#2b2f36"/>
    ${t > c1 ? `<text x="-100" y="-75" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="36" fill="#7ef0a0">MAYDAY</text>` : ''}</g>` + mistakeFx(t, d) + vign(.5);
  return { svg, cam: 1.0 + .05 * (t / d) };
};
S.ic_call = (t, d, T) => {
  const c1 = capL('ic_call', 1, T, t);
  const svg = `<rect width="${W}" height="${H}" fill="#2b2f36"/>` + radioClose(t, { talk: 1 }) + (t > c1 ? pill(540, 300, '6 PASSENGERS · KIDS', { sc: back(seg(t, c1, c1 + .3)), bg: PAL.yel, size: 38, bold: 700 }) : '') + vign(.5);
  return { svg, cam: 1.0 + .04 * (t / d) };
};
S.ic_vote = (t, d, T) => {
  const c1 = capL('ic_vote', 1, T, t);
  let ppl = '';
  for (let i = 0; i < 6; i++) { const up = i < 3 ? t < c1 : t > c1; ppl += parka({ x: 120 + i * 170, y: 1300, s: 1.1, f: i < 3 ? 1 : -1, armF: [up ? 170 : 20, 0] }, ['#c8352c', '#2f7aa8', '#e8a020'][i % 3]); }
  return { svg: `<rect width="${W}" height="${H}" fill="#cfc6b4"/><rect y="1300" width="${W}" height="${H}" fill="#8a8a84"/>` + ppl + pill(300, 300, 'NO', { bg: PAL.red, fg: '#fff', size: 50, bold: 700 }) + pill(780, 300, 'YES', { bg: '#3fae5a', fg: '#fff', size: 50, bold: 700 }) + vign(.4), cam: 1.0 + .04 * (t / d) };
};
S.ic_land = (t, d, T) => {
  const c1 = capL('ic_land', 1, T, t);
  const k = easeOut(seg(t, c1 - .3, d));
  return { svg: iceScape(t, { kind: 'night', runway: 1 }) + station(880, 1280, .5) + (t > c1 - .3 ? smallPlane(lerp(-300, 520, k), lerp(700, 1280, k), .9) : '') + vign(.5), cam: 1.0 + .04 * (t / d) };
};
S.ic_twist = (t, d, T) => {
  const c = [0, 1, 2].map(i => capL('ic_twist', i, T, t));
  let svg = iceScape(t, { kind: 'night', runway: 1 }) + smallPlane(620, 1280, .9);
  if (t < c[2]) svg += parka({ x: 360, y: 1380, s: 1.4, f: 1, armF: [100 + Math.sin(t * 8) * 8, 60], look: 1 }, '#2f4f9a') + (t > c[1] ? pill(620, 1050, 'NO KIDS', { sc: back(seg(t, c[1], c[1] + .3)), bg: PAL.red, fg: '#fff', size: 38, bold: 700 }) : '');
  else {
    const z = 1 + 1.4 * easeIO(seg(t, c[2], c[2] + .8));
    svg = zoomAt(svg + parka({ x: 360, y: 1380, s: 1.4, f: 1, armF: [100, 60], look: 1 }, '#2f4f9a') + `<rect x="${468 - 20}" y="${987 - 22}" width="40" height="44" rx="10" fill="#f4f4f2" stroke="#8a1a14" stroke-width="6"/>`, 440, 1000, z);
  }
  return { svg: svg + vign(.55), cam: 1 };
};
S.ic_end = (t, d, T) => part2Card(t, d, 'ZOMBIES IN ANTARCTICA');
