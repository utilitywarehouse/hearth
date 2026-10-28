/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSmartMeterLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-smart-meter--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSmartMeterLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSmartMeterLottieDarkStory: Story = {
  name: 'AnimatedSpotSmartMeterLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSmartMeterLottieDark} loop={true} />
    </div>
  ),
};
