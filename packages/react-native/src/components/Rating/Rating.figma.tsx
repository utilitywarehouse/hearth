import figma from '@figma/code-connect';
import { Rating } from '../';

figma.connect(
  Rating,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10620-4185',
  {
    props: {
      value: figma.enum('Rating', {
        '0 Star': 0,
        '1 Star': 1,
        '2 Star': 2,
        '3 Star': 3,
        '4 Star': 4,
        '5 Star': 5,
      }),
    },
    example: props => <Rating value={props.value} />,
  }
);

figma.connect(
  Rating,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10620-4185',
  {
    variant: { Variant: 'Emojis' },
    props: {
      value: figma.enum('Rating', {
        '0 Star': 0,
        '1 Star': 1,
        '2 Star': 2,
        '3 Star': 3,
        '4 Star': 4,
        '5 Star': 5,
      }),
    },
    example: props => <Rating value={props.value} variant="emojis" />,
  }
);
