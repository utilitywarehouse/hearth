import figma from '@figma/code-connect';
import { ListItem } from '../';

figma.connect(ListItem, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2421%3A1628', {
  props: {
    loading: figma.enum('State', {
      Loading: true,
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    leadingContent: figma.boolean('Leading content?', {
      true: figma.nestedProps('Leading content', {
        variant: figma.enum('Variant', {
          Icon: figma.instance('Icon-24'),
          'Icon Container': figma.children('Icon Container'),
          Avatar: figma.children('Avatar'),
          Indicator: figma.children('Indicator'),
        }),
      }),
    }),
    trailingContent: figma.boolean('Trailing Content?', {
      true: figma.nestedProps('Trailing content', {
        variant: figma.enum('Variant', {
          Icon: figma.instance('Icon-20'),
          Link: figma.children('Link'),
          Button: figma.children('Button'),
          Switch: figma.children('Switch'),
          Transaction: figma.children('Transaction'),
        }),
      }),
    }),
    heading: figma.string('List heading'),
    helperText: figma.boolean('Helper text?', {
      true: figma.string('Helper text'),
    }),
    badge: figma.boolean('Badge?', {
      true: figma.children('Badge'),
    }),
    numbericValue: figma.boolean('Numerical value?', {
      true: figma.string('Numerical value'),
    }),
  },
  example: props => (
    <ListItem
      heading={props.heading}
      helperText={props.helperText}
      badge={props.badge}
      numbericValue={props.numbericValue}
      loading={props.loading}
      disabled={props.disabled}
      leadingContent={props.leadingContent?.variant}
      trailingContent={props.trailingContent?.variant}
    />
  ),
});
