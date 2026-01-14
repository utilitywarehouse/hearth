/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotBoilerLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-boiler-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotBoilerLight',
};

export default meta;
type Story = StoryObj;

export const SpotBoilerLightStory: Story = {
  name: 'SpotBoilerLight',
  render: () => (
    <img src={SpotBoilerLightSrc as unknown as string} alt="SpotBoilerLight" style={{ maxWidth: 320 }} />
  ),
};
