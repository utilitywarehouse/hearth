# Button

Trigger an action or event, such as submitting a form or displaying a dialog.

```tsx
<Flex direction="column" gap="600">
  <Flex gap="200" direction="column">
    <Heading>Emphasis</Heading>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          <Button variant="emphasis" colorScheme="highlight" size={size}>
            Button
          </Button>
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          <Button disabled variant="emphasis" colorScheme="highlight" size={size}>
            Button
          </Button>
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          <Button loading variant="emphasis" colorScheme="highlight" size={size}>
            Button
          </Button>
        </Flex>
      ))}
    </Flex>
  </Flex>
  <Flex gap="200" direction="column">
    <Heading>Solid</Heading>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          {solidColorSchemes.map(colorScheme => (
            <Button key={colorScheme} variant="solid" colorScheme={colorScheme} size={size}>
              Button
            </Button>
          ))}
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          {solidColorSchemes.map(colorScheme => (
            <Button
              disabled
              key={colorScheme}
              variant="solid"
              colorScheme={colorScheme}
              size={size}
            >
              Button
            </Button>
          ))}
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          {solidColorSchemes.map(colorScheme => (
            <Button loading key={colorScheme} variant="solid" colorScheme={colorScheme} size={size}>
              Button
            </Button>
          ))}
        </Flex>
      ))}
    </Flex>
  </Flex>
  {(['outline', 'ghost'] as const).map(variant => (
    <Flex key={variant} gap="200" direction="column">
      <Heading style={{ textTransform: 'capitalize' }}>{variant}</Heading>
      <Flex gap="400" alignItems="center">
        {sizes.map(size => (
          <Flex key={size} gap="100">
            {otherColorSchemes.map(colorScheme => (
              <Button key={colorScheme} variant={variant} colorScheme={colorScheme} size={size}>
                Button
              </Button>
            ))}
          </Flex>
        ))}
      </Flex>
      <Flex gap="400" alignItems="center">
        {sizes.map(size => (
          <Flex key={size} gap="100">
            {otherColorSchemes.map(colorScheme => (
              <Button
                disabled
                key={colorScheme}
                variant={variant}
                colorScheme={colorScheme}
                size={size}
              >
                Button
              </Button>
            ))}
          </Flex>
        ))}
      </Flex>
      <Flex gap="400" alignItems="center">
        {sizes.map(size => (
          <Flex key={size} gap="100">
            {otherColorSchemes.map(colorScheme => (
              <Button
                loading
                key={colorScheme}
                variant={variant}
                colorScheme={colorScheme}
                size={size}
              >
                Button
              </Button>
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  ))}
</Flex>
```

