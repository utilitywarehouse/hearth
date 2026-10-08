import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { UnstyledIconButton } from './UnstyledIconButton';
import {
  AddMediumIcon,
  CloseMediumIcon,
  CloseSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';

const sizes = ['md', 'sm'] as const;

const meta: Meta<typeof UnstyledIconButton> = {
  title: 'Components / UnstyledIconButton',
  component: UnstyledIconButton,
  argTypes: {
    children: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    size: { control: { type: 'radio' }, options: sizes },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
  args: {
    label: 'close',
  },
} satisfies Meta<typeof UnstyledIconButton>;

export default meta;
type Story = StoryObj<typeof UnstyledIconButton>;

/** Interactive sandbox — use the controls panel to explore all props. Set inverted for use on a dark background. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: (args: UnstyledIconButtonProps) => (
    <Flex direction="column">
      <Box padding="200">
        <UnstyledIconButton {...args}>
          {args.size === 'sm' ? <CloseSmallIcon /> : <CloseMediumIcon />}
        </UnstyledIconButton>
      </Box>
      <Box padding="200" backgroundColor="brand">
        <UnstyledIconButton {...args} inverted>
          {args.size === 'sm' ? <CloseSmallIcon /> : <CloseMediumIcon />}
        </UnstyledIconButton>
      </Box>
    </Flex>
  ),
};

/** Use UnstyledIconButton as a dismiss trigger inside a Card. */
export const WithCard: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Box width="365px">
      <Card>
        <Flex direction="column" gap="150">
          <Flex justifyContent="between" alignItems="center">
            <Heading>This is a dismissable card</Heading>
            <UnstyledIconButton label="close" size="md">
              <CloseMediumIcon />
            </UnstyledIconButton>
          </Flex>
          <BodyText size="md">
            An Unstyled Icon Button has been used as a trigger for the dismissible action.
          </BodyText>
        </Flex>
      </Card>
    </Box>
  ),
};

/** Set asChild to render UnstyledIconButton as a link or other element instead of a button. */
export const AsLink: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: (args: Pick<UnstyledIconButtonProps, 'size' | 'disabled' | 'label'>) => {
    return (
      <Flex gap="200">
        <UnstyledIconButton {...args} asChild>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
            <AddMediumIcon />
          </a>
        </UnstyledIconButton>
        <UnstyledIconButton {...args} asChild loading>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
            <AddMediumIcon />
          </a>
        </UnstyledIconButton>
      </Flex>
    );
  },
};

const onUnstyledSubmit = fn();

/** Test-only: a disabled or loading UnstyledIconButton doesn't submit its form or follow its link. */
export const DisabledBlocksDefaultAction: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <form
        onSubmit={event => {
          event.preventDefault();
          onUnstyledSubmit('disabled form');
        }}
      >
        <input aria-label="Disabled form field" />
        <UnstyledIconButton type="submit" label="Disabled submit" disabled>
          <CloseMediumIcon />
        </UnstyledIconButton>
        <UnstyledIconButton type="submit" label="Loading" loading>
          <CloseMediumIcon />
        </UnstyledIconButton>
      </form>
      <form
        onSubmit={event => {
          event.preventDefault();
          onUnstyledSubmit('enabled form');
        }}
      >
        <UnstyledIconButton type="submit" label="Enabled submit">
          <CloseMediumIcon />
        </UnstyledIconButton>
      </form>
      <UnstyledIconButton asChild label="Disabled link" disabled>
        <a href="#blocked-link">
          <CloseMediumIcon />
        </a>
      </UnstyledIconButton>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    onUnstyledSubmit.mockClear();
    const canvas = within(canvasElement);
    const disabled = canvas.getByRole('button', { name: 'Disabled submit' });

    await expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(disabled);
    await expect(disabled).toHaveFocus();
    await userEvent.click(canvas.getByRole('button', { name: 'Loading' }));
    await userEvent.type(canvas.getByRole('textbox', { name: 'Disabled form field' }), '{Enter}');
    await expect(onUnstyledSubmit).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole('button', { name: 'Enabled submit' }));
    await expect(onUnstyledSubmit).toHaveBeenCalledOnce();
    await expect(onUnstyledSubmit).toHaveBeenCalledWith('enabled form');

    await userEvent.click(canvas.getByRole('link', { name: 'Disabled link' }));
    await expect(window.location.hash).not.toBe('#blocked-link');
    (document.activeElement as HTMLElement | null)?.blur();
  },
};
