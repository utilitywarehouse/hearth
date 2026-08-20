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
const validationText =
  validationTextInstance && validationTextInstance.type !== 'ERROR'
    ? validationTextInstance.getString('Text')
    : undefined;

const showTrailingContent = instance.getBoolean('Trailing content?');
const trailingContentInstance = showTrailingContent
  ? instance.findInstance('Trailing content')
  : undefined;
const linkInstance =
  trailingContentInstance && trailingContentInstance.type !== 'ERROR'
    ? trailingContentInstance.findInstance('Link')
    : undefined;
const linkExample =
  linkInstance && linkInstance.type !== 'ERROR'
    ? linkInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<DescriptionListItem${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('description', description)}${
    showTrailingContent ? figma.code` link={${linkExample}}` : ''
  }${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)} />`,
  imports: [`import { DescriptionListItem } from "@utilitywarehouse/hearth-react"`],
  id: 'description-list-item',
  metadata: { nestable: true },
};
