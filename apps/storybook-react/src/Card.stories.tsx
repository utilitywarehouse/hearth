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
const colorSchemes = [
  'white',
  'warmWhite',
  'purple',
  'energyGreen',
  'broadbandBlue',
  'mobileRose',
  'insuranceOrange',
  'cashbackLilac',
] as const;
const paddingValues = ['lg', 'md', 'sm', 'none'] as const;

const meta: Meta<typeof Card> = {
  title: 'Stories / Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Links are used to navigate a user to another page or website, another place on the same page, or to open a link in a new tab.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: variants },
    colorScheme: { control: { type: 'radio' }, options: colorSchemes },
    padding: { control: { type: 'radio' }, options: paddingValues },
    selectable: { control: { type: 'boolean' } },
  },
  args: {
    children:
      'Agnes Bernice Martin was an American abstract painter known for her minimalist style.',
    variant: 'emphasis',
    colorScheme: 'white',
    padding: 'lg',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const KitchenSink: Story = {
  render: ({ children }) => (
    <Flex padding="600" backgroundColor="warmWhite50" direction="column" gap="300">
      {variants.map(variant => (
        <Flex direction="column" gap="300">
          {['white', 'warmWhite'].map(colorScheme => (
            <Flex gap="300" align="center">
              {paddingValues.map(padding => (
                <Card
                  key={`${variant}${colorScheme}${padding}`}
                  variant={variant}
                  colorScheme={colorScheme}
                  padding={padding}
                  justify="center"
                  align="center"
                >
                  <DetailText
                    size="sm"
                    // inverted={colorScheme === 'purple'}
                    style={{ color: colorScheme === 'purple' ? 'white' : undefined }}
                  >
                    {children}
                  </DetailText>
                </Card>
              ))}
            </Flex>
          ))}
        </Flex>
      ))}
      <Flex direction="column" gap="300">
        {[
          'purple',
          'energyGreen',
          'broadbandBlue',
          'mobileRose',
          'insuranceOrange',
          'cashbackLilac',
        ].map(colorScheme => (
          <Flex gap="300" align="center">
            {paddingValues.map(padding => (
              <Card
                key={`${colorScheme}${padding}`}
                variant="emphasis"
                colorScheme={colorScheme}
                padding={padding}
                justify="center"
                align="center"
              >
                <DetailText
                  size="sm"
                  // inverted={colorScheme === 'purple'}
                  style={{ color: colorScheme === 'purple' ? 'white' : undefined }}
                >
                  {children}
                </DetailText>
              </Card>
            ))}
          </Flex>
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
          <Card
            variant="emphasis"
            colorScheme="white"
            padding="lg"
            flex="1"
            direction="column"
            gap="150"
          >
            <Heading size="sm">White Emphasis Card</Heading>
            <BodyText size="md">Content...</BodyText>
            <CardAction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardAction>
          </Card>
          <Card variant="subtle" colorScheme="white" padding="lg" flex="1">
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
          <Card variant="emphasis" colorScheme="warmWhite" padding="lg" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Warm White Emphasis Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </Flex>
          </Card>
          <Card variant="subtle" colorScheme="warmWhite" padding="lg" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Warm White Subtle Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </Flex>
          </Card>
        </Flex>

        <Flex gap="300" width="800px">
          <Card variant="emphasis" colorScheme="energyGreen" padding="lg" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Energy Green Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </Flex>
          </Card>
          <Card variant="emphasis" colorScheme="mobileRose" padding="lg" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Mobile Rose Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </Flex>
          </Card>
          <Card variant="emphasis" colorScheme="broadbandBlue" padding="lg" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Broadband Blue Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </Flex>
          </Card>
          <Card variant="emphasis" colorScheme="insuranceOrange" padding="lg" flex="1">
            <Flex direction="column" gap="150">
              <Heading size="sm">Insurance Orange Card</Heading>
              <BodyText size="md">Content...</BodyText>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </Flex>
          </Card>
        </Flex>

        <Flex gap="300" width="800px">
          <Card
            variant="emphasis"
            colorScheme="white"
            padding="lg"
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
              <Button variant="solid" colorScheme="yellow" onClick={() => console.log('hello')}>
                Button
              </Button>
            </CardAction>
          </Card>
          <Card
            variant="emphasis"
            colorScheme="broadbandBlue"
            padding="lg"
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
          <Card
            variant="emphasis"
            colorScheme="white"
            padding="lg"
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
              <Button variant="solid" colorScheme="yellow" onClick={() => console.log('action')}>
                Button
              </Button>
            </CardAction>
          </Card>
          <Card
            variant="emphasis"
            colorScheme="broadbandBlue"
            padding="lg"
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
