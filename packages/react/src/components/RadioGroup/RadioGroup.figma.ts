// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13254&m=dev
// source=./RadioGroup.tsx
// component=RadioGroup
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
const validationText = instance.getEnum('State', {
  Invalid: instance.getString('Validation text'),
});
const validationStatus = instance.getEnum('State', {
  Invalid: 'invalid',
});
const direction = instance.getEnum('Direction', {
  Column: 'column',
  Row: 'row',
});
const children = instance.getEnum('Content', {
  Radio: figma.properties.children(['Radio']),
  'Radio Tile': figma.properties.children(['Radio Tile']),
});

export default {
  id: 'radio-group',
  imports: ['import { RadioGroup } from "@utilitywarehouse/hearth-react"'],
  example: figma.code`<RadioGroup${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationText', validationText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('direction', direction)}>${figma.helpers.react.renderChildren(children)}</RadioGroup>`,
  metadata: { nestable: true },
};
