import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, ComboboxItem } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Combobox> = {
  title: 'Stories / Combobox',
  component: Combobox,
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
    label: 'Combobox',
    helperText: 'Helper text',
    // placeholder: 'Combobox',
    validationText: 'Validation text',
    disabled: false,
    required: false,
    dropdown: false,
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  render: args => {
    return (
      <Combobox {...args}>
        <ComboboxItem value="Item 1">Item 1</ComboboxItem>
        <ComboboxItem value="Item 2">Item 2</ComboboxItem>
        <ComboboxItem value="Item 3">Item 3</ComboboxItem>
      </Combobox>
    );
  },
};
