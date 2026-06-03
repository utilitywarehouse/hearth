import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Link } from '../Link/Link';
import { DescriptionList } from './DescriptionList';
import { DescriptionListItem } from './DescriptionListItem';
import { fn } from '@storybook/test';

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

export const Playground: Story = {
  render: args => (
    <Box width="550px">
      <DescriptionList {...args} trailingContent={<Link href="#">Link</Link>}>
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link
              href="#"
              onClick={fn} // <-- Automatically injects a spy that stops execution bugs
            >
              Link
            </Link>
          }
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
          validationText="Validation text"
          validationStatus="invalid"
        />
      </DescriptionList>
    </Box>
  ),
};

export const Directions: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: args => (
    <Flex width="550px" direction="column" gap="800">
      <DescriptionList
        {...args}
        heading="Row"
        direction="row"
        trailingContent={
          <Link href="#" onClick={fn}>
            Link
          </Link>
        }
      >
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
          validationText="This item is invalid"
          validationStatus="invalid"
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
      </DescriptionList>
      <DescriptionList
        {...args}
        heading="Column"
        direction="column"
        trailingContent={
          <Link href="#" onClick={fn}>
            Link
          </Link>
        }
      >
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
          validationText="This item is invalid"
          validationStatus="invalid"
        />
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={
            <Link href="#" onClick={fn}>
              Link
            </Link>
          }
        />
      </DescriptionList>
    </Flex>
  ),
};

export const ResponsiveDirection: Story = {
  args: {
    heading: 'Contact details',
    helperText: '',
  },
  render: args => (
    <Box width="100%" maxWidth="800px">
      <DescriptionList
        {...args}
        trailingContent={
          <Link href="#" onClick={fn}>
            Edit
          </Link>
        }
        direction={{ mobile: 'column', tablet: 'row' }}
      >
        <DescriptionListItem heading="Phone number" description="07123 456789" />
        <DescriptionListItem heading="Email address" description="emailname@uw.co.uk" />
        <DescriptionListItem heading="Password" description="***************" />
      </DescriptionList>
    </Box>
  ),
};

export const ContentWidth: Story = {
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

export const InsideCard: Story = {
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
