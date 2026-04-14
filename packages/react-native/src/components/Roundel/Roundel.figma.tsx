import figma from '@figma/code-connect';
import { Roundel } from '..';

figma.connect(
  Roundel,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6414%3A8697&m=dev',
  {
    props: {
      variant: figma.enum('Variant', {
        Success: 'success',
        Pending: 'pending',
        Error: 'error',
      }),
    },
    example: props => <Roundel variant={props.variant} />,
  }
);
