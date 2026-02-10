import figma from '@figma/code-connect';
import { CheckboxGroup } from '../';

const props = {
  label: figma.string('Group label'),
  labelVariant: figma.enum('Label variant', {
    Heading: 'heading',
    Body: 'body',
  }),
  helperText: figma.boolean('Helper text?', {
    true: figma.string('Helper text'),
    false: undefined,
  }),
  direction: figma.enum('Direction', {
    Column: undefined,
    Row: 'row',
  }),
  tiles: figma.children('Checkbox Tile'),
  checkboxes: figma.children('Checkbox'),
  validationStatus: figma.enum('State', {
    Invalid: 'invalid',
  }),
  invalidText: figma.enum('State', {
    Invalid: figma.string('Validation text'),
  }),
};

figma.connect(
  CheckboxGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3141-4275&m=dev',
  {
    variant: {
      Content: 'Checkbox Tile',
    },
    props,
    example: props => (
      <CheckboxGroup
        type="tile"
        label={props.label}
        labelVariant={props.labelVariant}
        helperText={props.helperText}
        direction={props.direction}
        validationStatus={props.validationStatus}
        invalidText={props.invalidText}
      >
        {props.tiles}
      </CheckboxGroup>
    ),
  }
);

figma.connect(
  CheckboxGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3141-4275&m=dev',
  {
    variant: {
      Content: 'Checkbox',
    },
    props,
    example: props => (
      <CheckboxGroup
        label={props.label}
        labelVariant={props.labelVariant}
        helperText={props.helperText}
        direction={props.direction}
        validationStatus={props.validationStatus}
        invalidText={props.invalidText}
      >
        {props.checkboxes}
      </CheckboxGroup>
    ),
  }
);
