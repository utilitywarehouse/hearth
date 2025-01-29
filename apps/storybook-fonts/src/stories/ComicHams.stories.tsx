import type { Meta, StoryObj } from '@storybook/react';
import { ComicHams } from './ComicHams';

const meta = {
  title: 'ComicHams',
  component: ComicHams,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ComicHams>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {};
