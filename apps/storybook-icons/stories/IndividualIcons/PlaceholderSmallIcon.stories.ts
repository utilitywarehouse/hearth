/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlaceholderSmallIcon } from '@utilitywarehouse/hearth-react-icons/lib/PlaceholderSmallIcon';

const meta: Meta<typeof PlaceholderSmallIcon> = {
  title: 'Individual Icons/PlaceholderSmallIcon',
  component: PlaceholderSmallIcon,
};

export default meta;
type Story = StoryObj<typeof PlaceholderSmallIcon>;

export const PlaceholderSmallIconStory: Story = {
  name: 'PlaceholderSmallIcon',
  argTypes: {
    children: { table: { disable: true } },
    color: { table: { disable: true } },
  },
};
