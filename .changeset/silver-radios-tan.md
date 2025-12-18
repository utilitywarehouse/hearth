---
'@utilitywarehouse/hearth-react': minor
---

Breaking changes to `borderRadius` props. The following props have been removed:

- `borderTopLeftRadius`
- `borderTopRightRadius`
- `borderBottomLeftRadius`
- `borderBottomRightRadius`

These have been replaced with the following props:

- `borderRadiusTopLeftNone`
- `borderRadiusTopRightNone`
- `borderRadiusTopNone`
- `borderRadiusBottomLeftNone`
- `borderRadiusBottomRightNone`
- `borderRadiusBottomNone`

If you were using the above removed props previously, you can now set your
desired border-radius using `borderRadius` and override any sides or corners you
do not need it applied to:

```diff
- <Box borderTopLeftRadius='lg' borderTopRightRadius='lg' />
+ <Box borderRadius='lg' borderRadiusBottomNone />
```

