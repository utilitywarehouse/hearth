import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';
import { VisuallyHidden } from './VisuallyHidden';

const hiddenText = 'Only screen readers announce this text';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components / VisuallyHidden',
  component: VisuallyHidden,
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    children: hiddenText,
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

/**
 * Interactive sandbox. The hidden text is not shown on screen, but screen
 * readers still announce it as part of the surrounding content.
 */
export const Playground: Story = {
  render: args => (
    <BodyText>
      Visible text. <VisuallyHidden {...args} />
    </BodyText>
  ),
  play: async ({ canvasElement }) => {
    const hidden = within(canvasElement).getByText(hiddenText);

    await expect(hidden.tagName).toBe('SPAN');
    await expect(hidden).toHaveAttribute('data-visually-hidden');
  },
};

/**
 * Use `asChild` to hide an element that needs its own semantics, such as a
 * heading that structures the page for screen reader users without a visible title.
 */
export const AsChild: Story = {
  render: () => (
    <VisuallyHidden asChild>
      <h2>Account settings</h2>
    </VisuallyHidden>
  ),
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole('heading', { name: 'Account settings' });

    await expect(heading).toHaveAttribute('data-visually-hidden');
  },
};
