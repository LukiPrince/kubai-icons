import { OL, DEEP, rp, ellipse, at, wave } from '../packages/core/src/kit.js';

// An electronic control unit in an oblique view: the connector side stands square at the front and
// the depth runs away to the upper left. Visible are the lid (with a label), the left side (with two
// mounting lugs at the foot) and the front, which is almost all connector.
const X0 = 9.6, W = 13.4;          // front: left edge, width
const YB = 18.6, HF = 7.8;          // front: bottom, height
const DX = 2.4, DY = 4.4;           // depth towards the back (upper left)
const YT = YB - HF;
const back = ([x, y], s = 1) => [x - DX * s, y - DY * s];

const FRONT = rp([[X0, YT], [X0 + W, YT], [X0 + W, YB], [X0, YB]], [0.6, 1.4, 1.8, 1.4]);
const TOP = rp([back([X0, YT]), back([X0 + W, YT]), [X0 + W, YT], [X0, YT]], [1.6, 1.8, 1.4, 0.6]);
const LEFT = rp([back([X0, YT]), [X0, YT], [X0, YB], back([X0, YB])], [1.6, 0.6, 1.4, 1.4]);
// The connector: almost the whole front, flush at the bottom, with its own corners at the top.
const PLUG = rp([[X0 + 1.8, YT + 2.2], [X0 + W - 1.8, YT + 2.2], [X0 + W - 1.8, YB], [X0 + 1.8, YB]], [1.2, 1.2, 0, 0]);
// Ribs 1.6 wide, the content-line width (PROMPT.md §7).
const RIBS = [0.2, 0.5, 0.8].map((k) => { const x = X0 + 1.8 + (W - 3.6) * k; return rp([[x - 0.8, YT + 4.7], [x + 0.8, YT + 4.7], [x + 0.8, YB - 0.8], [x - 0.8, YB - 0.8]], 0.4); }).join('');
const LATCH = rp([[X0 + 3.2, YT + 3.2], [X0 + W - 3.2, YT + 3.2], [X0 + W - 3.2, YT + 4.1], [X0 + 3.2, YT + 4.1]], 0.4);
// The label on the lid, towards the back edge.
const LABEL = rp([back([X0 + 1.6, YT], 0.85), back([X0 + W - 1.4, YT], 0.85), back([X0 + W - 1.4, YT], 0.3), back([X0 + 1.6, YT], 0.3)], 0.5);
// Lugs: flat plates at the foot of both sides, two on each (front and back). On the left they are
// offset by the perspective; on the right the front hides their roots, so both end the same
// distance from the front and keep their holes clear.
const LUG_S = [0.3, 0.86], LUG_W = 0.26, LUG_L = 3.8, LUG_R = 4.2;
const plate = (a, b, x0, x1) => rp([[x0(a), a[1]], [x1(a), a[1]], [x1(b), b[1]], [x0(b), b[1]]], [0, 1.6, 1.6, 0]);
const LUGS_L = LUG_S.map((s) => plate(back([X0, YB], s - LUG_W), back([X0, YB], s + LUG_W), (p) => p[0] + 1, (p) => p[0] - LUG_L)).join('');
// The rear lug on the right sits further in so that it does not stick out.
const END_R = [LUG_R, LUG_R - 1.2], HOLE_R = [1.6, 1.4];
const LUGS_R = LUG_S.map((s, i) => plate(back([X0 + W, YB], s - LUG_W), back([X0 + W, YB], s + LUG_W), (p) => p[0] - 1, () => X0 + W + END_R[i])).join('');
const HOLES_L = LUG_S.map((s) => { const [x, y] = back([X0, YB], s); return ellipse(x - LUG_L + 1.6, y - 0.1, 1.25, 1); }).join('');
const HOLES_R = LUG_S.map((s, i) => { const [, y] = back([X0 + W, YB], s); return ellipse(X0 + W + END_R[i] - HOLE_R[i], y - 0.1, 1.25, 1); }).join('');
const lugs = (d, holes, u) => `<g filter="${u.sh}"><path d="${d}" transform="translate(0 1)" ${DEEP}/></g><path d="${d}" transform="translate(0 1)" ${OL}/>
    <g filter="${u.hi}"><path d="${d}" fill="${u.loS}"/></g><path d="${holes}" ${DEEP}/>`;

export function controlUnitSvg(u) {
  return `${lugs(LUGS_R, HOLES_R, u)}
    ${lugs(LUGS_L, HOLES_L, u)}
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${LEFT}" fill="${u.loS}"/></g></g><path d="${LEFT}" ${OL}/>
    <g filter="${u.sh}"><g filter="${u.hi}"><path d="${FRONT}" fill="${u.loS}"/></g></g><path d="${FRONT}" ${OL}/>
    <g filter="${u.hi}"><path d="${TOP}" fill="${u.upS}"/></g><path d="${TOP}" ${OL}/>
    <path d="${LABEL}" fill="#fff"/>
    <g filter="${u.hi}"><path d="${PLUG}" fill="${u.upS}"/></g><path d="${PLUG}" ${OL}/>
    <path d="${RIBS + LATCH}" ${DEEP}/>
    <clipPath id="${u.id('pc')}"><path d="${PLUG}"/></clipPath>
    <g clip-path="url(#${u.id('pc')})"><path data-n="gl" fill="#fff" opacity=".45"/></g>`;
}

// A glint sweeps across the connector.
export function controlUnitDraw(p, E) {
  const x = wave(p.o, (t) => X0 - 2 + (W + 4) * t);
  at(E.gl, { d: rp([[x, YT], [x + 2.2, YT], [x - 0.6, YB + 1], [x - 2.8, YB + 1]], 0) });
}
