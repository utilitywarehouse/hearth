import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { Grid } from '../Grid/Grid';
import { Checkbox } from './Checkbox';
import { MoneyMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import mastercard from '../../../docs/assets/mastercard.png';
import visa from '../../../docs/assets/visa.png';

const meta: Meta<typeof Checkbox> = {
  title: 'Components / Checkbox',
  component: Checkbox,
  argTypes: {
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    disabled: { type: 'boolean' },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'invalid'] },
    validationText: { control: { type: 'text' } },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    value: '1',
    validationStatus: undefined,
    validationText: 'Validation text',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Visual matrix of Checkbox states — used in docs and Chromatic snapshot testing.
 * Not a usage reference.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    return (
      <Grid gap="400" columns="3">
        <Flex direction="column" gap="200">
          <BodyText>Standalone</BodyText>
          <Checkbox aria-label="standalone" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label</BodyText>
          <Checkbox label="Label" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label & helper text</BodyText>
          <Checkbox label="Label" helperText="Helper text" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label & validation text</BodyText>
          <Checkbox label="Label" validationStatus="invalid" validationText="Validation text" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label & helper text & validation text</BodyText>
          <Checkbox
            label="Label"
            helperText="Helper text"
            validationStatus="invalid"
            validationText="Validation text"
          />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With icon</BodyText>
          <Checkbox label="Label" image={<MoneyMediumIcon />} />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With image</BodyText>
          <Checkbox label="Label" image={<img src={visa} width={40} alt="" />} />
        </Flex>
      </Grid>
    );
  },
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: { actions: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Label' });

    await expect(checkbox).toHaveAccessibleDescription('Helper text');
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    await userEvent.click(canvas.getByText('Label'));
    await expect(checkbox).not.toBeChecked();
    checkbox.blur();
  },
};

/** Use image to show an icon or image between the check indicator and label. */
export const WithImage: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => (
    <Flex width="fit-content" gap="200" direction="column">
      <Checkbox
        {...args}
        label="Mastercard"
        helperText=""
        image={<img src={mastercard} width={40} alt="" />}
      />
      <Checkbox {...args} label="Visa" helperText="" image={<img src={visa} width={40} alt="" />} />
      <Checkbox label="Cash" image={<MoneyMediumIcon />} />
    </Flex>
  ),
};

/** Use checked and onCheckedChange to control the checked state externally. */
export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Flex direction="column" gap="400">
        <BodyText>Checked: {checked ? 'true' : 'false'}</BodyText>
        <Checkbox value="1" label="One" checked={checked} onCheckedChange={c => setChecked(c)} />
      </Flex>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'One' });

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(canvas.getByText('Checked: true')).toBeInTheDocument();

    await userEvent.click(checkbox);
    await expect(canvas.getByText('Checked: false')).toBeInTheDocument();
    checkbox.blur();
  },
};

/** Test-only: labelling, validation and group helper text wiring. */
export const Labelling: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <BodyText id="external-label">External label</BodyText>
      <Checkbox aria-labelledby="external-label" value="external" />
      <Checkbox
        label="Invalid"
        value="invalid"
        validationStatus="invalid"
        validationText="Invalid error"
      />
      <CheckboxGroup label="Group" helperText="Group helper">
        <Checkbox label="Grouped" value="grouped" helperText="Own helper" />
      </CheckboxGroup>
      <Checkbox label="Disabled" value="disabled" disabled />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const invalid = canvas.getByRole('checkbox', { name: 'Invalid' });
    const disabled = canvas.getByRole('checkbox', { name: 'Disabled' });

    await expect(canvas.getByRole('checkbox', { name: 'External label' })).toBeInTheDocument();
    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAccessibleDescription('Invalid error');
    await expect(canvas.getByRole('checkbox', { name: 'Grouped' })).toHaveAccessibleDescription(
      'Group helper'
    );
    await expect(canvas.queryByText('Own helper')).not.toBeInTheDocument();
    await expect(disabled).toBeDisabled();
  },
};
