import figma from '@figma/code-connect';
import { VerificationInput } from '..';

const props = {
  disabled: figma.enum('State', {
    Disabled: true,
  }),
  placeholder: figma.enum('Value type', {
    Placeholder: figma.string('Value'),
  }),
  value: figma.enum('Value type', {
    Filled: figma.string('Value 1'),
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
  VerificationInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4049-3615&m=dev',
  {
    props,
    example: props => (
      <VerificationInput
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}
        label={props.label}
        labelVariant={props.labelVariant}
        helperText={props.helperText}
        validationStatus={props.validationStatus}
        invalidText={props.invalidText}
        validText={props.validText}
      />
    ),
  }
);
