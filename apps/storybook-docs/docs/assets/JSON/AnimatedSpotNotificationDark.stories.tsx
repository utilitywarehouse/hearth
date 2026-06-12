/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNotificationDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-notification-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNotificationDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNotificationDarkStory: Story = {
  name: 'AnimatedSpotNotificationDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNotificationDark} loop={true} />
    </div>
  ),
};
