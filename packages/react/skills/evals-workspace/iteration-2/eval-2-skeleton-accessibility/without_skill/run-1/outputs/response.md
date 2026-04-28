# Building an Accessible Loading Placeholder in hearth-react

hearth-react provides a `Skeleton` component family specifically designed for this use case. Here is how to build a heading placeholder plus three lines of body text accessibly.

## The components you need

- `Skeleton` — wrapper that handles all accessibility concerns
- `SkeletonHeading` — placeholder sized to match a `Heading`
- `SkeletonBodyText` — placeholder sized to match `BodyText`, with a `lines` prop

## Complete example

```tsx
import {
  Skeleton,
  SkeletonHeading,
  SkeletonBodyText,
  Flex,
} from '@utilitywarehouse/hearth-react';

function UserProfile({ isLoading, user }) {
  return (
    <div aria-busy={isLoading}>
      {isLoading ? (
        <Skeleton loadingTitle="user data">
          <Flex direction="column" gap="200">
            <SkeletonHeading size="md" width="60%" />
            <SkeletonBodyText lines="3" size="md" width="100%" />
          </Flex>
        </Skeleton>
      ) : (
        // render real content here
        <div>...</div>
      )}
    </div>
  );
}
```

## How accessibility is handled

### `aria-busy` on the container

Wrap both the skeleton and your real content in a single container and toggle `aria-busy={isLoading}` on it. Screen readers use this attribute to signal that the region is still updating. Set it to `true` while loading, and it will be implicitly `false` (or you can set it explicitly) once the real content renders.

### `loadingTitle` on `Skeleton`

`Skeleton` requires a `loadingTitle` string. Internally the component renders a visually-hidden `aria-live="polite"` region that announces **"Loading user data"** (your string is automatically prefixed with "Loading"). The visual skeleton children are wrapped in `aria-hidden` so screen readers ignore the decorative placeholder shapes entirely.

This means:
- Sighted users see the animated skeleton.
- Screen reader users hear a single polite announcement ("Loading user data") and are not overwhelmed by meaningless placeholder markup.

## Props reference

### `Skeleton`

| Prop | Type | Notes |
|---|---|---|
| `loadingTitle` | `string` | **Required.** Describes what is loading; prefixed with "Loading" in the announcement. |

### `SkeletonHeading`

| Prop | Type | Default |
|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` |
| `width` | size token or CSS value | — |

### `SkeletonBodyText`

| Prop | Type | Default |
|---|---|---|
| `lines` | `'1'` – `'12'` | `'1'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `width` | size token or CSS value | — |

## Tips

- Match the `size` of `SkeletonHeading` to the `variant`/`size` of the real `Heading` it will replace — this prevents layout shift when the content loads.
- Match the `size` of `SkeletonBodyText` to the `size` of your real `BodyText` for the same reason.
- Use the `width` prop (e.g. `"60%"`, `"80%"`) to give lines natural-looking variation in length rather than all being the same width.
- Keep `aria-busy` toggled on the **outermost** container that contains both the skeleton and the real content so the transition is correctly communicated.
