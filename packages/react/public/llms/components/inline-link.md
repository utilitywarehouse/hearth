# InlineLink

- [Alternatives](#alternatives)
- [Semantic HTML](#semantic-html)
- [Colour](#colour)
- [Open in new tab](#open-in-new-tab)
- [Usage with Next.js](#usage-with-next.js)
- [API](#api)

```tsx
<Flex
  direction="column"
  gap="400"
  width="500px"
  padding="400"
  backgroundColor="primary"
  alignItems="center"
  justifyContent="center"
>
  <BodyText>
    <InlineLink {...args} />
  </BodyText>
  <BodyText>
    Agnes Martin was an American <InlineLink>abstract painter</InlineLink> known for her{' '}
    <InlineLink>minimalist</InlineLink> style. Martin&apos;s art was characterized by serene
    compositions featuring <InlineLink>grids and lines</InlineLink>. Martin&apos;s minimalist
    approach conveyed tranquility and <InlineLink>spirituality</InlineLink>, and her paintings often
    carried positive names reflective of her <InlineLink>philosophy</InlineLink>.
  </BodyText>
</Flex>
```

## Alternatives

- Link - For standalone links

## Semantic HTML

> If it goes somewhere it's a link, if it does something it's a button.

A semantic HTML `a` is rendered by default.

## Colour

You can override the default link colours, setting `color` to `"inverted"` when
used on brand backgrounds, or to `"inherit"` when the link colours need to
match the parent text colour.

```tsx
<Flex
  direction="column"
  gap="600"
  width="500px"
  backgroundColor="primary"
  alignItems="center"
  justifyContent="center"
>
  <Flex direction="column" gap="400" backgroundColor="brand" padding="400">
    <BodyText>
      <InlineLink {...args} color="inverted">
        Inverted color
      </InlineLink>
    </BodyText>
    <BodyText color="inverted">
      Agnes Martin was an American <InlineLink color="inverted">abstract painter</InlineLink> known
      for her <InlineLink color="inverted">minimalist</InlineLink> style. Martin&apos;s art was
      characterized by serene compositions featuring{' '}
      <InlineLink color="inverted">grids and lines</InlineLink>. Martin&apos;s minimalist approach
      conveyed tranquility and <InlineLink color="inverted">spirituality</InlineLink>, and her
      paintings often carried positive names reflective of her{' '}
      <InlineLink color="inverted">philosophy</InlineLink>.
    </BodyText>
  </Flex>
  <Flex direction="column" gap="400" backgroundColor="secondary" padding="400">
    <BodyText color="primary">
      <InlineLink {...args} color="inherit">
        Inherited color
      </InlineLink>
    </BodyText>
    <BodyText color="brand">
      Agnes Martin was an American <InlineLink color="inherit">abstract painter</InlineLink> known
      for her <InlineLink color="inherit">minimalist</InlineLink> style. Martin&apos;s art was
      characterized by serene compositions featuring{' '}
      <InlineLink color="inherit">grids and lines</InlineLink>. Martin&apos;s minimalist approach
      conveyed tranquility and <InlineLink color="inherit">spirituality</InlineLink>, and her
      paintings often carried positive names reflective of her{' '}
      <InlineLink color="inherit">philosophy</InlineLink>.
    </BodyText>
  </Flex>
</Flex>
```

## Open in new tab

Avoid using `target=_blank` ([When to use target="\_blank"](https://css-tricks.com/use-target_blank/)).

If you do use it, be aware that [browsers now implicitly set rel=noopener for any "target=\_blank" link](https://mathiasbynens.github.io/rel-noopener/).

An icon will also be added to indicate that the link opens in a new tab or
window, improving accessibility. You can override this behaviour by setting the
`hideOpenIcon` prop.

```tsx
<Flex gap="600">
  <InlineLink {...args}>Visit help pages</InlineLink>
  <InlineLink {...args} hideOpenIcon>
    Go to help
  </InlineLink>
</Flex>
```

### Next.js v13

The Next.js `Link` component behaviour has changed in v13, so that an `<a>` is
no longer required as a child. You can render the Web UI `InlineLink` component as a
Next.js `Link` component using `asChild`:

```tsx
import NextLink from 'next/link';
import { InlineLink } from '@utilitywarehouse/hearth-react';

[...]

{/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
<InlineLink asChild>
  <NextLink href={href} onClick={onClick}>
    {title}
  </NextLink>
</InlineLink>
```

You can also use the `legacyBehavior` prop directly on the Next.js Link component:

```tsx
import NextLink from 'next/link';
import { InlineLink } from '@utilitywarehouse/hearth-react';

[...]

<NextLink href={href} passHref onClick={onClick} legacyBehavior>
  {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
  <InlineLink>{title}</InlineLink>
</NextLink>
```

And if you want to set this behavior globally you can use the following Next.js
configuration:

```
{
  experimental: {
    newNextLinkBehavior: false
  }
}
```

### Next.js before v13

```tsx
import NextLink from 'next/link';
import { InlineLink } from '@utilitywarehouse/hearth-react';

[...]

<NextLink href={href} passHref onClick={onClick}>
  {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
  <TextLink>{title}</TextLink>
</NextLink>
```

## API

This component is based on the `a` element and supports the following common props:

- Margin
- Text transform

| Prop           | Type                                   | Default | Description                                                                                                                                                                                                                                                                                                                     |
| -------------- | -------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`        | `"default" \| "inverted" \| "inherit"` | —       | Sets the color scheme for the InlineLink. - 'default': Uses the standard link color. - 'inverted': Uses a color suitable for dark backgrounds. Use when placing the link on a dark or colored background for better contrast. - 'inherit': Inherits the color from its parent element. Use to match the surrounding text color. |
| `asChild`      | `boolean`                              | —       | Change the default rendered element for the one passed as a child, merging their props and behavior.                                                                                                                                                                                                                            |
| `hideOpenIcon` | `boolean`                              | —       | Hides the "open in new tab" icon when `target="_blank"` is set.                                                                                                                                                                                                                                                                 |
