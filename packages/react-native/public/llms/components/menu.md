# Menu

The `Menu` component provides a bottom sheet modal with a list of actions. It's perfect for contextual menus, action sheets, and option lists. The component uses `BottomSheetModal` under the hood and includes `MenuItem` components that can display icons, text, and support different color schemes.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Features](#features)
- [Examples](#examples)
  - [Basic Menu](#basic-menu)
  - [With Destructive Action](#with-destructive-action)
  - [Icon on Right](#icon-on-right)
  - [Without Icons](#without-icons)
  - [With Disabled Items](#with-disabled-items)
  - [Without Heading](#without-heading)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : { flex: 1 }}>
  <ViewWrap>
    <MenuTrigger onPress={openMenu}>
      <Button>Open Menu</Button>
    </MenuTrigger>

    <Menu ref={menuRef} {...args}>
      <MenuItem icon={EditSmallIcon} text="Edit" onPress={() => console.log('Edit pressed')} />
      <MenuItem icon={ShareSmallIcon} text="Share" onPress={() => console.log('Share pressed')} />
      <MenuItem
        icon={DownloadSmallIcon}
        text="Download"
        onPress={() => console.log('Download pressed')}
      />
      <MenuItem
        icon={TrashSmallIcon}
        text="Delete"
        colorScheme="destructive"
        onPress={() => console.log('Delete pressed')}
      />
    </Menu>
  </ViewWrap>
</View>
```

### Basic Usage

```tsx
// Example usage
import { useRef } from 'react';
import { Menu, MenuItem, MenuTrigger } from '@utilitywarehouse/hearth-react-native';
import { EditSmallIcon, TrashSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const menuRef = useRef(null);

  return (
    <>
      <MenuTrigger onPress={() => menuRef.current?.present()}>
        <Button>Open Menu</Button>
      </MenuTrigger>

      <Menu ref={menuRef} heading="Actions">
        <MenuItem icon={EditSmallIcon} text="Edit" onPress={() => console.log('Edit')} />
        <MenuItem
          icon={TrashSmallIcon}
          text="Delete"
          colorScheme="destructive"
          onPress={() => console.log('Delete')}
        />
      </Menu>
    </>
  );
};
```

### Menu

| Prop       | Type        | Default | Description                                   |
| ---------- | ----------- | ------- | --------------------------------------------- |
| `heading`  | `string`    | -       | Heading text displayed at the top of the menu |
| `children` | `ReactNode` | -       | Menu items to display                         |

The rest of the props are passed down to the underlying `BottomSheetModal` component, so you can use any of its
props for additional configuration (e.g. `snapPoints`, `backgroundStyle`, etc.).
See the `BottomSheetModal` documentation for more details.

### MenuItem

| Prop           | Type                                     | Default        | Description                        |
| -------------- | ---------------------------------------- | -------------- | ---------------------------------- |
| `icon`         | `ComponentType`                          | -              | Icon component to display          |
| `iconPosition` | `'left' \| 'right'`                      | `'left'`       | Position of the icon               |
| `text`         | `string`                                 | -              | Text to display in the menu item   |
| `colorScheme`  | `'functional' \| 'destructive'`          | `'functional'` | Color scheme for the menu item     |
| `disabled`     | `boolean`                                | `false`        | Whether the menu item is disabled  |
| `onPress`      | `(event: GestureResponderEvent) => void` | -              | Callback when menu item is pressed |

### MenuTrigger

| Prop       | Type           | Description                                                         |
| ---------- | -------------- | ------------------------------------------------------------------- |
| `children` | `ReactElement` | The child element that triggers the menu (must be a single element) |
| `onPress`  | `() => void`   | Function that opens the menu                                        |

### Icon Positioning

Icons can be positioned on either the left or right side of the menu item text using the `iconPosition` prop.

### Color Schemes

Menu items support two color schemes:

- `functional` (default): Uses primary text and icon colors
- `destructive`: Uses danger/destructive colors for actions like delete

### Disabled State

Menu items can be disabled using the `disabled` prop, which applies reduced opacity and prevents interaction.

### Auto-closing

Menu items automatically close the menu when pressed, making it easy to handle actions without manual menu dismissal.

### Basic Menu

A simple menu with icon-based actions:

```tsx
// Example usage
<Menu heading="Menu Options" />
```

### With Destructive Action

Menu with a destructive action styled differently:

```tsx
// Example usage
<Menu heading="Menu Options" />
```

### Icon on Right

Menu items with icons positioned on the right side:

```tsx
// Example usage
<Menu heading="Menu Options" />
```

### Without Icons

Simple text-only menu items:

```tsx
// Example usage
<Menu heading="Menu Options" />
```

### With Disabled Items

Menu with some items disabled:

```tsx
// Example usage
<Menu heading="Menu Options" />
```

### Without Heading

Menu without a heading section:

```tsx
// Example usage
<Menu heading="Menu Options" />
```

## Accessibility

- Menu items have `accessibilityRole="button"` for proper screen reader support
- Disabled state is communicated via `accessibilityState`
- Keyboard navigation is supported on web platforms
- All interactive elements are properly focusable
