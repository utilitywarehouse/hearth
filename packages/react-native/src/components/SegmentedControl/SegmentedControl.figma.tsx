import figma from '@figma/code-connect';
import { SegmentedControl, SegmentedControlOption } from '../';

figma.connect(
  SegmentedControl,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6185-1021&t=c7xg5X0N2EL0t87h-4',
  {
    props: {
      size: figma.enum('Size', {
        'SM-32': 'sm',
        'MD-48': 'md',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      options: figma.children('Option'),
    },
    example: props => (
      <SegmentedControl defaultValue="option-1" size={props.size} disabled={props.disabled}>
        {props.options}
      </SegmentedControl>
    ),
  }
);

figma.connect(
  SegmentedControlOption,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4340-1252&t=c7xg5X0N2EL0t87h-4',
  {
    props: {
      label: figma.string('Label'),
      value: figma.string('Value'),
    },
    example: props => (
      <SegmentedControlOption value={props.value ?? 'option'}>
        {props.label ?? 'Option'}
      </SegmentedControlOption>
    ),
  }
);
