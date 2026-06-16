import React from 'react';
import { SectionHeader } from '../src/components/SectionHeader/SectionHeader';
import figma from '@figma/code-connect';

figma.connect(
  SectionHeader,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9092-3352&m=dev',
  {
    props: {
      heading: figma.string('Heading'),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
      badge: figma.boolean('Badge?', {
        true: figma.children('Badge'),
      }),
      validationStatus: figma.enum('State', {
        Invalid: 'invalid',
      }),
      trailingContent: figma.boolean('Trailing content?', {
        true: figma.nestedProps('Trailing content', {
          variant: figma.enum('Variant', {
            Link: figma.children('Link'),
            Button: figma.children('Button'),
          }),
        }),
      }),
    },
    example: ({ trailingContent, ...props }) => (
      <SectionHeader {...props} trailingContent={trailingContent.variant} />
    ),
  }
);
