---
'@utilitywarehouse/hearth-react-native': minor
---

💔 [BREAKING CHANGE]: `Accordion` no longer depends on `@gluestack-ui/accordion`

`createAccordion` provided the single/multiple/collapsible expand-collapse state machine, the trigger/content render-prop wiring, and the collapse/expand height animation — all now implemented directly with an in-house state resolver and the existing `Expandable` primitive (previously used by `ExpandableCard`), with no new dependency. `aria-controls`/`role="region"` (web-only ARIA landmark concepts with no native-platform equivalent) are dropped; expanded/disabled state is now exposed to assistive tech via `accessibilityState` on the trigger, consistent with `Input`/`Textarea`. A disabled item inside a disabled group is now always treated as disabled (previously an item explicitly marked `disabled={false}` inside a disabled group was incorrectly still interactive). No visual or animation-timing change.

**Developer changes**:

`AccordionTrigger`'s render-prop argument has been renamed from `isExpanded` to `expanded`, for consistency with the rest of the library's prop naming:

```diff
<AccordionTrigger>
-  {({ isExpanded }) => (
-    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} />
+  {({ expanded }) => (
+    <Icon name={expanded ? 'chevron-up' : 'chevron-down'} />
  )}
</AccordionTrigger>
```

If you only use `AccordionItem`'s `title`/`triggerContent` props (the common case), no changes are required.
