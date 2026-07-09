# Inline Link

An `InlineLink` is a hyperlink embedded directly within a sentence or paragraph of text.
An Inline text should follow the typography style on the body of copy is sits within.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Sizes](#sizes)

## Playground

```tsx
<InlineLink href="https://www.uw.co.uk" target="_blank">
  embedded link
</InlineLink>
```

## Usage

```jsx
import { BodyText, InlineLink } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <BodyText>
    This is the body text style, and it contains an{' '}
    <InlineLink href="https://www.uw.co.uk" target="_blank">
      embedded link
    </InlineLink>{' '}
    within this text. This works on white backgrounds
  </BodyText>
);
```

## Props

| Property   | Type                                         | Description                                     | Default   |
| ---------- | -------------------------------------------- | ----------------------------------------------- | --------- |
| `href`     | `string`                                     | The URL to navigate to.                         | `-`       |
| `onPress`  | `() => void`                                 | Function to be called on press.                 | `-`       |
| `target`   | `'_self' \| '_blank' \| '_parent' \| '_top'` | The target of the link.                         | `'_self'` |
| `inverted` | `boolean`                                    | Invert the link colours for purple backgrounds. | `false`   |
| `disabled` | `boolean`                                    | Disable the link.                               | `false`   |
