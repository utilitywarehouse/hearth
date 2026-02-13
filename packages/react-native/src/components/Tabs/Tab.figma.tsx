import figma from '@figma/code-connect';
import { Tab } from '..';

figma.connect(
  Tab,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6464-2288&m=dev',
  {
    props: {
      label: figma.string('Label'),
      icon: figma.boolean('Icon?', {
        true: figma.instance('Icon-20'),
      }),
      tabs: figma.children('Tab item'),
    },
    example: props => (
      <Tab value={props.label} icon={props.icon}>
        {props.label}
      </Tab>
    ),
  }
);
