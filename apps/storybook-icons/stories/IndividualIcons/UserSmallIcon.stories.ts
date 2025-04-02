/* HEY, DON'T EDIT THIS FILE DIRECTLY, IT WAS MAGICALLY GENERATED! */
import type { Meta, StoryObj } from '@storybook/react';
import { UserSmallIcon } from '@utilitywarehouse/hearth-react-icons/lib/UserSmallIcon';

const meta: Meta<typeof UserSmallIcon> = {
  title: 'Individual Icons/UserSmallIcon',
  component: UserSmallIcon,
};

export default meta;
type Story = StoryObj<typeof UserSmallIcon>;

export const UserSmallIconStory: Story = {
  name: 'UserSmallIcon',
  argTypes: {
    color: { table: { disable: true } },
    title: { table: { disable: true } },
    titleId: { table: { disable: true } },
  },
};
