import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Flex } from '../Flex/Flex';
import { TextInput } from '../TextInput/TextInput';
import { TextArea } from './TextArea';
import { useState, ChangeEvent } from 'react';

const meta: Meta<typeof TextArea> = {
  title: 'Components / TextArea',
  component: TextArea,
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    placeholder: { control: { type: 'text' } },
    rows: { control: { type: 'number' } },
    resize: { control: { type: 'radio' }, options: ['none', 'horizontal', 'vertical', 'both'] },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
    placeholder: 'Enter your text here...',
    rows: 3,
    cols: 40,
    resize: 'both',
    disabled: false,
    readOnly: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

/** Visual matrix of TextArea variants — used in docs and Chromatic snapshot testing. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex gap="400" direction="column">
      <TextArea {...args} />
      <TextArea {...args} label="Disabled" disabled helperText="This field is disabled." />
      <TextArea
        {...args}
        label="Read-only"
        readOnly
        value="This is a read-only text area."
        helperText="This field is read-only."
      />
      <TextArea
        {...args}
        label="Valid TextArea"
        validationStatus="valid"
        validationText="Looks good!"
        value="This is valid input."
      />
      <TextArea
        {...args}
        label="Invalid TextArea"
        validationStatus="invalid"
        validationText="Please correct the error."
        value="This is invalid input."
      />
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
  render: args => <TextArea {...args} />,
  play: async ({ canvasElement }) => {
    const textarea = within(canvasElement).getByRole('textbox', { name: /^Label/ });

    await expect(textarea).toHaveAccessibleDescription('Helper text');
    await expect(textarea).toHaveAttribute('rows', '3');

    await userEvent.type(textarea, 'line one{Enter}line two');
    await expect(textarea).toHaveValue('line one\nline two');
    textarea.blur();
  },
};

/** Use minHeight and maxHeight to constrain the resizable range. */
export const Height: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { minHeight: '200px', maxHeight: '400px' },
  render: args => <TextArea {...args} />,
};

/** Set disabled or readOnly to prevent the TextArea from being edited. */
export const DisabledAndReadOnly: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { helperText: undefined },
  render: args => (
    <Flex direction="column" gap="400">
      <TextArea {...args} label="Disabled" disabled helperText="This field is disabled." />
      <TextArea
        {...args}
        label="Read-only"
        readOnly
        value="This is a read-only text area."
        helperText="This field is read-only."
      />
    </Flex>
  ),
};

/** Set validationStatus and validationText to show valid or invalid feedback. */
export const Validation: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => (
    <Flex direction="column" gap="400">
      <TextArea
        {...args}
        label="Valid TextArea"
        validationStatus="valid"
        validationText="Looks good!"
        value="This is valid input."
      />
      <TextArea
        {...args}
        label="Invalid TextArea"
        validationStatus="invalid"
        validationText="Please correct the error."
        value="This is invalid input."
      />
    </Flex>
  ),
  args: { helperText: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const valid = canvas.getByRole('textbox', { name: /^Valid TextArea/ });
    const invalid = canvas.getByRole('textbox', { name: /^Invalid TextArea/ });

    await expect(valid).not.toHaveAttribute('aria-invalid');
    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAccessibleDescription('Please correct the error.');
  },
};

/** Use rows to set the TextArea's initial visible height in text rows. */
export const CustomRows: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex direction="column" gap="400">
      <TextArea {...args} label="3 Rows" rows={3} />
      <TextArea {...args} label="5 Rows" rows={5} />
      <TextArea {...args} label="10 Rows" rows={10} />
    </Flex>
  ),
};

/** Control the value with value and onChange for a controlled TextArea. */
export const Controlled: Story = {
  tags: ['!test'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    const [value, setValue] = useState<string>('Initial value');
    return (
      <TextArea
        {...args}
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
        label="Controlled TextArea"
      />
    );
  },
};

/** TextArea alongside TextInput in a typical form layout. */
export const WithTextInput: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <TextInput label="Text input" />
      <TextArea label="Text area" />
    </Flex>
  ),
};

/** Test-only: a disabled or read-only TextArea isn't marked invalid while its validation text is hidden. */
export const HiddenValidationNotInvalid: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <TextArea
        label="Disabled invalid"
        disabled
        validationStatus="invalid"
        validationText="Disabled error"
      />
      <TextArea
        label="Read-only invalid"
        readOnly
        validationStatus="invalid"
        validationText="Read-only error"
      />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const name of [/^Disabled invalid/, /^Read-only invalid/]) {
      const field = canvas.getByRole('textbox', { name });
      await expect(field).not.toHaveAttribute('aria-invalid');
      await expect(field).not.toHaveAttribute('aria-errormessage');
    }
    await expect(canvas.queryByText('Disabled error')).not.toBeInTheDocument();
    await expect(canvas.queryByText('Read-only error')).not.toBeInTheDocument();
  },
};

/** Test-only: no ARIA references to validation text that isn't rendered. */
export const ValidationWithoutText: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <TextArea label="Status only" validationStatus="invalid" />
      <TextArea label="Text only" validationText="Unused text" />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [statusOnly, textOnly] = [/^Status only/, /^Text only/].map(name =>
      canvas.getByRole('textbox', { name })
    );

    await expect(statusOnly).toHaveAttribute('aria-invalid', 'true');
    await expect(statusOnly).not.toHaveAttribute('aria-errormessage');
    await expect(textOnly).not.toHaveAttribute('aria-describedby');
    await expect(canvas.queryByText('Unused text')).not.toBeInTheDocument();
  },
};
