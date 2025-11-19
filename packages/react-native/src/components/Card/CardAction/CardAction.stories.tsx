import { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { ElectricityMediumIcon, GasMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { Flex } from '../../Flex';
import Card from '../Card';
import CardAction from './CardAction';

const meta: Meta<typeof CardAction> = {
  title: 'Stories / CardAction',
  component: CardAction,
  argTypes: {
    heading: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    badge: { control: 'object' },
    badgePosition: {
      control: 'select',
      options: ['bottom', 'middle', 'right'],
    },
    leadingIcon: {
      options: [
        'none',
        ...Object.keys(Icons).filter(icon => icon.includes('Small') || icon.includes('Medium')),
      ],
      control: 'select',
      description: 'The leading icon.',
    },
    trailingIcon: {
      options: [
        'none',
        ...Object.keys(Icons).filter(icon => icon.includes('Small') || icon.includes('Medium')),
      ],
      control: 'select',
      description: 'The trailing icon.',
    },
    iconContainer: { control: 'boolean' },
    iconContainerVariant: {
      control: 'select',
      options: ['subtle', 'emphasis'],
    },
    iconContainerColor: {
      control: 'select',
      options: ['pig', 'energy', 'broadband', 'mobile', 'insurance', 'cashback', 'highlight'],
    },
  },
  args: {
    heading: 'Card Action',
    helperText: 'This is a card action component',
    size: 'md',
    loading: false,
    disabled: false,
    iconContainer: true,
  },
};

export default meta;

type Story = StoryObj<typeof CardAction>;

export const Playground: Story = {
  args: {
    onPress: () => console.log('pressed'),
  },
  render: (args: any) => {
    // @ts-expect-error - This is a playground
    const leadingIcon = args.leadingIcon === 'none' ? undefined : Icons[args.leadingIcon];
    // @ts-expect-error - This is a playground
    const trailingIcon = args.trailingIcon === 'none' ? undefined : Icons[args.trailingIcon];
    return (
      <View style={{ width: '100%', maxWidth: 400 }}>
        <Card variant="emphasis">
          <CardAction {...args} leadingIcon={leadingIcon} trailingIcon={trailingIcon} />
        </Card>
      </View>
    );
  },
};

export const WithLeadingIcon: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardAction
          heading="Bills"
          helperText="View your bills"
          leadingIcon={ElectricityMediumIcon}
          onPress={() => console.log('pressed')}
        />
      </Card>
    </View>
  ),
};

export const WithTrailingIcon: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardAction
          heading="Bills"
          helperText="View your bills"
          trailingIcon={ElectricityMediumIcon}
          onPress={() => console.log('pressed')}
        />
      </Card>
    </View>
  ),
};

export const WithIconContainer: Story = {
  args: {},
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardAction
          heading="Electricity"
          helperText="Last reading 23/03/24"
          leadingIcon={ElectricityMediumIcon}
          iconContainer
          iconContainerVariant="emphasis"
          iconContainerColor="energy"
          onPress={() => console.log('pressed')}
        />
        <CardAction
          heading="Gas"
          helperText="Last reading 23/03/24"
          leadingIcon={GasMediumIcon}
          iconContainer
          iconContainerVariant="emphasis"
          iconContainerColor="energy"
          onPress={() => console.log('pressed')}
        />
        <CardAction
          heading="Gas"
          helperText="Last reading 23/03/24"
          leadingIcon={GasMediumIcon}
          iconContainer
          iconContainerVariant="emphasis"
          iconContainerColor="energy"
          onPress={() => console.log('pressed')}
        />
      </Card>
    </View>
  ),
};

export const WithBadge: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Flex direction="column" space="md" style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardAction
          heading="Badge at bottom"
          helperText="Badge positioned below text"
          leadingIcon={ElectricityMediumIcon}
          badge={{ text: 'New' }}
          badgePosition="bottom"
          onPress={() => console.log('pressed')}
        />
      </Card>
      <Card variant="emphasis">
        <CardAction
          heading="Badge at middle"
          helperText="Badge positioned between heading and helper text"
          leadingIcon={ElectricityMediumIcon}
          badge={{ text: 'New' }}
          badgePosition="middle"
          onPress={() => console.log('pressed')}
        />
      </Card>
      <Card variant="emphasis">
        <CardAction
          heading="Badge at right"
          helperText="Badge positioned on the right side"
          leadingIcon={ElectricityMediumIcon}
          badge={{ text: 'New' }}
          badgePosition="right"
          onPress={() => console.log('pressed')}
        />
      </Card>
    </Flex>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Flex direction="column" space="md" style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardAction
          heading="Medium size (default)"
          helperText="Heading size is md"
          size="md"
          leadingIcon={ElectricityMediumIcon}
          onPress={() => console.log('pressed')}
        />
      </Card>
      <Card variant="emphasis">
        <CardAction
          heading="Large size"
          helperText="Heading size is lg"
          size="lg"
          leadingIcon={ElectricityMediumIcon}
          onPress={() => console.log('pressed')}
        />
      </Card>
    </Flex>
  ),
};

export const Loading: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardAction
          heading="Loading"
          helperText="This is loading"
          loading
          leadingIcon={ElectricityMediumIcon}
          onPress={() => console.log('pressed')}
        />
      </Card>
    </View>
  ),
};

export const Disabled: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <View style={{ width: '100%', maxWidth: 400 }}>
      <Card variant="emphasis">
        <CardAction
          heading="Disabled"
          helperText="This is disabled"
          disabled
          leadingIcon={ElectricityMediumIcon}
          onPress={() => console.log('pressed')}
        />
      </Card>
    </View>
  ),
};
