# Strong

Bold inline text for semantic emphasis within body copy.

```tsx
import { Strong } from '@utilitywarehouse/hearth-react';
```

```tsx
<BodyText>
  Call us on <Strong>0333 777 8777</Strong> to arrange a callback.
</BodyText>

// Inside an Alert with a rich text body
<Alert colorScheme="danger" title="Payment failed" text="Please call us on:">
  <InlineLink href="tel:03337778777">
    <Strong>0333 777 8777</Strong>
  </InlineLink>
</Alert>
```

`Strong` renders as `<strong>` and inherits the surrounding text's size and colour. It adds semantic emphasis (screen readers may announce it) in addition to visual bold weight.
