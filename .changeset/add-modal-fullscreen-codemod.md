---
'@utilitywarehouse/hearth-codemod': minor
---

🔧 [ENHANCEMENT]: Add `react/v1/remove-modal-fullscreen` codemod

Removes `Modal`'s `fullScreen` prop in every form (`fullScreen`,
`fullScreen={true}`, `fullScreen={false}` and `fullScreen={expr}`). The prop
has no effect, so removing it never changes behaviour. Where `fullScreen` may
arrive through a prop spread, the element is left unchanged and a warning is
printed for manual review.

```sh
npx @utilitywarehouse/hearth-codemod react/v1/remove-modal-fullscreen <path>
```

It is also included in `react/v1/migration`. See the
[`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
