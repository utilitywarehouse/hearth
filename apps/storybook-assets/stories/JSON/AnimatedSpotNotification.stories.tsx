/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNotification from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-notification-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotNotification',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNotificationStory: Story = {
  name: 'AnimatedSpotNotification',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNotification} loop={true} />
    </div>
  ),
};
