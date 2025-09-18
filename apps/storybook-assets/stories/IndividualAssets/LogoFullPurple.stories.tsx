/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import LogoFullPurpleSrc from '@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg';

const meta: Meta = {
  title: 'Individual Assets/LogoFullPurple',
};

export default meta;
type Story = StoryObj;

export const LogoFullPurpleStory: Story = {
  name: 'LogoFullPurple',
  render: () => (
    <img src={LogoFullPurpleSrc as unknown as string} alt="LogoFullPurple" style={{ maxWidth: 320 }} />
  ),
};
