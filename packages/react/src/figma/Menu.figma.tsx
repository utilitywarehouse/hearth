import React from 'react';
import { Menu } from '../components/Menu/Menu';
import figma from '@figma/code-connect';

figma.connect(
  Menu,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3263-18832&m=dev',
  {
    props: {
      heading: figma.boolean('Heading?', {
        true: figma.string('Heading'),
      }),
      children: figma.children('Menu Item'),
    },
    example: ({ children, ...props }) => <Menu {...props}>{children}</Menu>,
  }
);
