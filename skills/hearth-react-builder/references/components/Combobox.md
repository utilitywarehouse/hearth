# Combobox

Searchable select input with typeahead filtering. Use instead of `Select` when there are many options or when users need to search.

```tsx
import { Combobox, ComboboxItem, ComboboxEmpty } from '@utilitywarehouse/hearth-react';
import { useComboboxFilter } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `label` | string | Required |
| `items` | `T[]` | All items |
| `value` | `T \| null` | Controlled selected value |
| `onValueChange` | `(value: T \| null) => void` | |
| `inputValue` | string | Controlled input text |
| `onInputValueChange` | `(value: string) => void` | |
| `open` / `onOpenChange` | boolean / function | |
| `placeholder` | string | |
| `helperText` | string | |
| `validationStatus` | `'valid'` \| `'invalid'` | |
| `validationText` | string | |
| `loading` | boolean | |
| `statusText` | string | Loading/status message for screen readers |
| `noOptionsFoundText` | string | Empty state message |
| `triggerOnlyOnType` | boolean | Only open on user typing (not on focus) |
| `virtualized` | boolean | For 1000+ item lists |
| `filter` | `(item, inputValue, label) => boolean` | Custom filter function |
| `itemToStringLabel` | `(item: T) => string` | Convert object item to display string |
| `disabled` | boolean | |

**Built-in filter hooks:**
- `useComboboxFilter({ value }).contains` — matches anywhere in the string
- `useComboboxFilter({ value }).startsWith` — matches from the start

```tsx
// Simple string list with built-in filter
function FruitCombobox() {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const { contains } = useComboboxFilter({ value });

  return (
    <Combobox
      label="Select fruit"
      placeholder="Type to search..."
      items={fruits}
      filter={contains}
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={setValue}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      noOptionsFoundText="No fruits found"
    >
      {fruits
        .filter(fruit => contains(fruit, inputValue, fruit))
        .map(fruit => (
          <ComboboxItem key={fruit} value={fruit}>
            {fruit}
          </ComboboxItem>
        ))}
    </Combobox>
  );
}

// Object list with custom label
<Combobox
  label="Country"
  items={countries}
  itemToStringLabel={country => country.name}
  value={selectedCountry}
  onValueChange={setSelectedCountry}
  inputValue={inputValue}
  onInputValueChange={setInputValue}
>
  {countries
    .filter(c => c.name.toLowerCase().includes(inputValue.toLowerCase()))
    .map(country => (
      <ComboboxItem key={country.code} value={country}>
        {country.name}
      </ComboboxItem>
    ))}
</Combobox>

// Async search
<Combobox
  label="Search accounts"
  loading={isSearching}
  statusText="Searching..."
  noOptionsFoundText="No accounts found"
  triggerOnlyOnType
  items={results}
  value={selected}
  onValueChange={setSelected}
  inputValue={query}
  onInputValueChange={handleQueryChange}
>
  {results.map(account => (
    <ComboboxItem key={account.id} value={account}>{account.name}</ComboboxItem>
  ))}
  {!isSearching && results.length === 0 && query.length > 0 && (
    <ComboboxEmpty>No accounts found</ComboboxEmpty>
  )}
</Combobox>
```

**Gotchas:**
- Custom object items require `itemToStringLabel` so Hearth knows how to display the selected value
- For 1000+ items, use `virtualized` alongside a virtualisation library (e.g. TanStack Virtual)
- `triggerOnlyOnType` prevents the dropdown opening on focus — good for async search
