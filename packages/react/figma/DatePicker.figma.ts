// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3917-7057&m=dev
// source=../src/components/DatePicker/DatePicker.tsx
// component=DatePicker
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const validationText = instance.getEnum('Variant', {
  Invalid: instance.getString('Validation'),
  Valid: instance.getString('Validation'),
});
const validationStatus = instance.getEnum('Variant', {
  Invalid: 'invalid',
  Valid: 'valid',
});
const variant = instance.getEnum('Variant', {
  Disabled: 'disabled',
  'Read-only': 'readonly',
});
const disabled = variant === 'disabled';
const readOnly = variant === 'readonly';

export default {
  example: figma.code`<DatePicker${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'validationText',
    validationText
  )}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${
    disabled ? figma.code` disabled` : ''
  }${readOnly ? figma.code` readOnly` : ''} />`,
  imports: ['import { DatePicker } from "@utilitywarehouse/hearth-react"'],
  id: 'date-picker',
};
