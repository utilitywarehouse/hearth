---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: Add `spacing` prop to `Tabs` to control the space between `TabsList` & `TabContent`.

You can now customize the spacing between the `TabsList` and `TabContent` in the
`Tabs` component by using the new `spacing` prop. This prop is from the `Flex`
component accepts predefined values (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`) to
adjust the gap according to your design needs.

No changes are needed from consumers, however you may find this is a better way
to manage the spacing in your `TabContent` layouts, possibly removing any
`paddingTop` within the `TabContent` component in favour of this approach.
