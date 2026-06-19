# SearchInput

`SearchInput` allows users to enter a specific keyword or phrase and obtain results related to the context in which it is placed.

- [Alternatives](#alternatives)
- [Accessibility](#accessibility)
- [Label](#label)
- [Clear](#clear)
- [Loading](#loading)
- [Usage with a button](#usage-with-a-button)
- [API](#api)

```tsx
<SearchInput
  value={value}
  onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
  onClear={() => setValue('')}
  id="search-input-playground"
  {...args}
/>
```

## Alternatives

- TextInput - For text
- PasswordInput - For passwords
- CurrencyInput - For money

## Accessibility

Wrap `SearchInput` in a container element with `role="search"` to increase
their discoverability to assistive technologies. This parent element should
encompass all of the elements that together form the search feature.

Be aware though that too many landmark roles such as this can create
unnecessary 'noise' for screen reader users, and should be used sparingly on a
page.

You can learn more about this at the [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role).

```tsx
<form role="search">
  <SearchInput />
</form>
```

## Label

A label is required. By default it will be visually hidden, but still available
to screen readers. You can change this by setting `hideLabel` to `false`.

## Clear

You can pass a function to the `onClear` prop to clear the input. When there is
a value the `clear` button will be present, and clicking it will call the
`onClear` function. This should be used only to clear the value of the input.

## Loading

You can set the `SearchInput` into a loading state, where it will disable the
input and display a loading spinner.

```tsx
<SearchInput
  {...args}
  value={value}
  onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
  onClear={() => setValue('')}
  loading
/>
```

## Usage with a button

On desktop, and tablet the `SearchInput` must be followed by a button which triggers the
containing form's search action. Results should be shown after the user
triggers the search action.

On mobile, no button is required, as the search can be triggered by
tapping on the search button on the keyboard or dynamically while typing. On
older mobile browsers, the enter key may not explicitly display the word
_Search_ but will still trigger the containing form's search action. Results
should be shown dynamically as the user types or after tapping on the search
button on the keyboard.

You can achieve this UI using responsive props.

```tsx
<Flex asChild gap="50" width={{ mobile: '100%', tablet: '500px' }}>
  <form role="search" action={search}>
    <SearchInput
      label="Search"
      value={value}
      placeholder="What do you need help with?"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
      onClear={() => setValue('')}
    />
    <Box display={{ mobile: 'none', tablet: 'block' }}>
      <Button variant="solid" colorScheme="yellow">
        Search
      </Button>
    </Box>
  </form>
</Flex>
```

## API

This component is based on the `TextInput` component and supports the following common props:

- Margin

| Prop               | Type                  | Default | Description                                                                 |
| ------------------ | --------------------- | ------- | --------------------------------------------------------------------------- |
| `label`            | `string`              | —       | The label for the form field, describing its purpose.                       |
| `defaultValue`     | `string \| number`    | —       | The initial value of the input when rendered.                               |
| `value`            | `string \| number`    | —       | The controlled value of the input. Must be used with an `onChange` handler. |
| `labelId`          | `string`              | —       |                                                                             |
| `helperTextId`     | `string`              | —       |                                                                             |
| `validationTextId` | `string`              | —       |                                                                             |
| `hideLabel`        | `boolean`             | `true`  | Visually hide the label.                                                    |
| `labelVariant`     | `"body" \| "heading"` | —       | Change the label variant                                                    |
| `helperText`       | `string`              | —       | Optional helper text to provide additional context or instructions.         |
| `onClear`          | `(() => void)`        | —       |                                                                             |
| `loading`          | `boolean`             | —       |                                                                             |
