# SectionHeader

Use the `SectionHeader` component to help define and separate content within a
screen. It provides structure, clarity, and improves page scannability for
users.

```tsx
<Flex width="600px">
  <SectionHeader
    {...args}
    trailingContent={
      <Link>
        Link text
        <ChevronRightSmallIcon />
      </Link>
    }
  />
</Flex>
```

## Trailing content

Use the `trailingContent` prop to include a `Link`, `Button` or `Badge` component.

```tsx
import { Link, SectionHeader } from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

[...]

<SectionHeader
  {...args}
  trailingContent={
    <Link>
      Link text
      <ChevronRightSmallIcon />
    </Link>
  }
/>
```

```tsx
<Flex width="600px">
  <SectionHeader {...args} trailingContent={<Badge size="sm">Badge</Badge>} />
</Flex>
```

```tsx
<Flex width="600px">
  <SectionHeader
    {...args}
    trailingContent={
      <Button size="sm" variant="outline" colorScheme="functional">
        Button
      </Button>
    }
  />
</Flex>
```

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop               | Type                                    | Default | Description                                                                                       |
| ------------------ | --------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `heading`          | `string`                                | —       | Actual string to display as section header                                                        |
| `headingElement`   | `"div" \| "h1" \| "h2" \| "h3" \| "h4"` | `div`   |                                                                                                   |
| `helperText`       | `string`                                | —       | Optional helper text to provide additional context or instructions.                               |
| `trailingContent`  | `ReactNode`                             | —       | Optional trailing content element                                                                 |
| `validationStatus` | `"invalid"`                             | —       | Indicates the validation state                                                                    |
| `validationText`   | `string`                                | —       | Text to display when the `validationStatus` is set.                                               |
| `direction`        | `Responsive<"row" \| "column">`         | —       | Responsive direction of the section header content. By default, the content is laid out in a row. |
