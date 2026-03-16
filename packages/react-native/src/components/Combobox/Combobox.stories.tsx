import type { Meta } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { BottomSheetFlatList } from '../BottomSheet';
import { Box } from '../Box';
import { ComboboxOptionItemProps } from './Combobox.props';
import Combobox from './Combobox';
import ComboboxOption from './ComboboxOption';

const countries = [
  { label: 'United Kingdom', value: 'uk', keywords: ['britain', 'england'] },
  { label: 'United States', value: 'us', keywords: ['america', 'usa'] },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'France', value: 'fr' },
  { label: 'Germany', value: 'de' },
  { label: 'Japan', value: 'jp' },
  { label: 'Brazil', value: 'br' },
  { label: 'India', value: 'in' },
  { label: 'South Africa', value: 'za' },
] satisfies ComboboxOptionItemProps[];

const products = [
  'Broadband',
  'Energy',
  'Mobile',
  'Insurance',
  'Cashback Card',
  'Home Phone',
  'TV',
  'Boiler Cover',
  'Life Insurance',
  'Smart Home',
].map((label, index) => ({
  label,
  value: `product-${index + 1}`,
})) satisfies ComboboxOptionItemProps[];

const cities = Array.from({ length: 150 }, (_, index) => ({
  label: `City ${String(index + 1).padStart(3, '0')}`,
  value: `city-${index + 1}`,
}));

const meta = {
  title: 'Stories / Combobox',
  component: Combobox,
  parameters: {
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the combobox',
      defaultValue: 'Combobox',
    },
    placeholder: {
      control: 'text',
      description: 'Trigger placeholder text',
      defaultValue: 'Search for a country',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Bottom sheet input placeholder text',
      defaultValue: 'Search for a country',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the combobox is readonly',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show a loading spinner',
      defaultValue: false,
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'Validation status',
      defaultValue: 'initial',
    },
    noOptionsFoundText: {
      control: 'text',
      description: 'Empty state text',
      defaultValue: 'No options found',
    },
  },
  args: {
    label: 'Combobox',
    helperText: 'Helper text',
    placeholder: 'Search for a country',
    searchPlaceholder: 'Search for a country',
    disabled: false,
    readonly: false,
    loading: false,
    validationStatus: 'initial',
    noOptionsFoundText: 'No options found',
    options: countries,
  },
} satisfies Meta<typeof Combobox>;

export default meta;

export const Playground = ({ ...args }) => {
  const [value, setValue] = useState<string | null>('uk');

  return <Combobox value={value} onValueChange={setValue} {...args} />;
};

export const StaticSearchableList = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Country"
      helperText="Search a fixed list of countries"
      placeholder="Search for a country"
      searchPlaceholder="Search for a country"
      menuHeading="Choose a country"
      options={countries}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const DynamicItems = () => {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ComboboxOptionItemProps[]>(products);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const normalizedQuery = inputValue.trim().toLowerCase();
      const nextOptions = products.filter(option => {
        if (!normalizedQuery) {
          return true;
        }

        return option.label.toLowerCase().includes(normalizedQuery);
      });

      setOptions(nextOptions);
      setLoading(false);
    }, 350);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <Combobox
      label="Products"
      helperText="Search results are updated asynchronously"
      menuHeading="Search products"
      placeholder="Search products"
      searchPlaceholder="Search products"
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      loading={loading}
      options={options}
      value={value}
      onValueChange={setValue}
      getValueLabel={selectedValue =>
        products.find(option => option.value === selectedValue)?.label ?? ''
      }
      noOptionsFoundText="No products match your search"
    />
  );
};

export const CustomFlatList = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Cities"
      helperText="Custom bottom sheet content using BottomSheetFlatList"
      placeholder="Search a city"
      searchPlaceholder="Search a city"
      menuHeading="Popular cities"
      value={value}
      onValueChange={setValue}
      getValueLabel={selectedValue =>
        cities.find(option => option.value === selectedValue)?.label ?? ''
      }
    >
      {({ search }) => {
        const normalizedQuery = search.trim().toLowerCase();
        const filteredCities = normalizedQuery
          ? cities.filter(option => option.label.toLowerCase().includes(normalizedQuery))
          : cities;

        return (
          <BottomSheetFlatList
            data={filteredCities}
            keyExtractor={item => item.value}
            renderItem={({ item }) => <ComboboxOption label={item.label} value={item.value} />}
          />
        );
      }}
    </Combobox>
  );
};

export const InlineOptions = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Inline options"
      helperText="Compose your own sheet content using ComboboxOption"
      placeholder="Search a country"
      searchPlaceholder="Search a country"
      value={value}
      onValueChange={setValue}
    >
      <Box>
        {countries.map(option => (
          <ComboboxOption key={option.value} label={option.label} value={option.value} />
        ))}
      </Box>
    </Combobox>
  );
};
