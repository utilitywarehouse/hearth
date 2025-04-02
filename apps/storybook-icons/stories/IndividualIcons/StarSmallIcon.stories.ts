/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import { StarSmallIcon } from '@utilitywarehouse/hearth-react-icons/lib/StarSmallIcon';

const meta: Meta<typeof StarSmallIcon> = {
  title: 'Individual Icons/StarSmallIcon',
  component: StarSmallIcon,
};

export default meta;
type Story = StoryObj<typeof StarSmallIcon>;

export const StarSmallIconStory: Story = {
  name: 'StarSmallIcon',
  argTypes: {
    children: { table: { disable: true } },
    color: { table: { disable: true } },
  },
};
