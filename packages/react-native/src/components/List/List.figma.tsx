import figma from '@figma/code-connect';
import { List } from '../';

figma.connect(List, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2437%3A621', {
  props: {
    container: figma.enum('Container', {
      'Subtle White': 'subtleWhite',
      'Emphasis White': 'emphasisWhite',
      'Subtle Warm White': 'subtleWarmWhite',
      'Emphasis Warm White': 'emphasisWarmWhite',
    }),
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
    listItems: figma.children('List Item'),
    listActions: figma.children('List Action'),
  },
  example: props => (
    <List
      container={props.container}
      heading={props.sectionHeader?.heading}
      helperText={props.sectionHeader?.helperText}
      headerTrailingContent={props.sectionHeader?.trailingContent?.headerTrailingContent}
      invalidText={props.sectionHeader?.invalidText?.invalidText}
    >
      {props.listItems}
      {props.listActions}
    </List>
  ),
});
