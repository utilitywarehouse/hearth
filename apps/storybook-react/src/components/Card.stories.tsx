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
  CardActionLink,
  CardActionButton,
  CardActions,
  Button,
  IconButton,
  Badge,
  CardContent,
  CardBannerContent,
  CardBannerImage,
  UnstyledIconButton,
  IconContainer,
} from '@utilitywarehouse/hearth-react';
import piggies from '../assets/piggies.png';
import SpotSmartMeter from '@utilitywarehouse/hearth-svg-assets/lib/spot-smart-meter-light.svg';
import SpotSavings from '@utilitywarehouse/hearth-svg-assets/lib/spot-savings-light.svg';
import {
  PlaceholderSmallIcon,
  ChevronRightSmallIcon,
  CloseSmallIcon,
  DownloadSmallIcon,
  ElectricityMediumIcon,
  EmailSmallIcon,
  HeartMediumIcon,
  HeartOutlineMediumIcon,
  HomeAndBoilerMediumIcon,
  HomeInsuranceMediumIcon,
  OpenSmallIcon,
  TickCircleSmallIcon,
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
const shadowColors = [
  'brand',
  'energy',
  'broadband',
  'mobile',
  'insurance',
  'cashback',
  'pig',
  'functional',
] as const;

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
    shadowColor: { control: { type: 'radio' }, options: shadowColors },
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
                <li>
                  <Card
                    key={`${variant}${colorScheme}`}
                    variant={variant}
                    colorScheme={colorScheme}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <DetailText size="sm">{children}</DetailText>
                  </Card>
                </li>
              ))}
            </ul>
          </Flex>
        ))}
      </Flex>
      <Flex justifyContent="center">
        <Card
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
                <li>
                  <Card
                    key={`${colorScheme}`}
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
                </li>
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
    <Card {...args} width="400px" marginInline="auto">
      <BodyText size="md">{children}</BodyText>
    </Card>
  ),
};

export const ShadowColours: Story = {
  render: ({ children, ...args }) => (
    <Flex gap="400" padding="400" wrap="wrap">
      {shadowColors.map(c => (
        <Card {...args} width="300px" shadowColor={c}>
          <BodyText size="md">{children}</BodyText>
        </Card>
      ))}
    </Flex>
  ),
};

export const InteractiveCards: Story = {
  render: () => {
    return (
      <Flex padding="600" gap="400" direction="column" alignItems="center">
        <Flex gap="300" width="800px" asChild>
          <ul role="list">
            <li>
              <Card
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
            </li>
            <li>
              <Card variant="subtle" colorScheme="neutralStrong" flex="1">
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
            </li>
            <li>
              <Card variant="emphasis" colorScheme="neutralSubtle" flex="1">
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
            </li>
            <li>
              <Card variant="subtle" colorScheme="neutralSubtle" flex="1">
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
            </li>
          </ul>
        </Flex>

        <Flex asChild gap="300" width="700px">
          <ul role="list">
            <li>
              <Card variant="subtle" colorScheme="brand" flex="1">
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
            </li>
            <li>
              <Card variant="subtle" colorScheme="pig" flex="1">
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
            </li>{' '}
            <li>
              <Card variant="subtle" colorScheme="highlight" flex="1">
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
            </li>
          </ul>
        </Flex>

        <Flex asChild gap="300" width="1000px">
          <ul role="list">
            <li>
              <Card variant="subtle" colorScheme="energy" flex="1">
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
            </li>
            <li>
              <Card variant="subtle" colorScheme="mobile" flex="1">
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
            </li>
            <li>
              <Card variant="subtle" colorScheme="broadband" flex="1">
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
            </li>
            <li>
              <Card variant="subtle" colorScheme="insurance" flex="1">
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
            </li>
            <li>
              <Card variant="subtle" colorScheme="cashback" flex="1">
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
            </li>
          </ul>
        </Flex>

        <Flex asChild direction="row" gap="200" width="1000px" alignItems="start">
          <ul role="list">
            <li>
              <Card
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
                <Button
                  variant="solid"
                  colorScheme="highlight"
                  onClick={() => console.log('hello')}
                >
                  Button
                </Button>
              </Card>
            </li>
            <li>
              <Card
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
            </li>
            <li>
              <Card
                variant="emphasis"
                colorScheme="neutralStrong"
                flex="1"
                direction="column"
                gap="150"
              >
                <Flex alignItems="start" justifyContent="between">
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
            </li>
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
      <Flex padding="600" backgroundColor="primary" justifyContent="center" gap="400">
        <Flex asChild gap="400" width="400px">
          <ul role="list">
            <li>
              <Card direction="column" flex="1" justifyContent="center" gap="300">
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
            </li>
            <li>
              <Card direction="column" flex="1" justifyContent="center" gap="300">
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
                  <CardInteraction>
                    <Link href="https://www.askitalian.co.uk/" aria-labelledby="title-askitalian" />
                  </CardInteraction>
                </Flex>
              </Card>
            </li>
          </ul>
        </Flex>
      </Flex>
    );
  },
};

