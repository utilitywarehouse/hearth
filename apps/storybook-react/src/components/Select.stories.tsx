import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectItem } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Select> = {
  title: 'Stories / Select',
  component: Select,
  argTypes: {
    label: { control: { type: 'text' } },
    labelVariant: { control: { type: 'radio' }, options: ['body', 'heading'] },
    helperText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
  },
  args: {
    label: 'Select',
    labelVariant: 'body',
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
  parameters: { chromatic: { disableSnapshot: false } },
  args: { defaultOpen: true, defaultValue: '2' },
  render: args => {
    return (
      <Select {...args}>
        <SelectItem value="1">Item 1</SelectItem>
        <SelectItem value="2">Item 2</SelectItem>
        <SelectItem value="3">Item 3</SelectItem>
        <SelectItem value="4" disabled>
          Item 4
        </SelectItem>
      </Select>
    );
  },
};

export const ScrollArea: Story = {
  render: args => {
    return (
      <Select {...args}>
        {[...Array(100).keys()].map(n => (
          <SelectItem key={n + 1} value={`${n + 1}`}>
            Item {n + 1}
          </SelectItem>
        ))}
      </Select>
    );
  },
};

export const Truncate: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  args: { defaultOpen: true, defaultValue: '2' },
  render: args => {
    return (
      <Select {...args}>
        <SelectItem value="1">
          1 Riverside Cottage, Shepherds Way, Longvillagename, Picturesqueville,
          Wordyvocabularyshire, PP11 1AB
        </SelectItem>
        <SelectItem value="2">
          2 Riverside Cottage, Shepherds Way, Longvillagename, Picturesqueville,
          Wordyvocabularyshire, PP11 1AB
        </SelectItem>
        <SelectItem value="3">
          3 Riverside Cottage, Shepherds Way, Longvillagename, Picturesqueville,
          Wordyvocabularyshire, PP11 1AB
        </SelectItem>
        <SelectItem value="4">
          4 Riverside Cottage, Shepherds Way, Longvillagename, Picturesqueville,
          Wordyvocabularyshire, PP11 1AB
        </SelectItem>
      </Select>
    );
  },
};
