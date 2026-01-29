import figma from '@figma/code-connect';
import { DatePickerInput } from '../';

figma.connect(
  DatePickerInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3917%3A7057',
  {
    props: {
      disabled: figma.enum('Variant', {
        Disabled: true,
      }),
      validationStatus: figma.enum('Variant', {
        Default: undefined,
        Valid: 'valid',
        Invalid: 'invalid',
      }),
      readonly: figma.enum('Variant', { Readonly: true }),
      label: figma.string('Label'),
      validText: figma.enum('Variant', {
        Valid: figma.string('Validation'),
      }),
      invalidText: figma.enum('Variant', {
        Invalid: figma.string('Validation'),
      }),
      placeholder: figma.enum('Value type', {
        Placeholder: figma.string('Value'),
      }),
      value: figma.enum('Value type', {
        Filled: figma.string('Value'),
      }),
    },
    example: props => <DatePickerInput {...props} />,
  }
);
