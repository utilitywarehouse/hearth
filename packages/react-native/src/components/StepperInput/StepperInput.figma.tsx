import figma from '@figma/code-connect';
import { StepperInput } from '../';

const props = {
  value: figma.string('Value'),
  label: figma.string('Label'),
  labelVariant: figma.enum('Label variant', {
    Body: 'body',
    Heading: 'heading',
  }),
  helperText: figma.boolean('Helper text?', {
    true: figma.string('Helper text'),
    false: undefined,
  }),
  validationStatus: figma.enum('State', {
    Default: 'initial',
    Invalid: 'invalid',
  }),
  invalidText: figma.enum('State', {
    Invalid: figma.string('Validation'),
  }),
};

const handleChangeText = () => {
  // Placeholder for Code Connect examples.
};

figma.connect(
  StepperInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10612%3A1860&m=dev',
  {
    props,
    example: props => (
      <StepperInput
        value={props.value}
        label={props.label}
        labelVariant={props.labelVariant}
        helperText={props.helperText}
        validationStatus={props.validationStatus}
        invalidText={props.invalidText}
        onChangeText={handleChangeText}
      />
    ),
  }
);
