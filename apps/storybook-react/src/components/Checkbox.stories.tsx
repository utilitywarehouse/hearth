import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Flex, BodyText, Grid } from '@utilitywarehouse/hearth-react';
import { MoneyMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';

const meta: Meta<typeof Checkbox> = {
  title: 'Stories / Checkbox',
  tags: ['!test'],
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

export const Playground: Story = {
  render: args => <Checkbox {...args} />,
};

// Kitchen sink covers all variations so we don't need a Gallery story
export const KitchenSink: Story = {
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

export const WithImage: Story = {
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

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Flex direction="column" gap="400">
        <BodyText>Checked: {checked ? 'true' : 'false'}</BodyText>
        <Checkbox value="1" label="One" checked={checked} onCheckedChange={c => setChecked(c)} />
      </Flex>
    );
  },
};
