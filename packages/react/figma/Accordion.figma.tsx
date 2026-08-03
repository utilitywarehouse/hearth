import React from 'react';
import { Accordion } from '../src/components/Accordion/Accordion';
import figma from '@figma/code-connect';

figma.connect(
  Accordion,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3385-7751&m=dev',
  {
    props: {
      sectionHeader: figma.enum('Section header?', {
        true: figma.nestedProps('Section Header', {
          heading: figma.string('Heading'),
          helperText: figma.string('Helper text'),
          badge: figma.instance('Badge'),
          trailingContent: figma.instance('Trailing content'),
        }),
      }),
      children: figma.children('Accordion Item'),
    },
    example: ({ sectionHeader, children, ...props }) => (
      <Accordion
        heading={sectionHeader.heading}
        helperText={sectionHeader.helperText}
        {...props}
      >
        {children}
      </Accordion>
    ),
  }
);
