// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2277:14708&m=dev
// source=./DateInput.tsx
// component=DateInput
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const labelVariant = instance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const validationText = instance.getEnum('State', {
  Invalid: instance.getString('Validation'),
  Valid: instance.getString('Validation'),
});
const validationStatus = instance.getEnum('State', {
  Invalid: 'invalid',
  Valid: 'valid',
});
const hideDay = instance.getBoolean('Day?', {
  true: false,
  false: true,
});
const hideMonth = instance.getBoolean('Month?', {
  true: false,
  false: true,
});
const dayValue = instance.getBoolean('Day?', {
  true: instance.getString('Day value'),
  false: undefined,
});
const monthValue = instance.getBoolean('Month?', {
  true: instance.getString('Month value'),
  false: undefined,
});
const yearValue = instance.getString('Year value');
const required = instance.getBoolean('Optional?', {
  true: false,
  false: true,
});

export default {
  id: 'date-input',
  imports: ['import { DateInput } from "@utilitywarehouse/hearth-react"'],
  example: figma.code`<DateInput${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationText', validationText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('hideDay', hideDay)}${figma.helpers.react.renderProp('hideMonth', hideMonth)}${figma.helpers.react.renderProp('dayValue', dayValue)}${figma.helpers.react.renderProp('monthValue', monthValue)}${figma.helpers.react.renderProp('yearValue', yearValue)}${figma.helpers.react.renderProp('required', required)}/>`,
};
