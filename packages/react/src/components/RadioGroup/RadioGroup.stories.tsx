import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Box } from '../Box/Box';
import { Grid } from '../Grid/Grid';
import { Heading } from '../Heading/Heading';
import { Radio } from '../Radio/Radio';
import { RadioTile } from '../RadioTile/RadioTile';
import { RadioGroup } from './RadioGroup';
import { Flex } from '../Flex/Flex';
import { ThumbsUpSmallIcon, ThumbsDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components / RadioGroup',
  component: RadioGroup,
  argTypes: {
    direction: {
      options: ['column', 'row'],
      control: { type: 'radio' },
    },
    defaultValue: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    validationPlacement: { options: ['top', 'bottom'], control: { type: 'radio' } },
    contentWidth: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
    contentWidth: undefined,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/**
 * Visual matrix of RadioGroup — used in docs and Chromatic snapshot testing,
 * not a usage reference.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
  },
  args: {
    name: 'where-do-you-live',
    label: 'Where do you live?',
    helperText: undefined,
    validationText: undefined,
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <Flex direction="row" gap="200">
          <RadioGroup {...args}>
            <RadioTile value="england" label="England" />
            <RadioTile value="wales" label="Wales" />
            <RadioTile value="scotland" label="Scotland" />
            <RadioTile value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
          <RadioGroup {...args} disabled>
            <RadioTile value="england" label="England" />
            <RadioTile value="wales" label="Wales" />
            <RadioTile value="scotland" label="Scotland" />
            <RadioTile value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
          <RadioGroup {...args}>
            <Radio value="england" label="England" />
            <Radio value="wales" label="Wales" />
            <Radio value="scotland" label="Scotland" />
            <Radio value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
          <RadioGroup {...args} disabled>
            <Radio value="england" label="England" />
            <Radio value="wales" label="Wales" />
            <Radio value="scotland" label="Scotland" />
            <Radio value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
        </Flex>
        <RadioGroup
          {...args}
          label="Do you like living here?"
          name="do-you-like-living-here"
          direction="row"
        >
          <RadioTile value="y" label="Yes" image={<ThumbsUpSmallIcon />} />
          <RadioTile value="n" label="No" image={<ThumbsDownSmallIcon />} />
        </RadioGroup>
      </Flex>
    );
  },
};

/** Set helperText on individual RadioTile children to add extra context per option. */
export const RadioHelperText: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  args: {
    defaultValue: '3',
    helperText: undefined,
    name: 'helper-text',
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <RadioGroup {...args}>
        <RadioTile value="1" label="One" helperText="One helper text" />
        <RadioTile value="2" label="Two" helperText="Two helper text" />
        <RadioTile value="3" label="Three" helperText="Three helper text" />
      </RadioGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('radio', { name: 'Three' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: 'One' })).toHaveAccessibleDescription(
      'One helper text'
    );
  },
};

/** Set disabled on individual Radio children to disable specific options. */
export const WithDisabledRadio: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  args: {
    defaultValue: '2',
    helperText: undefined,
    name: 'disabled-radio-item',
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <RadioGroup {...args}>
        <Radio value="1" label="One" />
        <Radio value="2" label="Two" />
        <Radio value="3" label="Three" disabled />
        <Radio value="4" label="Four" />
      </RadioGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('radio', { name: 'Two' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: 'Three' })).toBeDisabled();
    await expect(canvas.getByRole('radio', { name: 'Four' })).toBeEnabled();
  },
};

/** Set disabled on individual RadioTile children to disable specific options. */
export const WithDisabledRadioTile: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    defaultValue: '2',
    helperText: undefined,
    name: 'disabled-radio-tile',
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <RadioGroup {...args}>
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Two" />
        <RadioTile value="3" label="Three" disabled />
        <RadioTile value="4" label="Four" />
      </RadioGroup>
    );
  },
};

/** Set contentWidth to constrain the width of the RadioGroup's children. */
export const ContentWidth: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { contentWidth: '200px', name: 'content-width' },
  render: args => {
    return (
      <RadioGroup {...args} helperText="Setting the width of the children elements">
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Two" />
        <RadioTile value="3" label="Three" />
      </RadioGroup>
    );
  },
};

/** Set direction to a responsive object to change layout per breakpoint. */
export const ResponsiveDirection: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { name: 'responsive-direction', direction: { mobile: 'column', tablet: 'row' } },
  render: args => {
    return (
      <RadioGroup
        {...args}
        helperText="Changing the direction of the children elements responsively"
      >
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Two" />
        <RadioTile value="3" label="Three" />
      </RadioGroup>
    );
  },
};

/** Use value and onValueChange to control the selected option yourself. */
export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  args: {
    label: 'What is your favourite animal?',
    name: 'favourite-animal',
    contentWidth: 'fit-content',
  },
  render: args => {
    const options = ['Bear', 'Koala', 'Wolf', 'Horse'];
    const [selected, setSelected] = useState(options[0]);
    return (
      <RadioGroup
        {...args}
        value={selected}
        onValueChange={setSelected}
        helperText={`Your favourite animal is a ${selected}`}
      >
        {options.map(animal => (
          <RadioTile key={animal} value={animal} label={animal} />
        ))}
      </RadioGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'What is your favourite animal?' });
    const wolf = canvas.getByRole('radio', { name: 'Wolf' });

    await expect(group).toHaveAccessibleDescription('Your favourite animal is a Bear');

    await userEvent.click(wolf);
    await expect(wolf).toBeChecked();
    await expect(group).toHaveAccessibleDescription('Your favourite animal is a Wolf');
    wolf.blur();
  },
};

