import figma from '@figma/code-connect';
import { Pill } from '../';

figma.connect(Pill, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=4348%3A15595', {
  props: {
    label: figma.string('Label'),
    icon: figma.boolean('Icon?', {
      true: figma.instance('Icon-20'),
    }),
  },
  example: props => <Pill value={props.label} label={props.label} />,
});
