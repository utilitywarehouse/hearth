import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Banner,
  Card,
  BannerContent,
  IconContainer,
  Flex,
  Link,
  UnstyledIconButton,
} from '@utilitywarehouse/hearth-react';
import piggies from '../assets/piggies.png';
import SpotSmartMeter from '@utilitywarehouse/hearth-svg-assets/lib/spot-smart-meter-light.svg';
import SpotSavings from '@utilitywarehouse/hearth-svg-assets/lib/spot-savings-light.svg';
import {
  ChevronRightSmallIcon,
  CloseSmallIcon,
  PlaceholderSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Banner> = {
  title: 'Stories / Banner',
  component: Banner,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Playground: Story = {
  render: () => (
    <Card spacing="lg" justifyContent="between">
      <BannerContent heading="This is a banner heading" description="Put your description here">
        <Link href="#">
          Link
          <ChevronRightSmallIcon />
        </Link>
      </BannerContent>

      <UnstyledIconButton label="close">
        <CloseSmallIcon />
      </UnstyledIconButton>
    </Card>
  ),
};

export const WithIconContainer: Story = {
  render: () => (
    <Flex gap="400">
      <Card spacing="md">
        <IconContainer colorScheme="pig">
          <PlaceholderSmallIcon />
        </IconContainer>
        <BannerContent heading="This is a banner heading" description="Put your description here">
          <Link href="#">
            Link
            <ChevronRightSmallIcon />
          </Link>
        </BannerContent>
        <UnstyledIconButton label="close">
          <CloseSmallIcon />
        </UnstyledIconButton>
      </Card>
      <Card spacing="lg">
        <Flex spacing="lg" direction="column" alignItems="start">
          <IconContainer colorScheme="pig">
            <PlaceholderSmallIcon />
          </IconContainer>
          <BannerContent heading="This is a banner heading" description="Put your description here">
            <Link href="#">
              Link
              <ChevronRightSmallIcon />
            </Link>
          </BannerContent>
        </Flex>
        <UnstyledIconButton label="close">
          <CloseSmallIcon />
        </UnstyledIconButton>
      </Card>
    </Flex>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Flex gap="400">
      <Card spacing="md" maxWidth="420px">
        <Box
          width="160px"
          height="174px"
          borderWidth="1"
          borderStyle="solid"
          borderColor="strong"
          borderRadius="md"
          flexShrink="0"
          style={{ overflow: 'hidden' }}
        >
          <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <BannerContent
          heading="Save a bundle"
          description="Homeowners who bundle two or more services with UW and activate the Cashback Card trial will receive up to £150 in credit."
        />
      </Card>
      <Card spacing="lg" direction="column" alignItems="start" maxWidth="300px">
        <Box
          height="160px"
          borderWidth="1"
          borderStyle="solid"
          borderColor="strong"
          borderRadius="md"
          flexShrink="0"
          style={{ overflow: 'hidden' }}
        >
          <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <BannerContent
          heading="Save a bundle"
          description="Our network of friendly, local Partners can help you find ways to save."
        >
          <Link href="#">
            Find a UW Partner
            <ChevronRightSmallIcon />
          </Link>
        </BannerContent>
      </Card>
    </Flex>
  ),
};

export const WithIllustration: Story = {
  render: () => (
    <Flex gap="400">
      <Card spacing="lg" colorScheme="pig" variant="subtle" alignItems="center" width="450px">
        <img src={SpotSavings} alt="Savings Pig" width={80} />

        <BannerContent
          heading="Save money on your household bills when you get it together"
          description="Our network of friendly, local Partners can help you find ways to save."
        >
          <Link href="#">
            Find a UW Partner
            <ChevronRightSmallIcon />
          </Link>
        </BannerContent>
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
        <BannerContent
          heading="Save a bundle"
          description="Our network of friendly, local Partners can help you find ways to save."
          textAlign="center"
          alignItems="center"
        >
          <Link href="#">
            Find a UW Partner
            <ChevronRightSmallIcon />
          </Link>
        </BannerContent>
      </Card>
    </Flex>
  ),
};
