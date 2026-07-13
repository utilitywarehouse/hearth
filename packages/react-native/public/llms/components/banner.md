# Banner

The `Banner` component is a versatile card-based component for displaying informational content with an icon or image. It supports various layouts, interactive features like pressable states and close buttons, and optional action elements like buttons or links.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Layout Options](#layout-options)
- [Examples](#examples)
  - [With Icon](#with-icon)
  - [With Image](#with-image)
  - [With Illustration](#with-illustration)
  - [With Button](#with-button)
  - [With Link](#with-link)
  - [Pressable](#pressable)
  - [With Close Button](#with-close-button)
  - [Vertical Layout](#vertical-layout-1)
  - [Color Schemes](#color-schemes)
  - [Complex Examples](#complex-examples)

## Playground

```tsx
// Example usage
<Banner {...args} icon={ElectricityMediumIcon} />
```

## Usage

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Banner
    icon={ElectricityMediumIcon}
    iconContainerColor="energy"
    heading="Energy Services"
    description="Manage your energy account and view your usage."
  />
);
```

## Props

| Property             | Type                                                                                               | Description                                                             | Default        |
| -------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| icon                 | `ComponentType`                                                                                    | Icon component to display (mutually exclusive with image/illustration)  | `-`            |
| iconContainerVariant | `'subtle' \| 'emphasis'`                                                                           | Icon container visual style                                             | `'subtle'`     |
| iconContainerSize    | `'sm' \| 'md' \| 'lg'`                                                                             | Icon container size                                                     | `'md'`         |
| iconContainerColor   | `'pig' \| 'energy' \| 'broadband' \| 'mobile' \|` <br />`'insurance' \| 'cashback' \| 'highlight'` | Icon container color scheme                                             | `'pig'`        |
| illustration         | `ReactNode`                                                                                        | The illustration element to render (mutually exclusive with icon/image) | `-`            |
| image                | `ReactNode`                                                                                        | The image element to render (mutually exclusive with icon/illustration) | `-`            |
| heading              | `string`                                                                                           | Heading text                                                            | `-` (required) |
| description          | `string`                                                                                           | Description text                                                        | `-` (required) |
| direction            | `'horizontal' \| 'vertical'`                                                                       | Layout direction for icon/image and content                             | `'horizontal'` |
| link                 | `ReactNode`                                                                                        | Link element to display                                                 | `-`            |
| button               | `ReactNode`                                                                                        | Button element to display                                               | `-`            |
| onPress              | `() => void`                                                                                       | Makes the entire banner pressable (shows chevron)                       | `-`            |
| onClose              | `() => void`                                                                                       | Shows close button with handler                                         | `-`            |
| variant              | `'subtle' \| 'emphasis'`                                                                           | Card visual style variant                                               | `'subtle'`     |
| colorScheme          | `'pig' \| 'energy' \| 'broadband' \| 'mobile' \|` <br />`'insurance' \| 'cashback' \| 'highlight'` | Color scheme for buttons                                                | `'pig'`        |
| alignChevron         | `'center' \| 'start' \| 'end'`                                                                     | Alignment of chevron when `onPress` is used with horizontal layout      | `'center'`     |

The component also accepts all standard Card props except `noPadding`, `spacing`, `gap`, `rowGap`, `columnGap`, `flexDirection`, `flexWrap`, `alignItems`, and `justifyContent`.

### `BannerImage` & `BannerIllustration` Props

The `BannerImage` & `BannerIllustration` component can be used to display an image within the Banner. It accepts the following props:

| Property  | Type                  | Description                                                              |
| --------- | --------------------- | ------------------------------------------------------------------------ |
| `source`  | `ImageSourcePropType` | The source of the image to display                                       |
| `light`   | `ImageSourcePropType` | The source of the image to display in light mode (use instead of source) |
| `dark`    | `ImageSourcePropType` | The source of the image to display in dark mode (use instead of source)  |
| `...rest` | `ImageProps`          | Additional props to pass to the underlying Image component               |

For more details about the ThemedImage component used internally, refer to the `ThemedImage` documentation.

### Horizontal Layout (Default)

The default horizontal layout places the icon or image to the left of the content, creating a compact side-by-side arrangement.

```jsx
// Example usage
<Banner
  icon={ElectricityMediumIcon}
  heading="Horizontal Layout"
  description="Icon appears to the left of the content."
  direction="horizontal"
/>
```

### Vertical Layout

The vertical layout stacks the icon or image above the content, useful for centered or full-width presentations.

```jsx
// Example usage
<Banner
  icon={ElectricityMediumIcon}
  heading="Vertical Layout"
  description="Icon appears above the content."
  direction="vertical"
/>
```

### With Icon

Use an icon with `IconContainer` styling options:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import {
  ElectricityMediumIcon,
  BroadbandMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <>
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
  </>
);
```

### With Image

Display a themed image that automatically switches between light and dark modes:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner, BannerImage } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <>
    <Banner
      image={
        <BannerImage
          source={{
            uri: 'https://example.com/image.jpg',
          }}
        />
      }
      heading="Featured Content"
      description="Discover amazing content curated just for you."
    />
    <Banner
      image={
        <BannerImage
          light={{ uri: 'https://example.com/light-image.jpg' }}
          dark={{ uri: 'https://example.com/dark-image.jpg' }}
        />
      }
      heading="Featured Content"
      description="Discover amazing content curated just for you."
    />
  </>
);
```

### With Illustration

Display a themed illustration that adapts to layout changes:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner, BannerIllustration } from '@utilitywarehouse/hearth-react-native';
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';

const MyComponent = () => (
  <Banner
    illustration={
      <BannerIllustration light={SpotBillingLight} dark={SpotBillingDark} width={80} height={80} />
    }
    heading="Featured Content"
    description="Discover amazing content curated just for you."
  />
);
```

### With Button

Add a button for clear call-to-action:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import { InsuranceMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
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
);
```

### With Link

Use a link for lighter-weight actions:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Banner
    icon={ElectricityMediumIcon}
    iconContainerColor="energy"
    heading="Energy Saving Tips"
    description="Learn how to reduce your energy consumption."
    link={<Link href="#">View tips</Link>}
  />
);
```

### Pressable

Make the entire banner pressable with a chevron indicator:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Banner
    icon={ElectricityMediumIcon}
    iconContainerColor="energy"
    heading="Energy Dashboard"
    description="View your energy usage and bills."
    onPress={() => console.log('Banner pressed')}
  />
);
```

### With Close Button

Add a close button for dismissible banners:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Banner
    icon={ElectricityMediumIcon}
    iconContainerColor="energy"
    heading="Special Announcement"
    description="We have some exciting news to share with you."
    onClose={() => console.log('Close pressed')}
  />
);
```

### Vertical Layout

Stack the icon or image above the content:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Banner
    icon={ElectricityMediumIcon}
    iconContainerColor="energy"
    heading="Energy Services"
    description="Manage your energy account and view your usage."
    direction="vertical"
  />
);
```

### Color Schemes

The component supports semantic color schemes for buttons and theming:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <>
    <Banner
      icon={ElectricityMediumIcon}
      iconContainerColor="energy"
      colorScheme="energy"
      heading="Energy Blue"
      description="Banner with energy color scheme."
      button={
        <Button size="sm" onPress={() => {}}>
          Action
        </Button>
      }
    />

    <Banner
      icon={BroadbandMediumIcon}
      iconContainerColor="broadband"
      colorScheme="broadband"
      heading="Broadband Green"
      description="Banner with broadband color scheme."
      button={
        <Button size="sm" onPress={() => {}}>
          Action
        </Button>
      }
    />
  </>
);
```

### Complex Examples

Combine multiple features for rich interactive banners:

```tsx
// Example usage
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
```

```jsx
// Example usage
import { Banner, BannerImage } from '@utilitywarehouse/hearth-react-native';
import { InsuranceMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <>
    {/* Pressable banner with button */}
    <Banner
      icon={InsuranceMediumIcon}
      iconContainerColor="insurance"
      iconContainerVariant="emphasis"
      colorScheme="insurance"
      heading="Home Insurance Alert"
      description="Your policy renewal is coming up. Review your coverage and make any necessary changes."
      button={
        <Button size="sm" onPress={() => console.log('Review pressed')}>
          Review Policy
        </Button>
      }
      onPress={() => console.log('Banner pressed')}
    />

    {/* Dismissible banner with link */}
    <Banner
      image={
        <BannerImage
          light={{ uri: 'https://example.com/light.jpg' }}
          dark={{ uri: 'https://example.com/dark.jpg' }}
        />
      }
      heading="Exclusive Member Benefit"
      description="As a valued member, you now have access to premium features at no extra cost."
      variant="emphasis"
      link={<Link href="#">Explore benefits</Link>}
      onClose={() => console.log('Close pressed')}
    />
  </>
);
```

## Best Practices

- Use **icons** for service-related or informational banners
- Use **images** for promotional or visual content with fixed aspect ratios
- Use **illustrations** for decorative or branded visual content that adapts to layout
- Choose **horizontal layout** for compact presentations
- Choose **vertical layout** for more prominent or centered displays
- Use **pressable** (`onPress`) when the entire banner is clickable
- Use **buttons** for primary actions (e.g., "Get Started", "Learn More")
- Use **links** for secondary actions (e.g., "View details", "Read more")
- Add **close button** (`onClose`) for dismissible announcements or notifications
- Align **iconContainerColor** and **colorScheme** with your content's semantic meaning
- Don't combine icon, image, and illustration - they are mutually exclusive
- Avoid using both `onPress` and `onClose` together unless the distinction is clear to users
