/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWMonoOffWhite from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-mono-off-white-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedUWMonoOffWhite',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWMonoOffWhiteStory: Story = {
  name: 'AnimatedUWMonoOffWhite',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWMonoOffWhite} loop={true} />
    </div>
  ),
};
