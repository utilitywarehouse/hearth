import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { InlineLink } from '.';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { List } from '../List';

const meta = {
  title: 'Stories / InlineLink',
  component: InlineLink,
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
  },
  args: {
    children: 'embedded link',
    href: 'https://www.uw.co.uk',
    target: '_blank',
    disabled: false,
    inverted: false,
  },
} satisfies Meta<typeof InlineLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: 'embedded link' });

    // On web, InlineLink (built on `createLink` from `@gluestack-ui/link`,
    // rendering through a `Text` root rather than `Pressable`) also renders as
    // a real anchor when `href` is set and the link is enabled.
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://www.uw.co.uk');
    expect(link).toHaveAttribute('tabindex', '0');
    expect(link).not.toHaveAttribute('aria-disabled');

    // Baseline finding (not a bug fix - characterizing current behaviour
    // only): same gap as Link - the story's default `target` of `_blank`
    // never lands as a DOM attribute because `@gluestack-ui/link`'s `useLink`
    // hook sets `target`/`rel` imperatively via a ref mutation during render.
    // See UWDS-4909 for tracked aria/attribute gaps.
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: 'embedded link' });

    // When disabled, `href` is stripped (`react-native-web`'s `Text` only
    // renders as an `<a>` when `href` is non-null), so the element falls back
    // to a plain `<div role="link">` rather than a real anchor.
    expect(link.tagName).not.toBe('A');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
  },
};

export const Variants: Story = {
  render: ({ children }) => {
    return (
      <Flex direction="column" spacing="sm">
        <List></List>
        <BodyText>
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
        <BodyText weight="semibold">
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
        <BodyText size="lg">
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
        <BodyText size="lg" weight="semibold">
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
      </Flex>
    );
  },
};
