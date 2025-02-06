import React from 'react';
import { Spinner } from './';
import figma from '@figma/code-connect';
import { color } from '@utilitywarehouse/hearth-tokens';

figma.connect(
  Spinner,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components?node-id=61-195&t=j6vWFfxRVLbnAYhY-4',
  {
    props: {
      size: figma.enum('size', {
        XS: 'xs',
        SM: 'sm',
        MD: 'md',
        LG: 'lg',
      }),
    },
    example: ({ size }) => <Spinner size={size} color={color.common.uwPurple} />,
  }
);
