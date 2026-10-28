/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNotificationLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-notification-lottie-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNotificationLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNotificationLottieLightStory: Story = {
  name: 'AnimatedSpotNotificationLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNotificationLottieLight} loop={true} />
    </div>
  ),
};
