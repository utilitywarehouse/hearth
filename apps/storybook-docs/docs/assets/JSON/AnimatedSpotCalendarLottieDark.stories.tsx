/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCalendarLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-calendar-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotCalendarLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCalendarLottieDarkStory: Story = {
  name: 'AnimatedSpotCalendarLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCalendarLottieDark} loop={true} />
    </div>
  ),
};
