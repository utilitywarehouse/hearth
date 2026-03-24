/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBookAppointments from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-book-appointments-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBookAppointments',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBookAppointmentsStory: Story = {
  name: 'AnimatedSpotBookAppointments',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBookAppointments} loop={true} />
    </div>
  ),
};
