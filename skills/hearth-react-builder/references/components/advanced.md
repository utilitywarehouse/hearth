# Advanced Components

## Combobox

Searchable dropdown with filtering. Use instead of `Select` when there are many options or when users need to search.

```tsx
import { Combobox, ComboboxItem, ComboboxEmpty } from '@utilitywarehouse/hearth-react';
import { useComboboxFilter } from '@utilitywarehouse/hearth-react';
```

**Props:**

| Prop | Values | Notes |
|---|---|---|
| `label` | string | Required |
| `placeholder` | string | |
| `helperText` | string | |
| `validationStatus` | `'valid'` \| `'invalid'` | |
| `validationText` | string | |
| `items` | `T[]` | All items |
| `filteredItems` | `T[]` | Filtered results (controlled filtering) |
| `value` | `T \| null` | Controlled selected value |
| `onValueChange` | `(value: T \| null) => void` | |
| `inputValue` | string | Controlled input text |
| `onInputValueChange` | `(value: string) => void` | |
| `open` | boolean | |
| `onOpenChange` | `(open: boolean) => void` | |
| `loading` | boolean | |
| `statusText` | string | Loading/status message |
| `noOptionsFoundText` | string | Empty state message |
| `required` | boolean | |
| `disabled` | boolean | |
| `triggerOnlyOnType` | boolean | Only open on user typing, not on focus |
| `virtualized` | boolean | For 1000+ item lists |
| `filter` | `(item: T, inputValue: string, label: string) => boolean` | Custom filter |
| `itemToStringLabel` | `(item: T) => string` | Convert item to display string |

---

### Simple string list with built-in filter

```tsx
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

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
```

### Object list with custom label

```tsx
const countries = [
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ie', name: 'Ireland' },
  { code: 'us', name: 'United States' },
];

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
```

### With loading state

```tsx
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
    <ComboboxItem key={account.id} value={account}>
      {account.name}
    </ComboboxItem>
  ))}
  {!isSearching && results.length === 0 && query.length > 0 && (
    <ComboboxEmpty>No accounts found</ComboboxEmpty>
  )}
</Combobox>
```

**Built-in filter hooks:**
- `useComboboxFilter({ value }).contains` — matches anywhere in the string
- `useComboboxFilter({ value }).startsWith` — matches from the start

**Gotchas:**
- Custom object items require `itemToStringLabel` so Hearth knows how to display the selected value
- For 1000+ items, use `virtualized` + a virtualisation library (e.g. TanStack Virtual)
- `triggerOnlyOnType` prevents the dropdown opening on focus — good for async search

---

## DatePicker

Calendar-based date selection.

```tsx
import { DatePicker } from '@utilitywarehouse/hearth-react';
```

See `apps/storybook-react/src/components/DatePicker.stories.tsx` for full props and usage examples — this component has a rich API for min/max dates, disabled dates, and controlled selection.

Basic usage:
```tsx
<DatePicker
  label="Select date"
  value={selectedDate}
  onValueChange={setSelectedDate}
/>
```

**When to use:** Prefer `DateInput` (day/month/year split input) for known dates like dates of birth. Use `DatePicker` when the user needs to browse a calendar (appointments, availability).

---

## Skeleton

Loading placeholders that match the shape of the content being loaded.

```tsx
import { Skeleton, SkeletonBox, SkeletonBodyText, SkeletonHeading } from '@utilitywarehouse/hearth-react';
```

**Skeleton (provider wrapper):** `loadingTitle` — string announcing to screen readers that content is loading

**SkeletonBox props:** `width` (default: `'160px'`), `height` (default: `'96px'`), `borderRadius`
**SkeletonBodyText props:** `lines` (number), `size` (`'sm'` \| `'md'` \| `'lg'`)
**SkeletonHeading props:** `size` (`'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'`)

```tsx
// Article loading state
<Skeleton loadingTitle="Loading article">
  <SkeletonHeading size="xl" />
  <SkeletonBodyText lines={5} size="md" />
</Skeleton>

// Card loading state
<Skeleton loadingTitle="Loading card">
  <Flex direction="column" gap="300" width="320px">
    <SkeletonBox width="100%" height="160px" borderRadius="sm" />
    <SkeletonBox width="60%" height="20px" borderRadius="xs" />
    <SkeletonBodyText lines={2} size="sm" />
  </Flex>
</Skeleton>

// Profile loading state
<Skeleton loadingTitle="Loading profile">
  <Flex gap="300" alignItems="center">
    <SkeletonBox borderRadius="full" width="64px" height="64px" />
    <Flex direction="column" gap="200">
      <SkeletonBox width="120px" height="16px" borderRadius="xs" />
      <SkeletonBox width="80px" height="14px" borderRadius="xs" />
    </Flex>
  </Flex>
</Skeleton>

// Full page loading state
{isLoading ? (
  <Skeleton loadingTitle="Loading dashboard">
    <Container>
      <Flex direction="column" gap="400">
        <SkeletonHeading size="xl" />
        <Grid defaultResponsiveColumns gap="300">
          <SkeletonBox gridColumnSpan="4" height="200px" borderRadius="md" />
          <SkeletonBox gridColumnSpan="4" height="200px" borderRadius="md" />
          <SkeletonBox gridColumnSpan="4" height="200px" borderRadius="md" />
        </Grid>
      </Flex>
    </Container>
  </Skeleton>
) : (
  <Dashboard />
)}
```

**Pattern:** Design the skeleton to closely match the shape of the real content — same widths, heights, and layout. This prevents layout shift when content loads.

**Gotcha:** `Skeleton` wraps all the placeholder components and provides the accessible announcement. Don't use `SkeletonBox`/`SkeletonBodyText`/`SkeletonHeading` without a parent `Skeleton`.

---

## IconContainer

See [`references/icons.md`](../icons.md) — documented alongside the icons package.
