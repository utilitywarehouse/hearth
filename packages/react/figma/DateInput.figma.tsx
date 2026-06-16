import React from 'react';
import { DateInput } from '../src/components/DateInput/DateInput';
import figma from '@figma/code-connect';

figma.connect(
  DateInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2277-14708&m=dev',
  {
    props: {
      label: figma.string('Label'),
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
        Valid: figma.string('Validation'),
      }),
      validationStatus: figma.enum('State', {
        Invalid: 'invalid',
        Valid: 'valid',
      }),
      hideDay: figma.boolean('Day?', {
        true: false,
        false: true,
      }),
      hideMonth: figma.boolean('Month?', {
        true: false,
        false: true,
      }),
      dayValue: figma.boolean('Day?', {
        true: figma.string('Day value'),
        false: undefined,
      }),
      monthValue: figma.boolean('Month?', {
        true: figma.string('Month value'),
        false: undefined,
      }),
      yearValue: figma.string('Year value'),
    },
    example: props => <DateInput {...props} />,
  }
);
