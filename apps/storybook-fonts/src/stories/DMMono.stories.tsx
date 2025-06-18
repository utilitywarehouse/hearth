import type { Meta, StoryObj } from '@storybook/react-vite';
import { DMMono } from './DMMono';

const meta = {
  title: 'DM Mono',
  component: DMMono,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DMMono>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {};
