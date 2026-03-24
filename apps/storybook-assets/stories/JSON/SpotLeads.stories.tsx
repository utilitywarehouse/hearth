/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotLeads from '@utilitywarehouse/hearth-json-assets/lib/spot-leads-light.json';

const meta: Meta = {
  title: 'JSON / SpotLeads',
};

export default meta;
type Story = StoryObj;

export const SpotLeadsStory: Story = {
  name: 'SpotLeads',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotLeads} loop={true} />
    </div>
  ),
};
