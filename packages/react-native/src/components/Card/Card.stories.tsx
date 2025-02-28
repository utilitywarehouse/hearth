import React from 'react';
import { Card } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';

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
    padding: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'none'],
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
    padding: 'lg',
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
  render: ({ children, ...props }) => {
    return (
      <Flex space="lg">
        <VariantTitle title="Subtle - White">
          <Card {...props} variant="subtle" colorScheme="white">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Subtle - Warm White">
          <Card {...props} variant="subtle" colorScheme="warmWhite">
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
            <BodyText>{children as string}</BodyText>
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
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Emphasis - White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="emphasis"
            colorScheme="white"
          >
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Subtle - Warm White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="subtle"
            colorScheme="warmWhite"
          >
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Pressable - Emphasis - Warm White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="emphasis"
            colorScheme="warmWhite"
          >
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Selectable - Subtle - White">
          <Card
            {...props}
            selected={selectedSubtleWhite}
            onPress={() => setSelectedSubtleWhite(!selectedSubtleWhite)}
            variant="subtle"
            colorScheme="white"
          >
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Selectable - Subtle - Warm White">
          <Card
            {...props}
            selected={selectedSubtleWarmWhite}
            onPress={() => setSelectedSubtleWarmWhite(!selectedSubtleWarmWhite)}
            variant="subtle"
            colorScheme="warmWhite"
          >
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
      </Flex>
    );
  },
};
