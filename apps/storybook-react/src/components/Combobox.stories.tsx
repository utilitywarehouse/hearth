import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, ComboboxItem, useComboboxFilter } from '@utilitywarehouse/hearth-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import { StoryGallery } from '../storybook-components/StoryGallery';

const meta: Meta<typeof Combobox> = {
  title: 'Stories / Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          '`Combobox` allows users to both type to filter results and select from a predefined list.',
      },
    },
  },
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    noOptionsFoundText: { control: { type: 'text' } },
  },
  args: {
    label: 'Combobox',
    helperText: 'Helper text',
    validationText: 'Validation text',
    disabled: false,
    required: false,
    triggerOnlyOnType: false,
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  args: { defaultOpen: true },
  render: args => {
    const fruits = ['Apple', 'Banana', 'Orange'];
    return <Combobox {...args} items={fruits} />;
  },
};

export const ItemsAsChildren: Story = {
  render: args => {
    const fruits = ['Apple', 'Banana', 'Orange'];
    return (
      <Combobox {...args}>
        {fruits.map(fruit => (
          <ComboboxItem key={fruit} value={fruit}>
            {fruit}
          </ComboboxItem>
        ))}
      </Combobox>
    );
  },
};

export const ScrollArea: Story = {
  args: { defaultOpen: true },
  render: args => {
    return (
      <Combobox {...args}>
        {[...Array(100).keys()].map(n => (
          <ComboboxItem key={n + 1} value={`Item ${n + 1}`}>
            Item {n + 1}
          </ComboboxItem>
        ))}
      </Combobox>
    );
  },
};

interface VirtualizedItem {
  id: string;
  name: string;
}

function getItemLabel(item: VirtualizedItem | null) {
  return item ? item.name : '';
}

const virtualizedItems: VirtualizedItem[] = Array.from({ length: 10000 }, (_, index) => {
  const id = String(index + 1);
  const indexLabel = id.padStart(4, '0');
  return { id, name: `Item ${indexLabel}` };
});

export const Virtualised: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [value, setValue] = React.useState<VirtualizedItem | null>(null);

    const deferredSearchValue = React.useDeferredValue(searchValue);

    const scrollElementRef = React.useRef<HTMLDivElement | null>(null);

    const { contains } = useComboboxFilter({ value });

    const resolvedSearchValue =
      searchValue === '' || deferredSearchValue === '' ? searchValue : deferredSearchValue;

    const filteredItems = React.useMemo(() => {
      return virtualizedItems.filter(item => contains(item, resolvedSearchValue, getItemLabel));
    }, [contains, resolvedSearchValue]);

    const virtualizer = useVirtualizer({
      enabled: open,
      count: filteredItems.length,
      getScrollElement: () => scrollElementRef.current,
      estimateSize: () => 32,
      overscan: 20,
    });

    const handleScrollElementRef = React.useCallback(
      (element: HTMLDivElement | null) => {
        scrollElementRef.current = element;
        if (element) {
          virtualizer.measure();
        }
      },
      [virtualizer]
    );

    const totalSize = virtualizer.getTotalSize();

    return (
      <Combobox
        virtualized
        label="Search 10,000 items"
        items={virtualizedItems}
        filteredItems={filteredItems}
        open={open}
        onOpenChange={setOpen}
        inputValue={searchValue}
        onInputValueChange={setSearchValue}
        value={value}
        onValueChange={setValue}
        itemToStringLabel={getItemLabel}
        onItemHighlighted={(item: any, { reason, index }: any) => {
          if (!item) {
            return;
          }

          const isStart = index === 0;
          const isEnd = index === filteredItems.length - 1;
          const shouldScroll = reason === 'none' || (reason === 'keyboard' && (isStart || isEnd));

          if (shouldScroll) {
            queueMicrotask(() => {
              virtualizer.scrollToIndex(index, { align: isEnd ? 'start' : 'end' });
            });
          }
        }}
      >
        {filteredItems.length > 0 && (
          <div
            role="presentation"
            ref={handleScrollElementRef}
            style={{
              height: `min(22rem, ${totalSize}px)`,
              width: '100%',
            }}
          >
            <div role="presentation" style={{ height: totalSize }}>
              {virtualizer.getVirtualItems().map(virtualItem => {
                const item = filteredItems[virtualItem.index];
                if (!item) {
                  return null;
                }

                return (
                  <ComboboxItem
                    key={virtualItem.key}
                    index={virtualItem.index}
                    data-index={virtualItem.index}
                    ref={virtualizer.measureElement}
                    value={item}
                    aria-setsize={filteredItems.length}
                    aria-posinset={virtualItem.index + 1}
                  >
                    {item.name}
                  </ComboboxItem>
                );
              })}
            </div>
          </div>
        )}
      </Combobox>
    );
  },
};

export const Gallery: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    const stories = {
      Playground,
      ScrollArea,
    };
    return <StoryGallery meta={meta} stories={stories} direction="row" />;
  },
};
