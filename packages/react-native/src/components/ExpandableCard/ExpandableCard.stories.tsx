import { Meta, StoryObj } from '@storybook/react-native';
import {
  BillMediumIcon,
  ElectricityMediumIcon,
  GasMediumIcon,
  PaymentMediumIcon,
  SettingsMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import React from 'react';
import { BodyText, IconContainer, Link } from '../../components';
import ExpandableCard from './ExpandableCard';
import ExpandableCardExpandedContent from './ExpandableCardExpandedContent';
import ExpandableCardGroup from './ExpandableCardGroup';
import ExpandableCardIcon from './ExpandableCardIcon';
import ExpandableCardTrigger from './ExpandableCardTrigger';

const meta = {
  title: 'Stories / ExpandableCard',
  component: ExpandableCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the card is expanded',
    },
    heading: {
      control: 'text',
      description: 'The heading text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below heading',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
    variant: {
      control: 'radio',
      description: 'The variant style of the card',
      options: ['subtle', 'emphasis'],
    },
    duration: {
      control: { type: 'number', min: 100, max: 1000, step: 50 },
      description: 'Animation duration in milliseconds',
    },
    animateOpacity: {
      control: 'boolean',
      description: 'Whether to animate opacity',
    },
  },
  args: {
    heading: 'Expandable Card',
    helperText: 'Click to expand',
    expanded: false,
    disabled: false,
    duration: 200,
    animateOpacity: true,
    variant: 'subtle',
  },
} satisfies Meta<typeof ExpandableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    expandedContent: (
      <BodyText>
        This is the expanded content. It can contain any component or content you need.
      </BodyText>
    ),
  },
};

export const BasicExample: Story = {
  render: () => (
    <ExpandableCard
      heading="Order Details"
      helperText="View your order information"
      expandedContent={
        <>
          <BodyText>Order #12345</BodyText>
          <BodyText>Status: Delivered</BodyText>
          <BodyText>Date: 10 Nov 2025</BodyText>
        </>
      }
      style={{ width: 350 }}
    />
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <ExpandableCard
      heading="Settings"
      helperText="Configure your preferences"
      leadingIcon={SettingsMediumIcon}
      expandedContent={
        <>
          <BodyText>• Notifications</BodyText>
          <BodyText>• Privacy</BodyText>
          <BodyText>• Account</BodyText>
        </>
      }
      style={{ width: 350 }}
    />
  ),
};

export const WithIconContainer: Story = {
  render: () => (
    <ExpandableCard
      heading="Electricity"
      helperText="Last reading 23/03/24"
      leadingContent={
        <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
      }
      expandedContent={
        <>
          <BodyText>Current Usage: 245 kWh</BodyText>
          <BodyText>Estimated Cost: £45.50</BodyText>
          <BodyText>Next Reading: 23/04/24</BodyText>
        </>
      }
      style={{ width: 350 }}
    />
  ),
};

export const WithBadge: Story = {
  render: () => (
    <ExpandableCard
      heading="New Feature"
      helperText="Check out what's new"
      badge={{ text: 'New', colorScheme: 'info' }}
      expandedContent={
        <BodyText>We've added new features to improve your experience. Explore them now!</BodyText>
      }
      style={{ width: 350 }}
    />
  ),
};

export const WithNumericValue: Story = {
  render: () => (
    <ExpandableCard
      heading="Total Balance"
      helperText="Current account balance"
      numericValue="£123.45"
      expandedContent={
        <>
          <BodyText>Available: £100.00</BodyText>
          <BodyText>Pending: £23.45</BodyText>
        </>
      }
      style={{ width: 350 }}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <ExpandableCard
      heading="Disabled Card"
      helperText="This card cannot be expanded"
      disabled
      expandedContent={<BodyText>This content is not accessible</BodyText>}
      style={{ width: 350 }}
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <div style={{ width: 350 }}>
        <BodyText style={{ marginBottom: 8 }}>
          Status: {expanded ? 'Expanded' : 'Collapsed'}
        </BodyText>
        <ExpandableCard
          heading="Controlled Card"
          helperText="Externally controlled state"
          expanded={expanded}
          onExpandedChange={setExpanded}
          expandedContent={
            <BodyText>This card's state is controlled by the parent component.</BodyText>
          }
        />
      </div>
    );
  },
};

