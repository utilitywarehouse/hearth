---
'@utilitywarehouse/hearth-react-native': minor
---

💅 [ENHANCEMENT]: Fix `Card` visual issues with custom action wrappers and add explicit opt-in pattern

Fixed visual issues in the `Card` component when using custom wrapper components around `CardAction` (e.g., when mapping over data). The previous heuristic-based detection could cause incorrect styling and layout when custom components were used.

The `Card` component now supports an explicit opt-in pattern for custom action wrappers, providing reliable detection and consistent styling. Additionally, `CardPressHandler` now properly respects `disabled` and `loading` states when inheriting event handlers from child components.

**Components affected**:
- `Card`
- `CardPressHandler`

**Developer changes**:

If you're experiencing visual issues with custom wrapper components around `CardAction` (e.g., when mapping over data), you can fix this by explicitly marking them as action wrappers with the `isCardActionWrapper` static property:

```tsx
const CustomAction = ({ label, onPress }) => (
  <CardAction heading={label} onPress={onPress} />
);

CustomAction.isCardActionWrapper = true;

const MyComponent = () => (
  <Card>
    {actions.map(action => (
      <CustomAction key={action.id} label={action.label} onPress={action.onPress} />
    ))}
  </Card>
);
```

This ensures your custom wrappers are correctly identified as actions, preventing unwanted `CardContent` wrapping and incorrect styling.

If you're using `CardAction` components directly (not wrapped in custom components), no changes are required and there's no impact to your existing code.
