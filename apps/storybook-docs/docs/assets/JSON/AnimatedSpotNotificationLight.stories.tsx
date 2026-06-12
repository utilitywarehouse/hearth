/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNotificationLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-notification-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotNotificationLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNotificationLightStory: Story = {
  name: 'AnimatedSpotNotificationLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNotificationLight} loop={true} />
    </div>
  ),
};
