import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'Stories / SearchInput',
  component: SearchInput,
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