export const SingleCardActionLink: Story = {
  render: args => (
    <Flex padding="500" direction="row" gap="500" backgroundColor="secondary" wrap="wrap">
      <Card {...args}>
        <CardActionLink
          heading="Electricity"
          helperText="Last reading: 30th Oct"
          leadingIcon={<ElectricityMediumIcon />}
          leadingIconContainerColorScheme="energy"
          badge={
            <Badge colorScheme="info" size="sm">
              Smart meter
            </Badge>
          }
          badgePlacement="middle"
          href="#"
        />
      </Card>
      <Card {...args}>
        <CardActionLink
          heading="Home Insurance"
          helperText="B12ABCD38"
          leadingIcon={<HomeInsuranceMediumIcon />}
          badge={
            <Badge variant="outline" colorScheme="functional" size="sm">
              Disconnected
            </Badge>
          }
          badgePlacement="bottom"
          href="#"
        />
      </Card>
      <Card {...args}>
        <CardActionLink
          heading="Card Action"
          helperText="With badge to the right"
          badge={
            <Badge variant="subtle" colorScheme="positive" size="sm">
              Live
            </Badge>
          }
          badgePlacement="right"
          href="#"
        />
      </Card>
    </Flex>
  ),
};

export const SingleCardActionButton: Story = {
  render: args => (
    <Flex padding="500" direction="row" gap="500" backgroundColor="secondary" wrap="wrap">
      <Card {...args}>
        <CardActionButton
          heading="Electricity"
          helperText="Last reading: 30th Oct"
          leadingIcon={<ElectricityMediumIcon />}
          leadingIconContainerColorScheme="energy"
          badge={
            <Badge colorScheme="info" size="sm">
              Smart meter
            </Badge>
          }
          badgePlacement="middle"
        />
      </Card>
      <Card {...args}>
        <CardActionButton
          heading="Home Insurance"
          helperText="B12ABCD38"
          leadingIcon={<HomeInsuranceMediumIcon />}
          badge={
            <Badge variant="outline" colorScheme="functional" size="sm">
              Disconnected
            </Badge>
          }
          badgePlacement="bottom"
        />
      </Card>
      <Card {...args}>
        <CardActionButton
          heading="Card Action"
          helperText="With badge to the right"
          badge={
            <Badge variant="subtle" colorScheme="positive" size="sm">
              Live
            </Badge>
          }
          badgePlacement="right"
        />
      </Card>
    </Flex>
  ),
};

export const WithOnlyCardActions: Story = {
  render: args => (
    <Card {...args} width="500px">
      <CardActions direction="column">
        <CardActionButton
          leadingIcon={<HomeInsuranceMediumIcon />}
          leadingIconContainerColorScheme="insurance"
          heading="Home insurance"
          helperText="B12ABCD34"
          badge={
            <Badge size="sm" colorScheme="positive">
              Live
            </Badge>
          }
          badgePlacement="right"
        />
        <CardActionButton
          leadingIcon={<HomeAndBoilerMediumIcon />}
          leadingIconContainerColorScheme="insurance"
          heading="Boiler & home cover"
          helperText="B12ABCD37"
          badge={
            <Badge size="sm" colorScheme="positive">
              Live
            </Badge>
          }
          badgePlacement="right"
        />
      </CardActions>
    </Card>
  ),
};

export const WithCardActions: Story = {
  render: args => (
    <Flex padding="500" direction="row" gap="500" backgroundColor="secondary" wrap="wrap">
      <Card {...args}>
        <CardContent direction="column" spacing="lg">
          <Heading size="md" as="h2">
            Your December bill
          </Heading>

          <Flex direction="column" spacing="sm">
            <DetailText size="4xl">£110.00</DetailText>
            <Flex gap="50" alignItems="center">
              <TickCircleSmallIcon />
              <BodyText size="md">Your Direct Debit is ready to go</BodyText>
            </Flex>
          </Flex>
        </CardContent>
        <CardActions direction="column">
          <CardActionButton heading="Download PDF" trailingIcon={<DownloadSmallIcon />} />
          <CardActionButton heading="Open PDF" trailingIcon={<OpenSmallIcon />} />
          <CardActionButton heading="Email PDF" trailingIcon={<EmailSmallIcon />} />
        </CardActions>
      </Card>
      <Card {...args}>
        <CardContent direction="column" spacing="lg">
          <Heading size="md" as="h2">
            Your December bill
          </Heading>

          <Flex direction="column" spacing="sm">
            <DetailText size="4xl">£110.00</DetailText>
            <Flex gap="50" alignItems="center">
              <TickCircleSmallIcon />
              <BodyText size="md">Your Direct Debit is ready to go</BodyText>
            </Flex>
          </Flex>
        </CardContent>
        <CardActions direction="row">
          <CardActionButton heading="Download PDF" trailingIcon={<DownloadSmallIcon />} />
          <CardActionButton heading="Open PDF" trailingIcon={<OpenSmallIcon />} />
          <CardActionButton heading="Email PDF" trailingIcon={<EmailSmallIcon />} />
        </CardActions>
      </Card>
    </Flex>
  ),
};

