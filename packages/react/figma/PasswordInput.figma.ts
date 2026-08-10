// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2251-10106&m=dev
// source=../src/components/PasswordInput/PasswordInput.tsx
// component=PasswordInput
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const labelVariant = instance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const hasHelperText = instance.getBoolean('Helper text?');
const helperText = hasHelperText ? instance.getString('Helper text') : undefined;
const validationStatus = instance.getEnum('State', {
  Default: undefined,
  'Read-only': undefined,
  Disabled: undefined,
  Invalid: 'invalid',
  Valid: 'valid',
});
const validationText = validationStatus ? instance.getString('Validation') : undefined;

export default {
  example: figma.code`<PasswordInput${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp('helperText', helperText)}${
    validationStatus ? figma.code` validationStatus="${validationStatus}"` : ''
  }${
    validationText ? figma.code` validationText="${validationText}"` : ''
  } />`,
  imports: ['import { PasswordInput } from "@utilitywarehouse/hearth-react"'],
  id: 'password-input',
};
