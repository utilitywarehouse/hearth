import React from 'react';
import { Radio } from '../src/components/Radio/Radio';
import figma from '@figma/code-connect';

figma.connect(
  Radio,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7428-12685&m=dev',
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
    },
    example: props => <Radio {...props} />,
  }
);
