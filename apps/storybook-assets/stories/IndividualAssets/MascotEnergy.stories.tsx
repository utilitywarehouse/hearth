/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import MascotEnergySrc from '@utilitywarehouse/hearth-svg-assets/lib/mascot-energy.svg';

const meta: Meta = {
  title: 'Individual Assets/MascotEnergy',
};

export default meta;
type Story = StoryObj;

export const MascotEnergyStory: Story = {
  name: 'MascotEnergy',
  render: () => (
    <img src={MascotEnergySrc as unknown as string} alt="MascotEnergy" style={{ maxWidth: 320 }} />
  ),
};
