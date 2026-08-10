// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4049-3615&m=dev
// source=../src/components/VerificationInput/VerificationInput.tsx
// component=VerificationInput
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const labelVariant = instance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const validationStatus = instance.getEnum('State', {
  Default: undefined,
  Invalid: 'invalid',
});
const validationText = validationStatus === 'invalid' ? instance.getString('Validation') : undefined;

export default {
  example: figma.code`<VerificationInput${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)}/>`,
  imports: ['import { VerificationInput } from "@utilitywarehouse/hearth-react"'],
  id: 'verification-input',
};

