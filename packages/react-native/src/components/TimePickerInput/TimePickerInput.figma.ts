// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10334-6212&t=Jg2fPJPQNzOyspmQ-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/TimePickerInput/TimePickerInput.tsx
// component=TimePickerInput

import figma from 'figma';

const disabled = figma.selectedInstance.getEnum('Variant', {
  Disabled: true,
});
const validationStatus = figma.selectedInstance.getEnum('Variant', {
  Default: undefined,
  Valid: 'valid',
  Invalid: 'invalid',
});
const readonly = figma.selectedInstance.getEnum('Variant', {
  'Read-only': true,
});
const label = figma.selectedInstance.getString('Label');
const validText = figma.selectedInstance.getEnum('Variant', {
  Valid: figma.selectedInstance.getString('Validation'),
});
const invalidText = figma.selectedInstance.getEnum('Variant', {
  Invalid: figma.selectedInstance.getString('Validation'),
});
const placeholder = figma.selectedInstance.getEnum('Value type', {
  Placeholder: figma.selectedInstance.getString('Value'),
});
const value = figma.selectedInstance.getEnum('Value type', {
  Filled: figma.selectedInstance.getString('Value'),
});
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
  false: undefined,
});
const focused = figma.selectedInstance.getEnum('Focus?', { Yes: true });

export default {
  id: 'TimePickerInput',
  imports: ["import { TimePickerInput } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<TimePickerInput${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('readonly', readonly)}${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('validText', validText)}${figma.helpers.react.renderProp(
    'invalidText',
    invalidText
  )}${figma.helpers.react.renderProp('placeholder', placeholder)}${figma.helpers.react.renderProp(
    'value',
    value
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'focused',
    focused
  )}/>`,
  metadata: {
    nestable: true,
    props: {
      disabled,
      validationStatus,
      readonly,
      label,
      validText,
      invalidText,
      placeholder,
      value,
      helperText,
      focused,
    },
  },
};
