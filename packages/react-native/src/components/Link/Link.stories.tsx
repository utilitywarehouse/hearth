import React, { ComponentType } from 'react';
import { Link } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { VariantTitle } from '../../../docs/components';
import * as Icons from '../../../docs/components/icons';

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
      description: 'The text of the button.',
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
    inline: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the link to be inline.',
    },
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the button.',
    },
    inverted: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the button to be inverted. (To only be used on `purple` backgrounds)',
    },
    icon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Small'))],
      control: 'select',
      description: 'The icon component for the button.',
    },
    iconPosition: {
      options: ['left', 'right'],
      control: 'select',
      description: 'The position of the icon component in the button.',
    },
  },
  args: {
    children: 'Link',
    href: 'https://www.uw.co.uk',
    target: '_blank',
    inline: false,
    icon: 'ChervonRightSmallIcon' as unknown as ComponentType,
    disabled: false,
    inverted: false,
    iconPosition: 'right',
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
