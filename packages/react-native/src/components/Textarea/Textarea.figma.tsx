import figma from '@figma/code-connect';
import { Textarea } from '..';

const props = {
  disabled: figma.enum('State', {
    Disabled: true,
  }),
  readonly: figma.enum('State', {
    'Read-only': true,
  }),
  placeholder: figma.enum('Value type', {
    Placeholder: figma.string('Value'),
  }),
  value: figma.enum('Value type', {
    Filled: figma.string('Value'),
  }),
  label: figma.string('Label'),
  labelVariant: figma.enum('Label variant', {
    Body: 'body',
    Heading: 'heading',
  }),
  helperText: figma.boolean('Helper text?', {
    true: figma.string('Helper text'),
  }),
  validationStatus: figma.enum('State', {
    Invalid: 'invalid',
    Valid: 'valid',
  }),
  invalidText: figma.enum('State', {
    Invalid: figma.string('Validation'),
  }),
  validText: figma.enum('State', {
    Valid: figma.string('Validation'),
  }),
};

figma.connect(
  Textarea,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2356-5180&m=dev',
  {
    props: {
      ...props,
      required: figma.boolean('Optional?', {
        true: false,
        false: true,
      }),
    },
    example: props => (
      <Textarea
        disabled={props.disabled}
        readonly={props.readonly}
        placeholder={props.placeholder}
        value={props.value}
        label={props.label}
        labelVariant={props.labelVariant}
        helperText={props.helperText}
        required={props.required}
        validationStatus={props.validationStatus}
        invalidText={props.invalidText}
        validText={props.validText}
      />
    ),
  }
);
