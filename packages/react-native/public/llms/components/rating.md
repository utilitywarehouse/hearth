# Rating

Use Rating to collect a score with an optional descriptive label. Supports star and emoji variants.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Emoji variant](#emoji-variant)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Rating
  {...args}
  value={value}
  onChange={nextValue => {
    setValue(nextValue);
    onChange?.(nextValue);
  }}
/>
```

## Usage

```tsx
// Example usage
import { useState } from 'react';
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  return <Rating value={rating} onChange={setRating} labels={{ 0: 'Not rated' }} />;
};
```

## Props

| Property       | Type                                   | Description                                                         | Default                                                |
| -------------- | -------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| `value`        | `0 \| 1 \| 2 \| 3 \| 4 \| 5`           | Current rating value.                                               | `0`                                                    |
| `defaultValue` | `0 \| 1 \| 2 \| 3 \| 4 \| 5`           | Initial rating value when uncontrolled.                             | `0`                                                    |
| `onChange`     | `(value: RatingValue) => void`         | Called when a rating is selected.                                   | `undefined`                                            |
| `disabled`     | `boolean`                              | Disables the rating input.                                          | `false`                                                |
| `labels`       | `Partial<Record<RatingValue, string>>` | Override labels for specific rating values.                         | `undefined`                                            |
| `rangeLabels`  | `{ low: string; high: string }`        | Override the low and high end labels shown below the emoji variant. | `{ low: 'Very dissatisfied', high: 'Very satisfied' }` |
| `hideLabel`    | `boolean`                              | Hide the label text below the rating.                               | `false`                                                |
| `variant`      | `'stars' \| 'emojis'`                  | Visual variant for the rating indicators.                           | `'stars'`                                              |

### Default rating

Use the default labels for a quick feedback prompt.

```tsx
// Example usage
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Rating value={3} />;
```

### Empty rating

Use `value={0}` to show a zero-star state.

```tsx
// Example usage
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Rating value={0} labels={{ 0: 'Not rated' }} />;
```

### Custom labels

Provide custom copy for each rating value.

```tsx
// Example usage
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Rating
    value={5}
    labels={{
      0: 'Not rated',
      1: 'Terrible',
      2: 'Poor',
      3: 'OK',
      4: 'Great',
      5: 'Outstanding',
    }}
  />
);
```

### Hidden label

Use `hideLabel` when the context already explains the rating.

```tsx
// Example usage
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Rating value={2} hideLabel />;
```

### Disabled

Use `disabled` to show a read-only rating.

```tsx
// Example usage
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Rating value={4} disabled />;
```

### Emoji variant

Use `variant="emojis"` to show emoji faces instead of stars. Labels default to "Very dissatisfied" and "Very satisfied" at the extremes. Override them with `rangeLabels={{ low: 'Custom low', high: 'Custom high' }}`.

```tsx
// Example usage
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Rating value={4} variant="emojis" />;
```

### Emoji variant (no selection)

When no emoji is selected, all emojis display at normal size with full colour.

```tsx
// Example usage
import { Rating } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Rating value={0} variant="emojis" />;
```

## Accessibility

- Rating uses a `radiogroup` container with `radio` items for each star or emoji.
- Each star announces a descriptive label (e.g., "Rate Okay"). Each emoji announces its sentiment (e.g., "Rate Neutral"). Override labels with the `labels` prop to match your content.
- Provide `accessibilityLabel` when the default label text is not sufficient for your screen reader context.
