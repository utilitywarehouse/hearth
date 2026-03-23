/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotEmptyState2 from '@utilitywarehouse/hearth-json-assets/lib/spot-empty-state-2-light.json';

const meta: Meta = {
  title: 'JSON / SpotEmptyState2',
};

export default meta;
type Story = StoryObj;

export const SpotEmptyState2Story: Story = {
  name: 'SpotEmptyState2',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotEmptyState2} loop={true} />
    </div>
  ),
};
