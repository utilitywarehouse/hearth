/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotSmartMeter from '@utilitywarehouse/hearth-json-assets/lib/spot-smart-meter-light.json';

const meta: Meta = {
  title: 'JSON / SpotSmartMeter',
};

export default meta;
type Story = StoryObj;

export const SpotSmartMeterStory: Story = {
  name: 'SpotSmartMeter',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotSmartMeter} loop={true} />
    </div>
  ),
};
