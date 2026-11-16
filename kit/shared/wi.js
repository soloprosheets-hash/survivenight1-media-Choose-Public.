// ---------- "What if" standalone batch: shared toolkit ----------
function youGuy(o = {}) { return recolor(o, { coat: '#5a6270', coatD: '#474e5a', hat: '#2b2f36', hatD: '#1f2228', beard: '#f1dcc0', pants: '#2f3a4a' }); }
function attendant(o = {}) { return recolor(o, { coat: '#24407a', coatD: '#1c3262', hat: '#c8352c', hatD: '#a82a22', beard: '#f1dcc0', pants: '#24407a' }); }
function sickGuy(o = {}, col = '#7a6a5a') { return recolor(o, { coat: col, coatD: col, hat: '#3a2e26', hatD: '#3a2e26', beard: '#a9b890', skin: '#a9b890', skinD: '#93a27c' }); }
function rulePill(n, t, x = 540, y = 220) { return pill(x, y, `RULE ${n}`, { sc: back(seg(t, .05, .35)), bg: PAL.yel, size: 48, bold: 700 }); }
function mistakeFx(t, d) {
  const k = seg(t, 0, .35);
  return `<rect width="${W}" height="${H}" fill="#b80f0f" opacity="${.12 + .06 * Math.sin(t * 6)}"/>` +
    `<g transform="translate(540,230) scale(${back(k)})"><rect x="-300" y="-62" width="600" height="124" rx="62" fill="${PAL.red}"/><text x="0" y="22" text-anchor="middle" font-family="Anton" font-size="66" fill="#fff" letter-spacing="3">DEADLY MISTAKE</text></g>`;
}
function bigX(t, a, x = 540, y = 760, r = 260) {
  const k = back(seg(t, a, a + .3));
  return k > 0 ? `<g opacity="${clamp(k)}" transform="translate(${x} ${y}) scale(${k})"><line x1="${-r}" y1="${-r}" x2="${r}" y2="${r}" stroke="${PAL.red}" stroke-width="44" stroke-linecap="round"/><line x1="${r}" y1="${-r}" x2="${-r}" y2="${r}" stroke="${PAL.red}" stroke-width="44" stroke-linecap="round"/></g>` : '';
}
function part2Card(t, d, place) {
  const a = easeOut(seg(t, 0, .6)), b = easeOut(seg(t, .45, .95)), c = easeOut(seg(t, .9, 1.4));
  const g = lerp(110, 245, a) | 0;
  return { svg: `<rect width="${W}" height="${H}" fill="#0b0b0e"/>
  <text x="540" y="700" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="38" fill="#e8e8ea" opacity="${a * .7}" letter-spacing="8">${place}</text>
  <text x="540" y="900" text-anchor="middle" font-family="Anton" font-size="190" fill="rgb(${g},${g},${g})" opacity="${a}" letter-spacing="6" transform="translate(540 840) scale(${lerp(1.15, 1, a)}) translate(-540 -840)">PART 2?</text>
  <rect x="${540 - 220 * b}" y="955" width="${440 * b}" height="6" fill="${PAL.red}"/>
  <text x="540" y="1050" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="50" fill="${PAL.red}" letter-spacing="5" opacity="${b}">COMMENT IF YOU WANT IT</text>`, cam: 1 };
}
function glowEyes(x, y, k = 1, gap = 22, r = 6) { return `<g opacity="${k}"><circle cx="${x}" cy="${y}" r="${r}" fill="#e9f5d0" filter="url(#zglow)"/><circle cx="${x + gap}" cy="${y}" r="${r}" fill="#e9f5d0" filter="url(#zglow)"/></g>`; }
function phone2(x, y, s, lines, o = {}) {
  const { glow = 0, col = '#d92a22', title = 'EMERGENCY ALERT' } = o;
  return `<g transform="translate(${x},${y}) scale(${s})">${glow ? `<rect x="-190" y="-370" width="380" height="740" rx="70" fill="${col}" opacity="${glow * .35}" filter="url(#bgblur)"/>` : ''}
    <rect x="-160" y="-330" width="320" height="660" rx="48" fill="#121418"/><rect x="-146" y="-316" width="292" height="632" rx="38" fill="#101826"/>
    <rect x="-132" y="-220" width="264" height="${80 + lines.length * 40}" rx="18" fill="#e9e6e2"/><rect x="-132" y="-220" width="264" height="44" rx="18" fill="${col}"/>
    <text x="0" y="-190" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="20" fill="#fff">⚠ ${title}</text>
    ${lines.map((l, i) => `<text x="-116" y="${-140 + i * 40}" font-family="Oswald" font-weight="${i ? 500 : 700}" font-size="28" fill="#1d1f22">${l}</text>`).join('')}</g>`;
}
function zoomAt(svg, x, y, z) { return `<g transform="translate(${x} ${y}) scale(${z}) translate(${-x} ${-y})">${svg}</g>`; }
