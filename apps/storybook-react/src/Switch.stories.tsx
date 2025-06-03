import type { Meta, StoryObj } from '@storybook/react';
import { BodyText, Flex, FormFieldGroup, Switch } from '@utilitywarehouse/hearth-react';
import React, { useState } from 'react';

const sizes = ['sm', 'md'] as const;

const meta: Meta<typeof Switch> = {
  title: 'Stories / Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          '`Switch` is used to indicate switching between two opposing options. Switches allow users to turn an individual option on or off. They are usually used to activate or deactivate a specific setting.',
      },
    },
  },
  argTypes: {
    size: { options: sizes, control: { type: 'radio' } },
    checked: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
  },
  args: {
    size: 'md',
    disabled: false,
    label: 'Switch label',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: args => (
    <Flex direction="row" gap="200">
      {sizes.map(size => (
        <Switch key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  render: args => (
    <Flex direction="row" gap="200">
      <Switch {...args} />
      <Switch {...args} checked />
    </Flex>
  ),
  args: {
    disabled: true,
  },
};

export const Labelled: Story = {
  render: args => (
    <Flex direction="column" gap="600">
      <Flex direction="row" gap="200" alignItems="center">
        <BodyText as="label" htmlFor="airplane-mode">
          Airplane mode
        </BodyText>
        <Switch id="airplane-mode" {...args} />
      </Flex>
      <Switch aria-label="airplane-mode" {...args} />
    </Flex>
  ),
  args: {
    label: undefined,
    size: 'sm',
  },
};

export const ResponsiveSize: Story = {
  args: {
    size: { mobile: 'sm', desktop: 'md' },
  },
};

export const SwitchGroup: Story = {
  render: args => {
    const [value, setValue] = useState<Array<string>>(['1']);
    return (
      <FormFieldGroup
        label="Switch group"
        id="switch-group-story"
        helperText={`Switches: ${value.join(', ')}`}
      >
        {['1', '2', '3', '4'].map(num => (
          <Switch
            label={`Switch ${num}`}
            value={num}
            defaultChecked={num === '1'}
            onCheckedChange={React.useCallback(
              (checked: boolean) => {
                if (checked) {
                  setValue((prevValue = []) => [...prevValue, num]);
                }
                if (!checked) {
                  setValue((prevValue = []) => prevValue.filter(value => value !== num));
                }
              },
              [setValue]
            )}
            {...args}
          />
        ))}
      </FormFieldGroup>
    );
  },
};
