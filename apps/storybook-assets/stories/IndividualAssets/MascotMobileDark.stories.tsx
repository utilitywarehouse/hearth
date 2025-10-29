/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import MascotMobileDarkSrc from '@utilitywarehouse/hearth-svg-assets/lib/mascot-mobile-dark.svg';

const meta: Meta = {
  title: 'Individual Assets/MascotMobileDark',
};

export default meta;
type Story = StoryObj;

export const MascotMobileDarkStory: Story = {
  name: 'MascotMobileDark',
  render: () => (
    <img src={MascotMobileDarkSrc as unknown as string} alt="MascotMobileDark" style={{ maxWidth: 320 }} />
  ),
};
