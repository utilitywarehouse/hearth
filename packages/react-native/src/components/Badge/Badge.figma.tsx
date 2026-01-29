import figma from '@figma/code-connect';
import { Badge } from '../';

figma.connect(Badge, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=61%3A652', {
  props: {
    variant: figma.enum('Variant', {
      'Subtle - Default': 'subtle',
      Emphasis: 'emphasis',
      Outline: 'outline',
    }),
    colorScheme: figma.enum('Color Scheme', {
      Info: 'info',
      Positive: 'positive',
      Danger: 'danger',
      Warning: 'warning',
      Functional: 'functional',
      Energy: 'energy',
      Broadband: 'broadband',
      Mobile: 'mobile',
      Insurance: 'insurance',
      Cashback: 'cashback',
      Pig: 'pig',
      Highlight: 'highlight',
    }),
    size: figma.enum('Size', {
      'SM-24': 'sm',
      'MD-28': 'md',
    }),
    flatBase: figma.boolean('Flat Base?'),
    icon: figma.boolean('Icon?', {
      true: figma.instance('Icon-20'),
      false: '',
    }),
    text: figma.string('Text'),
  },
  example: props => (
    <Badge
      variant={props.variant}
      colorScheme={props.colorScheme}
      size={props.size}
      flatBase={props.flatBase}
      icon={props.icon}
    >
      {props.text}
    </Badge>
  ),
});
