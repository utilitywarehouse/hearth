import figma from '@figma/code-connect';
import Radio from './Radio';

figma.connect(
  Radio,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7428-12685&m=dev',
  {
    props: {
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
      }),
      label: figma.string('Label'),
      image: figma.boolean('Image?', {
        true: figma.instance('Radio Image'),
      }),
      state: figma.enum('State', {
        Default: 'default',
      }),
      checked: figma.boolean('Checked?'),
      indicator: figma.nestedProps('Radio Item', {
        disabled: figma.enum('State', {
          Disabled: true,
        }),
      }),
    },
    example: props => (
      <Radio
        label={props.label}
        helperText={props.helperText}
        image={props.image}
        state={props.state}
        checked={props.checked}
        disabled={props.indicator.disabled}
        value="someValue"
      />
    ),
  }
);
