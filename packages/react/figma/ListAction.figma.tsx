import React from 'react';
import { ListActionButton } from '../src/components/List/ListActionButton';
import figma from '@figma/code-connect';

figma.connect(
  ListActionButton,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9661-5128&m=dev',
  {
    props: {
      children: figma.string('Action heading'),
    },
    example: ({ children }) => (
      /* ListActionLink is also available for links. */
      <ListActionButton>{children}</ListActionButton>
    ),
  }
);
