import React from 'react';
import { Toast } from '../src/components/Toast/Toast';
import figma from '@figma/code-connect';

figma.connect(
  Toast,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7072-913&m=dev',
  {
    props: {
      description: figma.string('Text'),
      icon: figma.boolean('Icon?', { true: figma.instance('Icon-24'), false: undefined }),
      showDismissButton: figma.boolean('Dismiss?'),
    },
    example: props => <Toast {...props} />,
  }
);
