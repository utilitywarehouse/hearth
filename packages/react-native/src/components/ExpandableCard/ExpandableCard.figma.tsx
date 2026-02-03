import figma from '@figma/code-connect';
import { ExpandableCard } from '../';
import { IconContainer } from '../IconContainer';

figma.connect(
  ExpandableCard,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=7222%3A5935',
  {
    props: {
      expanded: figma.boolean('Expand?'),
      heading: figma.string('Heading'),
      helperText: figma.string('Helper text'),
      leadingContent: figma.boolean('Leading content?', {
        true: figma.nestedProps('Leading content', {
          variant: figma.enum('Variant', {
            Icon: figma.instance('Icon-24'),
            'Icon Container': <IconContainer icon={figma.instance('Icon-24')} />,
          }),
        }),
      }),
      disabled: figma.enum('State', {
        Active: true,
      }),
      collapsable: figma.boolean('Expand?'),
      focusable: figma.enum('State', {
        Focus: true,
      }),
      content: figma.instance('Custom content'),
      numericalValue: figma.boolean('Numerical value?', {
        true: figma.string('Numerical value'),
      }),
      badge: figma.boolean('Badge?', {
        true: figma.instance('Badge'),
      }),
    },
    example: props => (
      <ExpandableCard
        expanded={props.expanded}
        heading={props.heading}
        helperText={props.helperText}
        leadingContent={props.leadingContent?.variant}
        numericValue={props.numericalValue}
        badge={props.badge}
      >
        {props.content}
      </ExpandableCard>
    ),
  }
);
