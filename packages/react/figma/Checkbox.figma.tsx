import React from 'react';
import { Checkbox } from '../src/components/Checkbox/Checkbox';
import figma from '@figma/code-connect';

figma.connect(
  Checkbox,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3087-7316&m=dev',
  {
    props: {
      label: figma.string('Label'),
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
      image: figma.boolean('Image?', {
        true: figma.children('Checkbox Image'),
        false: undefined,
      }),
    },
    example: props => <Checkbox {...props} />,
  }
);
