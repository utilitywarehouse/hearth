/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle1 from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-1-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBundle1',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle1Story: Story = {
  name: 'AnimatedSpotBundle1',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle1} loop={true} />
    </div>
  ),
};
