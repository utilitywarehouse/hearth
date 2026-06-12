/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSmartMeterDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-smart-meter-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotSmartMeterDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSmartMeterDarkStory: Story = {
  name: 'AnimatedSpotSmartMeterDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSmartMeterDark} loop={true} />
    </div>
  ),
};
