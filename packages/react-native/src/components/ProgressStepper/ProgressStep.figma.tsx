import figma from '@figma/code-connect';
import { ProgressStep } from '../';

figma.connect(
  ProgressStep,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=6056%3A1987',
  {
    props: {
      status: figma.enum('State', {
        Complete: 'complete',
        Active: 'active',
        Incomplete: 'incomplete',
      }),
      label: figma.string('Label'),
      id: figma.string('Step number'),
    },
    example: props => <ProgressStep id={props.id} status={props.status} />,
  }
);
