# Responsive props

Many layout and styling props support a `Responsive` object for applying prop
values at different breakpoints. The keys of this object reflect the different
breakpoints available, and each value will be applied when the screen size is
greater than or equal to the named breakpoint.

```tsx
<Box
  padding={{
    mobile: "0",
    tablet: "100",
    desktop: "200",
    wide: "400",
  }}>
  <BodyText
    size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }}
    weight={{ mobile: 'bold', desktop: 'regular' }}
  >
    {...}
  </BodyText>
</Box>
```

These use **mobile-first** media queries so you only need to include a larger
breakpoint if it is different from the previous smaller breakpoint.

```tsx
<Box
  padding={{
    mobile: '100',
    // tablet: '100', This breakpoint is not needed as it is the same as the mobile breakpoint.
    desktop: '200',
    // wide: '200', This breakpoint value matches the desktop one, so it is unnecessary, and will be covered by the desktop, mobile first, declaration
  }}
/>
```
