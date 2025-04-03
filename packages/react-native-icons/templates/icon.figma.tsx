import React from 'react';
import { <%= name %> } from '../lib';
import figma from '@figma/code-connect';

/**
 * -- This file was auto-generated --
 */

figma.connect(
  <%= name %>,
  'https://www.figma.com/design/x1DivEZ23UPZP7WXufHPjG/UW-Icons?node-id=<%= id %>&m=dev',
  {
    props: {},
    example: () => <<%= name %> />,
  }
);
