import React from 'react';
import { Select } from '../src/components/Select/Select';
import { SelectItem } from '../src/components/Select/SelectItem';
import figma from '@figma/code-connect';

figma.connect(
  Select,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3224-995&m=dev',
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
      validationText: figma.enum('Variant', {
        Invalid: figma.string('Validation'),
        Valid: figma.string('Validation'),
      }),
      validationStatus: figma.enum('Variant', {
        Invalid: 'invalid',
        Valid: 'valid',
      }),
      required: figma.boolean('Optional?', {
        true: false,
        false: true,
      }),
    },
    example: props => (
      <Select {...props}>
        <SelectItem value="1">Item 1</SelectItem>
        <SelectItem value="2">Item 2</SelectItem>
        <SelectItem value="3">Item 3</SelectItem>
      </Select>
    ),
  }
);
