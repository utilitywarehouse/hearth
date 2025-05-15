import type { Meta, StoryObj } from '@storybook/react';
import { Box, List, ListItem, ListItemButton, ListItemLink } from '@utilitywarehouse/hearth-react';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof List> = {
  title: 'Stories / List',
  component: List,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [undefined, 'subtle', 'emphasis'],
    },
    colorScheme: {
      control: { type: 'radio' },
      options: [undefined, 'white', 'warmWhite'],
    },
    headingElement: {
      control: { type: 'radio' },
      options: ['div', 'h1', 'h2', 'h3', 'h4'],
    },
    linkText: { control: { type: 'text' } },
    linkHref: { control: { type: 'text' } },
  },
  args: {
    heading: 'List',
    helperText: 'Helper text',
    variant: undefined,
    colorScheme: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Playground: Story = {
  render: args => (

      <List {...args}>
          <ListItem leadingIcon={<SettingsMediumIcon />} helperText="Helper text">
              List item
          </ListItem>
          <ListItem helperText="Helper text">List item</ListItem>
          <ListItem helperText="Helper text">List item</ListItem>
          <ListItem helperText="Helper text" leadingIcon={<SettingsMediumIcon />}>
              <ListItemButton onClick={() => console.log('clickety click')}>
                  List item as button
              </ListItemButton>
          </ListItem>
          <ListItem helperText="Helper text" leadingIcon={<SettingsMediumIcon />}>
              <ListItemLink href="#">List item as link</ListItemLink>
          </ListItem>
      </List>

  ),
};
