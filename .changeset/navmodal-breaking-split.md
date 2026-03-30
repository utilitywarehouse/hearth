---
'@utilitywarehouse/hearth-react-native': minor
---

💔 [BREAKING CHANGE]: Extract navigation-presented modal behaviour into `NavModal`

`Modal` now only supports the bottom-sheet modal behaviour. The React Navigation screen-based API that was previously exposed through `inNavModal`, `background`, and `scrollable` has moved to the new `NavModal` component.

`NavModal` also adds a `presentation` prop so the component can match the React Navigation screen presentation style for sheet-style and full-screen modal routes.

**Components affected**:
- `Modal`
- `NavModal`

**Developer changes**:

Update navigation modal screens to use `NavModal` instead of `Modal`:

```diff
- import { Modal } from '@utilitywarehouse/hearth-react-native';
+ import { NavModal, type NavModalRef } from '@utilitywarehouse/hearth-react-native';

- const modalRef = useRef<Modal>(null);
+ const modalRef = useRef<NavModalRef>(null);

- <Modal inNavModal background="brand" scrollable={false}>
+ <NavModal background="brand" scrollable={false} presentation="modal">
    {/* content */}
- </Modal>
+ </NavModal>
```

If you are using the bottom-sheet modal API, no changes are required.