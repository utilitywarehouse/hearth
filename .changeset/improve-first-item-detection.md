---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Improve first-item border detection in `Card` and `List` components

The `Card` and `List` components now use a more reliable method to detect and style the first rendered `CardAction`, `ListItem`, or `ListAction`. This fixes edge cases where wrapper components that conditionally render `null` would previously interfere with first-item border removal.

**Components affected**:
- `Card` / `CardAction`
- `List` / `ListItem` / `ListAction`

**Developer changes**:

No changes required. The improvement is automatic and maintains the same visual behavior. Components that wrap card actions or list items will now work correctly even when some wrappers return `null` conditionally.

**Note**: The `useCardFirstActionContext` hook has been removed as it was an internal implementation detail.
