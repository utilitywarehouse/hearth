import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Tooltip,
  HearthProvider,
  Button,
  Flex,
  BodyText,
  UnstyledIconButton,
} from '@utilitywarehouse/hearth-react';
import { InfoSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Stories / Tooltip',
  component: Tooltip,
  decorators: [
    Story => (
      <HearthProvider>
        <Story />
      </HearthProvider>
    ),
  ],
  argTypes: {
    heading: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    align: {
      control: { type: 'radio' },
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
    open: { control: { type: 'boolean' } },
  },
  args: {
    description: 'Tooltip description',
    align: 'topCenter',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: args => (
    <Flex justifyContent="center" padding="800">
      <Tooltip {...args}>
        <UnstyledIconButton label="further information">
          <InfoSmallIcon />
        </UnstyledIconButton>
      </Tooltip>
    </Flex>
  ),
};

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
  render: args => (
    <Flex justifyContent="center" padding="800" gap="800" direction="column">
      <Tooltip {...args}>
        <UnstyledIconButton label="further information">
          <InfoSmallIcon />
        </UnstyledIconButton>
      </Tooltip>
      <Tooltip {...args} open align="bottomCenter">
        <UnstyledIconButton label="further information">
          <InfoSmallIcon />
        </UnstyledIconButton>
      </Tooltip>
    </Flex>
  ),
};

export const WithButton: Story = {
  render: args => (
    <Flex justifyContent="center" padding="800">
      <Tooltip {...args}>
        <Button variant="outline" colorScheme="functional" size="sm">
          Tooltip
        </Button>
      </Tooltip>
    </Flex>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Flex direction="column" alignItems="center" gap="400" padding="800">
      <Flex direction="row" gap="400" alignItems="center">
        <Tooltip description="Left Center align" align="leftCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip description="Right Center align" align="rightCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
      </Flex>
      <Flex direction="row" gap="400">
        <Tooltip description="Bottom Left align" align="bottomLeft">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip description="Bottom Center align" align="bottomCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip description="Bottom Right align" align="bottomRight">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
      </Flex>
      <Flex direction="row" gap="400">
        <Tooltip description="Top Left align" align="topLeft">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip description="Top Center align" align="topCenter">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
        <Tooltip description="Top Right align" align="topRight">
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
      </Flex>
    </Flex>
  ),
};

export const WithHeading: Story = {
  args: { heading: 'Tooltip heading' },
  render: args => (
    <Flex justifyContent="center" padding="800">
      <Tooltip {...args}>
        <UnstyledIconButton label="further information">
          <InfoSmallIcon />
        </UnstyledIconButton>
      </Tooltip>
    </Flex>
  ),
};

export const WithLongDescription: Story = {
  render: () => (
    <Flex direction="column" gap="800" padding="800">
      <Tooltip
        description="Roaming enables your phone to connect to a foreign network when you're outside your home country's network coverage"
        align="rightCenter"
      >
        <UnstyledIconButton label="further information">
          <InfoSmallIcon />
        </UnstyledIconButton>
      </Tooltip>
      <Flex justifyContent="center">
        <Tooltip
          description="Roaming enables your phone to connect to a foreign network when you're outside your home country's network coverage"
          align="rightCenter"
        >
          <UnstyledIconButton label="further information">
            <InfoSmallIcon />
          </UnstyledIconButton>
        </Tooltip>
      </Flex>
    </Flex>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Flex justifyContent="center" padding="800">
      <Tooltip
        description={
          <Flex direction="column" gap="100">
            <BodyText weight="bold">Bold heading</BodyText>
            <BodyText>Some descriptive text for the tooltip.</BodyText>
          </Flex>
        }
      >
        <UnstyledIconButton label="further information">
          <InfoSmallIcon />
        </UnstyledIconButton>
      </Tooltip>
    </Flex>
  ),
};
