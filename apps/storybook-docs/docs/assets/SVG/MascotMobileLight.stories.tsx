/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import MascotMobileLight from '@utilitywarehouse/hearth-svg-assets/lib/mascot-mobile-light.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / MascotMobileLight',
};

export default meta;
type Story = StoryObj;

export const MascotMobileLightStory: Story = {
  name: 'MascotMobileLight',
  render: () => (
    <img src={MascotMobileLight as unknown as string} alt="MascotMobileLight" style={{ maxWidth: 320 }} />
  ),
};
