/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotCelebratory from '@utilitywarehouse/hearth-json-assets/lib/spot-celebratory-light.json';

const meta: Meta = {
  title: 'JSON / SpotCelebratory',
};

export default meta;
type Story = StoryObj;

export const SpotCelebratoryStory: Story = {
  name: 'SpotCelebratory',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotCelebratory} loop={true} />
    </div>
  ),
};
