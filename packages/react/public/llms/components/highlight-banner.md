# HighlightBanner

`HighlightBanner` can be used to highlight key information or marketing messaging.

```tsx
<Flex gap="400" width="800px">
  <HighlightBanner heading="Save a bundle" headingColor="highlight" colorScheme="neutralStrong">
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <img src={piggies} height="200px" />
    <HighlightBannerFooter>
      <BodyText size="md" wrap="wrap">
        Homeowners who bundle two or more services with UW and activate the Cashback Card trial will
        receive up to £150 in credit.
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
        For almost 30 years, we&apos;ve been providing energy, broadband, mobile and insurance to
        the nation - and helping our customers save along the way.
      </BodyText>
      <BodyText size="md" textAlign="center">
        Want to talk it through? Our network of friendly, local Partners can help you find ways to
        save.
      </BodyText>
      <Link href="#">
        Find a UW Partner
        <ChevronRightSmallIcon />
      </Link>
    </HighlightBannerContent>
  </HighlightBanner>
</Flex>
```

## Usage

- `HighlightBanner` - the parent component, provides heading and main content layout
- `HighlightBannerContent` - For main content that requires consistent banner layout
- `HighlightBannerFooter` - For footer content

## Heading color

```tsx
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
```

## Shadow colours

You can add a shadows for additional emphasis, using the `shadowColor` prop.
Ensure the shadow in the same colour family as the Highlight Banner. E.g. Use a
Pig shadow with a Pig Highlight Banner

Be aware that shadows can denote interactions. It is recommended to only use
shadows with interactive content.

```tsx
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
```

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop           | Type                                                                                                   | Default | Description                 |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------- | --------------------------- |
| `shadowColor`  | `"brand" \| "mobile" \| "energy" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "functional"` | —       | Sets the card shadow colour |
| `colorScheme`  | `"neutralStrong" \| "neutralSubtle"`                                                                   | —       |                             |
| `heading`      | `string`                                                                                               | —       |                             |
| `headingColor` | `"mobile" \| "energy" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "highlight"`             | —       |                             |
