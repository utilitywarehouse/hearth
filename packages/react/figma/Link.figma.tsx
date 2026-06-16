import React from 'react';
import { Link } from '../src/components/Link/Link';
import figma from '@figma/code-connect';

figma.connect(
  Link,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=163-562&m=dev',
  {
    props: {
      iconLeft: figma.boolean('Icon left?', {
        true: figma.instance('Icon left-20'),
        false: undefined,
      }),
      iconRight: figma.boolean('Icon right?', {
        true: figma.instance('Icon right-20'),
        false: undefined,
      }),
      inverted: figma.boolean('Inverted?'),
      children: figma.string('Text'),
    },
    example: ({ children, iconLeft, iconRight, inverted }) => (
      <Link inverted={inverted} href="#">
        {iconLeft}
        {children}
        {iconRight}
      </Link>
    ),
  }
);
