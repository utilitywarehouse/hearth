import React from 'react';
import { VerificationInput } from '../src/components/VerificationInput/VerificationInput';
import figma from '@figma/code-connect';

figma.connect(
  VerificationInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4049-3615&m=dev',
  {
    props: {
      label: figma.string('Label'),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
      validationText: figma.enum('State', {
        Invalid: figma.string('Validation'),
        Valid: figma.string('Validation'),
      }),
      validationStatus: figma.enum('State', {
        Invalid: 'invalid',
        Valid: 'valid',
      }),
    },
    example: props => <VerificationInput {...props} />,
  }
);
