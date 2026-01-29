import figma from '@figma/code-connect';
import { CheckboxGroup } from '../';

const props = {
  label: figma.string('Group label'),
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
        helperText={props.helperText}
        direction={props.direction}
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
      <CheckboxGroup label={props.label} helperText={props.helperText} direction={props.direction}>
        {props.checkboxes}
      </CheckboxGroup>
    ),
  }
);
