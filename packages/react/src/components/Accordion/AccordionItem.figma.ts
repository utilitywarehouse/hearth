// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3390-6160&m=dev
// source=./AccordionItem.tsx
// component=AccordionItem
import figma from 'figma';
const instance = figma.selectedInstance;

const hasCustomContent = instance.getBoolean('Custom content?');
const title = instance.getString('Title');
const description = instance.getString('Description');

const triggerCustomContentSlot = instance.getSlot('Trigger custom content');
const triggerCustomContent =
  triggerCustomContentSlot?.connectedInstances.map(node => node.executeTemplate().example) ?? [];

const customContentSlot = instance.getSlot('Custom content');
const customContent =
  customContentSlot?.connectedInstances.map(node => node.executeTemplate().example) ?? [];

export default {
  // "Custom content?" swaps the simple title/description mapping for the item's raw
  // "Trigger custom content" + "Custom content" slots (see the CustomItemHeader story,
  // which nests a custom AccordionHeader/AccordionTrigger and AccordionContent as children).
  example: hasCustomContent
    ? figma.code`<AccordionItem value="item-1">${triggerCustomContent.flat()}${customContent.flat()}</AccordionItem>`
    : figma.code`<AccordionItem value="item-1"${figma.helpers.react.renderProp('title', title)}${figma.helpers.react.renderProp('description', description)} />`,
  imports: ['import { AccordionItem } from "@utilitywarehouse/hearth-react"'],
  id: 'accordion-item',
  metadata: { nestable: true },
};
