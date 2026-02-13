import { Meta, StoryObj } from '@storybook/react-native';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, View } from 'react-native';
import { Input } from '.';
import { VariantTitle } from '../../../docs/components';
import { useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
import { Button } from '../Button';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The Input field placeholder',
      defaultValue: '',
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'The Input field type',
      defaultValue: 'text',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the Input component',
      defaultValue: 'initial',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the Input component',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Read only the Input component',
      defaultValue: false,
    },
    focused: {
      control: 'boolean',
      description: 'Focus the Input component',
      defaultValue: false,
    },
    leadingIcon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
      control: 'select',
      description: 'The leading icon component for the Input component',
    },
    trailingIcon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
      control: 'select',
      description: 'The trailing icon component for the Input component',
    },
  },
  args: {
    placeholder: 'Input placeholder',
    validationStatus: 'initial',
    type: 'text',
    disabled: false,
    readonly: false,
    focused: false,
    leadingIcon: undefined,
    trailingIcon: undefined,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  // @ts-expect-error - This is a playground
  render: ({ leadingIcon: leading, trailingIcon: trailing, ...args }) => {
    // @ts-expect-error - This is a playground
    const leadingIcon = leading === 'none' ? undefined : Icons[leading];
    // @ts-expect-error - This is a playground
    const trailingIcon = trailing === 'none' ? undefined : Icons[trailing];
    return (
      <Input
        {...args}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        label="First Name"
        helperText="Only enter your first name, not your full name"
      />
    );
  },
};

export const Variants: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [clearableSearchValue, setClearableSearchValue] = useState('clearble search');
    const handleClearableSearchChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setClearableSearchValue(e.nativeEvent.text);
    };
    const handleClearableSearchClear = () => {
      setClearableSearchValue('');
    };
    return (
      <Flex direction="column" spacing="lg">
        <VariantTitle title="Default">
          <Input />
        </VariantTitle>
        <VariantTitle title="With icon">
          <Input leadingIcon={EmailMediumIcon} />
        </VariantTitle>
        <VariantTitle title="With placeholder">
          <Input placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="With value">
          <Input placeholder="Input placeholder" value="filling the value" />
        </VariantTitle>
        <VariantTitle title="Focused">
          <Input focused placeholder="Input placeholder" value="filling the value" />
        </VariantTitle>
        <VariantTitle title="Type password">
          <Input placeholder="Input placeholder" value="filling the value" type="password" />
        </VariantTitle>
        <VariantTitle title="Type search">
          <Input placeholder="Input placeholder" type="search" />
        </VariantTitle>
        <VariantTitle title="Type search - clearable">
          <Input
            placeholder="Input placeholder"
            type="search"
            value={clearableSearchValue}
            clearable
            onChange={handleClearableSearchChange}
            onClear={handleClearableSearchClear}
          />
        </VariantTitle>
        <VariantTitle title="Type search - loading">
          <Input placeholder="Input placeholder" type="search" loading />
        </VariantTitle>
        <VariantTitle title="Valid">
          <Input validationStatus="valid" placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Valid focused">
          <Input validationStatus="valid" focused placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Invalid">
          <Input validationStatus="invalid" placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Invalid focused">
          <Input validationStatus="invalid" focused placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Disabled">
          <Input disabled placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Readonly">
          <Input readonly placeholder="Input placeholder" readOnly />
        </VariantTitle>
      </Flex>
    );
  },
};

export const RefTest: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const inputRef = useRef<TextInput>(null);
    const [refStatus, setRefStatus] = useState('Ref not tested yet');
    const theme = useTheme();

    const handleFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        setRefStatus('✅ Ref works! Input focused programmatically');
      } else {
        setRefStatus('❌ Ref is null');
      }
    };

    const handleBlur = () => {
      if (inputRef.current) {
        inputRef.current.blur();
        setRefStatus('✅ Ref works! Input blurred programmatically');
      } else {
        setRefStatus('❌ Ref is null');
      }
    };

    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.clear();
        setRefStatus('✅ Ref works! Input cleared programmatically');
      } else {
        setRefStatus('❌ Ref is null');
      }
    };

    return (
      <Flex direction="column" spacing="lg">
        <VariantTitle title="Ref Test">
          <Input
            ref={inputRef}
            placeholder="Test ref functionality"
            defaultValue="Try the buttons below"
          />
        </VariantTitle>
        <VariantTitle title="Status">
          <Flex direction="column" spacing="sm">
            <Flex direction="row" spacing="sm">
              <Button onPress={handleFocus}>Focus Input</Button>
              <Button onPress={handleBlur}>Blur Input</Button>
              <Button onPress={handleClear}>Clear Input</Button>
            </Flex>
            <View
              style={{
                marginTop: 8,
                padding: 8,
                backgroundColor: theme.color.background.secondary,
                borderRadius: 4,
              }}
            >
              <BodyText>{refStatus}</BodyText>
            </View>
          </Flex>
        </VariantTitle>
      </Flex>
    );
  },
};
