---
'@utilitywarehouse/hearth-react': minor
---

💔 [BREAKING VISUAL CHANGE]: `RadioTile` default layout change

This change updates the default layout for `RadioTile`, when used in a row, to
hug the content instead of filling the available space. This is a breaking
change as it may affect existing layouts where `RadioTile` was used in a row and
relied on the previous default behaviour of filling the available space. To
restore the previous behaviour, you can set the `flex` prop to `1` on each `RadioTile`:

```diff
 <RadioGroup direction="row" label="Numbers">
+  <RadioTile value="1" label="One" flex="1" />
+  <RadioTile value="2" label="Two" flex="1" />
 </RadioGroup>
```
