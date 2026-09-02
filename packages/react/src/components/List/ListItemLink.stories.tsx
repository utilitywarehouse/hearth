import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemLink } from './ListItemLink';

const meta: Meta<typeof ListItemLink> = {
  title: 'Components / List / ListItemLink',
  component: ListItemLink,
  argTypes: {
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
  },
  args: {
    heading: 'List item as link',
    helperText: 'Helper text',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof ListItemLink>;

export const Playground: Story = {
  render: args => (
    <Box width="400px">
      <List heading="List">
        <ListItem>
          <ListItemLink {...args} />
        </ListItem>
      </List>
    </Box>
  ),
};
