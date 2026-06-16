import React from 'react';
import { Divider } from '../src/components/Divider/Divider';
import figma from '@figma/code-connect';

figma.connect(
  Divider,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2421-1687&m=dev',
  {
    props: {
      orientation: figma.enum('Orientation', {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      }),
    },
    example: props => <Divider {...props} decorative />,
  }
);
