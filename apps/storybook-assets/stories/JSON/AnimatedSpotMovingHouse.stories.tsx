/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotMovingHouse from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-moving-house-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotMovingHouse',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotMovingHouseStory: Story = {
  name: 'AnimatedSpotMovingHouse',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotMovingHouse} loop={true} />
    </div>
  ),
};
