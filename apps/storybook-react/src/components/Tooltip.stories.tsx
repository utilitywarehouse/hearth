import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Tooltip,
  TooltipProvider,
  Button,
  IconButton,
  Flex,
  BodyText,
  UnstyledIconButton,
} from '@utilitywarehouse/hearth-react';
import { AddSmallIcon, InfoSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Stories / Tooltip',
  component: Tooltip,
  decorators: [
    Story => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    content: { control: { type: 'text' } },
    alignment: {
      control: {
        type: 'radio',
        options: [
          'rightCenter',
          'leftCenter',
          'bottomLeft',
          'bottomCenter',
          'bottomRight',
          'topLeft',
          'topCenter',
          'topRight',
        ],
      },
    },
  },
  args: {
    content: 'Tooltip content',
    alignment: 'topCenter',
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

export const Alignment: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <Flex direction="column" alignItems="center" gap="400" padding="800">
      <Flex direction="row" gap="400" alignItems="center">
        <Tooltip content="Left Center Alignment" alignment="leftCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip content="Right Center Alignment" alignment="rightCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
      </Flex>
      <Flex direction="row" gap="400">
        <Tooltip content="Bottom Left Alignment" alignment="bottomLeft">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip content="Bottom Center Alignment" alignment="bottomCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip content="Bottom Right Alignment" alignment="bottomRight">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
      </Flex>
      <Flex direction="row" gap="400">
        <Tooltip content="Top Left Alignment" alignment="topLeft">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip content="Top Center Alignment" alignment="topCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip content="Top Right Alignment" alignment="topRight">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
      </Flex>
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
