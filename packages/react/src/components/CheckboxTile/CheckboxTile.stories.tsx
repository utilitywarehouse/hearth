import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Playground: Story = {
  render: args => <CheckboxTile {...args} />,
};

// Kitchen sink covers all variations so we don't need a Gallery story
export const KitchenSink: Story = {
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

export const WithImage: Story = {
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

export const Controlled: Story = {
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
