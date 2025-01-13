import type { Meta, StoryObj } from '@storybook/react';
import { TMTLimkinFlare } from './TMTLimkinFlare';

const meta = {
  title: 'TMT Limkin Flare',
  component: TMTLimkinFlare,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TMTLimkinFlare>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {};
