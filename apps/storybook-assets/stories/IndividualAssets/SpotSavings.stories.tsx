/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotSavingsSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-savings.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotSavings',
};

export default meta;
type Story = StoryObj;

export const SpotSavingsStory: Story = {
  name: 'SpotSavings',
  render: () => (
    <img src={SpotSavingsSrc as unknown as string} alt="SpotSavings" style={{ maxWidth: 320 }} />
  ),
};
