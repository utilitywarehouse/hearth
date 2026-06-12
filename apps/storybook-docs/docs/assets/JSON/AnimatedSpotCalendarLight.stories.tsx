/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCalendarLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-calendar-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotCalendarLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCalendarLightStory: Story = {
  name: 'AnimatedSpotCalendarLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCalendarLight} loop={true} />
    </div>
  ),
};
