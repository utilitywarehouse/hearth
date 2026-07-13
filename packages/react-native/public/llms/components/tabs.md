# Tabs

Tabs are a navigational component that allows users to move easily between groups of related content.

- [Playground](#playground)
- [Usage](#usage)
- [Examples](#examples)
  - [Controlled](#controlled)
  - [Overflow & Scrolling](#overflow--scrolling)
  - [With Icons](#with-icons)
- [Props](#props)
- [Size Variants](#size-variants)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Tabs {...args} defaultValue="account">
  <TabsList>{children}</TabsList>
  <TabPanel value="account">
    <BodyText>Account content</BodyText>
  </TabPanel>
  <TabPanel value="billing">
    <BodyText>Billing content</BodyText>
  </TabPanel>
  <TabPanel value="usage">
    <BodyText>Usage metrics</BodyText>
  </TabPanel>
  <TabPanel value="settings">
    <BodyText>Settings content</BodyText>
  </TabPanel>
</Tabs>
```

## Usage

```tsx
// Example usage
import { Tabs, TabsList, Tab, TabPanel } from '@utilitywarehouse/hearth-react-native';

<Tabs defaultValue="account">
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="billing">Billing</Tab>
    <Tab value="usage">Usage</Tab>
  </TabsList>
  <TabPanel value="account">
    <BodyText>Account content</BodyText>
  </TabPanel>
  <TabPanel value="billing">
    <BodyText>Billing content</BodyText>
  </TabPanel>
  <TabPanel value="usage">
    <BodyText>Usage metrics content</BodyText>
  </TabPanel>
</Tabs>;
```

### Controlled

Tabs can be controlled by passing `value` and `onValueChange` props to the `Tabs` component.
This allows you to manage the active tab state externally.

```tsx
// Example usage
const [tab, setTab] = useState('account');
<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="billing">Billing</Tab>
    <Tab value="usage">Usage</Tab>
  </TabsList>
  <TabPanel value="account">
    <BodyText>Account content</BodyText>
  </TabPanel>
  <TabPanel value="billing">
    <BodyText>Billing content</BodyText>
  </TabPanel>
  <TabPanel value="usage">
    <BodyText>Usage metrics content</BodyText>
  </TabPanel>
</Tabs>;
```

### Overflow & Scrolling

```tsx
// Example usage
<Tabs defaultValue="one">
  <TabsList>
    <Tab value="one">One</Tab>
    <Tab value="two">Two</Tab>
    <Tab value="three">Three</Tab>
    <Tab value="four">Four</Tab>
    <Tab value="five">Five</Tab>
    <Tab value="six">Six</Tab>
    <Tab value="seven">Seven</Tab>
    <Tab value="eight">Eight</Tab>
    <Tab value="nine">Nine</Tab>
    <Tab value="ten">Ten</Tab>
    <Tab value="eleven">Eleven</Tab>
    <Tab value="twelve">Twelve</Tab>
    <Tab value="thirteen">Thirteen</Tab>
    <Tab value="fourteen">Fourteen</Tab>
    <Tab value="fifteen">Fifteen</Tab>
    <Tab value="sixteen">Sixteen</Tab>
    <Tab value="seventeen">Seventeen</Tab>
    <Tab value="eighteen">Eighteen</Tab>
    <Tab value="nineteen">Nineteen</Tab>
    <Tab value="twenty">Twenty</Tab>
  </TabsList>
  <TabPanel value="one">
    <BodyText>One panel</BodyText>
  </TabPanel>
  <TabPanel value="two">
    <BodyText>Two panel</BodyText>
  </TabPanel>
  <TabPanel value="three">
    <BodyText>Three panel</BodyText>
  </TabPanel>
  <TabPanel value="four">
    <BodyText>Four panel</BodyText>
  </TabPanel>
  <TabPanel value="five">
    <BodyText>Five panel</BodyText>
  </TabPanel>
  <TabPanel value="six">
    <BodyText>Six panel</BodyText>
  </TabPanel>
  <TabPanel value="seven">
    <BodyText>Seven panel</BodyText>
  </TabPanel>
  <TabPanel value="eight">
    <BodyText>Eight panel</BodyText>
  </TabPanel>
  <TabPanel value="nine">
    <BodyText>Nine panel</BodyText>
  </TabPanel>
  <TabPanel value="ten">
    <BodyText>Ten panel</BodyText>
  </TabPanel>
  <TabPanel value="eleven">
    <BodyText>Eleven panel</BodyText>
  </TabPanel>
  <TabPanel value="twelve">
    <BodyText>Twelve panel</BodyText>
  </TabPanel>
  <TabPanel value="thirteen">
    <BodyText>Thirteen panel</BodyText>
  </TabPanel>
  <TabPanel value="fourteen">
    <BodyText>Fourteen panel</BodyText>
  </TabPanel>
  <TabPanel value="fifteen">
    <BodyText>Fifteen panel</BodyText>
  </TabPanel>
  <TabPanel value="sixteen">
    <BodyText>Sixteen panel</BodyText>
  </TabPanel>
  <TabPanel value="seventeen">
    <BodyText>Seventeen panel</BodyText>
  </TabPanel>
  <TabPanel value="eighteen">
    <BodyText>Eighteen panel</BodyText>
  </TabPanel>
  <TabPanel value="nineteen">
    <BodyText>Nineteen panel</BodyText>
  </TabPanel>
  <TabPanel value="twenty">
    <BodyText>Twenty panel</BodyText>
  </TabPanel>
</Tabs>
```

When the combined tab labels exceed the horizontal space, the list becomes horizontally scrollable.
Contextual navigation buttons (previous / next) appear just outside the scrollable area. They:

- Scroll by ~60% of the visible width per press (for efficient paging)
- Are hidden from assistive technology (screen readers) - users rely on the tab structure itself
- Only render when further scrolling in that direction is possible
- Honor reduced motion: only the indicator animation is affected (system reduced motion will minimise excessive transitions)

### With Icons

You can add icons to each `Tab` by passing an icon component to the `icon` prop. The icon will be placed to the left of the tab label.

```tsx
// Example usage
<Tabs defaultValue="one">
  <TabsList>
    <Tab value="one" icon={ElectricityMediumIcon}>
      Energy
    </Tab>
    <Tab value="two" icon={BroadbandMediumIcon}>
      Broadband
    </Tab>
    <Tab value="three" icon={MobileMediumIcon}>
      Mobile
    </Tab>
    <Tab value="four" icon={InsuranceMediumIcon}>
      Insurance
    </Tab>
  </TabsList>
  <TabPanel value="one">
    <BodyText>One panel</BodyText>
  </TabPanel>
  <TabPanel value="two">
    <BodyText>Two panel</BodyText>
  </TabPanel>
  <TabPanel value="three">
    <BodyText>Three panel</BodyText>
  </TabPanel>
  <TabPanel value="four">
    <BodyText>Four panel</BodyText>
  </TabPanel>
</Tabs>
```

```tsx
// Example usage
import { Tabs, TabsList, Tab, TabPanel } from '@utilitywarehouse/hearth-react-native';
import {
  ElectricityMediumIcon,
  MobileMediumIcon,
  InsuranceMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Tabs defaultValue="one">
    <TabsList>
      <Tab value="one" icon={ElectricityMediumIcon}>
        Energy
      </Tab>
      <Tab value="two" icon={BroadbandMediumIcon}>
        Broadband
      </Tab>
      <Tab value="three" icon={MobileMediumIcon}>
        Mobile
      </Tab>
      <Tab value="four" icon={InsuranceMediumIcon}>
        Insurance
      </Tab>
    </TabsList>
    <TabPanel value="one">
      <BodyText>One panel</BodyText>
    </TabPanel>
    <TabPanel value="two">
      <BodyText>Two panel</BodyText>
    </TabPanel>
    <TabPanel value="three">
      <BodyText>Three panel</BodyText>
    </TabPanel>
    <TabPanel value="four">
      <BodyText>Four panel</BodyText>
    </TabPanel>
  </Tabs>
);
```

### Tabs

| Prop            | Type                      | Description                                                         | Default    |
| --------------- | ------------------------- | ------------------------------------------------------------------- | ---------- |
| `value`         | `string`                  | Controlled active tab value                                         | -          |
| `defaultValue`  | `string`                  | Uncontrolled initial tab value                                      | first Tab  |
| `onValueChange` | `(value: string) => void` | Change handler                                                      | -          |
| `size`          | `'md' \| 'lg'`            | Size variant (affects tab height & list padding)                    | `md`       |
| `disabled`      | `boolean`                 | Disables all interaction                                            | `false`    |
| `withPanels`    | `boolean`                 | If true, expects sibling `TabPanel` elements and wires ARIA linkage | `true`\*   |
| `children`      | `ReactNode`               | Composition (typically `TabsList` + `TabPanel` children)            | (required) |

\*If omitted you can still compose panels manually, but accessibility linkage (`aria-controls` / `id`) is provided when `withPanels` is true.

#### TabsList

| Prop       | Type        | Description                | Default    |
| ---------- | ----------- | -------------------------- | ---------- |
| `children` | `ReactNode` | One or more `Tab` elements | (required) |

#### Tab

| Prop       | Type            | Description                       | Default    |
| ---------- | --------------- | --------------------------------- | ---------- |
| `value`    | `string`        | Unique tab value                  | (required) |
| `children` | `ReactNode`     | Label content (can include badge) | (required) |
| `icon`     | `ComponentType` | Optional leading icon             | -          |
| `disabled` | `boolean`       | Disabled state                    | `false`    |

#### TabPanel

| Prop          | Type        | Description                                 | Default    |
| ------------- | ----------- | ------------------------------------------- | ---------- |
| `value`       | `string`    | Matches a `Tab` value                       | (required) |
| `children`    | `ReactNode` | Panel content                               | (required) |
| `keepMounted` | `boolean`   | Keep hidden panels in tree (preserve state) | `false`    |

## Size Variants

```tsx
// Example usage
<>
  <Tabs size="md" defaultValue="a">
    <TabsList>
      <Tab value="a">Medium A</Tab>
      <Tab value="b">Medium B</Tab>
      <Tab value="c">Medium C</Tab>
    </TabsList>
    <TabPanel value="a">
      <BodyText>Medium A panel</BodyText>
    </TabPanel>
    <TabPanel value="b">
      <BodyText>Medium B panel</BodyText>
    </TabPanel>
    <TabPanel value="c">
      <BodyText>Medium C panel</BodyText>
    </TabPanel>
  </Tabs>
  <Tabs size="lg" defaultValue="a" style={{ marginTop: 24 }}>
    <TabsList>
      <Tab value="a">Large A</Tab>
      <Tab value="b">Large B</Tab>
      <Tab value="c">Large C</Tab>
    </TabsList>
    <TabPanel value="a">
      <BodyText>Large A panel</BodyText>
    </TabPanel>
    <TabPanel value="b">
      <BodyText>Large B panel</BodyText>
    </TabPanel>
    <TabPanel value="c">
      <BodyText>Large C panel</BodyText>
    </TabPanel>
  </Tabs>
</>
```

## Accessibility

| Element     | Role                                    | Notes                                           |
| ----------- | --------------------------------------- | ----------------------------------------------- |
| `Tabs` root | `tablist`                               | Container for related `tab` elements            |
| `Tab`       | `tab`                                   | Uses `accessibilityState.selected` & `disabled` |
| `TabPanel`  | `tabpanel` (web) / hidden view (native) | Inactive panels removed from a11y tree          |

Selection state is communicated through `accessibilityState`. Provide concise labels (children text) for best screen reader clarity.
Any extra content you compose is read in order unless you explicitly hide it. The animated indicator reflects the active tab;
reduced motion preferences are respected. Hidden panels are removed from the accessibility tree.
Overflow scroll buttons are hidden from assistive tech and only appear visually when scrolling is possible.
