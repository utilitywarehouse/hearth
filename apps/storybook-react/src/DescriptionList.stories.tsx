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
    <Box width="400px">
      <DescriptionList
        {...args}
        link={
          <Link href="#">
            Link
            <ChevronRightSmallIcon />
          </Link>
        }
      >
        <DescriptionListItem
          heading="Heading"
          description="Description"
          link={<Link href="#">Link</Link>}
        />
      </DescriptionList>
    </Box>
  ),
};
