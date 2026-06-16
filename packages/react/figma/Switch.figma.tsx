import React from 'react';
import { Switch } from '../src/components/Switch/Switch';
import figma from '@figma/code-connect';

figma.connect(
  Switch,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3044-243&m=dev',
  {
    props: {},
    example: () => <Switch />,
  }
);
