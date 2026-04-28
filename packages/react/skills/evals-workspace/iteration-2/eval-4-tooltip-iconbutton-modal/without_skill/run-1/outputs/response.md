# Tooltip + Icon-Only Button + Confirmation Modal

## The correct composition

To add a tooltip to an icon-only button that opens a confirmation modal, you need to nest the components in the right order. The key insight is that `ModalTrigger` must wrap the `IconButton`, and `Tooltip` must wrap `ModalTrigger` (not the other way around).

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
  HearthProvider,
} from '@utilitywarehouse/hearth-react';
import { DeleteMediumIcon } from '@utilitywarehouse/hearth-react-icons';

function DeleteItemButton() {
  return (
    <ModalRoot>
      <Tooltip description="Delete item" align="topCenter">
        <ModalTrigger>
          <IconButton
            variant="ghost"
            colorScheme="destructive"
            label="Delete item"
          >
            <DeleteMediumIcon />
          </IconButton>
        </ModalTrigger>
      </Tooltip>

      <Modal heading="Delete item?" description="This action cannot be undone.">
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

## Why this composition works

**Nesting order matters.** `Tooltip` wraps `ModalTrigger`, which in turn wraps `IconButton`. This means:

- The `Tooltip` shows on hover/focus of the button element.
- The `ModalTrigger` opens the modal on click.
- Both behaviours attach to the same underlying button element via Radix UI's `asChild` pattern — `ModalTrigger` renders `asChild`, passing its trigger behaviour down to the `IconButton`.

**Do not put `Tooltip` inside `ModalTrigger`.** If you wrap `Tooltip` inside `ModalTrigger`, the modal trigger behaviour attaches to the `Tooltip`'s wrapper element rather than the `IconButton`, which breaks both interactions.

## `IconButton` vs `UnstyledIconButton`

Use `IconButton` (not `UnstyledIconButton`) when you want the styled button with variants and colour schemes. `IconButton` accepts:

- `label` (required) — the accessible name for the button; this is what screen readers announce. Set it to the same text as the tooltip description so both sighted and non-sighted users get the same information.
- `variant` — `'emphasis' | 'solid' | 'outline' | 'ghost'`
- `colorScheme` — `'highlight' | 'functional' | 'affirmative' | 'destructive'`
- `size` — `'md' | 'sm'` (default: `'md'`)

For a destructive action like "Delete item", `variant="ghost"` and `colorScheme="destructive"` is the typical choice.

`UnstyledIconButton` is used when you need a bare icon button without design-system styling (e.g. dismiss buttons inside cards or modals).

## `HearthProvider` requirement

`Tooltip` requires a `TooltipProvider` in the tree. `HearthProvider` includes `TooltipProvider` by default. Wrap your application (or the relevant subtree) with `HearthProvider` once at the root — you do not need to add `TooltipProvider` separately:

```tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App() {
  return (
    <HearthProvider>
      {/* rest of your app */}
    </HearthProvider>
  );
}
```

## Controlled modal variant

If you need to open the modal programmatically (e.g. after an async check before confirming deletion), use the controlled pattern with `ModalRoot`'s `open` and `onOpenChange` props. In this case you do not use `ModalTrigger` at all — the `IconButton` manages its own `onClick`:

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

function DeleteItemButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip description="Delete item" align="topCenter">
        <IconButton
          variant="ghost"
          colorScheme="destructive"
          label="Delete item"
          onClick={() => setOpen(true)}
        >
          <DeleteMediumIcon />
        </IconButton>
      </Tooltip>

      <ModalRoot open={open} onOpenChange={setOpen}>
        <Modal heading="Delete item?" description="This action cannot be undone.">
          <ModalFooter>
            <ModalClose>
              <Button variant="ghost" colorScheme="functional">
                Cancel
              </Button>
            </ModalClose>
            <Button variant="solid" colorScheme="destructive" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </ModalRoot>
    </>
  );
}
```

In the controlled variant, `Tooltip` wraps the `IconButton` directly (no `ModalTrigger` needed). `ModalRoot` is rendered separately, outside the tooltip.

## Tooltip `align` prop

The `align` prop on `Tooltip` accepts one of:

```
'rightCenter' | 'leftCenter' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
| 'topLeft' | 'topCenter' | 'topRight'
```

The default is `'topCenter'`. Choose the alignment that best avoids clipping at viewport edges.

## Accessibility note

Because the button is icon-only, the `label` prop on `IconButton` is the accessible name. Set it to match (or closely describe) what the tooltip says — in this case `"Delete item"`. This ensures screen reader users receive the same description that tooltip users see on hover.
