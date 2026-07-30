import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Radio, RadioGroup, RadioImage } from '.';
import bankLogo from '../../../docs/assets/bank-logo.png';
import bankLogo1 from '../../../docs/assets/bank-logo1.png';
import { VariantTitle } from '../../../docs/components';
import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { FormField } from '../FormField';

const meta = {
  title: 'Stories / Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the radio.',
    },
    label: {
      type: 'string',
      control: 'text',
      description: 'The label component for the radio.',
    },
    helperText: {
      type: 'string',
      control: 'text',
      description: 'The helper text of the radio component',
      defaultValue: 'Helper text',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the radio component',
      defaultValue: 'initial',
    },
    showValidationIcon: {
      control: 'boolean',
      description: 'Show the validation icon.',
      defaultValue: true,
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text of the radio component',
      defaultValue: 'Invalid text',
    },
    type: {
      control: 'select',
      options: ['default', 'tile'],
      description: 'The type of the radio component',
      defaultValue: 'default',
    },
  },
  args: {
    disabled: false,
    label: '',
    helperText: '',
    validationStatus: 'initial',
    showValidationIcon: true,
    invalidText: 'Invalid text',
    validText: 'Valid text',
    type: 'default',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: args => (
    <RadioGroup>
      <Radio
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="Radio-1"
        {...args}
      />
    </RadioGroup>
  ),
};

export const WithImage: Story = {
  parameters: {
    controls: { exclude: ['image'] },
  },
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: ({ ...args }) => (
    <RadioGroup>
      <Radio
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="Radio-1"
        {...args}
        label="Visa"
        value="Option 1"
        image={
          <RadioImage
            source={bankLogo1 as ImageSourcePropType}
            style={{ width: 48, height: 32 }}
            resizeMode="cover"
          />
        }
      />
      <Radio
        aria-label="Label 2"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="Radio-2"
        {...args}
        label="Mastercard"
        value="Option 2"
        image={
          <RadioImage
            source={bankLogo as ImageSourcePropType}
            style={{ width: 48, height: 32 }}
            resizeMode="cover"
          />
        }
      />
    </RadioGroup>
  ),
};

export const WithBadge: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
    helperText: 'Helper text',
  },
  render: args => (
    <RadioGroup>
      <Radio
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="Radio-1"
        badge={<Badge>New</Badge>}
        {...args}
      />
    </RadioGroup>
  ),
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['value', 'label', 'disabled'] },
  },
  args: {
    value: 'Option 1',
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ value: _, children: __, label: ___, disabled: _____, onChange: ______, ...args }) => {
    const [value, setValue] = useState('Option 1');
    return (
      <Flex spacing="lg">
        <VariantTitle title="Default">
          <RadioGroup
            aria-label="Radio Group"
            value={value}
            onChange={setValue}
            nativeID="Radio-group"
          >
            <Radio
              value="Option 1"
              aria-label="Option 1"
              onChange={(checked: boolean) => {
                console.log(checked, '###');
              }}
              nativeID="Radio-1"
              label="Option 1"
              {...args}
            />
            <Radio
              value="Option 2"
              aria-label="Option 2"
              onChange={(checked: boolean) => {
                console.log(checked, '###');
              }}
              nativeID="Radio-2"
              label="Option 2"
              {...args}
            />
          </RadioGroup>
        </VariantTitle>
        <VariantTitle title="Disabled">
          <RadioGroup
            aria-label="Radio Group"
            value={value}
            onChange={setValue}
            nativeID="Radio-group"
            disabled
          >
            <Radio
              aria-label="Option 3"
              value="Option 1"
              onChange={(checked: boolean) => console.log(checked, '###')}
              nativeID="Radio-3"
              label="Option 1"
              {...args}
            />
            <Radio
              aria-label="Option 4"
              value="Option 2"
              onChange={(checked: boolean) => console.log(checked, '###')}
              nativeID="Radio-4"
              label="Option 2"
              {...args}
            />
          </RadioGroup>
        </VariantTitle>
      </Flex>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultOption1 = await canvas.findByRole('radio', { name: 'Option 1' });
    const defaultOption2 = canvas.getByRole('radio', { name: 'Option 2' });
    const disabledOption3 = canvas.getByRole('radio', { name: 'Option 3' });
    const disabledOption4 = canvas.getByRole('radio', { name: 'Option 4' });

    expect(defaultOption1).toBeChecked();
    expect(disabledOption3).toBeChecked();

    // A disabled Radio does not respond to a press - the shared controlled value
    // (mirrored across both groups here) is unaffected.
    await userEvent.click(disabledOption4);
    expect(disabledOption3).toBeChecked();
    expect(disabledOption4).not.toBeChecked();
    expect(defaultOption1).toBeChecked();

    // Pressing an unselected Radio selects it and deselects the previously
    // selected Radio in the same group.
    await userEvent.click(defaultOption2);
    await waitFor(() => {
      expect(defaultOption2).toBeChecked();
      expect(defaultOption1).not.toBeChecked();
    });
    // Both groups share the same controlled value in this story, so the
    // (still disabled) second group reflects the change too.
    expect(disabledOption4).toBeChecked();
    expect(disabledOption3).not.toBeChecked();
  },
};

export const ValidationStatus: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
    validationStatus: 'invalid',
    invalidText: 'Invalid text',
  },
  render: args => (
    <RadioGroup>
      <Radio aria-label="Label 1" nativeID="Radio-1" {...args} />
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // A Radio with validationStatus="invalid" renders its invalidText via Helper.
    await waitFor(() => expect(canvas.getByText('Invalid text')).toBeInTheDocument());
  },
};

export const WithFormFieldExample: Story = () => (
  <>
    <FormField
      label="Account type"
      helperText="Is this account used for personal or business purposes?"
    >
      <RadioGroup type="tile">
        <Radio label="Personal" value="Personal" />
        <Radio label="Business" value="Business" />
      </RadioGroup>
    </FormField>
    <RadioGroup
      direction="row"
      label="Account type"
      helperText="Is this account used for personal or business purposes?"
      type="tile"
    >
      <Radio label="Personal" value="Personal" />
      <Radio label="Business" value="Business" />
    </RadioGroup>
  </>
);
