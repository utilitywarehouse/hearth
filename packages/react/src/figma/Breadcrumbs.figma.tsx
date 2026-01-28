import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import figma from '@figma/code-connect';

figma.connect(
  Breadcrumbs,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9617-42123&m=dev',
  {
    props: {
      children: figma.children('Breadcrumb'),
    },
    example: ({ children, ...props }) => <Breadcrumbs {...props}>{children}</Breadcrumbs>,
  }
);
