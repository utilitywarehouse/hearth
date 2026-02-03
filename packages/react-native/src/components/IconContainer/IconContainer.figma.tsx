import figma from '@figma/code-connect';
import { IconContainer } from '../';

figma.connect(
  IconContainer,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=5462%3A9728',
  {
    props: {
      size: figma.enum('Size', {
        'SM-32': 'sm',
        'MD-48': 'md',
        'LG-64': 'lg',
      }),
      radiusNone: figma.boolean('Radius None?'),
      variant: figma.enum('Variant', {
        Subtle: 'subtle',
        Emphasis: 'emphasis',
      }),
      color: figma.enum('Color', {
        Pig: 'pig',
        Energy: 'energy',
        Broadband: 'broadband',
        Mobile: 'mobile',
        Insurance: 'insurance',
        Cashback: 'cashback',
        Highlight: 'highlight',
      }),
      icon: figma.enum('Size', {
        'SM-32': figma.instance('Icon-20'),
        'MD-48': figma.instance('Icon-24'),
        'LG-64': figma.instance('Icon-24'),
      }),
    },
    example: props => (
      <IconContainer
        icon={props.icon}
        size={props.size}
        radiusNone={props.radiusNone}
        variant={props.variant}
        color={props.color}
      />
    ),
  }
);
