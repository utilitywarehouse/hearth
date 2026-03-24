/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotLeads from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-leads-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotLeads',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotLeadsStory: Story = {
  name: 'AnimatedSpotLeads',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotLeads} loop={true} />
    </div>
  ),
};
