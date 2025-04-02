/* HEY, DON'T EDIT THIS FILE DIRECTLY, IT WAS MAGICALLY GENERATED! */
import type { Meta, StoryObj } from '@storybook/react';
import { OpenSmallIcon } from '@utilitywarehouse/hearth-react-icons/lib/OpenSmallIcon';

const meta: Meta<typeof OpenSmallIcon> = {
  title: 'Individual Icons/OpenSmallIcon',
  component: OpenSmallIcon,
};

export default meta;
type Story = StoryObj<typeof OpenSmallIcon>;

export const OpenSmallIconStory: Story = {
  name: 'OpenSmallIcon',
  argTypes: {
    color: { table: { disable: true } },
    title: { table: { disable: true } },
    titleId: { table: { disable: true } },
  },
};
