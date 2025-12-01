import { Meta, StoryObj } from '@storybook/react-vite';
import {
  BillMediumIcon,
  ChevronRightSmallIcon,
  ElectricityMediumIcon,
  GasMediumIcon,
  HomeMediumIcon,
  PaymentMediumIcon,
  SettingsMediumIcon,
  UserMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { FC, PropsWithChildren, useState } from 'react';
import { List, ListAction, ListItem, ListItemIcon, ListItemTrailingIcon } from '.';
import { VariantTitle } from '../../../docs/components';
import { Badge } from '../Badge';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { IconContainer } from '../IconContainer';
import { Link } from '../Link';
import { Switch } from '../Switch';
// import { Card } from '../Card';

const Card: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;

const meta = {
  title: 'Stories / List',
  component: List,
  argTypes: {
    container: {
      options: ['none', 'subtleWhite', 'subtleWarmWhite', 'emphasisWhite', 'emphasisWarmWhite'],
      control: 'select',
      description: 'The container variant to be displayed on the list.',
    },
    heading: {
      control: 'text',
      description:
        'The heading text to be displayed on the list. \n _Note: This is a playground prop, use heading on the SectionHeader component._',
    },
    helperText: {
      control: 'text',
      description:
        'The heading supporting text to be displayed on the list. \n _Note: This is a playground prop, use helperText on the SectionHeader component._',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the list item is disabled.',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the list item is in a loading state.',
    },
  },
  args: {
    container: 'none',
    heading: 'This is the list heading',
    helperText: 'Supporting text',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ container, ...args }) => {
    return (
      <List {...args} container={container}>
        {Array.from({ length: 4 }).map((_, index) => (
          <ListItem key={index} heading="List item text" helperText="Supporting text" />
        ))}
      </List>
    );
  },
};

export const WithAction: Story = {
  args: {
    container: 'subtleWhite',
  },
  render: ({ container, ...args }) => (
    <List {...args} container={container}>
      {Array.from({ length: 4 }).map((_, index) => (
        <ListItem key={index} heading="List item text" helperText="Supporting text" />
      ))}
      <ListAction heading="List action" onPress={() => console.log('List Action Pressed')} />
    </List>
  ),
};

export const WithContainer: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List container="subtleWhite">
      <ListItem
        leadingContent={<BillMediumIcon />}
        heading="Bills"
        onPress={() => console.log('Bills pressed')}
      />
      <ListItem
        leadingContent={<PaymentMediumIcon />}
        heading="Payments"
        onPress={() => console.log('Payments pressed')}
      />
      <ListItem
        leadingContent={<HomeMediumIcon />}
        heading="Moving Home"
        onPress={() => console.log('Moving Home pressed')}
      />
    </List>
  ),
};

export const WithBadge: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List>
      <ListItem
        heading="Electricity"
        helperText="Last reading 23/03/24"
        onPress={() => console.log('Electricity pressed')}
        leadingContent={
          <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        badge={<Badge text="Text" />}
      />
      <ListItem
        heading="Gas"
        helperText="Last reading 23/03/24"
        onPress={() => console.log('Gas pressed')}
        leadingContent={
          <IconContainer icon={GasMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        badge={<Badge text="Smart Meter" />}
      />
    </List>
  ),
};

export const WithSwitch: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
      <List container="subtleWhite">
        <ListItem
          heading="Enable notifications"
          helperText="Receive updates and alerts"
          onPress={() => console.log('Notifications pressed')}
          trailingContent={
            <Switch size="small" value={notifications} onValueChange={setNotifications} />
          }
        />
        <ListItem
          heading="Dark mode"
          helperText="Use dark theme throughout the app"
          onPress={() => console.log('Dark mode pressed')}
          trailingContent={<Switch size="small" value={darkMode} onValueChange={setDarkMode} />}
        />
      </List>
    );
  },
};

