import figma from '@figma/code-connect';
import { Link } from '../';

figma.connect(Link, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=163%3A562', {
  props: {
    inverted: figma.boolean('Inverted?'),
    showIcon: figma.boolean('Icon right?', {
      false: figma.boolean('Icon left?', {
        false: false,
      }),
    }),
    iconPosition: figma.boolean('Icon right?', {
      false: figma.boolean('Icon left?', {
        true: 'left',
      }),
    }),
    text: figma.string('Text'),
    icon: figma.boolean('Icon right?', {
      true: figma.instance('Icon right-20'),
      false: figma.boolean('Icon left?', {
        true: figma.instance('Icon left-20'),
      }),
    }),
  },
  example: props => (
    <Link
      icon={props.icon}
      showIcon={props.showIcon}
      iconPosition={props.iconPosition}
      inverted={props.inverted}
    >
      {props.text}
    </Link>
  ),
});
