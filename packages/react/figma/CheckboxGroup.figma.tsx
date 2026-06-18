import React from 'react';
import { CheckboxGroup } from '../src/components/CheckboxGroup/CheckboxGroup';
import figma from '@figma/code-connect';

figma.connect(
  CheckboxGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3141-4275&m=dev',
  {
    props: {
      label: figma.string('Group label'),
      labelVariant: figma.enum('Label variant', {
        Body: 'body',
        Heading: 'heading',
      }),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
      validationStatus: figma.enum('State', {
        Invalid: 'invalid',
      }),
      validationText: figma.enum('State', {
        Invalid: figma.string('Validation text'),
      }),
      children: figma.enum('Content', {
        Checkbox: figma.children('Checkbox'),
        'Checkbox Tile': figma.children('Checkbox Tile'),
      }),
    },
    example: ({ children, ...props }) => <CheckboxGroup {...props}>{children}</CheckboxGroup>,
  }
);
