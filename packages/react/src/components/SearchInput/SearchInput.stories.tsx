import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
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

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox', { name: /^Search/ });

    await expect(canvas.queryByRole('button', { name: 'clear search' })).not.toBeInTheDocument();

    await userEvent.type(input, 'gas');
    const clear = canvas.getByRole('button', { name: 'clear search' });

    await userEvent.click(clear);
    await expect(input).toHaveValue('');
    await expect(input).toHaveFocus();
    await expect(canvas.queryByRole('button', { name: 'clear search' })).not.toBeInTheDocument();
    input.blur();
  },
};

/** Set loading to show a spinner and disable input interaction while results are fetched. */
export const Loading: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
    controls: { disable: true },
  },
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

/** Use SearchInput inside a form with role="search" for semantic search forms. */
export const FormUsage: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
    controls: { disable: true },
  },
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

/** Pair SearchInput with a Button for a combined search bar and submit action. */
export const UsageWithButton: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
    controls: { disable: true },
  },
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

/** Test-only: no clear button without onClear, and a disabled clear button doesn't clear. */
export const ClearButton: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState<string>('Energy');
    return (
      <Flex direction="column" gap="400">
        <SearchInput label="No onClear" value="Broadband" onChange={() => {}} />
        <SearchInput
          label="Disabled"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          onClear={() => setValue('')}
          disabled
        />
      </Flex>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearButtons = canvas.getAllByRole('button', { name: 'clear search' });

    await expect(clearButtons).toHaveLength(1);
    await expect(clearButtons[0]).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(clearButtons[0]!);
    await expect(canvas.getByRole('searchbox', { name: /^Disabled/ })).toHaveValue('Energy');
  },
};
