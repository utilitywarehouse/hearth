/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWMonoOffWhiteLight from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-mono-off-white-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedUWMonoOffWhiteLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWMonoOffWhiteLightStory: Story = {
  name: 'AnimatedUWMonoOffWhiteLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWMonoOffWhiteLight} loop={true} />
    </div>
  ),
};
