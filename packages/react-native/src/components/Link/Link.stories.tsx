import React, { ComponentType } from 'react';
import { Link } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { expect, within } from 'storybook/test';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: 'Link' });

    // On web, Link (built on `createLink` from `@gluestack-ui/link`) renders as
    // a real anchor when `href` is set and the link is enabled - not just an
    // element with `role="link"`.
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://www.uw.co.uk');
    expect(link).toHaveAttribute('tabindex', '0');
    expect(link).not.toHaveAttribute('aria-disabled');

    // The story's default `target` is `_blank`. `@gluestack-ui/link`'s
    // `useLink` hook sets `target`/`rel` on the underlying DOM node
    // imperatively via a ref mutation during render rather than passing them
    // as props, so they never reliably land as DOM attributes - see
    // UWDS-4909. Link now passes `target`/`rel` through explicitly as props
    // (converted to react-native-web's `hrefAttrs`) instead of relying on
    // gluestack's ref mutation, so both are applied here, including the
    // `rel="noopener noreferrer"` default that guards against reverse
    // tabnabbing on `target="_blank"` links.
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ icon: _icon, ...args }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return <Link {...args} icon={icon} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: 'Link' });

    // When disabled, `href` is stripped (`react-native-web`'s `View` only
    // renders as an `<a>` when `href` is non-null), so the element falls back
    // to a plain `<div role="link">` rather than a real anchor.
    expect(link.tagName).not.toBe('A');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
  },
};
