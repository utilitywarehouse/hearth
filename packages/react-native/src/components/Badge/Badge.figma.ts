// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=61%3A652
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Badge/Badge.tsx
// component=Badge

import figma from 'figma';

const instance = figma.selectedInstance;

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
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Insurance: 'insurance',
  Cashback: 'cashback',
  Pig: 'pig',
  Highlight: 'highlight',
});
const size = instance.getEnum('Size', {
  'SM-24': 'sm',
  'MD-28': 'md',
});
const flatBase = instance.getBoolean('Flat Base?');
const icon = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-20')?.executeTemplate().example,
  false: '',
});
const text = instance.getString('Text');

export default {
  id: 'Badge',
  imports: ["import { Badge } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Badge${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('flatBase', flatBase)}${figma.helpers.react.renderProp(
    'icon',
    icon
  )}>
      ${figma.helpers.react.renderChildren(text)}
    </Badge>`,
  metadata: { nestable: true, props: { variant, colorScheme, size, flatBase, icon, text } },
};
