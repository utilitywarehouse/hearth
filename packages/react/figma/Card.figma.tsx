import React from 'react';
import { Card } from '../src/components/Card/Card';
import figma from '@figma/code-connect';

figma.connect(
  Card,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2160-11&m=dev',
  {
    props: {
      children: figma.instance('Content'),
      variant: figma.enum('Variant', {
        Emphasis: 'emphasis',
        Subtle: 'subtle',
      }),
      colorScheme: figma.enum('Color Scheme', {
        'Neutral Strong': 'neutralStrong',
        'Neutral Subtle': 'neutralSubtle',
        Brand: 'brand',
        Pig: 'pig',
        Highlight: 'highlight',
        Energy: 'energy',
        Broadband: 'broadband',
        Mobile: 'mobile',
        Insurance: 'insurance',
        Cashback: 'cashback',
      }),
      paddingNone: figma.boolean('Padding None?'),
    },
    example: ({ children, ...props }) => <Card {...props}>{children}</Card>,
  }
);
