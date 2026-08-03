// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2161%3A1336
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/CurrencyInput/CurrencyInput.tsx
// component=CurrencyInput

import figma from 'figma';

const instance = figma.selectedInstance;

const valueType = instance.getEnum('Value type', {
  Filled: 'filled',
  Placeholder: 'placeholder',
});
const value = instance.getString('Value');
const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const invalidText = instance.getEnum('State', {
  Default: undefined,
  Invalid: instance.getString('Validation'),
});
const validationStatus = instance.getEnum('State', {
  Default: undefined,
  Invalid: 'invalid',
});
const focused = instance.getBoolean('Focus?');
const labelVariant = instance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});

const placeholder = valueType === 'placeholder' ? instance.getString('Value') : undefined;
const displayValue = valueType === 'filled' ? value : undefined;

export default {
  id: 'currency-input',
  imports: ["import { CurrencyInput } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`
        <CurrencyInput${figma.helpers.react.renderProp(
          'label',
          label
        )}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('placeholder', placeholder)}${figma.helpers.react.renderProp(
    'value',
    displayValue
  )}${figma.helpers.react.renderProp('focused', focused)}${figma.helpers.react.renderProp(
    'labelVariant',
    labelVariant
  )} onChange={() => {}}/>`,
  metadata: {
    nestable: true,
    props: {
      valueType,
      value,
      label,
      helperText,
      invalidText,
      validationStatus,
      focused,
      labelVariant,
      placeholder,
      displayValue,
    },
  },
};
