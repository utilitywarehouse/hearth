/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotMovingHouseLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-moving-house-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotMovingHouseLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotMovingHouseLightStory: Story = {
  name: 'AnimatedSpotMovingHouseLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotMovingHouseLight} loop={true} />
    </div>
  ),
};
