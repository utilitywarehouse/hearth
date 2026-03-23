/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotEmptyState1 from '@utilitywarehouse/hearth-json-assets/lib/spot-empty-state-1-light.json';

const meta: Meta = {
  title: 'JSON / SpotEmptyState1',
};

export default meta;
type Story = StoryObj;

export const SpotEmptyState1Story: Story = {
  name: 'SpotEmptyState1',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotEmptyState1} loop={true} />
    </div>
  ),
};
