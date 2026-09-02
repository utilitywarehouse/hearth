import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Spinner } from '.';
import { coloursAsArray } from '../../utils';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Spinner',
  component: Spinner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: 'select',
      description: 'The size of the Spinner.',
    },
    color: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Color of the Spinner. Use the color name from the theme.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The Spinner communicates its loading state to assistive tech via `role="status"`
    // plus `aria-busy`/`aria-live`/`aria-label`, all set directly in Spinner.web.tsx —
    // verified live in the rendered DOM rather than assumed.
    const spinner = await canvas.findByRole('status');
    expect(spinner).toHaveAttribute('aria-busy', 'true');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
    expect(spinner).toHaveAttribute('aria-label', 'loading');
  },
};

export const KitchenSink: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: args => (
    <Box gap="200">
      <VariantTitle title="XS">
        <Spinner {...args} size="xs" />
      </VariantTitle>
      <VariantTitle title="SM">
        <Spinner {...args} size="sm" />
      </VariantTitle>
      <VariantTitle title="MD">
        <Spinner {...args} size="md" />
      </VariantTitle>
      <VariantTitle title="LG">
        <Spinner {...args} size="lg" />
      </VariantTitle>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Each size variant renders without throwing and exposes the same accessibility
    // contract as the default Spinner.
    const spinners = await canvas.findAllByRole('status');
    expect(spinners).toHaveLength(4);

    spinners.forEach(spinner => {
      expect(spinner).toHaveAttribute('aria-busy', 'true');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
      expect(spinner).toHaveAttribute('aria-label', 'loading');
    });
  },
};
