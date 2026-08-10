// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2685-7021&m=dev
// source=../src/components/TextInput/TextInput.tsx
// component=TextInput
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
const required = instance.getBoolean('Optional?', {
  true: false,
  false: true,
});

export default {
  example: figma.code`<TextInput${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationText', validationText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('required', required)}/>`,
  imports: ['import { TextInput } from "@utilitywarehouse/hearth-react"'],
  id: 'text-input',
};
