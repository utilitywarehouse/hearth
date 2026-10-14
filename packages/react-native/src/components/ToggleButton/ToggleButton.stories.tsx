import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { ToggleButton, ToggleButtonIcon, ToggleButtonText } from '.';

const meta = {
  title: 'Stories / ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      type: 'string',
      control: 'text',
      description: 'The text of the button.',
    },
    toggled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Whether the button is toggled or not.',
    },
  },
  args: {
    text: 'Press me',
    toggled: false,
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <ToggleButton {...args} />;
  },
};

export const AdvancedUsage: Story = {
  render: () => {
    const [toggled, setToggled] = useState(false);
    return (
      <ToggleButton toggled={toggled} onToggle={setToggled}>
        <ToggleButtonIcon as={MobileSmallIcon} />
        <ToggleButtonText>{toggled ? 'Mobile on' : 'Mobile off'}</ToggleButtonText>
      </ToggleButton>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(canvas.getByText('Mobile off')).toBeVisible();
    await expect(button).toHaveAttribute('aria-selected', 'false');
    await userEvent.click(button);
    await expect(canvas.getByText('Mobile on')).toBeVisible();
    await expect(button).toHaveAttribute('aria-selected', 'true');
  },
};
