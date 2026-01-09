import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BodyText,
  Card,
  Flex,
  Heading,
  TextInput,
  InputSlot,
  Button,
} from '@utilitywarehouse/hearth-react';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { StoryGallery } from '../storybook-components/StoryGallery';
import { useForm, Controller } from 'react-hook-form';

const meta: Meta<typeof TextInput> = {
  title: 'Stories / TextInput',
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component: '`TextInput` is an interactive field that allows users to enter text and data.',
      },
    },
  },
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

export const Playground: Story = {
  render: args => <TextInput {...args} />,
};

export const DisabledAndReadOnly: Story = {
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
};

export const Validation: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <TextInput
        {...args}
        label="Email"
        type="email"
        value="rphoenix@uw.co.uk"
        validationStatus="valid"
        validationText="Valid email address"
        required
      />
      <TextInput
        {...args}
        label="Email"
        type="email"
        value="rphoenix@geemail."
        validationStatus="invalid"
        validationText="Please enter a valid email address"
        required
      />
    </Flex>
  ),
  args: { helperText: undefined },
};

export const PrefixAndSuffix: Story = {
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

export const WithIcons: Story = {
  render: args => (
    <TextInput {...args}>
      <InputSlot placement="prefix">
        <EmailMediumIcon />
      </InputSlot>
    </TextInput>
  ),
};

export const GroupingInputs: Story = {
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

export const ReactHookForm: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      defaultValues: {
        firstName: '',
      },
    });
    return (
      <Flex asChild gap="200" direction="column" alignItems="start">
        <form onSubmit={handleSubmit(() => {})} noValidate>
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
      DisabledAndReadOnly,
      Validation,
      PrefixAndSuffix,
      WithIcons,
    };
    return <StoryGallery meta={meta} stories={stories} />;
  },
};
