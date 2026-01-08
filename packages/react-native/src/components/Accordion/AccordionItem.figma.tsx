import figma from '@figma/code-connect';
import { BodyText } from '../BodyText';
import { AccordionItem } from './';

figma.connect(
  AccordionItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3390%3A6160',
  {
    props: {
      title: figma.string('Title'),
      expanded: figma.boolean('Expand?'),
      triggerContent: figma.instance('Trigger custom content'),
      description: figma.string('Description'),
      content: figma.instance('Custom content'),
    },
    example: props => (
      <AccordionItem
        title={props.title}
        expanded={props.expanded}
        triggerContent={props.triggerContent}
      >
        <BodyText>{props.description}</BodyText>
        {props.content}
      </AccordionItem>
    ),
  }
);