/** Set validationStatus and validationText to show validation feedback for the group. */
export const Validation: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  args: {
    validationText: 'Please tell us what your favourite animal is.',
    label: 'What is your favourite animal?',
    name: 'favourite-animal',
    helperText: 'These are the best animals.',
    contentWidth: 'fit-content',
  },
  render: args => {
    const [selected, setSelected] = useState('');
    return (
      <RadioGroup
        {...args}
        value={selected}
        onValueChange={setSelected}
        validationStatus={selected ? undefined : 'invalid'}
      >
        <RadioTile value="1" label="Bear" />
        <RadioTile value="2" label="Koala" />
        <RadioTile value="3" label="Wolf" />
        <RadioTile value="4" label="Horse" />
      </RadioGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'What is your favourite animal?' });
    const koala = canvas.getByRole('radio', { name: 'Koala' });

    await expect(group).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByText('Please tell us what your favourite animal is.')
    ).toBeInTheDocument();

    await userEvent.click(koala);
    await expect(group).not.toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.queryByText('Please tell us what your favourite animal is.')
    ).not.toBeInTheDocument();
    koala.blur();
  },
};

/** Set validationPlacement to top or bottom to position the validation message. */
export const ValidationPlacement: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <RadioGroup
        label="Validation top (default)"
        validationStatus="invalid"
        validationText="Please select an option"
        validationPlacement="top"
        name="validation-placement-top"
        contentWidth="fit-content"
      >
        <RadioTile value="1" label="Bear" />
        <RadioTile value="2" label="Koala" />
        <RadioTile value="3" label="Wolf" />
      </RadioGroup>
      <RadioGroup
        label="Validation bottom"
        validationStatus="invalid"
        validationText="Please select an option"
        validationPlacement="bottom"
        name="validation-placement-bottom"
        contentWidth="fit-content"
      >
        <RadioTile value="1" label="Bear" />
        <RadioTile value="2" label="Koala" />
        <RadioTile value="3" label="Wolf" />
      </RadioGroup>
    </Flex>
  ),
};

/** Children wrap onto multiple lines by default once they no longer fit the available width. */
export const Wrap: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <Box height="800px" width="350px" padding="200">
        <RadioGroup
          {...args}
          direction="row"
          helperText="Child elements will wrap by default"
          name="wrap"
        >
          <RadioTile value="1" label="One" />
          <RadioTile value="2" label="Two" />
          <RadioTile value="3" label="Three" />
          <RadioTile value="4" label="Four" />
          <RadioTile value="5" label="Five" />
          <RadioTile value="6" label="Six" />
        </RadioGroup>
      </Box>
    );
  },
};

/** Pass a custom label node, or omit label and use aria-labelledby to reference an external heading. */
export const CustomLabel: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    label: undefined,
    helperText: undefined,
    validationText: undefined,
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <Flex gap="600" direction="column">
        <RadioGroup
          {...args}
          label={<Heading as="h2">Where do you live?</Heading>}
          name="where-do-you-live"
        >
          <RadioTile value="england" label="England" />
          <RadioTile value="wales" label="Wales" />
          <RadioTile value="scotland" label="Scotland" />
          <RadioTile value="northern-ireland" label="Northern Ireland" />
        </RadioGroup>

        <Flex direction="column" gap="100">
          <Heading as="h2" id="where-do-you-live">
            Where do you live?
          </Heading>
          <RadioGroup {...args} aria-labelledby="where-do-you-live">
            <RadioTile value="england" label="England" />
            <RadioTile value="wales" label="Wales" />
            <RadioTile value="scotland" label="Scotland" />
            <RadioTile value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
        </Flex>
      </Flex>
    );
  },
};

/** RadioGroup children can be laid out in a Grid instead of the default flex layout. */
export const WithGrid: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <RadioGroup {...args}>
        <Grid columns="3" gap="150">
          <RadioTile value="1" label="One" />
          <RadioTile value="2" label="Two" />
          <RadioTile value="3" label="Three" />
          <RadioTile value="4" label="Four" />
          <RadioTile value="5" label="Five" />
          <RadioTile value="6" label="Six" />
        </Grid>
      </RadioGroup>
    );
  },
  args: { label: 'Using grid', helperText: undefined, validationText: undefined },
};

/** Test-only: a disabled RadioGroup disables every item. */
export const DisabledGroup: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <RadioGroup label="Disabled group" disabled defaultValue="1">
      <Radio value="1" label="One" />
      <RadioTile value="2" label="Two" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('radio', { name: 'One' })).toBeDisabled();
    await expect(canvas.getByRole('radio', { name: 'Two' })).toBeDisabled();
  },
};
