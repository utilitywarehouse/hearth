# Checkbox

Whether you're building a simple form or a complex data collection system, the Checkbox component offers a user-friendly way for users to select multiple options from a list.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Components](#components)
  - [`Checkbox`](#checkbox)
  - [`CheckboxTile`](#checkboxtile)
  - [`CheckboxIndicator`](#checkboxindicator)
  - [`CheckboxIcon`](#checkboxicon)
  - [`CheckboxLabel`](#checkboxlabel)
  - [`CheckboxGroup`](#checkboxgroup)
  - [`CheckboxImage`](#checkboximage)
- [Variants](#variants)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
  - [Grid Layout With Tiles](#grid-layout-with-tiles)
  - [`CheckboxTile` component](#checkboxtile-component)
  - [`CheckboxImage` component](#checkboximage-component)
  - [`CheckboxGroup` component](#checkboxgroup-component)

## Playground

```tsx
<Checkbox
  onChange={val => {
    console.log('-----');
    setChecked(val);
  }}
  {...args}
  checked={checked}
/>
```

## Usage

```tsx
import { Checkbox } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [accepted, setAccepted] = React.useState(false);
  return (
    <Checkbox
      value="accepted"
      onChange={(checked: boolean) => setAccepted(checked)}
      label="I accept the terms and conditions"
    />
  );
};
```

## Props

| Property             | Type                                | Default     | Description                                                                                                          |
| -------------------- | ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `value`              | `string`                            | -           | The value to be used in the checkbox input. This is the value that will be returned on form submission.              |
| `onChange`           | `(value: boolean) => void`          | -           | Function called when the state of the checkbox changes.                                                              |
| `defaultchecked`     | `bool`                              | `false`     | If true, the checkbox will be initially checked.                                                                     |
| `checked`            | `bool`                              | `false`     | When true, the checkbox will be checked. You'll need to pass onChange update it's value (since it's now controlled). |
| `validationStatus`   | `'valid' \| 'invalid' \| 'initial'` | -           | The validation status of the checkbox.                                                                               |
| `disabled`           | `bool`                              | `false`     | To manually set disable to the checkbox.                                                                             |
| `label`              | `string`                            | -           | The label to be displayed next to the checkbox.                                                                      |
| `helperText`         | `string`                            | -           | The helper text to be displayed below the checkbox.                                                                  |
| `helperIcon`         | `React.ComponentType`               | -           | The icon to be displayed next to the helper text.                                                                    |
| `badge`              | `ReactNode`                         | -           | The badge to be displayed below the helper text.                                                                     |
| `invalidText`        | `string`                            | -           | The invalid text to be displayed below the checkbox.                                                                 |
| `validText`          | `string`                            | -           | The valid text to be displayed below the checkbox.                                                                   |
| `showValidationIcon` | `boolean`                           | `true`      | Whether to show the validation icon.                                                                                 |
| `type`               | `'default' \| 'tile'`               | `'default'` | The type of the checkbox.                                                                                            |
| `image`              | `ReactNode`                         | -           | The image to be displayed next to the label.                                                                         |

### `Checkbox`

The `Checkbox` component is the wrapper for the checkbox input. It is used to handle the state of the checkbox input.

### `CheckboxTile`

The `CheckboxTile` component is used to create a card-style checkbox input. It inherits all the properties of React Native's `View` component and the `Checkbox` props above.

### `CheckboxIndicator`

The `CheckboxIndicator` component is used to create the visual representation of the checkbox input. It inherits all the properties of React Native's `View` component.

- Use checkboxes (instead of Toggle Switch or Radio) if multiple options can be selected from a list
- On table rows
- On multiple selection components, such as a Multi Select Component.

### `CheckboxIcon`

The `CheckboxIcon` component is used to create the icon for the checkbox input. It inherits all the properties of React Native SVG's `SVG` component.

### `CheckboxLabel`

The `CheckboxLabel` component is used to create the label for the checkbox input. It inherits all the properties of React Native's `Text` component.

### `CheckboxGroup`

The `CheckboxGroup` component is used to group multiple checkbox inputs together. It inherits all the properties of React Native's `View` component.

| Property             | Type                                | Default     | Description                                                            |
| -------------------- | ----------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `value`              | string                              | -           | The value of the checkbox group.                                       |
| `onChange`           | function                            | -           | The callback fired when any children Checkbox is checked or unchecked. |
| `disabled`           | bool                                | -           | To manually set disable to the checkbox group.                         |
| `validationStatus`   | `'valid' \| 'invalid' \| 'initial'` | -           | The validation status of the checkbox group.                           |
| `label`              | `string`                            | -           | The label to be displayed above the checkbox group.                    |
| `labelVariant`       | `'heading' \| 'body'`               | `'body'`    | The variant of the label text.                                         |
| `helperText`         | `string`                            | -           | The helper text to be displayed below the checkbox group.              |
| `helperIcon`         | `React.ComponentType`               | -           | The icon to be displayed next to the helper text.                      |
| `invalidText`        | `string`                            | -           | The invalid text to be displayed below the checkbox group.             |
| `validText`          | `string`                            | -           | The valid text to be displayed below the checkbox group.               |
| `showValidationIcon` | `boolean`                           | `true`      | Whether to show the validation icon.                                   |
| `type`               | `'default' \| 'tile'`               | `'default'` | The type of the checkbox group.                                        |
| `direction`          | `'row' \| 'column'`                 | `'column'`  | The direction of the checkbox group.                                   |
| `gap`                | `string`                            | -           | The gap between the checkbox group items.                              |

```jsx
import { Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxLabel, } from '@utilitywarehouse/hearth-react-native';

import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const [values, setValues] = React.useState(['option1']);
  return (
    <CheckboxGroup
      aria-label="Checkbox Group"
      value={values}
      onChange={setValues}
      nativeID="checkbox-group"
    >
      <Checkbox
        value="option1"
        aria-label="Label 1"
        onChange={(checked: boolean) => console.log(checked, '###')}
        label="Label 1"
      />
      <Checkbox
        value="option2"
        aria-label="Label 2"
        onChange={(checked: boolean) => console.log(checked, '###')}
        label="Label 2"
      />
    </CheckboxGroup>
  );
};
```

| Property           | Type                                | Default | Description                                                            |
| ------------------ | ----------------------------------- | ------- | ---------------------------------------------------------------------- |
| `value`            | `string[]`                          | -       | The value of the checkbox group.                                       |
| `onChange`         | `(values: Array<string>) => void`   | -       | The callback fired when any children Checkbox is checked or unchecked. |
| `disabled`         | `bool`                              | `false` | To manually set disable to the checkbox.                               |
| `validationStatus` | `'valid' \| 'invalid' \| 'initial'` | -       | The validation status of the checkbox group.                           |

### `CheckboxImage`

| Property  | Type                  | Description                                                              |
| --------- | --------------------- | ------------------------------------------------------------------------ |
| `source`  | `ImageSourcePropType` | The source of the image to display                                       |
| `light`   | `ImageSourcePropType` | The source of the image to display in light mode (use instead of source) |
| `dark`    | `ImageSourcePropType` | The source of the image to display in dark mode (use instead of source)  |
| `...rest` | `ImageProps`          | Additional props to pass to the underlying Image component               |

For more details about the ThemedImage component used internally, refer to the `ThemedImage` documentation.

The `CheckboxImage` component is used to display an image next to the checkbox label. It inherits all the properties of React Native's `Image` component.

## Variants

```tsx
<CheckboxGroup
  aria-label="Checkbox Group"
  value={values}
  onChange={setValues}
  nativeID="checkbox-group"
  style={{ gap: 16 }}
>
  <VariantTitle title="Checkbox">
    <Checkbox
      value="Label 1"
      aria-label="Label 1"
      onChange={(checked: boolean) => {
        console.log(checked, '###');
      }}
      nativeID="checkbox-1"
    />
  </VariantTitle>
  <VariantTitle title="Checkbox with label">
    <Checkbox
      value="Label 2"
      aria-label="Label 2"
      onChange={(checked: boolean) => {
        console.log(checked, '###');
      }}
      nativeID="checkbox-2"
      label="Label 1"
    />
  </VariantTitle>
  <VariantTitle title="Checkbox disabled">
    <Checkbox
      aria-label="Label 3"
      value="Label 3"
      disabled
      checked
      onChange={(checked: boolean) => console.log(checked, '###')}
      nativeID="checkbox-3"
    />
  </VariantTitle>
  <VariantTitle title="Checkbox disabled with label">
    <Checkbox
      aria-label="Label 4"
      value="Label 4"
      disabled
      onChange={(checked: boolean) => console.log(checked, '###')}
      nativeID="checkbox-4"
      label="Label 2"
    />
  </VariantTitle>
</CheckboxGroup>
```

## Advanced Usage

You can create a custom checkbox by using the `CheckboxIndicator`, `CheckboxIcon` and `CheckboxLabel` components.

```tsx
import {
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  FormField,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [values, setValues] = React.useState([]);
  return (
    <CheckboxGroup
      aria-label="Checkbox Group"
      label="Which fruit do you enjoy?"
      value={values}
      onChange={setValues}
      nativeID="checkbox-group"
    >
      <Checkbox value="Apple" aria-label="Apple">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
        <CheckboxLabel>Apple</CheckboxLabel>
      </Checkbox>
      <Checkbox value="Banana" aria-label="Banana">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
        <CheckboxLabel>Banana</CheckboxLabel>
      </Checkbox>
      <Checkbox value="Orange" aria-label="Orange">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
        <CheckboxLabel>Orange</CheckboxLabel>
      </Checkbox>
      <Checkbox value="Grapes" aria-label="Grapes">
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
        <CheckboxLabel>Grapes</CheckboxLabel>
      </Checkbox>
    </CheckboxGroup>
  );
};
```

### Grid Layout With Tiles

Wrap tile checkboxes in a `Grid` when you want a multi-column layout inside a `CheckboxGroup`.

```tsx
import { Checkbox, CheckboxGroup, Grid } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState(['fast-response']);

  return (
    <CheckboxGroup label="Which options helped?" type="tile" value={value} onChange={setValue}>
      <Grid columns={2} spacing="md">
        <Checkbox label="Fast response" value="fast-response" />
        <Checkbox label="Clear steps" value="clear-steps" />
        <Checkbox label="Useful example" value="useful-example" />
        <Checkbox label="Still investigating" value="still-investigating" />
      </Grid>
    </CheckboxGroup>
  );
};
```

### `CheckboxTile` component

The `CheckboxTile` component is a variant of the `Checkbox` component that displays the radio button as a card.
It is used to present options in a more visually appealing way.

```tsx
import { CheckboxTile, CheckboxGroup } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState(['option-1']);
  return (
    <CheckboxGroup value={value} onChange={setValue}>
      <CheckboxTile value="option-1" aria-label="Label 1" label="Option 1" />
      <CheckboxTile value="option-2" aria-label="Label 2" label="Option 2" />
    </CheckboxGroup>
  );
};
```

### `CheckboxImage` component

The `CheckboxImage` component is used to display an image next to the checkbox label. It inherits all the properties of React Native's `Image` component.

```tsx
<CheckboxGroup aria-label="Checkbox Group" nativeID="checkbox-group">
  <Checkbox
    aria-label="Visa"
    onChange={(checked: boolean) => {
      console.log(checked, '###');
    }}
    nativeID="checkbox-1"
    {...args}
    value="visa"
    label="Visa"
    image={
      <CheckboxImage source={bankLogo1 as ImageSourcePropType} style={{ width: 40, height: 24 }} />
    }
  />
  <Checkbox
    aria-label="Mastercard"
    onChange={(checked: boolean) => {
      console.log(checked, '###');
    }}
    nativeID="checkbox-2"
    {...args}
    value="mastercard"
    label="Mastercard"
    image={
      <CheckboxImage
        source={bankLogo as ImageSourcePropType}
        style={{ width: 40, height: 24, resizeMode: 'contain' }}
      />
    }
  />
</CheckboxGroup>
```

```tsx
import { Checkbox, CheckboxImage } from '@utilitywarehouse/hearth-react-native';
import visaLogo from '../../../assets/visa.png';
import mastercardLogo from '../../../assets/mastercard.png';

const MyComponent = () => {
  return (
    <CheckboxGroup>
      <Checkbox
        value="visa"
        aria-label="Visa"
        label="Visa"
        image={
          <CheckboxImage
            source={visaLogo}
            style={{ width: 40, height: 24, resizeMode: 'contain' }}
          />
        }
      />
      <Checkbox
        value="mastercard"
        aria-label="Mastercard"
        label="Mastercard"
        image={
          <CheckboxImage
            source={mastercardLogo}
            style={{ width: 40, height: 24, resizeMode: 'contain' }}
          />
        }
      />
    </CheckboxGroup>
  );
};
```

### `CheckboxGroup` component

The `CheckboxGroup` component is used to group multiple `Checkbox` components together.
You can pass props like `label` and `helperText` to the `CheckboxGroup` component to provide context for the group of radios.

```tsx
import { Checkbox, CheckboxGroup } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState(['option-1']);
  return (
    <CheckboxGroup
      aria-label="Checkbox Group"
      value={value}
      onChange={setValue}
      label="Checkbox Group Label"
      helperText="This is the supporting text"
      invalidText="This is an invalid text"
      validText="This is a valid text"
    >
      <Checkbox value="option-1" aria-label="Label 1" label="Option 1" />
      <Checkbox value="option-2" aria-label="Label 2" label="Option 2" />
      <Checkbox value="option-3" aria-label="Label 3" label="Option 3" />
      <Checkbox value="option-4" aria-label="Label 4" label="Option 4" />
    </CheckboxGroup>
  );
};
```
