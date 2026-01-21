import React from 'react';
import { Button } from '../components/Button/Button';
import figma from '@figma/code-connect';

const sharedProps = {
  iconLeft: figma.enum('Show icon left?', {
    true: figma.instance('Icon left-20'),
    false: undefined,
  }),
  iconRight: figma.enum('Show icon right?', {
    true: figma.instance('Icon right-20'),
    false: undefined,
  }),
  size: figma.enum('Size', {
    'MD-48': 'md',
    'SM-32': 'sm',
  }),
  inverted: figma.boolean('Inverted?'),
  paddingNone: figma.boolean('Padding None?'),
};

figma.connect(
  Button,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=90-432&m=dev',
  {
    props: {
      ...sharedProps,
      variant: figma.enum('Variant', {
        Emphasis: 'emphasis',
      }),
      colorScheme: figma.enum('Color Scheme', {
        Highlight: 'highlight',
      }),
      children: figma.string('Text'),
    },
    example: ({ children, iconLeft, iconRight, ...props }) => (
      <Button onClick={() => {}} {...props}>
        {iconLeft}
        {children}
        {iconRight}
      </Button>
    ),
  }
);
