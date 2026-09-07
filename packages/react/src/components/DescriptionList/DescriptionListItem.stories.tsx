import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Link } from '../Link/Link';
import { DescriptionList } from './DescriptionList';
import { DescriptionListItem } from './DescriptionListItem';

const meta: Meta<typeof DescriptionListItem> = {
  title: 'Components / DescriptionList / DescriptionListItem',
  component: DescriptionListItem,
  argTypes: {
    heading: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
  },
  args: {
    heading: 'Heading',
    description: 'Description',
  },
};

export default meta;
type Story = StoryObj<typeof DescriptionListItem>;

export const Playground: Story = {
  render: args => (
    <Box width="550px">
      <DescriptionList heading="Description List" headingElement="h1" helperText="Helper text">
        <DescriptionListItem {...args} link={<Link href="#">Link</Link>} />
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
