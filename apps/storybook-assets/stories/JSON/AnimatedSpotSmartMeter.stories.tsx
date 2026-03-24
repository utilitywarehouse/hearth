/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSmartMeter from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-smart-meter-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotSmartMeter',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSmartMeterStory: Story = {
  name: 'AnimatedSpotSmartMeter',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSmartMeter} loop={true} />
    </div>
  ),
};
