/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWMonoPurpleLight from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-mono-purple-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedUWMonoPurpleLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWMonoPurpleLightStory: Story = {
  name: 'AnimatedUWMonoPurpleLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWMonoPurpleLight} loop={true} />
    </div>
  ),
};
