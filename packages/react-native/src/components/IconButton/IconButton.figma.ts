// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=90%3A1455
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/IconButton/IconButton.tsx
// component=IconButton

import figma from 'figma';

const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const size = figma.selectedInstance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
});
const colorScheme = figma.selectedInstance.getEnum('Color Scheme', {
  Affirmative: 'affirmative',
  Destructive: 'destructive',
  Functional: 'functional',
  Highlight: 'highlight',
});
const loading = figma.selectedInstance.getEnum('State', {
  Loading: true,
});
const icon =
  size === 'sm'
    ? figma.selectedInstance.getInstanceSwap('Icon-20')?.executeTemplate().example
    : figma.selectedInstance.getInstanceSwap('Icon-24')?.executeTemplate().example;
const variant = figma.selectedInstance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Solid: 'solid',
  Outline: 'outline',
  Ghost: 'ghost',
});
const inverted = figma.selectedInstance.getBoolean('Inverted?');

export default {
  id: 'IconButton',
  imports: ["import { IconButton } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<IconButton${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp('inverted', inverted)}${figma.helpers.react.renderProp(
    'colorScheme',
    colorScheme
  )}${figma.helpers.react.renderProp('loading', loading)}${figma.helpers.react.renderProp(
    'icon',
    icon
  )}/>`,
  metadata: {
    nestable: true,
    props: { disabled, size, colorScheme, loading, icon, variant, inverted },
  },
};
