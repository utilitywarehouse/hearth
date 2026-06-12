/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle2Light from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-2-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotBundle2Light',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle2LightStory: Story = {
  name: 'AnimatedSpotBundle2Light',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle2Light} loop={true} />
    </div>
  ),
};
