import React from 'react';
import { Tabs } from '../src/components/Tabs/Tabs';
import { TabsList } from '../src/components/Tabs/TabsList';
import { TabContent } from '../src/components/Tabs/TabContent';
import figma from '@figma/code-connect';

figma.connect(
  Tabs,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6464-8744&m=dev',
  {
    props: {
      size: figma.enum('Size', {
        'MD-56': 'md',
        'LG-64': 'lg',
      }),
      children: figma.children('Tab item'),
    },
    example: ({ children, ...props }) => (
      <Tabs {...props}>
        <TabsList>{children}</TabsList>
        <TabContent value=""></TabContent>
        <TabContent value=""></TabContent>
        <TabContent value=""></TabContent>
      </Tabs>
    ),
  }
);
