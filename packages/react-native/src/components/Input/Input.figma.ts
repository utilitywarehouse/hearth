// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2685%3A7021
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Input/Input.tsx
// component=Input

import figma from 'figma';

const required = figma.selectedInstance.getBoolean('Optional?', {
  true: false,
  false: true,
});
const prefix = figma.selectedInstance.getBoolean('Prefix?', {
  true: figma.selectedInstance.getString('Prefix'),
});
const suffix = figma.selectedInstance.getBoolean('Suffix?', {
  true: figma.selectedInstance.getString('Suffix'),
});
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
  Filled: figma.selectedInstance.getString('Value'),
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
  example: figma.code`<Input${figma.helpers.react.renderProp(
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
  )}${figma.helpers.react.renderProp('required', required)}${figma.helpers.react.renderProp(
    'prefix',
    prefix
  )}${figma.helpers.react.renderProp('suffix', suffix)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
    'validText',
    validText
  )}/>`,
  metadata: {
    nestable: true,
    props: {
      required,
      prefix,
      suffix,
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
