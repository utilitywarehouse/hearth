import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxTile, Flex, BodyText } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof CheckboxTile> = {
  title: 'Stories / CheckboxTile',
  component: CheckboxTile,
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

export const Workshop: Story = {
  render: args => (
    <Flex width="fit-content">
      <CheckboxTile {...args} />
    </Flex>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Flex direction="column" gap="400" width="fit-content">
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
