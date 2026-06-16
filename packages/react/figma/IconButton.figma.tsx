import React from 'react';
import { IconButton } from '../src/components/IconButton/IconButton';
import figma from '@figma/code-connect';

figma.connect(
  IconButton,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=90-1455&m=dev',
  {
    props: {
      icon24: figma.instance('Icon-24'),
      icon20: figma.instance('Icon-20'),
      variant: figma.enum('Variant', {
        Emphasis: 'emphasis',
        Solid: 'solid',
        Outline: 'outline',
        Ghost: 'ghost',
      }),
      colorScheme: figma.enum('Color Scheme', {
        Highlight: 'highlight',
        Functional: 'functional',
        Affirmative: 'affirmative',
        Destructive: 'destructive',
      }),
      size: figma.enum('Size', {
        'MD-48': 'md',
        'SM-32': 'sm',
      }),
      inverted: figma.boolean('Inverted?'),
      loading: figma.enum('State', {
        Loading: true,
      }),
    },
    example: ({ icon20, icon24, ...props }) => (
      <IconButton label="A label is required" {...props}>
        {icon20}
        {icon24}
      </IconButton>
    ),
  }
);
