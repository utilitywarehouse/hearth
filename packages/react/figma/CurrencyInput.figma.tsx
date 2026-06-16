import React from 'react';
import { CurrencyInput } from '../src/components/CurrencyInput/CurrencyInput';
import figma from '@figma/code-connect';

figma.connect(
  CurrencyInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2161-1336&m=dev',
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
      value: figma.string('Value'),
    },
    example: props => <CurrencyInput {...props} />,
  }
);
