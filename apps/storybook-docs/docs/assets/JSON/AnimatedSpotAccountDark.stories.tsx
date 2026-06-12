/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotAccountDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-account-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotAccountDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotAccountDarkStory: Story = {
  name: 'AnimatedSpotAccountDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotAccountDark} loop={true} />
    </div>
  ),
};
