import { Meta, StoryObj } from '@storybook/react-native';
import {
  BroadbandMediumIcon,
  CashbackCardMediumIcon,
  ElectricityMediumIcon,
  HomeMediumIcon,
  InsuranceMediumIcon,
  MobileMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';
import { View } from 'react-native';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Link } from '../Link';
import Banner from './Banner';
import BannerIllustration from './BannerIllustration';
import BannerImage from './BannerImage';

const meta = {
  title: 'Stories / Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'The heading text',
    },
    description: {
      control: 'text',
      description: 'The description text',
    },
    direction: {
      control: 'select',
      description: 'Layout direction for icon/image and content',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      description: 'The variant style of the banner',
      options: ['emphasis', 'subtle'],
    },
    colorScheme: {
      control: 'select',
      description: 'The color scheme for the banner',
      options: [
        'neutralStrong',
        'neutralSubtle',
        'brand',
        'energy',
        'broadband',
        'mobile',
        'insurance',
        'cashback',
        'pig',
        'highlight',
      ],
    },
    iconContainerVariant: {
      control: 'select',
      description: 'Icon container variant',
      options: ['subtle', 'emphasis'],
    },
    iconContainerSize: {
      control: 'select',
      description: 'Icon container size',
      options: ['sm', 'md', 'lg'],
    },
    shadowColor: {
      control: 'select',
      description: 'The shadow color of the banner',
      options: [
        'functional',
        'brand',
        'energy',
        'broadband',
        'mobile',
        'insurance',
        'cashback',
        'pig',
      ],
    },
  },
  args: {
    heading: 'Welcome to Banner',
    description: 'This is a banner component that can display an icon or image with content.',
    direction: 'horizontal',
    variant: 'subtle',
    colorScheme: 'neutralStrong',
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: any) => {
    return <Banner {...args} icon={ElectricityMediumIcon} />;
  },
};

export const WithIcon: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="energy"
            heading="Energy Services"
            description="Manage your energy account and view your usage."
          />
          <Banner
            icon={BroadbandMediumIcon}
            iconContainerColor="broadband"
            iconContainerVariant="emphasis"
            heading="Broadband Plans"
            description="Upgrade your broadband to faster speeds."
          />
          <Banner
            icon={MobileMediumIcon}
            iconContainerColor="mobile"
            iconContainerSize="lg"
            heading="Mobile Deals"
            description="Check out our latest mobile offers."
          />
        </Flex>
      </View>
    );
  },
};

export const WithIllustration: Story = {
  render: () => {
    return (
      <View>
        <Flex spacing="lg" direction="column">
          <Banner
            illustration={
              <BannerIllustration
                light={
                  // @ts-expect-error - Illustration SVG import
                  <SpotBillingLight width={80} height={80} />
                }
                dark={
                  // @ts-expect-error - Illustration SVG import
                  <SpotBillingDark width={80} height={80} />
                }
              />
            }
            heading="Featured Content"
            description="Discover amazing content curated just for you."
          />
          <Banner
            direction="vertical"
            illustration={
              <BannerIllustration
                light={
                  // @ts-expect-error - Illustration SVG import
                  <SpotBillingLight width={120} height={120} />
                }
                dark={
                  // @ts-expect-error - Illustration SVG import
                  <SpotBillingDark width={120} height={120} />
                }
              />
            }
            heading="Special Offer"
            description="Limited time offer on selected services."
          />
        </Flex>
      </View>
    );
  },
};

export const WithImage: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            image={
              <BannerImage
                light={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
                dark={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
              />
            }
            heading="Featured Content"
            description="Discover amazing content curated just for you."
          />
          <Banner
            direction="vertical"
            image={
              <BannerImage
                light={{
                  uri: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=200&q=80',
                }}
                dark={{
                  uri: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=200&q=80',
                }}
              />
            }
            heading="Special Offer"
            description="Limited time offer on selected services."
          />
        </Flex>
      </View>
    );
  },
};

