import { defineIcon, f, OL, ACC, rp, rr, wave, at } from '../packages/core/src/kit.js';
import { wheel } from './_travel-transport.js';

// A car in side view, front to the right, driven into a brick wall. Three things tell it from a
// plain car: the bonnet is pushed up into two peaks that cover half the windscreen, the nose is
// shorter and jagged where it is crushed, and it lies flat against a wall with brick joints.
const GY = 21.4, WR = 2.5, WYc = GY - WR;          // ground line, wheel radius, wheel centre
const RX = 4.5, FX = 20.5, DEPTH = 1.9;              // rear, crushed nose (= wall edge), depth of the teeth
const REAR_W = 8.6, FRONT_W = 16.4;
const CABIN = rp([[6.2, 12.8], [8.4, 7.0], [13.8, 7.0], [15.8, 12.8]], [0, 2.2, 1.6, 0]);
const GLASS = rp([[8.6, 12.6], [9.7, 8.9], [13.1, 8.9], [14.9, 12.6]], [0, 1, 1, 0]);
// The body; h lifts the two peaks (the spring-back on hover).
const body = (h = 0) => rp([
  [RX, WYc], [RX, 14], [6, 12.6], [13.4, 12.6],
  [14.9, 9.7 - h], [16.4, 12.2], [17.9, 9.9 - h], [19.2, 12.6],
  [FX, 13.4], [FX - DEPTH, 14.8], [FX, 16.1], [FX - DEPTH, 17.5], [FX, 19], [FX, WYc]
], [2.2, 1.2, 1, 0.5, 0.6, 0.3, 0.6, 0.3, 0.4, 0.3, 0.4, 0.3, 0.4, 0.4]);
const WALL_X = FX, WALL_W = 7, WALL_T = 5, WALL = rr(WALL_X, WALL_T, WALL_W, GY - WALL_T, 1.2);
const ROW = (GY - WALL_T) / 3;
const JOINTS = [1, 2].map((i) => `M${f(WALL_X)} ${f(WALL_T + i * ROW)}H${f(WALL_X + WALL_W)}`).join('')
  + [[0, 2.8], [1, 5], [2, 2.8]].map(([i, dx]) => `M${f(WALL_X + dx)} ${f(WALL_T + i * ROW)}V${f(WALL_T + (i + 1) * ROW)}`).join('');
const AX = REAR_W, AY = WYc;

// Hover: the car first lunges at the wall, then springs back and settles.
const sm = (t) => t * t * (3 - 2 * t);
const jolt = (t) => {
  if (t < 0.16) return 1.2 * sm(t / 0.16);
  const u = (t - 0.16) / 0.84;
  return 1.2 * (1 - sm(u)) - 2.5 * Math.sin(Math.PI * u) * (1 - 0.3 * u) + 0.5 * Math.sin(2.5 * Math.PI * u) * (1 - u) * Math.sin(Math.PI * u);
};

export default defineIcon({
  name: 'car-crash',
  zh: '汽车碰撞',
  category: 'transport',
  tags: ['crash', 'accident', 'collision', 'wreck', 'damage', 'car', 'wall', 'insurance', '事故', '撞车'],
  variants: [],
  // A car with a crumpled front nose-first against a brick wall; on hover it lunges at the wall and springs back.
  svg: (u) => `
    <g data-n="car">
      <g filter="${u.sh}"><g filter="${u.hi}"><path d="${CABIN}" fill="${u.loS}"/></g></g><path d="${CABIN}" ${OL}/>
      <path d="${GLASS}" fill="#fff"/>
      <g filter="${u.sh}"><g filter="${u.hi}"><path data-n="body" d="${body(0)}" fill="${u.upS}"/></g></g><path data-n="bodyO" d="${body(0)}" ${OL}/>
      ${wheel(u, REAR_W, WYc, WR)}${wheel(u, FRONT_W, WYc, WR)}
    </g>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${WALL}" fill="${u.loS}"/></g></g><path d="${WALL}" ${OL}/>
    <path d="${JOINTS}" ${ACC}/>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const o = Math.max(0, Math.min(1, p.o));
    const dx = wave(o, jolt);
    const tilt = wave(o, (t) => -2 * Math.sin(Math.PI * Math.min(1, t * 1.6)) * (1 - t));
    const hh = wave(o, (t) => 0.6 * Math.sin(Math.PI * Math.min(1, t * 1.3)) * (1 - t));
    at(E.car, { transform: `translate(${f(dx)} 0) rotate(${f(tilt)} ${AX} ${AY})` });
    const b = body(hh);
    at(E.body, { d: b }); at(E.bodyO, { d: b });
  },
  by: 'LukiPrince'
});
