/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle2 from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-2-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBundle2',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle2Story: Story = {
  name: 'AnimatedSpotBundle2',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle2} loop={true} />
    </div>
  ),
};
