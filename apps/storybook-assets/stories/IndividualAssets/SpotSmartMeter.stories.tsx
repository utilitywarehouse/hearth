/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotSmartMeterSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-smart-meter.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotSmartMeter',
};

export default meta;
type Story = StoryObj;

export const SpotSmartMeterStory: Story = {
  name: 'SpotSmartMeter',
  render: () => (
    <img src={SpotSmartMeterSrc as unknown as string} alt="SpotSmartMeter" style={{ maxWidth: 320 }} />
  ),
};
