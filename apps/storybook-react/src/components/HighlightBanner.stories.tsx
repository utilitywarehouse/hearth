import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  HighlightBanner,
  HighlightBannerFooter,
  HighlightBannerContent,
  BodyText,
  Flex,
  Link,
} from '@utilitywarehouse/hearth-react';
import piggies from '../assets/piggies.png';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const headingColors = [
  'pig',
  'energy',
  'broadband',
  'mobile',
  'insurance',
  'cashback',
  'highlight',
] as const;

const meta: Meta<typeof HighlightBanner> = {
  title: 'Components / HighlightBanner',
  component: HighlightBanner,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof HighlightBanner>;

export const Playground: Story = {
  render: args => (
    <HighlightBanner heading="Heading" headingColor="highlight" colorScheme="neutralSubtle">
      <Box height="100px" width="200px" />
      <HighlightBannerFooter>
        <BodyText size="md">Description</BodyText>
      </HighlightBannerFooter>
    </HighlightBanner>
  ),
};

export const Showcase: Story = {
  render: args => (
    <Flex gap="400" width="800px">
      <HighlightBanner heading="Save a bundle" headingColor="highlight" colorScheme="neutralStrong">
        <img src={piggies} height="200px" />
        <HighlightBannerFooter>
          <BodyText size="md" wrap="wrap">
            Homeowners who bundle two or more services with UW and activate the Cashback Card trial
            will receive up to £150 in credit.
          </BodyText>
        </HighlightBannerFooter>
      </HighlightBanner>
      <HighlightBanner
        heading="Save money on your household bills when you get it together"
        headingColor="pig"
        colorScheme="neutralStrong"
      >
        <HighlightBannerContent>
          <BodyText size="md" textAlign="center">
            For almost 30 years, we've been providing energy, broadband, mobile and insurance to the
            nation - and helping our customers save along the way.
          </BodyText>
          <BodyText size="md" textAlign="center">
            Want to talk it through? Our network of friendly, local Partners can help you find ways
            to save.
          </BodyText>
          <Link href="#">
            Find a UW Partner
            <ChevronRightSmallIcon />
          </Link>
        </HighlightBannerContent>
      </HighlightBanner>
    </Flex>
  ),
};

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex gap="200" direction="column">
      {headingColors.map(color => (
        <Flex direction="row" gap="200">
          <HighlightBanner
            heading={`Heading ${color}`}
            headingColor={color}
            colorScheme="neutralSubtle"
          >
            <Box height="100px" width="200px" />
            <HighlightBannerFooter>
              <BodyText size="md">Neutral subtle</BodyText>
            </HighlightBannerFooter>
          </HighlightBanner>
          <HighlightBanner
            heading={`Heading ${color}`}
            headingColor={color}
            colorScheme="neutralStrong"
          >
            <Box height="100px" width="200px" />
            <HighlightBannerFooter>
              <BodyText size="md">Neutral strong</BodyText>
            </HighlightBannerFooter>
          </HighlightBanner>
        </Flex>
      ))}
    </Flex>
  ),
};
