# Building an Accessible Loading Placeholder in hearth-react

Use the `Skeleton`, `SkeletonHeading`, and `SkeletonBodyText` components from `@utilitywarehouse/hearth-react`.

## The two accessibility requirements

There are two things you must get right — both are silent failures if omitted:

1. **`loadingTitle` on `<Skeleton>`** — this is the accessible name announced to screen readers. There is no default, so omitting it means screen reader users get no indication that content is loading.
2. **`aria-busy` on the wrapping container** — this signals to assistive technology that the region is in a loading state.

## Complete example

```tsx
import {
  Skeleton,
  SkeletonHeading,
  SkeletonBodyText,
} from '@utilitywarehouse/hearth-react';

function UserProfile({ isLoading, user }) {
  return (
    <div aria-busy={isLoading}>
      {isLoading ? (
        <Skeleton loadingTitle="user data">
          <SkeletonHeading width="60%" />
          <SkeletonBodyText lines="3" />
        </Skeleton>
      ) : (
        <ActualUserContent user={user} />
      )}
    </div>
  );
}
```

## What each part does

- `<div aria-busy={isLoading}>` — wraps both the skeleton and the real content. When `true`, assistive technology knows the region is busy loading.
- `<Skeleton loadingTitle="user data">` — the outer skeleton container. The `loadingTitle` value ("user data") is what screen readers announce. Use a short, descriptive label that names what is loading.
- `<SkeletonHeading width="60%" />` — renders one heading-sized placeholder bar. The `width` prop accepts any CSS width value.
- `<SkeletonBodyText lines="3" />` — renders three lines of body text placeholders. Pass any number as a string to the `lines` prop.

## Key points

- `loadingTitle` is **required for accessibility** — there is no fallback. Missing it is a critical silent failure.
- `aria-busy` belongs on the **wrapper**, not on the `Skeleton` component itself.
- The skeleton and real content should be **mutually exclusive** — show one or the other, not both at once (use a conditional as shown above).
- `SkeletonBox` is also available if you need to add a circular avatar placeholder (e.g. `<SkeletonBox width="64px" height="64px" borderRadius="full" />`).
