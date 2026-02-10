import figma from '@figma/code-connect';
import { RadioTile } from '../';

figma.connect(
  RadioTile,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13222&t=Uq6QfQcygdNGv5lM-4',
  {
    props: {
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
      }),
      label: figma.string('Label'),
      image: figma.boolean('Image?', {
        true: figma.instance('Radio Image'),
      }),
      checked: figma.boolean('Checked?'),
      indicator: figma.nestedProps('Radio Item', {
        disabled: figma.enum('State', {
          Disabled: true,
        }),
      }),
    },
    example: props => (
      <RadioTile
        label={props.label}
        helperText={props.helperText}
        image={props.image}
        checked={props.checked}
        disabled={props.indicator.disabled}
        value="someValue"
      />
    ),
  }
);
