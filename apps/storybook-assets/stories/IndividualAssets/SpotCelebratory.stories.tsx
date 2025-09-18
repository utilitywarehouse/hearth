/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotCelebratorySrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-celebratory.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotCelebratory',
};

export default meta;
type Story = StoryObj;

export const SpotCelebratoryStory: Story = {
  name: 'SpotCelebratory',
  render: () => (
    <img src={SpotCelebratorySrc as unknown as string} alt="SpotCelebratory" style={{ maxWidth: 320 }} />
  ),
};
