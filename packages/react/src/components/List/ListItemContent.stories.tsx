import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemContent } from './ListItemContent';

const meta: Meta<typeof ListItemContent> = {
  title: 'Components / List / ListItemContent',
  component: ListItemContent,
  argTypes: {
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
  },
  args: {
    heading: 'List item',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof ListItemContent>;

export const Playground: Story = {
  render: args => (
    <Box width="400px">
      <List heading="List">
        <ListItem>
          <ListItemContent {...args} />
        </ListItem>
      </List>
    </Box>
  ),
};
