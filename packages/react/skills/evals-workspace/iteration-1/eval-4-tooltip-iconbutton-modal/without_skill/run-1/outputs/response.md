# Composing a Tooltip, Icon-Only Button, and Confirmation Modal

This guide shows how to correctly compose `Tooltip`, `IconButton`, `ModalRoot`, `ModalTrigger`, and `Modal` together in `@utilitywarehouse/hearth-react`.

---

## The key challenge

`Tooltip` and `ModalTrigger` both need to wrap the same button. The trick is understanding the nesting order: the `Tooltip` wraps the `ModalTrigger`, which wraps the `IconButton`. Both `Tooltip` and `ModalTrigger` use `asChild` under the hood (via Radix UI), so only one element ends up in the DOM.

---

## Provider setup

`Tooltip` requires a provider in the component tree. If your app already uses `HearthProvider`, you are covered — it includes `TooltipProvider` internally. If not, wrap the relevant subtree:

```tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App({ children }) {
  return <HearthProvider>{children}</HearthProvider>;
}
```

Alternatively, use `TooltipProvider` directly for a narrower scope:

```tsx
import { TooltipProvider } from '@utilitywarehouse/hearth-react';

function MyFeature({ children }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
```

---

## Full example: uncontrolled (recommended)

The simplest approach. `ModalRoot` manages open/close state internally.

```tsx
import {
  Tooltip,
  IconButton,
  ModalRoot,
  ModalTrigger,
  Modal,
  ModalFooter,
  ModalClose,
  Button,
} from '@utilitywarehouse/hearth-react';
import { DeleteMediumIcon } from '@utilitywarehouse/hearth-react-icons';

function DeleteItemButton() {
  return (
    <ModalRoot>
      <Tooltip description="Delete item">
        <ModalTrigger>
          <IconButton
            label="Delete item"
            variant="ghost"
            colorScheme="destructive"
          >
            <DeleteMediumIcon />
          </IconButton>
        </ModalTrigger>
      </Tooltip>

      <Modal
        heading="Delete item"
        description="Are you sure you want to delete this item? This action cannot be undone."
      >
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost" colorScheme="functional">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose>
            <Button variant="solid" colorScheme="destructive">
              Delete
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  );
}
```

### Why this nesting order?

- `ModalRoot` must be the outermost wrapper — it provides context for the trigger and modal content.
- `Tooltip` wraps `ModalTrigger` so the tooltip shows on hover/focus of the trigger element.
- `ModalTrigger` uses `asChild`, so it passes its dialog-open behaviour down to `IconButton` without adding an extra DOM element.
- `IconButton` renders the actual `<button>` element with the correct `aria-label` (via its required `label` prop) and the icon as its child.

---

## Full example: controlled

Use this pattern when you need to perform an action before or after opening the modal — for example, loading data or tracking analytics.

```tsx
import React from 'react';
import {
  Tooltip,
  IconButton,
  ModalRoot,
  Modal,
  ModalFooter,
  ModalClose,
  Button,
} from '@utilitywarehouse/hearth-react';
import { DeleteMediumIcon } from '@utilitywarehouse/hearth-react-icons';

function DeleteItemButton({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = React.useState(false);

  function handleConfirm() {
    setOpen(false);
    onConfirm();
  }

  return (
    <>
      <Tooltip description="Delete item">
        <IconButton
          label="Delete item"
          variant="ghost"
          colorScheme="destructive"
          onClick={() => setOpen(true)}
        >
          <DeleteMediumIcon />
        </IconButton>
      </Tooltip>

      <ModalRoot open={open} onOpenChange={setOpen}>
        <Modal
          heading="Delete item"
          description="Are you sure you want to delete this item? This action cannot be undone."
        >
          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="functional"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              colorScheme="destructive"
              onClick={handleConfirm}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </ModalRoot>
    </>
  );
}
```

In the controlled pattern, the `IconButton` lives outside `ModalRoot` and is wired up directly with `onClick`. The `Tooltip` simply wraps it. There is no `ModalTrigger` needed because you are controlling open state yourself.

---

## Accessibility notes

### `label` prop on `IconButton`

`IconButton` requires a `label` prop. This is rendered as `aria-label` on the underlying `<button>`. It should match the visual intent of the icon — in this case `"Delete item"`. The label is separate from the tooltip text, but they can be identical.

```tsx
<IconButton label="Delete item" ...>
  <DeleteMediumIcon />
</IconButton>
```

### Tooltip and `aria-label` are complementary

The tooltip (`description="Delete item"`) provides a visible hint on hover/focus. The `label` prop ensures screen readers have an accessible name regardless of whether the tooltip is visible. Both are needed.

### Modal close button

`Modal` includes a close icon button by default. If you hide it with `hideCloseButton`, always provide a visible alternative (such as a Cancel button in `ModalFooter`), otherwise keyboard users may be unable to dismiss the modal.

---

## Component API summary

### `Tooltip`

| Prop           | Type                                                                                                                         | Default       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `children`     | `ReactNode` — the trigger element                                                                                            |               |
| `description`  | `ReactNode` — required tooltip content                                                                                       |               |
| `heading`      | `string` — optional bold heading above description                                                                           |               |
| `align`        | `"topLeft" \| "topCenter" \| "topRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "leftCenter" \| "rightCenter"` | `"topCenter"` |
| `open`         | `boolean`                                                                                                                    |               |
| `defaultOpen`  | `boolean`                                                                                                                    |               |
| `onOpenChange` | `(open: boolean) => void`                                                                                                    |               |

### `IconButton`

| Prop          | Type                                                            | Notes                    |
| ------------- | --------------------------------------------------------------- | ------------------------ |
| `label`       | `string`                                                        | Required. Becomes `aria-label`. |
| `size`        | `Responsive<"sm" \| "md">`                                      | Default `"md"`.          |
| `variant`     | `"emphasis" \| "solid" \| "outline" \| "ghost"`                 |                          |
| `colorScheme` | `"highlight" \| "functional" \| "affirmative" \| "destructive"` |                          |
| `loading`     | `boolean`                                                       |                          |
| `asChild`     | `boolean`                                                       |                          |

### `ModalRoot`

| Prop           | Type                      |
| -------------- | ------------------------- |
| `open`         | `boolean`                 |
| `defaultOpen`  | `boolean`                 |
| `onOpenChange` | `(open: boolean) => void` |

### `Modal`

| Prop              | Type        | Notes                          |
| ----------------- | ----------- | ------------------------------ |
| `heading`         | `string`    | Required when not loading.     |
| `description`     | `string`    |                                |
| `hideCloseButton` | `boolean`   |                                |
| `image`           | `ReactNode` |                                |
| `loading`         | `boolean`   |                                |
| `fullScreen`      | `boolean`   | Recommended for long content.  |
