import figma from '@figma/code-connect';
import { useState } from 'react';
import { Select } from '../';

figma.connect(Select, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3224%3A995', {
  props: {
    label: figma.string('Label'),
    placeholder: figma.enum('Value type', {
      Placeholder: figma.string('Value'),
    }),
    disabled: figma.enum('Variant', {
      Disabled: true,
    }),
    validationStatus: figma.enum('Variant', {
      Invalid: 'invalid',
      Valid: 'valid',
    }),
    invalidText: figma.enum('Variant', {
      Invalid: figma.string('Validation'),
    }),
    validText: figma.enum('Variant', {
      Valid: figma.string('Validation'),
    }),
    helperText: figma.boolean('Helper text?', {
      true: figma.string('Helper text'),
    }),
    required: figma.boolean('Optional?', {
      true: false,
    }),
    value: figma.enum('Value type', {
      Selected: figma.string('Value'),
    }),
  },
  example: props => {
    const [value, setValue] = useState(null);
    return (
      <Select
        label={props.label}
        placeholder={props.placeholder}
        disabled={props.disabled}
        validationStatus={props.validationStatus}
        invalidText={props.invalidText}
        validText={props.validText}
        helperText={props.helperText}
        required={props.required}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
        value={value}
        onValueChange={value => setValue(value)}
      />
    );
  },
});
