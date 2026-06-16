import React from 'react';
import { Badge } from '../src/components/Badge/Badge';
import figma from '@figma/code-connect';

figma.connect(
  Badge,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=61-652&m=dev',
  {
    props: {
      children: figma.string('Text'),
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
        Pig: 'pig',
        Energy: 'energy',
        Mobile: 'mobile',
        Broadband: 'broadband',
        Insurance: 'insurance',
        Cashback: 'cashback',
        Highlight: 'highlight',
      }),
      size: figma.enum('Size', {
        'SM-24': 'sm',
        'MD-28': 'md',
      }),
      flatBase: figma.boolean('Flat Base?'),
      icon: figma.boolean('Icon?', {
        true: figma.instance('Icon-20'),
        false: undefined,
      }),
    },
    example: ({ children, icon, ...props }) => (
      <Badge {...props}>
        {icon}
        {children}
      </Badge>
    ),
  }
);
