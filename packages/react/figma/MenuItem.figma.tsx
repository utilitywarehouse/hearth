import React from 'react';
import { MenuItem } from '../src/components/Menu/MenuItem';
import figma from '@figma/code-connect';

figma.connect(
  MenuItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3253-8193&m=dev',
  {
    props: {
      children: figma.string('Text'),
      iconLeft: figma.boolean('Icon left?', {
        true: figma.instance('Icon left-20'),
        false: undefined,
      }),
      iconRight: figma.boolean('Icon right?', {
        true: figma.instance('Icon right-20'),
        false: undefined,
      }),
      colorScheme: figma.enum('Color Scheme', {
        Functional: 'functional',
        Destructive: 'destructive',
      }),
    },
    example: ({ children, iconLeft, iconRight, ...props }) => (
      <MenuItem {...props}>
        {iconLeft}
        {children}
        {iconRight}
      </MenuItem>
    ),
  }
);
