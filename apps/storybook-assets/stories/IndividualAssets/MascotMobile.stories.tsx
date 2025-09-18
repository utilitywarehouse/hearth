/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import MascotMobileSrc from '@utilitywarehouse/hearth-svg-assets/lib/mascot-mobile.svg';

const meta: Meta = {
  title: 'Individual Assets/MascotMobile',
};

export default meta;
type Story = StoryObj;

export const MascotMobileStory: Story = {
  name: 'MascotMobile',
  render: () => (
    <img src={MascotMobileSrc as unknown as string} alt="MascotMobile" style={{ maxWidth: 320 }} />
  ),
};
