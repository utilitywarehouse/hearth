import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Link } from '../Link/Link';
import { DescriptionList } from './DescriptionList';
import { DescriptionListItem } from './DescriptionListItem';

const meta: Meta<typeof DescriptionList> = {
  title: 'Components / DescriptionList',
  component: DescriptionList,
  argTypes: {
    headingElement: {
      control: { type: 'radio' },
      options: ['div', 'h1', 'h2', 'h3', 'h4'],
    },
    direction: {
      control: { type: 'radio' },
      options: ['row', 'column'],
    },
  },
  args: {
    heading: 'Description List',
    headingElement: 'h1',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Box width="550px">
      <DescriptionList {...args} trailingContent={<Link href="#">Link</Link>}>
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
          validationText="Validation text"
          validationStatus="invalid"
        />
      </DescriptionList>
    </Box>
  ),
};

/** Set direction to row or column to change how each DescriptionListItem lays out its heading and description. */
export const Directions: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => (
    <Flex width="550px" direction="column" gap="800">
      <DescriptionList
        {...args}
        heading="Row"
        direction="row"
        trailingContent={<Link href="#">Link</Link>}
      >
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
          validationText="This item is invalid"
          validationStatus="invalid"
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
      </DescriptionList>
      <DescriptionList
        {...args}
        heading="Column"
        direction="column"
        trailingContent={<Link href="#">Link</Link>}
      >
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
          validationText="This item is invalid"
          validationStatus="invalid"
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
      </DescriptionList>
    </Flex>
  ),
};

/** Set direction to a responsive object to switch layout direction across breakpoints. */
export const ResponsiveDirection: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    heading: 'Contact details',
    helperText: '',
  },
  render: args => (
    <Box width="100%" maxWidth="800px">
      <DescriptionList
        {...args}
        trailingContent={<Link href="#">Edit</Link>}
        direction={{ mobile: 'column', tablet: 'row' }}
      >
        <DescriptionListItem heading="Phone number" description="07123 456789" />
        <DescriptionListItem heading="Email address" description="design-systems@uw.co.uk" />
        <DescriptionListItem heading="Password" description="***************" />
      </DescriptionList>
    </Box>
  ),
};

/** DescriptionList sizes to the width of its content when used inside a constrained container like Card. */
export const ContentWidth: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Card>
      <Flex direction="column">
        <DescriptionList heading="We've received your order" direction="column">
          <DescriptionListItem
            heading="Your broadband monthly costs:"
            description="£33.00 a month"
          />
          <DescriptionListItem
            heading="Your new broadband service will go live on:"
            description="25/02/2026"
          />
          <DescriptionListItem
            heading="Delivery address"
            description="Hill House, 1 Little New Street, London, EC4A 3TR"
          />
        </DescriptionList>
      </Flex>
    </Card>
  ),
};

/** Use DescriptionList inside a Card, with trailingContent set to a Badge. */
export const InsideCard: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Card maxWidth="550px">
      <DescriptionList {...args} trailingContent={<Badge size="sm">Badge</Badge>} width="100%">
        <DescriptionListItem heading="Heading" description="Description" />
        <DescriptionListItem heading="Heading" description="Description" />
        <DescriptionListItem heading="Heading" description="Description" />
      </DescriptionList>
    </Card>
  ),
};
