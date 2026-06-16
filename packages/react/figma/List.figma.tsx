import React from 'react';
import { List } from '../src/components/List/List';
import figma from '@figma/code-connect';

figma.connect(
  List,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2437-621&m=dev',
  {
    props: {
      sectionHeader: figma.enum('Section header?', {
        true: figma.nestedProps('Section Header', {
          heading: figma.string('Heading'),
          helperText: figma.string('Helper text'),
        }),
      }),
      variant: figma.enum('Container', {
        'Emphasis Warm White': 'emphasis',
        'Emphasis White': 'emphasis',
        'Subtle Warm White': 'subtle',
        'Subtle White': 'subtle',
      }),
      colorScheme: figma.enum('Container', {
        'Emphasis Warm White': 'neutralSubtle',
        'Emphasis White': 'neutralStrong',
        'Subtle Warm White': 'neutralSubtle',
        'Subtle White': 'neutralStrong',
      }),
      children: figma.children('List Item'),
    },
    example: ({ sectionHeader, children, ...props }) => (
      <List heading={sectionHeader.heading} helperText={sectionHeader.helperText} {...props}>
        {children}
      </List>
    ),
  }
);
