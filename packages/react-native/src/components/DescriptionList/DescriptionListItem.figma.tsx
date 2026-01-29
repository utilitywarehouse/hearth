import figma from '@figma/code-connect';
import { DescriptionListItem } from '../';

figma.connect(
  DescriptionListItem,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7247-5209&t=3uUSBVdxldgG5uz3-4',
  {
    props: {
      heading: figma.string('Heading'),
      direction: figma.enum('Direction', {
        Row: 'row',
        Column: 'column',
      }),
      description: figma.boolean('Description?', {
        true: figma.string('Description'),
      }),
      trailingContent: figma.boolean('Trailing content?', {
        true: figma.nestedProps('Trailing content', {
          trailingContent: figma.instance('Variant'),
        }),
      }),
      invalidText: figma.enum('State', {
        Invalid: figma.nestedProps('Validation Text', {
          invalidText: figma.string('Text'),
        }),
      }),
      numericValue: figma.boolean('Numerical value?', {
        true: figma.string('Numerical value'),
      }),
    },
    example: props => (
      <DescriptionListItem
        heading={props.heading}
        description={props.description}
        direction={props.direction}
        trailingContent={props.trailingContent?.trailingContent}
        invalidText={props.invalidText?.invalidText}
        numericValue={props.numericValue}
      />
    ),
  }
);
