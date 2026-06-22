# IconButton

Icon Buttons are used to trigger an action on a page or to complete tasks in other components. Use Icon Buttons when you want to display an action quickly and visually, and when space is limited.

```tsx
<Flex direction="column" gap="600">
  <Flex gap="200" direction="column">
    <Heading>Emphasis</Heading>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          <IconButton variant="emphasis" colorScheme="highlight" size={size} label="add">
            <AddMediumIcon />
          </IconButton>
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          <IconButton disabled variant="emphasis" colorScheme="highlight" size={size} label="add">
            <AddMediumIcon />
          </IconButton>
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          <IconButton loading variant="emphasis" colorScheme="highlight" size={size} label="add">
            <AddMediumIcon />
          </IconButton>
        </Flex>
      ))}
    </Flex>
  </Flex>
  <Flex gap="200" direction="column">
    <Heading style={{ textTransform: 'capitalize' }}>Solid</Heading>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          {solidColorSchemes.map(colorScheme => (
            <IconButton
              key={colorScheme}
              variant="solid"
              colorScheme={colorScheme}
              size={size}
              label="add"
            >
              <AddMediumIcon />
            </IconButton>
          ))}
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          {solidColorSchemes.map(colorScheme => (
            <IconButton
              disabled
              key={colorScheme}
              variant="solid"
              colorScheme={colorScheme}
              size={size}
              label="add"
            >
              <AddMediumIcon />
            </IconButton>
          ))}
        </Flex>
      ))}
    </Flex>
    <Flex gap="400" alignItems="center">
      {sizes.map(size => (
        <Flex key={size} gap="100">
          {solidColorSchemes.map(colorScheme => (
            <IconButton
              loading
              key={colorScheme}
              variant="solid"
              colorScheme={colorScheme}
              size={size}
              label="add"
            >
              <AddMediumIcon />
            </IconButton>
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
              <IconButton
                key={colorScheme}
                variant={variant}
                colorScheme={colorScheme}
                size={size}
                label="add"
              >
                <AddMediumIcon />
              </IconButton>
            ))}
          </Flex>
        ))}
      </Flex>
      <Flex gap="400" alignItems="center">
        {sizes.map(size => (
          <Flex key={size} gap="100">
            {otherColorSchemes.map(colorScheme => (
              <IconButton
                disabled
                key={colorScheme}
                variant={variant}
                colorScheme={colorScheme}
                size={size}
                label="add"
              >
                <AddMediumIcon />
              </IconButton>
            ))}
          </Flex>
        ))}
      </Flex>
      <Flex gap="400" alignItems="center">
        {sizes.map(size => (
          <Flex key={size} gap="100">
            {otherColorSchemes.map(colorScheme => (
              <IconButton
                loading
                key={colorScheme}
                variant={variant}
                colorScheme={colorScheme}
                size={size}
                label="add"
              >
                <AddMediumIcon />
              </IconButton>
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  ))}
</Flex>
```

