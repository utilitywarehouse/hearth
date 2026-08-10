// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7247-4636&m=dev
// source=../src/components/DescriptionList/DescriptionList.tsx
// component=DescriptionList
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
// Badge is a Figma-only decorative element with no React prop equivalent.
const trailingContent = sectionHeader?.getBoolean('Link?')
  ? sectionHeader.findInstance('Link')?.executeTemplate().example
  : undefined;

const itemLayers = instance.findLayers(n => n.type === 'INSTANCE' && n.name === 'Item');
const children = itemLayers
  .map(item => (item.type === 'INSTANCE' ? item.executeTemplate().example : undefined))
  .filter(Boolean);

export default {
  example: figma.code`<DescriptionList${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}${
    trailingContent ? figma.code` trailingContent={${trailingContent}}` : ''
  }>${children.flat()}</DescriptionList>`,
  imports: ['import { DescriptionList } from "@utilitywarehouse/hearth-react"'],
  id: 'description-list',
  metadata: { nestable: true },
};
