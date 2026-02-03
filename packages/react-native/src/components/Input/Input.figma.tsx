import figma from '@figma/code-connect';
import { Input } from '../';

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

figma.connect(Input, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2685%3A7021', {
  props: {
    ...props,
    required: figma.boolean('Optional?', {
      true: false,
      false: true,
    }),
    prefix: figma.boolean('Prefix?', {
      true: figma.string('Prefix'),
    }),
    suffix: figma.boolean('Suffix?', {
      true: figma.string('Suffix'),
    }),
  },
  example: props => (
    <Input
      disabled={props.disabled}
      readonly={props.readonly}
      placeholder={props.placeholder}
      value={props.value}
      label={props.label}
      labelVariant={props.labelVariant}
      helperText={props.helperText}
      required={props.required}
      prefix={props.prefix}
      suffix={props.suffix}
      validationStatus={props.validationStatus}
      invalidText={props.invalidText}
      validText={props.validText}
    />
  ),
});

figma.connect(
  Input,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2251-10106&t=3uUSBVdxldgG5uz3-4',
  {
    props,
    example: props => (
      <Input
        type="password"
        disabled={props.disabled}
        readonly={props.readonly}
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

figma.connect(
  Input,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2161-1311&t=3uUSBVdxldgG5uz3-4',
  {
    props: {
      loading: figma.enum('State', {
        Loading: true,
      }),
      placeholder: figma.enum('State', {
        Placeholder: figma.string('Value'),
      }),
      value: figma.enum('State', {
        Filled: figma.string('Value'),
      }),
      label: figma.string('Label'),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
      }),
    },
    example: props => (
      <Input
        type="search"
        loading={props.loading}
        placeholder={props.placeholder}
        value={props.value}
        label={props.label}
        helperText={props.helperText}
      />
    ),
  }
);
