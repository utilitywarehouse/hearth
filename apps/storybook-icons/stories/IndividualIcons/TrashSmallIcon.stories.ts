/* HEY, DON'T EDIT THIS FILE DIRECTLY, IT WAS MAGICALLY GENERATED! */
import type { Meta, StoryObj } from '@storybook/react';
import { TrashSmallIcon } from '@utilitywarehouse/hearth-react-icons/lib/TrashSmallIcon';

const meta: Meta<typeof TrashSmallIcon> = {
  title: 'Individual Icons/TrashSmallIcon',
  component: TrashSmallIcon,
};

export default meta;
type Story = StoryObj<typeof TrashSmallIcon>;

export const TrashSmallIconStory: Story = {
  name: 'TrashSmallIcon',
  argTypes: {
    color: { table: { disable: true } },
    title: { table: { disable: true } },
    titleId: { table: { disable: true } },
  },
};
