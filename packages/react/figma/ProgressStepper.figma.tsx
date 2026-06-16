import React from 'react';
import { ProgressStepper } from '../src/components/ProgressStepper/ProgressStepper';
import figma from '@figma/code-connect';

figma.connect(
  ProgressStepper,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6056-2000&m=dev',
  {
    props: {
      children: figma.children('Step'),
    },
    example: ({ children }) => <ProgressStepper>{children}</ProgressStepper>,
  }
);
