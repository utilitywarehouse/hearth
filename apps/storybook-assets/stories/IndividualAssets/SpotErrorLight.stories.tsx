/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotErrorLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-error-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotErrorLight',
};

export default meta;
type Story = StoryObj;

export const SpotErrorLightStory: Story = {
  name: 'SpotErrorLight',
  render: () => (
    <img src={SpotErrorLightSrc as unknown as string} alt="SpotErrorLight" style={{ maxWidth: 320 }} />
  ),
};