- [Accessibility](#accessibility)
  - [Disabled buttons](#disabled-buttons)
- [Variants](#variants)
- [Colour schemes](#colour-schemes)
- [Inverted](#inverted)
- [Size](#size)
- [Dead prop combinations](#dead-prop-combinations)
- [With icons](#with-icons)
- [Semantic HTML](#semantic-html)
- [Full width button](#full-width-button)
- [Padding none](#padding-none)
- [Usage with Next.js](#usage-with-next.js)
- [API](#api)

```tsx
<Button variant="solid" colorScheme="highlight">
  Button
</Button>
```

## Accessibility

Uses a native `<button>` element under the hood, with support for the <kbd>Space</kbd> and <kbd>Enter</kbd> keys.

### Disabled buttons

Disabled buttons use `aria-disabled`, rather than `disabled`, so that they are
still focusable when using the keyboard. This means that screen readers are
still able to find the button, with the insight that it is disabled and that
there is perhaps an action which needs to be taken, rather than not knowing
there is a button there at all. The `onClick` handler will be disabled, however
you will need to make sure you disable any other expected actions, including
when using `type="submit"`.

## Variants

The variant prop controls the visual appearance of the Button.

```tsx
<Flex gap={2} alignItems="center">
  <Button variant="emphasis">Button</Button>
  <Button variant="solid">Button</Button>
  <Button variant="outline">Button</Button>
  <Button variant="ghost">Button</Button>
</Flex>
```

- The Emphasis variant of the Button is used for high emphasis actions where there will be no compromise to functionality.
- Solid Buttons are typically used for actions that require high emphasis and are considered primary actions.
- Outline Buttons typically have a medium level of emphasis. They are best suited for non-critical actions.
- Ghost buttons are designed to have a lower prominence compared to other button variants. This makes them suitable for actions that are not as important and also allows them to be used as building blocks for other components.

```tsx
<Flex direction="column" gap="200" alignItems="start">
  <Button variant="emphasis">Emphasis Button</Button>

  <Flex gap="100">
    {solidColorSchemes.map(colorScheme => (
      <Button key={colorScheme} variant="solid" colorScheme={colorScheme}>
        Solid Button
      </Button>
    ))}
  </Flex>

  <Flex gap="100">
    {otherColorSchemes.map(colorScheme => (
      <Button key={colorScheme} variant="outline" colorScheme={colorScheme}>
        Outline Button
      </Button>
    ))}
  </Flex>
  <Flex gap="100">
    {otherColorSchemes.map(colorScheme => (
      <Button key={colorScheme} variant="ghost" colorScheme={colorScheme}>
        Ghost Button
      </Button>
    ))}
  </Flex>
</Flex>
```

## Colour schemes

The `colorScheme` prop will change the button colours.

```tsx
<Button colorScheme="highlight">
```

### Highlight

The Highlight colour scheme serves as the default color scheme for primary actions,
therefore is only available for Emphasis and Solid Buttons variants.

```tsx
<Flex gap="400">
  <Button variant="emphasis" colorScheme="highlight">
    Emphasis
  </Button>
  <Button variant="solid" colorScheme="highlight">
    Solid
  </Button>
</Flex>
```

### Functional

The Functional colour scheme is best suited for situations that have lower prominence,
which is why it is only available for Outline and Ghost Button variants.

```tsx
<Flex gap="400">
  <Button variant="outline" colorScheme="functional">
    Outline
  </Button>
  <Button variant="ghost" colorScheme="functional">
    Ghost
  </Button>
</Flex>
```

### Destructive

The Destructive colour scheme is suitable for destructive actions that are irreversible,
or will have significant and negative consequences for the user.

```tsx
<Flex gap="400">
  <Button variant="solid" colorScheme="destructive">
    Solid
  </Button>
  <Button variant="outline" colorScheme="destructive">
    Outline
  </Button>
  <Button variant="ghost" colorScheme="destructive">
    Ghost
  </Button>
</Flex>
```

### Affirmative

The Affirmative colour scheme is ideal for indicating positive or affirmative
actions.

```tsx
<Flex gap="400">
  <Button variant="solid" colorScheme="affirmative">
    Solid
  </Button>
  <Button variant="outline" colorScheme="affirmative">
    Outline
  </Button>
  <Button variant="ghost" colorScheme="affirmative">
    Ghost
  </Button>
</Flex>
```

## Inverted

The `inverted` prop should be used when using a `Button` on darker surface
colours, specifically the UW Purple and Dark Purple colours. It only affects
the following buttons: 

- Emphasis/Highlight
- Solid/Highlight
- Outline/Functional
- Ghost/Functional

**It is very important to remember to use the `inverted` prop when using the
Emphasis button on darker backgrounds. While the button itself doesn't change
colours, the focus ring colour does change, and omitting the `inverted` prop
will indermine the accessibility of the button.**

```tsx
<Flex gap="400" backgroundColor="brand" padding="400">
  <Button variant="emphasis" inverted>
    Emphasis
  </Button>
  <Button variant="solid" colorScheme="highlight" inverted>
    Solid
  </Button>
  <Button variant="outline" colorScheme="functional" inverted>
    Outline
  </Button>
  <Button variant="ghost" colorScheme="functional" inverted>
    Ghost
  </Button>
</Flex>
```

## Size

The size prop controls the size of the `Button`. This is a responsive prop and
can be used to display different sizes at different breakpoints.

```tsx
<Button
  size={{
    mobile: 'md',
    tablet: 'sm',
    desktop: 'md',
    wide: 'sm',
  }}
/>
```

```tsx
<Flex gap="400" direction="column">
  <Flex gap="400">
    <Button variant="emphasis" size="md">
      Emphasis
    </Button>
    <Button variant="solid" size="md">
      Solid
    </Button>
    <Button variant="outline" size="md">
      Outline
    </Button>
    <Button variant="ghost" size="md">
      Ghost
    </Button>
  </Flex>
  <Flex gap="400">
    <Button variant="emphasis" size="sm">
      Emphasis
    </Button>
    <Button variant="solid" size="sm">
      Solid
    </Button>
    <Button variant="outline" size="sm">
      Outline
    </Button>
    <Button variant="ghost" size="sm">
      Ghost
    </Button>
  </Flex>
</Flex>
```

## Dead prop combinations

Be aware there are some combinations of `colorScheme` & `variant` that do not work together (ie. `emphasis` &
`functional`), and if used will render a button with no colours at all.

```tsx
<Button variant="emphasis" colorScheme="grey">
  Invalid Button
</Button>
```

You will also see a TypeScript error:

```console
Type '{ children: string; variant: "emphasis"; colorScheme: "functional"; }' is not
assignable to type 'IntrinsicAttributes & (ButtonProps &
RefAttributes<HTMLButtonElement>)'.
  Types of property 'colorScheme' are incompatible.
    Type '"functional"' is not assignable to type '"highlight"'. (tsserver 2322)
```

## With icons

You can nest icons directly inside the `Button`. An appropriate gap is provided
automatically, and the icon will inherit the appropriate colours.

```tsx
<Button variant="solid" size="md">
  Continue
  <ChevronRight01SmallIcon />
</Button>
```

```tsx
<Flex gap="200">
  <Button {...args} variant="solid" colorScheme="destructive">
    <TrashSmallIcon />
    Delete
  </Button>
  <Button {...args} variant="solid" colorScheme="highlight">
    Account
    <UserSmallIcon />
  </Button>
  <Button {...args} variant="outline" colorScheme="functional">
    <SettingsSmallIcon />
    Settings
  </Button>
</Flex>
```

Icons from the Hearth Icons packages have `aria-hidden="true"` set by default. If
you are using an icon from outside these packages, and for purely decorative
reasons, please ensure it has this attribute set so that the icon is hidden
from screen readers.

Please also add the `data-icon` attribute to your icon so that it renders the
appropriate styles.

```tsx
<Button>
  <MyFontIcon aria-hidden="true" data-icon />
  Edit account
</Button>
```

## Semantic HTML

> If it goes somewhere it's a link, if it does something it's a button.

A semantic HTML `button` is rendered by default, however you can change the
underlying HTML element by using the `asChild` prop.

**NOTE:** Be aware that you cannot currently use `asChild` with the `emphasis` variant.

When `asChild` is set to true, we will not render a default DOM element,
instead cloning the child and passing it the props and behaviour required to
make it functional.

Read more about this idea in the [Radix UI composition docs](https://www.radix-ui.com/primitives/docs/guides/composition).

```tsx
<Flex gap="200">
  <Button asChild>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>View UW services</a>
  </Button>
  <Button asChild loading>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>View UW services</a>
  </Button>
</Flex>
```

```tsx
<Button asChild>
  <a href="https://uw.co.uk/services">View UW services</a>
</Button>
```

## Full width button

Use layout components, like `Flex`, to define your UI layouts, which can also be responsive.

```tsx
<Flex direction="column" gap="200">
  <Flex direction="column" gap="100">
    <Button>
      Full width button with icon
      <ChevronRightSmallIcon />
    </Button>
    <Button variant="emphasis">Full width emphasis button</Button>
  </Flex>
  <Flex direction="column" alignItems={{ mobile: 'stretch', desktop: 'start' }}>
    <Button>Responsive full width button</Button>
  </Flex>
</Flex>
```

```tsx
<Flex direction="column">
  <Button>Full width button</Button>
</Flex>

<Flex direction="column" alignItems={{ mobile: 'stretch', desktop: 'start' }}>
  <Button>Responsive full width button</Button>
</Flex>
```

## Padding none

If you need to better align a button with another element you can use the
`paddingNone` prop to remove the horizontal padding. This only affects the
`ghost` variant button.

```tsx
<Flex direction="column" alignItems="start" gap="100" padding="200">
  <TextInput label="Postcode" required />
  <Button variant="ghost" colorScheme="functional" size="sm" paddingNone>
    Add address manually
  </Button>
</Flex>
```

### Next.js v13

The Next.js `Link` component behaviour has changed in v13, so that an `<a>` is
no longer required as a child. You can render the Hearth React `Button` component as a
Next.js `Link` component using `asChild`:

```tsx
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

[...]

<Button asChild onClick={onClick}>
  <NextLink href={href}>{title}</NextLink>
</Button>
```

You can also use the `legacyBehavior` prop directly on the Next.js Link component:

```tsx
import NextLink from 'next/link';
import { Button } from '@utilitywarehouse/hearth-react';

[...]

<NextLink href={href} passHref legacyBehavior>
  <Button {...props} asChild onClick={onClick}>
    <a href={href as string}>{title}</a>
  </Button>
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
import { Button } from '@utilitywarehouse/hearth-react';

[...]

<NextLink href={href} passHref>
  <Button {...props} asChild onClick={onClick}>
    <a href={href as string}>{title}</a>
  </Button>
</NextLink>
```

## API

This component is based on the `button` element and supports the following common props:

- Margin

| Prop          | Type                                                            | Default | Description                                                                                           |
| ------------- | --------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `variant`     | `"emphasis" \| "solid" \| "outline" \| "ghost"`                 | —       | Sets the button's visual variant                                                                      |
| `colorScheme` | `"highlight" \| "affirmative" \| "destructive" \| "functional"` | —       | Sets the button's colour scheme                                                                       |
| `asChild`     | `boolean`                                                       | —       | Change the default rendered element for the one passed as a child, merging their props and behavior.  |
| `loading`     | `boolean`                                                       | —       | Indicate when the button is in a loading state, will also disable the button.                         |
| `inverted`    | `boolean`                                                       | —       | Inverts the component colours, for use on darker surface colours.                                     |
| `size`        | `Responsive<"sm" \| "md">`                                      | `md`    | Sets the button height.                                                                               |
| `paddingNone` | `boolean`                                                       | —       | Remove the inline padding for better alignment with other elements. Only affects the `ghost` variant. |
