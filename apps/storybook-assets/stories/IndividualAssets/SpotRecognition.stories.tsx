/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotRecognitionSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-recognition.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotRecognition',
};

export default meta;
type Story = StoryObj;

export const SpotRecognitionStory: Story = {
  name: 'SpotRecognition',
  render: () => (
    <img src={SpotRecognitionSrc as unknown as string} alt="SpotRecognition" style={{ maxWidth: 320 }} />
  ),
};
