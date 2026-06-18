import React from 'react';
import { Tab } from '../src/components/Tabs/Tab';
import figma from '@figma/code-connect';

figma.connect(
  Tab,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6464-2288&m=dev',
  {
    props: {
      children: figma.string('Label'),
      icon: figma.boolean('Icon?', {
        true: figma.instance('Icon-20'),
        false: undefined,
      }),
    },
    example: ({ children, icon }) => (
      <Tab value="">
        {icon}
        {children}
      </Tab>
    ),
  }
);
