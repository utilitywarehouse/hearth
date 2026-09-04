---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Subcomponents now have their own Storybook entries, so the `hearth-react-native` MCP server can resolve their props

`ModalImage`, `Pill`, `CardPressHandler`, `TableHeader`, `TableHeaderCell`, `HighlightBannerImage`, `ProgressStep`, `TimelineItem`, `BannerImage`, and `BannerIllustration` each now have their own Storybook story. Previously these subcomponents only appeared nested inside their parent's docs page, so the `hearth-react-native` MCP server (used by AI coding agents) couldn't resolve their props — it could only resolve props for a component with its own Storybook entry. `packages/react-native/SKILL.md` has been updated to default to the MCP server for component lookups, reflecting this.

**Components affected**:

- `Modal` (`ModalImage`)
- `PillGroup` (`Pill`)
- `Card` (`CardPressHandler`)
- `Table` (`TableHeader`, `TableHeaderCell`)
- `HighlightBanner` (`HighlightBannerImage`)
- `ProgressStepper` (`ProgressStep`)
- `Timeline` (`TimelineItem`)
- `Banner` (`BannerImage`, `BannerIllustration`)

**Developer changes**:

No action required — this only affects Storybook navigation and the guidance given to AI coding agents using this library, not the runtime API.
