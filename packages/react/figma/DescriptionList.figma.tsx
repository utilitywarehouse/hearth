import React from 'react';
import { DescriptionList } from '../src/components/DescriptionList/DescriptionList';
import figma from '@figma/code-connect';

figma.connect(
  DescriptionList,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7247-4636&m=dev',
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
      children: figma.children('Item'),
    },
    example: ({ sectionHeader, children, ...props }) => (
      <DescriptionList
        heading={sectionHeader.heading}
        helperText={sectionHeader.helperText}
        {...props}
      >
        {children}
      </DescriptionList>
    ),
  }
);
