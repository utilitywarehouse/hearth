import React from 'react';
import { Alert } from '../src/components/Alert/Alert';
import figma from '@figma/code-connect';

figma.connect(
  Alert,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3288-4656&m=dev',
  {
    props: {
      colorScheme: figma.enum('Color Scheme', {
        Info: 'info',
        Positive: 'positive',
        Danger: 'danger',
        Warning: 'warning',
      }),
      title: figma.boolean('Title?', {
        true: figma.string('Title'),
        false: undefined,
      }),
      text: figma.string('Text'),
    },
    example: props => <Alert {...props} />,
  }
);
