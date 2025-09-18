/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotMovingHouseSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-moving-house.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotMovingHouse',
};

export default meta;
type Story = StoryObj;

export const SpotMovingHouseStory: Story = {
  name: 'SpotMovingHouse',
  render: () => (
    <img src={SpotMovingHouseSrc as unknown as string} alt="SpotMovingHouse" style={{ maxWidth: 320 }} />
  ),
};
