# Building an Accessible Loading Skeleton in hearth-react

hearth-react has a dedicated set of Skeleton components designed exactly for this use case. Here is how to build your heading + three lines of body text placeholder accessibly.

## Components you need

Import the following from `@utilitywarehouse/hearth-react`:

- `Skeleton` — the wrapper that handles accessibility announcements
- `SkeletonHeading` — a placeholder shaped like a `Heading`
- `SkeletonBodyText` — a placeholder shaped like `BodyText`, supports multiple lines

```tsx
import {
  Skeleton,
  SkeletonHeading,
  SkeletonBodyText,
  Flex,
} from '@utilitywarehouse/hearth-react';
```

## Basic usage

```tsx
function UserProfile({ isLoading, user }) {
  return (
    <div aria-busy={isLoading}>
      {isLoading ? (
        <Skeleton loadingTitle="user profile">
          <Flex direction="column" gap="200">
            <SkeletonHeading size="md" width="50%" />
            <SkeletonBodyText lines="3" size="md" width="100%" />
          </Flex>
        </Skeleton>
      ) : (
        <>
          <Heading>{user.name}</Heading>
          <BodyText>{user.bio}</BodyText>
        </>
      )}
    </div>
  );
}
```

## How the accessibility works

### 1. `aria-busy` on the container

Wrap both the loading state and the loaded content in a single container element and set `aria-busy={isLoading}` on it. This tells screen readers that the region is in the process of updating. When `isLoading` becomes `false` and the real content renders, the screen reader knows to announce it.

```tsx
<div aria-busy={isLoading}>
  {isLoading ? <Skeleton ...> ... </Skeleton> : <RealContent />}
</div>
```

### 2. `loadingTitle` on `Skeleton` — required

The `Skeleton` component requires a `loadingTitle` prop. This is **not optional**. Internally, the component renders a visually-hidden live region (`aria-live="polite"`) that announces `"Loading <loadingTitle>"` to screen readers when the skeleton mounts. All the visual skeleton children are wrapped in `aria-hidden` so assistive technologies skip the decorative shimmer shapes.

Make `loadingTitle` descriptive of the specific content loading — not generic:

```tsx
// Good — describes the specific content
<Skeleton loadingTitle="user profile">

// Avoid — too vague
<Skeleton loadingTitle="content">
```

## SkeletonHeading props

| Prop       | Type                                      | Default |
| ---------- | ----------------------------------------- | ------- |
| `size`     | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"`  |
| `width`    | size token or CSS string                  | —       |
| `maxWidth` | size token or CSS string                  | —       |
| `minWidth` | size token or CSS string                  | —       |

Match the `size` to the real `Heading` size you'll show after loading to avoid layout shift.

## SkeletonBodyText props

| Prop    | Type                                                                                       | Default |
| ------- | ------------------------------------------------------------------------------------------ | ------- |
| `size`  | `Responsive<"sm" \| "md" \| "lg">`                                                         | `"md"`  |
| `lines` | `'1' \| '2' \| '3' \| ... \| '12'`                                                        | `"1"`   |
| `width` | size token or CSS string                                                                   | —       |

When `lines` is greater than `"1"`, the component renders each line as a separate `div` inside a vertical `Flex` column, giving you accurate multi-line spacing that matches real `BodyText` line height.

## Complete worked example

```tsx
import { useState, useEffect } from 'react';
import {
  Skeleton,
  SkeletonHeading,
  SkeletonBodyText,
  Flex,
  Heading,
  BodyText,
} from '@utilitywarehouse/hearth-react';

interface User {
  name: string;
  bio: string;
}

function UserProfileCard({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    // aria-busy signals to assistive technologies that this region is updating
    <div aria-busy={isLoading}>
      {isLoading ? (
        // Skeleton wrapper: announces "Loading user profile" via a live region
        // and hides the visual shimmer shapes from the accessibility tree
        <Skeleton loadingTitle="user profile">
          <Flex direction="column" gap="200">
            {/* Match size to your real Heading component's size */}
            <SkeletonHeading size="md" width="55%" />

            {/* lines="3" renders three stacked body text placeholders */}
            <SkeletonBodyText lines="3" size="md" width="100%" />
          </Flex>
        </Skeleton>
      ) : (
        <Flex direction="column" gap="200">
          <Heading level={2}>{user!.name}</Heading>
          <BodyText>{user!.bio}</BodyText>
        </Flex>
      )}
    </div>
  );
}
```

## Sizing tips to avoid layout shift

To minimise cumulative layout shift (CLS) when content loads:

- Set `SkeletonHeading size` to match the real `Heading` size prop you will render
- Set `SkeletonBodyText size` to match the real `BodyText` size prop you will render
- Set explicit `width` values on skeletons that approximate your expected content width

## What NOT to do

```tsx
// Missing aria-busy — screen readers won't know the region is updating
<div>
  {isLoading ? <Skeleton loadingTitle="user profile">...</Skeleton> : <Content />}
</div>

// Missing loadingTitle — TypeScript will error; screen readers get no announcement
<Skeleton>
  <SkeletonHeading />
</Skeleton>

// Skeleton children are already hidden from the a11y tree — don't add aria-hidden manually
<Skeleton loadingTitle="user profile">
  <SkeletonHeading aria-hidden /> {/* redundant, already handled internally */}
</Skeleton>
```

## Summary

The full accessibility pattern in hearth-react requires just two things:

1. `aria-busy={isLoading}` on the container wrapping both states
2. A meaningful `loadingTitle` prop on `<Skeleton>`

Everything else — the live region announcement, hiding decorative shapes from the accessibility tree — is handled internally by the `Skeleton` component.