- [Icons](#icons)
- [Accessibility](#accessibility)
  - [Disabled buttons](#disabled-buttons)
- [Variants](#variants)
- [Colour schemes](#colour-schemes)
- [Inverted](#inverted)
- [Size](#size)
  - [Responsive icon sizes](#responsive-icon-sizes)
- [Semantic HTML](#semantic-html)
- [API](#api)

```tsx
<IconButton {...args}>
  <AddMediumIcon />
</IconButton>
```

## Icons

This button is intended to be used with the Hearth Icons packages (to be released). If you do use
another icon, please add the `data-icon` attribute to your icon so that it
renders the appropriate styles.

```tsx
<IconButton>
  <AddMediumIcon />
</IconButton>

[...]

<IconButton>
  <MyFontIcon aria-hidden="true" data-icon />
</IconButton>
```

## Accessibility

Follows the [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

Given the button contains only an icon (i.e. no text content), it is required
that a label be provided. This will be announced to a screen reader, and should
reflect the visual icon being used with the button.

Icons from the UW icons packages have `aria-hidden="true"` set by default. If
you are using an icon from outside these packages, and for purely decorative
reasons, please ensure it has this attribute set so that the icon is hidden
from screen readers.

### Disabled buttons

Disabled buttons use `aria-disabled`, rather than `disabled`, so that they are
still focusable when using the keyboard. This means that screen readers are
still able to find the button, with the insight that it is disabled and that
there is perhaps an action which needs to be taken, rather than not knowing
there is a button there at all. The `onClick` handler will be disabled, however
you will need to make sure you disable any other expected actions, including
when using `type="submit"`.

## Variants

The variant prop controls the visual appearance of the button.

```tsx
<Flex gap="400">
  <IconButton variant="emphasis" colorScheme="highlight" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="solid" colorScheme="highlight" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="outline" colorScheme="functional" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="ghost" colorScheme="functional" label="add">
    <AddMediumIcon />
  </IconButton>
</Flex>
```

```tsx
<Flex gap="400">
  <IconButton variant="emphasis" colorScheme="highlight" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="solid" colorScheme="highlight" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="outline" colorScheme="functional" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="ghost" colorScheme="functional" label="add">
    <AddMediumIcon />
  </IconButton>
</Flex>
```

- The Emphasis variant of the Button is used for high emphasis actions where there will be no compromise to functionality.
- Solid Buttons are typically used for actions that require high emphasis and are considered primary actions.
- Outline Buttons typically have a medium level of emphasis. They are best suited for non-critical actions.
- Ghost buttons are designed to have a lower prominence compared to other button variants. This makes them suitable for actions that are not as important and also allows them to be used as building blocks for other components.

## Colour schemes

The `colorScheme` prop will change the button colours.

```tsx
<IconButton colorScheme="highlight">
```

### Highlight

The Highlight colour scheme serves as the default color scheme for primary actions,
therefore is only available for Emphasis and Solid Buttons variants.

```tsx
<Flex gap="400">
  <IconButton variant="emphasis" colorScheme="highlight" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="solid" colorScheme="highlight" label="add">
    <AddMediumIcon />
  </IconButton>
</Flex>
```

### Functional

The Functional colour scheme is best suited for situations that have lower prominence,
which is why it is only available for Outline and Ghost Button variants.

```tsx
<Flex gap="400">
  <IconButton variant="outline" colorScheme="functional" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="ghost" colorScheme="functional" label="add">
    <AddMediumIcon />
  </IconButton>
</Flex>
```

### Destructive

The Destructive colour scheme is suitable for destructive actions that are irreversible,
or will have significant and negative consequences for the user.

```tsx
<Flex gap="400">
  <IconButton variant="solid" colorScheme="destructive" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="outline" colorScheme="destructive" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="ghost" colorScheme="destructive" label="add">
    <AddMediumIcon />
  </IconButton>
</Flex>
```

### Affirmative

The Affirmative colour scheme is ideal for indicating positive or affirmative
actions.

```tsx
<Flex gap="400">
  <IconButton variant="solid" colorScheme="affirmative" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="outline" colorScheme="affirmative" label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="ghost" colorScheme="affirmative" label="add">
    <AddMediumIcon />
  </IconButton>
</Flex>
```

## Inverted

The `inverted` prop should be used when using a button on darker surface
colours, specifically the UW Purple and Dark Purple colours. It only affects
the following buttons:

- Emphasis/Yellow
- Solid/Yellow
- Outline/Grey
- Ghost/grey.

**It is very important to remember to use the `inverted` prop when using the
Emphasis button on darker backgrounds. While the button itself doesn't change
colours, the focus ring colour does change, and omitting the `inverted` prop
will indermine the accessibility of the button.**

```tsx
<Flex gap="400" backgroundColor="brand" padding="400">
  <IconButton variant="emphasis" inverted label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="solid" colorScheme="highlight" inverted label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="outline" colorScheme="functional" inverted label="add">
    <AddMediumIcon />
  </IconButton>
  <IconButton variant="ghost" colorScheme="functional" inverted label="add">
    <AddMediumIcon />
  </IconButton>
</Flex>
```

## Size

The size prop controls the size of the `IconButton`. This is a responsive prop and
can be used to display different sizes at different breakpoints.

```tsx
<IconButton
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
    <IconButton variant="emphasis" size="md" label="add">
      <AddMediumIcon />
    </IconButton>
    <IconButton variant="solid" size="md" label="add">
      <AddMediumIcon />
    </IconButton>
    <IconButton variant="outline" size="md" label="add">
      <AddMediumIcon />
    </IconButton>
    <IconButton variant="ghost" size="md" label="add">
      <AddMediumIcon />
    </IconButton>
  </Flex>
  <Flex gap="400">
    <IconButton variant="emphasis" size="sm" label="add">
      <AddMediumIcon />
    </IconButton>
    <IconButton variant="solid" size="sm" label="add">
      <AddMediumIcon />
    </IconButton>
    <IconButton variant="outline" size="sm" label="add">
      <AddMediumIcon />
    </IconButton>
    <IconButton variant="ghost" size="sm" label="add">
      <AddMediumIcon />
    </IconButton>
  </Flex>
</Flex>
```

### Responsive icon sizes

If you need to render different sized icons in conjunction with the responsive
size prop, there are a couple of ways you can do this.

1. Using JS, with the `useMediaQuery` hook.

```tsx
import { AddMediumIcon, AddSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { IconButton, useMediaQuery, media } from '@utilitywarehouse/hearth-react';

const MyComponent = () => {
  const showDesktopIcon = useMediaQuery(media.above('desktop'));

  return (
    <IconButton size={{ mobile: 'sm', desktop: 'md' }}>
      {showDesktopIcon ? <AddMediumIcon /> : <AddSmallIcon />}
    </IconButton>
  );
};
```

2. Using CSS, with `Box` and style props.

```tsx
import { AddMediumIcon, AddSmallIcon } from '@utilitywarehouse/hearthreact-icons';
import { IconButton, Box } from '@utilitywarehouse/hearth-react';

const MyComponent = () => (
  <IconButton size={{ mobile: 'sm', desktop: 'md' }} label="add">
    <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
      <AddMediumIcon />
    </Box>
    <Box asChild display={{ desktop: 'none' }}>
      <AddSmallIcon />
    </Box>
  </IconButton>
);
```

## Semantic HTML

> If it goes somewhere it's a link, if it does something it's a button.

A semantic HTML button is rendered by default, however you can change the
underlying HTML element by using the `asChild` prop.

**NOTE:** Be aware that you cannot currently use `asChild` with the `emphasis` variant.

When `asChild` is set to true, the button will not render a default DOM element,
instead cloning the child and passing it the props and behaviour required to
make it functional.

Read more about this idea in the [Radix UI composition docs](https://www.radix-ui.com/primitives/docs/guides/composition).

```tsx
<Flex gap="200">
  <IconButton {...args} asChild>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
      <AddMediumIcon />
    </a>
  </IconButton>
  <IconButton {...args} asChild loading>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
      <AddMediumIcon />
    </a>
  </IconButton>
</Flex>
```

```tsx
<IconButton asChild>
  <a href="https://uw.co.uk/services">
    <AddMediumIcon />
  </a>
</IconButton>
```

## API

This component is based on the `button` element and supports the following common props:

- Margin

| Prop          | Type                                                            | Default | Description                                                                                          |
| ------------- | --------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `label`       | `string`                                                        | —       | An accessibility label that describes the button. Make sure this label reflects the visual icon.     |
| `variant`     | `"emphasis" \| "solid" \| "outline" \| "ghost"`                 | —       | Sets the button's visual variant                                                                     |
| `colorScheme` | `"highlight" \| "affirmative" \| "destructive" \| "functional"` | —       | Sets the button's colour scheme                                                                      |
| `asChild`     | `boolean`                                                       | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |
| `loading`     | `boolean`                                                       | —       | Indicate when the button is in a loading state, will also disable the button.                        |
| `inverted`    | `boolean`                                                       | —       | Inverts the component colours, for use on darker surface colours.                                    |
| `size`        | `Responsive<"sm" \| "md">`                                      | `md`    | Sets the button height.                                                                              |
