# Known Component Mappings Reference

Use these as a starting point. Always verify against the live base-ui docs — APIs evolve.

## Accordion

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Accordion.Root` type `'single'` | `Accordion.Root` (default) | `type` prop removed |
| `Accordion.Root` type `'multiple'` | `Accordion.Root multiple` | `type` replaced by `multiple: boolean` |
| `Accordion.Root collapsible` | _(always collapsible)_ | remove prop |
| `Accordion.Content` | `Accordion.Panel` | internal rename |
| `forceMount` on Content | `keepMounted` on Panel | deprecation shim |

## Tabs

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Tabs.Trigger` | `Tabs.Tab` | internal rename |
| `Tabs.Content` | `Tabs.Panel` | internal rename |
| `activationMode` on Root | `activateOnFocus` on `Tabs.List` | moved + renamed; expose on Hearth's List sub-component if needed |
| `forceMount` on Content | `keepMounted` on Panel | deprecation shim |

## Checkbox

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Indicator asChild` | `Indicator render` | internal only |
| _(none)_ | `parent`, `uncheckedValue`, `nativeButton` | new base-ui props; opt-in |

## Switch

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Switch.Thumb` | `Switch.Thumb` | no change |
| _(none)_ | `uncheckedValue`, `nativeButton` | new opt-in props |

## Radio

| Radix | Base UI | Notes |
|-------|---------|-------|
| `RadioGroup.Item` | `Radio.Root` | internal rename |
| `RadioGroup.Indicator` | `Radio.Indicator` | internal rename |
| `onValueChange` | `onValueChange` (with `eventDetails`) | same name, richer signature |

## Select

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Select.Content` | `Select.Popup` + `Select.Positioner` | structural split (internal) |
| `Select.Viewport` | _(built into List)_ | remove from JSX |
| `Select.ScrollUpButton` | `Select.ScrollUpArrow` | internal rename |
| `Select.ScrollDownButton` | `Select.ScrollDownArrow` | internal rename |

## Tooltip

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Tooltip.Content` | `Tooltip.Popup` + `Tooltip.Positioner` | structural split (internal) |
| `Provider delayDuration` | `Provider delay` | renamed; deprecation shim |
| `Provider skipDelayDuration` | `Provider timeout` | renamed; deprecation shim |
| `Root disableHoverableContent` | `Root disableHoverablePopup` | renamed; deprecation shim |

## Popover

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Popover.Content` | `Popover.Popup` + `Popover.Positioner` | structural split (internal) |
| `avoidCollisions`, `collisionPadding` | `collisionAvoidance` on Positioner | if exposed, deprecation shim or breaking |
