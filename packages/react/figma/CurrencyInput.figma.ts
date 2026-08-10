// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2161-1336&m=dev
// source=../src/components/CurrencyInput/CurrencyInput.tsx
// component=CurrencyInput
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const validationStatus = instance.getEnum('State', {
  Default: undefined,
  Invalid: 'invalid',
});
const validationText = validationStatus
  ? instance.getString('Validation')
  : undefined;
const labelVariant = instance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});

export default {
  example: figma.code`<CurrencyInput${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}/>`,
  imports: ['import { CurrencyInput } from "@utilitywarehouse/hearth-react"'],
  id: 'currency-input',
};
