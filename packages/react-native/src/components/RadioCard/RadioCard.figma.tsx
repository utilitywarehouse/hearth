import figma from '@figma/code-connect';
import { RadioCard } from '../';

figma.connect(
  RadioCard,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2164-727&t=Uq6QfQcygdNGv5lM-4',
  {
    variant: {
      Variant: 'Radio',
    },
    props: {
      radio: figma.nestedProps('Radio', {
        label: figma.string('Label'),
      }),
      content: figma.instance('Content'),
    },
    example: props => (
      // This should be wrapped in a RadioCardGroup, see docs
      <RadioCard label={props.radio.label} value="someValue">
        {props.content}
      </RadioCard>
    ),
  }
);
