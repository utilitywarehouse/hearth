// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=61-652&m=dev
// source=./Badge.tsx
// component=Badge
import figma from 'figma';
const instance = figma.selectedInstance;

const children = instance.getString('Text');
const variant = instance.getEnum('Variant', {
  'Subtle - Default': 'subtle',
  Emphasis: 'emphasis',
  Outline: 'outline',
});
const colorScheme = instance.getEnum('Color Scheme', {
  Info: 'info',
  Positive: 'positive',
  Danger: 'danger',
  Warning: 'warning',
  Functional: 'functional',
  Pig: 'pig',
  Energy: 'energy',
  Mobile: 'mobile',
  Broadband: 'broadband',
  Insurance: 'insurance',
  Cashback: 'cashback',
  Highlight: 'highlight',
});
const size = instance.getEnum('Size', {
  'SM-24': 'sm',
  'MD-28': 'md',
});
const flatBase = instance.getBoolean('Flat Base?');
const icon = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-20')?.executeTemplate().example,
  false: undefined,
});

export default {
  example: figma.code`<Badge${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('flatBase', flatBase)}>${figma.helpers.react.renderChildren(icon)}${figma.helpers.react.renderChildren(children)}</Badge>`,
  imports: ['import { Badge } from "@utilitywarehouse/hearth-react"'],
  id: 'badge',
  metadata: { nestable: true },
};
