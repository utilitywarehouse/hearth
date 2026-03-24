/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCalendar from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-calendar-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotCalendar',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCalendarStory: Story = {
  name: 'AnimatedSpotCalendar',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCalendar} loop={true} />
    </div>
  ),
};
