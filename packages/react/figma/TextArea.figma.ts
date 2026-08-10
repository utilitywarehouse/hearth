// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2356-5180&m=dev
// source=../src/components/TextArea/TextArea.tsx
// component=TextArea
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
const value = instance.getString('Value');
const state = instance.getEnum('State', {
  Default: undefined,
  Invalid: 'invalid',
  Valid: 'valid',
  'Read-only': 'readonly',
  Disabled: 'disabled',
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
const disabled = state === 'disabled';
const readOnly = state === 'readonly';

export default {
  id: 'text-area',
  imports: ['import { TextArea } from "@utilitywarehouse/hearth-react"'],
  example: figma.code`<TextArea${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'labelVariant',
    labelVariant,
  )}${figma.helpers.react.renderProp(
    'helperText',
    helperText,
  )}${figma.helpers.react.renderProp('value', value)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus,
  )}${figma.helpers.react.renderProp(
    'validationText',
    validationText,
  )}${figma.helpers.react.renderProp('required', required)}${
    disabled ? figma.code` disabled` : ''
  }${readOnly ? figma.code` readOnly` : ''} />`,
};
