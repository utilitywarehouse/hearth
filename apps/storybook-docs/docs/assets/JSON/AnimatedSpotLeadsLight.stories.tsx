/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotLeadsLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-leads-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotLeadsLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotLeadsLightStory: Story = {
  name: 'AnimatedSpotLeadsLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotLeadsLight} loop={true} />
    </div>
  ),
};
