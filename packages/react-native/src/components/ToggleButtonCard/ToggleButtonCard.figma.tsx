import figma from '@figma/code-connect';
import { ToggleButtonCard } from '..';

figma.connect(
  ToggleButtonCard,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2164-727&t=Uq6QfQcygdNGv5lM-4',
  {
    variant: {
      Variant: 'Toggle Button',
    },
    props: {
      radio: figma.nestedProps('Radio', {
        label: figma.string('Label'),
      }),
      content: figma.instance('Content'),
    },
    example: props => (
      // This should be wrapped in a ToggleButtonCardGroup, see docs
      <ToggleButtonCard label={props.radio.label} value="someValue">
        {props.content}
      </ToggleButtonCard>
    ),
  }
);
