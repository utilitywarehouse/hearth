import React from 'react';
import { ValidationText } from '../src/components/ValidationText/ValidationText';
import figma from '@figma/code-connect';

figma.connect(
  ValidationText,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8136-2095&m=dev',
  {
    props: {
      children: figma.string('Text'),
      status: figma.enum('Validation', {
        Invalid: 'invalid',
        Valid: 'valid',
      }),
    },
    example: ({ children, ...props }) => <ValidationText {...props}>{children}</ValidationText>,
  }
);
