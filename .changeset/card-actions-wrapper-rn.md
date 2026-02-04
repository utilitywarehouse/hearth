---
'@utilitywarehouse/hearth-react-native': minor
---

💔 [BREAKING CHANGE]: Require `CardActions` wrapper for `CardAction` groups.

`Card` now only treats actions as such when they are wrapped in `CardActions`. This removes wrapper heuristics and makes action grouping explicit while keeping automatic content wrapping.

**Components affected**:
- `Card`
- `CardActions`
- `CardAction`

**Developer changes**:

Wrap all `CardAction` items in `CardActions`:

```diff
- <Card>
-   <CardAction heading="Action 1" onPress={() => {}} />
-   <CardAction heading="Action 2" onPress={() => {}} />
- </Card>
+ <Card>
+   <CardActions>
+     <CardAction heading="Action 1" onPress={() => {}} />
+     <CardAction heading="Action 2" onPress={() => {}} />
+   </CardActions>
+ </Card>
```
