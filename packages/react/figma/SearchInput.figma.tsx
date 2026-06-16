import React from 'react';
import { SearchInput } from '../src/components/SearchInput/SearchInput';
import figma from '@figma/code-connect';

figma.connect(
  SearchInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2161-1311&m=dev',
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
    example: props => <SearchInput {...props} />,
  }
);
