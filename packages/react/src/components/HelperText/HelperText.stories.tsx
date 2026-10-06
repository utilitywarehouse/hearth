import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelperText } from './HelperText';

const meta: Meta<typeof HelperText> = {
  title: 'Typography / HelperText',
  component: HelperText,
  argTypes: {
    children: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    disableUserSelect: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Hearth helper text',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof HelperText>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
};
