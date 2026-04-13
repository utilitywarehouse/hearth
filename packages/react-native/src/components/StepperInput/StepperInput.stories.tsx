import { Meta, StoryObj } from '@storybook/react-native';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { StepperInput } from '.';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

type StepperInputStoryProps = ComponentProps<typeof StepperInput>;

const meta = {
  title: 'Stories / StepperInput',
  component: StepperInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    labelVariant: {
      control: 'radio',
      options: ['body', 'heading'],
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
    },
    validText: {
      control: 'text',
    },
    invalidText: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    focused: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    focusInputOnStepPress: {
      control: 'boolean',
    },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    value: '10',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
    step: 1,
    min: 0,
    focusInputOnStepPress: false,
  },
} satisfies Meta<typeof StepperInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({
    value: initialValue,
    onChangeText: handleChangeText,
    onChangeValue: handleChangeValue,
    ...args
  }: StepperInputStoryProps) => {
    const [value, setValue] = useState(initialValue ?? '10');

    useEffect(() => {
      setValue(initialValue ?? '');
    }, [initialValue]);

    return (
      <StepperInput
        {...args}
        value={value}
        onChangeText={text => {
          setValue(text);
          handleChangeText?.(text);
        }}
        onChangeValue={nextValue => {
          setValue(`${nextValue}`);
          handleChangeValue?.(nextValue);
        }}
      />
    );
  },
};

export const States: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [values, setValues] = useState({
      default: '10',
      focused: '10',
      invalid: '10',
      invalidFocused: '10',
      heading: '10',
      headingInvalid: '10',
      disabled: '10',
    });

    const updateValue = (key: keyof typeof values) => (text: string) => {
      setValues(currentValues => ({ ...currentValues, [key]: text }));
    };

    return (
      <Flex direction="column" spacing="lg" style={{ width: 420 }}>
        <VariantTitle title="Default">
          <StepperInput
            label="Label"
            helperText="Helper text"
            value={values.default}
            onChangeText={updateValue('default')}
          />
        </VariantTitle>
        <VariantTitle title="Focused">
          <StepperInput
            label="Label"
            helperText="Helper text"
            focused
            value={values.focused}
            onChangeText={updateValue('focused')}
          />
        </VariantTitle>
        <VariantTitle title="Invalid">
          <StepperInput
            label="Label"
            helperText="Helper text"
            validationStatus="invalid"
            invalidText="Validation text"
            value={values.invalid}
            onChangeText={updateValue('invalid')}
          />
        </VariantTitle>
        <VariantTitle title="Invalid Focused">
          <StepperInput
            label="Label"
            helperText="Helper text"
            focused
            validationStatus="invalid"
            invalidText="Validation text"
            value={values.invalidFocused}
            onChangeText={updateValue('invalidFocused')}
          />
        </VariantTitle>
        <VariantTitle title="Heading Label">
          <StepperInput
            label="Label"
            helperText="Helper text"
            labelVariant="heading"
            value={values.heading}
            onChangeText={updateValue('heading')}
          />
        </VariantTitle>
        <VariantTitle title="Heading Invalid">
          <StepperInput
            label="Label"
            helperText="Helper text"
            labelVariant="heading"
            validationStatus="invalid"
            invalidText="Validation text"
            value={values.headingInvalid}
            onChangeText={updateValue('headingInvalid')}
          />
        </VariantTitle>
        <VariantTitle title="Disabled">
          <StepperInput
            label="Label"
            helperText="Helper text"
            disabled
            value={values.disabled}
            onChangeText={updateValue('disabled')}
          />
        </VariantTitle>
      </Flex>
    );
  },
};

export const Bounds: Story = {
  parameters: {
    controls: { include: ['min', 'max', 'step', 'focusInputOnStepPress'] },
  },
  args: {
    min: 0,
    max: 12,
    step: 2,
  },
  render: (args: StepperInputStoryProps) => {
    const [value, setValue] = useState('10');

    return <StepperInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const FocusOnStepPress: Story = {
  parameters: {
    controls: { include: ['focusInputOnStepPress'] },
  },
  args: {
    focusInputOnStepPress: true,
    label: 'Guests',
    helperText: 'Button presses will keep focus in the input',
    min: 1,
    max: 10,
  },
  render: (args: StepperInputStoryProps) => {
    const [value, setValue] = useState('2');

    return <StepperInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const LargeStep: Story = {
  parameters: {
    controls: { include: ['step'] },
  },
  args: {
    step: 10,
    label: 'Large Step',
    helperText: 'Step value of 10',
    min: 0,
    max: 100,
  },
  render: (args: StepperInputStoryProps) => {
    const [value, setValue] = useState('20');

    return <StepperInput {...args} value={value} onChangeText={setValue} />;
  },
};
