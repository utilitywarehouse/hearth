/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import LogoCondensedPurpleSrc from '@utilitywarehouse/hearth-svg-assets/lib/logo-condensed-purple.svg';

const meta: Meta = {
  title: 'Individual Assets/LogoCondensedPurple',
};

export default meta;
type Story = StoryObj;

export const LogoCondensedPurpleStory: Story = {
  name: 'LogoCondensedPurple',
  render: () => (
    <img src={LogoCondensedPurpleSrc as unknown as string} alt="LogoCondensedPurple" style={{ maxWidth: 320 }} />
  ),
};
