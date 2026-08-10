// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7247-5209&m=dev
// source=../src/components/DescriptionList/DescriptionListItem.tsx
// component=DescriptionListItem
import figma from 'figma';
const instance = figma.selectedInstance;

const heading = instance.getString('Heading');
const description = instance.getBoolean('Description?', {
  true: instance.getString('Description'),
  false: undefined,
});

const validationStatus = instance.getEnum('State', {
  Invalid: 'invalid',
});

const validationTextInstance = instance.findInstance('Validation Text');
const validationText = validationTextInstance && validationTextInstance.type !== 'ERROR'
  ? validationTextInstance.getString('Text')
  : undefined;

// Trailing content contains a Link component. Link's Code Connect file is still the
// legacy .figma.tsx format (UWDS-4757), so it can't be resolved via executeTemplate()
// yet — omitting for now.

export default {
  example: figma.code`<DescriptionListItem${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)} />`,
  imports: ['import { DescriptionListItem } from "@utilitywarehouse/hearth-react"'],
  id: 'description-list-item',
  metadata: { nestable: true },
};
