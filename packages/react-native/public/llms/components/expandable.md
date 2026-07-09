# Expandable

The Expandable component is a primitive for creating expandable content with smooth animations. It's commonly used as a building block for components like accordions, collapsible sections, and other interactive content that needs to expand and collapse.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Animation Duration](#animation-duration)
- [Examples](#examples)
  - [Basic Example](#basic-example)
  - [With Different Animation Speeds](#with-different-animation-speeds)
  - [Multiple Expandables](#multiple-expandables)
  - [Controlled Example](#controlled-example)
- [Accessibility](#accessibility)

## Playground

```tsx
<>
  <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
    {expanded ? 'Collapse' : 'Expand'}
  </Button>
  <Expandable {...args} expanded={expanded}>
    <Card>
      <BodyText>
        This is expandable content. It animates smoothly when toggled. You can put any content here,
        and it will expand and collapse with animation.
      </BodyText>
    </Card>
  </Expandable>
</>
```

## Usage

```tsx
<>
  <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
    Toggle Content
  </Button>
  <Expandable expanded={expanded}>
    <Card>
      <BodyText>This content expands and collapses with a smooth animation.</BodyText>
    </Card>
  </Expandable>
</>
```

```tsx
import { useState } from 'react';
import { View } from 'react-native';
import { Expandable, Button, Card, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <Button onPress={() => setExpanded(!expanded)}>Toggle Content</Button>
      <Expandable expanded={expanded}>
        <Card>
          <BodyText>This content expands and collapses with a smooth animation.</BodyText>
        </Card>
      </Expandable>
    </View>
  );
};
```

## Props

| Prop                 | Type                          | Default | Description                                          |
| -------------------- | ----------------------------- | ------- | ---------------------------------------------------- |
| `expanded`           | `boolean`                     | `false` | Whether the content is expanded                      |
| `onExpandedChange`   | `(expanded: boolean) => void` | -       | Callback when expanded state changes                 |
| `children`           | `ReactNode`                   | -       | The content to expand/collapse                       |
| `duration`           | `number`                      | `200`   | Duration of the animation in milliseconds            |
| `animateOpacity`     | `boolean`                     | `true`  | Whether to animate opacity during expansion/collapse |
| `style`              | `ViewStyle`                   | -       | Additional style for the container                   |
| `accessibilityLabel` | `string`                      | -       | Accessibility label for screen readers               |
| `testID`             | `string`                      | -       | Test ID for testing purposes                         |

## Animation Duration

The `duration` prop controls how long the expand/collapse animation takes. The default is 200ms, which provides a smooth, natural feel. You can adjust this for faster or slower animations.

```tsx
<>
  <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
    Fast Toggle
  </Button>
  <Expandable expanded={expanded} duration={150}>
    <Card>
      <BodyText>This expands and collapses quickly with a 150ms duration.</BodyText>
    </Card>
  </Expandable>
</>
```

```tsx
// Fast animation (150ms)
<Expandable expanded={expanded} duration={150}>
  <Card>
    <BodyText>Quick animation</BodyText>
  </Card>
</Expandable>

// Slow animation (600ms)
<Expandable expanded={expanded} duration={600}>
  <Card>
    <BodyText>Slow animation</BodyText>
  </Card>
</Expandable>
```

### Basic Example

```tsx
<>
  <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
    Toggle Content
  </Button>
  <Expandable expanded={expanded}>
    <Card>
      <BodyText>This content expands and collapses with a smooth animation.</BodyText>
    </Card>
  </Expandable>
</>
```

### With Different Animation Speeds

```tsx
<>
  <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
    Fast Toggle
  </Button>
  <Expandable expanded={expanded} duration={150}>
    <Card>
      <BodyText>This expands and collapses quickly with a 150ms duration.</BodyText>
    </Card>
  </Expandable>
</>
```

```tsx
<>
  <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
    Slow Toggle
  </Button>
  <Expandable expanded={expanded} duration={600}>
    <Card>
      <BodyText>This expands and collapses slowly with a 600ms duration.</BodyText>
    </Card>
  </Expandable>
</>
```

### Multiple Expandables

```tsx
<View style={{ width: 300, gap: 16 }}>
  <View>
    <Button
      onPress={() => setExpanded1(!expanded1)}
      style={{ marginBottom: 8 }}
      iconPosition="right"
      icon={expanded1 ? ChevronUpMediumIcon : ChevronDownMediumIcon}
    >
      Section 1
    </Button>
    <Expandable expanded={expanded1}>
      <Card>
        <BodyText>Content for section 1</BodyText>
      </Card>
    </Expandable>
  </View>

  <View>
    <Button
      onPress={() => setExpanded2(!expanded2)}
      style={{ marginBottom: 8 }}
      iconPosition="right"
      icon={expanded2 ? ChevronUpMediumIcon : ChevronDownMediumIcon}
    >
      Section 2
    </Button>
    <Expandable expanded={expanded2}>
      <Card>
        <BodyText>Content for section 2 with more detailed information.</BodyText>
      </Card>
    </Expandable>
  </View>

  <View>
    <Button
      onPress={() => setExpanded3(!expanded3)}
      style={{ marginBottom: 8 }}
      iconPosition="right"
      icon={expanded3 ? ChevronUpMediumIcon : ChevronDownMediumIcon}
    >
      Section 3
    </Button>
    <Expandable expanded={expanded3}>
      <Card>
        <BodyText>
          Content for section 3 with even more information that spans multiple lines.
        </BodyText>
      </Card>
    </Expandable>
  </View>
</View>
```

```tsx
import { useState } from 'react';
import { View } from 'react-native';
import { Expandable, Button, Card, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View>
        <Button onPress={() => setExpanded1(!expanded1)}>Section 1 {expanded1 ? '▲' : '▼'}</Button>
        <Expandable expanded={expanded1}>
          <Card>
            <BodyText>Content for section 1</BodyText>
          </Card>
        </Expandable>
      </View>

      <View>
        <Button onPress={() => setExpanded2(!expanded2)}>Section 2 {expanded2 ? '▲' : '▼'}</Button>
        <Expandable expanded={expanded2}>
          <Card>
            <BodyText>Content for section 2</BodyText>
          </Card>
        </Expandable>
      </View>

      <View>
        <Button onPress={() => setExpanded3(!expanded3)}>Section 3 {expanded3 ? '▲' : '▼'}</Button>
        <Expandable expanded={expanded3}>
          <Card>
            <BodyText>Content for section 3</BodyText>
          </Card>
        </Expandable>
      </View>
    </View>
  );
};
```

### Controlled Example

```tsx
<View style={{ width: 300 }}>
  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
    <Button onPress={() => setExpanded(true)} style={{ flex: 1 }}>
      Expand
    </Button>
    <Button onPress={() => setExpanded(false)} style={{ flex: 1 }}>
      Collapse
    </Button>
  </View>
  <Expandable
    expanded={expanded}
    onExpandedChange={setExpanded}
    accessibilityLabel="Expandable content section"
  >
    <Card>
      <BodyText>
        This is a controlled expandable with separate expand and collapse buttons.
      </BodyText>
    </Card>
  </Expandable>
</View>
```

```tsx
import { useState } from 'react';
import { View } from 'react-native';
import { Expandable, Button, Card, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button onPress={() => setExpanded(true)}>Expand</Button>
        <Button onPress={() => setExpanded(false)}>Collapse</Button>
      </View>
      <Expandable
        expanded={expanded}
        onExpandedChange={setExpanded}
        accessibilityLabel="Expandable content section"
      >
        <Card>
          <BodyText>Controlled expandable content</BodyText>
        </Card>
      </Expandable>
    </View>
  );
};
```

## Accessibility

The Expandable component includes built-in accessibility support:

- Uses `accessibilityState` to communicate expanded/collapsed state to screen readers
- Set `accessibilityLabel` to provide context about the expandable content
- Automatically announces state changes to assistive technologies

```tsx
<Expandable expanded={expanded} accessibilityLabel="Additional information section">
  {/* content */}
</Expandable>
```

### Screen Reader Announcements

When using the Expandable component:

- The `accessibilityState` prop automatically includes the `expanded` state
- Screen readers will announce "expanded" or "collapsed" based on the current state
- Provide descriptive `accessibilityLabel` values to give users context
