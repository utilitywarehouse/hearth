/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import MascotCashbackSrc from '@utilitywarehouse/hearth-svg-assets/lib/mascot-cashback.svg';

const meta: Meta = {
  title: 'Individual Assets/MascotCashback',
};

export default meta;
type Story = StoryObj;

export const MascotCashbackStory: Story = {
  name: 'MascotCashback',
  render: () => (
    <img src={MascotCashbackSrc as unknown as string} alt="MascotCashback" style={{ maxWidth: 320 }} />
  ),
};
