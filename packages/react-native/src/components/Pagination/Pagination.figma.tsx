import figma from '@figma/code-connect';
import { Pagination } from './';

figma.connect(
  Pagination,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6416-5836&t=pZwKJYFo1y1QRQD1-4',
  {
    props: {
      condensed: figma.boolean('Condensed?'),
    },
    example: props => (
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
        condensed={props.condensed}
      />
    ),
  }
);
