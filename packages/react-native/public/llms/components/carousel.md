# Carousel

Carousels provide users with a dynamic and interactive way to browse through a series of content items, such as images, articles, or products. It allows users to view multiple items within a confined space, enabling efficient content discovery and engagement.

Carousel Controls are used to clearly indicate multiple pieces of content and to allow a user to navigate between them.

- [Playground](#playground)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Carousel with Built-in Controls](#carousel-with-built-in-controls)
  - [Carousel with Navigation Buttons](#carousel-with-navigation-buttons)
  - [Carousel with Custom Controls](#carousel-with-custom-controls)
  - [Controlling Carousel via Ref](#controlling-carousel-via-ref)
  - [Centered Fixed-Width Items](#centered-fixed-width-items)
- [Props](#props)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Box width={Platform.OS === 'web' ? 400 : '100%'} overflow="hidden" onLayout={handleLayout}>
  <CarouselExample {...args} items={items} width={width} />
</Box>
```

## Usage

- The `Carousel` component is to be used for presenting scrollable data
- The `Carousel` scrolls horizontally only and works on both web and native platforms
- Most `Carousel` behaviour is predefined for a standardised behaviour and experience across apps
- Pagination controls are built-in by default and can be customised or hidden
- The carousel prevents scrolling more than one item at a time for a consistent user experience
- Some props can be modified to offer customised behaviour

## Basic Usage

```jsx
// Example usage
import { BodyText, Box, Carousel, CarouselItem } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Carousel width={300}>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.purple[800]}>
        <BodyText color="inverted">I'm a Carousel item!</BodyText>
      </Box>
    </CarouselItem>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.red[800]}>
        <BodyText color="inverted">I'm another Carousel item!</BodyText>
      </Box>
    </CarouselItem>
  </Carousel>
);
```

### Carousel with Built-in Controls

The `Carousel` component includes built-in pagination controls by default. You can customise their appearance or hide them entirely using props.

```jsx
// Example usage
import { BodyText, Box, Carousel, CarouselItem } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Carousel width={300}>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.purple[800]}>
        <BodyText color="inverted">I'm a Carousel item!</BodyText>
      </Box>
    </CarouselItem>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.red[800]}>
        <BodyText color="inverted">I'm another Carousel item!</BodyText>
      </Box>
    </CarouselItem>
  </Carousel>
);
```

### Carousel with Navigation Buttons

Add previous and next navigation buttons to the controls by setting `showNavigation` to `true`.

```jsx
// Example usage
import { BodyText, Box, Carousel, CarouselItem } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Carousel width={300} showNavigation>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.purple[800]}>
        <BodyText color="inverted">I'm a Carousel item!</BodyText>
      </Box>
    </CarouselItem>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.red[800]}>
        <BodyText color="inverted">I'm another Carousel item!</BodyText>
      </Box>
    </CarouselItem>
  </Carousel>
);
```

### Carousel with Custom Controls

The `CarouselControls` component is to be used in conjunction with the `Carousel` component. This component requires no props and automatically utilises the carousel context. When custom controls are provided, the built-in controls are automatically hidden.

```jsx
// Example usage
import { BodyText, Box, Carousel, CarouselControls } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Carousel width={300}>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.purple[800]}>
        <BodyText color="inverted">I'm a Carousel item!</BodyText>
      </Box>
    </CarouselItem>
    <CarouselItem>
      <Box p="100" aspectRatio={1.6} backgroundColor={color.red[800]}>
        <BodyText color="inverted">I'm another Carousel item!</BodyText>
      </Box>
    </CarouselItem>
    <CarouselControls style={{ marginTop: 16 }} />
  </Carousel>
);
```

### Controlling Carousel via Ref

You can control the carousel programmatically using a ref. The carousel exposes `scrollToIndex` and `scrollToOffset` methods.

```jsx
// Example usage
import { useRef } from 'react';
import {
  BodyText,
  Box,
  Carousel,
  CarouselItem,
  Button,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const carouselRef = useRef(null);

  const goToSlide = index => {
    carouselRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <>
      <Carousel ref={carouselRef} width={300}>
        <CarouselItem>
          <Box p="100" aspectRatio={1.6} backgroundColor={color.purple[800]}>
            <BodyText color="inverted">Slide 1</BodyText>
          </Box>
        </CarouselItem>
        <CarouselItem>
          <Box p="100" aspectRatio={1.6} backgroundColor={color.red[800]}>
            <BodyText color="inverted">Slide 2</BodyText>
          </Box>
        </CarouselItem>
      </Carousel>
      <Button onPress={() => goToSlide(1)}>Go to Slide 2</Button>
    </>
  );
};
```

### Centered Fixed-Width Items

You can create a carousel with centered items that are smaller than the viewport width, showing partial views of adjacent items.

```jsx
// Example usage
import { BodyText, Box, Carousel, CarouselItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const carouselWidth = 400;
  const itemWidth = carouselWidth * 0.8;

  return (
    <Carousel width={carouselWidth} itemWidth={itemWidth} centered showOverflow>
      <CarouselItem>
        <Box p="100" aspectRatio={1.6} backgroundColor={color.purple[800]}>
          <BodyText color="inverted">I'm a Carousel item!</BodyText>
        </Box>
      </CarouselItem>
      <CarouselItem>
        <Box p="100" aspectRatio={1.6} backgroundColor={color.red[800]}>
          <BodyText color="inverted">I'm another Carousel item!</BodyText>
        </Box>
      </CarouselItem>
    </Carousel>
  );
};
```

### `Carousel`

This wraps a carousel in dynamic context context, automatically providing all functionality for `CarouselItem`, and `CarouselControls`.

The `Carousel` component automatically updates the carousel context when interacted with.

The `Carousel` component accepts most props from the React Native `FlatList` component, while other props are predfined and cannot be modified. There are also some additional carousel specific props:

| Name                         | Type            | Default | Description                                                                                                                    |
| ---------------------------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| children?                    | ReactElement[]  | -       | Accepts React elements to render as carousel items. To function correctly, these should be `CarouselItem` components.          |
| width                        | number          | -       | Carousel viewport width (required)                                                                                             |
| disabled?                    | boolean         | false   | Enable or disable the carousel                                                                                                 |
| inverted?                    | boolean         | false   | Invert the carousel control colours (for brand backgrounds)                                                                    |
| centered?                    | boolean         | false   | Center items within the carousel viewport (use with `itemWidth` for peek effect)                                               |
| itemWidth?                   | number          | -       | Specify the width of carousel items if different from `width`. Useful for revealing the previous/next item within the viewport |
| inactiveItemOpacity?         | number          | 1       | Fade items outside of the active carousel viewport (use in conjunction with `showOverflow`)                                    |
| showOverflow?                | boolean         | false   | Visually reveal the items outside of the carousel viewport                                                                     |
| showControls?                | boolean         | true    | Show or hide the built-in pagination controls                                                                                  |
| showNavigation?              | boolean         | false   | Show previous/next navigation buttons in the controls                                                                          |
| controlsStyle?               | ViewStyle       | -       | Style the pagination controls container                                                                                        |
| controlsItemStyle?           | ViewStyle       | -       | Style the pagination dots                                                                                                      |
| controlsActiveItemStyle?     | ViewStyle       | -       | Style the active pagination dot                                                                                                |
| controlsAccessibilityHidden? | boolean         | true    | Hide controls from screen readers by default                                                                                   |
| onSnapToItem?                | (index) => void | -       | Callback each time a new item is focused in the carousel viewport                                                              |
| ref?                         | CarouselRef     | -       | Ref to control carousel programmatically (exposes `scrollToIndex` and `scrollToOffset`)                                        |

For more information about any of the above props from the `FlatList` component, see the React Native FlatList [documentation](https://reactnative.dev/docs/flatlist).

### `CarouselItem`

The `CarouselItem` component automatically receives props from the parent `CarouselItems` component. Please ensure that you always wrap each of your carousel items in `CarouselItem`.

| Name      | Type          | Default | Description                                                                                                                       |
| --------- | ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| children? | ReactElement  | -       | Display any content within each carousel item.                                                                                    |
| key?      | number/string | -       | Provides a unique render key for each carousel item. If no `key` is provided then it will fall back to the `id`, then array index |

### `CarouselControls`

The `CarouselControls` component automatically receives props from the parent `Carousel` component. Please ensure that you always wrap the `CarouselControls` component within the `Carousel` component.

The controls are interactive - clicking on any pagination dot will navigate to that carousel item.

| Name                 | Type       | Default | Description                                                                         |
| -------------------- | ---------- | ------- | ----------------------------------------------------------------------------------- |
| style?               | ViewStyle  | -       | Style the pagination component                                                      |
| itemStyle?           | ViewStyle  | -       | Style the pagination item                                                           |
| activeItemStyle?     | ViewStyle  | -       | Style the active pagination item                                                    |
| showNavigation?      | boolean    | false   | Show previous/next navigation buttons                                               |
| accessibilityHidden? | boolean    | true    | Hide controls from screen readers (inherits from Carousel context if not specified) |
| onPressPrev?         | () => void | -       | Callback when previous button is pressed                                            |
| onPressNext?         | () => void | -       | Callback when next button is pressed                                                |

## Accessibility

By default, carousel controls are hidden from screen readers (`controlsAccessibilityHidden={true}`). This is because the carousel items themselves should be accessible, and the controls are primarily for visual navigation.

### Screen Reader Navigation

When using a screen reader, users will navigate through the carousel items in order automatically. The screen reader will focus on the content of each `CarouselItem` sequentially, allowing users to swipe through items naturally.

**Important:** You must add appropriate accessibility labels and hints to the content within each carousel item. The carousel itself does not automatically provide accessibility labels for item content.

```jsx
// Example usage
<Carousel width={300}>
  <CarouselItem>
    <Box p="100" aspectRatio={1.6} backgroundColor={color.purple[800]}>
      <BodyText
        color="inverted"
        accessibilityLabel="Special offer: 20% off your next bill"
        accessibilityHint="Double tap to view offer details"
      >
        20% Off!
      </BodyText>
    </Box>
  </CarouselItem>
  <CarouselItem>
    <Box p="100" aspectRatio={1.6} backgroundColor={color.red[800]}>
      <BodyText
        color="inverted"
        accessibilityLabel="Refer a friend and earn rewards"
        accessibilityHint="Double tap to learn more about referrals"
      >
        Refer & Earn
      </BodyText>
    </Box>
  </CarouselItem>
</Carousel>
```

### Making Controls Accessible

To make controls accessible to screen readers:

```jsx
// Example usage
// Make controls visible to screen readers globally
<Carousel width={300} controlsAccessibilityHidden={false}>
  {/* items */}
</Carousel>

// Or override for custom controls
<Carousel width={300}>
  {/* items */}
  <CarouselControls accessibilityHidden={false} />
</Carousel>
```

The navigation buttons (when `showNavigation` is enabled) include proper accessibility labels for screen readers.