export const WithButton: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={InsuranceMediumIcon}
            iconContainerColor="insurance"
            heading="Home Insurance"
            description="Protect your home with our comprehensive insurance."
            button={
              <Button size="sm" onPress={() => console.log('Get Quote pressed')}>
                Get Quote
              </Button>
            }
          />
          <Banner
            icon={CashbackCardMediumIcon}
            iconContainerColor="cashback"
            heading="Cashback Rewards"
            description="Earn cashback on every purchase."
            colorScheme="neutralSubtle"
            button={
              <Button size="sm" onPress={() => console.log('Learn More pressed')}>
                Learn More
              </Button>
            }
          />
        </Flex>
      </View>
    );
  },
};

export const WithLink: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="energy"
            heading="Energy Saving Tips"
            description="Learn how to reduce your energy consumption."
            link={<Link href="#">View tips</Link>}
          />
          <Banner
            icon={BroadbandMediumIcon}
            iconContainerColor="broadband"
            heading="Network Status"
            description="Check the status of your broadband connection."
            link={<Link href="#">Check status</Link>}
          />
        </Flex>
      </View>
    );
  },
};

export const Pressable: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            variant="emphasis"
            colorScheme="neutralStrong"
            testID="next-best-action-card"
            onPress={() => console.log('Banner pressed')}
            heading="Add your appointment outcome"
            description="Save the outcome of Don Instantino (Traditional Thai Cuisine)'s appointment"
            alignChevron="start"
            button={
              <Button
                variant="outline"
                colorScheme="functional"
                size="sm"
                onPress={() => console.log('View to-do list pressed')}
                testID="view-to-do-list"
              >
                View to-do list
              </Button>
            }
          />
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="energy"
            heading="Energy Dashboard"
            description="View your energy usage and bills."
            onPress={() => console.log('Banner pressed')}
          />
          <Banner
            image={
              <BannerImage
                light={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
                dark={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
              />
            }
            heading="Account Settings"
            description="Manage your account preferences."
            onPress={() => console.log('Banner pressed')}
          />
          <Banner
            direction="vertical"
            image={
              <BannerImage
                light={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
                dark={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
              />
            }
            heading="Account Settings"
            description="Manage your account preferences."
            onPress={() => console.log('Banner pressed')}
          />
        </Flex>
      </View>
    );
  },
};

export const WithClose: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="energy"
            heading="Special Announcement"
            description="We have some exciting news to share with you."
            onClose={() => console.log('Close pressed')}
          />
          <Banner
            icon={MobileMediumIcon}
            iconContainerColor="mobile"
            direction="vertical"
            heading="New Feature"
            description="Check out our latest feature update."
            button={
              <Button size="sm" onPress={() => console.log('Explore pressed')}>
                Explore
              </Button>
            }
            onClose={() => console.log('Close pressed')}
          />
        </Flex>
      </View>
    );
  },
};

export const VerticalLayout: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="energy"
            heading="Energy Services"
            description="Manage your energy account and view your usage."
            direction="vertical"
          />
          <Banner
            variant="emphasis"
            image={
              <BannerImage
                light={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
                dark={{
                  uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
                }}
              />
            }
            heading="Featured Content"
            description="Discover amazing content curated just for you."
            shadowColor="brand"
            direction="vertical"
            button={
              <Button size="sm" onPress={() => console.log('Learn More pressed')}>
                Learn More
              </Button>
            }
          />
        </Flex>
      </View>
    );
  },
};

