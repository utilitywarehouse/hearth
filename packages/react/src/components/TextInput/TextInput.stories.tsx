import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { InputSlot } from '../InputSlot/InputSlot';
import { TextInput } from './TextInput';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { useForm, Controller } from 'react-hook-form';

const meta: Meta<typeof TextInput> = {
  title: 'Components / TextInput',
  component: TextInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    hideLabel: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
  },
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
    disabled: false,
    readOnly: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

/** Visual matrix of TextInput variants — used in docs and Chromatic snapshot testing. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex gap="400" direction="column">
      <TextInput {...args} />
      <TextInput {...args} label="Disabled" disabled helperText="Please do something before this" />
      <TextInput
        {...args}
        label="Read only"
        readOnly
        value="Uneditable previously provided information"
      />
      <TextInput
        {...args}
        label="Email"
        type="email"
        defaultValue="design-systems@uw.co.uk"
        validationStatus="valid"
        validationText="Valid email address"
        required
      />
      <TextInput
        {...args}
        label="Email"
        type="email"
        defaultValue="rphoenix@geemail."
        validationStatus="invalid"
        validationText="Please enter a valid email address"
        required
      />
      <TextInput {...args}>
        <InputSlot placement="prefix">
          <BodyText size="md" weight="semibold">
            £
          </BodyText>
        </InputSlot>
      </TextInput>
      <TextInput {...args}>
        <InputSlot placement="suffix">
          <BodyText size="md" weight="semibold">
            kWh
          </BodyText>
        </InputSlot>
      </TextInput>
      <TextInput {...args}>
        <InputSlot placement="prefix">
          <EmailMediumIcon />
        </InputSlot>
      </TextInput>
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
  render: args => <TextInput {...args} />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: /^Label/ });

    await expect(input).toHaveAccessibleDescription('Helper text');
    await expect(input).toHaveAttribute('placeholder', 'Placeholder');

    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
    input.blur();
  },
};

/** Set disabled or readOnly to prevent the TextInput from being edited. */
export const DisabledAndReadOnly: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    a11y: {
      config: {
        rules: [
          {
            // Disabled HelperText fails colour contrast rules. This is a known issue affecting an inactive UI component - https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
  render: args => (
    <Flex direction="column" gap="400">
      <TextInput {...args} label="Disabled" disabled helperText="Please do something before this" />
      <TextInput
        {...args}
        label="Read only"
        readOnly
        value="Uneditable previously provided information"
      />
    </Flex>
  ),
  args: { helperText: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabled = canvas.getByRole('textbox', { name: /^Disabled/ });

    await expect(disabled).toBeDisabled();
    await expect(disabled).not.toHaveAttribute('placeholder');
    await expect(canvas.getByRole('textbox', { name: /^Read only/ })).toHaveAttribute('readonly');
  },
};

/** Set validationStatus and validationText to show valid or invalid feedback. */
export const Validation: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  args: { helperText: undefined },
  render: args => (
    <Flex direction="column" gap="400">
      <TextInput
        {...args}
        label="Email"
        type="email"
        defaultValue="design-systems@uw.co.uk"
        validationStatus="valid"
        validationText="Valid email address"
        required
      />
      <TextInput
        {...args}
        label="Email"
        type="email"
        defaultValue="rphoenix@geemail."
        validationStatus="invalid"
        validationText="Please enter a valid email address"
        required
      />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const [valid, invalid] = within(canvasElement).getAllByRole('textbox', { name: /^Email/ });

    await expect(valid).not.toHaveAttribute('aria-invalid');
    await expect(valid).toHaveAccessibleDescription('Valid email address');
    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAccessibleDescription('Please enter a valid email address');
    await expect(invalid).toHaveAttribute('aria-errormessage');
  },
};

/** Use InputSlot to add a prefix or suffix, such as a currency symbol or unit. */
export const PrefixAndSuffix: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex direction="column" gap="400">
      <TextInput {...args}>
        <InputSlot placement="prefix">
          <BodyText size="md" weight="semibold">
            £
          </BodyText>
        </InputSlot>
      </TextInput>
      <TextInput {...args}>
        <InputSlot placement="suffix">
          <BodyText size="md" weight="semibold">
            kWh
          </BodyText>
        </InputSlot>
      </TextInput>
    </Flex>
  ),
};

/** Use InputSlot to add an icon alongside the input. */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <TextInput {...args}>
      <InputSlot placement="prefix">
        <EmailMediumIcon />
      </InputSlot>
    </TextInput>
  ),
};

/** Group related TextInputs under a shared fieldset legend and description. */
export const GroupingInputs: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Flex asChild direction="column">
      <fieldset>
        <legend>
          <Heading as="h3" size="lg" marginBottom="200">
            Grouping Inputs
          </Heading>
        </legend>
        <BodyText size="md" marginBottom="250" id="supporting-info">
          Supporting information
        </BodyText>
        <Card variant="subtle" direction="column" gap="250">
          <TextInput label="First name" required aria-describedby="supporting-info" />
          <TextInput label="Last name" required aria-describedby="supporting-info" />
          <TextInput
            label="Email"
            helperText="this is the helper text"
            aria-describedby="supporting-info"
          >
            <InputSlot placement="prefix">
              <EmailMediumIcon />
            </InputSlot>
          </TextInput>
        </Card>
      </fieldset>
    </Flex>
  ),
};

/** Integrate TextInput with react-hook-form's Controller for validation. */
export const ReactHookForm: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    const { control, handleSubmit } = useForm({
      defaultValues: {
        firstName: '',
      },
    });
    return (
      <Flex asChild gap="200" direction="column" alignItems="start">
        <form onSubmit={e => void handleSubmit((): void => {})(e)} noValidate>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'This is required' }}
            render={({ field, fieldState }) => {
              return (
                <div>
                  <TextInput
                    {...field} // Spreads onChange, onBlur, value, and ref
                    label="First Name"
                    validationStatus={fieldState.error ? 'invalid' : undefined}
                    validationText={fieldState.error?.message}
                  />
                </div>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Flex>
    );
  },
};

/** Test-only: a disabled or read-only TextInput isn't marked invalid while its validation text is hidden. */
export const HiddenValidationNotInvalid: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <TextInput
        label="Disabled invalid"
        disabled
        validationStatus="invalid"
        validationText="Disabled error"
      />
      <TextInput
        label="Read-only invalid"
        readOnly
        validationStatus="invalid"
        validationText="Read-only error"
      />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const name of [/^Disabled invalid/, /^Read-only invalid/]) {
      const field = canvas.getByRole('textbox', { name });
      await expect(field).not.toHaveAttribute('aria-invalid');
      await expect(field).not.toHaveAttribute('aria-errormessage');
    }
    await expect(canvas.queryByText('Disabled error')).not.toBeInTheDocument();
    await expect(canvas.queryByText('Read-only error')).not.toBeInTheDocument();
  },
};

/** Test-only: no ARIA references to validation text that isn't rendered. */
export const ValidationWithoutText: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <TextInput label="Status only" validationStatus="invalid" />
      <TextInput label="Text only" validationText="Unused text" />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [statusOnly, textOnly] = [/^Status only/, /^Text only/].map(name =>
      canvas.getByRole('textbox', { name })
    );

    await expect(statusOnly).toHaveAttribute('aria-invalid', 'true');
    await expect(statusOnly).not.toHaveAttribute('aria-errormessage');
    await expect(textOnly).not.toHaveAttribute('aria-describedby');
    await expect(canvas.queryByText('Unused text')).not.toBeInTheDocument();
  },
};
