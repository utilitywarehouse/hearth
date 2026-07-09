# Section Header

Use the `Section Header` component to help define and separate content within a screen. It provides structure, clarity, and improves page scannability for users. It is nested within components, such as List, but can be used outside of components too.

- [Playground](#playground)
- [Anatomy](#anatomy)
- [Usage](#usage)
- [Props](#props)

## Playground

```tsx
<SectionHeader heading="This is the section heading" helperText="Helper text" />
```

## Anatomy

Section Header consists of: Heading, Helper Text, a Badge (optional) and a trailing content (optional, usually a Link or Button).

### Heading

Being a header component, the heading element is required. It should clearly describe the content it is grouping.

Headings should be short and meaningful - they should clearly describe the content that follows.

Don't let titles get too wordy. Simplify the title as much as possible, and add a 1-2 line subtitle if necessary.

### Helper text

A helper text property is included in the component to be able to add helper text if required.

Use helper text when users need extra clarity or explanation before engaging with the section.

## Usage

```tsx
import { SectionHeader } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <SectionHeader heading="Heading" helperText="Helper text" />;
```

## Props

| Name            | Type              | Default | Description                                            |
| --------------- | ----------------- | ------- | ------------------------------------------------------ |
| heading         | `string`          |         | The text to display in the heading of the list.        |
| helperText      | `string`          |         | The helper text to display in the heading of the list. |
| trailingContent | `React.ReactNode` |         | Optional content to display on the right side.         |
| badge           | `BadgeProps`      |         | Optional badge to display next to the heading.         |

## Variants

```tsx
<Flex spacing="xl" direction="column" style={{ width: '100%' }}>
  <VariantTitle title="Default SectionHeader with helper text and link">
    <SectionHeader
      heading="Heading"
      helperText="Helper text"
      trailingContent={<Link>See more</Link>}
    />
  </VariantTitle>
  <VariantTitle title="SectionHeader with icon on the left of the link ">
    <SectionHeader
      heading="Heading"
      helperText="Helper text"
      trailingContent={
        <Link icon={SettingsMediumIcon} iconPosition="left">
          Settings
        </Link>
      }
    />
  </VariantTitle>
  <VariantTitle title="SectionHeader with no icon">
    <SectionHeader
      heading="Heading"
      helperText="Helper text"
      trailingContent={<Link showIcon={false}>Call to action</Link>}
    />
  </VariantTitle>
  <VariantTitle title="SectionHeader with badge">
    <SectionHeader heading="Heading" helperText="Helper text" badge={{ text: "I'm a badge" }} />
  </VariantTitle>
  <VariantTitle title="SectionHeader with badge and link">
    <SectionHeader
      heading="Heading"
      helperText="Helper text"
      trailingContent={<Link>Show more</Link>}
      badge={{ text: 'New' }}
    />
  </VariantTitle>
</Flex>
```
