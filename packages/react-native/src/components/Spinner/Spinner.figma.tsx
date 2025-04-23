import React from 'react';
import { Spinner } from './';
import figma from '@figma/code-connect';
import { color } from '@utilitywarehouse/hearth-tokens/js';

figma.connect(
  Spinner,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components?node-id=61-195&t=j6vWFfxRVLbnAYhY-4',
  {
    props: {
      size: figma.enum('Size', {
        'XS-20': 'xs',
        'SM-24': 'sm',
        'MD-32': 'md',
        'LG-44': 'lg',
      }),
    },
    example: ({ size }) => <Spinner size={size} color={color.light.purple['300']} />,
  }
);
