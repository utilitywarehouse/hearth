import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Flex, BodyText } from '@utilitywarehouse/hearth-react';
import { CashbackCardMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Checkbox> = {
  title: 'Stories / Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'The `Checkbox` component is a dual-state checkbox allowing users to toggle between checked and not checked. `Checkbox` can be used independently, however multiple checkboxes should be used within a `CheckboxGroup` to handle the state control and layout.',
      },
    },
  },
  argTypes: {
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    disabled: { type: 'boolean' },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    value: '1',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  render: args => (
    <Flex width="fit-content" gap="200">
      <Checkbox {...args} />
      <Checkbox {...args} image={<CashbackCardMediumIcon />} />
    </Flex>
  ),
};

export const KitchenSink: Story = {
  render: () => {
    const MyImage = <img src="https://help.uw.co.uk/images/iPhone.svg" width={25} />
    return (
      <Flex gap="400">
        <Flex direction="column" gap="200">
          <BodyText>Standalone</BodyText>
          <Checkbox aria-label="standalone" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With label</BodyText>
          <Checkbox label="Label" />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With icon</BodyText>
          <Checkbox label="Label" image={<CashbackCardMediumIcon />} />
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText>With image</BodyText>
          <Checkbox label="Label" image={MyImage} />
        </Flex>
      </Flex>
    );
  },
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
