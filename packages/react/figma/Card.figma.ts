// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2160-11&m=dev
// source=../src/components/Card/Card.tsx
// component=Card
import figma from 'figma';
const instance = figma.selectedInstance;

const contentSlot = instance.getSlot('Content');
const children = contentSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];
const variant = instance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Subtle: 'subtle',
});
const colorScheme = instance.getEnum('Color Scheme', {
  'Neutral Strong': 'neutralStrong',
  'Neutral Subtle': 'neutralSubtle',
  Brand: 'brand',
  Pig: 'pig',
  Highlight: 'highlight',
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Insurance: 'insurance',
  Cashback: 'cashback',
});
const paddingNone = instance.getBoolean('Padding None?');

export default {
  id: 'card',
  imports: ['import { Card } from "@utilitywarehouse/hearth-react"'],
  example: figma.code`<Card${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('paddingNone', paddingNone)}>${children.flat()}</Card>`,
  metadata: { nestable: true },
};
