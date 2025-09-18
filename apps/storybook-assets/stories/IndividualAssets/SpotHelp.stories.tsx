/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotHelpSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-help.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotHelp',
};

export default meta;
type Story = StoryObj;

export const SpotHelpStory: Story = {
  name: 'SpotHelp',
  render: () => (
    <img src={SpotHelpSrc as unknown as string} alt="SpotHelp" style={{ maxWidth: 320 }} />
  ),
};
