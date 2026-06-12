/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotQuoteLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-quote-light.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / SpotQuoteLight',
};

export default meta;
type Story = StoryObj;

export const SpotQuoteLightStory: Story = {
  name: 'SpotQuoteLight',
  render: () => (
    <img src={SpotQuoteLight as unknown as string} alt="SpotQuoteLight" style={{ maxWidth: 320 }} />
  ),
};
