// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7247-4636&m=dev
// source=./DescriptionList.tsx
// component=DescriptionList
import figma from 'figma';
const instance = figma.selectedInstance;

const showSectionHeader = instance.getBoolean('Section header?');
const sectionHeaderInstance = showSectionHeader
  ? instance.findInstance('Section Header')
  : undefined;
const sectionHeaderTemplate =
  sectionHeaderInstance && sectionHeaderInstance.type !== 'ERROR'
    ? sectionHeaderInstance.executeTemplate()
    : undefined;
const sectionHeader = sectionHeaderTemplate?.metadata.props;

const itemLayers = instance.findLayers(n => n.type === 'INSTANCE' && n.name === 'Item');
const children = itemLayers
  .map(item => (item.type === 'INSTANCE' ? item.executeTemplate().example : undefined))
  .filter(Boolean);

export default {
  example: figma.code`<DescriptionList${figma.helpers.react.renderProp('heading', sectionHeader?.heading)}${figma.helpers.react.renderProp('helperText', sectionHeader?.helperText)}${
    sectionHeader?.trailingContent
      ? figma.code` trailingContent={${sectionHeader.trailingContent}}`
      : ''
  }${figma.helpers.react.renderProp('validationStatus', sectionHeader?.validationStatus)}${figma.helpers.react.renderProp('validationText', sectionHeader?.validationText)}>${children.flat()}</DescriptionList>`,
  imports: [
    `import { DescriptionList${sectionHeaderTemplate?.metadata.needsLinkImport ? ', Link' : ''} } from "@utilitywarehouse/hearth-react"`,
  ],
  id: 'description-list',
  metadata: { nestable: true },
};
