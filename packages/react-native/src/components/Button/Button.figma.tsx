import figma from '@figma/code-connect';
import { Button } from '../';

const props = {
  disabled: figma.enum('State', {
    Disabled: true,
  }),
  size: figma.enum('Size', {
    'SM-32': 'sm',
    'MD-48': 'md',
  }),
  paddingNone: figma.boolean('Padding None?'),
  colorScheme: figma.enum('Color Scheme', {
    Affirmative: 'affirmative',
    Destructive: 'destructive',
    Functional: 'functional',
    Highlight: 'highlight',
  }),
  loading: figma.enum('State', {
    Loading: true,
  }),
  text: figma.string('Text'),
  ghostText: figma.string('Ghost Text'),
  iconPosition: figma.boolean('Show icon left?', {
    true: undefined,
    false: figma.boolean('Show icon right?', {
      true: 'right',
      false: undefined,
    }),
  }),
  icon: figma.boolean('Show icon left?', {
    true: figma.instance('Icon left-20'),
    false: figma.boolean('Show icon right?', {
      true: figma.instance('Icon right-20'),
      false: undefined,
    }),
  }),
  variant: figma.enum('Variant', {
    Emphasis: 'emphasis',
    Solid: 'solid',
    Outline: 'outline',
    Ghost: 'ghost',
  }),
  inverted: figma.boolean('Inverted?'),
};

figma.connect(Button, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=90%3A432', {
  props,
  variant: {
    Variant: 'Solid',
  },
  example: props => (
    <Button
      disabled={props.disabled}
      size={props.size}
      variant={props.variant}
      inverted={props.inverted}
      paddingNone={props.paddingNone}
      colorScheme={props.colorScheme}
      loading={props.loading}
      icon={props.icon}
      iconPosition={props.iconPosition}
    >
      {props.text}
    </Button>
  ),
});
figma.connect(Button, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=90%3A432', {
  props,
  variant: {
    Variant: 'Emphasis',
  },
  example: props => (
    <Button
      disabled={props.disabled}
      size={props.size}
      variant={props.variant}
      inverted={props.inverted}
      paddingNone={props.paddingNone}
      colorScheme={props.colorScheme}
      loading={props.loading}
      iconPosition={props.iconPosition}
      icon={props.icon}
    >
      {props.text}
    </Button>
  ),
});

figma.connect(Button, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=90%3A432', {
  variant: {
    Variant: 'Outline',
  },
  props,
  example: props => (
    <Button
      disabled={props.disabled}
      size={props.size}
      variant={props.variant}
      inverted={props.inverted}
      paddingNone={props.paddingNone}
      colorScheme={props.colorScheme}
      loading={props.loading}
      icon={props.icon}
      iconPosition={props.iconPosition}
    >
      {props.text}
    </Button>
  ),
});

figma.connect(Button, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=90%3A432', {
  variant: {
    Variant: 'Ghost',
  },
  props,
  example: props => (
    <Button
      disabled={props.disabled}
      size={props.size}
      variant={props.variant}
      inverted={props.inverted}
      paddingNone={props.paddingNone}
      colorScheme={props.colorScheme}
      loading={props.loading}
      icon={props.icon}
      iconPosition={props.iconPosition}
    >
      {props.ghostText}
    </Button>
  ),
});
