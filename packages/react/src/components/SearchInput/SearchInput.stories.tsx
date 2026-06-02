import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { SearchInput } from './SearchInput';
import { useState, ChangeEvent } from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'Components / SearchInput',
  component: SearchInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    hideLabel: { control: { type: 'boolean' } },
    helperText: { control: { type: 'text' } },
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
    const [value, setValue] = useState<string>('');
    return (
      <SearchInput
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        onClear={() => setValue('')}
        id="search-input-playground"
        {...args}
      />
    );
  },
};

export const Loading: Story = {
  render: args => {
    const [value, setValue] = useState<string>('Energy');
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        onClear={() => setValue('')}
        loading
      />
    );
  },
};

export const FormUsage: Story = {
  render: args => {
    const [value, setValue] = useState<string>('');
    return (
      <form role="search" action="/search">
        <SearchInput
          {...args}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          onClear={() => setValue('')}
        />
      </form>
    );
  },
};

export const UsageWithButton: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <Box height="100%" width="100%" backgroundColor="primary" padding="200">
        <Flex asChild gap="50" width={{ mobile: '100%', tablet: '500px' }}>
          <form role="search" action="/search">
            <SearchInput
              label="Search"
              value={value}
              placeholder="What do you need help with?"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
              onClear={() => setValue('')}
            />
            <Box display={{ mobile: 'none', tablet: 'block' }}>
              <Button variant="solid" colorScheme="highlight">
                Search
              </Button>
            </Box>
          </form>
        </Flex>
      </Box>
    );
  },
};
