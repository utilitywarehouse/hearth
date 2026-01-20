import figma from '@figma/code-connect';
import { CurrencyInput, FormField } from '../';

const props = {
  placeholder: figma.string('Value'),
  value: figma.string('Value'),
  label: figma.string('Label'),
  helperText: figma.boolean('Helper text?', {
    true: figma.string('Helper text'),
    false: undefined,
  }),
  invalidText: figma.enum('State', {
    Default: undefined,
    Invalid: figma.string('Validation'),
  }),
  validationStatus: figma.enum('State', {
    Default: undefined,
    Invalid: 'invalid',
  }),
  // "labelVariant": figma.enum('Label variant', {
  //   "Body": "body",
  //   "Heading": "heading"
  // })
};

const onChangeHandler = () => {
  // Placeholder for onChange handler
};

const value = 'some value';

figma.connect(
  CurrencyInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2161%3A1336',
  {
    props,
    variant: {
      'Value type': 'Filled',
    },
    example: props => (
      <FormField
        label={props.label}
        helperText={props.helperText}
        invalidText={props.invalidText}
        validationStatus={props.validationStatus}
      >
        <CurrencyInput value={props.value} onChange={onChangeHandler} />
      </FormField>
    ),
  }
);

figma.connect(
  CurrencyInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2161%3A1336',
  {
    props,
    variant: {
      'Value type': 'Placeholder',
    },
    example: props => (
      <FormField
        label={props.label}
        helperText={props.helperText}
        invalidText={props.invalidText}
        validationStatus={props.validationStatus}
      >
        <CurrencyInput placeholder={props.placeholder} value={value} onChange={onChangeHandler} />
      </FormField>
    ),
  }
);
