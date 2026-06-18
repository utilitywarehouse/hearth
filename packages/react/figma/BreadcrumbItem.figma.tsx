import React from 'react';
import { BreadcrumbItem } from '../src/components/Breadcrumbs/BreadcrumbItem';
import figma from '@figma/code-connect';

figma.connect(
  BreadcrumbItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=5187-1428&m=dev',
  {
    props: {
      currentPage: figma.boolean('Current page?'),
      children: figma.string('Text'),
    },
    example: ({ children, ...props }) => <BreadcrumbItem {...props}>{children}</BreadcrumbItem>,
  }
);
