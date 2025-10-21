import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, Link, Badge, SectionHeader, Button } from '@utilitywarehouse/hearth-react';
import { SettingsSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof SectionHeader> = {
  title: 'Stories / Section Header',
  component: SectionHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `Section Header` component to help define and separate content within a screen. It provides structure, clarity, and improves page scannability for users.',
      },
    },
  },
  argTypes: {
    helperText: { control: { type: 'text' } },
    heading: { control: { type: 'text' } },
  },
  args: {
    heading: 'Section header',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Playground: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader
          {...args}
          trailingContent={
            <Link>
              Link text
              <ChevronRightSmallIcon />
            </Link>
          }
        />
      </Flex>
    );
  },
};

export const WithBadge: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader {...args} trailingContent={<Badge size="sm">Badge</Badge>} />
      </Flex>
    );
  },
};

export const WithButton: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader
          {...args}
          trailingContent={
            <Button size="sm" variant="outline" colorScheme="functional">
              Button
            </Button>
          }
        />
      </Flex>
    );
  },
};

export const CustomLink: Story = {
  render: () => {
    return (
      <Flex gap="600" direction="column" width="600px">
        <SectionHeader
          heading="Default usage"
          helperText="Identical to List heading"
          trailingContent={
            <Link href="#">
              See more
              <ChevronRightSmallIcon />
            </Link>
          }
        />
        <SectionHeader
          heading="Customization of icon"
          helperText="Custom icon on right"
          trailingContent={
            <Link href="#">
              <SettingsSmallIcon />
              Settings
            </Link>
          }
        />
        <SectionHeader
          heading="No icon, href target _blank, no helper text"
          trailingContent={
            <Link href="#" target="_blank">
              Call to action
            </Link>
          }
        />
      </Flex>
    );
  },
};

export const ValidationText: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader {...args} />
      </Flex>
    );
  },
  args: {
    validationStatus: 'invalid',
    validationText: 'Validation text',
  },
};
