# Breadcrumbs

Use the `Breadcrumbs` component when you need to help users understand and move between multiple levels of a website.

- [Current page](#current-page)
- [Inverted](#inverted)
- [Usage with Next.js](#usage-with-nextjs)
- [API](#api)

```tsx
<Flex direction="column">
  <Flex padding="400">
    <Breadcrumbs>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#" currentPage>
        Current page
      </BreadcrumbItem>
    </Breadcrumbs>
  </Flex>
  <Flex backgroundColor="brand" padding="400">
    <Breadcrumbs inverted>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#">Page</BreadcrumbItem>
      <BreadcrumbItem href="#" currentPage>
        Current page
      </BreadcrumbItem>
    </Breadcrumbs>
  </Flex>
</Flex>
```

## Current page

Use the `currentPage` prop to indicate the current page.

## Inverted

Use the `inverted` prop to adjust colours for use on darker brand backgrounds.

## Usage with Next.js

When using `Breadcrumbs` with Next.js v13 and above, use the `asChild` prop on
`BreadcrumbItem` to render it as a Next.js `Link` component.

Make sure you only do this with `BreadcrumbItem` components that are not the
current page.

```tsx
import { Breadcrumbs, BreadcrumbItem } from '@utilitywarehouse/hearth-react';
import NextLink from 'next/link';

[...]

<Breadcrumbs margin="400">
  <BreadcrumbItem asChild>
    <NextLink href="/one">
      One
    </NextLink>
  </BreadcrumbItem>
  <BreadcrumbItem asChild>
    <NextLink href="/two">
      Two
    </NextLink>
  </BreadcrumbItem>
  <BreadcrumbItem asChild>
    <NextLink href="/three">
      Three
    </NextLink>
  </BreadcrumbItem>
  <BreadcrumbItem currentPage>
    Home
  </BreadcrumbItem>
</Breadcrumbs>
```

## API

This component is based on the `nav` element and supports the following common props:

- Margin

## BreadcrumbItem API

This component is based on the `Link` component.

| Prop            | Type                                                   | Default | Description                                                                                          |
| --------------- | ------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `asChild`       | `boolean`                                              | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |
| `inverted`      | `boolean`                                              | —       | Inverts the component colours, for use on darker surface colours.                                    |
| `hideOpenIcon`  | `boolean`                                              | —       | Hides the "open in new tab" icon when `target="_blank"` is set.                                      |
| `textTransform` | `"none" \| "uppercase" \| "lowercase" \| "capitalize"` | —       | Set the text-transform on the component.                                                             |
| `currentPage`   | `boolean`                                              | —       |                                                                                                      |
