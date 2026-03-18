import figma from '@figma/code-connect';
import { useState } from 'react';
import { Combobox } from '../';

figma.connect(
  Combobox,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9359%3A2923',
  {
    props: {
      label: figma.string('Label'),
      placeholder: figma.enum('Value type', {
        Empty: figma.string('Value'),
      }),
      disabled: figma.enum('Variant', {
        Disabled: true,
      }),
      validationStatus: figma.enum('Variant', {
        Invalid: 'invalid',
      }),
      invalidText: figma.enum('Variant', {
        Invalid: figma.string('Validation'),
      }),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
      }),
      required: figma.boolean('Optional?', {
        true: false,
      }),
      loading: figma.enum('Variant', {
        Loading: true,
      }),
      value: figma.enum('Value type', {
        Filled: figma.string('Value'),
      }),
    },
    example: props => {
      const [value, setValue] = useState<string | null>(props.value ? '1' : null);

      return (
        <Combobox
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
          validationStatus={props.validationStatus}
          invalidText={props.invalidText}
          helperText={props.helperText}
          required={props.required}
          loading={props.loading}
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          value={value}
          onValueChange={setValue}
        />
      );
    },
  }
);
