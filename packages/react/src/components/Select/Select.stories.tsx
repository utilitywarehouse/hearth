import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { Flex } from '../Flex/Flex';
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
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', { name: /^Select/ });

    await expect(trigger).toHaveTextContent('Select');
    await expect(canvas.getByText('(optional)')).toBeInTheDocument();
    await expect(trigger).toHaveAccessibleDescription('Helper text');
  },
};

/** Set defaultOpen to render the Select with its options already visible. */
export const DefaultOpen: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  args: { defaultOpen: true, defaultValue: '2' },
  play: async () => {
    const listbox = await screen.findByRole('listbox');

    await expect(within(listbox).getByRole('option', { name: 'Item 2' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await expect(within(listbox).getByRole('option', { name: 'Item 4' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  },
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
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('option', { name: 'Item 3' }));

    await expect(trigger).toHaveTextContent('Item 3');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    trigger.blur();
  },
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
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Test-only: a disabled Select suppresses its validation text. */
export const DisabledHidesValidation: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <Select label="Invalid select" validationStatus="invalid" validationText="Invalid error">
        <SelectItem value="1">Item 1</SelectItem>
      </Select>
      <Select
        label="Disabled select"
        validationStatus="invalid"
        validationText="Disabled error"
        disabled
      >
        <SelectItem value="1">Item 1</SelectItem>
      </Select>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const invalid = canvas.getByRole('combobox', { name: /^Invalid select/ });
    const disabled = canvas.getByRole('combobox', { name: /^Disabled select/ });

    await expect(canvas.getByText('Invalid error')).toBeInTheDocument();
    await expect(canvas.queryByText('Disabled error')).not.toBeInTheDocument();
    await expect(disabled).toBeDisabled();
    await expect(invalid).toBeEnabled();
    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAccessibleDescription('Invalid error');
    await expect(disabled).not.toHaveAttribute('aria-invalid');
  },
};

/** Test-only: a consumer's aria-describedby is kept alongside the helper text. */
export const ConsumerDescribedBy: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <p id="select-external-description">External description</p>
      <Select
        label="Described select"
        helperText="Helper text"
        aria-describedby="select-external-description"
      >
        <SelectItem value="1">Item 1</SelectItem>
      </Select>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('combobox', { name: /^Described select/ });

    await expect(trigger).toHaveAccessibleDescription('External description Helper text');
  },
};
