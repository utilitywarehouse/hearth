/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotLeadsDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-leads-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotLeadsDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotLeadsDarkStory: Story = {
  name: 'AnimatedSpotLeadsDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotLeadsDark} loop={true} />
    </div>
  ),
};
