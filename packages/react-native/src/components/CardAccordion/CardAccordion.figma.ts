// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=11913-3539
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/CardAccordion/CardAccordion.tsx
// component=CardAccordion
import figma from 'figma';

const instance = figma.selectedInstance;

// "Card Accordion" has no items slot in Figma, so items are located by layer name rather than
// `getSlot()`.
const items = instance
  .findLayers(node => node.type === 'INSTANCE' && node.name === 'Accordion Item')
  .map(layer => (layer.type === 'INSTANCE' ? layer.executeTemplate().example : []));

export default {
  id: 'card-accordion',
  imports: ["import { CardAccordion } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<CardAccordion>
  ${items.flat()}
</CardAccordion>`,
  metadata: { props: { items } },
};
