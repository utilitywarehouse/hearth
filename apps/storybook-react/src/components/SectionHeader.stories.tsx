import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, Link, Badge, SectionHeader, Button } from '@utilitywarehouse/hearth-react';
import { SettingsSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { StoryGallery } from '../storybook-components/StoryGallery';

const meta: Meta<typeof SectionHeader> = {
  title: 'Stories / SectionHeader',
  component: SectionHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `SectionHeader` component to help define and separate content within a screen. It provides structure, clarity, and improves page scannability for users.',
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
          heading="With link"
          helperText="Includes icon"
          trailingContent={
            <Link href="#">
              See more
              <ChevronRightSmallIcon />
            </Link>
          }
        />
        <SectionHeader
          heading="Different icon and placement"
          trailingContent={
            <Link href="#">
              <SettingsSmallIcon />
              Settings
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

export const Gallery: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    const stories = {
      Playground,
      WithBadge,
      WithButton,
      CustomLink,
      ValidationText,
    };
    return <StoryGallery meta={meta} stories={stories} />;
  },
};
