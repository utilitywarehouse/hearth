# Menu

Use the `Menu` component to present a short list of actions or options in response to a user’s interaction. Menus are ideal for actions like sorting, filtering, or providing additional options without navigating away from the current screen.

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

## Menu trigger

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

## Menu content placement

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

## Menu item

The `MenuItem` can be either `functional` or `destructive`, and can also contain icons.

If a `MenuItem` is navigating to another page, you can use the `asChild` prop to
render a semantic `<a>` element.

```tsx
<MenuContent>
  <MenuItem>Item</MenuItem>
  <MenuItem colorScheme="functional">Item</MenuItem>
  <MenuItem colorScheme="destructive">
    Destructive item
    <TrashSmallIcon />
  </MenuItem>
  {/* render a link element if navigating to somewhere else */}
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
for SEO — for example, primary navigation links — use the `forceMount` prop on
`MenuContent` to keep them in the DOM at all times.

When `forceMount` is set, the closed menu is hidden from view and the
accessibility tree using the `hidden` attribute, so it has no impact on the
visual layout or screen reader experience.

```tsx
<MenuContent forceMount>
  <MenuItem>Item</MenuItem>
</MenuContent>
```

## Menu API

| Prop           | Type                        | Default | Description |
| -------------- | --------------------------- | ------- | ----------- |
| `open`         | `boolean`                   | —       |             |
| `defaultOpen`  | `boolean`                   | —       |             |
| `onOpenChange` | `((open: boolean) => void)` | —       |             |
| `modal`        | `boolean`                   | —       |             |

## MenuContent API

| Prop                     | Type                                                       | Default      | Description                                                                                                           |
| ------------------------ | ---------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| `forceMount`             | `true`                                                     | —            | Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries. |
| `updatePositionStrategy` | `"optimized" \| "always"`                                  | —            |                                                                                                                       |
| `placement`              | `"bottomLeft" \| "bottomRight" \| "topLeft" \| "topRight"` | `bottomLeft` |                                                                                                                       |

### MenuItem API

This component is based on the `div` element.

| Prop          | Type                            | Default      | Description |
| ------------- | ------------------------------- | ------------ | ----------- |
| `onSelect`    | `((event: Event) => void)`      | —            |             |
| `asChild`     | `boolean`                       | —            |             |
| `disabled`    | `boolean`                       | —            |             |
| `textValue`   | `string`                        | —            |             |
| `colorScheme` | `"functional" \| "destructive"` | `functional` |             |
