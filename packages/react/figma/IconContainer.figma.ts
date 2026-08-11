// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=5462-9728&m=dev
// source=../src/components/IconContainer/IconContainer.tsx
// component=IconContainer

import figma from 'figma';
const instance = figma.selectedInstance;

const icon20 = instance.getInstanceSwap('Icon-20')?.executeTemplate().example;
const icon24 = instance.getInstanceSwap('Icon-24')?.executeTemplate().example;
const size = instance.getEnum('Size', {
  'MD-48': 'md',
  'SM-32': 'sm',
  'LG-64': 'lg',
});
const variant = instance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Subtle: 'subtle',
});
const colorScheme = instance.getEnum('Color', {
  Highlight: 'highlight',
  Pig: 'pig',
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Cashback: 'cashback',
  Insurance: 'insurance',
});
const borderRadius = instance.getBoolean('Radius None?', {
  true: 'none',
  false: undefined,
});

export default {
  id: 'icon-container',
  imports: ['import { IconContainer } from "@utilitywarehouse/hearth-react"'],
  example: figma.code`<IconContainer${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('borderRadius', borderRadius)}>${figma.helpers.react.renderChildren(icon20)}${figma.helpers.react.renderChildren(icon24)}</IconContainer>`,
  metadata: { nestable: true },
};
