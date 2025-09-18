/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotInnovationSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-innovation.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotInnovation',
};

export default meta;
type Story = StoryObj;

export const SpotInnovationStory: Story = {
  name: 'SpotInnovation',
  render: () => (
    <img src={SpotInnovationSrc as unknown as string} alt="SpotInnovation" style={{ maxWidth: 320 }} />
  ),
};
