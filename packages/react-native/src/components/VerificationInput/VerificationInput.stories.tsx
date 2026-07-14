import { Meta, StoryObj } from '@storybook/react-vite';
import { InfoMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useRef, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { VerificationInput, type VerificationInputHandle } from '.';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Button } from '../Button';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / VerificationInput',
  component: VerificationInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
    },
    validText: { control: 'text' },
    invalidText: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    secureTextEntry: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
  },
  args: {
    label: 'Verification Code',
    validationStatus: 'initial',
    autoFocus: true,
    secureTextEntry: false,
  },
} satisfies Meta<typeof VerificationInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    const [value, setValue] = useState(args.value || '');
    return (
      <VerificationInput
        {...args}
        value={value}
        onChangeText={text => {
          setValue(text);
          args.onChangeText?.(text);
        }}
      />
    );
  },
};

export const Variants: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [values, setValues] = useState({
      default: '',
      filled: '123456',
      invalid: '123',
      valid: '123456',
      disabled: '',
      secure: '123',
    });

    const updateValue = (key: keyof typeof values) => (text: string) => {
      setValues(prev => ({ ...prev, [key]: text }));
    };

    return (
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
    );
  },
};

export const RefMethods: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const inputRef = useRef<VerificationInputHandle>(null);
    const [value, setValue] = useState('123456');
    const [status, setStatus] = useState('Ref not tested yet');

    const handleFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        setStatus('OK: focused first slot');
      } else {
        setStatus('Error: ref is null');
      }
    };

    const handleBlur = () => {
      if (inputRef.current) {
        inputRef.current.blur();
        setStatus('OK: blurred inputs');
      } else {
        setStatus('Error: ref is null');
      }
    };

    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.clear();
        setStatus('OK: cleared value');
      } else {
        setStatus('Error: ref is null');
      }
    };

    const handleFocusIndex = () => {
      if (inputRef.current) {
        inputRef.current.focusIndex(3);
        setStatus('OK: focused slot 4');
      } else {
        setStatus('Error: ref is null');
      }
    };

    return (
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
    );
  },
};

export const FocusProgressionAfterEmptySlotSelection: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [value, setValue] = useState('12');

    return (
      <Flex direction="column" spacing="sm" style={{ width: 400 }}>
        <VerificationInput label="Verification Code" value={value} onChangeText={setValue} />
      </Flex>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = (await canvas.findByLabelText('Verification Code')) as HTMLInputElement;

    input.focus();

    input.setSelectionRange(4, 4);
    input.dispatchEvent(new Event('select', { bubbles: true }));

    await userEvent.keyboard('3');

    await waitFor(() => {
      expect(input.value).toBe('123');
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(3);
    });
  },
};
