import { Meta, StoryObj } from '@storybook/react-native';
import { BellMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { ComponentProps } from 'react';
import { Card, CardAction, CardActions, CardPressHandler } from '.';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Heading } from '../Heading';

type CardStoryProps = ComponentProps<typeof Card>;

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
        'highlight',
        'mobile',
        'insurance',
        'cashback',
        'pig',
      ],
      description: 'Use this value to set the Card color scheme.',
    },
    shadowColor: {
      control: 'select',
      options: [
        'functional',
        'brand',
        'energy',
        'broadband',
        'mobile',
        'insurance',
        'cashback',
        'pig',
      ],
      description: 'Use this value to set the Card shadow color.',
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
  render: ({ children, ...props }: CardStoryProps) => {
    return (
      <Card {...props}>
        <BodyText>{children as string}</BodyText>
      </Card>
    );
  },
};

export const WithActions: Story = {
  render: ({ children, ...props }: CardStoryProps) => {
    return (
      <Flex gap="400">
        <Card
          {...props}
          flexDirection="column"
          alignItems="stretch"
          spacing="md"
          variant="emphasis"
        >
          <BodyText>{children as string}</BodyText>
          <CardActions>
            <CardAction
              onPress={() => console.log('Card action pressed')}
              heading="Card Action Head"
              helperText="Some helper text"
              leadingIcon={BellMediumIcon}
            />
            <CardAction
              onPress={() => console.log('Card action pressed')}
              heading="Card Action Head"
              leadingIcon={BellMediumIcon}
            />
            <CardAction
              onPress={() => console.log('Card action pressed')}
              heading="Card Action Head"
              helperText="Testing"
              leadingIcon={BellMediumIcon}
              iconContainer={false}
            />
          </CardActions>
        </Card>
        <Card {...props} flexDirection="column" alignItems="stretch" spacing="md" variant="subtle">
          <BodyText>{children as string}</BodyText>
          <CardActions>
            <CardAction
              onPress={() => console.log('Card action pressed')}
              heading="Card Action Head"
              helperText="Some helper text"
              leadingIcon={BellMediumIcon}
            />
            <CardAction
              onPress={() => console.log('Card action pressed')}
              heading="Card Action Head"
              leadingIcon={BellMediumIcon}
            />
            <CardAction
              onPress={() => console.log('Card action pressed')}
              heading="Card Action Head"
              helperText="Testing"
              leadingIcon={BellMediumIcon}
              iconContainer={false}
            />
          </CardActions>
        </Card>
      </Flex>
    );
  },
};

export const WithOnlyAction: Story = {
  args: {
    variant: 'emphasis',
  },
  render: ({ ...props }: CardStoryProps) => {
    return (
      <Card {...props} flexDirection="column" alignItems="stretch" spacing="md">
        <CardActions>
          <CardAction
            onPress={() => console.log('Card action pressed')}
            heading="Card Action Head"
            helperText="Some helper text"
            leadingIcon={BellMediumIcon}
          />
        </CardActions>
      </Card>
    );
  },
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant', 'colorScheme'] },
  },
  render: ({ children, ...props }: CardStoryProps) => {
    return (
      <Flex spacing="lg">
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
        <VariantTitle title="Brand - Subtle">
          <Card {...props} colorScheme="brand" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Brand - Emphasis">
          <Card {...props} colorScheme="brand" variant="emphasis">
            <BodyText inverted>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Energy - Subtle">
          <Card {...props} colorScheme="energy" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Energy - Emphasis">
          <Card {...props} colorScheme="energy" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Broadband - Subtle">
          <Card {...props} colorScheme="broadband" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Broadband - Emphasis">
          <Card {...props} colorScheme="broadband" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Mobile - Subtle">
          <Card {...props} colorScheme="mobile" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Mobile - Emphasis">
          <Card {...props} colorScheme="mobile" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Insurance - Subtle">
          <Card {...props} colorScheme="insurance" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Insurance - Emphasis">
          <Card {...props} colorScheme="insurance" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Cashback - Subtle">
          <Card {...props} colorScheme="cashback" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Cashback - Emphasis">
          <Card {...props} colorScheme="cashback" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Piggy - Subtle">
          <Card {...props} colorScheme="pig" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Piggy - Emphasis">
          <Card {...props} colorScheme="pig" variant="emphasis">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Highlight - Subtle">
          <Card {...props} colorScheme="highlight" variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
      </Flex>
    );
  },
};

export const WithShadow: Story = {
  args: {
    shadowColor: 'functional',
  },
  parameters: {
    controls: { exclude: ['variant'] },
  },
  render: ({ children, ...props }: CardStoryProps) => {
    return (
      <Flex spacing="lg">
        <VariantTitle title="Subtle - White - Shadow">
          <Card {...props} variant="subtle">
            <BodyText>{children as string}</BodyText>
          </Card>
        </VariantTitle>
        <VariantTitle title="Emphasis - White - Shadow">
          <Card {...props} variant="emphasis">
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
  render: ({ children, ...props }: CardStoryProps) => {
    return (
      <Flex spacing="lg">
        <VariantTitle title="Pressable - Subtle - White">
          <Card
            {...props}
            onPress={() => console.log('pressed')}
            variant="subtle"
            colorScheme="neutralStrong"
            spacing="md"
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
            spacing="md"
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
            spacing="md"
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
            spacing="md"
            flexDirection="column"
            alignItems="stretch"
          >
            <Heading size="md">Heading</Heading>
            <BodyText>{children as string}</BodyText>
            <CardPressHandler>
              <Button onPress={() => console.log('pressed')}>Press me</Button>
            </CardPressHandler>
          </Card>
        </VariantTitle>
      </Flex>
    );
  },
};
