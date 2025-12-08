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
    validationText: 'Validation text',
    disabled: false,
    required: false,
    triggerOnlyOnType: false,
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  render: args => {
    const fruits = ['Apple', 'Banana', 'Orange'];
    return <Combobox {...args} items={fruits} />;
  },
};

export const ItemsAsChildren: Story = {
  render: args => {
    const fruits = ['Apple', 'Banana', 'Orange'];
    return (
      <Combobox {...args}>
        {fruits.map(fruit => (
          <ComboboxItem key={fruit} value={fruit}>
            {fruit}
          </ComboboxItem>
        ))}
      </Combobox>
    );
  },
};

export const ScrollArea: Story = {
  render: args => {
    return (
      <Combobox {...args}>
        {[...Array(100).keys()].map(n => (
          <ComboboxItem key={n + 1} value={`Item ${n + 1}`}>
            Item {n + 1}
          </ComboboxItem>
        ))}
      </Combobox>
    );
  },
};
