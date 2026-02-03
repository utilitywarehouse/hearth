import figma from '@figma/code-connect';
import ListAction from './ListAction';

figma.connect(
  ListAction,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=9661%3A5128',
  {
    props: {
      heading: figma.string('Action heading'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      loading: figma.enum('State', {
        Loading: true,
      }),
    },
    example: props => <ListAction heading={props.heading} disabled={props.disabled} />,
  }
);
