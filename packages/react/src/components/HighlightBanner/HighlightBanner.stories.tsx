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

export const Playground: Story = {
  render: () => (
    <HighlightBanner heading="Heading" headingColor="highlight" colorScheme="neutralSubtle">
      <Box height="100px" width="200px" />
      <HighlightBannerFooter>
        <BodyText size="md">Description</BodyText>
      </HighlightBannerFooter>
    </HighlightBanner>
  ),
};

export const Showcase: Story = {
  render: () => (
    <Flex gap="400" width="800px">
      <HighlightBanner heading="Save a bundle" headingColor="highlight" colorScheme="neutralStrong">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
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

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
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
  render: args => (
    <Flex gap="400" padding="400" wrap="wrap">
      {shadowColors.map(c => (
        <HighlightBanner
          key={c}
          heading="Heading"
          headingColor={c === 'functional' ? 'highlight' : c === 'brand' ? 'pig' : c}
          colorScheme="neutralSubtle"
          shadowColor={c}
          {...args}
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
