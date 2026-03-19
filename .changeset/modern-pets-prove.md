---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: Add `Skeleton` components

This update introduces the `Skeleton` components, which provide a visual
placeholder for content that is loading. The `Skeleton` components include:

- `Skeleton`
- `SkeletonHeading`
- `SkeletonBox`
- `SkeletonBodyText`

These are each designed to mimic the appearance of their respective content
types while data is being fetched.

```tsx
<div aria-busy={isLoading}>
  {isLoading ? (
    <Skeleton loadingTitle="storybook demo">
      <Flex direction="column" gap="100">
        <SkeletonHeading width="60%" />
        <SkeletonBodyText width="80%" lines="3" />
        <SkeletonBox width="100%" height="200px" />
        <SkeletonBox width="64px" height="64px" borderRadius="full" />
      </Flex>
    </Skeleton>
  ) : (

    {...}

  )}
</div>
```
