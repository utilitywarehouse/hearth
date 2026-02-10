import figma from '@figma/code-connect';
import { SectionHeader } from '../';

figma.connect(
  SectionHeader,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=9092%3A3352',
  {
    props: {
      trailingContent: figma.boolean('Trailing content?', {
        true: figma.nestedProps('Trailing content', {
          content: figma.children('Link'),
        }),
      }),
      helperText: figma.boolean('Helper text?', {
        true: figma.string('Helper text'),
      }),
      heading: figma.string('Heading'),
      badge: figma.boolean('Badge?', {
        true: figma.children('Badge'),
      }),
      invalidText: figma.enum('State', {
        Invalid: figma.nestedProps('Validation Text', {
          text: figma.string('Text'),
        }),
      }),
    },
    example: props => (
      <SectionHeader
        heading={props.heading}
        helperText={props.helperText}
        badge={props.badge}
        trailingContent={props.trailingContent?.content}
        invalidText={props.invalidText?.text}
      />
    ),
  }
);
