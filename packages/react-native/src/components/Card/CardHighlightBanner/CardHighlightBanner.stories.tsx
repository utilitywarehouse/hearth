import { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Button } from '../../Button';
import { Flex } from '../../Flex';
import { Link } from '../../Link';
import Card from '../Card';
import CardHighlightBanner from './CardHighlightBanner';

const meta = {
  title: 'Stories / CardHighlightBanner',
  component: CardHighlightBanner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'The heading text displayed at the top of the card',
    },
    headingColor: {
      control: 'select',
      description: 'The background color for the heading section',
      options: ['pig', 'energy', 'broadband', 'mobile', 'insurance', 'cashback', 'highlight'],
    },
    description: {
      control: 'text',
      description: 'The description text displayed in the footer',
    },
  },
  args: {
    heading: 'Featured Content',
    headingColor: 'highlight',
    description: 'This is a description of the featured content that appears below the image.',
    image: {
      source: {
        uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      },
    },
  },
} satisfies Meta<typeof CardHighlightBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    return (
      <View style={{ width: 400 }}>
        <Card noPadding variant="emphasis">
          <CardHighlightBanner {...args} />
        </Card>
      </View>
    );
  },
};

export const WithButton: Story = {
  render: args => {
    return (
      <View style={{ width: 400 }}>
        <Card noPadding variant="emphasis">
          <CardHighlightBanner
            {...args}
            button={<Button onPress={() => console.log('Button pressed')}>Learn More</Button>}
          />
        </Card>
      </View>
    );
  },
};

export const WithLink: Story = {
  render: args => {
    return (
      <View style={{ width: 400 }}>
        <Card noPadding variant="emphasis">
          <CardHighlightBanner
            {...args}
            link={<Link onPress={() => console.log('Link pressed')}>View details</Link>}
          />
        </Card>
      </View>
    );
  },
};

export const ColorVariants: Story = {
  render: args => {
    return (
      <View style={{ width: 400 }}>
        <Flex space="lg" direction="column" align="stretch">
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Energy Blue"
              headingColor="energy"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&q=80',
                },
              }}
              description="Featured content with energy blue heading"
              link={<Link onPress={() => console.log('pressed')}>Learn more</Link>}
            />
          </Card>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Broadband Green"
              headingColor="broadband"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
                },
              }}
              description="Featured content with broadband green heading"
            />
          </Card>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Insurance Orange"
              headingColor="insurance"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
                },
              }}
              description="Featured content with insurance orange heading"
              button={<Button onPress={() => console.log('pressed')}>Get Started</Button>}
            />
          </Card>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Cashback Lilac"
              headingColor="cashback"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80',
                },
              }}
              description="Featured content with cashback lilac heading"
              button={<Button onPress={() => console.log('pressed')}>Get Started</Button>}
            />
          </Card>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Pig Pink"
              headingColor="pig"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80',
                },
              }}
              description="Featured content with pig pink heading"
              link={<Link onPress={() => console.log('pressed')}>Learn more</Link>}
            />
          </Card>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Mobile Rose"
              headingColor="mobile"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
                },
              }}
              description="Featured content with mobile rose heading"
            />
          </Card>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Highlight Yellow"
              headingColor="highlight"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
                },
              }}
              description="Featured content with highlight yellow heading"
            />
          </Card>
        </Flex>
      </View>
    );
  },
};

export const SubtleCard: Story = {
  render: args => {
    return (
      <View style={{ width: 400 }}>
        <Card noPadding variant="subtle">
          <CardHighlightBanner {...args} />
        </Card>
      </View>
    );
  },
};

export const DifferentImages: Story = {
  render: args => {
    return (
      <Flex space="lg" direction="column">
        <View style={{ width: 400 }}>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Nature Landscape"
              headingColor="broadband"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                },
              }}
              description="Beautiful mountain landscape with clear blue sky"
              link={<Link onPress={() => console.log('pressed')}>View gallery</Link>}
            />
          </Card>
        </View>
        <View style={{ width: 400 }}>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Urban Architecture"
              headingColor="highlight"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
                },
              }}
              description="Modern city buildings and urban design"
              button={<Button onPress={() => console.log('pressed')}>Explore Cities</Button>}
            />
          </Card>
        </View>
        <View style={{ width: 400 }}>
          <Card noPadding variant="emphasis">
            <CardHighlightBanner
              {...args}
              heading="Ocean Waves"
              headingColor="energy"
              image={{
                source: {
                  uri: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
                },
              }}
              description="Stunning ocean views and coastal beauty"
            />
          </Card>
        </View>
      </Flex>
    );
  },
};

export const LongContent: Story = {
  render: args => {
    return (
      <View style={{ width: 400 }}>
        <Card noPadding variant="emphasis">
          <CardHighlightBanner
            {...args}
            heading="Extended Information Card"
            headingColor="energy"
            image={{
              source: {
                uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
              },
            }}
            description="This is a much longer description that demonstrates how the component handles extended text content. It includes multiple sentences and provides more detailed information about the featured content, ensuring the layout remains clean and readable even with more text."
            button={<Button onPress={() => console.log('pressed')}>Read Full Article</Button>}
          />
        </Card>
      </View>
    );
  },
};
