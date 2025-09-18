/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import MascotInsuranceSrc from '@utilitywarehouse/hearth-svg-assets/lib/mascot-insurance.svg';

const meta: Meta = {
  title: 'Individual Assets/MascotInsurance',
};

export default meta;
type Story = StoryObj;

export const MascotInsuranceStory: Story = {
  name: 'MascotInsurance',
  render: () => (
    <img src={MascotInsuranceSrc as unknown as string} alt="MascotInsurance" style={{ maxWidth: 320 }} />
  ),
};
