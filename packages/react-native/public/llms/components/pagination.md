# Pagination

Pagination helps users move between pages of content while keeping the current position visible. It supports both a full page list and a condensed “Page X of Y” layout.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

## Playground

```tsx
// Example usage
<Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
```

## Usage

```tsx
// Example usage
import { Pagination } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const MyComponent = () => {
  const [page, setPage] = useState(3);

  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
};
```

## Props

| Property          | Type                     | Description                                       | Default  |
| ----------------- | ------------------------ | ------------------------------------------------- | -------- |
| `currentPage`     | `number`                 | The current active page number.                   | Required |
| `totalPages`      | `number`                 | Total number of pages available.                  | Required |
| `onPageChange`    | `(page: number) => void` | Called when the user selects a different page.    | Required |
| `condensed`       | `boolean`                | Displays “Page X of Y” instead of numbered items. | `false`  |
| `hideSkipButtons` | `boolean`                | Hides the first and last page controls.           | `false`  |

### Condensed

```tsx
// Example usage
<Pagination condensed currentPage={currentPage} onPageChange={setCurrentPage} totalPages={10} />
```

```tsx
// Example usage
const [currentPage, setCurrentPage] = useState(1);

<Pagination condensed currentPage={currentPage} onPageChange={setCurrentPage} totalPages={10} />;
```

### Without skip buttons

```tsx
// Example usage
<Pagination
  currentPage={currentPage}
  hideSkipButtons
  onPageChange={setCurrentPage}
  totalPages={10}
/>
```

```tsx
// Example usage
const [currentPage, setCurrentPage] = useState(3);

<Pagination
  currentPage={currentPage}
  hideSkipButtons
  onPageChange={setCurrentPage}
  totalPages={10}
/>;
```

### Edge cases

```tsx
// Example usage
<Flex direction="column" spacing="lg" style={{ width: '100%', maxWidth: 520 }}>
  <Flex direction="column" spacing="xs">
    <BodyText size="sm">Near start</BodyText>
    <Pagination currentPage={nearStartPage} onPageChange={setNearStartPage} totalPages={10} />
  </Flex>
  <Flex direction="column" spacing="xs">
    <BodyText size="sm">Middle</BodyText>
    <Pagination currentPage={middlePage} onPageChange={setMiddlePage} totalPages={10} />
  </Flex>
  <Flex direction="column" spacing="xs">
    <BodyText size="sm">Near end</BodyText>
    <Pagination currentPage={nearEndPage} onPageChange={setNearEndPage} totalPages={10} />
  </Flex>
</Flex>
```

```tsx
// Example usage
const [nearStartPage, setNearStartPage] = useState(2);
const [middlePage, setMiddlePage] = useState(5);
const [nearEndPage, setNearEndPage] = useState(9);

<Flex direction="column" spacing="lg" style={{ width: '100%', maxWidth: 520 }}>
  <Pagination currentPage={nearStartPage} onPageChange={setNearStartPage} totalPages={10} />
  <Pagination currentPage={middlePage} onPageChange={setMiddlePage} totalPages={10} />
  <Pagination currentPage={nearEndPage} onPageChange={setNearEndPage} totalPages={10} />
</Flex>;
```
