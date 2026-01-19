import React from 'react';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
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
      badge: figma.enum('Badge?', {
        true: figma.instance('Badge'),
        false: undefined,
      }),
      // this is not fully working as expected due to figma limitations
      trailingContent: figma.enum('Trailing content?', {
        Link: figma.children('Link'),
        Button: figma.children('Button'),
      }),
    },
    example: ({ ...props }) => <SectionHeader {...props} />,
  }
);
