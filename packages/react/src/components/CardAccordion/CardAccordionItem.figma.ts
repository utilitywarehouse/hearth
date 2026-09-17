// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=11895-1771&m=dev
// source=./CardAccordionItem.tsx
// component=CardAccordionItem
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Heading');
const description = instance.getBoolean('Helper text?')
  ? instance.getString('Helper text')
  : undefined;

const showSummary = instance.getBoolean('Summary?');
const descriptionListInstance = showSummary ? instance.findInstance('Description List') : undefined;
const descriptionList =
  descriptionListInstance && descriptionListInstance.type !== 'ERROR'
    ? descriptionListInstance
    : undefined;
const sectionHeaderInstance = descriptionList?.getBoolean('Section header?')
  ? descriptionList.findInstance('Section Header')
  : undefined;
const sectionHeader =
  sectionHeaderInstance && sectionHeaderInstance.type !== 'ERROR'
    ? sectionHeaderInstance
    : undefined;
const summaryTitle = sectionHeader?.getString('Heading');

export default {
  example: figma.code`<CardAccordionItem value="item-1"${figma.helpers.react.renderProp('title', title)}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp('summaryTitle', summaryTitle)}${
    showSummary ? figma.code` summaryDescription={<>{/* content */}</>}` : ''
  } />`,
  imports: ['import { CardAccordionItem } from "@utilitywarehouse/hearth-react"'],
  id: 'card-accordion-item',
  metadata: { nestable: true },
};
