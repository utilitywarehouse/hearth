import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  Box,
  Flex,
  DetailText,
  BodyText,
  Heading,
  Link,
  CardInteraction,
  Button,
  IconButton,
} from '@utilitywarehouse/hearth-react';
import {
  ChevronRightSmallIcon,
  CloseSmallIcon,
  HeartMediumIcon,
  HeartOutlineMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { Placeholder } from '../storybook-components/Placeholder';

const variants = ['emphasis', 'subtle'] as const;
const neutralColorSchemes = ['neutralStrong', 'neutralSubtle'] as const;
const brandColorSchemes = [
  'brand',
  'energy',
  'broadband',
  'mobile',
  'insurance',
  'cashback',
  'pig',
] as const;
const colorSchemes = [...neutralColorSchemes, 'highlight', ...brandColorSchemes] as const;

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
    as: { control: { type: 'radio' }, options: ['div', 'li'] },
  },
  args: {
    children: 'Maya Angelou was an American memoirist, poet, and civil rights activist.',
    variant: 'emphasis',
    colorScheme: 'neutralStrong',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const KitchenSink: Story = {
  render: ({ children }) => (
    <Flex padding="600" direction="column" gap="300" width="600px">
      <Flex direction="row" gap="300">
        {variants.map(variant => (
          <Flex gap="300" asChild direction="column">
            <ul role="list">
              {neutralColorSchemes.map(colorScheme => (
                <Card
                  key={`${variant}${colorScheme}`}
                  as="li"
                  variant={variant}
                  colorScheme={colorScheme}
                  justifyContent="center"
                  alignItems="center"
                >
                  <DetailText size="sm">{children}</DetailText>
                </Card>
              ))}
            </ul>
          </Flex>
        ))}
      </Flex>
      <Flex justifyContent="center">
        <Card
          as="li"
          variant="subtle"
          colorScheme="highlight"
          justifyContent="center"
          alignItems="center"
          width="50%"
        >
          <DetailText size="sm">{children}</DetailText>
        </Card>
      </Flex>
      <Flex direction="row" gap="300">
        {variants.map(variant => (
          <Flex gap="300" asChild direction="column">
            <ul role="list">
              {brandColorSchemes.map(colorScheme => (
                <Card
                  key={`${colorScheme}`}
                  as="li"
                  variant={variant}
                  colorScheme={colorScheme}
                  justifyContent="center"
                  alignItems="center"
                >
                  <DetailText
                    size="sm"
                    inverted={colorScheme === 'brand' && variant === 'emphasis'}
                  >
                    {children}
                  </DetailText>
                </Card>
              ))}
            </ul>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
};

export const Playground: Story = {
  render: ({ children, ...args }) => (
    <Flex padding="600" backgroundColor="warmWhite50" justifyContent="center">
      <Box width="300px">
        <Card {...args}>
          <DetailText
            size="sm"
            inverted={args.colorScheme === 'brand' && args.variant === 'emphasis'}
          >
            {children}
          </DetailText>
        </Card>
      </Box>
    </Flex>
  ),
};

export const InteractiveCards: Story = {
  render: () => {
    return (
      <Flex padding="600" gap="400" direction="column" alignItems="center">
        <Flex gap="300" width="800px" asChild>
          <ul role="list">
            <Card
              as="li"
              variant="emphasis"
              colorScheme="neutralStrong"
              flex="1"
              direction="column"
              gap="150"
            >
              <Heading size="sm">Neutral Card</Heading>
              <BodyText size="md">neutralStrong & emphasis</BodyText>
              <CardInteraction asChild>
                <Link href="#">
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </CardInteraction>
            </Card>
            <Card as="li" variant="subtle" colorScheme="neutralStrong" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Neutral Card</Heading>
                <BodyText size="md">neutralStrong & subtle</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="emphasis" colorScheme="neutralSubtle" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Neutral Card</Heading>
                <BodyText size="md">neutralSubtle & emphasis</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="subtle" colorScheme="neutralSubtle" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Neutral Card</Heading>
                <BodyText size="md">neutralSubtle & subtle</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
          </ul>
        </Flex>

        <Flex asChild gap="300" width="700px">
          <ul role="list">
            <Card as="li" variant="subtle" colorScheme="brand" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Brand Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="subtle" colorScheme="pig" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Pig Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="subtle" colorScheme="highlight" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Highlight Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
          </ul>
        </Flex>

        <Flex asChild gap="300" width="1000px">
          <ul role="list">
            <Card as="li" variant="subtle" colorScheme="energy" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Energy Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="subtle" colorScheme="mobile" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Mobile Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="subtle" colorScheme="broadband" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Broadband Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="subtle" colorScheme="insurance" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Insurance Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" variant="subtle" colorScheme="cashback" flex="1">
              <Flex direction="column" gap="150" justifyContent="between">
                <Heading size="sm">Cashback Card</Heading>
                <BodyText size="md">Content</BodyText>
                <CardInteraction asChild>
                  <Link href="#">
                    Link
                    <ChevronRightSmallIcon />
                  </Link>
                </CardInteraction>
              </Flex>
            </Card>
          </ul>
        </Flex>

        <Flex asChild direction="row" gap="200" width="1000px" alignItems="start">
          <ul role="list">
            <Card
              as="li"
              variant="emphasis"
              colorScheme="neutralStrong"
              flex="1"
              direction="column"
              gap="150"
              alignItems="start"
            >
              <Heading size="sm">This is a card with a single interaction</Heading>
              <BodyText size="md">
                The card itself doesn’t need to be clickable and the only interaction is with the
                interactive component nested within the card
              </BodyText>
              <Button variant="solid" colorScheme="highlight" onClick={() => console.log('hello')}>
                Button
              </Button>
            </Card>
            <Card
              as="li"
              variant="emphasis"
              colorScheme="neutralStrong"
              flex="1"
              direction="column"
              gap="150"
            >
              <Heading size="sm">This whole card is clickable</Heading>
              <BodyText size="md">
                This whole card is tappable/clickable but the state is applied to the interactive
                component
              </BodyText>
              <CardInteraction>
                <Button
                  variant="solid"
                  colorScheme="highlight"
                  onClick={() => console.log('hello')}
                >
                  Button
                </Button>
              </CardInteraction>
            </Card>
            <Card
              as="li"
              variant="emphasis"
              colorScheme="neutralStrong"
              flex="1"
              direction="column"
              gap="150"
            >
              <Flex alignItems="center" justifyContent="between">
                <Heading size="sm">This is a card with multiple interactions</Heading>
                <CardInteraction secondary>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    label="close"
                    onClick={() => console.log('close')}
                  >
                    <CloseSmallIcon />
                  </IconButton>
                </CardInteraction>
              </Flex>
              <BodyText size="md">
                The components within the card are interactive component
              </BodyText>
              <CardInteraction>
                <Button
                  variant="solid"
                  colorScheme="highlight"
                  onClick={() => console.log('action')}
                >
                  Button
                </Button>
              </CardInteraction>
            </Card>
          </ul>
        </Flex>
      </Flex>
    );
  },
};

export const WithoutLink: Story = {
  render: () => {
    const [likedArgos, setLikedArgos] = React.useState(false);
    const [likedAskItalian, setLikedAskItalian] = React.useState(false);
    return (
      <Flex padding="600" backgroundColor="warmWhite50" justifyContent="center" gap="400">
        <Flex asChild gap="400" width="400px">
          <ul role="list">
            <Card as="li" direction="column" flex="1" justifyContent="center" gap="300">
              <Flex justifyContent="between" alignItems="center">
                <DetailText>5%</DetailText>
                <CardInteraction secondary>
                  <IconButton
                    label="like"
                    variant="ghost"
                    colorScheme="destructive"
                    onClick={() => setLikedArgos(likedArgos => !likedArgos)}
                  >
                    {likedArgos ? <HeartMediumIcon /> : <HeartOutlineMediumIcon />}
                  </IconButton>
                </CardInteraction>
              </Flex>
              <Flex direction="column" alignItems="center" gap="200">
                <Placeholder width="100px" height="50px" />
                <BodyText size="md" id="title-argos">
                  Argos
                </BodyText>
                <CardInteraction>
                  <Link href="https://www.argos.co.uk/" aria-labelledby="title-argos" />
                </CardInteraction>
              </Flex>
            </Card>
            <Card as="li" direction="column" flex="1" justifyContent="center" gap="300">
              <Flex justifyContent="between" alignItems="center">
                <DetailText>5%</DetailText>
                <CardInteraction secondary>
                  <IconButton
                    label="like"
                    variant="ghost"
                    colorScheme="destructive"
                    onClick={() => setLikedAskItalian(likedAskItalian => !likedAskItalian)}
                  >
                    {likedAskItalian ? <HeartMediumIcon /> : <HeartOutlineMediumIcon />}
                  </IconButton>
                </CardInteraction>
              </Flex>
              <Flex direction="column" alignItems="center" gap="200">
                <Placeholder width="100px" height="50px" />
                <BodyText size="md" id="title-askitalian">
                  Ask Italian
                </BodyText>
                <CardAction>
                  <Link href="https://www.askitalian.co.uk/" aria-labelledby="title-askitalian" />
                </CardAction>
              </Flex>
            </Card>
          </ul>
        </Flex>
      </Flex>
    );
  },
};
