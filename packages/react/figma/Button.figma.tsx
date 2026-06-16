import React from 'react';
import { Button } from '../src/components/Button/Button';
import figma from '@figma/code-connect';

figma.connect(
  Button,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=90-432&m=dev',
  {
    props: {
      iconLeft: figma.boolean('Show icon left?', {
        true: figma.instance('Icon left-20'),
        false: undefined,
      }),
      iconRight: figma.boolean('Show icon right?', {
        true: figma.instance('Icon right-20'),
        false: undefined,
      }),
      size: figma.enum('Size', {
        'MD-48': 'md',
        'SM-32': 'sm',
      }),
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
      children: figma.string('Text'),
      inverted: figma.boolean('Inverted?'),
      paddingNone: figma.boolean('Padding None?'),
      loading: figma.enum('State', {
        Loading: true,
      }),
    },
    example: ({ children, iconLeft, iconRight, ...props }) => (
      <Button {...props}>
        {iconLeft}
        {children}
        {iconRight}
      </Button>
    ),
  }
);
