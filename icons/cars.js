import { defineIcon, f, OL, rp, circ, rattle, clamp01, at } from '../packages/core/src/kit.js';

// Three complete cars in side view, staggered from up-left to down-right so that each one shows
// its cabin, window, body, front end and at least one wheel.
const S = 0.78, DX = 4.2, DY = 5.2, X0 = 2.0, Y0 = 1.0, WR = 2.2;
function car(u, x, y, front, id) {
  const P = (pts) => pts.map(([px, py]) => [x + (px - 3.6) * S, y + (py - 3.8) * S]);
  const cabin = rp(P([[7.8, 10.6], [10.6, 3.8], [20, 3.8], [24, 10.6]]), [0, 1.3, 1.5, 0]);
  const win = rp(P([[10.6, 10.6], [12.2, 6.2], [20, 6.2], [22.4, 10.6]]), [0, 0.8, 0.9, 0]);
  const body = rp(P([[3.6, 10.2], [27.4, 10.2], [27.4, 18], [3.6, 18]]), [1.8, 2.2, 1.8, 1.8]);
  const wy = y + (18 - 3.8) * S;
  const w1 = x + (9.6 - 3.6) * S, w2 = x + (21.4 - 3.6) * S;
  const bodyFill = front ? u.upS : u.loS;
  const wheel = (cx) => `<path d="${circ(cx, wy, WR)}" fill="${u.pure('#4389FF')}"/>`;
  return `<g data-n="${id}">
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${cabin}" fill="${u.loS}"/></g></g><path d="${cabin}" ${OL}/>
    <path d="${win}" fill="#fff"/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${body}" fill="${bodyFill}"/></g></g><path d="${body}" ${OL}/>
    ${wheel(w1)}${wheel(w2)}
  </g>`;
}

export default defineIcon({
  name: 'cars',
  zh: '车队',
  category: 'transport',
  tags: ['fleet', 'vehicles', 'convoy', 'traffic', 'automobiles', 'garage', '车辆'],
  variants: ['plus', 'check', 'x', 'search'],
  // Three cars staggered one behind the other; on hover the convoy rolls forward, rocks and settles.
  svg: (u) => car(u, X0, Y0, false, 'a') + car(u, X0 + DX, Y0 + DY, false, 'b') + car(u, X0 + 2 * DX, Y0 + 2 * DY, true, 'c'),
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = clamp01(p.o);
    const go = (el, k, cy) => at(el, { transform: `translate(${f(k * (1.1 * o + rattle(o, 0.8, 1)))} 0) rotate(${f(k * rattle(o, -2, 2))} ${f(cy[0])} ${f(cy[1])})` });
    go(E.c, 1, [X0 + 2 * DX + 9, Y0 + 2 * DY + 10]);
    go(E.b, 0.7, [X0 + DX + 9, Y0 + DY + 10]);
    go(E.a, 0.45, [X0 + 9, Y0 + 10]);
  },
  by: 'LukiPrince'
});
