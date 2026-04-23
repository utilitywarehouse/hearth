# Storybook Stories

Use this reference when the user has confirmed they want a `.stories.tsx` output.

## Format

Stories use CSF3 with `@storybook/react-vite`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@utilitywarehouse/hearth-react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components / MyComponent',
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof MyComponent>;
```

- Import from `@storybook/react-vite`, not `@storybook/react`
- Title convention: `'Components / ComponentName'` (adjust to match the project's existing title structure if the user tells you what it is)
- `HearthProvider` is **not** needed in stories — Storybook provides it via a decorator

## What stories to write

Write a `Default` story with representative sample data, then add one story per meaningful state that a reviewer would want to see rendered. Think about what's visually distinct or worth checking — don't just enumerate every prop combination.

**For a card component:**
```tsx
export const Default: Story = {
  render: () => (
    <Box padding="400" maxWidth="480px">
      <BroadbandServiceCard
        packageName="Full Fibre 500"
        monthlyCost="£35.00"
        contractEndDate="31 March 2026"
        manageHref="#"
      />
    </Box>
  ),
};

export const HubOffline: Story = {
  render: () => (
    <Box padding="400" maxWidth="480px">
      <BroadbandServiceCard
        packageName="Full Fibre 500"
        monthlyCost="£35.00"
        contractEndDate="31 March 2026"
        manageHref="#"
        isHubOffline
      />
    </Box>
  ),
};
```

**For a form:**
```tsx
export const Default: Story = {
  args: {
    onSave: async (values) => {
      await new Promise(r => setTimeout(r, 1000));
      console.log('saved', values);
    },
  },
};
```

**For a dashboard/page:**
```tsx
export const Default: Story = {
  render: () => (
    <ServicesDashboard
      customerName="Alex"
      services={[
        { id: 'energy', name: 'Energy', monthlyCost: 85, manageHref: '#', colorScheme: 'energy' },
        { id: 'broadband', name: 'Broadband', monthlyCost: 32.5, manageHref: '#', colorScheme: 'broadband' },
      ]}
    />
  ),
};

export const EmptyState: Story = {
  render: () => <ServicesDashboard services={[]} />,
};
```

## Tips

- Wrap components in `<Box padding="400">` or `<Container>` so they don't render edge-to-edge in the canvas
- For components with async callbacks (form saves, etc.), use a `setTimeout` mock so you can see loading and success states in the canvas
- Add a story for each visually distinct state: empty, loading, error, success, edge cases
- Keep stories focused — one concept per story makes it easy to navigate
- Don't add a `KitchenSink` or `Gallery` story — those patterns are for the Hearth library itself
