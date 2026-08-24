// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=11913-3539&m=dev
// source=./CardAccordion.tsx
// component=CardAccordion
import figma from 'figma';
const instance = figma.selectedInstance;

// "Card Accordion" has no items slot in Figma, so items are located by layer
// name/type rather than `getSlot()` (see skill: compound components without a slot).
const itemLayers = instance.findLayers(node => node.type === 'INSTANCE' && node.name === 'Accordion Item');
const items = itemLayers
  .filter(layer => layer.type === 'INSTANCE')
  .map(layer => layer.executeTemplate().example);

export default {
  example: figma.code`<CardAccordion>${items.flat()}</CardAccordion>`,
  imports: ['import { CardAccordion } from "@utilitywarehouse/hearth-react"'],
  id: 'card-accordion',
};
