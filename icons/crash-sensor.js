import { defineIcon, OL, DEEP, rp, ellipse, at, rattle } from '../packages/core/src/kit.js';

// A crash sensor with a cast housing. Its lid face, with the pale label (front left corner cut
// out), stands at the front. Behind it the depth runs to the lower right: the end face with the
// dark socket, and the lower edge. At the right end sits the raised connector block, and on each
// side a flat lug with a screw hole.
const XF0 = 8.2, XF1 = 19.8, YT = 6.8, YB = 14.8;         // lid face: left, right, top, bottom
const TX = 4.6, TY = 3.6;                                   // depth (end face, lower edge)
const XB = XF1 - 3.6;                                       // start of the connector block
const BODY = rp([[XF0, YT], [XF1, YT], [XF1 + TX, YT + TY], [XF1 + TX, YB + TY], [XF0 + TX, YB + TY], [XF0, YB]], [1.2, 0.8, 1.0, 1.4, 0.8, 1.0]);
const FACE = rp([[XF0, YT], [XF1, YT], [XF1, YB], [XF0, YB]], [1.2, 1.2, 1.2, 1.2]);
const BLOCK = rp([[XB, YT], [XF1, YT], [XF1, YB], [XB, YB]], [0.8, 1.2, 1.2, 0.8]);
const STRIP = `M${XB - 0.9} ${YT + 0.4}H${XB}V${YB - 0.4}H${XB - 0.9}Z`;     // shadow left of the block
// The label, with its lower left corner cut out.
const LX0 = XF0 + 1.2, LX1 = XB - 1.2, LY0 = YT + 1.2, LY1 = YB - 1.2, NX = 3.4, NY = 3.0;
const LABEL = rp([[LX0, LY0], [LX1, LY0], [LX1, LY1], [LX0 + NX, LY1], [LX0 + NX, LY1 - NY], [LX0, LY1 - NY]], [0.8, 0.8, 0.8, 0.8, 1.2, 0.8]);
// The socket in the end face (a parallelogram), inset from the edges.
const sx = (w) => XF1 + TX * w, sy = (v, w) => YB - v * (YB - YT) + TY * w;
const SOCKET = rp([[sx(0.16), sy(0.84, 0.16)], [sx(0.84), sy(0.84, 0.84)], [sx(0.84), sy(0.16, 0.84)], [sx(0.16), sy(0.16, 0.16)]], 0.8);
// Lugs: on the right a trapezoid with a rounded end at the foot of the end face, on the left an ear at the lower left.
const RX0 = XF1 + TX - 0.4, RX1 = XF1 + TX + 3.2, RY0 = YT + 3.2, RY1 = YB + TY - 1.5;
const LUG_R = rp([[RX0, RY0], [RX1, RY0 + 0.9], [RX1, RY1 - 0.9], [RX0, RY1]], [0, 1.0, 1.0, 0]);
const HOLE_R = ellipse(RX1 - 1.65, (RY0 + RY1) / 2, 1.2, 1.2);
const LX = XF0 - 3.6, LUY0 = YB - 4.8, LUY1 = YB + 0.8;
const LUG_L = rp([[XF0 + 1.4, LUY0], [LX, LUY0 + 0.7], [LX, LUY1 - 0.7], [XF0 + 1.4, LUY1]], [0, 1.2, 1.2, 0]);
const HOLE_L = ellipse(LX + 1.95, (LUY0 + LUY1) / 2, 1.25, 1.25);

export default defineIcon({
  name: 'crash-sensor',
  zh: '碰撞传感器',
  category: 'devices',
  tags: ['airbag', 'impact', 'acceleration', 'sensor', 'crash', 'collision', 'automotive', 'ecu', '传感器'],
  variants: ['check', 'x', 'alert'],
  // A crash sensor with a label, connector block and mounting lugs; on hover it shudders briefly, as if hit, and settles.
  svg: (u) => `<g data-n="g">
    <g filter="${u.sh}"><path d="${LUG_L}" transform="translate(0.5 1.1)" ${DEEP}/></g><path d="${LUG_L}" transform="translate(0.5 1.1)" ${OL}/>
    <g filter="${u.hi}"><path d="${LUG_L}" fill="${u.loS}"/></g><path d="${LUG_L}" ${OL}/>
    <path d="${HOLE_L}" ${DEEP}/>
    <g filter="${u.sh}"><path d="${BODY}" fill="${u.loS}"/></g><path d="${BODY}" fill-opacity=".35" ${DEEP}/><path d="${BODY}" ${OL}/>
    <g filter="${u.hi}"><path d="${FACE}" fill="${u.loS}"/></g><path d="${FACE}" ${OL}/>
    <path d="${LABEL}" fill="#fff"/>
    <path d="${STRIP}" fill-opacity=".3" ${DEEP}/>
    <g filter="${u.hi}"><path d="${BLOCK}" fill="${u.loS}"/></g><path d="${BLOCK}" ${OL}/>
    <path d="${SOCKET}" ${DEEP}/>
    <g filter="${u.sh}"><path d="${LUG_R}" transform="translate(0.5 1.1)" ${DEEP}/></g><path d="${LUG_R}" transform="translate(0.5 1.1)" ${OL}/>
    <g filter="${u.hi}"><path d="${LUG_R}" fill="${u.loS}"/></g><path d="${LUG_R}" ${OL}/>
    <path d="${HOLE_R}" ${DEEP}/></g>`,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw(p, E) {
    const dx = rattle(p.o, 1.8, 3);
    at(E.g, { transform: `translate(${dx.toFixed(3)} 0)` });
  },
  by: 'LukiPrince'
});
