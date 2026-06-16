import React from 'react';
import { Avatar } from '../src/components/Avatar/Avatar';
import figma from '@figma/code-connect';

figma.connect(
  Avatar,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6790-14313&m=dev',
  {
    props: {
      size: figma.enum('Size', {
        'SM-32': 'sm',
        'MD-48': 'md',
      }),
      name: figma.string('Initials'),
    },
    example: props => <Avatar {...props} />,
  }
);
