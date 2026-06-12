/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNoBroadbandLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-no-broadband-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotNoBroadbandLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNoBroadbandLightStory: Story = {
  name: 'AnimatedSpotNoBroadbandLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNoBroadbandLight} loop={true} />
    </div>
  ),
};
