import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Link } from '../Link/Link';
import { HighlightBanner } from './HighlightBanner';
import { HighlightBannerContent } from './HighlightBannerContent';
import { HighlightBannerFooter } from './HighlightBannerFooter';
import piggies from '../../../docs/assets/piggies.png';
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

const meta: Meta<typeof HighlightBanner> = {
  title: 'Components / HighlightBanner',
  component: HighlightBanner,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof HighlightBanner>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <HighlightBanner heading="Heading" headingColor="highlight" colorScheme="neutralSubtle">
      <Box height="100px" width="200px" />
      <HighlightBannerFooter>
        <BodyText size="md">Description</BodyText>
      </HighlightBannerFooter>
    </HighlightBanner>
  ),
};

/** Visual matrix of every headingColor across both colorScheme values — used for Chromatic snapshot testing. */
export const KitchenSink: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Flex gap="200" direction="column">
      {headingColors.map(color => (
        <Flex key={color} direction="row" gap="200">
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

/**
 * Real-world examples combining HighlightBannerContent and
 * HighlightBannerFooter with images and links to compose a full banner.
 */
export const Showcase: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Flex gap="400" width="800px">
      <HighlightBanner heading="Save a bundle" headingColor="highlight" colorScheme="neutralStrong">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={piggies} height="200px" />
        <HighlightBannerFooter>
          <BodyText size="md" textWrap="wrap">
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
            For almost 30 years, we&apos;ve been providing energy, broadband, mobile and insurance
            to the nation - and helping our customers save along the way.
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

/** Set shadowColor to match the banner's drop shadow to its heading colour. */
export const ShadowColours: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Flex gap="400" padding="400" wrap="wrap">
      {shadowColors.map(c => (
        <HighlightBanner
          key={c}
          heading="Heading"
          headingColor={c === 'functional' ? 'highlight' : c === 'brand' ? 'pig' : c}
          colorScheme="neutralSubtle"
          shadowColor={c}
        >
          <Box height="100px" width="200px" />
          <HighlightBannerFooter>
            <BodyText size="md">Description</BodyText>
          </HighlightBannerFooter>
        </HighlightBanner>
      ))}
    </Flex>
  ),
};
