/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBookAppointmentsLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-book-appointments-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotBookAppointmentsLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBookAppointmentsLightStory: Story = {
  name: 'AnimatedSpotBookAppointmentsLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBookAppointmentsLight} loop={true} />
    </div>
  ),
};
