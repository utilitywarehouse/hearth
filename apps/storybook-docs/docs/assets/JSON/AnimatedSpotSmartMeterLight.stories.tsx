/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSmartMeterLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-smart-meter-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotSmartMeterLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSmartMeterLightStory: Story = {
  name: 'AnimatedSpotSmartMeterLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSmartMeterLight} loop={true} />
    </div>
  ),
};
