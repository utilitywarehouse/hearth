---
'@utilitywarehouse/hearth-react': minor
---

Refactor `SectionHeader` & `List` APIs.

Both `SectionHeader` and `List` now have a single `link` prop, which accepts a
`Link` component to be rendered. All other `link` prefixed props have been
removed and are now handled directly by the Link component, including the
rendering of child icons.

```tsx
<SectionHeader
  heading="Heading"
  helperText="Helper text"
  link={
    <Link>
      Link text
      <ChevronRightSmallIcon />
    </Link>
  }
/>
```
