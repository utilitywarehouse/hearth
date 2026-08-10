// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3141-4275&m=dev
// source=../src/components/CheckboxGroup/CheckboxGroup.tsx
// component=CheckboxGroup
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Group label');
const labelVariant = instance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const validationStatus = instance.getEnum('State', {
  Default: 'valid',
  Invalid: 'invalid',
});
const validationText = instance.getEnum('State', {
  Default: undefined,
  Invalid: instance.getString('Validation text'),
});
const direction = instance.getEnum('Direction', {
  Column: 'column',
  Row: 'row',
});

const contentType = instance.getEnum('Content', {
  Checkbox: 'checkbox',
  'Checkbox Tile': 'checkbox-tile',
});

const childInstance =
  contentType === 'checkbox-tile'
    ? instance.findInstance('Checkbox Tile')
    : instance.findInstance('Checkbox');

const children =
  childInstance && childInstance.type !== 'ERROR'
    ? childInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<CheckboxGroup${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)}${figma.helpers.react.renderProp('direction', direction)}>${figma.helpers.react.renderChildren(children)}</CheckboxGroup>`,
  imports: ['import { CheckboxGroup } from "@utilitywarehouse/hearth-react"'],
  id: 'checkbox-group',
  metadata: { nestable: true },
};
