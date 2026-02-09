---
'@utilitywarehouse/hearth-react-native': minor
---

💅 [ENHANCEMENT]: Unify spacing prop naming across layout components

The `space` prop has been renamed to `spacing` across all layout components for improved consistency and clarity. The `space` prop is now deprecated but will continue to work alongside the new `spacing` prop to maintain backward compatibility.

**Components affected**:
- `Box`
- `ButtonGroup`
- `Card`
- `Container`
- `Divider`
- `Flex`
- `Grid`

**Developer changes**:

No immediate changes are required. The `space` prop will continue to work as before. However, we recommend migrating to the `spacing` prop at your convenience:

```diff
- <Flex space="md">
+ <Flex spacing="md">
    <Box>...</Box>
    <Box>...</Box>
  </Flex>
```

```diff
- <Grid columns={2} space="lg">
+ <Grid columns={2} spacing="lg">
    <Box>...</Box>
    <Box>...</Box>
  </Grid>
```

```diff
- <Container space="xl">
+ <Container spacing="xl">
    <Box>...</Box>
  </Container>
```

The deprecated `space` prop will be removed in a future major version release.
