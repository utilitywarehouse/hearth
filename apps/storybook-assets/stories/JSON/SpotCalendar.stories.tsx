/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotCalendar from '@utilitywarehouse/hearth-json-assets/lib/spot-calendar-light.json';

const meta: Meta = {
  title: 'JSON / SpotCalendar',
};

export default meta;
type Story = StoryObj;

export const SpotCalendarStory: Story = {
  name: 'SpotCalendar',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotCalendar} loop={true} />
    </div>
  ),
};
