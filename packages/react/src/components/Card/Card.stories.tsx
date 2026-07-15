import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { CardActionButton } from '../CardActions/CardActionButton';
import { CardActionLink } from '../CardActions/CardActionLink';
import { CardActions } from '../CardActions/CardActions';
import { Container } from '../Container/Container';
import { DetailText } from '../DetailText/DetailText';
import { Flex } from '../Flex/Flex';
import { Grid } from '../Grid/Grid';
import { Heading } from '../Heading/Heading';
import { IconButton } from '../IconButton/IconButton';
import { IconContainer } from '../IconContainer/IconContainer';
import { Link } from '../Link/Link';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { Card } from './Card';
import { CardBannerContent } from './CardBannerContent';
import { CardBannerImage } from './CardBannerImage';
import { CardContent } from './CardContent';
import { CardInteraction } from './CardInteraction';
import piggies from '../../../docs/assets/piggies.png';
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
  MobileMediumIcon,
  CashbackCardMediumIcon,
  InfoMediumIcon,
  CalendarMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { Placeholder } from '../../../docs/storybook-components/Placeholder';

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
  title: 'Components / Card',
  component: Card,
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: variants },
    colorScheme: { control: { type: 'radio' }, options: colorSchemes },
    shadowColor: { control: { type: 'radio' }, options: shadowColors },
    paddingNone: { control: { type: 'boolean' } },
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
          <Flex key={variant} gap="300" asChild direction="column">
            <ul role="list">
              {neutralColorSchemes.map(colorScheme => (
                <li key={`${variant}${colorScheme}`}>
                  <Card
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
          <Flex key={variant} gap="300" asChild direction="column">
            <ul role="list">
              {brandColorSchemes.map(colorScheme => (
                <li key={`${variant}${colorScheme}`}>
                  <Card
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
    <Card {...args} width="400px" marginX="auto">
      <BodyText size="md">{children}</BodyText>
    </Card>
  ),
};

export const Variant: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex gap="400" padding="400" wrap="wrap">
      {variants.map(variant => (
        <Card key={variant} variant={variant} colorScheme="neutralStrong" width="300px">
          <BodyText size="md">
            <strong>{variant}</strong>
          </BodyText>
        </Card>
      ))}
    </Flex>
  ),
};

export const ColorScheme: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400" padding="400">
      {colorSchemes.map(colorScheme => (
        <Flex key={colorScheme} gap="400">
          {variants.flatMap(variant => {
            if (colorScheme === 'highlight' && variant === 'emphasis') return [];
            return (
              <Card key={variant} colorScheme={colorScheme} variant={variant} width="300px">
                <BodyText
                  size="md"
                  color={colorScheme === 'brand' && variant === 'emphasis' ? 'inverted' : undefined}
                >
                  <strong>
                    {colorScheme} / {variant}
                  </strong>
                </BodyText>
              </Card>
            );
          })}
        </Flex>
      ))}
    </Flex>
  ),
};

export const ShadowColours: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    options: { selectedPanel: 'storybook/a11y/panel' },
  },
  args: {
    width: '300px',
    direction: 'column',
    gap: '150',
  },
  render: ({ children, ...args }) => (
    <Flex gap="400" padding="400" wrap="wrap">
      {shadowColors.map(c => (
        <Card {...args} key={c} shadowColor={c}>
          <BodyText size="md">{children}</BodyText>
          <CardInteraction asChild>
            <Link href="https://en.wikipedia.org/wiki/Maya_Angelou" target="_blank">
              Learn more
            </Link>
          </CardInteraction>
        </Card>
      ))}
    </Flex>
  ),
};

export const InteractiveCards: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    options: { showPanel: false },
  },
  render: args => {
    return (
      <Flex padding="600" gap="400" direction="column" alignItems="start" width="700px">
        <Flex asChild gap="300" wrap="wrap">
          <ul role="list">
            <li>
              <Card
                {...args}
                variant="emphasis"
                colorScheme="neutralStrong"
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
              <Card {...args} variant="subtle" colorScheme="neutralStrong">
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
              <Card {...args} variant="emphasis" colorScheme="neutralSubtle">
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
              <Card {...args} variant="subtle" colorScheme="neutralSubtle">
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

        <Flex asChild gap="300" wrap="wrap">
          <ul role="list">
            <li>
              <Card {...args} variant="subtle" colorScheme="brand">
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
              <Card {...args} variant="subtle" colorScheme="pig">
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
            </li>

            <li>
              <Card {...args} variant="subtle" colorScheme="highlight">
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

        <Flex asChild gap="300" wrap="wrap">
          <ul role="list">
            <li>
              <Card {...args} variant="subtle" colorScheme="energy">
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
              <Card {...args} variant="subtle" colorScheme="mobile">
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
              <Card {...args} variant="subtle" colorScheme="broadband">
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
              <Card {...args} variant="subtle" colorScheme="insurance">
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
              <Card {...args} variant="subtle" colorScheme="cashback">
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

        <Flex asChild direction="row" gap="200" wrap="wrap">
          <ul role="list">
            <li>
              <Card
                {...args}
                variant="emphasis"
                colorScheme="neutralStrong"
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
                {...args}
                variant="emphasis"
                colorScheme="neutralStrong"
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
                {...args}
                variant="emphasis"
                colorScheme="neutralStrong"
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
    const [likedArgos, setLikedArgos] = useState(false);
    const [likedAskItalian, setLikedAskItalian] = useState(false);
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
          disabled
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
    <Flex padding="500" direction="column" gap="500" backgroundColor="secondary" wrap="wrap">
      <Card {...args} width="fit-content">
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
          <CardActionButton heading="Email PDF" trailingIcon={<EmailSmallIcon />} disabled />
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
        <CardActions direction={{ mobile: 'column', tablet: 'row' }}>
          <CardActionButton heading="Download PDF" trailingIcon={<DownloadSmallIcon />} />
          <CardActionButton heading="Open PDF" trailingIcon={<OpenSmallIcon />} />
          <CardActionButton heading="Email PDF" trailingIcon={<EmailSmallIcon />} disabled />
        </CardActions>
      </Card>
    </Flex>
  ),
};

