import type { Meta, StoryObj } from '@storybook/react';
import { Box, Button, Flex, SearchInput } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'Stories / SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component:
          '`SearchInput` allows users to enter a specific keyword or phrase and obtain results related to the context in which it is placed.',
      },
    },
  },
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Search',
    disabled: false,
    readOnly: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Playground: Story = {
  render: args => {
    const [value, setValue] = React.useState<string>('');
    return (
      <SearchInput
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        onClear={() => setValue('')}
        {...args}
      />
    );
  },
};

export const Loading: Story = {
  render: args => {
    const [value, setValue] = React.useState<string>('Energy');
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        onClear={() => setValue('')}
        loading
      />
    );
  },
};

export const FormUsage: Story = {
  render: args => {
    const [value, setValue] = React.useState<string>('');
    return (
      <form role="search" action="/search">
        <SearchInput
          {...args}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          onClear={() => setValue('')}
        />
      </form>
    );
  },
};

export const UsageWithButton: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <Box height="100%" width="100%" backgroundColor="warmWhite50" padding="200">
        <Flex asChild gap="50" width={{ mobile: '100%', tablet: '500px' }}>
          <form role="search" action="/search">
            <SearchInput
              label="Search"
              value={value}
              placeholder="What do you need help with?"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              onClear={() => setValue('')}
            />
            <Box display={{ mobile: 'none', tablet: 'block' }}>
              <Button variant="solid" colorScheme="yellow">
                Search
              </Button>
            </Box>
          </form>
        </Flex>
      </Box>
    );
  },
};
