import type { Meta, StoryObj } from '@storybook/react-vite';

import { Flex } from '../Flex/Flex';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { Radio } from './Radio';
import type { RadioProps } from './Radio.props';
import { BillMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import visa from '../../../docs/assets/visa.png';

const meta: Meta<typeof Radio> = {
  title: 'Components / RadioGroup / Radio',
  component: Radio,
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/** Interactive sandbox — use the controls panel to explore all props, including an icon and an image. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    value: '1',
    label: 'Radio label',
    helperText: 'Radio helper text',
  },
  tags: ['!test'],
  render: (args: Pick<RadioProps, 'value' | 'label' | 'helperText'>) => {
    return (
      <Flex gap="500" direction="column">
        <RadioGroup value="2" label="Unchecked radio">
          <Radio {...args} />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Checked radio">
          <Radio {...args} />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="With icon">
          <Radio {...args} image={<BillMediumIcon />} />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="With image">
          <Radio {...args} image={<img src={visa} width={40} alt="" />} />
        </RadioGroup>
      </Flex>
    );
  },
};
