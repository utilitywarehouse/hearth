import React, { ComponentType } from 'react';
import { Link } from '.';
import { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';

const meta = {
  title: 'Stories / Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
      description: 'The text of the link.',
    },
    href: {
      type: 'string',
      control: 'text',
      description: 'The URL the link will navigate to.',
    },
    target: {
      options: ['_blank', '_self', '_parent', '_top'],
      control: 'select',
      description: 'The target of the link.',
    },
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the link.',
    },
    inverted: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the link to be inverted. (To only be used on `purple` backgrounds)',
    },
    icon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Small'))],
      control: 'select',
      description: 'The icon component for the link.',
    },
    iconPosition: {
      options: ['left', 'right'],
      control: 'select',
      description: 'The position of the icon component in the link.',
    },
    showIcon: {
      type: 'boolean',
      control: 'boolean',
      description: 'To show or hide the icon component in the link.',
    },
  },
  args: {
    children: 'Link',
    href: 'https://www.uw.co.uk',
    target: '_blank',
    icon: 'ChervonRightSmallIcon' as unknown as ComponentType,
    iconPosition: 'right',
    showIcon: true,
    disabled: false,
    inverted: false,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ icon: _icon, ...args }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return <Link {...args} icon={icon} />;
  },
};
