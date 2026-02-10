import figma from '@figma/code-connect';
import { ProgressStepper } from '../';

figma.connect(
  ProgressStepper,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=6056%3A2000',
  {
    props: {
      steps: figma.children('Step'),
    },
    example: props => <ProgressStepper>{props.steps}</ProgressStepper>,
  }
);
