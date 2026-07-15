import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../Badge/Badge';
import { Flex } from '../Flex/Flex';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { RadioTile } from './RadioTile';
import type { RadioTileProps } from './RadioTile.props';
import { MoneyMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import mastercard from '../../../docs/assets/mastercard.png';
import visa from '../../../docs/assets/visa.png';

const meta: Meta<typeof RadioTile> = {
  title: 'Components / RadioGroup / RadioTile',
  component: RadioTile,
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
  args: {
    value: '1',
    label: 'Label',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof RadioTile>;

export const Playground: Story = {
  args: {
    value: '1',
    label: 'Radio label',
    helperText: 'Radio helper text',
  },
  render: (args: Pick<RadioTileProps, 'value' | 'label' | 'helperText'>) => {
    return (
      <Flex gap="500" direction="column">
        <RadioGroup value="2" label="Unchecked radio">
          <RadioTile {...args} />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Checked radio">
          <RadioTile {...args} />
        </RadioGroup>
      </Flex>
    );
  },
};

export const FitContent: Story = {
  args: {
    value: '1',
    helperText: '',
  },
  render: args => {
    return (
      <Flex gap="500" direction="column">
        <RadioGroup label="Do you have a meter?" direction="row">
          <RadioTile {...args} value="y" label="Yes" />
          <RadioTile {...args} value="n" label="No" />
        </RadioGroup>

        <RadioGroup label="how would you like to pay?" direction="row">
          <RadioTile {...args} value="1" label="Budget plan" flex="1" />
          <RadioTile {...args} value="2" label="Monthly in arrears" flex="1" />
        </RadioGroup>

        <RadioGroup label="how would you like to pay?" direction="row">
          <RadioTile {...args} value="1" label="Budget plan" />
          <RadioTile {...args} value="2" label="Monthly in arrears" />
        </RadioGroup>
      </Flex>
    );
  },
};

export const LongTitle: Story = {
  render: () => {
    return (
      <RadioGroup label="Select the issue you're having with your meter" contentWidth="300px">
        <RadioTile value="1" label="The display on my meter isn't working / the screen is blank" />
        <RadioTile value="2" label="My in-home display is not working" />
        <RadioTile value="3" label="Readings from my smart meter aren't showing on my bill" />
        <RadioTile value="4" label="Something else" />
      </RadioGroup>
    );
  },
};

export const WithBadge: Story = {
  render: () => (
    <RadioGroup label="With badge" contentWidth="200px">
      <RadioTile
        value="1"
        label="Label"
        helperText=""
        badge={
          <Badge size="sm" variant="subtle" colorScheme="info">
            Badge
          </Badge>
        }
      />
      <RadioTile
        value="2"
        label="Label"
        helperText="Helper text"
        badge={
          <Badge size="sm" variant="subtle" colorScheme="info">
            Badge
          </Badge>
        }
      />
    </RadioGroup>
  ),
};

export const WithImage: Story = {
  render: () => (
    <RadioGroup label="How would you like to pay?">
      <RadioTile
        value="mastercard"
        label="Mastercard"
        helperText=""
        image={<img src={mastercard} width={40} height={24} alt="" />}
      />
      <RadioTile
        value="visa"
        label="Visa"
        helperText=""
        image={<img src={visa} width={40} height={24} alt="" />}
      />
      <RadioTile value="cash" label="Cash" image={<MoneyMediumIcon />} />
    </RadioGroup>
  ),
};

export const RadioTileStoryWithOneLongLabel: Story = {
  name: 'RadioTile with one long label',
  render: () => {
    return (
      <RadioGroup label="Radio group">
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Twit Twoooooooooooooo" />
        <RadioTile value="3" label="Three" />
      </RadioGroup>
    );
  },
};

// export const RadioTileWidth: Story = {
//   render: () => {
//     return (
//       <Flex width={300}>
//         <RadioGroup
//           label="Would you like to keep an existing mobile number for this SIM?"
//           direction="row"
//           contentWidth="100%"
//         >
//           <RadioTile value="yes" label="Yes" />
//           <RadioTile value="no" label="No" />
//         </RadioGroup>
//       </Flex>
//     );
//   },
// };
