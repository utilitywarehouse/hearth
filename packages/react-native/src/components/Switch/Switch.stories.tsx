import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import { Switch } from '.';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'boolean',
      description: 'Use this value to set the Switch value.',
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Use this value to set the Switch size.',
    },
    disabled: {
      control: 'boolean',
      description: 'Use this value to disable the Switch.',
    },
  },
  args: {
    value: false,
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ value, ...args }) => {
    const [toggled, setToggled] = React.useState(value);
    const handleToggle = () => {
      setToggled(prev => !prev);
    };
    useEffect(() => {
      setToggled(value);
    }, [value]);
    return <Switch {...args} value={toggled} onValueChange={handleToggle} />;
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" spacing="sm">
      <VariantTitle title="Off - medium">
        <Switch value={false} />
      </VariantTitle>
      <VariantTitle title="On - medium">
        <Switch value={true} />
      </VariantTitle>
      <VariantTitle title="Off - medium - Disabled">
        <Switch value={false} disabled />
      </VariantTitle>
      <VariantTitle title="On - medium - Disabled">
        <Switch value={true} disabled />
      </VariantTitle>
      <VariantTitle title="Off - small">
        <Switch value={false} size="sm" />
      </VariantTitle>
      <VariantTitle title="On - small">
        <Switch value={true} size="sm" />
      </VariantTitle>
      <VariantTitle title="Off - small - Disabled">
        <Switch value={false} size="sm" disabled />
      </VariantTitle>
      <VariantTitle title="On - small - Disabled">
        <Switch value={true} size="sm" disabled />
      </VariantTitle>
    </Flex>
  ),
};
