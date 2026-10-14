import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Flex } from '../Flex/Flex';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components / Avatar',
  component: Avatar,
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md'] },
    name: { control: { type: 'text' } },
    src: { control: { type: 'text' } },
  },
  args: {
    name: undefined,
    src: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/** Visual matrix of Avatar sizes and content — used in docs and Chromatic snapshot testing. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    return (
      <Flex direction="row" gap="400">
        <Flex direction="row" gap="200">
          <Avatar size="md" />
          <Avatar size="sm" />
        </Flex>
        <Flex direction="row" gap="200">
          <Avatar size="md" name="Rob Phoenix" />
          <Avatar size="sm" name="Rob Phoenix" />
        </Flex>
        <Flex direction="row" gap="200">
          <Avatar
            size="md"
            src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
            name="Rob Phoenix"
          />
          <Avatar
            size="sm"
            src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
            name="Rob Phoenix"
          />
        </Flex>
      </Flex>
    );
  },
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {};

/** Pass an object to size to change the Avatar's size across breakpoints. */
export const ResponsiveSize: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    return (
      <Flex direction="row" gap="200" alignItems="center">
        <Avatar
          size={{ mobile: 'sm', desktop: 'md' }}
          src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
          name="Rob Phoenix"
        />
        <Avatar size={{ mobile: 'sm', desktop: 'md' }} name="Rob Phoenix" />
        <Avatar size={{ mobile: 'sm', desktop: 'md' }} />
      </Flex>
    );
  },
};

/** Test-only: initials come from the first and last names, with an icon fallback when there's no name. */
export const Initials: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex gap="200">
      <Avatar name="Rob Phoenix" />
      <Avatar name="Ada Lovelace Byron King" />
      <Avatar name="Zoë" />
      <Avatar />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    // Radix renders the fallback after a `delayMs` timer, so wait for all four
    const fallbacks = () => [...canvasElement.querySelectorAll('.h-AvatarFallback')];

    await waitFor(() =>
      expect(fallbacks().map(fallback => fallback.textContent)).toEqual(['RP', 'AK', 'Z', ''])
    );
    await expect(fallbacks()[3]!.querySelector('svg')).not.toBeNull();
  },
};
