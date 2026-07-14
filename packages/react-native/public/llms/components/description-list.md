# Description List

Display pairs of related metadata (heading + description). Supports column (stacked) and row (two-column) layouts, optional SectionHeader (heading + helper text), and per-item action links.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<DescriptionList {...args}>
  {sampleData.map(item => (
    <DescriptionListItem
      key={item.heading}
      heading={item.heading}
      description={item.description}
      invalidText={item.invalidText}
    />
  ))}
</DescriptionList>
```

## Usage

```tsx
// Example usage
import { DescriptionList, DescriptionListItem } from '@utilitywarehouse/hearth-react-native';

<DescriptionList direction="column" heading="Account details" helperText="Static account metadata">
  <DescriptionListItem heading="Account Number" description="123456789" />
  <DescriptionListItem heading="Sort Code" description="12-34-56" />
  <DescriptionListItem
    heading="Status"
    description="Inactive"
    invalidText="Status cannot be inactive"
  />
</DescriptionList>;
```

### DescriptionList

| Prop                    | Type                | Default     | Description                                      |
| ----------------------- | ------------------- | ----------- | ------------------------------------------------ |
| `direction`             | `'row' \| 'column'` | `column`    | Layout orientation                               |
| `itemHeadingWidth`      | `number`            | token value | Override heading column width in row layout      |
| `heading`               | `string`            | -           | Optional overall heading (renders SectionHeader) |
| `helperText`            | `string`            | -           | Supporting text under heading                    |
| `headerTrailingContent` | `ReactNode`         | -           | Custom trailing content for heading (e.g. Link)  |
| `invalidText`           | `string`            | -           | Text to show under section header                |

### DescriptionListItem

| Prop              | Type        | Default    | Description                                      |
| ----------------- | ----------- | ---------- | ------------------------------------------------ |
| `heading`         | `ReactNode` | (required) | Heading (label) content                          |
| `description`     | `ReactNode` | (required) | Description (value) content                      |
| `numericValue`    | `string`    | -          | Optional numeric value                           |
| `headingWidth`    | `number`    | inherits   | Per-item heading width override (row layout)     |
| `trailingContent` | `ReactNode` | -          | Optional trailing content (e.g. Link, Button)    |
| `invalidText`     | `string`    | -          | Text to show under description for invalid value |

> Uses `theme.components.descriptionList` tokens for spacing & column width.

## Variants

```tsx
// Example usage
<Flex direction="column" spacing="lg" style={{ width: '100%' }}>
  <VariantTitle title="Row direction">
    <DescriptionList direction="row">
      {sampleData.map(item => (
        <DescriptionListItem
          key={item.heading}
          heading={item.heading}
          description={item.description}
          invalidText={item.invalidText}
        />
      ))}
    </DescriptionList>
  </VariantTitle>
  <VariantTitle title="Column direction">
    <DescriptionList direction="column">
      {sampleData.map(item => (
        <DescriptionListItem
          key={item.heading}
          heading={item.heading}
          description={item.description}
          invalidText={item.invalidText}
        />
      ))}
    </DescriptionList>
  </VariantTitle>
</Flex>
```

```tsx
// Example usage
<DescriptionList {...args}>
  <DescriptionListItem
    heading="Account Number"
    description="123456789"
    trailingContent={<Link href="https://example.com/account">Manage account</Link>}
  />
  <DescriptionListItem
    heading="Status"
    description="Active"
    trailingContent={
      <Link href="https://example.com/status" showIcon={false}>
        Change
      </Link>
    }
  />
  <DescriptionListItem heading="Region" description="United Kingdom" />
</DescriptionList>
```

## Accessibility

The component applies the following roles:

| Element                       | Role                                  |
| ----------------------------- | ------------------------------------- |
| `DescriptionList` root        | `list`                                |
| `DescriptionListItem` wrapper | `text` (combined label when possible) |

When both heading and description are plain text they are merged into one accessibility node (e.g. “Account Number: 123456789”) and the child elements are hidden from the a11y tree to avoid duplicate reading (TalkBack / VoiceOver). If either part is non‑text the children remain individually exposed.
