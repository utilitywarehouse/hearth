# Highlight Banner

A `HighlightBanner` component is a specialised card layout designed for highlighting featured content with an image. It combines a colored heading banner, an optional image, and descriptive text with optional action buttons or links. Perfect for promotional content, featured articles, or important announcements.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Examples](#examples)
  - [With Button](#with-button)
  - [With Link](#with-link)
  - [Without Image](#without-image)
  - [Color Variants](#color-variants)
  - [Subtle Variant](#subtle-variant)
  - [Different Images](#different-images)
  - [Custom Image Height](#custom-image-height)

## Playground

```tsx
// Example usage
<View style={{ width: 400 }}>
  <HighlightBanner {...args} />
</View>
```

## Usage

```jsx
// Example usage
import { HighlightBanner } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <HighlightBanner
    heading="Featured Content"
    headingColor="energy"
    image={
      <HighlightBannerImage
        source={{
          uri: 'https://example.com/image.jpg',
        }}
      />
    }
    description="This is a description of the featured content."
  />
);
```

## Props

| Property             | Type                                                                                               | Description                                                   | Default      |
| -------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------ |
| heading              | `string`                                                                                           | The heading text displayed at the top with colored background | `-`          |
| headingColor         | `'pig' \| 'energy' \| 'broadband' \| 'mobile' \|` <br />`'insurance' \| 'cashback' \| 'highlight'` | The semantic color scheme for the heading background          | `-`          |
| image                | `ReactNode`                                                                                        | The image component to be displayed in the banner             | `-`          |
| imageContainerHeight | `number`                                                                                           | Height of the image container in pixels                       | `200`        |
| description          | `string`                                                                                           | Description text displayed below the image                    | `-`          |
| link                 | `ReactElement`                                                                                     | Optional Link component displayed below description           | `-`          |
| button               | `ReactElement`                                                                                     | Optional Button component displayed below description         | `-`          |
| variant              | `'emphasis' \| 'subtle'`                                                                           | Visual style variant with strong or subtle borders            | `'emphasis'` |

The component also accepts all standard Card props except `noPadding`, `colorScheme`, `spacing`, `gap`, `rowGap`, `columnGap`, `flexDirection`, `flexWrap`, `alignItems`, and `justifyContent`.

### `HighlightBannerImage` Props

The `HighlightBannerImage` component can be used to display an image within the HighlightBanner. It accepts the following props:

| Property  | Type                  | Description                                                              |
| --------- | --------------------- | ------------------------------------------------------------------------ |
| `source`  | `ImageSourcePropType` | The source of the image to display                                       |
| `light`   | `ImageSourcePropType` | The source of the image to display in light mode (use instead of source) |
| `dark`    | `ImageSourcePropType` | The source of the image to display in dark mode (use instead of source)  |
| `...rest` | `ImageProps`          | Additional props to pass to the underlying Image component               |

For more details about the ThemedImage component used internally, refer to the `ThemedImage` documentation.

## Variants

The HighlightBanner supports two visual variants:

- **emphasis** (default) - Strong borders for clear visual separation
- **subtle** - Softer borders for a more understated appearance

### With Button

Add a Button component to provide a clear call-to-action:

```tsx
// Example usage
<View style={{ width: 400 }}>
  <HighlightBanner
    {...args}
    button={<Button onPress={() => console.log('Button pressed')}>Learn More</Button>}
  />
</View>
```

```jsx
// Example usage
import {
  HighlightBanner,
  Button,
  HighlightBannerImage,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <HighlightBanner
    heading="New Feature"
    headingColor="energy"
    image={
      <HighlightBannerImage
        source={{
          uri: 'https://example.com/feature.jpg',
        }}
      />
    }
    description="Check out our latest feature"
    button={<Button onPress={() => console.log('pressed')}>Get Started</Button>}
  />
);
```

### With Link

Use a Link component for a lighter-weight action:

```tsx
// Example usage
<View style={{ width: 400 }}>
  <HighlightBanner
    {...args}
    link={<Link onPress={() => console.log('Link pressed')}>View details</Link>}
  />
</View>
```

```jsx
// Example usage
import { HighlightBanner, Link, HighlightBannerImage } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <HighlightBanner
    heading="Learn More"
    headingColor="broadband"
    image={
      <HighlightBannerImage
        source={{
          uri: 'https://example.com/info.jpg',
        }}
      />
    }
    description="Explore our documentation"
    link={<Link onPress={() => console.log('pressed')}>Read more</Link>}
  />
);
```

### Without Image

Display the HighlightBanner without an image by omitting the `image` prop:

```tsx
// Example usage
<View style={{ width: 400 }}>
  <HighlightBanner
    {...args}
    image={undefined}
    heading="Content Without Image"
    description="This HighlightBanner does not have an image, focusing solely on the text content."
    button={<Button onPress={() => console.log('pressed')}>Discover More</Button>}
  />
</View>
```

```jsx
// Example usage
import {
  HighlightBanner,
  Button,
  HighlightBannerImage,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <HighlightBanner
    heading="Content Without Image"
    description="This HighlightBanner does not have an image, focusing solely on the text content."
    button={<Button onPress={() => console.log('pressed')}>Discover More</Button>}
  />
);
```

### Color Variants

The component supports seven semantic color schemes that automatically apply the appropriate subtle background colors:

```tsx
// Example usage
<View style={{ width: 400 }}>
  <Flex spacing="lg" direction="column" align="stretch">
    <HighlightBanner
      {...args}
      heading="Energy Blue"
      headingColor="energy"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&q=80',
          }}
        />
      }
      description="Featured content with energy blue heading"
      link={<Link onPress={() => console.log('pressed')}>Learn more</Link>}
    />
    <HighlightBanner
      {...args}
      heading="Broadband Green"
      headingColor="broadband"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
          }}
        />
      }
      description="Featured content with broadband green heading"
    />
    <HighlightBanner
      {...args}
      heading="Insurance Orange"
      headingColor="insurance"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
          }}
        />
      }
      description="Featured content with insurance orange heading"
      button={<Button onPress={() => console.log('pressed')}>Get Started</Button>}
    />
    <HighlightBanner
      {...args}
      heading="Cashback Lilac"
      headingColor="cashback"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80',
          }}
        />
      }
      description="Featured content with cashback lilac heading"
      button={<Button onPress={() => console.log('pressed')}>Get Started</Button>}
    />
    <HighlightBanner
      {...args}
      heading="Pig Pink"
      headingColor="pig"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80',
          }}
        />
      }
      description="Featured content with pig pink heading"
      link={<Link onPress={() => console.log('pressed')}>Learn more</Link>}
    />
    <HighlightBanner
      {...args}
      heading="Mobile Rose"
      headingColor="mobile"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
          }}
        />
      }
      description="Featured content with mobile rose heading"
    />
    <HighlightBanner
      {...args}
      heading="Highlight Yellow"
      headingColor="highlight"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
          }}
        />
      }
      description="Featured content with highlight yellow heading"
    />
  </Flex>
</View>
```

```jsx
// Example usage
import { HighlightBanner, HighlightBannerImage } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <>
    {/* Energy Blue */}
    <HighlightBanner
      heading="Energy Services"
      headingColor="energy"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/energy.jpg' }} />}
      description="Discover our energy solutions"
    />

    {/* Broadband Green */}
    <HighlightBanner
      heading="Broadband Deals"
      headingColor="broadband"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/broadband.jpg' }} />}
      description="Fast and reliable broadband"
    />

    {/* Insurance Orange */}
    <HighlightBanner
      heading="Insurance Coverage"
      headingColor="insurance"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/insurance.jpg' }} />}
      description="Protect what matters most"
    />

    {/* Mobile Rose */}
    <HighlightBanner
      heading="Mobile Plans"
      headingColor="mobile"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/mobile.jpg' }} />}
      description="Stay connected anywhere"
    />

    {/* Cashback Lilac */}
    <HighlightBanner
      heading="Cashback Rewards"
      headingColor="cashback"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/cashback.jpg' }} />}
      description="Earn rewards on your bills"
    />

    {/* Pig Pink */}
    <HighlightBanner
      heading="Savings Account"
      headingColor="pig"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/savings.jpg' }} />}
      description="Save for your future"
    />

    {/* Highlight Yellow */}
    <HighlightBanner
      heading="Special Offer"
      headingColor="highlight"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/offer.jpg' }} />}
      description="Limited time promotion"
    />
  </>
);
```

### Subtle Variant

Use the subtle variant for a softer, less prominent appearance:

```tsx
// Example usage
<View style={{ width: 400 }}>
  <HighlightBanner {...args} />
</View>
```

```jsx
// Example usage
import { HighlightBanner, HighlightBannerImage } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <HighlightBanner
    variant="subtle"
    heading="Featured Content"
    headingColor="energy"
    image={
      <HighlightBannerImage
        source={{
          uri: 'https://example.com/image.jpg',
        }}
      />
    }
    description="This banner has a subtle appearance"
  />
);
```

### Different Images

The component works well with various types of imagery:

```tsx
// Example usage
<Flex spacing="lg" direction="column">
  <View style={{ width: 400 }}>
    <HighlightBanner
      {...args}
      heading="Nature Landscape"
      headingColor="broadband"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          }}
        />
      }
      description="Beautiful mountain landscape with clear blue sky"
      link={<Link onPress={() => console.log('pressed')}>View gallery</Link>}
    />
  </View>
  <View style={{ width: 400 }}>
    <HighlightBanner
      {...args}
      heading="Urban Architecture"
      headingColor="highlight"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
          }}
        />
      }
      description="Modern city buildings and urban design"
      button={<Button onPress={() => console.log('pressed')}>Explore Cities</Button>}
    />
  </View>
  <View style={{ width: 400 }}>
    <HighlightBanner
      {...args}
      heading="Ocean Waves"
      headingColor="energy"
      image={
        <HighlightBannerImage
          source={{
            uri: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
          }}
        />
      }
      description="Stunning ocean views and coastal beauty"
    />
  </View>
</Flex>
```

### Custom Image Height

Control the image container height to suit your content needs:

```jsx
// Example usage
import { HighlightBanner, HighlightBannerImage } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <>
    {/* Default height (200px) */}
    <HighlightBanner
      heading="Standard Image"
      headingColor="energy"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/image.jpg' }} />}
      description="Using default height"
    />

    {/* Custom height */}
    <HighlightBanner
      heading="Tall Image"
      headingColor="broadband"
      image={<HighlightBannerImage source={{ uri: 'https://example.com/tall-image.jpg' }} />}
      imageContainerHeight={300}
      description="Using custom height of 300px"
    />
  </>
);
```

## Best Practices

- Use the **energy**, **broadband**, **mobile**, **insurance**, **cashback**, or **pig** colors to align with specific service offerings
- Use **highlight** for time-sensitive promotions or special offers
- Keep descriptions concise and scannable
- Choose between link and button based on the importance of the action - use buttons for primary actions
- Consider using the subtle variant when displaying multiple banners to reduce visual clutter
- Ensure images are high quality and relevant to the content
- Use appropriate image heights based on the aspect ratio of your images
