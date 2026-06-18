import React from 'react';
import { ListItem } from '../src/components/List/ListItem';
import { ListItemButton } from '../src/components/List/ListItemButton';
import figma from '@figma/code-connect';

figma.connect(
  ListItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2421-1628&m=dev',
  {
    props: {
      heading: figma.string('List heading'),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
      badge: figma.boolean('Badge?', {
        true: figma.children('Badge'),
      }),
      leadingContent: figma.boolean('Leading content?', {
        true: figma.nestedProps('Leading content', {
          variant: figma.enum('Variant', {
            Icon: figma.instance('Icon-24'),
            'Icon Container': figma.children('Icon Container'),
            Avatar: figma.children('Avatar'),
          }),
        }),
      }),
      trailingContent: figma.boolean('Trailing Content?', {
        true: figma.nestedProps('Trailing content', {
          variant: figma.enum('Variant', {
            Icon: figma.instance('Icon-20'),
            Link: figma.children('Link'),
            Button: figma.children('Button'),
            Switch: figma.children('Switch'),
          }),
        }),
      }),
    },
    example: ({ leadingContent, trailingContent, ...props }) => (
      <ListItem>
        {/* ListItemLink is also available for links,
          and ListItemContent for static content. */}
        <ListItemButton
          {...props}
          leadingContent={leadingContent.variant}
          trailingContent={trailingContent.variant}
        />
      </ListItem>
    ),
  }
);
