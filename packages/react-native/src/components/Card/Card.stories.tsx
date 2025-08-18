import { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardAction } from '.';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Button } from '../Button';
import { Flex } from '../Flex';
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
        'neutralStrong',
        'neutralSubtle',
        'brand',
        'energy',
        'broadband',
        'mobile',
        'insurance',
        'cashback',
        'pig',
      ],
      description: 'Use this value to set the Card color scheme.',
    },
  },
  args: {
    children: 'This is a card',
    variant: 'subtle',
    noPadding: false,
    colorScheme: 'neutralStrong',
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
          <Card {...props} variant="subtle" colorScheme="neutralStrong">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Emphasis - White">
          <Card {...props} variant="emphasis" colorScheme="neutralStrong">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Subtle - Warm White">
          <Card {...props} variant="subtle" colorScheme="neutralSubtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Emphasis - Warm White">
          <Card {...props} variant="emphasis" colorScheme="neutralSubtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Purple - Subtle">
          <Card {...props} colorScheme="brand" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Purple - Emphasis">
          <Card {...props} colorScheme="brand" variant="emphasis">
            <BodyText inverted>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Energy Blue - Subtle">
          <Card {...props} colorScheme="energy" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Energy Blue - Emphasis">
          <Card {...props} colorScheme="energy" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Broadband Green - Subtle">
          <Card {...props} colorScheme="broadband" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Broadband Green - Emphasis">
          <Card {...props} colorScheme="broadband" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Mobile Rose - Subtle">
          <Card {...props} colorScheme="mobile" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Mobile Rose - Emphasis">
          <Card {...props} colorScheme="mobile" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Insurance Orange - Subtle">
          <Card {...props} colorScheme="insurance" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Insurance Orange - Emphasis">
          <Card {...props} colorScheme="insurance" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Cashback Lilac - Subtle">
          <Card {...props} colorScheme="cashback" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Cashback Lilac - Emphasis">
          <Card {...props} colorScheme="cashback" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Piggy Pink - Subtle">
          <Card {...props} colorScheme="pig" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Piggy Pink - Emphasis">
          <Card {...props} colorScheme="pig" variant="emphasis">
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
            colorScheme="neutralStrong"
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
            colorScheme="neutralStrong"
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
            colorScheme="neutralSubtle"
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
            colorScheme="neutralSubtle"
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
