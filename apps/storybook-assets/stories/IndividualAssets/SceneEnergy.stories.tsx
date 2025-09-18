/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SceneEnergySrc from '@utilitywarehouse/hearth-svg-assets/lib/scene-energy.svg';

const meta: Meta = {
  title: 'Individual Assets/SceneEnergy',
};

export default meta;
type Story = StoryObj;

export const SceneEnergyStory: Story = {
  name: 'SceneEnergy',
  render: () => (
    <img src={SceneEnergySrc as unknown as string} alt="SceneEnergy" style={{ maxWidth: 320 }} />
  ),
};
