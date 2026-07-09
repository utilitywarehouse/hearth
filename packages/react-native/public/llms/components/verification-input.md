# Verification Input

The verification input component is used to capture OTP (One Time Password) or other verification codes.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Ref Methods](#ref-methods)
- [States](#states)

## Playground

```tsx
<VerificationInput
  {...args}
  value={value}
  onChangeText={text => {
    setValue(text);
    args.onChangeText?.(text);
  }}
/>
```

## Usage

```tsx
import { VerificationInput } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [code, setCode] = useState('');

  return <VerificationInput label="Enter Code" value={code} onChangeText={setCode} />;
};
```

## Props

| Prop               | Type                                | Default     | Description                                                  |
| :----------------- | :---------------------------------- | :---------- | :----------------------------------------------------------- |
| `value`            | `string`                            | -           | The value of the input.                                      |
| `onChangeText`     | `(text: string) => void`            | -           | Callback when the value changes.                             |
| `label`            | `string`                            | -           | The label for the input.                                     |
| `labelVariant`     | `'heading' \| 'body'`               | `'body'`    | The variant of the label text.                               |
| `helperText`       | `string`                            | -           | Helper text to display below the input.                      |
| `helperIcon`       | `ComponentType`                     | -           | Icon to display alongside the helper text.                   |
| `validationStatus` | `'initial' \| 'valid' \| 'invalid'` | `'initial'` | The validation status of the input.                          |
| `validText`        | `string`                            | -           | Text to display when validation status is 'valid'.           |
| `invalidText`      | `string`                            | -           | Text to display when validation status is 'invalid'.         |
| `disabled`         | `boolean`                           | `false`     | Whether the input is disabled.                               |
| `readonly`         | `boolean`                           | `false`     | Whether the input is read-only.                              |
| `secureTextEntry`  | `boolean`                           | `false`     | Whether to obscure the text entry (e.g. for passwords/OTPs). |
| `autoFocus`        | `boolean`                           | `false`     | Whether the input should auto-focus when mounted.            |

## Ref Methods

```tsx
<Flex direction="column" space="lg" style={{ width: 400 }}>
  <VariantTitle title="Ref Methods">
    <VerificationInput
      ref={inputRef}
      label="Verification Code"
      value={value}
      onChangeText={setValue}
    />
  </VariantTitle>
  <VariantTitle title="Actions">
    <Flex direction="column" space="sm">
      <Flex direction="row" space="sm">
        <Button onPress={handleFocus}>Focus</Button>
        <Button onPress={handleFocusIndex}>Focus Slot 4</Button>
        <Button onPress={handleBlur}>Blur</Button>
        <Button onPress={handleClear}>Clear</Button>
      </Flex>
      <BodyText>{status}</BodyText>
    </Flex>
  </VariantTitle>
</Flex>
```

```tsx
import { useRef } from 'react';
import {
  VerificationInput,
  type VerificationInputHandle,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const inputRef = useRef<VerificationInputHandle>(null);

  return (
    <VerificationInput ref={inputRef} label="Enter Code" onChangeText={code => console.log(code)} />
  );
};
```

Available methods:

- `focus()`
- `blur()`
- `clear()`
- `focusIndex(index: number)`

## States

```tsx
<Flex direction="column" spacing="lg" style={{ width: 400 }}>
  <VariantTitle title="Default">
    <VerificationInput
      label="Verification Code"
      helperText="Enter the code sent to your phone"
      value={values.default}
      onChangeText={updateValue('default')}
    />
  </VariantTitle>

  <VariantTitle title="Filled">
    <VerificationInput
      label="Filled Input"
      value={values.filled}
      onChangeText={updateValue('filled')}
    />
  </VariantTitle>

  <VariantTitle title="Invalid">
    <VerificationInput
      label="Invalid Input"
      validationStatus="invalid"
      invalidText="The code you entered is incorrect"
      value={values.invalid}
      onChangeText={updateValue('invalid')}
    />
  </VariantTitle>

  <VariantTitle title="Valid">
    <VerificationInput
      label="Valid Input"
      validationStatus="valid"
      validText="Code verified!"
      value={values.valid}
      onChangeText={updateValue('valid')}
    />
  </VariantTitle>

  <VariantTitle title="Disabled">
    <VerificationInput
      label="Disabled Input"
      disabled
      value={values.disabled}
      onChangeText={updateValue('disabled')}
    />
  </VariantTitle>

  <VariantTitle title="Secure Text Entry">
    <VerificationInput
      label="Secure Input"
      secureTextEntry
      value={values.secure}
      onChangeText={updateValue('secure')}
    />
  </VariantTitle>

  <VariantTitle title="With Helper Icon">
    <VerificationInput
      label="Helper Icon"
      helperText="Some information"
      helperIcon={InfoMediumIcon}
      value={values.default}
      onChangeText={updateValue('default')}
    />
  </VariantTitle>
</Flex>
```
