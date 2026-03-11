import figma from '@figma/code-connect';
import { SegmentedControl, SegmentedControlOption } from '../';

figma.connect(
  SegmentedControl,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6185-1021&m=dev',
  {
    props: {
      size: figma.enum('Size', {
        'SM-32': 'sm',
        'MD-48': 'md',
      }),
      options: figma.children('Option'),
    },
    example: props => (
      <SegmentedControl defaultValue="option-1" size={props.size}>
        {props.options}
      </SegmentedControl>
    ),
  }
);

figma.connect(
  SegmentedControlOption,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4340-1252&m=dev',
  {
    props: {
      label: figma.string('Label'),
      icon: figma.boolean('Icon?', {
        true: figma.instance('Icon-20'),
      }),
    },
    example: props => (
      <SegmentedControlOption value={'option'} icon={props.icon}>
        {props.label}
      </SegmentedControlOption>
    ),
  }
);
