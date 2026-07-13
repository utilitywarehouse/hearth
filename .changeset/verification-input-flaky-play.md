---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `VerificationInput` story interaction test no longer flakes on `getByLabelText`

The `FocusProgressionAfterEmptySlotSelection` story's `play` function used a
synchronous `getByLabelText` query that had no tolerance for timing gaps
between mount and Chromatic's headless interaction capture. Switched to the
async, retrying `findByLabelText` query instead.
