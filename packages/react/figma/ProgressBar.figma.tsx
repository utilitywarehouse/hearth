import React from 'react';
import { ProgressBar } from '../src/components/ProgressBar/ProgressBar';
import figma from '@figma/code-connect';

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7849-5704&m=dev',
  {
    props: {
      label: figma.boolean('Label?', {
        true: figma.string('Label'),
        false: '',
      }),
      colorScheme: figma.enum('Color Scheme', {
        Default: 'default',
        Success: 'success',
        Danger: 'danger',
      }),
    },
    example: props => <ProgressBar {...props} value={10} variant="linear" />,
  }
);

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7863-3977&m=dev',
  {
    props: {
      label: figma.boolean('Label?', {
        true: figma.string('Label'),
        false: '',
      }),
      colorScheme: figma.enum('Color Scheme', {
        Default: 'default',
        Success: 'success',
        Danger: 'danger',
      }),
    },
    example: props => <ProgressBar {...props} value={10} variant="circular" />,
  }
);
