---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add `HearthProvider` component

This component provides the necessary context for all Hearth components. It
should be used at the root of your application to ensure that all components
have access to the required context.

Currently it provides context for the `Tooltip` component, but it may also
include other providers in the future, so it is recommended to use
`HearthProvider` instead of individual providers like `TooltipProvider`.

```tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App({ children }) {
  return <HearthProvider>{children}</HearthProvider>;
}
```
