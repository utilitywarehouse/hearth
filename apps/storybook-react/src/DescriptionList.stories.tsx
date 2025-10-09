import type { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptionList, DescriptionListItem, Box, Link } from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof DescriptionList> = {
  title: 'Stories / DescriptionList',
  component: DescriptionList,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `DescriptionList` component when you need to present pairs of related information together.',
      },
    },
  },
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
      <DescriptionList {...args} link={<Link href="#">Link</Link>}>
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

export const ResponsiveDirection: Story = {
  render: args => (
    <Box width="100%" maxWidth="800px">
      <DescriptionList
        {...args}
        link={<Link href="#">Edit</Link>}
        direction={{ mobile: 'column', tablet: 'row' }}
      >
        <DescriptionListItem heading="Phone number" description="07123 456789" />
        <DescriptionListItem heading="Email address" description="emailname@uw.co.uk" />
        <DescriptionListItem heading="Password" description="***************" />
      </DescriptionList>
    </Box>
  ),
  args: {
    heading: 'Contact details',
    helperText: '',
  },
};
