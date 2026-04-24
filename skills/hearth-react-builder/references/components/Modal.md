# Modal / ModalRoot / ModalTrigger / ModalFooter / ModalClose

Accessible dialog overlay.

```tsx
import {
  Modal,
  ModalRoot,
  ModalTrigger,
  ModalFooter,
  ModalClose,
} from '@utilitywarehouse/hearth-react';
```

**Modal props:**

| Prop | Values | Notes |
|---|---|---|
| `heading` | string | Required (unless `loading`) |
| `description` | string | Optional subtitle |
| `loading` | boolean | Shows loading state |
| `loadingHeading` | string | Heading while loading |
| `loadingDescription` | string | Description while loading |
| `hideCloseButton` | boolean | Hides × button |
| `fullScreen` | boolean | Full-screen on mobile |
| `image` | ReactNode | Image above heading |

```tsx
<ModalRoot>
  <ModalTrigger asChild>
    <Button variant="solid">Open modal</Button>
  </ModalTrigger>
  <Modal heading="Confirm cancellation" description="This action cannot be undone.">
    <BodyText>Are you sure you want to cancel your plan?</BodyText>
    <ModalFooter>
      <ModalClose asChild>
        <Button variant="outline">Keep my plan</Button>
      </ModalClose>
      <Button variant="solid" colorScheme="danger" onClick={handleCancel}>
        Cancel plan
      </Button>
    </ModalFooter>
  </Modal>
</ModalRoot>

// Loading state
<Modal
  loading
  loadingHeading="Processing payment"
  loadingDescription="Please wait..."
/>
```

**Accessibility:** Modal traps focus when open and restores it on close. The heading is used as the dialog's `aria-labelledby` automatically.

**Gotchas:**
- `ModalClose` must be used (not a plain button) to close the dialog — it wires up the close behaviour
- Use `asChild` on `ModalTrigger` and `ModalClose` when wrapping custom elements
