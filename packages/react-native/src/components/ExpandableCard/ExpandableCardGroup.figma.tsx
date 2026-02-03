import figma from '@figma/code-connect';
import { ExpandableCardGroup } from '../';

figma.connect(
  ExpandableCardGroup,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7222-7221&m=dev',
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
      cards: figma.children('Expandable Card'),
    },
    example: props => (
      <ExpandableCardGroup
        heading={props.sectionHeader?.heading}
        helperText={props.sectionHeader?.helperText}
        headerTrailingContent={props.sectionHeader?.trailingContent?.headerTrailingContent}
        invalidText={props.sectionHeader?.invalidText?.invalidText}
      >
        {props.cards}
      </ExpandableCardGroup>
    ),
  }
);
