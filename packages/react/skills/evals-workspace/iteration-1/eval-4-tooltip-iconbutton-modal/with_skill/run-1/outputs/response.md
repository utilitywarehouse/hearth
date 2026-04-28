# Tooltip + Icon Button + Modal Composition

Here's how to correctly compose a `Tooltip`-wrapped `IconButton` that opens a confirmation `Modal` in Hearth React.

---

## Key things to get right

There are three components working together here — `Tooltip`, `IconButton`, and `Modal` — and each has its own requirements that are easy to miss.

1. **`IconButton` requires a `label` prop** — this is the accessible name for screen readers. TypeScript won't catch if you omit it, so it's a silent accessibility failure.
2. **`Tooltip` requires `HearthProvider`** (or `TooltipProvider`) in the component tree — without it, the tooltip silently fails to render.
3. **`Modal` uses a composed root pattern** — you use `ModalRoot`, `ModalTrigger`, `Modal`, `ModalFooter`, and `ModalClose` as separate pieces.
4. **`ModalTrigger` and `Tooltip` need to be composed carefully** — `ModalTrigger` uses `asChild` semantics to forward its open behaviour to its child. The `Tooltip` wraps the outside, and `ModalTrigger` wraps the `IconButton` inside.

---

## Setup

Make sure `HearthProvider` wraps your app at the root:

```tsx
// app root (e.g. _app.tsx or layout.tsx)
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App({ children }) {
  return <HearthProvider>{children}</HearthProvider>;
}
```

> Without `HearthProvider`, `Tooltip` will silently fail to appear.

---

## The composed component

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

function DeleteButton() {
  return (
    <ModalRoot>
      {/* Tooltip wraps the trigger so the tooltip appears on hover */}
      <Tooltip description="Delete item" align="topCenter">
        <ModalTrigger>
          {/*
           * IconButton label is required for screen reader accessibility.
           * The tooltip provides the visual label on hover; the `label` prop
           * provides the accessible name for assistive technology.
           *
           * variant="ghost" + colorScheme="destructive" is the correct
           * discriminated union for a destructive icon-only action.
           */}
          <IconButton
            label="Delete item"
            variant="ghost"
            colorScheme="destructive"
          >
            <DeleteMediumIcon />
          </IconButton>
        </ModalTrigger>
      </Tooltip>

      {/* Modal renders in a portal — z-index stacking is handled automatically */}
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
            <Button variant="solid" colorScheme="highlight" onClick={handleDelete}>
              Delete
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  );
}
```

> Replace `handleDelete` with your actual delete handler.

---

## Why this structure works

### Tooltip placement

`Tooltip` wraps `ModalTrigger` (which in turn wraps `IconButton`). This means:
- Hovering or focusing the button shows the tooltip.
- Clicking the button opens the modal.
- Both behaviours coexist on the same element.

### ModalTrigger

`ModalTrigger` uses Radix's `asChild` behaviour internally — it forwards its click handler down to whatever child element you give it. Here that child is the `IconButton`.

### IconButton variant + colorScheme

The `variant`/`colorScheme` combination for `IconButton` follows the same discriminated union rules as `Button`:

| `variant`           | Valid `colorScheme` values                            |
|---------------------|-------------------------------------------------------|
| `emphasis` / `solid` | `highlight` only                                     |
| `outline` / `ghost` | `functional`, `affirmative`, or `destructive`        |

For a delete action, `variant="ghost"` + `colorScheme="destructive"` is the correct combination. Using `emphasis` with `destructive` would be a TypeScript error and would render without colour.

### Modal confirm button

For the confirm action inside the modal, `variant="solid"` + `colorScheme="highlight"` is the standard confirm pattern. `ModalClose` wraps each action button to close the modal automatically on click.

---

## Full working example with state

If you need to run async logic on confirm (e.g. an API call), handle it before closing — or manage open state manually:

```tsx
import React, { useState } from 'react';
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

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
}

function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onDelete();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalRoot open={open} onOpenChange={setOpen}>
      <Tooltip description="Delete item" align="topCenter">
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
        loading={loading}
        loadingHeading="Deleting..."
        loadingDescription="Please wait while we remove this item."
      >
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost" colorScheme="functional" disabled={loading}>
              Cancel
            </Button>
          </ModalClose>
          <Button
            variant="solid"
            colorScheme="highlight"
            loading={loading}
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  );
}
```

> Note: when you need to control when the modal closes (e.g. after an async action), manage `open`/`onOpenChange` on `ModalRoot` yourself and don't wrap the confirm button in `ModalClose` — call `setOpen(false)` in your handler instead.

> Also note: `loadingText` on Modal is deprecated since v0.27.3. Always use `loadingHeading` + `loadingDescription` instead.

---

## Checklist

- [ ] `HearthProvider` wraps the app at root
- [ ] `IconButton` has a `label` prop (accessible name for screen readers)
- [ ] `IconButton` uses a valid `variant` + `colorScheme` combination
- [ ] `Tooltip` wraps `ModalTrigger` (not the other way around)
- [ ] `ModalRoot` > `ModalTrigger` > `IconButton` nesting is correct
- [ ] `Modal` uses `loadingHeading`/`loadingDescription` (not deprecated `loadingText`) if showing a loading state
- [ ] `isolation: isolate` is set on your app root element if z-index stacking is an issue
