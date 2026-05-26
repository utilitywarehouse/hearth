/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCalendarDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-calendar-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotCalendarDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCalendarDarkStory: Story = {
  name: 'AnimatedSpotCalendarDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCalendarDark} loop={true} />
    </div>
  ),
};
