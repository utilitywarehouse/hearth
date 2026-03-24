/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotEarnings from '@utilitywarehouse/hearth-json-assets/lib/spot-earnings-light.json';

const meta: Meta = {
  title: 'JSON / SpotEarnings',
};

export default meta;
type Story = StoryObj;

export const SpotEarningsStory: Story = {
  name: 'SpotEarnings',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotEarnings} loop={true} />
    </div>
  ),
};
