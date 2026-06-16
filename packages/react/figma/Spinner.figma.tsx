import React from 'react';
import { Spinner } from '../src/components/Spinner/Spinner';
import figma from '@figma/code-connect';

figma.connect(
  Spinner,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=61-195&m=dev',
  {
    props: {
      size: figma.enum('Size', {
        'XS-20': 'xs',
        'SM-24': 'sm',
        'MD-32': 'md',
        'LG-44': 'lg',
      }),
    },
    example: props => <Spinner {...props} />,
  }
);
