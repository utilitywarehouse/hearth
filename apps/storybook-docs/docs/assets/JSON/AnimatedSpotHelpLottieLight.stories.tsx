/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHelpLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-help--light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotHelpLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHelpLottieLightStory: Story = {
  name: 'AnimatedSpotHelpLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHelpLottieLight} loop={true} />
    </div>
  ),
};
