# Storybook Stories Conventions

See [Storybook best practices](https://storybook.js.org/docs/ai/best-practices.md) for full guidance. Key rules from the [documenting your components](https://storybook.js.org/docs/ai/best-practices#documenting-your-components) section:

- **Each story demonstrates one concept** — do not mix unrelated variations (e.g. sizes AND icons AND disabled all in one story). The `KitchenSink` is the only exception; tag it with `tags: ['!manifest']` to exclude it from AI manifests.
- **JSDoc on every story export** — describe *why* you would use whatever is demonstrated, not just *what* it shows. A description that restates the story name adds no value.
- **`KitchenSink` always gets `tags: ['!manifest']`** — it mixes too many concepts to be a useful AI reference.
- **One story per variant/state** — add dedicated stories for each meaningful feature (sizes, icons, disabled, multiple selection) rather than relying solely on `KitchenSink`. This makes docs more navigable and gives agents clear, focused examples.
- **Use meta-level `args` for defaults** — set shared defaults (`size`, `defaultValue`, etc.) in `meta.args` rather than hardcoding them in each story's `render`. Stories can override individual args when demonstrating a specific state.

```tsx
// ✅ CORRECT — describes why, not what
/** Use the `icon` prop to pair an icon with each label. Match Small icons to size="sm" and Medium icons to size="md". */
export const WithIcons: Story = { ... };

// ❌ WRONG — just restates the story name
/** Shows the component with icons. */
export const WithIcons: Story = { ... };
```

## Using service options in stories

When a story needs realistic multi-option examples, use the full set of UW services — each has a paired icon in `@utilitywarehouse/hearth-react-icons`. Never use a subset; always use all six so the story reflects real usage.

| Service | Small icon | Medium icon |
|---------|-----------|-------------|
| Gas | `GasSmallIcon` | `GasMediumIcon` |
| Electricity | `ElectricitySmallIcon` | `ElectricityMediumIcon` |
| Mobile | `MobileSmallIcon` | `MobileMediumIcon` |
| Broadband | `BroadbandSmallIcon` | `BroadbandMediumIcon` |
| Insurance | `InsuranceSmallIcon` | `InsuranceMediumIcon` |
| Cashback | `CashbackCardSmallIcon` | `CashbackCardMediumIcon` |

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { MyComponent } from './MyComponent';
const variants = ['subtle', 'emphasis'] as const;
const sizes = ['sm', 'md'] as const;

const meta: Meta<typeof MyComponent> = {
  title: 'Components / MyComponent',
  component: MyComponent,
  argTypes: {
    variant: { options: variants, control: { type: 'radio' } },
    size:    { options: sizes,    control: { type: 'radio' } },
    children: { control: { type: 'text' } },
  },
  args: {
    variant: 'subtle',
    size: 'md',
    children: 'MyComponent',
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/**
 * Visual matrix of all combinations — used in docs and Chromatic snapshot testing.
 * Not a usage reference; excluded from AI manifests via the !manifest tag.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <Flex gap="200" wrap="wrap">
      {variants.map(v => (
        <MyComponent key={v} variant={v}>Label</MyComponent>
      ))}
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  render: args => <MyComponent {...args} />,
};

/** One story per notable feature, each demonstrating a single concept. */
export const Variants: Story = {
  render: () => (
    <Flex gap="200">
      <MyComponent variant="subtle">Subtle</MyComponent>
      <MyComponent variant="emphasis">Emphasis</MyComponent>
    </Flex>
  ),
};
```
