---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: `Modal` supports an `imageSize` prop

Use `imageSize` to set the maximum size of the `image`. `md` (default) is for standard illustrations, `lg` is for larger banner images. The image is now also centre aligned.

```tsx
<Modal imageSize="lg" image={<img src={banner} alt="" />} heading="Want predictable monthly bills?" />
```

**Components affected**:

- `Modal`

**Developer changes**:

No action required. `imageSize` defaults to `md`.
