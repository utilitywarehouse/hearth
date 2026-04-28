# Tooltip on an Icon-Only Button that Opens a Modal

To compose this correctly you need three things working together:

1. `HearthProvider` at your app root (required for Tooltip)
2. `Tooltip` wrapping the trigger element
3. `ModalRoot` / `ModalTrigger` / `Modal` for the confirmation dialog

The key constraint is that `ModalTrigger` and `Tooltip` both need to wrap the same button, and you must not lose the accessible label on `IconButton`. Here is the correct composition:

## Setup (app root)

```tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App({ children }) {
  return <HearthProvider>{children}</HearthProvider>;
}
```

`HearthProvider` is required for `Tooltip` to work. Without it, the tooltip silently fails.

## Component

```tsx
import {
  IconButton,
  Tooltip,
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
      <Tooltip description="Delete item" align="topCenter">
        <ModalTrigger>
          <IconButton label="Delete item" variant="ghost" colorScheme="destructive">
            <DeleteMediumIcon />
          </IconButton>
        </ModalTrigger>
      </Tooltip>

      <Modal
        heading="Delete item"
        description="Are you sure you want to delete this item? This cannot be undone."
      >
        <ModalFooter>
          <ModalClose>
            <Button variant="outline" colorScheme="functional">Cancel</Button>
          </ModalClose>
          <ModalClose>
            <Button variant="solid" colorScheme="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  );
}
```

## What each decision means

**`label="Delete item"` on `IconButton`**
`label` is the accessible name for the button. It is required — TypeScript does not enforce it, but omitting it is a critical accessibility failure. The tooltip `description` and the button `label` can share the same text.

**`variant="ghost" colorScheme="destructive"`**
Icon buttons use `ghost` variant. `destructive` colorScheme is appropriate for a delete action. This is a valid combination — `ghost` accepts `functional`, `affirmative`, or `destructive`.

**`Tooltip` wrapping `ModalTrigger`**
The tooltip wraps the trigger so that hover/focus on the button shows the tooltip. `ModalTrigger` wraps the `IconButton` so that clicking opens the modal. The order is: `Tooltip` > `ModalTrigger` > `IconButton`.

**`ModalRoot` as the outermost container**
`ModalRoot` holds the open/close state for the modal. Both `ModalTrigger` and `Modal` must be descendants of `ModalRoot`.

**Confirmation modal structure**
The modal uses `heading` and `description` for the confirmation copy. `ModalFooter` holds the actions. Each action button is wrapped in `ModalClose` so that clicking either button dismisses the modal. Wire your delete logic to `onClick` on the confirm button before `ModalClose` handles the close.

## Common mistakes to avoid

- Do not place `Tooltip` inside `ModalTrigger` — the trigger needs to be the direct child of `ModalTrigger`, with the tooltip wrapping that.
- Do not use `variant="emphasis"` or `variant="solid"` for an icon button — use `ghost`.
- Do not use `colorScheme="highlight"` with `ghost` — that combination is invalid and renders without colour. Use `destructive` for a delete action.
- Do not use the deprecated `loadingText` prop if you add a loading state to the modal — use `loadingHeading` and `loadingDescription` instead.
