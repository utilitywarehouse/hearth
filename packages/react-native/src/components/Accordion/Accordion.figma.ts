// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3385%3A7751
// component=Accordion

import figma from 'figma';

const instance = figma.selectedInstance;

const sectionHeader = instance.findInstance('Section Header');
const heading = sectionHeader.type !== 'ERROR' ? sectionHeader.getString('Heading') : undefined;
const helperText =
  sectionHeader.type !== 'ERROR' ? sectionHeader.getString('Helper text') : undefined;

// "Accordion items" is a slot — connectedInstances only includes children with their own
// Code Connect definitions, i.e. AccordionItem once its .figma.ts is published.
const itemsSlot = instance.getSlot('Accordion items');
const items = itemsSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];

export default {
  id: 'Accordion',
  imports: ["import { Accordion } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Accordion${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}>
      ${items.flat()}
    </Accordion>`,
  metadata: { nestable: true },
};
