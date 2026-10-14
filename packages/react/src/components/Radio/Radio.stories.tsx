import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';

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

        <RadioGroup value="2" label="Disabled unchecked radio">
          <Radio {...args} disabled />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Disabled checked radio">
          <Radio {...args} disabled />
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

/** Test-only: selection, labelling, disabled items and group helper text. */
export const Behaviour: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex gap="500" direction="column">
      <BodyText id="consumer-description">Consumer description</BodyText>
      <RadioGroup label="Group" defaultValue="1">
        <Radio value="1" label="One" helperText="One helper" />
        <Radio value="2" label="Two" aria-describedby="consumer-description" />
        <Radio value="3" label="Three" disabled />
      </RadioGroup>
      <BodyText id="external-label">External label</BodyText>
      <RadioGroup label="External group">
        <Radio value="external" aria-labelledby="external-label" />
      </RadioGroup>
      <RadioGroup label="Helper group" helperText="Group helper">
        <Radio value="grouped" label="Grouped" helperText="Own helper" />
      </RadioGroup>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const one = canvas.getByRole('radio', { name: 'One' });
    const two = canvas.getByRole('radio', { name: 'Two' });

    await expect(one).toBeChecked();
    await expect(one).toHaveAccessibleDescription('One helper');
    await expect(canvas.getByRole('radio', { name: 'Three' })).toBeDisabled();

    await expect(two).toHaveAccessibleDescription('Consumer description');

    await userEvent.click(canvas.getByText('Two'));
    await expect(two).toBeChecked();
    await expect(one).not.toBeChecked();

    await expect(canvas.getByRole('radio', { name: 'External label' })).toBeInTheDocument();
    await expect(canvas.getByRole('radio', { name: 'Grouped' })).toHaveAccessibleDescription(
      'Group helper'
    );
    await expect(canvas.queryByText('Own helper')).not.toBeInTheDocument();
    two.blur();
  },
};
