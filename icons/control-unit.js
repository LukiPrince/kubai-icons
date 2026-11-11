import { defineIcon } from '../packages/core/src/kit.js';
import { controlUnitSvg, controlUnitDraw } from './_control-unit.js';

export default defineIcon({
  name: 'control-unit',
  zh: '控制单元',
  category: 'devices',
  tags: ['ecu', 'airbag', 'srs', 'module', 'controller', 'electronics', 'automotive', 'connector', '控制器'],
  variants: ['check', 'x', 'alert', 'cog'],
  // An electronic control unit with a wide connector; on hover a glint sweeps across the connector.
  svg: controlUnitSvg,
  target: (h) => ({ o: h ? 1 : 0 }),
  draw: controlUnitDraw,
  by: 'LukiPrince'
});
