# Menu

Use the `Menu` component to present a short list of actions or options in
response to a user’s interaction. Menus are ideal for actions like sorting,
filtering, or providing additional options without navigating away from the
current screen.

- [Usage](#usage)
- [MenuTrigger](#menutrigger)
- [Placement](#placement)
- [MenuItem](#menuitem)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Migration](#migration)
- [API](#api)

```tsx
<Menu {...args}>
  <MenuTrigger>
    <Button variant="outline" colorScheme="functional">
      Menu trigger
      <ExpandSmallIcon />
    </Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem>Item</MenuItem>
    <MenuItem>Item</MenuItem>
    <MenuItem asChild>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#">
        Navigation Item
        <OpenSmallIcon />
      </a>
    </MenuItem>
    <MenuItem colorScheme="functional">Item</MenuItem>
    <MenuItem colorScheme="destructive">
      Destructive item
      <TrashSmallIcon />
    </MenuItem>
    <MenuItem disabled>Disabled item</MenuItem>
  </MenuContent>
</Menu>
```

## Usage

The root `Menu` component will wrap the `MenuTrigger` & `MenuContent` components.

The `MenuTrigger` must wrap a `Button` or `IconButton` component, and the
`MenuContent` component will wrap any number of `MenuItem` components.

```tsx
<Menu>
  <MenuTrigger>
    <Button variant="outline" colorScheme="functional">
      Menu trigger
      <ExpandSmallIcon />
    </Button>
  </MenuTrigger>
  <MenuContent>
    <MenuItem>Menu item</MenuItem>
    <MenuItem>Menu item</MenuItem>
    <MenuItem>Menu item</MenuItem>
    <MenuItem>Menu item</MenuItem>
  </MenuContent>
</Menu>
```

### Modal vs non-modal behaviour

If you are using multiple `Menu` components together, for instance in a
navigation bar, you can set `modal` to `false` so that when a user has an open
`Menu` and they click on a different `MenuTrigger` the second `Menu` opens
immediately, closing the first `Menu` without the need for the user to click
outside of the first `Menu` to close it.

```tsx
<Menu modal={false}>
```

## MenuTrigger

You must render either a `Button` or `IconButton` component as a child of the `MenuTrigger`.

```tsx
<Menu {...args}>
  <MenuTrigger>
    <IconButton variant="outline" colorScheme="functional" label="add">
      <AddMediumIcon />
    </IconButton>
  </MenuTrigger>
  <MenuContent>
    <MenuItem>Item</MenuItem>
    <MenuItem>Item</MenuItem>
    <MenuItem>Item</MenuItem>
    <MenuItem>Item</MenuItem>
  </MenuContent>
</Menu>
```

### Detached trigger

By default the `MenuTrigger` lives inside `Menu`. When the trigger needs to exist in a
different part of the component tree — for example in a toolbar while the menu state is
managed elsewhere — use `Menu.createHandle()` to connect them.

Create the handle once at module level (outside any component), then pass it to both
`MenuTrigger` and `Menu` via the `handle` prop. `Menu` no longer needs a `MenuTrigger`
child in this pattern.

```tsx
<Flex gap="300" alignItems="center">
  {/* MenuTrigger lives outside Menu — connected via handle */}
  <MenuTrigger handle={detachedHandle}>
    <Button variant="outline" colorScheme="functional">
      Open menu
      <ExpandSmallIcon />
    </Button>
  </MenuTrigger>
  {/* Menu has no MenuTrigger child — it opens via the handle above */}
  <Menu handle={detachedHandle}>
    <MenuContent>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
</Flex>
```

```tsx
const menuHandle = Menu.createHandle();

// Somewhere in the tree:
<MenuTrigger handle={menuHandle}>
  <Button variant="outline" colorScheme="functional">
    Open menu
    <ExpandSmallIcon />
  </Button>
</MenuTrigger>

// Elsewhere in the tree:
<Menu handle={menuHandle}>
  <MenuContent>
    <MenuItem>Item</MenuItem>
    <MenuItem>Item</MenuItem>
  </MenuContent>
</Menu>
```

## Placement

You can adjust the vertical and horizontal placement of the `MenuContent`.

```tsx
<Flex height="400px" width="800px" alignItems="center" justifyContent="center" gap="200">
  <Menu {...args}>
    <MenuTrigger>
      <Button variant="outline" colorScheme="functional">
        Bottom left
      </Button>
    </MenuTrigger>
    <MenuContent placement="bottomLeft">
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
  <Menu {...args}>
    <MenuTrigger>
      <Button variant="outline" colorScheme="functional">
        Bottom right
      </Button>
    </MenuTrigger>
    <MenuContent placement="bottomRight">
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
  <Menu {...args}>
    <MenuTrigger>
      <Button variant="outline" colorScheme="functional">
        Top left
      </Button>
    </MenuTrigger>
    <MenuContent placement="topLeft">
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
  <Menu {...args}>
    <MenuTrigger>
      <Button variant="outline" colorScheme="functional">
        Top right
      </Button>
    </MenuTrigger>
    <MenuContent placement="topRight">
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
</Flex>
```

## MenuItem

The `MenuItem` can be either `functional` or `destructive`, and can also contain icons.

If a `MenuItem` is navigating to another page, use the `asChild` prop to render a
semantic `<a>` element — all accessible attributes are merged onto the child.

```tsx
<MenuContent>
  <MenuItem>Item</MenuItem>
  <MenuItem colorScheme="functional">Item</MenuItem>
  <MenuItem colorScheme="destructive">
    Destructive item
    <TrashSmallIcon />
  </MenuItem>
  <MenuItem asChild>
    <a href="/another-page">
      Navigation Item
      <OpenSmallIcon />
    </a>
  </MenuItem>
  <MenuItem disabled>Disabled item</MenuItem>
</MenuContent>
```

## Accessibility

Adheres to the [Menu Button WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) and uses
[roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
to manage focus movement among menu items.

### Keyboard interactions

<Flex direction="column" gap="200" className="sb-unstyled">
  <Flex>
    <Box width="300px">
      <BodyText as="span" weight="bold">
        Key
      </BodyText>
    </Box>
    <BodyText as="span" weight="bold">
      Description
    </BodyText>
  </Flex>
  <Divider />
  {[
    {
      key: 'Space',
      description:
        'When focus is on MenuTrigger, opens the menu and focuses the selected item. When focus is on an item, selects the focused item.',
    },
    {
      key: 'Enter',
      description:
        'When focus is on MenuTrigger, opens the menu and focuses the first item. When focus is on an item, selects the focused item.',
    },
    {
      key: 'ArrowDown',
      description:
        'When focus is on MenuTrigger, opens the menu. When focus is on an item, moves focus to the next item.',
    },
    {
      key: 'ArrowUp',
      description:
        'When focus is on MenuTrigger, opens the menu. When focus is on an item, moves focus to the previous item.',
    },
    {
      key: 'Esc',
      description: 'Closes the menu and moves focus to MenuTrigger.',
    },
  ].map((kbi, i) => (
    <>
      <Flex>
        <Box width="300px">
          <kbd>{kbi.key}</kbd>
        </Box>
        <BodyText as="span">{kbi.description}</BodyText>
      </Flex>
      {i < 4 ? <Divider /> : null}
    </>
  ))}
</Flex>

## SEO

By default, `MenuContent` is removed from the DOM when the menu is closed, which
means search engines may not index its content. If the menu items are important
for SEO — for example, primary navigation links — use the `keepMounted` prop on
`MenuContent` to keep them in the DOM at all times.

```tsx
<MenuContent keepMounted>
  <MenuItem>Item</MenuItem>
</MenuContent>
```

### Migrating from `v0.30.x`

**`MenuItem` deprecations:**

- `onSelect` is deprecated. Use `onClick` instead — it fires for both mouse and keyboard activation.
- `textValue` is deprecated. Use `label` instead — it is used for accessibility and keyboard navigation.

**`MenuContent` deprecation:**

- `forceMount` is deprecated. Use `keepMounted` instead.

```tsx
{/* Before */}
<MenuItem onSelect={handleSelect} textValue="label">Item</MenuItem>
<MenuContent forceMount>...</MenuContent>

{/* After */}
<MenuItem onClick={handleSelect} label="label">Item</MenuItem>
<MenuContent keepMounted>...</MenuContent>
```

### Consumer migration prompt

Paste the following into an agent to update all Menu usages in your codebase:

```
I'm upgrading @utilitywarehouse/hearth-react. The Menu component has migrated
from Radix UI to Base UI internally. The following prop changes affect consumers:

RENAMED (deprecated — old name still works but logs a dev-mode warning):
  - `MenuItem: onSelect` → `onClick`: Base UI uses standard React onClick for
    both mouse and keyboard activation.
  - `MenuItem: textValue` → `label`: used for keyboard text navigation and
    accessibility.
  - `MenuContent: forceMount` → `keepMounted`: aligned with Base UI's API.

Please search this codebase for all usages of MenuItem and MenuContent imported
from '@utilitywarehouse/hearth-react' and apply the following changes:
  - Replace every `onSelect=` on MenuItem with `onClick=`
  - Replace every `textValue=` on MenuItem with `label=`
  - Replace every `forceMount` on MenuContent with `keepMounted`

Do not change any other logic, styling, or structure. After making changes,
run TypeScript to confirm no type errors remain.
```

## API

| Prop               | Type                                                                  | Default | Description                                                                                                                                                                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`         | `ReactNode`                                                           | —       | The content of the Menu. Should contain `MenuTrigger` and `MenuContent`.                                                                                                                                                                                                                                                  |
| `open`             | `boolean`                                                             | —       | Whether the menu is currently open.                                                                                                                                                                                                                                                                                       |
| `disabled`         | `boolean`                                                             | `false` | Whether the component should ignore user interaction.                                                                                                                                                                                                                                                                     |
| `modal`            | `boolean`                                                             | `true`  | Determines if the menu enters a modal state when open. - `true`: user interaction is limited to the menu: document page scroll is locked and pointer interactions on outside elements are disabled. - `false`: user interaction with the rest of the document is allowed.                                                 |
| `defaultOpen`      | `boolean`                                                             | `false` | Whether the menu is initially open. To render a controlled menu, use the `open` prop instead.                                                                                                                                                                                                                             |
| `onOpenChange`     | `((open: boolean, eventDetails: MenuRootChangeEventDetails) => void)` | —       | Event handler called when the menu is opened or closed.                                                                                                                                                                                                                                                                   |
| `actionsRef`       | `RefObject<MenuRootActions \| null>`                                  | —       | A ref to imperative actions. - `unmount`: When specified, the menu will not be unmounted when closed. Instead, the `unmount` function must be called to unmount the menu manually. Useful when the menu's animation is controlled by an external library. - `close`: When specified, the menu can be closed imperatively. |
| `triggerId`        | `string \| null`                                                      | —       | ID of the trigger that the popover is associated with. This is useful in conjunction with the `open` prop to create a controlled popover. There's no need to specify this prop when the popover is uncontrolled (that is, when the `open` prop is not set).                                                               |
| `defaultTriggerId` | `string \| null`                                                      | —       | ID of the trigger that the popover is associated with. This is useful in conjunction with the `defaultOpen` prop to create an initially open popover.                                                                                                                                                                     |
| `handle`           | `MenuHandle<unknown>`                                                 | —       | A handle to associate the menu with a trigger. If specified, allows external triggers to control the menu's open state.                                                                                                                                                                                                   |

### MenuTrigger API

| Prop          | Type                                                          | Default | Description                                                                                                                     |
| ------------- | ------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `style`       | `CSSProperties`                                               | —       |                                                                                                                                 |
| `className`   | `string`                                                      | —       |                                                                                                                                 |
| `disabled`    | `boolean`                                                     | `false` | Whether the component should ignore user interaction.                                                                           |
| `children`    | `ReactElement<unknown, string \| JSXElementConstructor<any>>` | —       | The content of the MenuTrigger. Should contain a single `Button` or `IconButton` that will be used as the trigger for the Menu. |
| `closeDelay`  | `number`                                                      | `0`     | How long to wait before closing the menu that was opened on hover. Specified in milliseconds. Requires the `openOnHover` prop.  |
| `handle`      | `MenuHandle<unknown>`                                         | —       | A handle to associate the trigger with a menu.                                                                                  |
| `delay`       | `number`                                                      | `100`   | How long to wait before the menu may be opened on hover. Specified in milliseconds. Requires the `openOnHover` prop.            |
| `openOnHover` | `boolean`                                                     | —       | Whether the menu should also open when the trigger is hovered.                                                                  |

### MenuContent API

| Prop          | Type                                                       | Default      | Description                                                                          |
| ------------- | ---------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------ |
| `className`   | `string`                                                   | —            |                                                                                      |
| `style`       | `CSSProperties`                                            | —            |                                                                                      |
| `placement`   | `"bottomLeft" \| "bottomRight" \| "topLeft" \| "topRight"` | `bottomLeft` | The placement of the menu relative to the trigger element. Defaults to 'bottomLeft'. |
| `keepMounted` | `boolean`                                                  | `false`      | Whether the menu should be kept mounted in the DOM when closed. Defaults to false.   |
| `forceMount`  | `true`                                                     | —            | @deprecated Use `keepMounted` instead. Will be removed in next major.                |

### MenuItem API

This component is based on the `div` element.

| Prop           | Type                                                                     | Default      | Description                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`        | `string`                                                                 | —            | Overrides the text label to use when the item is matched during keyboard text navigation.                                                      |
| `className`    | `string`                                                                 | —            |                                                                                                                                                |
| `id`           | `string`                                                                 | —            | @ignore                                                                                                                                        |
| `onClick`      | `((event: BaseUIEvent<MouseEvent<HTMLDivElement, MouseEvent>>) => void)` | —            | The click handler for the menu item.                                                                                                           |
| `disabled`     | `boolean`                                                                | `false`      | Whether the component should ignore user interaction.                                                                                          |
| `closeOnClick` | `boolean`                                                                | `true`       | Whether to close the menu when the item is clicked.                                                                                            |
| `colorScheme`  | `"functional" \| "destructive"`                                          | `functional` |                                                                                                                                                |
| `asChild`      | `boolean`                                                                | —            | Change the default rendered element for the one passed as a child, merging their props and behaviour. Useful for rendering MenuItem as a link. |
| `textValue`    | `string`                                                                 | —            | Deprecated override of the text label to use when the item is matched during keyboard text navigation. @deprecated Use `label` instead.        |
