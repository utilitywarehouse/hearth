// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2437-621&m=dev
// source=../src/components/List/List.tsx
// component=List
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
  example: figma.code`<List${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}>${items.flat()}</List>`,
  imports: ['import { List } from "@utilitywarehouse/hearth-react"'],
  id: 'list',
};
