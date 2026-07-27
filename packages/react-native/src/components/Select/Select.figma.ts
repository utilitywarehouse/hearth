// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3224%3A995
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Select/Select.tsx
// component=Select

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const labelVariant = figma.selectedInstance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const variant = figma.selectedInstance.getEnum('Variant', {
  Disabled: 'disabled',
  Invalid: 'invalid',
  Valid: 'valid',
  Default: 'default',
  'Read-only': 'readonly',
});
const disabled = variant === 'disabled' ? true : undefined;
const validationStatus =
  variant === 'invalid' ? 'invalid' : variant === 'valid' ? 'valid' : undefined;
const invalidText =
  variant === 'invalid' ? figma.selectedInstance.getString('Validation') : undefined;
const validText = variant === 'valid' ? figma.selectedInstance.getString('Validation') : undefined;
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});
const required = !figma.selectedInstance.getBoolean('Optional?', {
  true: false,
});
const valueType = figma.selectedInstance.getEnum('Value type', {
  Placeholder: 'placeholder',
  Selected: 'selected',
  Empty: 'empty',
});
const placeholder =
  valueType === 'placeholder' ? figma.selectedInstance.getString('Value') : undefined;
const value = valueType === 'selected' ? figma.selectedInstance.getString('Value') : undefined;

export default {
  id: 'Select',
  imports: ["import { Select } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`function Example() {
    const [value, setValue] = useState(null);
    return (<Select${figma.helpers.react.renderProp(
      'label',
      label
    )}${figma.helpers.react.renderProp(
      'labelVariant',
      labelVariant
    )}${figma.helpers.react.renderProp('placeholder', placeholder)}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )}${figma.helpers.react.renderProp(
      'validationStatus',
      validationStatus
    )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
      'validText',
      validText
    )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
      'required',
      required
    )} options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
        ]} value={value} onValueChange={value => setValue(value)}/>);
}`,
  metadata: {
    nestable: false,
    props: {
      label,
      labelVariant,
      variant,
      disabled,
      validationStatus,
      invalidText,
      validText,
      helperText,
      required,
      valueType,
      placeholder,
      value,
    },
  },
};
