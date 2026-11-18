import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import CircleIcon from './CircleIcon';

const meta = {
  title: 'Stories / CircleIcon',
  component: CircleIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Color of the circle (applied as `currentColor` fill/stroke).',
    },
    width: {
      control: 'number',
      description: 'Width of the icon.',
    },
    height: {
      control: 'number',
      description: 'Height of the icon.',
    },
  },
  args: {
    color: '#101010',
    width: 24,
    height: 24,
  },
} satisfies Meta<typeof CircleIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const icon = await canvas.findByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');

    // CircleIcon is a single filled circle path.
    const path = icon.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute(
      'd',
      'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
    );
  },
};

export const CustomSize: Story = {
  args: {
    width: 40,
    height: 40,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = await canvas.findByRole('img');
    expect(icon).toHaveAttribute('width', '40');
    expect(icon).toHaveAttribute('height', '40');
  },
};
