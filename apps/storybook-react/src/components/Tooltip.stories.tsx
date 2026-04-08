import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, Button, IconButton, Flex, BodyText } from '@utilitywarehouse/hearth-react';
import { AddSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Stories / Tooltip',
  component: Tooltip,
  argTypes: {
    content: { control: { type: 'text' } },
    side: { options: ['top', 'right', 'bottom', 'left'], control: { type: 'radio' } },
    align: { options: ['start', 'center', 'end'], control: { type: 'radio' } },
    sideOffset: { control: { type: 'number' } },
    delayDuration: { control: { type: 'number' } },
  },
  args: {
    content: 'Tooltip content',
    side: 'top',
    align: 'center',
    sideOffset: 5,
    delayDuration: 700,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: args => (
    <Flex justifyContent="center" padding="800">
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </Flex>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <Flex justifyContent="center" padding="800">
      <Tooltip content="Add to library">
        <IconButton label="Add to library">
          <AddSmallIcon />
        </IconButton>
      </Tooltip>
    </Flex>
  ),
};

export const Sides: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <Flex justifyContent="center" gap="400" padding="800">
      <Tooltip content="Top" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </Flex>
  ),
};

export const Instant: Story = {
  render: () => (
    <Flex justifyContent="center" padding="800">
      <Tooltip content="No delay!" delayDuration={0}>
        <Button>Hover me (instant)</Button>
      </Tooltip>
    </Flex>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Flex justifyContent="center" padding="800">
      <Tooltip
        content={
          <Flex direction="column" gap="100">
            <BodyText weight="bold">Bold heading</BodyText>
            <BodyText>Some descriptive text for the tooltip.</BodyText>
          </Flex>
        }
      >
        <Button>Rich content</Button>
      </Tooltip>
    </Flex>
  ),
};
