---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Adds `Timeline` and `TimelineItem`

The package now includes `Timeline` and `TimelineItem` components for showing a sequence of static stops or progress steps. The new API supports labelled items, optional helper text, progress states for complete or active steps, and custom content within an item when you need to show extra context or actions.

**Components affected**:
- `Timeline`
- `TimelineItem`

**Developer changes**:

Import `Timeline` and `TimelineItem` from `@utilitywarehouse/hearth-react-native`. Use `variant="static"` for simple ordered events, or `variant="progress"` with item `state` values to communicate step progress.

```tsx
import { Timeline, TimelineItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
	<Timeline variant="progress">
		<TimelineItem label="Ordered" helperText="We have received your order" state="complete" />
		<TimelineItem label="Packed" helperText="Your items are ready" state="complete" />
		<TimelineItem label="Out for delivery" helperText="Arriving today" state="active" />
		<TimelineItem label="Delivered" helperText="Pending" state="incomplete" />
	</Timeline>
);
```