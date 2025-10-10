import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Menu, MenuTrigger, MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Menu> = {
  title: 'Stories / Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `Menu` component to present a short list of actions or options in response to a user’s interaction. Menus are ideal for actions like sorting, filtering, or providing additional options without navigating away from the current screen.',
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Playground: Story = {
  render: args => {
    return (
      <Menu {...args}>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Menu
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

// export const Dropdown: Story = {
//   render: args => {
//     return (
//       <Select {...args}>
//         <SelectItem value="1">Item 1</SelectItem>
//         <SelectItem value="2">Item 2</SelectItem>
//         <SelectItem value="3">Item 3</SelectItem>
//         <SelectItem value="4" disabled>
//           Item 4
//         </SelectItem>
//       </Select>
//     );
//   },
//   args: {
//     defaultValue: '2',
//     open: true,
//   },
// };
