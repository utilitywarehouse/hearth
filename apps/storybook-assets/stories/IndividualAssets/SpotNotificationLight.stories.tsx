/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotNotificationLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-notification-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotNotificationLight',
};

export default meta;
type Story = StoryObj;

export const SpotNotificationLightStory: Story = {
  name: 'SpotNotificationLight',
  render: () => (
    <img src={SpotNotificationLightSrc as unknown as string} alt="SpotNotificationLight" style={{ maxWidth: 320 }} />
  ),
};
