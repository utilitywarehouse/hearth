import React from 'react';
import { ProgressStep } from '../src/components/ProgressStepper/ProgressStep';
import figma from '@figma/code-connect';

figma.connect(
  ProgressStep,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6056-1987&m=dev',
  {
    props: {
      label: figma.boolean('Label?', {
        true: figma.string('Label'),
        false: '',
      }),
      status: figma.enum('State', {
        Complete: 'complete',
        Active: 'active',
        Incomplete: 'incomplete',
      }),
    },
    example: props => <ProgressStep {...props} />,
  }
);
