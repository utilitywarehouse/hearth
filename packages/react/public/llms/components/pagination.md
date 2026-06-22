# Pagination

Use the `Pagination` component to help users navigate through multiple pages of content.

## Table of Contents

- [Usage Guidelines](#usage-guidelines)
- [Examples](#examples)
  - [Condensed](#condensed)
  - [Without Skip Buttons](#without-skip-buttons)
  - [Few Pages](#few-pages)
  - [Many Pages](#many-pages)
  - [Edge Cases](#edge-cases)
- [API](#api)

```tsx
<Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
```

## Usage Guidelines

- Handle the `onPageChange` callback to update your data
- The component automatically shows a maximum of 7 items (including ellipses)
- When using `as="nav"`, you must provide an `id` prop for proper accessibility

## Examples

The Pagination component provides flexible options for navigation through multiple pages of content.

### Basic Usage

```ts
const [currentPage, setCurrentPage] = useState(5);

const handlePageChange = (newPage: number) => {
  // Tracking, loading new data...
  setCurrentPage(newPage)
}

return (
  <Pagination
    currentPage={currentPage}
    totalPages={100}
    onPageChange={handlePageChange}
  />
);
```

### Condensed

Use the `condensed` prop to display a more compact pagination with just "Page X of Y" text and navigation arrows.

```tsx
<Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} condensed />
```

### Without Skip Buttons

Set `hideSkipButtons` to hide the first/last page skip buttons.

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  hideSkipButtons
/>
```

### Few Pages

When there are 7 or fewer pages, all page numbers are displayed.

```tsx
<Pagination currentPage={currentPage} totalPages={7} onPageChange={setCurrentPage} />
```

### Many Pages

When there are many pages (more than 8), ellipsis (...) are shown to condense the pagination. The component shows:

- First and last pages always visible
- When near the start: first 5 pages, ellipsis, last page
- When in the middle: first page, ellipsis, current page with neighbours, ellipsis, last page
- When near the end: first page, ellipsis, last 5 pages

```tsx
<Pagination currentPage={currentPage} totalPages={100} onPageChange={setCurrentPage} />
```

### Edge Cases

Examples showing different positions in a large page set:

```tsx
<Flex direction="column" gap="400">
  <Flex direction="column" gap="100">
    <BodyText size="sm" color="secondary">
      Near start (page 2 of 100):
    </BodyText>
    <Pagination currentPage={nearStartPage} totalPages={100} onPageChange={setNearStartPage} />
  </Flex>
  <Flex direction="column" gap="100">
    <BodyText size="sm" color="secondary">
      In middle (page 50 of 100):
    </BodyText>
    <Pagination currentPage={middlePage} totalPages={100} onPageChange={setMiddlePage} />
  </Flex>
  <Flex direction="column" gap="100">
    <BodyText size="sm" color="secondary">
      Near end (page 98 of 100):
    </BodyText>
    <Pagination currentPage={nearEndPage} totalPages={100} onPageChange={setNearEndPage} />
  </Flex>
</Flex>
```

## API

This component is based on the `div` element by default and supports the following common props:

- Margin

| Prop              | Type                     | Default | Description                                                                                      |
| ----------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------------------ |
| `as`              | `"div" \| "nav"`         | `div`   | Shorthand for changing the default rendered element into a semantically appropriate alternative. |
| `currentPage`     | `number`                 | —       | The current active page number (1-indexed)                                                       |
| `totalPages`      | `number`                 | —       | The total number of pages                                                                        |
| `onPageChange`    | `(page: number) => void` | —       | Callback when page changes                                                                       |
| `condensed`       | `boolean`                | `false` | Whether to show condensed version with only "Page X of Y" text                                   |
| `hideSkipButtons` | `boolean`                | `false` | Whether to hide the skip to first/last page buttons                                              |
