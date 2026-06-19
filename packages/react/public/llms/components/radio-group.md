# RadioGroup

`RadioGroup` provides an accessible way to group and control a set of `Radio`, `RadioTile` or `RadioCard` components, allowing the user to select one option from a set. The `RadioGroup` is responsible for handling the value, helper text, validation status and text, as well as determining the presentation and selection of the items in the list. Follows the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for radio groups not contained in a toolbar.

```tsx
<Flex direction="column" gap="400">
  <Flex direction="row" gap="200">
    <RadioGroup {...args}>
      <RadioTile value="england" label="England" />
      <RadioTile value="wales" label="Wales" />
      <RadioTile value="scotland" label="Scotland" />
      <RadioTile value="northern-ireland" label="Northern Ireland" />
    </RadioGroup>
    <RadioGroup {...args}>
      <Radio value="england" label="England" />
      <Radio value="wales" label="Wales" />
      <Radio value="scotland" label="Scotland" />
      <Radio value="northern-ireland" label="Northern Ireland" />
    </RadioGroup>
  </Flex>
  <RadioGroup
    {...args}
    label="Do you like living here?"
    name="do-you-like-living-here"
    direction="row"
  >
    <RadioTile value="y" label="Yes" image={<ThumbsUpSmallIcon />} />
    <RadioTile value="n" label="No" image={<ThumbsDownSmallIcon />} />
  </RadioGroup>
</Flex>
```

