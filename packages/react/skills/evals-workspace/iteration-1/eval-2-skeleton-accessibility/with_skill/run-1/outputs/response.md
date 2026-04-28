# Building an Accessible Loading Skeleton in hearth-react

hearth-react provides a dedicated `Skeleton` family of components for exactly this use case. For a heading placeholder plus three lines of body text, you'll use three components together: `Skeleton`, `SkeletonHeading`, and `SkeletonBodyText`.

## The Complete Pattern

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
        <Skeleton loadingTitle="user profile">
          <SkeletonHeading width="60%" />
          <SkeletonBodyText lines="3" />
        </Skeleton>
      ) : (
        <ActualUserProfile user={user} />
      )}
    </div>
  );
}
```

## Why `loadingTitle` is Required

`loadingTitle` is **not optional** — omitting it is a silent accessibility failure. The `Skeleton` component uses it to generate an `aria-live="polite"` announcement for screen readers. Internally, it renders:

```html
<div class="visually-hidden" aria-live="polite">Loading user profile</div>
<div aria-hidden><!-- skeleton shapes --></div>
```

The skeleton shapes themselves are hidden from the accessibility tree via `aria-hidden`. Screen reader users hear "Loading user profile" instead of seeing meaningless placeholder elements. The string you provide is automatically prefixed with "Loading", so pass a descriptive noun phrase like `"user profile"`, `"account details"`, or `"article content"`.

## Why `aria-busy` is Needed on the Container

The wrapping container needs `aria-busy={isLoading}` to signal to assistive technologies that the region is in the process of updating. This is a separate concern from the `aria-live` announcement — `aria-busy` marks the region as not yet settled, while the live region announces the loading state when it first renders.

## Customising the Heading Size

`SkeletonHeading` supports `size` values that map to the `Heading` component's sizes: `'sm' | 'md' | 'lg' | 'xl' | '2xl'`. The default is `'md'`. Match it to the heading level in your actual content:

```tsx
<Skeleton loadingTitle="user profile">
  <SkeletonHeading size="lg" width="55%" />
  <SkeletonBodyText lines="3" />
</Skeleton>
```

## Customising the Body Text Size

`SkeletonBodyText` supports `size` values of `'sm' | 'md' | 'lg'` (default `'md'`), and a `lines` prop accepting string values `'1'` through `'12'`. The height of each line is derived from the corresponding `BodyText` line-height token, so the skeleton accurately represents the real content's footprint:

```tsx
<SkeletonBodyText lines="3" size="md" />
```

## Controlling Widths

Both `SkeletonHeading` and `SkeletonBodyText` accept `width`, `minWidth`, and `maxWidth` props. This lets you vary line widths to make the skeleton look more natural. The final line of body text is conventionally shorter:

```tsx
<Skeleton loadingTitle="user profile">
  <SkeletonHeading width="60%" marginBottom="4" />
  <SkeletonBodyText lines="2" />
  <SkeletonBodyText width="75%" />
</Skeleton>
```

Note: to show the last line as shorter this way, you render two separate `SkeletonBodyText` elements — one for the first two full-width lines, and one for the shorter final line.

## Full Worked Example with Conditional Rendering

```tsx
import { useState, useEffect } from 'react';
import {
  Skeleton,
  SkeletonHeading,
  SkeletonBodyText,
  Heading,
  BodyText,
} from '@utilitywarehouse/hearth-react';

interface UserData {
  name: string;
  bio: string;
}

function UserCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUser().then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div aria-busy={isLoading}>
      {isLoading ? (
        <Skeleton loadingTitle="user details">
          <SkeletonHeading size="md" width="50%" marginBottom="3" />
          <SkeletonBodyText lines="3" size="md" />
        </Skeleton>
      ) : (
        <div>
          <Heading size="md">{user?.name}</Heading>
          <BodyText>{user?.bio}</BodyText>
        </div>
      )}
    </div>
  );
}
```

## Reduced Motion

The skeleton's shimmer animation is automatically suppressed when the user has `prefers-reduced-motion: reduce` set in their OS — no extra work needed. The component's CSS handles this via `@media (prefers-reduced-motion: no-preference)`.

## Accessibility Checklist

- `loadingTitle` is set to a meaningful noun phrase describing the content being loaded
- The wrapping container has `aria-busy={isLoading}`
- The `Skeleton` is conditionally rendered — replace it with real content once loading completes (do not keep it in the DOM hidden)
- The `loadingTitle` description matches the actual content that will replace the skeleton, so the screen reader announcement is accurate

## What to Avoid

```tsx
// WRONG — missing loadingTitle, silent accessibility failure
<Skeleton>
  <SkeletonHeading width="60%" />
  <SkeletonBodyText lines="3" />
</Skeleton>

// WRONG — missing aria-busy on the container
<div>
  {isLoading && (
    <Skeleton loadingTitle="user profile">
      <SkeletonHeading width="60%" />
      <SkeletonBodyText lines="3" />
    </Skeleton>
  )}
</div>

// WRONG — loadingTitle is vague
<Skeleton loadingTitle="loading">
  ...
</Skeleton>

// CORRECT
<div aria-busy={isLoading}>
  {isLoading ? (
    <Skeleton loadingTitle="user profile">
      <SkeletonHeading width="60%" />
      <SkeletonBodyText lines="3" />
    </Skeleton>
  ) : (
    <ActualContent />
  )}
</div>
```
