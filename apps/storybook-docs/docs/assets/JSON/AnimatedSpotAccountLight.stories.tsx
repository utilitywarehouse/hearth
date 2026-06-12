/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotAccountLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-account-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotAccountLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotAccountLightStory: Story = {
  name: 'AnimatedSpotAccountLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotAccountLight} loop={true} />
    </div>
  ),
};