export const ConditionalCardActions: Story = {
  render: () => {
    const [toggleElement, setToggleElement] = useState(false);

    const handleButtonClick = () => {
      setToggleElement(!toggleElement);
    };

    return (
      <Flex gap="200" direction="column">
        <Card width="100%" shadowColor="functional">
          <CardContent direction="column" spacing="md">
            <Heading size="md">Test Card</Heading>
            <BodyText>This is a test card using CardActionLink</BodyText>
          </CardContent>
          <CardInteraction margin="200">
            <Button variant="solid" onClick={handleButtonClick}>
              Toggle Element
            </Button>
          </CardInteraction>
          <CardActions direction={{ mobile: 'column', desktop: 'row' }}>
            <CardActionLink
              target="_blank"
              heading="What to expect on the day"
              href="/broadband"
              leadingIcon={<InfoMediumIcon />}
              leadingIconContainerColorScheme="broadband"
            />
            {!toggleElement ? (
              <CardActionLink
                heading="Change appointment"
                href="/broadband"
                leadingIcon={<CalendarMediumIcon />}
                leadingIconContainerColorScheme="broadband"
              />
            ) : null}
          </CardActions>
        </Card>
        <Card width="100%" shadowColor="functional">
          <CardContent direction="column" spacing="md">
            <Heading size="md">Test Card</Heading>
            <BodyText>This is a test card using CardActionButton</BodyText>
          </CardContent>
          <CardInteraction margin="200">
            <Button variant="solid" onClick={handleButtonClick}>
              Toggle Element
            </Button>
          </CardInteraction>
          <CardActions direction={{ mobile: 'column', desktop: 'row' }}>
            <CardActionButton
              heading="What to expect on the day"
              leadingIcon={<InfoMediumIcon />}
              leadingIconContainerColorScheme="broadband"
            />
            {!toggleElement ? (
              <CardActionButton
                heading="Change appointment"
                leadingIcon={<CalendarMediumIcon />}
                leadingIconContainerColorScheme="broadband"
              />
            ) : null}
          </CardActions>
        </Card>
      </Flex>
    );
  },
};

export const InteractiveServiceCards: Story = {
  render: () => (
    <Container>
      <Grid columns={{ mobile: '1', tablet: '2' }} gap="300">
        <Card paddingNone shadowColor="energy">
          <Flex spacing="lg">
            <IconContainer colorScheme="energy" fill="height" borderRadius="none">
              <ElectricityMediumIcon />
            </IconContainer>
            <Flex direction="column" spacing="sm" padding="200" paddingLeft="0">
              <Heading size="md" as="h3">
                Energy
              </Heading>
              <CardInteraction asChild>
                <Link href="#">
                  View energy info
                  <ChevronRightSmallIcon />
                </Link>
              </CardInteraction>
            </Flex>
          </Flex>
        </Card>
        <Card paddingNone shadowColor="mobile">
          <Flex spacing="lg">
            <IconContainer colorScheme="mobile" fill="height" borderRadius="none">
              <MobileMediumIcon />
            </IconContainer>
            <Flex direction="column" spacing="sm" padding="200" paddingLeft="0">
              <Heading size="md" as="h3">
                Mobile
              </Heading>
              <CardInteraction asChild>
                <Link href="#">
                  View mobile plan
                  <ChevronRightSmallIcon />
                </Link>
              </CardInteraction>
            </Flex>
          </Flex>
        </Card>
        <Card paddingNone shadowColor="cashback" gridColumnSpan={{ mobile: '1', tablet: '2' }}>
          <Flex spacing="lg" width="100%">
            <IconContainer colorScheme="cashback" fill="height" borderRadius="none">
              <CashbackCardMediumIcon />
            </IconContainer>
            <Flex
              direction={{ mobile: 'column', tablet: 'row' }}
              spacing="sm"
              padding="200"
              paddingLeft="0"
              width="100%"
            >
              <Flex direction="column" flex="1">
                <Heading size="md" as="h3">
                  Cashback
                </Heading>
                <Flex alignItems="baseline" spacing="xs">
                  <DetailText size="2xl">+£100.00</DetailText>
                  <BodyText size="sm">this month</BodyText>
                </Flex>
              </Flex>
              <CardInteraction asChild>
                <Link href="#">
                  Track cashback earnings
                  <ChevronRightSmallIcon />
                </Link>
              </CardInteraction>
            </Flex>
          </Flex>
        </Card>
      </Grid>
    </Container>
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
          <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </CardBannerImage>
        <CardBannerContent
          heading="Save a bundle"
          description="Homeowners who bundle two or more services with UW and activate the Cashback Card trial will receive up to £150 in credit."
        />
      </Card>
      <Card spacing="lg" direction="column" alignItems="start" maxWidth="300px">
        <CardBannerImage height="160px">
          <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
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
