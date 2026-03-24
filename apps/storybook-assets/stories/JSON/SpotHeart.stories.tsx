/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotHeart from '@utilitywarehouse/hearth-json-assets/lib/spot-heart-light.json';

const meta: Meta = {
  title: 'JSON / SpotHeart',
};

export default meta;
type Story = StoryObj;

export const SpotHeartStory: Story = {
  name: 'SpotHeart',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotHeart} loop={true} />
    </div>
  ),
};
