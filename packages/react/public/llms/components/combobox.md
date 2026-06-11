# Combobox

`Combobox` allows users to both type to filter results and select from a predefined list.

- [Usage](#usage)
- [Trigger only on type](#trigger-only-on-type)
- [No options found](#no-options-found)
- [Status text](#status-text)
- [useComboboxFilter](#usecomboboxfilter)
- [Virtualised](#virtualised)
- [API](#api)

```tsx
<Combobox {...args} items={fruits} />
```

## Usage

Pass your array of options to the `items` prop, these will be rendered using
the `ComboboxItem` component.

You can use `ComboboxItem` yourself if you need more control over the rendered
option content.

```tsx
const fruits = ['Apple', 'Banana', 'Orange'];

[...]


<Combobox>
  {fruits.map(fruit => (
    <ComboboxItem key={fruit} value={fruit}>
      {fruit}
    </ComboboxItem>
  ))}
</Combobox>
```

## Trigger only on type

By default the dropdown will open when the input is clicked. You can change
this behaviour, so that the dropdown is only opened when a user starts typing,
with the `triggerOnlyOnType` prop. This will also remove the trigger icon button.

- Set `triggerOnlyOnType` to `false` where there is a predefined list of options for a user to choose.
- Set `triggerOnlyOnType` to `true` where the user is required to type before surfacing options. For example, postcode or address lookups.

## No options found

If a user searches and no options are found, a disabled option will appear in
the dropdown to communicate this. You can customise this using the
`noOptionsFoundText` prop.

This requires that you pass options via the `items` prop. If you are rendering
the options yourself, using `ComboboxItem`, you can use the `ComboboxEmpty`
component to display when there are no options available.

## Status text

Use the `statusText` prop to display a status message whose content changes are
announced politely to screen readers. Useful for conveying the status of an
asynchronously loaded list.

## useComboboxFilter

The `useComboboxFilter` hook provides robust string matching using `Intl.Collator`.
It returns three filter functions — `contains`, `startsWith`, and `endsWith` —
that can be passed to the `filter` prop on `Combobox`.

When using `useComboboxFilter`, pass the `items` prop to provide the full list
of options to the `Combobox`, and pass the chosen filter function to the `filter`
prop. The `Combobox` will handle filtering the items internally.

```tsx
import { Combobox, useComboboxFilter } from '@utilitywarehouse/hearth-react';

const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange'];

const [value, setValue] = React.useState<string | null>(null);
const { contains } = useComboboxFilter({ value });

<Combobox label="Fruit" items={fruits} filter={contains} value={value} onValueChange={setValue} />;
```

```tsx
<Combobox
  {...args}
  label="Fruit (contains)"
  items={fruits}
  filter={contains}
  value={value}
  onValueChange={v => setValue(v as string | null)}
/>
```

The `startsWith` and `endsWith` functions work the same way but match only from
the beginning or end of each item's label respectively.

```tsx
<Combobox
  {...args}
  label="Fruit (startsWith)"
  items={fruits}
  filter={startsWith}
  value={value}
  onValueChange={v => setValue(v as string | null)}
/>
```

For more advanced scenarios, such as virtualised lists where you need to manage
the filtered items yourself, you can call the filter functions directly:

```tsx
const { contains } = useComboboxFilter({ value });

const filteredItems = React.useMemo(() => {
  return allItems.filter(item => contains(item, searchValue, getItemLabel));
}, [contains, searchValue]);
```

## Virtualised

Efficiently handle large datasets using a virtualization library like `@tanstack/react-virtual`.

```tsx
<Combobox
  virtualized
  label="Search 10,000 items"
  items={virtualizedItems}
  filteredItems={filteredItems}
  open={open}
  onOpenChange={setOpen}
  inputValue={searchValue}
  onInputValueChange={setSearchValue}
  value={value}
  onValueChange={setValue}
  itemToStringLabel={getItemLabel}
  onItemHighlighted={(item: unknown, { reason, index }: { reason: string; index: number }) => {
    if (!item) {
      return;
    }

    const isStart = index === 0;
    const isEnd = index === filteredItems.length - 1;
    const shouldScroll = reason === 'none' || (reason === 'keyboard' && (isStart || isEnd));

    if (shouldScroll) {
      queueMicrotask(() => {
        virtualizer.scrollToIndex(index, { align: isEnd ? 'start' : 'end' });
      });
    }
  }}
>
  {filteredItems.length > 0 && (
    <div
      role="presentation"
      ref={handleScrollElementRef}
      style={{
        height: `min(22rem, ${totalSize}px)`,
        width: '100%',
      }}
    >
      <div role="presentation" style={{ height: totalSize }}>
        {virtualizer.getVirtualItems().map(virtualItem => {
          const item = filteredItems[virtualItem.index];
          if (!item) {
            return null;
          }

          return (
            <ComboboxItem
              key={virtualItem.key}
              index={virtualItem.index}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              value={item}
              aria-setsize={filteredItems.length}
              aria-posinset={virtualItem.index + 1}
            >
              {item.name}
            </ComboboxItem>
          );
        })}
      </div>
    </div>
  )}
</Combobox>
```

```tsx
import { Combobox, ComboboxItem, useComboboxFilter } from '@utilitywarehouse/hearth-react';
import { useVirtualizer } from '@tanstack/react-virtual';

[...]


const [open, setOpen] = React.useState(false);
const [searchValue, setSearchValue] = React.useState('');
const [value, setValue] = React.useState<VirtualizedItem | null>(null);

const deferredSearchValue = React.useDeferredValue(searchValue);

const scrollElementRef = React.useRef<HTMLDivElement | null>(null);

const { contains } = useComboboxFilter({ value });

const resolvedSearchValue =
  searchValue === '' || deferredSearchValue === '' ? searchValue : deferredSearchValue;

const filteredItems = React.useMemo(() => {
  return virtualizedItems.filter(item => contains(item, resolvedSearchValue, getItemLabel));
}, [contains, resolvedSearchValue]);

const virtualizer = useVirtualizer({
  enabled: open,
  count: filteredItems.length,
  getScrollElement: () => scrollElementRef.current,
  estimateSize: () => 32,
  overscan: 20,
});

const handleScrollElementRef = React.useCallback(
  (element: HTMLDivElement | null) => {
    scrollElementRef.current = element;
    if (element) {
      virtualizer.measure();
    }
  },
  [virtualizer]
);

const totalSize = virtualizer.getTotalSize();

return (
  <Combobox
    virtualized
    label="Search 10,000 items"
    items={virtualizedItems}
    filteredItems={filteredItems}
    open={open}
    onOpenChange={setOpen}
    inputValue={searchValue}
    onInputValueChange={setSearchValue}
    value={value}
    onValueChange={setValue}
    itemToStringLabel={getItemLabel}
    onItemHighlighted={(item: any, { reason, index }: any) => {
      if (!item) {
        return;
      }

      const isStart = index === 0;
      const isEnd = index === filteredItems.length - 1;
      const shouldScroll = reason === 'none' || (reason === 'keyboard' && (isStart || isEnd));

      if (shouldScroll) {
        queueMicrotask(() => {
          virtualizer.scrollToIndex(index, { align: isEnd ? 'start' : 'end' });
        });
      }
    }}
  >
    {filteredItems.length > 0 && (
      <div
        role="presentation"
        ref={handleScrollElementRef}
        style={{
          height: `min(22rem, ${totalSize}px)`,
          width: '100%',
        }}
      >
        <div role="presentation" style={{ height: totalSize }}>
          {virtualizer.getVirtualItems().map(virtualItem => {
            const item = filteredItems[virtualItem.index];
            if (!item) {
              return null;
            }

            return (
              <ComboboxItem
                key={virtualItem.key}
                index={virtualItem.index}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                value={item}
                aria-setsize={filteredItems.length}
                aria-posinset={virtualItem.index + 1}
              >
                {item.name}
              </ComboboxItem>
            );
          })}
        </div>
      </div>
    )}
  </Combobox>
)
```

## API

This component is based on the [Base UI Combobox](https://base-ui.com/react/components/combobox#) and supports the following common props:

- Margin

| Prop                   | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `triggerOnlyOnType`    | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `noOptionsFoundText`   | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `statusText`           | `string`                                                                                                                                                                                                   | —       | Displays a status message whose content changes are announced politely to screen readers. Useful for conveying the status of an asynchronously loaded list.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `loading`              | `boolean`                                                                                                                                                                                                  | —       | Displays a loading indicator in the input field to show that options are being fetched or updated asynchronously.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `autoComplete`         | `string`                                                                                                                                                                                                   | —       | Provides a hint to the browser for autofill. @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `autoHighlight`        | `boolean`                                                                                                                                                                                                  | `false` | Whether the first matching item is highlighted automatically while filtering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `itemToStringLabel`    | `((itemValue: Value) => string)`                                                                                                                                                                           | —       | When the item values are objects (`<Combobox.Item value={object}>`), this function converts the object value to a string representation for display in the input. If the shape of the object is `{ value, label }`, the label will be used automatically without needing to specify this prop.                                                                                                                                                                                                                                                                                                            |
| `itemToStringValue`    | `((itemValue: Value) => string)`                                                                                                                                                                           | —       | When the item values are objects (`<Combobox.Item value={object}>`), this function converts the object value to a string representation for form submission. If the shape of the object is `{ value, label }`, the value will be used automatically without needing to specify this prop.                                                                                                                                                                                                                                                                                                                 |
| `isItemEqualToValue`   | `((itemValue: Value, value: Value) => boolean)`                                                                                                                                                            | —       | Custom comparison logic used to determine if a combobox item value matches the current selected value. Useful when item values are objects without matching referentially. Defaults to `Object.is` comparison.                                                                                                                                                                                                                                                                                                                                                                                            |
| `onOpenChange`         | `((open: boolean, eventDetails: ChangeEventDetails) => void)`                                                                                                                                              | —       | Event handler called when the popup is opened or closed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `onInputValueChange`   | `((inputValue: string, eventDetails: ChangeEventDetails) => void)`                                                                                                                                         | —       | Event handler called when the input value changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `onItemHighlighted`    | `((highlightedValue: Value \| undefined, eventDetails: HighlightEventDetails) => void)`                                                                                                                    | —       | Callback fired when an item is highlighted or unhighlighted. Receives the highlighted item value (or `undefined` if no item is highlighted) and event details with a `reason` property describing why the highlight changed. The `reason` can be: - `'keyboard'`: the highlight changed due to keyboard navigation. - `'pointer'`: the highlight changed due to pointer hovering. - `'none'`: the highlight changed programmatically.                                                                                                                                                                     |
| `name`                 | `string`                                                                                                                                                                                                   | —       | Identifies the field when a form is submitted.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `form`                 | `string`                                                                                                                                                                                                   | —       | Identifies the form that owns the internal input. Useful when the combobox is rendered outside the form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `id`                   | `string`                                                                                                                                                                                                   | —       | The id of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `required`             | `boolean`                                                                                                                                                                                                  | `false` | Whether the user must choose a value before submitting a form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `readOnly`             | `boolean`                                                                                                                                                                                                  | `false` | Whether the user should be unable to choose a different option from the popup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `disabled`             | `boolean`                                                                                                                                                                                                  | `false` | Whether the component should ignore user interaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `defaultOpen`          | `boolean`                                                                                                                                                                                                  | `false` | Whether the popup is initially open. To render a controlled popup, use the `open` prop instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `open`                 | `boolean`                                                                                                                                                                                                  | —       | Whether the popup is currently open. Use when controlled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `onOpenChangeComplete` | `((open: boolean) => void)`                                                                                                                                                                                | —       | Event handler called after any animations complete when the popup is opened or closed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `loopFocus`            | `boolean`                                                                                                                                                                                                  | `true`  | Whether to loop keyboard focus back to the input when the end of the list is reached while using the arrow keys. The first item can then be reached by pressing <kbd>ArrowDown</kbd> again from the input, or the last item can be reached by pressing <kbd>ArrowUp</kbd> from the input. The input is always included in the focus loop per [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). When disabled, focus does not move when on the last element and the user presses <kbd>ArrowDown</kbd>, or when on the first element and the user presses <kbd>ArrowUp</kbd>. |
| `inputValue`           | `string \| number \| readonly string[]`                                                                                                                                                                    | —       | The input value of the combobox. Use when controlled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `defaultInputValue`    | `string \| number \| readonly string[]`                                                                                                                                                                    | —       | The uncontrolled input value when initially rendered. To render a controlled input, use the `inputValue` prop instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `inputRef`             | `Ref<HTMLInputElement>`                                                                                                                                                                                    | —       | A ref to the hidden input element.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `grid`                 | `boolean`                                                                                                                                                                                                  | `false` | Whether list items are presented in a grid layout. When enabled, arrow keys navigate across rows and columns inferred from DOM rows.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `items`                | `readonly any[] \| readonly Group<any>[]`                                                                                                                                                                  | —       | The items to be displayed in the list. Can be either a flat array of items or an array of groups with items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `filteredItems`        | `readonly any[] \| readonly Group<any>[]`                                                                                                                                                                  | —       | Filtered items to display in the list. When provided, the list will use these items instead of filtering the `items` prop internally. Use when you want to control filtering logic externally with the `useFilter()` hook.                                                                                                                                                                                                                                                                                                                                                                                |
| `filter`               | `((itemValue: Value, query: string, itemToString?: ((itemValue: Value) => string) \| undefined) => boolean) \| null`                                                                                       | —       | Filter function used to match items vs input query.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `virtualized`          | `boolean`                                                                                                                                                                                                  | `false` | Whether the items are being externally virtualized.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `inline`               | `boolean`                                                                                                                                                                                                  | `false` | Whether the list is rendered inline without using the popup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `modal`                | `boolean`                                                                                                                                                                                                  | `false` | Determines if the popup enters a modal state when open. - `true`: user interaction is limited to the popup: document page scroll is locked and pointer interactions on outside elements are disabled. - `false`: user interaction with the rest of the document is allowed.                                                                                                                                                                                                                                                                                                                               |
| `limit`                | `number`                                                                                                                                                                                                   | `-1`    | The maximum number of items to display in the list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `locale`               | `LocalesArgument`                                                                                                                                                                                          | —       | The locale to use for string comparison. Defaults to the user's runtime locale.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `multiple`             | `boolean`                                                                                                                                                                                                  | `false` | Whether multiple items can be selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `defaultValue`         | `ComboboxValueType<Value, Multiple> \| null`                                                                                                                                                               | —       | The uncontrolled selected value of the combobox when it's initially rendered. To render a controlled combobox, use the `value` prop instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `value`                | `ComboboxValueType<Value, Multiple> \| null`                                                                                                                                                               | —       | The selected value of the combobox. Use when controlled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `onValueChange`        | `((value: ComboboxValueType<Value, Multiple> \| (Multiple extends true ? never : null), eventDetails: ChangeEventDetails) => void)`                                                                        | —       | Event handler called when the selected value of the combobox changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `labelId`              | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `helperTextId`         | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `validationTextId`     | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `label`                | `string`                                                                                                                                                                                                   | —       | The label for the form field, describing its purpose.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `hideLabel`            | `boolean`                                                                                                                                                                                                  | —       | Visually hide the label.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `labelVariant`         | `"body" \| "heading"`                                                                                                                                                                                      | —       | Change the label variant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `helperText`           | `string`                                                                                                                                                                                                   | —       | Optional helper text to provide additional context or instructions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `validationText`       | `string`                                                                                                                                                                                                   | —       | Text to display when the `validationStatus` is set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `validationStatus`     | `"valid" \| "invalid"`                                                                                                                                                                                     | —       | Indicates the validation status.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `margin`               | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `marginTop`            | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `marginRight`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `marginBottom`         | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `marginLeft`           | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `marginX`              | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `marginY`              | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
