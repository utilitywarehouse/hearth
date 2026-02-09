---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `VerificationInput` ref methods and improve rapid input handling

`VerificationInput` now forwards a ref with `focus`, `blur`, `clear`, and `focusIndex` helpers. Input updates also use the latest value to avoid dropped digits when typing quickly.

**Developer changes**:

If you want to control focus programmatically, pass a ref:

```tsx
import { useRef } from 'react';
import { VerificationInput, type VerificationInputHandle } from '@utilitywarehouse/hearth-react-native';

const inputRef = useRef<VerificationInputHandle>(null);

<VerificationInput ref={inputRef} onChangeText={setCode} />;
```
