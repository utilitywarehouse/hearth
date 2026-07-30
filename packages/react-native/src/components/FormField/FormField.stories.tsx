import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { expect, within } from 'storybook/test';
import { FormField } from '.';
import { VariantTitle } from '../../../docs/components';
import { Checkbox } from '../Checkbox';
import { Flex } from '../Flex';
import { Input } from '../Input';

const meta = {
  title: 'Stories / FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
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
    label: {
      control: 'text',
      description: 'The label of the Input component',
      defaultValue: 'Label',
    },
    labelVariant: {
      control: 'radio',
      options: ['heading', 'body'],
      description: 'The label variant of the Input component',
      defaultValue: 'body',
    },
    helperText: {
      control: 'text',
      description: 'The helper text of the Input component',
      defaultValue: 'Helper text',
    },
    helperIcon: {
      control: 'select',
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
      description: 'The helper text icon of the Input component',
      defaultValue: 'none',
    },

    validText: {
      control: 'text',
      description: 'The valid text of the Input component',
      defaultValue: 'Valid text',
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text of the Input component',
      defaultValue: 'Invalid text',
    },
  },
  args: {
    validationStatus: 'initial',
    disabled: false,
    label: 'Label',
    labelVariant: 'body',
    helperText: 'Helper text',
    helperIcon: undefined,
    validText: 'Valid text',
    invalidText: 'Invalid error text',
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ validationStatus, helperIcon: icon, ...props }) => {
    // @ts-expect-error - This is a playground
    const helperIcon = icon === 'none' ? undefined : Icons[icon];
    return (
      <FormField validationStatus={validationStatus} helperIcon={helperIcon} {...props}>
        <Input />
      </FormField>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <Flex direction="column" spacing="lg">
        <VariantTitle title="Default">
          <FormField label="Label">
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="With helper text bottom">
          <FormField label="Label" helperText="Helper text">
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="With helper text top">
          <FormField label="Label" helperText="Helper text">
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="Valid with valid text">
          <FormField
            validationStatus="valid"
            label="Label"
            helperText="Helper text"
            validText="Valid form field text"
          >
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="Invalid with invalid text">
          <FormField
            validationStatus="invalid"
            label="Label"
            helperText="Helper Text"
            invalidText="Invalid form field text"
          >
            <Input />
          </FormField>
        </VariantTitle>
        <VariantTitle title="Disabled">
          <FormField disabled label="Label" helperText="Helper text">
            <Input />
          </FormField>
        </VariantTitle>
      </Flex>
    );
  },
};

// Characterization: FormField's own invalid variant renders (and its valid
// variant does not), and a child that reads useFormFieldContext() (Checkbox)
// inherits the invalid validationStatus from context even though the child
// was never given its own validationStatus prop — this is the context
// composition future migrations must preserve.
export const InvalidState: Story = {
  render: () => (
    <FormField
      validationStatus="invalid"
      label="Label"
      helperText="Helper text"
      validText="Field valid text"
      invalidText="Field invalid text"
    >
      <Checkbox
        label="Checkbox label"
        validText="Checkbox valid text"
        invalidText="Checkbox invalid text"
      />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // FormField's own invalid helper text shows, valid text does not.
    await expect(canvas.getByText('Field invalid text')).toBeInTheDocument();
    expect(canvas.queryByText('Field valid text')).not.toBeInTheDocument();

    // The nested Checkbox inherits validationStatus="invalid" from
    // FormFieldContext, so its own invalid text renders and its valid text
    // does not, despite the Checkbox never being passed validationStatus.
    await expect(canvas.getByText('Checkbox invalid text')).toBeInTheDocument();
    expect(canvas.queryByText('Checkbox valid text')).not.toBeInTheDocument();
  },
};

// Characterization: the mirror image of InvalidState for validationStatus="valid".
export const ValidState: Story = {
  render: () => (
    <FormField
      validationStatus="valid"
      label="Label"
      helperText="Helper text"
      validText="Field valid text"
      invalidText="Field invalid text"
    >
      <Checkbox
        label="Checkbox label"
        validText="Checkbox valid text"
        invalidText="Checkbox invalid text"
      />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Field valid text')).toBeInTheDocument();
    expect(canvas.queryByText('Field invalid text')).not.toBeInTheDocument();

    await expect(canvas.getByText('Checkbox valid text')).toBeInTheDocument();
    expect(canvas.queryByText('Checkbox invalid text')).not.toBeInTheDocument();
  },
};

// Characterization: disabled/readOnly propagate from FormField to its own
// label's visual disabled styling (dimmed opacity), matching the
// `theme.opacity.disabled` token applied by the Label component. Note:
// react-native-web does not map accessibilityState/disabled to an
// `aria-disabled` DOM attribute here (verified via live DOM inspection), so
// this asserts on the observable opacity instead — see UWDS-4909.
export const DisabledPropagation: Story = {
  render: () => (
    <Flex direction="column" spacing="lg">
      <VariantTitle title="Enabled">
        <FormField label="Enabled label" helperText="Helper text">
          <Input />
        </FormField>
      </VariantTitle>
      <VariantTitle title="Disabled">
        <FormField disabled label="Disabled label" helperText="Helper text">
          <Input />
        </FormField>
      </VariantTitle>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const enabledLabel = await canvas.findByText('Enabled label');
    const disabledLabel = await canvas.findByText('Disabled label');

    expect(getComputedStyle(enabledLabel).opacity).toBe('1');
    expect(getComputedStyle(disabledLabel).opacity).toBe('0.5');
  },
};
