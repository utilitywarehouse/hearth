import React from 'react';
import { DescriptionListItem } from '../src/components/DescriptionList/DescriptionListItem';
import figma from '@figma/code-connect';

figma.connect(
  DescriptionListItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7247-5209&m=dev',
  {
    props: {
      heading: figma.string('Heading'),
      description: figma.boolean('Description?', {
        true: figma.string('Description'),
        false: undefined,
      }),
      validationText: figma.enum('State', {
        Invalid: figma.string('Validation'),
      }),
      validationStatus: figma.enum('State', {
        Invalid: 'invalid',
      }),
    },
    example: props => <DescriptionListItem {...props} />,
  }
);
