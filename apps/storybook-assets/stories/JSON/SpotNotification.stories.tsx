/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotNotification from '@utilitywarehouse/hearth-json-assets/lib/spot-notification-light.json';

const meta: Meta = {
  title: 'JSON / SpotNotification',
};

export default meta;
type Story = StoryObj;

export const SpotNotificationStory: Story = {
  name: 'SpotNotification',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotNotification} loop={true} />
    </div>
  ),
};
