// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=5462%3A9728
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/IconContainer/IconContainer.tsx
// component=IconContainer

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
  'LG-64': 'lg',
});
const radiusNone = figma.selectedInstance.getBoolean('Radius None?');
const variant = figma.selectedInstance.getEnum('Variant', {
  Subtle: 'subtle',
  Emphasis: 'emphasis',
});
const color = figma.selectedInstance.getEnum('Color', {
  Pig: 'pig',
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Insurance: 'insurance',
  Cashback: 'cashback',
  Highlight: 'highlight',
});
const iconName = (
  size === 'sm'
    ? figma.selectedInstance.getInstanceSwap('Icon-20')?.executeTemplate().metadata?.props
        ?.componentName
    : figma.selectedInstance.getInstanceSwap('Icon-24')?.executeTemplate().metadata?.props
        ?.componentName
) as string | undefined;
const icon = iconName ? figma.helpers.react.reactComponent(iconName) : undefined;

export default {
  id: 'icon-container',
  imports: [
    "import { IconContainer } from '@utilitywarehouse/hearth-react-native';",
    ...(iconName
      ? [`import { ${iconName} } from '@utilitywarehouse/hearth-react-native-icons';`]
      : []),
  ],
  example: figma.code`<IconContainer${figma.helpers.react.renderProp(
    'icon',
    icon
  )}${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp(
    'radiusNone',
    radiusNone
  )}${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp(
    'color',
    color
  )}/>`,
  metadata: {
    nestable: true,
    props: { size, radiusNone, variant, color, icon },
  },
};
