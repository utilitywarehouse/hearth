import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExpandableCard, BodyText, Box, Flex, Badge } from '@utilitywarehouse/hearth-react';
import {
  SettingsMediumIcon,
  BroadbandMediumIcon,
  MobileMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { StoryGallery } from '../storybook-components/StoryGallery';

const meta: Meta<typeof ExpandableCard> = {
  title: 'Stories / ExpandableCard',
  component: ExpandableCard,
  argTypes: {
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    defaultOpen: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    heading: 'Heading',
    helperText: 'Helper text',
    defaultOpen: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableCard>;

export const Playground: Story = {
  render: args => (
    <Box width="400px" marginX="auto">
      <ExpandableCard {...args}>
        <BodyText size="md">
          This is the expandable content area. It can contain any content you need to show when the
          card is expanded.
        </BodyText>
      </ExpandableCard>
    </Box>
  ),
};

export const WithLeadingIcon: Story = {
  render: args => (
    <Flex width="400px" direction="column" gap="200">
      <ExpandableCard {...args} leadingIcon={<SettingsMediumIcon aria-hidden />}>
        <BodyText size="md">
          This is the expandable content area. It can contain any content you need to show when the
          card is expanded.
        </BodyText>
      </ExpandableCard>
      <ExpandableCard
        heading="Broadband"
        helperText="Manage your broadband settings"
        leadingIcon={<BroadbandMediumIcon aria-hidden />}
      >
        <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
      </ExpandableCard>
      <ExpandableCard heading="Broadband" leadingIcon={<BroadbandMediumIcon aria-hidden />}>
        <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
      </ExpandableCard>
      <ExpandableCard
        heading="Mobile"
        helperText="Manage your mobile settings"
        leadingIcon={<MobileMediumIcon aria-hidden />}
        leadingIconContainerColorScheme="mobile"
      >
        <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
      </ExpandableCard>
      <ExpandableCard
        heading="Mobile"
        leadingIcon={<MobileMediumIcon aria-hidden />}
        leadingIconContainerColorScheme="mobile"
      >
        <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
      </ExpandableCard>
    </Flex>
  ),
};

export const WithBadge: Story = {
  render: args => (
    <Box width="400px" marginX="auto">
      <ExpandableCard
        {...args}
        badge={
          <Badge colorScheme="info" size="sm">
            Badge
          </Badge>
        }
      >
        <BodyText size="md">
          This is the expandable content area. It can contain any content you need to show when the
          card is expanded.
        </BodyText>
      </ExpandableCard>
    </Box>
  ),
};

export const WithNumericValue: Story = {
  render: args => (
    <Flex direction="column" width="400px" gap="200">
      <ExpandableCard {...args} numericValue="£100">
        <BodyText size="md">
          This is the expandable content area. It can contain any content you need to show when the
          card is expanded.
        </BodyText>
      </ExpandableCard>
      <ExpandableCard
        {...args}
        numericValue="£100"
        badge={
          <Badge colorScheme="info" size="sm">
            Badge
          </Badge>
        }
      >
        <BodyText size="md">
          This is the expandable content area. It can contain any content you need to show when the
          card is expanded.
        </BodyText>
      </ExpandableCard>
    </Flex>
  ),
};

export const WithoutHelperText: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCard heading="Heading only" leadingIcon={<SettingsMediumIcon aria-hidden />}>
        <BodyText size="md">Content without helper text below the heading.</BodyText>
      </ExpandableCard>
    </Box>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCard
        heading="Heading"
        helperText="This card starts expanded"
        leadingIcon={<SettingsMediumIcon aria-hidden />}
        defaultOpen
      >
        <BodyText size="md">
          This card is open by default using the <code>defaultOpen</code> prop.
        </BodyText>
      </ExpandableCard>
    </Box>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCard
        heading="Heading"
        helperText="This card is disabled"
        leadingIcon={<SettingsMediumIcon aria-hidden />}
        disabled
      >
        <BodyText size="md">This content cannot be reached when the card is disabled.</BodyText>
      </ExpandableCard>
    </Box>
  ),
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
      WithLeadingIcon,
      WithoutHelperText,
      DefaultOpen,
      Disabled,
    };
    return <StoryGallery meta={meta} stories={stories} />;
  },
};