- [Alternatives](#alternatives)
- [Usage](#usage)
- [Accessibility](#accessibility)
- [Keyboard interactions](#keyboard-interactions)
- [Custom label](#custom-label)
- [Helper text](#helper-text)
- [Validation](#validation)
- [Content width](#content-width)
- [Grid layout](#grid-layout)
- [RadioTile layout](#radiotile-layout)
- [Controlled](#controlled)
- [Radio & RadioTile Image](#radio--radiotile-image)
- [RadioCard](#radiocard)
- [API](#api)

## Alternatives

- `CheckboxGroup`: For multi-select.

## Usage

`RadioGroup` is intended for use with the `RadioTile`, `RadioCard` and `Radio` components.

- `RadioTile` is the most common radio button used within the `RadioGroup`, and offers a simple way to present grouped options.
- `RadioCard` is for instances when you have options that are either the main focus of your UI or would benefit from additional explanation.
- `Radio` will not often be used, as `RadioTile` is preferred.

## Accessibility

The necessary aria props, such as `aria-labelledby`, `aria-describedby` and
`aria-errormessage` are handled internally, however when it is necessary for
the `RadioGroup` to be labelled by another element or even not to have a visual
label, either `aria-label` or `aria-labelledby` can be provided.

The `Radio` and `RadioTile` are, by default, appropriately labelled when using
the `label` props, if you do not provide a label, you must specify an
`aria-label` or `aria-labelledby` for accessibility.

## Keyboard interactions

<Flex direction="column" gap="200" className="sb-unstyled">
  <Flex>
    <Box width="300px">
      <BodyText as="span" weight="bold">
        Key
      </BodyText>
    </Box>
    <BodyText as="span" weight="bold">
      Description
    </BodyText>
  </Flex>
  <Divider />
  {[
    {
      key: 'Tab',
      description:
        'Moves focus to either the checked radio item or the first radio item in the group.',
    },
    {
      key: 'Shift+Tab',
      description:
        'Moves focus to either the checked radio item or the last radio item in the group.',
    },
    {
      key: 'Space',
      description: 'When focus is on an unchecked radio item, checks it.',
    },
    {
      key: 'Arrow Down / Arrow Right',
      description: 'Moves focus and checks the next radio item in the group.',
    },
    {
      key: 'Arrow Up / Arrow Left',
      description: 'Moves focus and checks the previous radio item in the group.',
    },
  ].map((kbi, i) => (
    <>
      <Flex>
        <Box width="300px">
          <kbd>{kbi.key}</kbd>
        </Box>
        <BodyText as="span">{kbi.description}</BodyText>
      </Flex>
      {i < 4 ? <Divider /> : null}
    </>
  ))}
</Flex>

## Custom label

You can set a custom label either by passing in a component to the label prop,
or by properly labelling the `RadioGroup` with the relevant text element.

```tsx
<Flex gap="600" direction="column">
  <RadioGroup
    {...args}
    label={<Heading as="h2">Where do you live?</Heading>}
    name="where-do-you-live"
  >
    <RadioTile value="england" label="England" />
    <RadioTile value="wales" label="Wales" />
    <RadioTile value="scotland" label="Scotland" />
    <RadioTile value="northern-ireland" label="Northern Ireland" />
  </RadioGroup>

  <Flex direction="column" gap="100">
    <Heading as="h2" id="where-do-you-live">
      Where do you live?
    </Heading>
    <RadioGroup {...args} aria-labelledby="where-do-you-live">
      <RadioTile value="england" label="England" />
      <RadioTile value="wales" label="Wales" />
      <RadioTile value="scotland" label="Scotland" />
      <RadioTile value="northern-ireland" label="Northern Ireland" />
    </RadioGroup>
  </Flex>
</Flex>
```

## Helper text

`RadioGroup` can display a secondary message as a helper text. If displayed then
child radio items will not be display their own helper text.

## Validation

In general, radio buttons should have a value selected by default. If this is
not the case, you can display an error if no value is selected when the form is
submitted.

```tsx
<RadioGroup
  {...args}
  value={selected}
  onValueChange={setSelected}
  validationStatus={selected ? undefined : 'invalid'}
>
  <RadioTile value="1" label="Bear" />
  <RadioTile value="2" label="Koala" />
  <RadioTile value="3" label="Wolf" />
  <RadioTile value="4" label="Horse" />
</RadioGroup>
```

By default, the validation text is placed above the radio items. Use `validationPlacement="bottom"` to display it below instead.

```tsx
<Flex direction="column" gap="400">
  <RadioGroup
    label="Validation top (default)"
    validationStatus="invalid"
    validationText="Please select an option"
    validationPlacement="top"
    name="validation-placement-top"
    contentWidth="fit-content"
  >
    <RadioTile value="1" label="Bear" />
    <RadioTile value="2" label="Koala" />
    <RadioTile value="3" label="Wolf" />
  </RadioGroup>
  <RadioGroup
    label="Validation bottom"
    validationStatus="invalid"
    validationText="Please select an option"
    validationPlacement="bottom"
    name="validation-placement-bottom"
    contentWidth="fit-content"
  >
    <RadioTile value="1" label="Bear" />
    <RadioTile value="2" label="Koala" />
    <RadioTile value="3" label="Wolf" />
  </RadioGroup>
</Flex>
```

## Content width

The width of the `RadioGroup` should be set by the parent layout, however it is
possible to independently set the width of the children using `contentWidth`
prop.

By default it will set the width of the children to fit their content, however
you can set it to a specific width, or to `100%` to take up the full width of
the `RadioGroup`.

This is a responsive property, so you are able to set different widths for
different breakpoints.

## Grid layout

You can compose the `RadioGroup` with the `Grid` component if you need to
present a specific grid layout.

```tsx
<RadioGroup {...args}>
  <Grid columns="3" gap="150">
    <RadioTile value="1" label="One" />
    <RadioTile value="2" label="Two" />
    <RadioTile value="3" label="Three" />
    <RadioTile value="4" label="Four" />
    <RadioTile value="5" label="Five" />
    <RadioTile value="6" label="Six" />
  </Grid>
</RadioGroup>
```

## RadioTile layout

`RadioTile` components will, by default, fit their content. However they have
access to all flex item props, so you can set them to grow and fill the
available space, or to have a specific width.

```tsx
<RadioGroup direction="row" label="Numbers">
  <RadioTile value="1" label="One" flex="1" />
  <RadioTile value="2" label="Two" flex="1" />
</RadioGroup>
```

## Controlled

A controlled value can be provided using the value prop, which accepts a value
corresponding with the value prop of each `Radio`. The onChange event is fired
when the user selects a `Radio`.

```
const options = ['Bear', 'Koala', 'Wolf', 'Horse'];
const [selected, setSelected] = useState(options[0]);

[...]

<RadioGroup
  {...args}
  value={selected}
  onValueChange={setSelected}
  helperText={`Your favourite animal is a ${selected}`}
>
  {options.map(animal => (
    <RadioTile key={animal} value={animal} label={animal} />
  ))}
</RadioGroup>
```

```tsx
<RadioGroup
  {...args}
  value={selected}
  onValueChange={setSelected}
  helperText={`Your favourite animal is a ${selected}`}
>
  {options.map(animal => (
    <RadioTile key={animal} value={animal} label={animal} />
  ))}
</RadioGroup>
```

## Radio & RadioTile Image

The `Radio` & `RadioTile` components can display an icon or image between the indicator and label.

```tsx
<Radio value="2" label="Two" helperText="The number two" image={<CashbackCardMediumIcon />} />
```

```tsx
<RadioGroup label="How would you like to pay?">
  <RadioTile
    value="mastercard"
    label="Mastercard"
    helperText=""
    image={<img src={mastercard} width={40} height={24} alt="" />}
  />
  <RadioTile
    value="visa"
    label="Visa"
    helperText=""
    image={<img src={visa} width={40} height={24} alt="" />}
  />
  <RadioTile value="cash" label="Cash" image={<MoneyMediumIcon />} />
</RadioGroup>
```

**If you are using an `img` element, remember to include a null alt tag
(`alt=""` ) so the image is ignored by assistive technologies.**

```tsx
<RadioTile
  value="2"
  label="Two"
  helperText="The number two"
  image={<img src="https://help.uw.co.uk/images/iPhone.svg" width={25} alt="" />}
/>
```

## RadioCard

You can use the `RadioCard` component to present additional content in a more
card-like visual style. Unlike `RadioTile`, this component will accept
children.

```tsx
<RadioCard value="1" label="Debit card payment">
  <Flex asChild gap="100" direction="column">
    <ul role="list">
      <li>• Unlimited free top-ups</li>
      <li>• Instant withdrawals</li>
      <li>• Extra layer of security</li>
    </ul>
  </Flex>
</RadioCard>
```

```tsx
<Flex>
  <RadioGroup
    defaultValue="1"
    direction="column"
    contentWidth="350px"
    label={<Heading>Payment options</Heading>}
  >
    <Flex direction="column">
      <Flex right="24px" position="relative" justifyContent="end">
        <Badge flatBase colorScheme="positive" variant="emphasis" size="sm">
          Recommended
        </Badge>
      </Flex>

      <RadioCard value="1" label="Debit card payment" image={<CashbackCardMediumIcon />}>
        <Flex asChild gap="100" direction="column">
          <ul role="list">
            <Box asChild marginLeft="100">
              <li>• Unlimited free top-ups</li>
            </Box>
            <Box asChild marginLeft="100">
              <li>• Instant withdrawals</li>
            </Box>
            <Box asChild marginLeft="100">
              <li>• Extra layer of security</li>
            </Box>
          </ul>
        </Flex>
      </RadioCard>
    </Flex>

    <RadioCard value="2" label="Instant bank transfer" image={<BankMediumIcon />}>
      <Flex asChild gap="100" direction="column">
        <ul role="list">
          <Box asChild marginLeft="100">
            <li>• 5 free top-ups per month</li>
          </Box>
          <Box asChild marginLeft="100">
            <li>• £0.35 per additional top-up</li>
          </Box>
        </ul>
      </Flex>
    </RadioCard>
  </RadioGroup>
</Flex>
```

## API

This component is based on the `fieldset` element and supports the following common props:

- Margin

| Prop                  | Type                                                                 | Default  | Description                                                                                                                                                                                                                                                           |
| --------------------- | -------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`               | `ReactNode`                                                          | —        | The label for the formfield group. This should contain the question being answered by the formfield group. If you don't include a label you need to ensure you use the `aria-label` or `aria-labelledby` prop to properly associate a label with the formfield group. |
| `defaultValue`        | `string`                                                             | —        |                                                                                                                                                                                                                                                                       |
| `asChild`             | `boolean`                                                            | —        |                                                                                                                                                                                                                                                                       |
| `name`                | `string`                                                             | —        |                                                                                                                                                                                                                                                                       |
| `required`            | `boolean`                                                            | —        |                                                                                                                                                                                                                                                                       |
| `disabled`            | `boolean`                                                            | —        |                                                                                                                                                                                                                                                                       |
| `loop`                | `boolean`                                                            | —        |                                                                                                                                                                                                                                                                       |
| `value`               | `string \| null`                                                     | —        |                                                                                                                                                                                                                                                                       |
| `onValueChange`       | `((value: string) => void)`                                          | —        |                                                                                                                                                                                                                                                                       |
| `labelVariant`        | `"body" \| "heading"`                                                | —        | Set the label variant                                                                                                                                                                                                                                                 |
| `helperText`          | `ReactNode`                                                          | —        | Helper text for the formfield group. Provides a hint such as specific requirements for what to choose. When displayed, child components should not display their own `helperText`.                                                                                    |
| `validationText`      | `ReactNode`                                                          | —        |                                                                                                                                                                                                                                                                       |
| `validationStatus`    | `"valid" \| "invalid"`                                               | —        |                                                                                                                                                                                                                                                                       |
| `validationPlacement` | `"top" \| "bottom"`                                                  | —        |                                                                                                                                                                                                                                                                       |
| `direction`           | `Responsive<"row" \| "column" \| "row-reverse" \| "column-reverse">` | `column` |                                                                                                                                                                                                                                                                       |
| `contentWidth`        | `Responsive<string>`                                                 | —        | Set the container width of the RadioGroup children, independent to the width of the parent RadioGroup.                                                                                                                                                                |

### Radio API

This component is based on the `button` element and supports the following common props:

- Margin

| Prop              | Type                      | Default | Description                                                                                                                               |
| ----------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `label`           | `ReactNode`               | —       | The label for the Radio. If not using please properly associate the Radio with a label using the `aria-label` or `aria-labelledby` props. |
| `image`           | `ReactNode`               | —       | Optional image to show between the radio indicator and label.                                                                             |
| `value`           | `string`                  | —       |                                                                                                                                           |
| `asChild`         | `boolean`                 | —       |                                                                                                                                           |
| `checked`         | `boolean`                 | —       |                                                                                                                                           |
| `required`        | `boolean`                 | —       |                                                                                                                                           |
| `labelFontWeight` | `"regular" \| "semibold"` | —       |                                                                                                                                           |
| `helperText`      | `ReactNode`               | —       | Helper text for the Radio. Will not display if the radio group has `helperText` set.                                                      |

### RadioTile API

This component is based on the `button` element and supports the following common props:

- Margin
- Flex item

| Prop              | Type                      | Default | Description                                                                          |
| ----------------- | ------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `label`           | `ReactNode`               | —       |                                                                                      |
| `image`           | `ReactNode`               | —       | Optional image to show between the radio indicator and label.                        |
| `value`           | `string`                  | —       |                                                                                      |
| `asChild`         | `boolean`                 | —       |                                                                                      |
| `checked`         | `boolean`                 | —       |                                                                                      |
| `required`        | `boolean`                 | —       |                                                                                      |
| `labelFontWeight` | `"regular" \| "semibold"` | —       |                                                                                      |
| `helperText`      | `ReactNode`               | —       | Helper text for the Radio. Will not display if the radio group has `helperText` set. |
| `badge`           | `ReactNode`               | —       |                                                                                      |

### RadioCard API

This component is based on the `button` element and supports the following common props:

- Margin

| Prop              | Type                      | Default | Description                                                                                                                               |
| ----------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `label`           | `ReactNode`               | —       | The label for the Radio. If not using please properly associate the Radio with a label using the `aria-label` or `aria-labelledby` props. |
| `image`           | `ReactNode`               | —       | Optional image to show between the radio indicator and label.                                                                             |
| `value`           | `string`                  | —       |                                                                                                                                           |
| `asChild`         | `boolean`                 | —       |                                                                                                                                           |
| `checked`         | `boolean`                 | —       |                                                                                                                                           |
| `required`        | `boolean`                 | —       |                                                                                                                                           |
| `labelFontWeight` | `"regular" \| "semibold"` | —       |                                                                                                                                           |
