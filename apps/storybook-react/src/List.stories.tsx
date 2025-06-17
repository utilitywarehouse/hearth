import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Flex,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemLink,
} from '@utilitywarehouse/hearth-react';
import { InfoMediumIcon, SettingsMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof List> = {
  title: 'Stories / List',
  component: List,
  parameters: {
    docs: {
      description: {
        component:
          'The `List` component is a flexible and customizable component for displaying a list of items. It supports various visual variants, color schemes, and additional features like helper text and links.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [undefined, 'subtle', 'emphasis'],
    },
    as: {
      control: { type: 'radio' },
      options: ['ul', 'ol'],
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
    <Box width="300px">
      <List {...args} headingElement="h1">
        <ListItem>List item</ListItem>
        <ListItem>
          <ListItemText helperText="Helper text">List item</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText leadingIcon={<InfoMediumIcon />} helperText="Helper text">
            List item
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemButton
            helperText="Helper text"
            leadingIcon={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          >
            List item as button
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton helperText="Helper text" onClick={() => console.log('clickety click')}>
            List item as button
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => console.log('clickety click')}>
            List item as button
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemLink helperText="Helper text" leadingIcon={<SettingsMediumIcon />} href="#">
            List item as link
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink helperText="Helper text" href="#">
            List item as link
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#">List item as link</ListItemLink>
        </ListItem>
      </List>
    </Box>
  ),
  args: {
    variant: 'subtle',
    colorScheme: 'warmWhite',
    linkText: 'View all',
    linkHref: '#',
  },
};

export const KitchenSink: Story = {
  render: args => (
    <Flex direction="column" gap="600">
      <Box width="300px">
        <List {...args}>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
        </List>
      </Box>
      {(['subtle', 'emphasis'] as const).map(variant => (
        <Flex gap="400">
          {(['white', 'warmWhite'] as const).map(colorScheme => (
            <Box width="300px">
              <List
                {...args}
                key={`${variant}${colorScheme}`}
                variant={variant}
                colorScheme={colorScheme}
              >
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
              </List>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const ListItemTexts: Story = {
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemText leadingIcon={<SettingsMediumIcon />} helperText="Helper text">
            List item text
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText leadingIcon={<SettingsMediumIcon />} helperText="Helper text">
            List item text
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText leadingIcon={<SettingsMediumIcon />} helperText="Helper text">
            List item text
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  ),
  args: { variant: 'emphasis', colorScheme: 'warmWhite' },
};

export const ListItemButtons: Story = {
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemButton>List item button</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>List item button</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>List item button</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>List item button</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>List item button</ListItemButton>
        </ListItem>
      </List>
    </Box>
  ),
  args: { variant: 'emphasis', colorScheme: 'warmWhite' },
};

export const ListItemLinks: Story = {
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemLink>List item link</ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink>List item link</ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink>List item link</ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink>List item link</ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink>List item link</ListItemLink>
        </ListItem>
      </List>
    </Box>
  ),
  args: { variant: 'emphasis', colorScheme: 'warmWhite' },
};
