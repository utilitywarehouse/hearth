import React from 'react';
import { IconContainer } from '../src/components/IconContainer/IconContainer';
import figma from '@figma/code-connect';

figma.connect(
  IconContainer,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=5462-9728&m=dev',
  {
    props: {
      icon20: figma.instance('Icon-20'),
      icon24: figma.instance('Icon-24'),
      size: figma.enum('Size', {
        'MD-48': 'md',
        'SM-32': 'sm',
        'LG-64': 'lg',
      }),
      variant: figma.enum('Variant', {
        Emphasis: 'emphasis',
        Subtle: 'subtle',
      }),
      colorScheme: figma.enum('Color', {
        Highlight: 'highlight',
        Pig: 'pig',
        Energy: 'energy',
        Broadband: 'broadband',
        Mobile: 'mobile',
        Cashback: 'cashback',
        Insurance: 'insurance',
      }),
    },
    example: ({ icon20, icon24, ...props }) => (
      <IconContainer {...props}>
        {icon20}
        {icon24}
      </IconContainer>
    ),
  }
);
