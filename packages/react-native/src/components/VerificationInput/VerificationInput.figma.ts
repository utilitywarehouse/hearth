// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4049-3615
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/VerificationInput/VerificationInput.tsx
// component=VerificationInput
import figma from 'figma';

const instance = figma.selectedInstance;

const validationStatus = instance.getEnum('State', { Default: 'initial', Invalid: 'invalid' });
const valueType = instance.getEnum('Value type', { Empty: '', Filled: 'filled' });
const label = instance.getString('Label');
const labelVariant = instance.getEnum('Label variant', { Body: 'body', Heading: 'heading' });
const value = valueType === 'filled' ? instance.getString('Value 1') : '';
const showHelperText = instance.getBoolean('Helper text?');
const helperText = showHelperText ? instance.getString('Helper text') : '';
const invalidText = validationStatus === 'invalid' ? instance.getString('Validation') : '';

export default {
  id: 'verification-input',
  imports: ['import { VerificationInput } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<VerificationInput${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('value', value)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp('invalidText', invalidText)} />`,
  metadata: {
    nestable: true,
    props: { validationStatus, valueType, label, labelVariant, value, helperText, invalidText },
  },
};
