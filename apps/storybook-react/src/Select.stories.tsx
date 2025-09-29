import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectItem } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Select> = {
  title: 'Stories / Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
  },
  args: {
    label: 'Select',
    helperText: 'Helper text',
    placeholder: 'Select',
    validationText: 'Validation text',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  render: args => {
    return (
      <Select {...args}>
        <SelectItem value="1">Item 1</SelectItem>
        <SelectItem value="2">Item 2</SelectItem>
        <SelectItem value="3">Item 3</SelectItem>
      </Select>
    );
  },
};

export const Dropdown: Story = {
  render: args => {
    return (
      <Select {...args}>
        <SelectItem value="1">Item 1</SelectItem>
        <SelectItem value="2">Item 2</SelectItem>
        <SelectItem value="3">Item 3</SelectItem>
        <SelectItem value="3" disabled>
          Item 4
        </SelectItem>
      </Select>
    );
  },
  args: {
    defaultValue: '2',
    open: true,
  },
};
