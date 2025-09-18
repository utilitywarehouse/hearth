/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotSuccessSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-success.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotSuccess',
};

export default meta;
type Story = StoryObj;

export const SpotSuccessStory: Story = {
  name: 'SpotSuccess',
  render: () => (
    <img src={SpotSuccessSrc as unknown as string} alt="SpotSuccess" style={{ maxWidth: 320 }} />
  ),
};
