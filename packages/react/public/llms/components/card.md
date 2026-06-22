# Card

Use Cards as containers for concise information about a single subject. They can display featured information, related content, or navigational choices. In groups, cards present collections of similar content.

- [Components](#components)
- [Alternatives](#alternatives)
- [Variant](#variant)
- [Color Scheme](#color-scheme)
- [Grouping related cards](#grouping-related-cards)
- [Interactive Cards](#interactive-cards)
  - [Shadow colours](#shadow-colours)
- [Card Actions](#card-actions)
- [Banners](#banners)
- [API](#api)

```tsx
<Card {...args} width="400px" marginX="auto">
  <BodyText size="md">{children}</BodyText>
</Card>
```

## Components

- `Card` - The main card container.
- `CardActionLink` - A card action which renders a link.
- `CardActionButton` - A card action which renders a button.
- `CardActions` - A wrapper for multiple card actions.
- `CardContent` - Layout for card content.
- `CardInteraction` - A wrapper for additional card interactions.
- `CardBannerContent` - Layout for banner text content.
- `CardBannerImage` - A wrapper for a banner image.

## Alternatives

- HighlightBanner - For highlighting
  key information or marketing messaging

## Variant

The `variant` prop controls the visual weight of the card. Use `subtle` for a low-emphasis container and `emphasis` for a more prominent, filled appearance.

```tsx
<Flex gap="400" padding="400" wrap="wrap">
  {variants.map(variant => (
    <Card key={variant} variant={variant} colorScheme="neutralStrong" width="300px">
      <BodyText size="md">
        <strong>{variant}</strong>
      </BodyText>
    </Card>
  ))}
</Flex>
```

## Color Scheme

The `colorScheme` prop sets the colour family applied to the card surface. It works in combination with `variant` — `subtle` applies a light tint of the colour, while `emphasis` uses a stronger fill. All available colour schemes are shown below, each with both variants.

> **Note:** The `highlight` colour scheme is only available with the `subtle` variant.

```tsx
<Flex direction="column" gap="400" padding="400">
  {colorSchemes.map(colorScheme => (
    <Flex key={colorScheme} gap="400">
      {variants.flatMap(variant => {
        if (colorScheme === 'highlight' && variant === 'emphasis') return [];
        return (
          <Card key={variant} colorScheme={colorScheme} variant={variant} width="300px">
            <BodyText size="md" inverted={colorScheme === 'brand' && variant === 'emphasis'}>
              <strong>
                {colorScheme} / {variant}
              </strong>
            </BodyText>
          </Card>
        );
      })}
    </Flex>
  ))}
</Flex>
```

## Grouping related cards

When grouping related `Card` components, they should be rendered as list items, as part of a list.

```tsx
<Flex asChild>
  <ul role="list">
    <li>
      <Card>{...}</Card>
    </li>
    <li>
      <Card>{...}</Card>
    </li>
    <li>
      <Card>{...}</Card>
    </li>
  </ul>
</Flex>
```

## Interactive Cards

By default the `Card` is static. When adding interactive actions, such as
links, or buttons, you should use the `CardInteraction` component.

The `CardInteraction` component will make the child element's clickable area extend
to the bounds of the parent `Card`. You can choose to set the `asChild` prop on
the `CardInteraction` component, but it's not essential.

There should only ever be one main card action in each `Card`.

```tsx
<Card>
  <Heading size="sm">{title}</Heading>
  <BodyText size="md">{content}</BodyText>
  <CardInteraction asChild>
    <Link href="http://...">
      Find out more
      <ChevronRightSmallIcon />
    </Link>
  </CardInteraction>
</Card>
```

If you need to add secondary actions to the card, use the `secondary` prop on
the `CardInteraction` component. This will ensure any secondary actions are
clickable, but do not overlay the primary action.

```tsx
<Card variant="emphasis" colorScheme="neutralStrong" flex="1" direction="column" gap="150">
  <Flex alignItems="start">
    <Heading size="sm">This is a card with multiple interactions</Heading>
    <CardInteraction secondary>
      <IconButton variant="ghost" size="sm" label="close" onClick={() => console.log('close')}>
        <CloseSmallIcon />
      </IconButton>
    </CardInteraction>
  </Flex>
  <BodyText size="md">The components within the card are interactive component</BodyText>
  <CardInteraction>
    <Button variant="solid" colorScheme="yellow" onClick={() => console.log('action')}>
      Button
    </Button>
  </CardInteraction>
</Card>
```

```tsx
<Flex padding="600" gap="400" direction="column" alignItems="start" width="700px">
  <Flex asChild gap="300" wrap="wrap">
    <ul role="list">
      <li>
        <Card {...args} variant="emphasis" colorScheme="neutralStrong" direction="column" gap="150">
          <Heading size="sm">Neutral Card</Heading>
          <BodyText size="md">neutralStrong & emphasis</BodyText>
          <CardInteraction asChild>
            <Link href="#">
              Link
              <ChevronRightSmallIcon />
            </Link>
          </CardInteraction>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="neutralStrong">
          <Flex direction="column" gap="150">
            <Heading size="sm">Neutral Card</Heading>
            <BodyText size="md">neutralStrong & subtle</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="emphasis" colorScheme="neutralSubtle">
          <Flex direction="column" gap="150">
            <Heading size="sm">Neutral Card</Heading>
            <BodyText size="md">neutralSubtle & emphasis</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="neutralSubtle">
          <Flex direction="column" gap="150">
            <Heading size="sm">Neutral Card</Heading>
            <BodyText size="md">neutralSubtle & subtle</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>
    </ul>
  </Flex>

  <Flex asChild gap="300" wrap="wrap">
    <ul role="list">
      <li>
        <Card {...args} variant="subtle" colorScheme="brand">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Brand Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="pig">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Pig Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="highlight">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Highlight Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>
    </ul>
  </Flex>

  <Flex asChild gap="300" wrap="wrap">
    <ul role="list">
      <li>
        <Card {...args} variant="subtle" colorScheme="energy">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Energy Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="mobile">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Mobile Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="broadband">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Broadband Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="insurance">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Insurance Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>

      <li>
        <Card {...args} variant="subtle" colorScheme="cashback">
          <Flex direction="column" gap="150" justifyContent="between">
            <Heading size="sm">Cashback Card</Heading>
            <BodyText size="md">Content</BodyText>
            <CardInteraction asChild>
              <Link href="#">
                Link
                <ChevronRightSmallIcon />
              </Link>
            </CardInteraction>
          </Flex>
        </Card>
      </li>
    </ul>
  </Flex>

  <Flex asChild direction="row" gap="200" wrap="wrap">
    <ul role="list">
      <li>
        <Card
          {...args}
          variant="emphasis"
          colorScheme="neutralStrong"
          direction="column"
          gap="150"
          alignItems="start"
        >
          <Heading size="sm">This is a card with a single interaction</Heading>
          <BodyText size="md">
            The card itself doesn’t need to be clickable and the only interaction is with the
            interactive component nested within the card
          </BodyText>
          <Button variant="solid" colorScheme="highlight" onClick={() => console.log('hello')}>
            Button
          </Button>
        </Card>
      </li>

      <li>
        <Card {...args} variant="emphasis" colorScheme="neutralStrong" direction="column" gap="150">
          <Heading size="sm">This whole card is clickable</Heading>
          <BodyText size="md">
            This whole card is tappable/clickable but the state is applied to the interactive
            component
          </BodyText>
          <CardInteraction>
            <Button variant="solid" colorScheme="highlight" onClick={() => console.log('hello')}>
              Button
            </Button>
          </CardInteraction>
        </Card>
      </li>

      <li>
        <Card {...args} variant="emphasis" colorScheme="neutralStrong" direction="column" gap="150">
          <Flex alignItems="start" justifyContent="between">
            <Heading size="sm">This is a card with multiple interactions</Heading>
            <CardInteraction secondary>
              <IconButton
                variant="ghost"
                size="sm"
                label="close"
                onClick={() => console.log('close')}
              >
                <CloseSmallIcon />
              </IconButton>
            </CardInteraction>
          </Flex>
          <BodyText size="md">The components within the card are interactive component</BodyText>
          <CardInteraction>
            <Button variant="solid" colorScheme="highlight" onClick={() => console.log('action')}>
              Button
            </Button>
          </CardInteraction>
        </Card>
      </li>
    </ul>
  </Flex>
</Flex>
```

### Shadow colours

You can set a shadow on the `Card` component using the `shadowColor` prop.

Shadows serve as a visual cue for interactivity. While interactive cards do not
require a shadow, shadows should only be applied to cards that contain an
action. Don't apply a shadow to a static card.

> **Note:** Shadow colours should only be used with the `neutralStrong` or `neutralSubtle` colour schemes.

```tsx
<Flex gap="400" padding="400" wrap="wrap">
  {shadowColors.map(c => (
    <Card {...args} key={c} shadowColor={c}>
      <BodyText size="md">{children}</BodyText>
      <CardInteraction asChild>
        <Link href="https://en.wikipedia.org/wiki/Maya_Angelou" target="_blank">
          Learn more
        </Link>
      </CardInteraction>
    </Card>
  ))}
</Flex>
```

## Card Actions

Separate to `CardInteraction` you can include `CardActions` within a `Card`
component. These are visually different UI elements that are used in various
different lock ups to call actions to content within a card. You do not need to
wrap them in a `CardInteraction` component.

`CardActionLink` and `CardActionButton` can be used standalone within a `Card`
component. If you set the `leadingIconContainerColorScheme` then the
`leadingIcon` will be rendered within an `IconContainer`.

You can also include a `Badge` and `trailingIcon`.

```tsx
<Flex padding="500" direction="row" gap="500" backgroundColor="secondary" wrap="wrap">
  <Card {...args}>
    <CardActionButton
      heading="Electricity"
      helperText="Last reading: 30th Oct"
      leadingIcon={<ElectricityMediumIcon />}
      leadingIconContainerColorScheme="energy"
      badge={
        <Badge colorScheme="info" size="sm">
          Smart meter
        </Badge>
      }
      badgePlacement="middle"
    />
  </Card>
  <Card {...args}>
    <CardActionButton
      heading="Home Insurance"
      helperText="B12ABCD38"
      leadingIcon={<HomeInsuranceMediumIcon />}
      badge={
        <Badge variant="outline" colorScheme="functional" size="sm">
          Disconnected
        </Badge>
      }
      badgePlacement="bottom"
    />
  </Card>
  <Card {...args}>
    <CardActionButton
      heading="Card Action"
      helperText="With badge to the right"
      badge={
        <Badge variant="subtle" colorScheme="positive" size="sm">
          Live
        </Badge>
      }
      badgePlacement="right"
    />
  </Card>
</Flex>
```

When including multiple `CardActionLink` or `CardActionButton` components you
must wrap them in the `CardActions` component.

```tsx
<Card {...args} width="500px">
  <CardActions direction="column">
    <CardActionButton
      leadingIcon={<HomeInsuranceMediumIcon />}
      leadingIconContainerColorScheme="insurance"
      heading="Home insurance"
      helperText="B12ABCD34"
      badge={
        <Badge size="sm" colorScheme="positive">
          Live
        </Badge>
      }
      badgePlacement="right"
    />
    <CardActionButton
      disabled
      leadingIcon={<HomeAndBoilerMediumIcon />}
      leadingIconContainerColorScheme="insurance"
      heading="Boiler & home cover"
      helperText="B12ABCD37"
      badge={
        <Badge size="sm" colorScheme="positive">
          Live
        </Badge>
      }
      badgePlacement="right"
    />
  </CardActions>
</Card>
```

When using `CardActions` alongside other additional content, you must wrap the
additional content in a `CardContent` component. If necessary, you can set the
`paddingBottomNone` prop to remove the bottom padding.

```tsx
<Flex padding="500" direction="column" gap="500" backgroundColor="secondary" wrap="wrap">
  <Card {...args} width="fit-content">
    <CardContent direction="column" spacing="lg">
      <Heading size="md" as="h2">
        Your December bill
      </Heading>

      <Flex direction="column" spacing="sm">
        <DetailText size="4xl">£110.00</DetailText>
        <Flex gap="50" alignItems="center">
          <TickCircleSmallIcon />
          <BodyText size="md">Your Direct Debit is ready to go</BodyText>
        </Flex>
      </Flex>
    </CardContent>
    <CardActions direction="column">
      <CardActionButton heading="Download PDF" trailingIcon={<DownloadSmallIcon />} />
      <CardActionButton heading="Open PDF" trailingIcon={<OpenSmallIcon />} />
      <CardActionButton heading="Email PDF" trailingIcon={<EmailSmallIcon />} disabled />
    </CardActions>
  </Card>
  <Card {...args}>
    <CardContent direction="column" spacing="lg">
      <Heading size="md" as="h2">
        Your December bill
      </Heading>

      <Flex direction="column" spacing="sm">
        <DetailText size="4xl">£110.00</DetailText>
        <Flex gap="50" alignItems="center">
          <TickCircleSmallIcon />
          <BodyText size="md">Your Direct Debit is ready to go</BodyText>
        </Flex>
      </Flex>
    </CardContent>
    <CardActions direction={{ mobile: 'column', tablet: 'row' }}>
      <CardActionButton heading="Download PDF" trailingIcon={<DownloadSmallIcon />} />
      <CardActionButton heading="Open PDF" trailingIcon={<OpenSmallIcon />} />
      <CardActionButton heading="Email PDF" trailingIcon={<EmailSmallIcon />} disabled />
    </CardActions>
  </Card>
</Flex>
```

## Banners

Banners can be created using a `Card` along with the `CardBannerContent` & `CardBannerImage` helper components.

### Text only

```tsx
<Card spacing="lg" justifyContent="between">
  <CardBannerContent heading="This is a banner heading" description="Put your description here">
    <Link href="#">
      Link
      <ChevronRightSmallIcon />
    </Link>
  </CardBannerContent>

  <UnstyledIconButton label="close">
    <CloseSmallIcon />
  </UnstyledIconButton>
</Card>
```

### With an icon container

```tsx
<Flex gap="400">
  <Card spacing="md">
    <IconContainer colorScheme="pig">
      <PlaceholderSmallIcon />
    </IconContainer>
    <CardBannerContent heading="This is a banner heading" description="Put your description here">
      <Link href="#">
        Link
        <ChevronRightSmallIcon />
      </Link>
    </CardBannerContent>
    <UnstyledIconButton label="close">
      <CloseSmallIcon />
    </UnstyledIconButton>
  </Card>
  <Card spacing="lg">
    <Flex spacing="lg" direction="column" alignItems="start">
      <IconContainer colorScheme="pig">
        <PlaceholderSmallIcon />
      </IconContainer>
      <CardBannerContent heading="This is a banner heading" description="Put your description here">
        <Link href="#">
          Link
          <ChevronRightSmallIcon />
        </Link>
      </CardBannerContent>
    </Flex>
    <UnstyledIconButton label="close">
      <CloseSmallIcon />
    </UnstyledIconButton>
  </Card>
</Flex>
```

### With an illustration

```tsx
<Flex gap="400">
  <Card spacing="lg" colorScheme="pig" variant="subtle" alignItems="center" width="450px">
    <img src={SpotSavings} alt="Savings Pig" width={80} />

    <CardBannerContent
      heading="Save money on your household bills when you get it together"
      description="Our network of friendly, local Partners can help you find ways to save."
    >
      <Link href="#">
        Find a UW Partner
        <ChevronRightSmallIcon />
      </Link>
    </CardBannerContent>
  </Card>
  <Card
    spacing="lg"
    direction="column"
    alignItems="center"
    maxWidth="300px"
    colorScheme="energy"
    variant="subtle"
  >
    <Flex width="100%" position="relative" justifyContent="center">
      <img src={SpotSmartMeter} alt="Billing Pig" width={80} />
      <Box position="absolute" top="0" right="0">
        <UnstyledIconButton label="close">
          <CloseSmallIcon />
        </UnstyledIconButton>
      </Box>
    </Flex>
    <CardBannerContent
      heading="Save a bundle"
      description="Our network of friendly, local Partners can help you find ways to save."
      textAlign="center"
      alignItems="center"
    >
      <Link href="#">
        Find a UW Partner
        <ChevronRightSmallIcon />
      </Link>
    </CardBannerContent>
  </Card>
</Flex>
```

### With an image

```tsx
<Flex gap="400">
  <Card spacing="md" maxWidth="420px">
    <CardBannerImage width="160px" height="174px">
      <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
    </CardBannerImage>
    <CardBannerContent
      heading="Save a bundle"
      description="Homeowners who bundle two or more services with UW and activate the Cashback Card trial will receive up to £150 in credit."
    />
  </Card>
  <Card spacing="lg" direction="column" alignItems="start" maxWidth="300px">
    <CardBannerImage height="160px">
      <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
    </CardBannerImage>
    <CardBannerContent
      heading="Save a bundle"
      description="Our network of friendly, local Partners can help you find ways to save."
    >
      <Link href="#">
        Find a UW Partner
        <ChevronRightSmallIcon />
      </Link>
    </CardBannerContent>
  </Card>
</Flex>
```

### Accessibility

By default `CardActions` renders a `ul` element. If the order of the actions
matters then use the `as` prop to render a `ol` instead.

## API

This component is based on the `Flex` component and supports the following common props:

- AlignSelf
- Margin
- Size
- Position
- Flex item
- Grid item
- Text align
- Overflow
- Opacity
- Order
- Overflow

| Prop              | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `spacing`         | `"none" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                         | —       | Set responsive spacing between child elements.                                                                                                         |
| `display`         | `Responsive<"flex" \| "none" \| "inline-flex">`                                                                                                                                                            | —       |                                                                                                                                                        |
| `direction`       | `Responsive<"row" \| "column" \| "row-reverse" \| "column-reverse">`                                                                                                                                       | —       |                                                                                                                                                        |
| `wrap`            | `Responsive<"wrap" \| "nowrap" \| "wrap-reverse">`                                                                                                                                                         | —       |                                                                                                                                                        |
| `alignContent`    | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       |                                                                                                                                                        |
| `alignItems`      | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "baseline">`                                                                                                                                      | —       |                                                                                                                                                        |
| `alignSelf`       | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `flex`            | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexBasis`       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexShrink`      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexGrow`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gap`             | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `rowGap`          | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `columnGap`       | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `gridColumnSpan`  | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |                                                                                                                                                        |
| `gridArea`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumn`      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnStart` | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnEnd`   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRow`         | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowStart`    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowEnd`      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `justifyContent`  | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property. |
| `margin`          | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginTop`       | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginRight`     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginBottom`    | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginLeft`      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginX`         | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginY`         | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `opacity`         | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `order`           | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `overflow`        | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowX`       | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowY`       | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `position`        | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |                                                                                                                                                        |
| `inset`           | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `top`             | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `right`           | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `bottom`          | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `left`            | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `width`           | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxWidth`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minWidth`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `height`          | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxHeight`       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minHeight`       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `textAlign`       | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —       |                                                                                                                                                        |
| `textTransform`   | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                                                                               |
| `zIndex`          | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `variant`         | `"emphasis" \| "subtle"`                                                                                                                                                                                   | —       | Sets the card's visual variant                                                                                                                         |
| `colorScheme`     | `"brand" \| "mobile" \| "neutralStrong" \| "neutralSubtle" \| "energy" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "highlight"`                                                                | —       | Sets the card's colour scheme                                                                                                                          |
| `paddingNone`     | `boolean`                                                                                                                                                                                                  | —       | Remove padding                                                                                                                                         |
| `shadowColor`     | `"brand" \| "mobile" \| "energy" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "functional"`                                                                                                     | —       | Sets the card shadow colour                                                                                                                            |

### CardInteraction API

This component is based on the `Flex` component.

### CardActions API

This component is based on the `ul` element and supports the following common props:

- Margin

| Prop        | Type                            | Default | Description                                                                                      |
| ----------- | ------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `as`        | `"ul" \| "ol"`                  | `ul`    | Shorthand for changing the default rendered element into a semantically appropriate alternative. |
| `direction` | `Responsive<"column" \| "row">` | —       |                                                                                                  |

### CardActionLink API

This component is based on the `a` element.

| Prop                              | Type                                                                                       | Default    | Description                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------- |
| `heading`                         | `string`                                                                                   | —          |                                                                     |
| `helperText`                      | `string`                                                                                   | —          | Optional helper text to provide additional context or instructions. |
| `leadingIcon`                     | `ReactNode`                                                                                | —          |                                                                     |
| `leadingIconContainerColorScheme` | `"energy" \| "mobile" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "highlight"` | —          |                                                                     |
| `trailingIcon`                    | `ReactNode`                                                                                | —          |                                                                     |
| `badge`                           | `ReactNode`                                                                                | —          |                                                                     |
| `badgePlacement`                  | `"middle" \| "bottom" \| "right"`                                                          | `'bottom'` | Placement of the badge element                                      |
| `asChild`                         | `boolean`                                                                                  | —          |                                                                     |

### CardActionButton API

This component is based on the `button` element.

| Prop                              | Type                                                                                       | Default    | Description                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------- |
| `heading`                         | `string`                                                                                   | —          |                                                                     |
| `helperText`                      | `string`                                                                                   | —          | Optional helper text to provide additional context or instructions. |
| `leadingIcon`                     | `ReactNode`                                                                                | —          |                                                                     |
| `leadingIconContainerColorScheme` | `"energy" \| "mobile" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "highlight"` | —          |                                                                     |
| `trailingIcon`                    | `ReactNode`                                                                                | —          |                                                                     |
| `badge`                           | `ReactNode`                                                                                | —          |                                                                     |
| `badgePlacement`                  | `"middle" \| "bottom" \| "right"`                                                          | `'bottom'` | Placement of the badge element                                      |

### CardContent API

This component is based on the `Card` component, supporting the same props except for those related to appearance and polymorphism.

| Prop                | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `spacing`           | `"none" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                         | —       | Set responsive spacing between child elements.                                                                                                         |
| `display`           | `Responsive<"flex" \| "none" \| "inline-flex">`                                                                                                                                                            | —       |                                                                                                                                                        |
| `direction`         | `Responsive<"row" \| "column" \| "row-reverse" \| "column-reverse">`                                                                                                                                       | —       |                                                                                                                                                        |
| `wrap`              | `Responsive<"wrap" \| "nowrap" \| "wrap-reverse">`                                                                                                                                                         | —       |                                                                                                                                                        |
| `alignContent`      | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       |                                                                                                                                                        |
| `alignItems`        | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "baseline">`                                                                                                                                      | —       |                                                                                                                                                        |
| `alignSelf`         | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `flex`              | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexBasis`         | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexShrink`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexGrow`          | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gap`               | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `rowGap`            | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `columnGap`         | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `gridColumnSpan`    | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |                                                                                                                                                        |
| `gridArea`          | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumn`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnStart`   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnEnd`     | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRow`           | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowStart`      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowEnd`        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `justifyContent`    | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property. |
| `margin`            | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginTop`         | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginRight`       | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginBottom`      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginLeft`        | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginX`           | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginY`           | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `opacity`           | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `order`             | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `overflow`          | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowX`         | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowY`         | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `position`          | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |                                                                                                                                                        |
| `inset`             | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `top`               | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `right`             | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `bottom`            | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `left`              | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `width`             | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxWidth`          | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minWidth`          | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `height`            | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxHeight`         | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minHeight`         | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `textAlign`         | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —       |                                                                                                                                                        |
| `textTransform`     | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                                                                               |
| `zIndex`            | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `paddingNone`       | `boolean`                                                                                                                                                                                                  | —       | Remove padding                                                                                                                                         |
| `shadowColor`       | `"brand" \| "mobile" \| "energy" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "functional"`                                                                                                     | —       | Sets the card shadow colour                                                                                                                            |
| `paddingBottomNone` | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |

### CardBannerContent API

This component is based on the `Flex` component.

| Prop                          | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `asChild`                     | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `display`                     | `Responsive<"flex" \| "none" \| "inline-flex">`                                                                                                                                                            | —       |                                                                                                                                                        |
| `wrap`                        | `Responsive<"wrap" \| "nowrap" \| "wrap-reverse">`                                                                                                                                                         | —       |                                                                                                                                                        |
| `alignContent`                | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       |                                                                                                                                                        |
| `alignItems`                  | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "baseline">`                                                                                                                                      | —       |                                                                                                                                                        |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `backgroundColor`             | `"primary" \| "secondary" \| "brand" \| `var(--h-${string})``                                                                                                                                              | —       |                                                                                                                                                        |
| `borderColor`                 | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderTopColor`              | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderRightColor`            | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderBottomColor`           | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderLeftColor`             | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderRadius`                | `Responsive<"none" \| "inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full">`                                                                                                                        | —       |                                                                                                                                                        |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderStyle`                 | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderTopStyle`              | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderRightStyle`            | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderBottomStyle`           | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderLeftStyle`             | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderWidth`                 | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderTopWidth`              | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderRightWidth`            | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderBottomWidth`           | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderLeftWidth`             | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `color`                       | `"primary" \| "secondary" \| "brand" \| "affirmative" \| "inverted" \| `var(--h-${string})``                                                                                                               | —       |                                                                                                                                                        |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gap`                         | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `rowGap`                      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `columnGap`                   | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |                                                                                                                                                        |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `justifyContent`              | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property. |
| `margin`                      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `opacity`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `overflow`                    | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowX`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowY`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `padding`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingTop`                  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingRight`                | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingBottom`               | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingLeft`                 | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingX`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingY`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |                                                                                                                                                        |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `textAlign`                   | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —       |                                                                                                                                                        |
| `textTransform`               | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                                                                               |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `heading`                     | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                        |
| `description`                 | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                        |
