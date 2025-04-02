import type { Meta, StoryObj } from '@storybook/react';
import { reactIcons } from '../utils/react-icons';
import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons/lib/AddMediumIcon';
import { IconsGrid } from './components';

const meta: Meta<typeof AddMediumIcon> = {
  title: 'All Icons',
  component: AddMediumIcon,
};

export default meta;
type Story = StoryObj<typeof AddMediumIcon>;

export const AllIcons: Story = {
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
  render: ({ color, ...args }) => {
    return <IconsGrid icons={reactIcons} lib="react" {...args} />;
  },
  argTypes: {
    title: { control: { type: 'text' } },
    titleId: { control: { type: 'text' } },
  },
};
