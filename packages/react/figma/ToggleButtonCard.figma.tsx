import React from 'react';
import { ToggleButtonCard } from '../src/components/ToggleButtonCard/ToggleButtonCard';
import figma from '@figma/code-connect';

figma.connect(
  ToggleButtonCard,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2164-727&m=dev',
  {
    props: { children: figma.instance('Content') },
    example: ({ children }) => <ToggleButtonCard>{children}</ToggleButtonCard>,
  }
);
