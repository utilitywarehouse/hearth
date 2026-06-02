import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Link } from '../Link/Link';
import { ExpandableCard } from './ExpandableCard';
import { ExpandableCardGroup } from './ExpandableCardGroup';
import {
  SettingsMediumIcon,
  BroadbandMediumIcon,
  MobileMediumIcon,
  ElectricitySmallIcon,
  BroadbandSmallIcon,
  CashbackCardSmallIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof ExpandableCard> = {
  title: 'Components / ExpandableCard',
  component: ExpandableCard,
  argTypes: {
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    defaultOpen: { control: { type: 'boolean' } },
  },
  args: {
    heading: 'Heading',
    helperText: 'Helper text',
    defaultOpen: false,
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

export const Group: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCardGroup heading="My services" helperText="Manage your UW services">
        <ExpandableCard
          heading="Broadband"
          helperText="Manage your broadband settings"
          leadingIcon={<BroadbandMediumIcon aria-hidden />}
          leadingIconContainerColorScheme="broadband"
        >
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
          heading="Settings"
          helperText="General account settings"
          leadingIcon={<SettingsMediumIcon aria-hidden />}
          leadingIconContainerColorScheme="highlight"
        >
          <BodyText size="md">Your account settings appear here.</BodyText>
        </ExpandableCard>
      </ExpandableCardGroup>
    </Box>
  ),
};

export const GroupWithoutSectionHeader: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCardGroup>
        <ExpandableCard
          heading="Broadband"
          helperText="Manage your broadband settings"
          leadingIcon={<BroadbandMediumIcon aria-hidden />}
        >
          <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
        </ExpandableCard>
        <ExpandableCard
          heading="Mobile"
          helperText="Manage your mobile settings"
          leadingIcon={<MobileMediumIcon aria-hidden />}
        >
          <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
        </ExpandableCard>
      </ExpandableCardGroup>
    </Box>
  ),
};

export const DecemberBill: Story = {
  render: () => (
    <Box width="400px" marginX="auto">
      <ExpandableCardGroup
        heading="Your December bill"
        trailingContent={
          <Link href="#">
            View PDF
            <ChevronRightSmallIcon aria-hidden />
          </Link>
        }
      >
        <ExpandableCard
          heading="Energy"
          helperText="1 Nov to 30 Nov"
          leadingIcon={<ElectricitySmallIcon aria-hidden />}
          leadingIconContainerColorScheme="energy"
          numericValue="£75.00"
          defaultOpen
        >
          <Flex direction="column" gap="100">
            <Flex justifyContent="between">
              <BodyText size="md">Electricity</BodyText>
              <BodyText size="md">£50.00</BodyText>
            </Flex>
            <Flex justifyContent="between">
              <BodyText size="md">Gas</BodyText>
              <BodyText size="md">£45.00</BodyText>
            </Flex>
            <Link href="#" marginTop="100">
              View energy usage
              <ChevronRightSmallIcon aria-hidden />
            </Link>
          </Flex>
        </ExpandableCard>
        <ExpandableCard
          heading="Broadband"
          helperText="1 Nov to 30 Nov"
          leadingIcon={<BroadbandSmallIcon aria-hidden />}
          leadingIconContainerColorScheme="broadband"
          numericValue="£30.00"
        >
          <BodyText size="md">Your broadband plan details appear here.</BodyText>
        </ExpandableCard>
        <ExpandableCard
          heading="Cashback"
          helperText="1 Nov to 30 Nov"
          leadingIcon={<CashbackCardSmallIcon aria-hidden />}
          leadingIconContainerColorScheme="cashback"
          numericValue="+£5.00"
        >
          <BodyText size="md">Your cashback details appear here.</BodyText>
        </ExpandableCard>
      </ExpandableCardGroup>
    </Box>
  ),
};
