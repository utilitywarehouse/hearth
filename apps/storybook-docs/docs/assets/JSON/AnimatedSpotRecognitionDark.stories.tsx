/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotRecognitionDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-recognition-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotRecognitionDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotRecognitionDarkStory: Story = {
  name: 'AnimatedSpotRecognitionDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotRecognitionDark} loop={true} />
    </div>
  ),
};
