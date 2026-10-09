---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `ToggleButtonCard` button no longer overflows the card

The toggle button row in `ToggleButtonCard` used `flex: 1`, so in a card that
sizes to its content the row had no height and the button spilled out below the
card border, with its label cut off. The button now sizes to its content and
still grows to fill the card's width.

**Components affected**:

- `ToggleButtonCard`

**Developer changes**:

No action is required.
