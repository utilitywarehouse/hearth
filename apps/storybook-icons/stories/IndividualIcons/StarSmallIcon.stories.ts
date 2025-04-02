/* HEY, DON'T EDIT THIS FILE DIRECTLY, IT WAS MAGICALLY GENERATED! */
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
    color: { table: { disable: true } },
    title: { table: { disable: true } },
    titleId: { table: { disable: true } },
  },
};
