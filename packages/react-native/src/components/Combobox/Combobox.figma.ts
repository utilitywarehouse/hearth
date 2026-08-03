// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9359%3A2923
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Combobox/Combobox.tsx
// component=Combobox

import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const placeholder = instance.getEnum('Value type', {
  Empty: '',
  Placeholder: instance.getString('Value'),
  Filled: instance.getString('Value'),
});
const validationStatus = instance.getEnum('Variant', {
  Default: 'initial',
  Invalid: 'invalid',
  Loading: 'initial',
});
const invalidText = instance.getEnum('Variant', {
  Invalid: instance.getString('Validation'),
});
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
});
const required = instance.getBoolean('Optional?', {
  true: false,
  false: true,
});
const loading = instance.getEnum('Variant', {
  Loading: true,
});
const value = instance.getEnum('Value type', {
  Filled: instance.getString('Value'),
});

export default {
  id: 'combobox',
  imports: [
    'import { Combobox } from "@utilitywarehouse/hearth-react-native";',
    'import { useState } from "react";',
  ],
  example: figma.code`function Example() {
  const [value, setValue] = useState<string | null>(${value ? "'1'" : 'null'});

  return (
    <Combobox
      label="${label}"
      placeholder="${placeholder}"${figma.helpers.react.renderProp(
        'validationStatus',
        validationStatus
      )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
        'helperText',
        helperText
      )}${figma.helpers.react.renderProp('required', required)}${figma.helpers.react.renderProp(
        'loading',
        loading
      )}
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
}`,
  metadata: {
    nestable: true,
    props: {
      label,
      placeholder,
      validationStatus,
      invalidText,
      helperText,
      required,
      loading,
      value,
    },
  },
};
