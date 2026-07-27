// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2160%3A11
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Card/CardRoot.tsx
// component=Card

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Subtle: 'subtle',
});
const colorScheme = figma.selectedInstance.getEnum('Color Scheme', {
  'Neutral Strong': 'neutralStrong',
  'Neutral Subtle': 'neutralSubtle',
  Brand: 'brand',
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Insurance: 'insurance',
  Cashback: 'cashback',
  Pig: 'pig',
  Highlight: 'highlight',
});
const noPadding = figma.selectedInstance.getBoolean('Padding None?');
const content =
  figma.selectedInstance
    .getSlot('Content')
    ?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  id: 'Card',
  imports: ["import { Card } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Card${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp(
    'noPadding',
    noPadding
  )}>
      ${content.flat()}
    </Card>`,
  metadata: { nestable: true, props: { variant, colorScheme, noPadding, content } },
};
