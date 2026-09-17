// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2437-621&m=dev
// source=./List.tsx
// component=List
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

const variant = instance.getEnum('Container', {
  'Emphasis Warm White': 'emphasis',
  'Emphasis White': 'emphasis',
  'Subtle Warm White': 'subtle',
  'Subtle White': 'subtle',
  None: undefined,
});

const colorScheme = instance.getEnum('Container', {
  'Emphasis Warm White': 'neutralSubtle',
  'Emphasis White': 'neutralStrong',
  'Subtle Warm White': 'neutralSubtle',
  'Subtle White': 'neutralStrong',
  None: undefined,
});

const itemsSlot = instance.getSlot('List Container');
const items = itemsSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];

export default {
  example: figma.code`<List${figma.helpers.react.renderProp('heading', sectionHeader?.heading)}${figma.helpers.react.renderProp('helperText', sectionHeader?.helperText)}${
    sectionHeader?.trailingContent
      ? figma.code` trailingContent={${sectionHeader.trailingContent}}`
      : ''
  }${figma.helpers.react.renderProp('validationStatus', sectionHeader?.validationStatus)}${figma.helpers.react.renderProp('validationText', sectionHeader?.validationText)}${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}>${items.flat()}</List>`,
  imports: [
    `import { List${sectionHeaderTemplate?.metadata.needsLinkImport ? ', Link' : ''} } from "@utilitywarehouse/hearth-react"`,
  ],
  id: 'list',
};
