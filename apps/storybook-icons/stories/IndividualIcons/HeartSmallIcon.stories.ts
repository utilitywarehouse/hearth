/* HEY, DON'T EDIT THIS FILE DIRECTLY, IT WAS MAGICALLY GENERATED! */
import type { Meta, StoryObj } from '@storybook/react';
import { HeartSmallIcon } from '@utilitywarehouse/hearth-react-icons/lib/HeartSmallIcon';

const meta: Meta<typeof HeartSmallIcon> = {
  title: 'Individual Icons/HeartSmallIcon',
  component: HeartSmallIcon,
};

export default meta;
type Story = StoryObj<typeof HeartSmallIcon>;

export const HeartSmallIconStory: Story = {
  name: 'HeartSmallIcon',
  argTypes: {
    color: { table: { disable: true } },
    title: { table: { disable: true } },
    titleId: { table: { disable: true } },
  },
};
