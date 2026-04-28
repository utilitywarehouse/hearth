import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExpandableCard, BodyText, Box } from '@utilitywarehouse/hearth-react';
import { SettingsMediumIcon, BroadbandMediumIcon, MobileMediumIcon } from '@utilitywarehouse/hearth-react-icons';
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
      <ExpandableCard {...args} leadingContent={<SettingsMediumIcon aria-hidden />}>
        <BodyText size="md">
          This is the expandable content area. It can contain any content you need to show when
          the card is expanded.
        </BodyText>
      </ExpandableCard>
    </Box>
  ),
};

export const WithLeadingContent: Story = {
  render: () => (
    <Box width="400px" marginX="auto" display="flex" flexDirection="column" gap="200">
      <ExpandableCard
        heading="Broadband"
        helperText="Manage your broadband settings"
        leadingContent={<BroadbandMediumIcon aria-hidden />}
      >
        <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
      </ExpandableCard>
      <ExpandableCard
        heading="Mobile"
        helperText="Manage your mobile settings"
        leadingContent={<MobileMediumIcon aria-hidden />}
      >
        <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
      </ExpandableCard>
    </Box>
  ),
};

export const WithoutLeadingContent: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCard heading="Heading" helperText="Helper text">
        <BodyText size="md">Content without a leading icon.</BodyText>
      </ExpandableCard>
    </Box>
  ),
};

export const WithoutHelperText: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCard
        heading="Heading only"
        leadingContent={<SettingsMediumIcon aria-hidden />}
      >
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
        leadingContent={<SettingsMediumIcon aria-hidden />}
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
        leadingContent={<SettingsMediumIcon aria-hidden />}
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
      WithLeadingContent,
      WithoutLeadingContent,
      WithoutHelperText,
      DefaultOpen,
      Disabled,
    };
    return <StoryGallery meta={meta} stories={stories} />;
  },
};
