import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  Box,
  Flex,
  DetailText,
  BodyText,
  Heading,
  Link,
} from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/react-icons';

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

export const FixedCards: Story = {
  render: () => {
    return (
      <Flex padding="600" gap="400" direction="column">
        <Flex direction="column" gap="200">
          <BodyText size="md" weight="semibold">
            White and Warm White Fixed Cards
          </BodyText>
          <Flex gap="300" width="800px">
            <Card variant="emphasis" colorScheme="white" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">White Emphasis Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
            <Card variant="subtle" colorScheme="white" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">White Subtle Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
            <Card variant="emphasis" colorScheme="warmWhite" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Warm White Emphasis Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
            <Card variant="subtle" colorScheme="warmWhite" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Warm White Subtle Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
          </Flex>
        </Flex>
        <Flex direction="column" gap="200">
          <BodyText size="md" weight="semibold">
            Service Colour Fixed Cards
          </BodyText>
          <Flex gap="300" width="800px">
            <Card variant="emphasis" colorScheme="energyGreen" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Energy Green Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
            <Card variant="emphasis" colorScheme="mobileRose" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Mobile Rose Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
            <Card variant="emphasis" colorScheme="broadbandBlue" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Broadband Blue Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
            <Card variant="emphasis" colorScheme="insuranceOrange" padding="lg" flex="1">
              <Flex direction="column" gap="150">
                <Heading size="sm">Insurance Orange Card</Heading>
                <BodyText size="md">Content...</BodyText>
                <Link>
                  Link
                  <ChevronRightSmallIcon />
                </Link>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};
