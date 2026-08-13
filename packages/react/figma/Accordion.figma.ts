// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3385-7751&m=dev
// source=../src/components/Accordion/Accordion.tsx
// component=Accordion
import figma from 'figma';
const instance = figma.selectedInstance;

const showSectionHeader = instance.getBoolean('Section header?');
const sectionHeaderInstance = showSectionHeader
  ? instance.findInstance('Section Header')
  : undefined;
const sectionHeader =
  sectionHeaderInstance && sectionHeaderInstance.type !== 'ERROR'
    ? sectionHeaderInstance
    : undefined;

const heading = sectionHeader?.getString('Heading');
const helperText = sectionHeader?.getBoolean('Helper text?')
  ? sectionHeader.getString('Helper text')
  : undefined;

// Section Header's trailing slot can show a Badge or a Link. Badge resolves via
// executeTemplate(), but Link's Code Connect file is still legacy .figma.tsx
// (UWDS-4757), so its example is hardcoded instead.
const linkInstance = sectionHeader?.getBoolean('Link?')
  ? sectionHeader.findInstance('Link')
  : undefined;
const linkText =
  linkInstance && linkInstance.type !== 'ERROR' ? linkInstance.getString('Text') : undefined;
const trailingContent = sectionHeader?.getBoolean('Badge?')
  ? sectionHeader.findInstance('Badge')?.executeTemplate().example
  : linkInstance
    ? figma.code`<Link href="#">${linkText}</Link>`
    : undefined;

const itemsSlot = instance.getSlot('Accordion items');
const items = itemsSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];

export default {
  example: figma.code`<Accordion type="single"${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}${
    trailingContent ? figma.code` trailingContent={${trailingContent}}` : ''
  }>${items.flat()}</Accordion>`,
  imports: [
    `import { Accordion${linkInstance ? ', Link' : ''} } from "@utilitywarehouse/hearth-react"`,
  ],
  id: 'accordion',
};
