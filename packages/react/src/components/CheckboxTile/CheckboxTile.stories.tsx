import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { Grid } from '../Grid/Grid';
import { CheckboxTile } from './CheckboxTile';
import { MoneyMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import mastercard from '../../../docs/assets/mastercard.png';
import visa from '../../../docs/assets/visa.png';

const meta: Meta<typeof CheckboxTile> = {
  title: 'Components / CheckboxTile',
  component: CheckboxTile,
  argTypes: {
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    disabled: { type: 'boolean' },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'invalid'] },
    validationText: { control: { type: 'text' } },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    validationStatus: undefined,
    validationText: 'Validation text',
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxTile>;

/**
 * Visual matrix of CheckboxTile with a label, icon, image, helper text, and
 * validation text — used for docs and Chromatic snapshot testing, not a
 * usage reference.
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
      <Grid gap="400" columns="3" alignItems="start">
        <Flex direction="column" gap="200">
          <BodyText>With label</BodyText>
          <CheckboxTile label="Label" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With icon</BodyText>
          <CheckboxTile label="Label" image={<MoneyMediumIcon />} />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label & helper text</BodyText>
          <CheckboxTile label="Label" helperText="Helper text" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label & validation text</BodyText>
          <CheckboxTile label="Label" validationStatus="invalid" validationText="Validation text" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label & helper text & validation text</BodyText>
          <CheckboxTile
            label="Label"
            helperText="Helper text"
            validationStatus="invalid"
            validationText="Validation text"
          />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With image</BodyText>
          <CheckboxTile label="Label" image={<img src={visa} width={40} alt="" />} />
        </Flex>
      </Grid>
    );
  },
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
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

/** Pass an image to display a logo or icon alongside the label, e.g. for selecting a card payment type. */
export const WithImage: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => (
    <Flex width="fit-content" gap="200" direction="column">
      <CheckboxTile
        {...args}
        label="Mastercard"
        helperText=""
        image={<img src={mastercard} width={40} height={24} alt="" />}
      />
      <CheckboxTile
        {...args}
        label="Visa"
        helperText=""
        image={<img src={visa} width={40} height={24} alt="" />}
      />
      <CheckboxTile label="Cash" image={<MoneyMediumIcon />} />
    </Flex>
  ),
};

/** Control CheckboxTile's checked state externally via checked and onCheckedChange. */
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
        <CheckboxTile
          value="1"
          label="One"
          checked={checked}
          onCheckedChange={c => setChecked(c)}
        />
      </Flex>
    );
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
      <BodyText id="consumer-description">Consumer description</BodyText>
      <CheckboxTile
        aria-labelledby="external-label"
        aria-describedby="consumer-description"
        value="external"
      />
      <CheckboxTile
        label="Invalid"
        value="invalid"
        validationStatus="invalid"
        validationText="Invalid error"
      />
      <CheckboxGroup label="Group" helperText="Group helper">
        <CheckboxTile label="Grouped" value="grouped" helperText="Own helper" />
      </CheckboxGroup>
      <CheckboxTile label="Disabled" value="disabled" disabled />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const invalid = canvas.getByRole('checkbox', { name: 'Invalid' });
    const disabled = canvas.getByRole('checkbox', { name: 'Disabled' });

    await expect(
      canvas.getByRole('checkbox', { name: 'External label' })
    ).toHaveAccessibleDescription('Consumer description');
    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAccessibleDescription('Invalid error');
    await expect(canvas.getByRole('checkbox', { name: 'Grouped' })).toHaveAccessibleDescription(
      'Group helper'
    );
    await expect(canvas.queryByText('Own helper')).not.toBeInTheDocument();
    await expect(disabled).toBeDisabled();
  },
};
