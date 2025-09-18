/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SceneInsuranceSrc from '@utilitywarehouse/hearth-svg-assets/lib/scene-insurance.svg';

const meta: Meta = {
  title: 'Individual Assets/SceneInsurance',
};

export default meta;
type Story = StoryObj;

export const SceneInsuranceStory: Story = {
  name: 'SceneInsurance',
  render: () => (
    <img src={SceneInsuranceSrc as unknown as string} alt="SceneInsurance" style={{ maxWidth: 320 }} />
  ),
};
