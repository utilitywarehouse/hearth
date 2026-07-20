import type { Meta, StoryObj } from '@storybook/react-vite';
import { useComboboxFilter } from '../../hooks/use-combobox-filter';
import { Combobox } from './Combobox';
import { ComboboxItem } from './ComboboxItem';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useState, useDeferredValue, useRef, useCallback, useMemo } from 'react';

const meta: Meta<typeof Combobox> = {
  title: 'Components / Combobox',
  component: Combobox,
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    noOptionsFoundText: { control: { type: 'text' } },
    loading: { control: { type: 'boolean' } },
    statusText: { control: { type: 'text' } },
  },
  args: {
    label: 'Combobox',
    helperText: 'Helper text',
    validationText: 'Validation text',
    placeholder: 'Select an option',
    disabled: false,
    required: false,
    triggerOnlyOnType: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  render: args => {
    const fruits = ['Apple', 'Banana', 'Orange'];
    return <Combobox {...args} items={fruits} />;
  },
};

export const DefaultOpen: Story = {
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

export const NoItems: Story = {
  args: { defaultOpen: false },
  render: args => {
    const addressOptions: Array<string> = [];
    const [postcodeValue, setPostcodeValue] = useState('');
    const onPostcodeChange = (value: string) => {
      const postcode = String(value).trim().toUpperCase();
      setPostcodeValue(postcode);
    };
    return (
      <Combobox
        {...args}
        helperText="Start typing postcode"
        inputValue={postcodeValue}
        label="Address"
        marginBottom="50"
        onInputValueChange={onPostcodeChange}
        onValueChange={value => setPostcodeValue(value as string)}
        required
        triggerOnlyOnType
        validationStatus="invalid"
        validationText="Postcode not found"
      >
        {(function () {
          if (addressOptions?.length) {
            return addressOptions.map(address => (
              <ComboboxItem key={address} value={address}>
                {address}
              </ComboboxItem>
            ));
          }

          // return <ComboboxEmpty>No address found</ComboboxEmpty>;
          return null;
        })()}
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

const virtualizedItems: Array<VirtualizedItem> = Array.from({ length: 10000 }, (_, index) => {
  const id = String(index + 1);
  const indexLabel = id.padStart(4, '0');
  return { id, name: `Item ${indexLabel}` };
});

export const Virtualised: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [value, setValue] = useState<VirtualizedItem | null>(null);

    const deferredSearchValue = useDeferredValue(searchValue);

    const scrollElementRef = useRef<HTMLDivElement | null>(null);

    const { contains } = useComboboxFilter({ value });

    const resolvedSearchValue =
      searchValue === '' || deferredSearchValue === '' ? searchValue : deferredSearchValue;

    const filteredItems = useMemo(() => {
      return virtualizedItems.filter(item => contains(item, resolvedSearchValue, getItemLabel));
    }, [contains, resolvedSearchValue]);

    const virtualizer = useVirtualizer({
      enabled: open,
      count: filteredItems.length,
      getScrollElement: () => scrollElementRef.current,
      estimateSize: () => 32,
      overscan: 20,
    });

    const handleScrollElementRef = useCallback(
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
        onItemHighlighted={(
          item: unknown,
          { reason, index }: { reason: string; index: number }
        ) => {
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

const fruits = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Coconut',
  'Grape',
  'Kiwi',
  'Lemon',
  'Mango',
  'Orange',
  'Peach',
  'Pear',
  'Pineapple',
  'Raspberry',
  'Strawberry',
];

export const FilterItems: Story = {
  name: 'Filter Items (contains)',
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    const { contains } = useComboboxFilter({ value });

    return (
      <Combobox
        {...args}
        label="Fruit (contains)"
        items={fruits}
        filter={contains}
        value={value}
        onValueChange={v => setValue(v as string | null)}
      />
    );
  },
};

export const FilterItemsStartsWith: Story = {
  name: 'Filter Items (startsWith)',
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    const { startsWith } = useComboboxFilter({ value });

    return (
      <Combobox
        {...args}
        label="Fruit (startsWith)"
        items={fruits}
        filter={startsWith}
        value={value}
        onValueChange={v => setValue(v as string | null)}
      />
    );
  },
};
