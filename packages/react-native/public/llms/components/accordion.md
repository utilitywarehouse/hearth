# Accordion

The Accordion component is a vertically stacked set of interactive headers that each reveal a section of content.
It is commonly used to condense large amounts of information into a more manageable format.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
  - [With heading text and helper text](#with-heading-text-and-helper-text)
  - [With custom trigger content](#with-custom-trigger-content)

## Playground

```tsx
// Example usage
<Accordion {...args}>
  <AccordionItem title="How do I place an order?">
    <AccordionHeader>
      <AccordionTrigger>
        {({ isExpanded }: { isExpanded: boolean }) => {
          return (
            <>
              <AccordionTitleText>How do I place an order?</AccordionTitleText>
              {isExpanded ? (
                <AccordionIcon as={ChevronUpSmallIcon} />
              ) : (
                <AccordionIcon as={ChevronDownSmallIcon} />
              )}
            </>
          );
        }}
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <AccordionContentText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </AccordionContentText>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem>
    <AccordionHeader>
      <AccordionTrigger>
        {({ isExpanded }: { isExpanded: boolean }) => {
          return (
            <>
              <AccordionTitleText>What payment methods do you accept?</AccordionTitleText>
              {isExpanded ? (
                <AccordionIcon as={ChevronUpSmallIcon} />
              ) : (
                <AccordionIcon as={ChevronDownSmallIcon} />
              )}
            </>
          );
        }}
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <AccordionContentText>
        We accept all major credit cards, PayPal, and bank transfers.
      </AccordionContentText>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem title="What is your return policy?">
    <BodyText>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, voluptatibus.
    </BodyText>
  </AccordionItem>
</Accordion>
```

# Usage

```tsx
// Example usage
import { BodyText, Accordion, AccordionItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <Accordion>
      <AccordionItem title="Item 1">
        <BodyText>Content for Item 1</BodyText>
      </AccordionItem>
      <AccordionItem title="Item 2">
        <BodyText>Content for Item 2</BodyText>
      </AccordionItem>
      <AccordionItem title="Item 3">
        <BodyText>Content for Item 3</BodyText>
      </AccordionItem>
    </Accordion>
  );
};
```

## Props

| Property           | Type                        | Description                                                                                                                                                | Default    |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `defaultValue`     | `Array<string>`             | The default value of the accordion.                                                                                                                        | `-`        |
| `value`            | `Array<string>`             | The controlled value of the accordion.                                                                                                                     | `-`        |
| `onValueChange`    | `(value: string[]) => void` | Callback function that is called when the value of the accordion changes.                                                                                  | `-`        |
| `type`             | `'single' \| 'multiple'`    | The type of accordion. If set to 'single', only one item can be expanded at a time. If set to 'multiple', multiple items can be expanded at the same time. | `'single'` |
| `collapsible`      | `boolean`                   | If true, the accordion can be collapsed.                                                                                                                   | `false`    |
| `disabled`         | `boolean`                   | If true, the accordion is disabled.                                                                                                                        | `false`    |
| `noPadding`        | `boolean`                   | If true, no horizontal padding is applied to the accordion items.                                                                                          | `false`    |
| `contentNoPadding` | `boolean`                   | If true, no horizontal padding is applied to the accordion content.                                                                                        | `false`    |
| `heading`          | `string`                    | The text to display in the heading of the list.                                                                                                            | `-`        |
| `helperText`       | `string`                    | The helper text to display in the heading of the list.                                                                                                     | `-`        |

### `AccordionItem`

| Property     | Type         | Description                                                          | Default |
| ------------ | ------------ | -------------------------------------------------------------------- | ------- |
| `title`      | `string`     | The title of the accordion item.                                     | `-`     |
| `value`      | `string`     | The value of the accordion item.                                     | `-`     |
| `disabled`   | `boolean`    | If true, the accordion item is disabled.                             | `-`     |
| `expanded`   | `boolean`    | If true, the accordion item is expanded.                             | `-`     |
| `toggleItem` | `() => void` | Callback function that is called when the accordion item is toggled. | `-`     |
| `noPadding`  | `boolean`    | If true, no horizontal padding is applied to the accordion items.    | `-`     |

## Advanced Usage

The Accordion component can be used in more complex scenarios, such as when you need to control the expanded
state of the items or when you want to customise the header and content.

```tsx
// Example usage
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  SectionHeader,
} from '@utilitywarehouse/hearth-react-native';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  return (
    <Accordion type="multiple" defaultValue={['item-1']}>
      <SectionHeader heading="Frequently Asked Questions" helperText="Click to expand" />
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }: { isExpanded: boolean }) => {
              return (
                <>
                  <AccordionTitleText>How do I place an order?</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpSmallIcon} />
                  ) : (
                    <AccordionIcon as={ChevronDowSmallIcon} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="b">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }: { isExpanded: boolean }) => {
              return (
                <>
                  <AccordionTitleText>What payment methods do you accept?</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpMediumIcon} />
                  ) : (
                    <AccordionIcon as={ChevronDownMediumIcon} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText>
            We accept all major credit cards, PayPal, and bank transfers.
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
```

### With heading text and helper text

You can add a heading and helper text to the accordion to provide context for the user.

```tsx
// Example usage
import { Accordion, AccordionItem, BodyText } from '@utilitywarehouse/hearth-react-native';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  return (
    <Accordion
      type="multiple"
      defaultValue={['item-1']}
      heading="Frequently Asked Questions"
      helperText="Click to expand"
    >
      <AccordionItem title="How do I place an order?" value="item-1">
        <BodyText> Lorem ipsum dolor sit amet consectetur, adipisicing elit.</BodyText>
      </AccordionItem>
      <AccordionItem title="What payment methods do you accept?" value="item-2">
        <BodyText>We accept all major credit cards, PayPal, and bank transfers.</BodyText>
      </AccordionItem>
    </Accordion>
  );
};
```

### With custom trigger content

You can use custom content for the trigger of the accordion item, such as an icon or badge.

```tsx
// Example usage
import { Accordion, AccordionItem, Badge, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <Accordion type="multiple" defaultValue={['item-1']}>
      <AccordionItem
        title="How do I place an order?"
        value="item-1"
        triggerContent={<Badge>New Content</Badge>}
      >
        <BodyText> Lorem ipsum dolor sit amet consectetur, adipisicing elit.</BodyText>
      </AccordionItem>
      <AccordionItem title="What payment methods do you accept?" value="item-2">
        <BodyText>We accept all major credit cards, PayPal, and bank transfers.</BodyText>
      </AccordionItem>
    </Accordion>
  );
};
```
