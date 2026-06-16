import React from 'react';
import { DatePicker } from '../src/components/DatePicker/DatePicker';
import figma from '@figma/code-connect';

figma.connect(
  DatePicker,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3917-7057&m=dev',
  {
    props: {
      label: figma.string('Label'),
      helperText: figma.boolean('Helper  text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
      validationText: figma.enum('Variant', {
        Invalid: figma.string('Validation'),
        Valid: figma.string('Validation'),
      }),
      validationStatus: figma.enum('Variant', {
        Invalid: 'invalid',
        Valid: 'valid',
      }),
    },
    example: props => <DatePicker {...props} />,
  }
);
