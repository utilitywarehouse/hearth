import figma from '@figma/code-connect';
import { DescriptionList } from '../';

figma.connect(
  DescriptionList,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7247%3A4636',
  {
    props: {
      sectionHeader: figma.boolean('Section header?', {
        true: figma.nestedProps('Section Header', {
          heading: figma.string('Heading'),
          helperText: figma.boolean('Helper text?', {
            true: figma.string('Helper text'),
          }),
          trailingContent: figma.boolean('Trailing content?', {
            true: figma.nestedProps('Trailing content', {
              headerTrailingContent: figma.instance('Variant'),
            }),
          }),
          invalidText: figma.enum('State', {
            Invalid: figma.nestedProps('Validation Text', {
              invalidText: figma.string('Text'),
            }),
          }),
        }),
      }),
      items: figma.children('Item'),
      direction: figma.nestedProps('Item', {
        direction: figma.enum('Direction', {
          Row: 'row',
          Column: 'column',
        }),
      }),
    },
    example: props => (
      <DescriptionList
        heading={props.sectionHeader?.heading}
        helperText={props.sectionHeader?.helperText}
        direction={props.direction?.direction}
        headerTrailingContent={props.sectionHeader?.trailingContent?.headerTrailingContent}
        invalidText={props.sectionHeader?.invalidText?.invalidText}
      >
        {props.items}
      </DescriptionList>
    ),
  }
);