export const WithSectionHeader: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List
      heading="Your account"
      helperText="Tap the links below to view your account"
      headerTrailingContent={<Link onPress={() => console.log('View all pressed')}>View all</Link>}
    >
      <ListItem
        heading="Bills"
        helperText="View your bills"
        leadingContent={<ListItemIcon as={BillMediumIcon} />}
        trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
        onPress={() => console.log('Bills pressed')}
      />
      <ListItem
        heading="Payments"
        helperText="Make a payment"
        leadingContent={<ListItemIcon as={PaymentMediumIcon} />}
        trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
        onPress={() => console.log('Payments pressed')}
      />
      <ListItem
        heading="Moving home"
        helperText="Tell us if you're moving"
        leadingContent={<ListItemIcon as={HomeMediumIcon} />}
        trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
        onPress={() => console.log('Moving home pressed')}
      />
      <ListItem
        heading="Refer a friend"
        helperText="Get rewarded with a friend"
        leadingContent={<ListItemIcon as={UserMediumIcon} />}
        trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
        onPress={() => console.log('Refer a friend pressed')}
      />
    </List>
  ),
};

export const WithListAction: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List container="subtleWarmWhite">
      <ListItem
        heading="Upgrade your plan"
        helperText="Get more features with a premium plan"
        onPress={() => console.log('Upgrade pressed')}
      />
      <ListItem
        heading="Manage payment methods"
        helperText="Update your credit or debit cards"
        onPress={() => console.log('Manage pressed')}
      />
      <ListAction heading="Contact support" onPress={() => console.log('Contact pressed')} />
    </List>
  ),
};

export const WithTransactions: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List container="subtleWhite">
      <ListItem
        heading="Coffee Shop"
        helperText="Apr 5, 2024"
        trailingContent={
          <>
            <BodyText>-£100.00</BodyText>
            <BodyText color="textBrand">+£1.00 CB</BodyText>
          </>
        }
        onPress={() => console.log('Transaction pressed')}
      />
      <ListItem
        heading="Top up"
        helperText="Apr 4, 2024"
        trailingContent={
          <>
            <BodyText color="textAffirmative">+£100.00</BodyText>
          </>
        }
        onPress={() => console.log('Transaction pressed')}
      />
    </List>
  ),
};

export const WithNumericValue: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List container="subtleWhite">
      <ListItem
        heading="Steps today"
        numericValue="8,542"
        onPress={() => console.log('Steps pressed')}
      />
      <ListItem
        heading="Calories burned"
        numericValue="2,300 kcal"
        onPress={() => console.log('Calories pressed')}
      />
    </List>
  ),
};

export const WithLink: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List container="subtleWhite">
      <ListItem
        heading="Terms of Service"
        onPress={() => console.log('Terms pressed')}
        trailingContent={<Link onPress={() => console.log('View link pressed')}>View</Link>}
      />
      <ListItem
        heading="Privacy Policy"
        onPress={() => console.log('Privacy pressed')}
        trailingContent={<Link onPress={() => console.log('View link pressed')}>View</Link>}
      />
    </List>
  ),
};

export const Loading: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <List loading container="subtleWhite">
      <ListItem
        heading="Loading item 1"
        helperText="Supporting text 1"
        leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
        onPress={() => console.log('List Item Pressed')}
      />
      <ListItem
        heading="Loading item 2"
        helperText="Supporting text 2"
        leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
        onPress={() => console.log('List Item Pressed')}
      />
      <ListItem
        heading="Loading item 3"
        helperText="Supporting text 3"
        leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
        onPress={() => console.log('List Item Pressed')}
      />
    </List>
  ),
};

export const KitchenSink: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const list = [
      { text: 'List Item 1', helperText: 'Supporting Text 1' },
      { text: 'List Item 2', helperText: 'Supporting Text 2' },
      { text: 'List Item 3', helperText: 'Supporting Text 3' },
    ];
    return (
      <Flex space="sm" direction="column" style={{ width: '100%' }}>
        <VariantTitle title="List with title and supporting text">
          <List heading="List Heading" helperText="Supporting Text">
            {list.map((item, index) => (
              <ListItem key={index} heading={item.text} helperText={item.helperText} />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with leading content">
          <List>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with trailing content">
          <List>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                trailingContent={<ListItemTrailingIcon as={SettingsMediumIcon} />}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with pressable items">
          <List>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with disabled items">
          <List disabled>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with loading items">
          <List loading>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with heading link">
          <List
            heading="Heading"
            headerTrailingContent={<Link href="http://uw.co.uk">View all</Link>}
          >
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
      </Flex>
    );
  },
};
