import figma from '@figma/code-connect';
import { Checkbox } from './Checkbox';

figma.connect(
  Checkbox,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4961-23797&m=dev',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      checked: figma.boolean('Checked?'),
      label: figma.string('Label'),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
    },
    example: props => (
      <Checkbox
        type="tile"
        disabled={props.disabled}
        checked={props.checked}
        label={props.label}
        helperText={props.helperText}
      />
    ),
  }
);
