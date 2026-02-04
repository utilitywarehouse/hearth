import React from 'react';
import { Menu } from '../components/Menu/Menu';
import { MenuTrigger } from '../components/Menu/MenuTrigger';
import { MenuContent } from '../components/Menu/MenuContent';
import { Button } from '../components/Button/Button';
import figma from '@figma/code-connect';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';

figma.connect(
  Menu,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3263-18832&m=dev',
  {
    props: {
      heading: figma.boolean('Heading?', {
        true: figma.string('Heading'),
      }),
      children: figma.children('Menu Item'),
    },
    example: ({ children, ...props }) => (
      <Menu {...props}>
        <MenuTrigger>
          <Button>
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>{children}</MenuContent>
      </Menu>
    ),
  }
);
