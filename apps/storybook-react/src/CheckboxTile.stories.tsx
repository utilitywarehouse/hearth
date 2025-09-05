import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxTile, Flex, BodyText } from '@utilitywarehouse/hearth-react';
import { CashbackCardMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof CheckboxTile> = {
  title: 'Stories / CheckboxTile',
  component: CheckboxTile,
  parameters: {
    docs: {
      description: {
        component:
          'The `CheckboxTile` component is a dual-state checkbox allowing users to toggle between checked and not checked. `CheckboxTile` can be used independently, however multiple checkboxes should be used within a `CheckboxGroup` to handle the state control and layout.',
      },
    },
  },
  argTypes: {
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    disabled: { type: 'boolean' },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxTile>;

export const Playground: Story = {
  render: args => (
    <Flex width="fit-content" gap="200">
      <CheckboxTile {...args} />
      <CheckboxTile {...args} image={CashbackCardMediumIcon}/>
    </Flex>
  ),
};

export const KitchenSink: Story = {
  render: () => (
    <Flex gap="400">
      <Flex direction="column" gap="200">
        <BodyText>Standalone</BodyText>
        <CheckboxTile aria-label="standalone" />
      </Flex>
      <Flex direction="column" gap="200">
        <BodyText>With label</BodyText>
        <CheckboxTile label="Label" />
      </Flex>
      <Flex direction="column" gap="200">
        <BodyText>With image</BodyText>
        <CheckboxTile label="Label" image={CashbackCardMediumIcon}/>
      </Flex>
    </Flex>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
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
