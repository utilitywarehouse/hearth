import React from 'react';

import { AccordionItem } from '../src/components/Accordion/AccordionItem';
import figma from '@figma/code-connect';

figma.connect(
  AccordionItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3390-6160&m=dev',
  {
    props: {
      title: figma.string('Title'),
      description: figma.string('Description'),
    },
    example: props => <AccordionItem value="" {...props} />,
  }
);
