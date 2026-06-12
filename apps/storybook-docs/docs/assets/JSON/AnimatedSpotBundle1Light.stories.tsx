/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle1Light from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-1-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotBundle1Light',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle1LightStory: Story = {
  name: 'AnimatedSpotBundle1Light',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle1Light} loop={true} />
    </div>
  ),
};
