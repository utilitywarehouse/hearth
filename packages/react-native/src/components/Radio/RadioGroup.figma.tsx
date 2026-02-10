import figma from '@figma/code-connect';
import { RadioGroup } from '../';

const props = {
  validationStatus: figma.enum('State', {
    Invalid: 'invalid',
  }),
  labelVariant: figma.enum('Label variant', {
    Body: 'body',
    Heading: 'heading',
  }),
  direction: figma.enum('Direction', {
    Row: 'row',
  }),
  label: figma.string('Group label'),
  helperText: figma.boolean('Helper text?', {
    true: figma.string('Helper text'),
  }),
  invalidText: figma.enum('State', {
    Invalid: figma.string('Validation text'),
  }),
};

const value = '';
const setValue = (value: string) => {};

figma.connect(
  RadioGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13254&t=Uq6QfQcygdNGv5lM-4',
  {
    variant: {
      Content: 'Radio',
    },
    props: {
      ...props,
      items: figma.children('Radio'),
    },
    example: props => (
      <RadioGroup
        label={props.label}
        helperText={props.helperText}
        validationStatus={props.validationStatus}
        labelVariant={props.labelVariant}
        direction={props.direction}
        invalidText={props.invalidText}
        value={value}
        onChange={value => setValue(value)}
      >
        {props.items}
      </RadioGroup>
    ),
  }
);

figma.connect(
  RadioGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13254&t=Uq6QfQcygdNGv5lM-4',
  {
    variant: {
      Content: 'Radio Tile',
    },
    props: {
      ...props,
      items: figma.children('Radio Tile'),
    },
    example: props => (
      <RadioGroup
        label={props.label}
        helperText={props.helperText}
        validationStatus={props.validationStatus}
        labelVariant={props.labelVariant}
        direction={props.direction}
        invalidText={props.invalidText}
        type="tile"
        value={value}
        onChange={value => setValue(value)}
      >
        {props.items}
      </RadioGroup>
    ),
  }
);
