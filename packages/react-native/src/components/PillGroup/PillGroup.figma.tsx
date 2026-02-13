import figma from '@figma/code-connect';
import { PillGroup } from '../';

const value = '';

figma.connect(
  PillGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=4348%3A15988',
  {
    props: {
      wrap: figma.boolean('Wrap?'),
      pills: figma.children('Pill'),
    },
    example: props => (
      <PillGroup value={value} wrap={props.wrap}>
        {props.pills}
      </PillGroup>
    ),
  }
);
