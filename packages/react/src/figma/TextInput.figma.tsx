import React from 'react';
import { TextInput } from '../components/TextInput/TextInput';
import { InputSlot } from '../components/InputSlot/InputSlot';
import { BodyText } from '../components/BodyText/BodyText';

import figma from '@figma/code-connect';

figma.connect(
  TextInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2685-7021&m=dev',
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
      required: figma.boolean('Optional?', {
        true: false,
        false: true,
      }),
    },
    example: ({ ...props }) => <TextInput {...props} />,
  }
);
