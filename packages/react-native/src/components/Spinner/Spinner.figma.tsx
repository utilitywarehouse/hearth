import figma from '@figma/code-connect';
import { Spinner } from '../';

figma.connect(Spinner, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=61%3A195', {
  props: {
    size: figma.enum('Size', {
      'XS-20': 'xs',
      'SM-24': 'sm',
      'MD-32': 'md',
      'LG-44': 'lg',
    }),
  },
  example: props => <Spinner size={props.size} />,
});
