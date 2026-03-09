import figma from '@figma/code-connect';
import { TimePickerInput } from '../';

figma.connect(
  TimePickerInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10334-6212&t=Jg2fPJPQNzOyspmQ-4',
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
      readonly: figma.enum('Variant', { 'Read-only': true }),
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
    example: props => <TimePickerInput {...props} />,
  }
);
