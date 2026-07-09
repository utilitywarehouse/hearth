# Radio

The Radio component presents users with predefined choices and enables them to select only one option. It is commonly used for providing a single-choice selection in forms or surveys.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Components](#components)
  - [`Radio`](#radio)
  - [`RadioTile`](#radiotile)
  - [`RadioIndicator`](#radioindicator)
  - [`RadioIcon`](#radioicon)
  - [`RadioLabel`](#radiolabel)
  - [`RadioGroup`](#radiogroup)
  - [`RadioImage`](#radioimage)
- [Variants](#variants)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
  - [Grid Layout With Tiles](#grid-layout-with-tiles)
  - [`RadioTile` component](#radiotile-component)
  - [`RadioImage` component](#radioimage-component)
  - [`RadioGroup` component](#radiogroup-component)

## Playground

```tsx
<RadioGroup>
  <Radio
    aria-label="Label 1"
    onChange={(checked: boolean) => {
      console.log(checked, '###');
    }}
    nativeID="Radio-1"
    {...args}
  />
</RadioGroup>
```

## Usage

- A `Radio` component is composed of a `RadioGroup`, `RadioIndicator`, `RadioLabel`.
- `Radio` is used for a single selection
- `RadioGroup` is the building block for `Radio`

```tsx
import {
  Radio,
  RadioGroup,
  RadioLabel,
  RadioIndicator,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState('Option 1');
  return (
    <RadioGroup aria-label="Radio Group" value={value} onChange={setValue} nativeID="Radio-group">
      <Radio value="Option 1" aria-label="Option 1" label="Option 1" />
      <Radio value="Option 2" aria-label="Option 2" label="Option 2" />
    </RadioGroup>
  );
};
```

## Props

| Property             | Type                                | Default     | Description                                                                                          |
| -------------------- | ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `value`              | string                              | -           | The value to be used in the radio input. This is the value that will be returned on form submission. |
| `onChange`           | function                            | -           | Function called when the state of the radio changes.                                                 |
| `disabled`           | bool                                | false       | To manually set disable to the radio.                                                                |
| `validationStatus`   | `'valid' \| 'invalid' \| 'initial'` | -           | The validation status of the radio.                                                                  |
| `disabled`           | `bool`                              | `false`     | To manually set disable to the radio.                                                                |
| `label`              | `string`                            | -           | The label to be displayed next to the radio.                                                         |
| `helperText`         | `string`                            | -           | The helper text to be displayed below the radio.                                                     |
| `helperIcon`         | `React.ComponentType`               | -           | The icon to be displayed next to the helper text.                                                    |
| `badge`              | `ReactNode`                         | -           | The badge to be displayed below the helper text.                                                     |
| `invalidText`        | `string`                            | -           | The invalid text to be displayed below the radio.                                                    |
| `validText`          | `string`                            | -           | The valid text to be displayed below the radio.                                                      |
| `showValidationIcon` | `boolean`                           | `true`      | Whether to show the validation icon.                                                                 |
| `type`               | `'default' \| 'tile'`               | `'default'` | The type of the radio.                                                                               |
| `image`              | `ReactNode`                         | -           | The image to be displayed next to the label.                                                         |

### `Radio`

Contains all Radio related layout style props and actions. It inherits all the properties of React Native's [View component](https://reactnative.dev/docs/view).

### `RadioTile`

Contains all Radio related layout style props and actions. It inherits all the properties of React Native's [View component](https://reactnative.dev/docs/view).

### `RadioIndicator`

Contains all Indicator related layout style props and actions. It inherits all the properties of React Native's [View component](https://reactnative.dev/docs/view).

### `RadioIcon`

Contains all Icon related layout style props and actions.

### `RadioLabel`

Contains all Label related layout style props and actions. It inherits all the properties of React Native's [Text component](https://reactnative.dev/docs/text).

### `RadioGroup`

Contains all Group related layout style props and actions. It inherits all the properties of React Native's [View component](https://reactnative.dev/docs/view).

| Property             | Type                                | Default     | Description                                                         |
| -------------------- | ----------------------------------- | ----------- | ------------------------------------------------------------------- |
| `value`              | string                              | -           | The value of the radio group.                                       |
| `onChange`           | function                            | -           | The callback fired when any children Radio is checked or unchecked. |
| `disabled`           | bool                                | -           | To manually set disable to the radio group.                         |
| `validationStatus`   | `'valid' \| 'invalid' \| 'initial'` | -           | The validation status of the radio group.                           |
| `label`              | `string`                            | -           | The label to be displayed above the radio group.                    |
| `labelVariant`       | `'heading' \| 'body'`               | `'body'`    | The variant of the label text.                                      |
| `helperText`         | `string`                            | -           | The helper text to be displayed below the radio group.              |
| `helperIcon`         | `React.ComponentType`               | -           | The icon to be displayed next to the helper text.                   |
| `invalidText`        | `string`                            | -           | The invalid text to be displayed below the radio group.             |
| `validText`          | `string`                            | -           | The valid text to be displayed below the radio group.               |
| `showValidationIcon` | `boolean`                           | `true`      | Whether to show the validation icon.                                |
| `type`               | `'default' \| 'tile'`               | `'default'` | The type of the radio group.                                        |
| `direction`          | `'row' \| 'column'`                 | `'column'`  | The direction of the radio group.                                   |
| `gap`                | `string`                            | -           | The gap between the radio group items.                              |

### `RadioImage`

| Property  | Type                  | Description                                                              |
| --------- | --------------------- | ------------------------------------------------------------------------ |
| `source`  | `ImageSourcePropType` | The source of the image to display                                       |
| `light`   | `ImageSourcePropType` | The source of the image to display in light mode (use instead of source) |
| `dark`    | `ImageSourcePropType` | The source of the image to display in dark mode (use instead of source)  |
| `...rest` | `ImageProps`          | Additional props to pass to the underlying Image component               |

For more details about the ThemedImage component used internally, refer to the `ThemedImage` documentation.

Contains all Image related layout style props and actions. It inherits all the properties of React Native's [Image component](https://reactnative.dev/docs/image).

## Variants

```tsx
<Flex spacing="lg">
  <VariantTitle title="Default">
    <RadioGroup aria-label="Radio Group" value={value} onChange={setValue} nativeID="Radio-group">
      <Radio
        value="Option 1"
        aria-label="Option 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="Radio-1"
        label="Option 1"
        {...args}
      />
      <Radio
        value="Option 2"
        aria-label="Option 2"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="Radio-2"
        label="Option 2"
        {...args}
      />
    </RadioGroup>
  </VariantTitle>
  <VariantTitle title="Disabled">
    <RadioGroup
      aria-label="Radio Group"
      value={value}
      onChange={setValue}
      nativeID="Radio-group"
      disabled
    >
      <Radio
        aria-label="Option 3"
        value="Option 1"
        onChange={(checked: boolean) => console.log(checked, '###')}
        nativeID="Radio-3"
        label="Option 1"
        {...args}
      />
      <Radio
        aria-label="Option 4"
        value="Option 2"
        onChange={(checked: boolean) => console.log(checked, '###')}
        nativeID="Radio-4"
        label="Option 2"
        {...args}
      />
    </RadioGroup>
  </VariantTitle>
</Flex>
```

## Advanced Usage

There may be cases where you need to customise the Radio component to fit your design requirements.
In this example, we will create a custom Radio component with a badge and bullet list.

```tsx
import {
  Radio,
  RadioGroup,
  RadioLabel,
  RadioIndicator,
  RadioIcon,
  RadioImage,
} from '@utilitywarehouse/hearth-react-native';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import visaLogo from '../../assets/bank-logo1.png';
import mastercardLogo from '../../assets/bank-logo.png';

const AdvancedExample = () => {
  const [value, setValue] = React.useState('option-1');
  return (
    <RadioGroup value={value} onChange={setValue} aria-label="Card type" type="tile">
      <Radio value="option-1" aria-label="Visa">
        <RadioIndicator>
          <RadioIcon />
        </RadioIndicator>
        <RadioImage source={visaLogo} style={{ width: 40, height: 24, resizeMode: 'contain' }} />
        <RadioLabel>Visa</RadioLabel>
      </Radio>
      <Radio value="option-2" aria-label="Mastercard">
        <RadioIndicator>
          <RadioIcon />
        </RadioIndicator>
        <RadioImage
          source={mastercardLogo}
          style={{ width: 40, height: 24, resizeMode: 'contain' }}
        />
        <RadioLabel>Mastercard</RadioLabel>
      </Radio>
    </RadioGroup>
  );
};
```

### Grid Layout With Tiles

Wrap tile radios in a `Grid` when you want a multi-column layout while keeping the `RadioGroup` label, helper text and validation messaging.

```tsx
import { Grid, Radio, RadioGroup } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState('yes');

  return (
    <RadioGroup label="Did this solve your problem?" type="tile" value={value} onChange={setValue}>
      <Grid columns={2} spacing="md">
        <Radio label="Yes" value="yes" />
        <Radio label="No" value="no" />
        <Radio label="Partly" value="partly" />
        <Radio label="Not yet" value="not-yet" />
      </Grid>
    </RadioGroup>
  );
};
```

### `RadioTile` component

The `RadioTile` component is a variant of the `Radio` component that displays the radio button as a card.
It is used to present options in a more visually appealing way.

```tsx
import { RadioTile, RadioGroup } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState('option-1');
  return (
    <RadioGroup value={value} onChange={setValue}>
      <RadioTile value="option-1" aria-label="Label 1" label="Option 1" />
      <RadioTile value="option-2" aria-label="Label 2" label="Option 2" />
    </RadioGroup>
  );
};
```

### `RadioImage` component

The `RadioImage` component is used to display an image next to the radio button.

```tsx
<RadioGroup>
  <Radio
    aria-label="Label 1"
    onChange={(checked: boolean) => {
      console.log(checked, '###');
    }}
    nativeID="Radio-1"
    {...args}
    label="Visa"
    value="Option 1"
    image={
      <RadioImage
        source={bankLogo1 as ImageSourcePropType}
        style={{ width: 48, height: 32 }}
        resizeMode="cover"
      />
    }
  />
  <Radio
    aria-label="Label 2"
    onChange={(checked: boolean) => {
      console.log(checked, '###');
    }}
    nativeID="Radio-2"
    {...args}
    label="Mastercard"
    value="Option 2"
    image={
      <RadioImage
        source={bankLogo as ImageSourcePropType}
        style={{ width: 48, height: 32 }}
        resizeMode="cover"
      />
    }
  />
</RadioGroup>
```

```tsx
import { Radio, RadioGroup, RadioImage } from '@utilitywarehouse/hearth-react-native';
import visaLogo from './visa-logo.png';
import mastercardLogo from './mastercard-logo.png';

const MyComponent = () => {
  const [value, setValue] = React.useState('Option 1');
  return (
    <RadioGroup value={value} onChange={setValue} aria-label="Radio Group" nativeID="Radio-group">
      <Radio
        value="visa"
        aria-label="Visa"
        label="Visa"
        image={
          <RadioImage source={visaLogo} style={{ width: 40, height: 24, resizeMode: 'contain' }} />
        }
      />
      <Radio
        value="mastercard"
        aria-label="Mastercard"
        label="Mastercard"
        image={
          <RadioImage
            source={mastercardLogo}
            style={{ width: 40, height: 24, resizeMode: 'contain' }}
          />
        }
      />
    </RadioGroup>
  );
};
```

### `RadioGroup` component

The `RadioGroup` component is used to group multiple `Radio` components together.
You can pass props like `label` and `helperText` to the `RadioGroup` component to provide context for the group of radios.

```tsx
import { Radio, RadioGroup } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState('option-1');
  return (
    <RadioGroup
      aria-label="Radio Group"
      value={value}
      onChange={setValue}
      label="Radio Group Label"
      helperText="This is the supporting text"
      invalidText="This is an invalid text"
      validText="This is a valid text"
    >
      <Radio value="option-1" aria-label="Label 1" label="Option 1" />
      <Radio value="option-2" aria-label="Label 2" label="Option 2" />
      <Radio value="option-3" aria-label="Label 3" label="Option 3" />
      <Radio value="option-4" aria-label="Label 4" label="Option 4" />
    </RadioGroup>
  );
};
```
