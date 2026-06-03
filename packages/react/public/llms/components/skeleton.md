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

| Prop                          | Type                                                                                                                                                                                                       | Default | Description |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| `display`                     | `Responsive<"none" \| "inline" \| "inline-block" \| "block">`                                                                                                                                              | —       |             |
| `loadingTitle`                | `string`                                                                                                                                                                                                   | —       |             |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |             |
| `borderRadius`                | `Responsive<"none" \| "inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full">`                                                                                                                        | —       |             |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —       |             |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |             |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `margin`                      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |             |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —       |             |

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

| Prop                          | Type                                                                                                                                                                                                       | Default | Description |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| `display`                     | `Responsive<"none" \| "inline" \| "inline-block" \| "block">`                                                                                                                                              | —       |             |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |             |
| `borderRadius`                | `Responsive<"none" \| "inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full">`                                                                                                                        | —       |             |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —       |             |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —       |             |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |             |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `margin`                      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |             |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |             |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |             |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —       |             |

### SkeletonBodyText API

This component is based on `div` and supports the following common props:

- Margin
- Size (width props only)

| Prop           | Type                                                                                                                                                                                                       | Default | Description                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------ |
| `width`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                      |
| `maxWidth`     | `Responsive<string>`                                                                                                                                                                                       | —       |                                      |
| `minWidth`     | `Responsive<string>`                                                                                                                                                                                       | —       |                                      |
| `size`         | `Responsive<"sm" \| "md" \| "lg">`                                                                                                                                                                         | `md`    | Set the size to match BodyText size. |
| `lines`        | `"1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12"`                                                                                                                      | `1`     | Number of skeleton lines to render.  |
| `margin`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                      |
| `marginTop`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                      |
| `marginRight`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                      |
| `marginBottom` | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                      |
| `marginLeft`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                      |
| `marginX`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                      |
| `marginY`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                      |

### SkeletonHeading API

This component is based on `div` and supports the following common props:

- Margin
- Size (width props only)

| Prop           | Type                                                                                                                                                                                                       | Default | Description                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------- |
| `width`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                     |
| `maxWidth`     | `Responsive<string>`                                                                                                                                                                                       | —       |                                     |
| `minWidth`     | `Responsive<string>`                                                                                                                                                                                       | —       |                                     |
| `size`         | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                                                    | `md`    | Set the size to match Heading size. |
| `margin`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                     |
| `marginTop`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                     |
| `marginRight`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                     |
| `marginBottom` | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                     |
| `marginLeft`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                     |
| `marginX`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                     |
| `marginY`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                     |
