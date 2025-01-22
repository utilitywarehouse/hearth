import type { StoryObj } from '@storybook/react';
import { TMTLimkinFlare } from './TMTLimkinFlare';
import { DMSans } from './DMSans';
import { DMMono } from './DMMono';

const meta = {
  title: 'All Fonts',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {
  render: () => (
    <div>
      <DMSans />
      <DMMono />
      <TMTLimkinFlare />
    </div>
  ),
};
