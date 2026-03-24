/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNoBroadband from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-no-broadband-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotNoBroadband',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNoBroadbandStory: Story = {
  name: 'AnimatedSpotNoBroadband',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNoBroadband} loop={true} />
    </div>
  ),
};