export const CardGroup: Story = {
  render: () => (
    <ExpandableCardGroup
      heading="Your Services"
      helperText="View details for each service"
      headerTrailingContent={<Link href="#">View all</Link>}
    >
      <ExpandableCard
        heading="Electricity"
        helperText="Last reading 23/03/24"
        leadingContent={
          <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        expandedContent={
          <>
            <BodyText>Current Usage: 245 kWh</BodyText>
            <BodyText>Estimated Cost: £45.50</BodyText>
          </>
        }
      />
      <ExpandableCard
        heading="Gas"
        helperText="Last reading 23/03/24"
        leadingContent={
          <IconContainer icon={GasMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        expandedContent={
          <>
            <BodyText>Current Usage: 180 kWh</BodyText>
            <BodyText>Estimated Cost: £32.00</BodyText>
          </>
        }
      />
    </ExpandableCardGroup>
  ),
};

export const GroupWithMixedContent: Story = {
  render: () => (
    <ExpandableCardGroup heading="Account Overview">
      <ExpandableCard
        heading="Bills"
        helperText="View your recent bills"
        leadingContent={<ExpandableCardIcon as={BillMediumIcon} />}
        expandedContent={
          <>
            <BodyText>• March 2025: £89.50</BodyText>
            <BodyText>• February 2025: £92.00</BodyText>
            <BodyText>• January 2025: £95.30</BodyText>
          </>
        }
      />
      <ExpandableCard
        heading="Payments"
        helperText="Payment history"
        leadingContent={<ExpandableCardIcon as={PaymentMediumIcon} />}
        numericValue="3"
        expandedContent={
          <>
            <BodyText>• 05/03/25: £89.50 paid</BodyText>
            <BodyText>• 05/02/25: £92.00 paid</BodyText>
            <BodyText>• 05/01/25: £95.30 paid</BodyText>
          </>
        }
      />
      <ExpandableCard
        heading="Settings"
        leadingContent={<ExpandableCardIcon as={SettingsMediumIcon} />}
        badge={{ text: 'Updated', colorScheme: 'info', size: 'sm' }}
        expandedContent={
          <>
            <BodyText>• Notification preferences</BodyText>
            <BodyText>• Payment methods</BodyText>
            <BodyText>• Account details</BodyText>
          </>
        }
      />
    </ExpandableCardGroup>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
      <ExpandableCard
        heading="Default Card"
        expandedContent={<BodyText>Default color scheme</BodyText>}
      />
      <ExpandableCard
        heading="Subtle White Card"
        colorScheme="neutralSubtle"
        expandedContent={<BodyText>Subtle white color scheme</BodyText>}
      />
      <ExpandableCard
        heading="Strong Card"
        colorScheme="neutralStrong"
        expandedContent={<BodyText>Strong color scheme</BodyText>}
      />
    </div>
  ),
};

export const AdvancedComposition: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <ExpandableCard expanded={expanded} onExpandedChange={setExpanded}>
        <ExpandableCardTrigger
          onPress={() => setExpanded(!expanded)}
          heading="Custom Account Details"
          helperText="View your detailed account information"
          leadingContent={
            <IconContainer icon={BillMediumIcon} size="md" variant="emphasis" color="pig" />
          }
          numericValue="£123.45"
          isExpanded={expanded}
        />
        <ExpandableCardExpandedContent isExpanded={expanded}>
          <BodyText>Account Number: 1234567890</BodyText>
          <BodyText>Sort Code: 12-34-56</BodyText>
          <BodyText>Balance: £123.45</BodyText>
          <BodyText>Last Updated: 12/11/25</BodyText>
        </ExpandableCardExpandedContent>
      </ExpandableCard>
    );
  },
};
