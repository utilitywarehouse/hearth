/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotNotificationSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-notification.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotNotification',
};

export default meta;
type Story = StoryObj;

export const SpotNotificationStory: Story = {
  name: 'SpotNotification',
  render: () => (
    <img src={SpotNotificationSrc as unknown as string} alt="SpotNotification" style={{ maxWidth: 320 }} />
  ),
};
