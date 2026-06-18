import React from 'react';
import { Pagination } from '../src/components/Pagination/Pagination';
import figma from '@figma/code-connect';

figma.connect(
  Pagination,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6416-5836&m=dev',
  { props: {}, example: props => <Pagination /> }
);
