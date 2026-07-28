// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2251-10106&t=3uUSBVdxldgG5uz3-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Input/Input.tsx
// component=Input

import figma from 'figma';

const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const readonly = figma.selectedInstance.getEnum('State', {
  'Read-only': true,
});
const placeholder = figma.selectedInstance.getEnum('Value type', {
  Placeholder: figma.selectedInstance.getString('Value'),
});
const value = figma.selectedInstance.getEnum('Value type', {
  Filled: figma.selectedInstance.getString('Password'),
});
const label = figma.selectedInstance.getString('Label');
const labelVariant = figma.selectedInstance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});
const validationStatus = figma.selectedInstance.getEnum('State', {
  Invalid: 'invalid',
  Valid: 'valid',
});
const invalidText = figma.selectedInstance.getEnum('State', {
  Invalid: figma.selectedInstance.getString('Validation'),
});
const validText = figma.selectedInstance.getEnum('State', {
  Valid: figma.selectedInstance.getString('Validation'),
});

export default {
  id: 'Input',
  imports: ["import { Input } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Input type="password"${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('readonly', readonly)}${figma.helpers.react.renderProp(
    'placeholder',
    placeholder
  )}${figma.helpers.react.renderProp('value', value)}${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
    'validText',
    validText
  )}/>`,
  metadata: {
    nestable: true,
    props: {
      disabled,
      readonly,
      placeholder,
      value,
      label,
      labelVariant,
      helperText,
      validationStatus,
      invalidText,
      validText,
    },
  },
};
