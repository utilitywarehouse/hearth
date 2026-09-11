import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import { SelectItem } from './SelectItem';

const meta: Meta<typeof Select> = {
  title: 'Components / Select',
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

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
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

/** Set defaultOpen to render the Select with its options already visible. */
export const DefaultOpen: Story = {
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

/** A large number of SelectItems scrolls within the option list rather than overflowing the viewport. */
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

/** Long SelectItem text truncates within the trigger and option list rather than wrapping. */
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
