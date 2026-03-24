/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBroadbandSymbol from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-broadband-symbol-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBroadbandSymbol',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBroadbandSymbolStory: Story = {
  name: 'AnimatedSpotBroadbandSymbol',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBroadbandSymbol} loop={true} />
    </div>
  ),
};
