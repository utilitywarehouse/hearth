/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBookAppointmentsDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-book-appointments-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBookAppointmentsDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBookAppointmentsDarkStory: Story = {
  name: 'AnimatedSpotBookAppointmentsDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBookAppointmentsDark} loop={true} />
    </div>
  ),
};
