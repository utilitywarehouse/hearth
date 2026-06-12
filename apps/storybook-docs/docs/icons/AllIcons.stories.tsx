// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react-vite';
import { reactIcons } from '../../utils/react-icons';
import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons/lib/AddMediumIcon';
import { IconsGrid } from './components';
import { color as browserColors } from '@utilitywarehouse/hearth-tokens/browser';

const meta: Meta<typeof AddMediumIcon> = {
  title: 'Icons / All Icons',
  component: AddMediumIcon,
};

export default meta;
type Story = StoryObj<typeof AddMediumIcon>;

const colors = {};
Object.keys(browserColors).forEach(browserColor => {
  const value = browserColors[browserColor];

  if (typeof value === 'string') {
    colors[browserColor] = value;
  }

  if (typeof value === 'object') {
    Object.keys(value).forEach(color => {
      colors[`${browserColor}${color}`] = value[color];
    });
  }
});

export const AllIcons: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: ({ color, ...args }) => {
    const iconColor = color ? colors[color] : 'currentColor';

    return <IconsGrid icons={reactIcons} {...args} color={iconColor} />;
  },
  argTypes: {
    color: {
      options: Object.keys(colors),
      control: { type: 'select' },
    },
    children: { table: { disable: true } },
    title: { table: { disable: true } },
    titleId: { table: { disable: true } },
  },
};
