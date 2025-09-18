/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotErrorSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-error.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotError',
};

export default meta;
type Story = StoryObj;

export const SpotErrorStory: Story = {
  name: 'SpotError',
  render: () => (
    <img src={SpotErrorSrc as unknown as string} alt="SpotError" style={{ maxWidth: 320 }} />
  ),
};
