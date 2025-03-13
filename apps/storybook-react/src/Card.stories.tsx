import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  Box,
  Flex,
  DetailText,
  BodyText,
  Heading,
  Link,
  CardAction,
  Button,
  IconButton,
} from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon, CloseSmallIcon } from '@utilitywarehouse/react-icons';

const variants = ['emphasis', 'subtle'] as const;
const whiteColorSchemes = ['white', 'warmWhite'];
const nonWhiteColorSchemes = [
  'purple',
  'energyGreen',
  'broadbandBlue',
  'mobileRose',
  'insuranceOrange',
  'cashbackLilac',
] as const;
const colorSchemes = [...whiteColorSchemes, ...nonWhiteColorSchemes] as const;

const meta: Meta<typeof Card> = {
  title: 'Stories / Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Use Cards as containers for concise information about a single subject. They can display featured information, related content, or navigational choices. In groups, cards present collections of similar content.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: variants },
    colorScheme: { control: { type: 'radio' }, options: colorSchemes },
    paddingNone: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Maya Angelou was an American memoirist, poet, and civil rights activist.',
    variant: 'emphasis',
    colorScheme: 'white',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const KitchenSink: Story = {
  render: ({ children }) => (
    <Flex padding="600" backgroundColor="warmWhite50" direction="column" gap="300">
      {variants.map(variant => (
        <Flex gap="300" width="600px">
          {whiteColorSchemes.map(colorScheme => (
            <Card
              key={`${variant}${colorScheme}`}
              variant={variant}
              colorScheme={colorScheme}
              justify="center"
              align="center"
            >
              <DetailText size="sm">{children}</DetailText>
            </Card>
          ))}
        </Flex>
      ))}
      <Flex gap="300">
        {nonWhiteColorSchemes.map(colorScheme => (
          <Card
            key={`${colorScheme}`}
            variant="emphasis"
            colorScheme={colorScheme}
            justify="center"
            align="center"
          >
            <DetailText size="sm" style={{ color: colorScheme === 'purple' ? 'white' : undefined }}>
              {children}
            </DetailText>
          </Card>
        ))}
      </Flex>
    </Flex>
  ),
};

export const Playground: Story = {
  render: ({ children, ...args }) => (
    <Flex padding="600" backgroundColor="warmWhite50" justify="center">
      <Box width="300px">
        <Card {...args}>
          <DetailText size="sm">{children}</DetailText>
        </Card>
      </Box>
    </Flex>
  ),
};

export const InteractiveCards: Story = {
  render: () => {
    return (
      <Flex padding="600" gap="400" direction="column">
        <Flex gap="300" width="800px">
          <Card variant="emphasis" colorScheme="white" flex="1" direction="column" gap="150">
            <Heading size="sm">White Emphasis Card</Heading>
            <BodyText size="md">Content...</BodyText>
            <CardAction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardAction>
          </Card>
          <Card variant="subtle" colorScheme="white" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">White Subtle Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <CardAction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardAction>
            </Flex>
          </Card>
          <Card variant="emphasis" colorScheme="warmWhite" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Warm White Emphasis Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <CardAction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardAction>
            </Flex>
          </Card>
          <Card variant="subtle" colorScheme="warmWhite" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Warm White Subtle Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <CardAction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardAction>
            </Flex>
          </Card>
        </Flex>

        <Flex gap="300" width="800px">
          <Card variant="emphasis" colorScheme="energyGreen" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Energy Green Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <CardAction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardAction>
            </Flex>
          </Card>
          <Card variant="emphasis" colorScheme="mobileRose" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Mobile Rose Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <CardAction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardAction>
            </Flex>
          </Card>
          <Card variant="emphasis" colorScheme="broadbandBlue" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Broadband Blue Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <CardAction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardAction>
            </Flex>
          </Card>
          <Card variant="emphasis" colorScheme="insuranceOrange" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Insurance Orange Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <CardAction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardAction>
            </Flex>
          </Card>
        </Flex>

        <Flex gap="300" width="800px">
          <Card variant="emphasis" colorScheme="white" flex="1" direction="column" gap="150">
            <Heading size="sm">This is a card with a single interaction</Heading>
            <BodyText size="md">
              This whole card is tappable/clickable but the state is applied to the interactive
              component
            </BodyText>
            <CardAction>
              <Button variant="solid" colorScheme="yellow" onClick={() => console.log('hello')}>
                Button
              </Button>
            </CardAction>
          </Card>
          <Card
            variant="emphasis"
            colorScheme="broadbandBlue"
            flex="1"
            direction="column"
            gap="150"
          >
            <Heading size="sm">This is a card with a single interaction</Heading>
            <BodyText size="md">
              This whole card is tappable/clickable but the state is applied to the interactive
              component
            </BodyText>
            <CardAction>
              <Button variant="outline" colorScheme="grey" onClick={() => console.log('hello')}>
                Button
              </Button>
            </CardAction>
          </Card>
        </Flex>
        <Flex gap="300" width="800px">
          <Card variant="emphasis" colorScheme="white" flex="1" direction="column" gap="150">
            <Flex align="start">
              <Heading size="sm">This is a card with multiple interactions</Heading>
              <CardAction secondary>
                <IconButton
                  variant="ghost"
                  size="sm"
                  label="close"
                  onClick={() => console.log('close')}
                >
                  <CloseSmallIcon />
                </IconButton>
              </CardAction>
            </Flex>
            <BodyText size="md">The components within the card are interactive component</BodyText>
            <CardAction>
              <Button variant="solid" colorScheme="yellow" onClick={() => console.log('action')}>
                Button
              </Button>
            </CardAction>
          </Card>
          <Card
            variant="emphasis"
            colorScheme="broadbandBlue"
            flex="1"
            direction="column"
            gap="150"
          >
            <Flex align="start">
              <Heading size="sm">This is a card with multiple interactions</Heading>
              <CardAction secondary>
                <IconButton
                  variant="ghost"
                  size="sm"
                  label="close"
                  onClick={() => console.log('close')}
                >
                  <CloseSmallIcon />
                </IconButton>
              </CardAction>
            </Flex>
            <BodyText size="md">The components within the card are interactive component</BodyText>
            <CardAction>
              <Button variant="outline" colorScheme="grey" onClick={() => console.log('action')}>
                Button
              </Button>
            </CardAction>
          </Card>
        </Flex>
      </Flex>
    );
  },
};
