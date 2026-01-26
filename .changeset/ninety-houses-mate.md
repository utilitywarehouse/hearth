---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: Support `Flex` props on `TabContent` component

This change bases the `TabContent` component on the `Flex` component, allowing
consumers to use all `Flex` props to customize its layout.

In doing this we have also removed the default padding on `TabContent`.
Consumers will need to adjust their own padding in response to this change as
`TabContent` layouts may change slightly as a result.

