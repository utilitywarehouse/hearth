import figma from '@figma/code-connect';
import { Accordion } from './';

figma.connect(
  Accordion,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3385%3A7751',
  {
    props: {
      sectionHeader: figma.nestedProps('Section Header', {
        helperText: figma.string('Helper text'),
        heading: figma.string('Heading'),
      }),
      items: figma.children('Accordion Item'),
    },
    example: props => (
      <Accordion heading={props.sectionHeader.heading} helperText={props.sectionHeader.helperText}>
        {props.items}
      </Accordion>
    ),
  }
);
