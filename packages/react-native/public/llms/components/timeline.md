# Timeline

Timeline presents a sequence of related stops or steps using either a static stop indicator or a progress state indicator. Each item supports a label, optional helper text, and optional custom content.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Box style={{ width: 280 }}>
  <Timeline {...args}>
    <TimelineItem
      label="Order placed"
      helperText="We have received your request"
      state={isProgress ? 'complete' : undefined}
    />
    <TimelineItem
      label="Checking details"
      helperText="We are validating the information"
      state={isProgress ? 'complete' : undefined}
    />
    <TimelineItem
      label="Engineer booked"
      helperText="Your appointment has been reserved"
      state={isProgress ? 'active' : undefined}
    />
    <TimelineItem
      label="Service live"
      helperText="Everything is ready to go"
      state={isProgress ? 'incomplete' : undefined}
    />
  </Timeline>
</Box>
```

## Usage

```tsx
// Example usage
import { Timeline, TimelineItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Timeline variant="progress">
    <TimelineItem label="Ordered" helperText="We have received your order" state="complete" />
    <TimelineItem label="Packed" helperText="Your items are ready" state="complete" />
    <TimelineItem label="Out for delivery" helperText="Arriving today" state="active" />
    <TimelineItem label="Delivered" helperText="Pending" state="incomplete" />
  </Timeline>
);
```

### Timeline Props

| Property   | Type                     | Description                                   | Default    |
| ---------- | ------------------------ | --------------------------------------------- | ---------- |
| `children` | `ReactNode`              | Child `TimelineItem` components.              | Required   |
| `variant`  | `'static' \| 'progress'` | Controls the indicator style for child items. | `'static'` |

### TimelineItem Props

| Property     | Type                                     | Description                                              | Default        |
| ------------ | ---------------------------------------- | -------------------------------------------------------- | -------------- |
| `label`      | `string`                                 | Primary label text.                                      | Required       |
| `helperText` | `string`                                 | Optional supporting text beneath the label.              | `undefined`    |
| `state`      | `'complete' \| 'active' \| 'incomplete'` | Progress state used when `variant="progress"`.           | `'incomplete'` |
| `children`   | `ReactNode`                              | Optional custom content rendered below the text content. | `undefined`    |

### Variants

```tsx
// Example usage
import { Box, Timeline, TimelineItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Box>
    <Timeline variant="progress">
      <TimelineItem label="Account created" helperText="Done" state="complete" />
      <TimelineItem label="Documents uploaded" helperText="Done" state="complete" />
      <TimelineItem label="Verification" helperText="In progress" state="active" />
      <TimelineItem label="Decision" helperText="Pending" state="incomplete" />
    </Timeline>

    <Timeline variant="static">
      <TimelineItem label="Collected" helperText="08:15" />
      <TimelineItem label="Sorted" helperText="10:40" />
      <TimelineItem label="Out for delivery" helperText="13:25" />
    </Timeline>
  </Box>
);
```

### Custom Content

```tsx
// Example usage
import {
  Badge,
  BodyText,
  Box,
  Card,
  Timeline,
  TimelineItem,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Timeline variant="progress">
    <TimelineItem
      label="Application started"
      helperText="We have saved your draft"
      state="complete"
    />
    <TimelineItem label="Additional information" helperText="Action needed" state="active">
      <Card variant="subtle" spacing="md">
        <Badge>Required</Badge>
        <BodyText size="sm">Upload proof of address to continue.</BodyText>
      </Card>
    </TimelineItem>
    <TimelineItem label="Review complete" helperText="Pending" state="incomplete" />
  </Timeline>
);
```

## Accessibility

Timeline uses `accessibilityRole="list"` on the root so assistive technologies can understand the sequence as a grouped set of steps.

Each `TimelineItem` exposes a combined accessibility label made up of the label, helper text, and progress state when the progress variant is used.

When you provide custom content, make sure any interactive elements inside that content have their own accessible labels and hints. The timeline item itself is announced, but nested actions still need explicit accessibility metadata when they are actionable.