export const ColorSchemes: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={HomeMediumIcon}
            iconContainerColor="highlight"
            colorScheme="neutralStrong"
            variant="subtle"
            heading="Neutral Strong"
            description="Banner with neutral strong color scheme and subtle variant."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={HomeMediumIcon}
            iconContainerColor="highlight"
            colorScheme="neutralStrong"
            variant="emphasis"
            heading="Neutral Strong"
            description="Banner with neutral strong color scheme and emphasis variant."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={HomeMediumIcon}
            iconContainerColor="highlight"
            colorScheme="neutralSubtle"
            heading="Neutral Subtle"
            description="Banner with neutral subtle color scheme and subtle variant."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={HomeMediumIcon}
            iconContainerColor="highlight"
            colorScheme="neutralSubtle"
            variant="emphasis"
            heading="Neutral Subtle"
            description="Banner with neutral subtle color scheme and emphasis variant."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="pig"
            iconContainerVariant="emphasis"
            colorScheme="pig"
            heading="Pig Pink"
            description="Banner with pig color scheme."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="energy"
            iconContainerVariant="emphasis"
            colorScheme="energy"
            heading="Energy Blue"
            description="Banner with energy color scheme."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={BroadbandMediumIcon}
            iconContainerColor="broadband"
            iconContainerVariant="emphasis"
            colorScheme="broadband"
            heading="Broadband Green"
            description="Banner with broadband color scheme."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={MobileMediumIcon}
            iconContainerColor="mobile"
            iconContainerVariant="emphasis"
            colorScheme="mobile"
            heading="Mobile Rose"
            description="Banner with mobile color scheme."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={InsuranceMediumIcon}
            iconContainerColor="insurance"
            iconContainerVariant="emphasis"
            colorScheme="insurance"
            heading="Insurance Orange"
            description="Banner with insurance color scheme."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={CashbackCardMediumIcon}
            iconContainerColor="cashback"
            iconContainerVariant="emphasis"
            colorScheme="cashback"
            heading="Cashback Lilac"
            description="Banner with cashback color scheme."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
          <Banner
            icon={HomeMediumIcon}
            iconContainerColor="highlight"
            iconContainerVariant="emphasis"
            colorScheme="highlight"
            heading="Highlight Yellow"
            description="Banner with highlight color scheme."
            button={
              <Button size="sm" onPress={() => console.log('Action pressed')}>
                Action
              </Button>
            }
          />
        </Flex>
      </View>
    );
  },
};

export const EmphasisVariant: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={ElectricityMediumIcon}
            iconContainerColor="energy"
            iconContainerVariant="emphasis"
            heading="Important Notice"
            description="This banner uses the emphasis variant for increased visibility."
            variant="emphasis"
          />
          <Banner
            image={
              <BannerImage
                light={{
                  uri: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=200&q=80',
                }}
                dark={{
                  uri: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=200&q=80',
                }}
              />
            }
            heading="Featured Offer"
            description="Limited time deal on premium services."
            variant="emphasis"
            button={
              <Button size="sm" onPress={() => console.log('Claim pressed')}>
                Claim Now
              </Button>
            }
          />
        </Flex>
      </View>
    );
  },
};

export const ComplexExample: Story = {
  render: () => {
    return (
      <View style={{ width: 400 }}>
        <Flex spacing="lg" direction="column">
          <Banner
            icon={InsuranceMediumIcon}
            iconContainerColor="insurance"
            iconContainerVariant="emphasis"
            colorScheme="neutralStrong"
            heading="Home Insurance Alert"
            description="Your policy renewal is coming up. Review your coverage and make any necessary changes."
            button={
              <Button size="sm" onPress={() => console.log('Review pressed')}>
                Review Policy
              </Button>
            }
            onPress={() => console.log('Banner pressed')}
          />
          <Banner
            image={
              <BannerImage
                light={{
                  uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&q=80',
                }}
                dark={{
                  uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&q=80',
                }}
              />
            }
            heading="Exclusive Member Benefit"
            description="As a valued member, you now have access to premium features at no extra cost."
            variant="emphasis"
            link={<Link href="#">Explore benefits</Link>}
            onClose={() => console.log('Close pressed')}
          />
        </Flex>
      </View>
    );
  },
};
