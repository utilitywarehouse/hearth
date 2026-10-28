/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBookAppointmentsLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-book-appointments--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBookAppointmentsLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBookAppointmentsLottieDarkStory: Story = {
  name: 'AnimatedSpotBookAppointmentsLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBookAppointmentsLottieDark} loop={true} />
    </div>
  ),
};
