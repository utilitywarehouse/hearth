import React from 'react';
import { CheckboxTile } from '../src/components/CheckboxTile/CheckboxTile';
import figma from '@figma/code-connect';

figma.connect(
  CheckboxTile,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4961-23797&m=dev',
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
        Invalid: figma.children(['Content', 'Validation', 'Text']),
      }),
      image: figma.boolean('Image?', {
        true: figma.children('Checkbox Image'),
        false: undefined,
      }),
    },
    example: props => <CheckboxTile {...props} />,
  }
);
