---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: Subcomponents now have their own Storybook entries, so the `hearth-react` MCP server can resolve their props

`AccordionItem`, `AccordionHeader`, `Card`'s action/content subcomponents
(`CardActions`, `CardActionLink`, `CardActionButton`, `CardContent`,
`CardBannerContent`), `CardAccordionItem`, `CardAccordionButton`,
`ChipGroup`, `DescriptionListItem`, `ExpandableCardGroup`, `ListItemContent`,
`ListItemLink`, `MenuTrigger`, `MenuContent`, `MenuItem`, `ProgressStep`,
`ProgressStepLink`, `ProgressStepButton`, `SegmentedControlOption`,
`TableHeaderCell`, `ToastProvider`, `ToastActionLink`, and `ToggleGroup` each
now have their own Storybook story. Previously these subcomponents only
appeared nested inside their parent's docs page, so the `hearth-react` MCP
server (used by AI coding agents) couldn't resolve their props — it could
only resolve props for a component with its own Storybook entry. `packages/react/SKILL.md` has been updated to reflect this.

**Developer changes**:

No action required — this only affects Storybook navigation and the
guidance given to AI coding agents using this library, not the runtime API.
