# Skeleton / SkeletonBox / SkeletonBodyText / SkeletonHeading

Loading placeholders that match the shape of the content being loaded.

```tsx
import { Skeleton, SkeletonBox, SkeletonBodyText, SkeletonHeading } from '@utilitywarehouse/hearth-react';
```

**Skeleton (provider wrapper):** `loadingTitle` (string) — announces to screen readers that content is loading

**SkeletonBox props:** `width` (default `'160px'`), `height` (default `'96px'`), `borderRadius`

**SkeletonBodyText props:** `lines` (number), `size` (`'sm'` \| `'md'` \| `'lg'`)

**SkeletonHeading props:** `size` (`'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'`)

```tsx
// Article loading state
<Skeleton loadingTitle="Loading article">
  <SkeletonHeading size="xl" />
  <SkeletonBodyText lines={5} size="md" />
</Skeleton>

// Card loading state
<Skeleton loadingTitle="Loading card">
  <Flex direction="column" gap="300" width="320px">
    <SkeletonBox width="100%" height="160px" borderRadius="sm" />
    <SkeletonBox width="60%" height="20px" borderRadius="xs" />
    <SkeletonBodyText lines={2} size="sm" />
  </Flex>
</Skeleton>

// Avatar + text placeholder
<Skeleton loadingTitle="Loading profile">
  <Flex gap="300" alignItems="center">
    <SkeletonBox borderRadius="full" width="64px" height="64px" />
    <Flex direction="column" gap="200">
      <SkeletonBox width="120px" height="16px" borderRadius="xs" />
      <SkeletonBox width="80px" height="14px" borderRadius="xs" />
    </Flex>
  </Flex>
</Skeleton>

// Full page loading state
{isLoading ? (
  <Skeleton loadingTitle="Loading dashboard">
    <Container>
      <Flex direction="column" gap="400">
        <SkeletonHeading size="xl" />
        <Grid defaultResponsiveColumns gap="300">
          <SkeletonBox gridColumnSpan="4" height="200px" borderRadius="md" />
          <SkeletonBox gridColumnSpan="4" height="200px" borderRadius="md" />
          <SkeletonBox gridColumnSpan="4" height="200px" borderRadius="md" />
        </Grid>
      </Flex>
    </Container>
  </Skeleton>
) : (
  <Dashboard />
)}
```

**Pattern:** Design the skeleton to closely match the shape of the real content — same widths, heights, and layout. This prevents layout shift when content loads.

**Gotcha:** `Skeleton` wraps all the placeholder components and provides the accessible announcement. Don't use `SkeletonBox` / `SkeletonBodyText` / `SkeletonHeading` without a parent `Skeleton`.
