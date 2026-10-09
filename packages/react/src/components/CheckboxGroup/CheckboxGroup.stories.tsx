import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Box } from '../Box/Box';
import { CheckboxTile } from '../CheckboxTile/CheckboxTile';
import { Flex } from '../Flex/Flex';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components / CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    direction: {
      options: ['column', 'row'],
      control: { type: 'radio' },
    },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    validationPlacement: { options: ['top', 'bottom'], control: { type: 'radio' } },
    disabled: { control: { type: 'boolean' } },
    contentWidth: { control: { type: 'text' } },
  },
  args: {
    label: 'Which services do you currently have with UW?',
    defaultValue: ['1', '2'],
    direction: 'column',
    disabled: false,
    helperText: 'Select all that apply',
    validationText: 'Validation text',
    contentWidth: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

/** A group of CheckboxTiles sharing a name, label, and validation state. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
  },
  render: args => (
    <Flex asChild>
      <form>
        <CheckboxGroup {...args} name="checkbox-story">
          <CheckboxTile value="1" label="Energy" />
          <CheckboxTile value="2" label="Broadband" />
          <CheckboxTile value="3" label="Mobile" />
          <CheckboxTile value="4" label="Insurance" />
        </CheckboxGroup>
      </form>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', {
      name: 'Which services do you currently have with UW?',
    });

    await expect(group).toHaveAccessibleDescription('Select all that apply');
    await expect(within(group).getByRole('checkbox', { name: 'Energy' })).toBeChecked();
    await expect(within(group).getByRole('checkbox', { name: 'Broadband' })).toBeChecked();
    await expect(within(group).getByRole('checkbox', { name: 'Mobile' })).not.toBeChecked();
  },
};

/** Use value and onValueChange to control the checked values externally. */
export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState(['1']);
    return (
      <CheckboxGroup
        label="Controlled"
        helperText={`Checked: ${value.join(', ')}`}
        defaultValue={value}
        onValueChange={v => setValue(v)}
      >
        <CheckboxTile value="1" label="One" />
        <CheckboxTile value="2" label="Two" />
        <CheckboxTile value="3" label="Three" />
      </CheckboxGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('checkbox', { name: 'Three' }));
    await expect(canvas.getByText('Checked: 1, 3')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('checkbox', { name: 'One' }));
    await expect(canvas.getByText('Checked: 3')).toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};

/** Helper text set on individual CheckboxTiles instead of the group. */
export const CheckboxHelperText: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  name: 'Checkbox HelperText',
  args: {
    label: 'Choose music you enjoy.',
    helperText: '',
  },
  render: args => {
    return (
      <CheckboxGroup {...args}>
        <CheckboxTile value="1" label="Rap" helperText="Including Grime" />
        <CheckboxTile value="2" label="Rock" helperText="Including Heavy Metal" />
        <CheckboxTile value="3" label="Folk" helperText="Including World music" />
        <CheckboxTile value="4" label="Dance" helperText="Including House music" />
      </CheckboxGroup>
    );
  },
};

/** Use validationStatus and validationText to show a validation message driven by controlled state. */
export const Validation: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  args: {
    validationText: 'Please pick two.',
    label: 'What are your two favourite animals?',
  },
  render: args => {
    const [selected, setSelected] = useState<Array<string>>([]);
    return (
      <CheckboxGroup
        {...args}
        value={selected}
        onValueChange={setSelected}
        validationStatus={selected.length < 2 ? 'invalid' : undefined}
      >
        <CheckboxTile value="1" label="Bear" />
        <CheckboxTile value="2" label="Koala" />
        <CheckboxTile value="3" label="Wolf" />
        <CheckboxTile value="4" label="Horse" />
        <CheckboxTile value="5" label="Chicken" />
        <CheckboxTile value="6" label="Peacock" />
      </CheckboxGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'What are your two favourite animals?' });

    await expect(group).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Please pick two.')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('checkbox', { name: 'Bear' }));
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Koala' }));
    await expect(group).not.toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.queryByText('Please pick two.')).not.toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};

/** Use validationPlacement to show the validation text above or below the group. */
export const ValidationPlacement: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <CheckboxGroup
        label="Validation top (default)"
        validationStatus="invalid"
        validationText="Please select at least one option"
        validationPlacement="top"
      >
        <CheckboxTile value="1" label="Bear" />
        <CheckboxTile value="2" label="Koala" />
        <CheckboxTile value="3" label="Wolf" />
      </CheckboxGroup>
      <CheckboxGroup
        label="Validation bottom"
        validationStatus="invalid"
        validationText="Please select at least one option"
        validationPlacement="bottom"
      >
        <CheckboxTile value="1" label="Bear" />
        <CheckboxTile value="2" label="Koala" />
        <CheckboxTile value="3" label="Wolf" />
      </CheckboxGroup>
    </Flex>
  ),
};

/** Use contentWidth to set the width of the group's children independently of the group itself. */
export const ContentWidth: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  args: { contentWidth: '200px' },
  render: args => {
    return (
      <CheckboxGroup {...args} helperText="Setting the width of the children elements">
        <CheckboxTile value="1" label="One" />
        <CheckboxTile value="2" label="Two" />
        <CheckboxTile value="3" label="Three" />
      </CheckboxGroup>
    );
  },
};

/** With direction set to row, children wrap onto multiple lines once they no longer fit the available width. */
export const Wrap: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    return (
      <Box height="800px" width="350px" padding="200">
        <CheckboxGroup {...args} direction="row" helperText="Child elements will wrap by default">
          <CheckboxTile value="1" label="One" />
          <CheckboxTile value="2" label="Two" />
          <CheckboxTile value="3" label="Three" />
          <CheckboxTile value="4" label="Four" />
          <CheckboxTile value="5" label="Five" />
          <CheckboxTile value="6" label="Six" />
        </CheckboxGroup>
      </Box>
    );
  },
};

/** Test-only: a disabled CheckboxGroup disables every item. */
export const DisabledGroup: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <CheckboxGroup label="Disabled group" disabled defaultValue={['1']}>
      <CheckboxTile value="1" label="One" />
      <CheckboxTile value="2" label="Two" />
    </CheckboxGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const two = canvas.getByRole('checkbox', { name: 'Two' });

    await expect(canvas.getByRole('checkbox', { name: 'One' })).toBeDisabled();
    await expect(two).toBeDisabled();

    await userEvent.click(two, { pointerEventsCheck: 0 });
    await expect(two).not.toBeChecked();
  },
};
