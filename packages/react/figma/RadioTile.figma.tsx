import React from 'react';
import { RadioTile } from '../src/components/RadioTile/RadioTile';
import figma from '@figma/code-connect';

figma.connect(
  RadioTile,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3138-13222&m=dev',
  {
    props: {
      label: figma.string('Label'),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
        false: undefined,
      }),
      image: figma.boolean('Image?', {
        true: figma.children('Radio Image'),
        false: undefined,
      }),
      badge: figma.boolean('Badge?', {
        true: figma.children('Badge'),
        false: undefined,
      }),
    },
    example: props => <RadioTile {...props} />,
  }
);
