---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add `loadingHeading` & `loadingDescription` to `Modal`.

This change adds two new props, `loadingHeading` and `loadingDescription`, to
the `Modal` component. These props allow developers to specify custom loading
text that will be displayed when the modal is in a loading state.

This change also deprecates the `loadingText` prop, which was previously used to
display loading text in the modal. The new props provide more flexibility and
allow for a clearer separation of the heading and description in the loading
state.

Consumers should update their code to use the new `loadingHeading` and
`loadingDescription` props instead of the deprecated `loadingText` prop.

```diff
- <Modal loadingText="Loading...">
+ <Modal loadingHeading="Loading..." loadingDescription="Please wait while we fetch the data.">
```

