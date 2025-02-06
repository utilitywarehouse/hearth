import React from 'react';
import { Badge } from './';
import figma from '@figma/code-connect';

figma.connect(
  Badge,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components?node-id=61-652&t=j6vWFfxRVLbnAYhY-4',
  {
    links: [
      {
        name: 'Storybook - Docs',
        url: 'https://uw-hearth-react-native.vercel.app/?path=/docs/components-badge--docs',
      },
    ],
    props: {
      text: figma.string('text'),
      colorScheme: figma.enum('Color Scheme', {
        blue: 'blue',
        orange: 'orange',
        green: 'green',
        grey: 'grey',
        red: 'red',
      }),
      flatBase: figma.boolean('Flat Base?'),
    },
    example: ({ text, colorScheme, flatBase }) => (
      <Badge colorScheme={colorScheme} flatBase={flatBase}>
        {text}
      </Badge>
    ),
  }
);
