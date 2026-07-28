// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3917:7057
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/DatePickerInput/DatePickerInput.tsx
// component=DatePickerInput
import figma from 'figma';

const instance = figma.selectedInstance;

const variantValue = instance.getEnum('Variant', {
  Default: 'default',
  Valid: 'valid',
  Invalid: 'invalid',
  Disabled: 'disabled',
  'Read-only': 'readonly',
});

const valueType = instance.getEnum('Value type', {
  Empty: 'empty',
  Placeholder: 'placeholder',
  Filled: 'filled',
});

const label = instance.getString('Label');
const validationText = instance.getString('Validation');
const helperTextContent = instance.getString('Helper text');
const rawValue = instance.getString('Value');
const focused = instance.getEnum('Focus?', { Yes: true });

const disabled = variantValue === 'disabled';
const readonly = variantValue === 'readonly';

const validationStatus =
  variantValue === 'valid' ? 'valid' : variantValue === 'invalid' ? 'invalid' : undefined;

const value = valueType === 'filled' ? rawValue : undefined;
const placeholder = valueType === 'placeholder' ? rawValue : undefined;

const validText = validationStatus === 'valid' ? validationText : undefined;

const invalidText = validationStatus === 'invalid' ? validationText : undefined;

export default {
  id: 'date-picker-input',
  imports: ['import { DatePickerInput } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<DatePickerInput${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('readonly', readonly)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp(
    'validText',
    validText
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
    'placeholder',
    placeholder
  )}${figma.helpers.react.renderProp('value', value)}${figma.helpers.react.renderProp(
    'focused',
    focused
  )}${figma.helpers.react.renderProp('helperText', helperTextContent)} />`,
  metadata: {
    props: {
      variantValue,
      valueType,
      label,
      validationText,
      helperTextContent,
      rawValue,
      focused,
      disabled,
      readonly,
      validationStatus,
      value,
      placeholder,
      validText,
      invalidText,
    },
  },
};
