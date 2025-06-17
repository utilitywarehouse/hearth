import type { Meta, StoryObj } from '@storybook/react-vite';
import { DMSans } from './DMSans';

const meta = {
  title: 'DM Sans',
  component: DMSans,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DMSans>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {};
