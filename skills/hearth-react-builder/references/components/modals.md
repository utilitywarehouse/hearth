# Modals & Overlays

## Modal

A full dialog with heading, optional image, scrollable content, and footer actions.

```tsx
import {
  ModalRoot,
  ModalTrigger,
  Modal,
  ModalContent,
  ModalFooter,
  ModalClose,
} from '@utilitywarehouse/hearth-react';
```

### ModalRoot props

| Prop | Values | Notes |
|---|---|---|
| `open` | boolean | Controlled mode |
| `onOpenChange` | `(open: boolean) => void` | Controlled mode handler |
| `defaultOpen` | boolean | Uncontrolled mode |

### Modal props

| Prop | Values | Notes |
|---|---|---|
| `heading` | string | Required |
| `description` | string | Optional subtitle |
| `image` | React node | Header image (above heading) |
| `loading` | boolean | Shows loading state, hides content |
| `loadingHeading` | string | Heading shown during loading |
| `loadingDescription` | string | Description shown during loading |
| `hideCloseButton` | boolean | Removes the × button |
| `fullScreen` | boolean | Full viewport height on mobile |
| `onEscapeKeyDown` | `(e: KeyboardEvent) => void` | Override escape key |
| `onPointerDownOutside` | `(e: PointerEvent) => void` | Override click-outside |

---

### Basic modal (uncontrolled)

```tsx
<ModalRoot>
  <ModalTrigger>
    <Button variant="solid" colorScheme="highlight">Open modal</Button>
  </ModalTrigger>
  <Modal heading="Confirm changes" description="This will update your account.">
    <ModalContent>
      <BodyText size="md">Are you sure you want to save these changes?</BodyText>
    </ModalContent>
    <ModalFooter>
      <ModalClose>
        <Button variant="ghost" colorScheme="functional">Cancel</Button>
      </ModalClose>
      <ModalClose>
        <Button variant="solid" colorScheme="highlight">Confirm</Button>
      </ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

### Controlled modal (trigger lives elsewhere)

```tsx
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open modal</Button>
  <ModalRoot open={open} onOpenChange={setOpen}>
    <Modal heading="Controlled modal">
      <ModalFooter>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </ModalFooter>
    </Modal>
  </ModalRoot>
</>
```

### Modal with image

```tsx
<Modal
  heading="Save a bundle"
  description="Add more services for a better deal"
  image={<img src={SpotSavingsLight} alt="" role="presentation" />}
>
  <ModalFooter>
    <ModalClose>
      <Button variant="ghost" colorScheme="functional">Not now</Button>
    </ModalClose>
    <ModalClose>
      <Button variant="solid" colorScheme="highlight">Find out more</Button>
    </ModalClose>
  </ModalFooter>
</Modal>
```

### Long scrollable content

```tsx
<Modal heading="Terms and conditions" fullScreen>
  <ModalContent>
    <BodyText paragraphSpacing size="md">
      <p>First section of terms...</p>
      <p>Second section...</p>
    </BodyText>
  </ModalContent>
  <ModalFooter>
    <ModalClose>
      <Button variant="ghost" colorScheme="functional">Close</Button>
    </ModalClose>
    <ModalClose>
      <Button variant="solid" colorScheme="highlight">Accept</Button>
    </ModalClose>
  </ModalFooter>
</Modal>
```

### Loading state (e.g. while form submits)

```tsx
<Modal
  loading
  loadingHeading="Saving your changes"
  loadingDescription="This will only take a moment..."
  hideCloseButton
/>
```

### Prevent dismissal (critical confirmation)

```tsx
<Modal
  heading="Important action required"
  hideCloseButton
  onEscapeKeyDown={e => e.preventDefault()}
  onPointerDownOutside={e => e.preventDefault()}
>
  <ModalContent>
    <BodyText size="md">You must acknowledge this before continuing.</BodyText>
  </ModalContent>
  <ModalFooter>
    <ModalClose>
      <Button variant="solid" colorScheme="highlight">I understand</Button>
    </ModalClose>
  </ModalFooter>
</Modal>
```

---

## Accessibility

- Focus is automatically trapped inside the modal
- Escape key closes the modal by default — only prevent this with a strong UX justification
- `heading` is automatically linked via `aria-labelledby`
- `ModalTrigger` is optional — use controlled `open` + `onOpenChange` when the trigger is elsewhere (e.g. form submission result)

**Gotchas:**
- `ModalClose` wraps the actual button/link — it's the close trigger, not the button itself
- Both `ModalContent` (explicit scrollable area) and direct children work; `ModalContent` gives you controlled overflow
- `fullScreen` applies on mobile viewports specifically

---

## Tooltip

Contextual help text shown on hover/focus.

```tsx
import { Tooltip, TooltipProvider } from '@utilitywarehouse/hearth-react';

// TooltipProvider must wrap any usage — place near HearthProvider
<TooltipProvider>
  <Tooltip content="This field is required for your account">
    <IconButton label="More information" variant="ghost" colorScheme="functional">
      <InfoSmallIcon />
    </IconButton>
  </Tooltip>
</TooltipProvider>
```

**Accessibility:**
- Keyboard and focus support is built in
- Tooltip content is announced to screen readers
- Don't place interactive elements (buttons, links) inside tooltip content — use a modal instead
