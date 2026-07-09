# Skeleton

The `Skeleton` component is used to show a loading state for a component that is still loading.

## Usage

```tsx
<Skeleton {...args} />
```

```jsx
import { Center, Skeleton, Text } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  const [loading, setLoading] = useState(true);

  return (
    <Center>
      {loading ? <Skeleton width={200} height={16} /> : <BodyText>Loaded</BodyText>}
    </Center>
  );
);
```

## Props

| Name              | Type     | Default        | Description                           |
| ----------------- | -------- | -------------- | ------------------------------------- |
| `width`           | `number` | `-`            | The width of the skeleton.            |
| `height`          | `number` | `-`            | The height of the skeleton.           |
| `backgroundColor` | `string` | `warmWhite100` | The background color of the skeleton. |
| `borderRadius`    | `number` | `xs`           | The border radius of the skeleton.    |
