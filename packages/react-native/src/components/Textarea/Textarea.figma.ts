// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2356:5180
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Textarea/Textarea.tsx
// component=Textarea
import figma from 'figma';

const instance = figma.selectedInstance;

const disabled = instance.getEnum('State', { Disabled: true });
const readonly = instance.getEnum('State', { 'Read-only': true });
const placeholder = instance.getEnum('Value type', {
  Placeholder: instance.getString('Value'),
});
const value = instance.getEnum('Value type', { Filled: instance.getString('Value') });
const label = instance.getString('Label');
const labelVariant = instance.getEnum('Label variant', { Body: 'body', Heading: 'heading' });
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
});
const validationStatus = instance.getEnum('State', {
  Invalid: 'invalid',
  Valid: 'valid',
});
const invalidText = instance.getEnum('State', {
  Invalid: instance.getString('Validation'),
});
const validText = instance.getEnum('State', {
  Valid: instance.getString('Validation'),
});
const required = instance.getBoolean('Optional?', {
  true: false,
  false: true,
});
const focused = instance.getEnum('Focus?', { True: true });

export default {
  id: 'textarea',
  imports: ['import { Textarea } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<Textarea${figma.helpers.react.renderProp(
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
  )}${figma.helpers.react.renderProp('required', required)}${figma.helpers.react.renderProp(
    'focused',
    focused
  )} />`,
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
      required,
      focused,
    },
  },
};