export const BannerContent: Story = {
  render: () => (
    <Card spacing="lg" justifyContent="between">
      <CardBannerContent heading="This is a banner heading" description="Put your description here">
        <Link href="#">
          Link
          <ChevronRightSmallIcon />
        </Link>
      </CardBannerContent>

      <UnstyledIconButton label="close">
        <CloseSmallIcon />
      </UnstyledIconButton>
    </Card>
  ),
};

export const BannerWithIconContainer: Story = {
  render: () => (
    <Flex gap="400">
      <Card spacing="md">
        <IconContainer colorScheme="pig">
          <PlaceholderSmallIcon />
        </IconContainer>
        <CardBannerContent
          heading="This is a banner heading"
          description="Put your description here"
        >
          <Link href="#">
            Link
            <ChevronRightSmallIcon />
          </Link>
        </CardBannerContent>
        <UnstyledIconButton label="close">
          <CloseSmallIcon />
        </UnstyledIconButton>
      </Card>
      <Card spacing="lg">
        <Flex spacing="lg" direction="column" alignItems="start">
          <IconContainer colorScheme="pig">
            <PlaceholderSmallIcon />
          </IconContainer>
          <CardBannerContent
            heading="This is a banner heading"
            description="Put your description here"
          >
            <Link href="#">
              Link
              <ChevronRightSmallIcon />
            </Link>
          </CardBannerContent>
        </Flex>
        <UnstyledIconButton label="close">
          <CloseSmallIcon />
        </UnstyledIconButton>
      </Card>
    </Flex>
  ),
};

export const BannerWithImage: Story = {
  render: () => (
    <Flex gap="400">
      <Card spacing="md" maxWidth="420px">
        <CardBannerImage width="160px" height="174px">
          <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </CardBannerImage>
        <CardBannerContent
          heading="Save a bundle"
          description="Homeowners who bundle two or more services with UW and activate the Cashback Card trial will receive up to £150 in credit."
        />
      </Card>
      <Card spacing="lg" direction="column" alignItems="start" maxWidth="300px">
        <CardBannerImage height="160px">
          <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </CardBannerImage>
        <CardBannerContent
          heading="Save a bundle"
          description="Our network of friendly, local Partners can help you find ways to save."
        >
          <Link href="#">
            Find a UW Partner
            <ChevronRightSmallIcon />
          </Link>
        </CardBannerContent>
      </Card>
    </Flex>
  ),
};

export const BannerWithIllustration: Story = {
  render: () => (
    <Flex gap="400">
      <Card spacing="lg" colorScheme="pig" variant="subtle" alignItems="center" width="450px">
        <img src={SpotSavings} alt="Savings Pig" width={80} />

        <CardBannerContent
          heading="Save money on your household bills when you get it together"
          description="Our network of friendly, local Partners can help you find ways to save."
        >
          <Link href="#">
            Find a UW Partner
            <ChevronRightSmallIcon />
          </Link>
        </CardBannerContent>
      </Card>
      <Card
        spacing="lg"
        direction="column"
        alignItems="center"
        maxWidth="300px"
        colorScheme="energy"
        variant="subtle"
      >
        <Flex width="100%" position="relative" justifyContent="center">
          <img src={SpotSmartMeter} alt="Billing Pig" width={80} />
          <Box position="absolute" top="0" right="0">
            <UnstyledIconButton label="close">
              <CloseSmallIcon />
            </UnstyledIconButton>
          </Box>
        </Flex>
        <CardBannerContent
          heading="Save a bundle"
          description="Our network of friendly, local Partners can help you find ways to save."
          textAlign="center"
          alignItems="center"
        >
          <Link href="#">
            Find a UW Partner
            <ChevronRightSmallIcon />
          </Link>
        </CardBannerContent>
      </Card>
    </Flex>
  ),
};
