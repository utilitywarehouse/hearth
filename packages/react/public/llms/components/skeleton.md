# Skeleton

`Skeleton` is a collection of components that provide visual placeholders while
content is loading. It helps improve perceived performance and user experience
by showing a skeleton of the layout before the actual content is rendered.

- [Usage](#usage)
- [Accessibility](#accessibility)
  - [Loading title](#loading-title)
- [SkeletonBodyText](#skeletonbodytext)
- [SkeletonHeading](#skeletonheading)
- [SkeletonBox](#skeletonbox)
- [API](#api)

```tsx
<Skeleton loadingTitle="card placeholder story">
  <Flex direction="column" gap="300" width="320px">
    <SkeletonBox {...args} width="100%" height="160px" borderRadius="sm" />
    <SkeletonBox {...args} width="60%" height="20px" borderRadius="xs" />
    <SkeletonBox {...args} width="100%" height="14px" borderRadius="xs" />
    <SkeletonBox {...args} width="85%" height="14px" borderRadius="xs" />
  </Flex>
</Skeleton>
```

## Usage

- `Skeleton` is a wrapper component that provides animation and accessibility features.
- `SkeletonBox` is a component that can represent a shape placeholder, including rectangles and circles, and can be used for images, avatars, or any other content.
- `SkeletonHeading` is a component that represents a placeholder for `Heading` text.
- `SkeletonBodyText` is a component that represents a placeholder for `BodyText`.

```tsx
<div aria-busy={isLoading}>
  {isLoading ? (
    <Skeleton loadingTitle="storybook demo">
      <Flex direction="column" gap="100">
        <SkeletonHeading width="60%" />
        <SkeletonBodyText width="80%" lines="3" />
        <SkeletonBox width="100%" height="200px" />
        <SkeletonBox width="64px" height="64px" borderRadius="full" />
      </Flex>
    </Skeleton>
  ) : (

    {...}

  )}
</div>
```

## Accessibility

When using `Skeleton`, it's important to ensure that the loading state is
properly communicated to assistive technologies. The `Skeleton` component, and
any content that is loading, should be wrapped in a container with the
`aria-busy` attribute set to `true` when content is loading, and set to `false`
when content has loaded. This allows screen readers to announce that the
content is currently loading.

### Loading title

The `Skeleton` component requires a `loadingTitle`, which provides a
descriptive title for the loading state, and will automatically be prefixed
with `'Loading'`. This title is announced by screen readers when the `Skeleton`
is active, giving users context about what is being loaded.

## SkeletonBodyText

Use `SkeletonBodyText` when you need a placeholder for body text content. It
supports multiple lines and the same size props as `BodyText`.

```tsx
<Skeleton loadingTitle="sizes story">
  <Flex direction="column" gap="300" width="360px">
    {sizes.map(size => (
      <SkeletonBodyText key={size} {...args} size={size} lines="3" />
    ))}
  </Flex>
</Skeleton>
```

## SkeletonHeading

Use `SkeletonHeading` when you need a placeholder for `Heading` content. It
supports the same size props as `Heading`.

```tsx
<Skeleton loadingTitle="sizes story">
  <Flex direction="column" gap="200" width="360px">
    {sizes.map(size => (
      <SkeletonHeading key={size} {...args} size={size} />
    ))}
  </Flex>
</Skeleton>
```

## SkeletonBox

Use `SkeletonBox` when you need explicit control over shape and dimensions.

```tsx
<Skeleton loadingTitle="blocks story">
  <Flex direction="column" gap="200" width="420px">
    <SkeletonBox {...args} width="100%" height="24px" />
    <SkeletonBox {...args} width="100%" height="24px" />
    <SkeletonBox {...args} width="80%" height="24px" />
  </Flex>
</Skeleton>
```

```tsx
<Skeleton loadingTitle="circle story">
  <SkeletonBox {...args} />
</Skeleton>
```

## API

`Skeleton` is based on `div` and supports the following common props:

- AlignSelf
- BorderRadius
- FlexItem
- GridItem
- Margin
- Order
- Position
- Size
- ZIndex

| Prop                          | Type                                                                                                                                                                                                       | Default    | Description                                                                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `display`                     | `Responsive<"none" \| "inline" \| "inline-block" \| "block">`                                                                                                                                              | —          | Sets the CSS `display` property. Can be set responsively.                                                                                                 |
| `loadingTitle`                | `string`                                                                                                                                                                                                   | —          |                                                                                                                                                           |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —          | Override the container's `align-items` value for this individual flex or grid item, aligning it along the cross axis. Supports responsive values.         |
| `borderRadius`                | `Responsive<"none" \| "inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full">`                                                                                                                        | —          | Sets the responsive `border-radius` CSS property on all corners of the element.                                                                           |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-left corner.                                                                                                       |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-right corner.                                                                                                      |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the bottom-left corner.                                                                                                    |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the bottom-right corner.                                                                                                   |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-left and top-right corners.                                                                                        |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-right and bottom-right corners.                                                                                    |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the bottom-left and bottom-right corners.                                                                                  |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-left and bottom-left corners.                                                                                      |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `flex-grow`, `flex-shrink` and `flex-basis`, controlling how a flex item grows or shrinks to fit the space available in its flex container. |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —          | Set the initial main-size of a flex item before remaining space is distributed along the main axis.                                                       |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | `1`        | Set how much a flex item shrinks relative to the rest of the flex items when there isn't enough space in the container.                                   |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | `0`        | Set how much a flex item grows relative to the rest of the flex items when there is extra space in the container.                                         |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —          | Set the number of grid columns this item spans. Supports responsive values.                                                                               |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`, placing an item within a named grid area or by line numbers.   |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `grid-column-start` and `grid-column-end`, setting an item's size and location within the grid column.                                      |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's starting line within the grid column.                                                                                                       |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's ending line within the grid column.                                                                                                         |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `grid-row-start` and `grid-row-end`, setting an item's size and location within the grid row.                                               |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's starting line within the grid row.                                                                                                          |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's ending line within the grid row.                                                                                                            |
| `margin`                      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin` CSS property on all sides of the element.                                                                                    |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-top` CSS property.                                                                                                            |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-right` CSS property.                                                                                                          |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-bottom` CSS property.                                                                                                         |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-left` CSS property.                                                                                                           |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-left` and `margin-right` CSS properties.                                                                                      |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-top` and `margin-bottom` CSS properties.                                                                                      |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —          | Set the order in which the component appears among its flex or grid siblings.                                                                             |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | `'static'` | Set how the component is positioned in the document.                                                                                                      |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of all four edges (top, right, bottom, left) of a positioned component from its containing block.                                        |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the top edge of a positioned component from its containing block.                                                                     |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the right edge of a positioned component from its containing block.                                                                   |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the bottom edge of a positioned component from its containing block.                                                                  |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the left edge of a positioned component from its containing block.                                                                    |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —          | Set the width of the component.                                                                                                                           |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —          | Set the maximum width the component can grow to.                                                                                                          |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —          | Set the minimum width the component can shrink to.                                                                                                        |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —          | Set the height of the component.                                                                                                                          |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —          | Set the maximum height the component can grow to.                                                                                                         |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —          | Set the minimum height the component can shrink to.                                                                                                       |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —          | Set the stack order of a positioned component relative to its siblings.                                                                                   |

### SkeletonBox API

This component is based on `div` and supports the following common props:

- AlignSelf
- BorderRadius
- FlexItem
- GridItem
- Margin
- Order
- Position
- Size
- ZIndex

| Prop                          | Type                                                                                                                                                                                                       | Default    | Description                                                                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `display`                     | `Responsive<"none" \| "inline" \| "inline-block" \| "block">`                                                                                                                                              | —          | Sets the CSS `display` property. Can be set responsively.                                                                                                 |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —          | Override the container's `align-items` value for this individual flex or grid item, aligning it along the cross axis. Supports responsive values.         |
| `borderRadius`                | `Responsive<"none" \| "inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full">`                                                                                                                        | —          | Sets the responsive `border-radius` CSS property on all corners of the element.                                                                           |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-left corner.                                                                                                       |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-right corner.                                                                                                      |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the bottom-left corner.                                                                                                    |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the bottom-right corner.                                                                                                   |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-left and top-right corners.                                                                                        |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-right and bottom-right corners.                                                                                    |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the bottom-left and bottom-right corners.                                                                                  |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —          | Removes the border radius from the top-left and bottom-left corners.                                                                                      |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `flex-grow`, `flex-shrink` and `flex-basis`, controlling how a flex item grows or shrinks to fit the space available in its flex container. |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —          | Set the initial main-size of a flex item before remaining space is distributed along the main axis.                                                       |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | `1`        | Set how much a flex item shrinks relative to the rest of the flex items when there isn't enough space in the container.                                   |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | `0`        | Set how much a flex item grows relative to the rest of the flex items when there is extra space in the container.                                         |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —          | Set the number of grid columns this item spans. Supports responsive values.                                                                               |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`, placing an item within a named grid area or by line numbers.   |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `grid-column-start` and `grid-column-end`, setting an item's size and location within the grid column.                                      |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's starting line within the grid column.                                                                                                       |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's ending line within the grid column.                                                                                                         |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —          | Shorthand for `grid-row-start` and `grid-row-end`, setting an item's size and location within the grid row.                                               |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's starting line within the grid row.                                                                                                          |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —          | Set an item's ending line within the grid row.                                                                                                            |
| `margin`                      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin` CSS property on all sides of the element.                                                                                    |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-top` CSS property.                                                                                                            |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-right` CSS property.                                                                                                          |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-bottom` CSS property.                                                                                                         |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-left` CSS property.                                                                                                           |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-left` and `margin-right` CSS properties.                                                                                      |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —          | Sets the responsive `margin-top` and `margin-bottom` CSS properties.                                                                                      |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —          | Set the order in which the component appears among its flex or grid siblings.                                                                             |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | `'static'` | Set how the component is positioned in the document.                                                                                                      |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of all four edges (top, right, bottom, left) of a positioned component from its containing block.                                        |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the top edge of a positioned component from its containing block.                                                                     |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the right edge of a positioned component from its containing block.                                                                   |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the bottom edge of a positioned component from its containing block.                                                                  |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —          | Set the distance of the left edge of a positioned component from its containing block.                                                                    |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —          | Set the width of the component.                                                                                                                           |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —          | Set the maximum width the component can grow to.                                                                                                          |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —          | Set the minimum width the component can shrink to.                                                                                                        |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —          | Set the height of the component.                                                                                                                          |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —          | Set the maximum height the component can grow to.                                                                                                         |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —          | Set the minimum height the component can shrink to.                                                                                                       |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —          | Set the stack order of a positioned component relative to its siblings.                                                                                   |

### SkeletonBodyText API

This component is based on `div` and supports the following common props:

- Margin
- Size (width props only)

| Prop    | Type                                                                                  | Default | Description                          |
| ------- | ------------------------------------------------------------------------------------- | ------- | ------------------------------------ |
| `size`  | `Responsive<"sm" \| "md" \| "lg">`                                                    | `md`    | Set the size to match BodyText size. |
| `lines` | `"1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12"` | `1`     | Number of skeleton lines to render.  |

### SkeletonHeading API

This component is based on `div` and supports the following common props:

- Margin
- Size (width props only)

| Prop   | Type                                    | Default | Description                         |
| ------ | --------------------------------------- | ------- | ----------------------------------- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `md`    | Set the size to match Heading size. |
