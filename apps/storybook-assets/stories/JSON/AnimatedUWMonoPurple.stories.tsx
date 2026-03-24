/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWMonoPurple from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-mono-purple-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedUWMonoPurple',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWMonoPurpleStory: Story = {
  name: 'AnimatedUWMonoPurple',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWMonoPurple} loop={true} />
    </div>
  ),
};
