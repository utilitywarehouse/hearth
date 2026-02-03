import figma from '@figma/code-connect';
import { IconButton } from '../';

figma.connect(IconButton, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=90%3A1455', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    size: figma.enum('Size', {
      'SM-32': 'sm',
      'MD-48': 'md',
    }),
    colorScheme: figma.enum('Color Scheme', {
      Affirmative: 'affirmative',
      Destructive: 'destructive',
      Functional: 'functional',
      Highlight: 'highlight',
    }),
    loading: figma.enum('State', {
      Loading: true,
    }),
    icon: figma.enum('Size', {
      'SM-32': figma.instance('Icon-20'),
      'MD-48': figma.instance('Icon-24'),
    }),
    variant: figma.enum('Variant', {
      Emphasis: 'emphasis',
      Solid: 'solid',
      Outline: 'outline',
      Ghost: 'ghost',
    }),
    inverted: figma.boolean('Inverted?'),
  },
  example: props => (
    <IconButton
      disabled={props.disabled}
      size={props.size}
      variant={props.variant}
      inverted={props.inverted}
      colorScheme={props.colorScheme}
      loading={props.loading}
      icon={props.icon}
    />
  ),
});
