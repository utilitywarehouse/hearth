# Pill Group

A container component that groups multiple `Pill` components together for filtering and categorization. It provides layout control with optional wrapping behavior and manages selection state.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

## Playground

```tsx
<PillGroup {...props} value={value} onChange={setValue}>
  <Pill value="1" label="All" />
  <Pill value="2" label="Energy" />
  <Pill value="3" label="Broadband" />
  <Pill value="4" label="Mobile" />
</PillGroup>
```

## Usage

The `PillGroup` component is a controlled component that manages the selection state of multiple `Pill` components. It supports both single and multi-select modes.

### Basic Usage

```tsx
import { Pill, PillGroup } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const [selectedTags, setSelectedTags] = useState(['ui']);

<PillGroup value={selectedTags} onChange={setSelectedTags}>
  <Pill value="ui" label="UI" />
  <Pill value="backend" label="Backend" icon={ServerMediumIcon} />
  <Pill value="devops" label="DevOps" />
</PillGroup>;
```

### PillGroup Props

| Prop       | Type                                  | Default  | Description                                                                                       |
| ---------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `value`    | `string \| string[]`                  | Required | Controlled selected value(s). Single string for single-select, array for multi-select             |
| `multiple` | `boolean`                             | `false`  | Enable multi-select mode                                                                          |
| `wrap`     | `boolean`                             | `true`   | Whether pills should wrap to multiple lines when they overflow                                    |
| `onChange` | `(value: string \| string[]) => void` | -        | Handle selection changes. Returns single string in single-select mode, array in multi-select mode |
| `children` | `ReactNode`                           | Required | `Pill` components to group together                                                               |
| ...rest    | `ViewProps`                           | -        | All standard View props are supported                                                             |

### Pill Props

| Prop    | Type                 | Default  | Description                                         |
| ------- | -------------------- | -------- | --------------------------------------------------- |
| `value` | `string`             | Required | Value returned when selected                        |
| `label` | `string`             | Required | The text content of the pill                        |
| `icon`  | `ComponentType<any>` | -        | Optional icon component to display before the label |
| ...rest | `PressableProps`     | -        | All standard Pressable props are supported          |

### Multi-Select Mode

```tsx
const [tags, setTags] = useState(['ui', 'backend']);

<PillGroup multiple value={tags} onChange={setTags}>
  <Pill value="ui" label="UI" />
  <Pill value="backend" label="Backend" icon={ServerMediumIcon} />
  <Pill value="devops" label="DevOps" />
</PillGroup>;
```

### Wrap Behavior

Compare how pills behave with and without wrapping enabled.

```tsx
<Flex spacing="xl" direction="column" align="center">
  <VariantTitle title="Wrap: False">
    <PillGroup wrap={false} value={value1} onChange={setValue1}>
      <Pill value="1" label="New" />
      <Pill value="2" label="Some label" />
      <Pill value="3" label="Short" />
      <Pill value="4" label="Quite a long label" />
      <Pill value="5" label="Hmm, another label" />
    </PillGroup>
  </VariantTitle>
  <VariantTitle title="Wrap: True">
    <PillGroup wrap={true} value={value2} onChange={setValue2}>
      <Pill value="6" label="New" />
      <Pill value="7" label="Some label" />
      <Pill value="8" label="Short" />
      <Pill value="9" label="Quite a long label" />
      <Pill value="10" label="Hmm, another label" />
      <Pill value="11" label="Custom Range" />
      <Pill value="12" label="Last 7 Days" />
    </PillGroup>
  </VariantTitle>
</Flex>
```

### Multi-Select Example

Select multiple options

```tsx
<Flex spacing="lg" direction="column" align="center" style={{ maxWidth: 400 }}>
  <PillGroup wrap={true} multiple value={selectedCategories} onChange={setSelectedCategories}>
    <Pill value="unread" label="Unread" />
    <Pill value="new" label="New" icon={HeartMediumIcon} />
    <Pill value="favourites" label="My favourites" icon={HeartMediumIcon} />
    <Pill value="read" label="Read" />
    <Pill value="yesterday" label="Yesterday" />
    <Pill value="lastweek" label="Last Week" />
  </PillGroup>
  <BodyText>
    Selected: {selectedCategories.length}{' '}
    {selectedCategories.length === 1 ? 'category' : 'categories'}
  </BodyText>
</Flex>
```

### All States of Pill

```tsx
<Flex spacing="xl" direction="column" align="center">
  <VariantTitle title="Unselected">
    <Flex direction="row" spacing="sm">
      <PillGroup value={selectedValue} onChange={() => {}}>
        <Pill value="1" label="Label" />
      </PillGroup>
    </Flex>
  </VariantTitle>
  <VariantTitle title="Selected">
    <Flex direction="row" spacing="sm">
      <PillGroup value={selectedValue} onChange={() => {}}>
        <Pill value="2" label="Label" />
      </PillGroup>
    </Flex>
  </VariantTitle>
  <VariantTitle title="With Icon - Unselected">
    <Flex direction="row" spacing="sm">
      <PillGroup value={selectedValue} onChange={() => {}}>
        <Pill value="1" label="New" icon={HeartMediumIcon} />
      </PillGroup>
    </Flex>
  </VariantTitle>
  <VariantTitle title="With Icon - Selected">
    <Flex direction="row" spacing="sm">
      <PillGroup value={selectedValue} onChange={() => {}}>
        <Pill value="2" label="New" icon={HeartMediumIcon} />
      </PillGroup>
    </Flex>
  </VariantTitle>
</Flex>
```
