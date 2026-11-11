import { defineIcon, KR, OL, WHITE, R, rp, rr, at } from '../packages/core/src/kit.js';

// A parcel label: a wide barcode on top, address lines below and the lower right corner peeled
// back. The long barcode and the peeled corner set it apart from a document or an invoice.
const X0 = 4, X1 = 27, Y0 = 2, Y1 = 23;
// Bar widths and gap as in barcode.js (1.6 / 2.8, 1.5 apart), centred on x = 16.
const BARS = [1.6, 2.8, 1.6, 1.6, 2.8, 1.6];
let bx = 16 - (BARS.reduce((s, w) => s + w, 0) + 1.5 * (BARS.length - 1)) / 2, bars = '';
for (const w of BARS) { bars += rp(R(bx, 4.8, w, 9.2), 0.4); bx += w + 1.5; }
const ADDR = rr(6.7, 16.6, 11, 1.8, 0.9) + rr(6.7, 19.6, 7, 1.8, 0.9);

export default defineIcon({
  name: 'shipping-label',
  zh: '快递面单',
  category: 'commerce',
  tags: ['parcel', 'label', 'sticker', 'barcode', 'address', 'shipping', 'package', '运单'],
  variants: ['check', 'x', 'alert'],
  // A parcel label with a barcode and address lines; on hover its peeled corner curls back further.
  svg: (u) => `<g filter="${u.sh}"><g filter="${u.hi}"><path data-n="b" fill="${u.loS}"/></g></g><path data-n="bO" ${OL}/>
    <path d="${ADDR}" ${WHITE}/>
    <path d="${bars}" ${WHITE}/>
    <g filter="${u.sh}"><path data-n="fl" fill="#fff" fill-opacity=".72" data-w="fill"/></g><path data-n="flO" stroke-linejoin="round" ${OL}/>`,
  target: (h) => ({ d: h ? 9 : 6.8 }),
  draw(p, E) {
    const d = p.d;
    const body = rp([[X0, Y0], [X1, Y0], [X1, Y1 - d], [X1 - d, Y1], [X0, Y1]], [KR, KR, 0.4, 0.4, KR]);
    const flap = rp([[X1, Y1 - d], [X1 - d, Y1], [X1 - d, Y1 - d]], [0.4, 0.4, 1.6]);
    at(E.b, { d: body }); at(E.bO, { d: body }); at(E.fl, { d: flap }); at(E.flO, { d: flap });
  },
  by: 'LukiPrince'
});
