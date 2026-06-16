import React from 'react';
import { RadioGroup } from '../src/components/RadioGroup/RadioGroup';
import figma from '@figma/code-connect';

figma.connect(
  RadioGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13254&m=dev',
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
      validationText: figma.enum('State', {
        Invalid: figma.string('Validation'),
      }),
      validationStatus: figma.enum('State', {
        Invalid: 'invalid',
      }),
      direction: figma.enum('Direction', {
        Column: 'column',
        Row: 'row',
      }),
      children: figma.enum('Content', {
        Radio: figma.children('Radio'),
        'Radio Tile': figma.children('Radio Tile'),
      }),
    },
    example: ({ children, ...props }) => <RadioGroup {...props}>{children}</RadioGroup>,
  }
);
