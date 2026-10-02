---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Excess space below a full-screen `Modal` with a single-button footer

The scrollable content area in a full-screen `Modal` reserved a fixed
proportion of the viewport height for the header and footer on mobile,
assuming a two-button footer. With a single-button footer this left a large
gap between the button and the bottom of the modal. Content now fills
whatever space remains after the header and footer, regardless of how many
buttons the footer has.
