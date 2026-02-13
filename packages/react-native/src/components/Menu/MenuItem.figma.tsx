import figma from '@figma/code-connect';
import { MenuItem } from '../';

figma.connect(
  MenuItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3253-8193',
  {
    props: {
      text: figma.string('Text'),
      icon: figma.boolean('Icon left?', {
        true: figma.instance('Icon left-20'),
        false: figma.boolean('Icon right?', {
          true: figma.instance('Icon right-20'),
        }),
      }),
      iconPosition: figma.boolean('Icon left?', {
        true: 'left',
        false: figma.boolean('Icon right?', {
          true: 'right',
        }),
      }),
      colorScheme: figma.enum('Color Scheme', {
        Destructive: 'destructive',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: props => (
      <MenuItem
        text={props.text}
        disabled={props.disabled}
        colorScheme={props.colorScheme}
        icon={props.icon}
        iconPosition={props.iconPosition}
      />
    ),
  }
);
