/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotBookAppointments from '@utilitywarehouse/hearth-json-assets/lib/spot-book-appointments-light.json';

const meta: Meta = {
  title: 'JSON / SpotBookAppointments',
};

export default meta;
type Story = StoryObj;

export const SpotBookAppointmentsStory: Story = {
  name: 'SpotBookAppointments',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotBookAppointments} loop={true} />
    </div>
  ),
};
