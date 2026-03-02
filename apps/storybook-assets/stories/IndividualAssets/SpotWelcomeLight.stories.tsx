/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotWelcomeLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-welcome-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotWelcomeLight',
};

export default meta;
type Story = StoryObj;

export const SpotWelcomeLightStory: Story = {
  name: 'SpotWelcomeLight',
  render: () => (
    <img src={SpotWelcomeLightSrc as unknown as string} alt="SpotWelcomeLight" style={{ maxWidth: 320 }} />
  ),
};
