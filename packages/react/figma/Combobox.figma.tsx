import React from 'react';
import { Combobox } from '../src/components/Combobox/Combobox';
import figma from '@figma/code-connect';

figma.connect(
  Combobox,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9359-2923&m=dev',
  {
    props: {
      label: figma.string('Label'),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
      validationText: figma.enum('Value', {
        Invalid: figma.string('Validation'),
      }),
    },
    example: props => <Combobox {...props} />,
  }
);
