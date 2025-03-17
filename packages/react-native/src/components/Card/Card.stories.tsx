import React from 'react';
import { Card, CardAction } from '.';
import { Meta, StoryObj } from '@storybook/react';
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
        'energyGreen',
        'broadbandBlue',
        'mobileRose',
        'insuranceOrange',
        'cashbackLilac',
      ],
      description: 'Use this value to set the Card color scheme.',
    },
    selected: {
      type: 'boolean',
      control: 'boolean',
      description: 'Use this value to set the Card selected state.',
    },
  },
  args: {
    children: 'This is a card',
    variant: 'subtle',
    noPadding: false,
    colorScheme: 'white',
    selected: false,
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
  render: ({ children, selected, ...props }) => {
    return (
      <Flex space="lg">
        <VariantTitle title="Subtle - White">
          <Card {...props} selected={selected} variant="subtle" colorScheme="white">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Subtle - Warm White">
          <Card {...props} selected={selected} variant="subtle" colorScheme="warmWhite">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Emphasis - White">
          <Card {...props} variant="emphasis" colorScheme="white">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Emphasis - Warm White">
          <Card {...props} variant="emphasis" colorScheme="warmWhite">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Purple">
          <Card {...props} colorScheme="purple">
            <BodyText inverted>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Energy Green">
          <Card {...props} colorScheme="energyGreen">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Broadband Blue">
          <Card {...props} colorScheme="broadbandBlue">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Mobile Rose">
          <Card {...props} colorScheme="mobileRose">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Insurance Orange">
          <Card {...props} colorScheme="insuranceOrange">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Cashback Lilac">
          <Card {...props} colorScheme="cashbackLilac">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
      </Flex>
    );
  },
};

export const Interactive: Story = {
  parameters: {
    controls: { exclude: ['variant', 'colorScheme', 'selected'] },
  },
  render: ({ children, ...props }) => {
    const [selectedSubtleWhite, setSelectedSubtleWhite] = React.useState(false);
    const [selectedSubtleWarmWhite, setSelectedSubtleWarmWhite] = React.useState(false);

    return (
      <Flex space="lg">
        <VariantTitle title="Pressable - Subtle - White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="subtle"
            colorScheme="white"
          >
            <Flex space="md" direction="column" align="stretch">
              <Heading size="md">Heading</Heading>
              <BodyText>{children as string}</BodyText>
              <Button onPress={() => console.log('pressed')}>Press me</Button>
            </Flex>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Emphasis - White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="emphasis"
            colorScheme="white"
          >
            <Flex space="md" direction="column" align="stretch">
              <Heading size="md">Heading</Heading>
              <BodyText>{children as string}</BodyText>
              <Button onPress={() => console.log('pressed')}>Press me</Button>
            </Flex>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Subtle - Warm White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="subtle"
            colorScheme="warmWhite"
          >
            <Flex space="md" direction="column" align="stretch">
              <Heading size="md">Heading</Heading>
              <BodyText>{children as string}</BodyText>
              <Button onPress={() => console.log('pressed')}>Press me</Button>
            </Flex>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Emphasis - Warm White">
          <Card {...props} variant="emphasis" colorScheme="warmWhite">
            <Flex space="md" direction="column" align="stretch">
              <Heading size="md">Heading</Heading>
              <BodyText>{children as string}</BodyText>
              <CardAction>
                <Button onPress={() => console.log('pressed')}>Press me</Button>
              </CardAction>
            </Flex>
          </Card>
        </VariantTitle>
        <VariantTitle title="Selectable - Subtle - White">
          <Card {...props} selected={selectedSubtleWhite} variant="subtle" colorScheme="white">
            <Flex space="md" direction="column" align="stretch">
              <Heading size="md">Heading</Heading>
              <BodyText>{children as string}</BodyText>
              <CardAction>
                <Button
                  colorScheme="green"
                  onPress={() => setSelectedSubtleWhite(!selectedSubtleWhite)}
                >
                  Select me
                </Button>
              </CardAction>
            </Flex>
          </Card>
        </VariantTitle>
        <VariantTitle title="Selectable - Subtle - Warm White">
          <Card
            {...props}
            selected={selectedSubtleWarmWhite}
            variant="subtle"
            colorScheme="warmWhite"
          >
            <Flex space="md" direction="column" align="stretch">
              <Heading size="md">Heading</Heading>
              <BodyText>{children as string}</BodyText>
              <CardAction>
                <Button
                  colorScheme="green"
                  onPress={() => setSelectedSubtleWarmWhite(!selectedSubtleWarmWhite)}
                >
                  Select me
                </Button>
              </CardAction>
            </Flex>
          </Card>
        </VariantTitle>
      </Flex>
    );
  },
};
