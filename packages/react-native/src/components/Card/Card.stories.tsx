import { Card, CardAction } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { Button } from '../Button';
import { Heading } from '../Heading';

const meta = {
  title: 'Stories / Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['subtle', 'emphasis'],
      description: 'Use this value to set the Card variant.',
    },
    noPadding: {
      control: 'boolean',
      description: 'Use this value to set the Card padding.',
    },
    colorScheme: {
      control: 'select',
      options: [
        'white',
        'warmWhite',
        'purple',
        'energyBlue',
        'broadbandGreen',
        'mobileRose',
        'insuranceOrange',
        'cashbackLilac',
        'piggyPink',
      ],
      description: 'Use this value to set the Card color scheme.',
    },
  },
  args: {
    children: 'This is a card',
    variant: 'subtle',
    noPadding: false,
    colorScheme: 'white',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ children, ...props }) => {
    return (
      <Card {...props}>
        <BodyText>{children as string}</BodyText>
      </Card>
    );
  },
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant', 'colorScheme'] },
  },
  render: ({ children, ...props }) => {
    return (
      <Flex space="lg">
        <VariantTitle title="Subtle - White">
          <Card {...props} variant="subtle" colorScheme="white">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Emphasis - White">
          <Card {...props} variant="emphasis" colorScheme="white">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Subtle - Warm White">
          <Card {...props} variant="subtle" colorScheme="warmWhite">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Emphasis - Warm White">
          <Card {...props} variant="emphasis" colorScheme="warmWhite">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Purple - Subtle">
          <Card {...props} colorScheme="purple" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Purple - Emphasis">
          <Card {...props} colorScheme="purple" variant="emphasis">
            <BodyText inverted>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Energy Blue - Subtle">
          <Card {...props} colorScheme="energyBlue" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Energy Blue - Emphasis">
          <Card {...props} colorScheme="energyBlue" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Broadband Green - Subtle">
          <Card {...props} colorScheme="broadbandGreen" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Broadband Green - Emphasis">
          <Card {...props} colorScheme="broadbandGreen" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Mobile Rose - Subtle">
          <Card {...props} colorScheme="mobileRose" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Mobile Rose - Emphasis">
          <Card {...props} colorScheme="mobileRose" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Insurance Orange - Subtle">
          <Card {...props} colorScheme="insuranceOrange" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Insurance Orange - Emphasis">
          <Card {...props} colorScheme="insuranceOrange" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Cashback Lilac - Subtle">
          <Card {...props} colorScheme="cashbackLilac" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Cashback Lilac - Emphasis">
          <Card {...props} colorScheme="cashbackLilac" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Piggy Pink - Subtle">
          <Card {...props} colorScheme="piggyPink" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Piggy Pink - Emphasis">
          <Card {...props} colorScheme="piggyPink" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
      </Flex>
    );
  },
};

export const Interactive: Story = {
  parameters: {
    controls: { exclude: ['variant', 'colorScheme'] },
  },
  render: ({ children, ...props }) => {
    return (
      <Flex space="lg">
        <VariantTitle title="Pressable - Subtle - White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="subtle"
            colorScheme="white"
            space="md"
            flexDirection="column"
            alignItems="stretch"
          >
            <Heading size="md">Heading</Heading>
            <BodyText>{children as string}</BodyText>
            <Button onPress={() => console.log('pressed')}>Press me</Button>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Emphasis - White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="emphasis"
            colorScheme="white"
            space="md"
            flexDirection="column"
            alignItems="stretch"
          >
            <Heading size="md">Heading</Heading>
            <BodyText>{children as string}</BodyText>
            <Button onPress={() => console.log('pressed')}>Press me</Button>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Subtle - Warm White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="subtle"
            colorScheme="warmWhite"
            space="md"
            flexDirection="column"
            alignItems="stretch"
          >
            <Heading size="md">Heading</Heading>
            <BodyText>{children as string}</BodyText>
            <Button onPress={() => console.log('pressed')}>Press me</Button>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Emphasis - Warm White">
          <Card
            {...props}
            variant="emphasis"
            colorScheme="warmWhite"
            space="md"
            flexDirection="column"
            alignItems="stretch"
          >
            <Heading size="md">Heading</Heading>
            <BodyText>{children as string}</BodyText>
            <CardAction>
              <Button onPress={() => console.log('pressed')}>Press me</Button>
            </CardAction>
          </Card>
        </VariantTitle>
      </Flex>
    );
  },
};
