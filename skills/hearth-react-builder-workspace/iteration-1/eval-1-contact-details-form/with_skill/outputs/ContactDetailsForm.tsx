import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Alert,
  Button,
  Flex,
  Heading,
  Select,
  SelectItem,
  TextInput,
} from '@utilitywarehouse/hearth-react';

import './ContactDetailsForm.css';

export type ContactMethod = 'email' | 'sms' | 'post';

export interface ContactDetailsFormValues {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
}

export interface ContactDetailsFormProps {
  /** Default values to pre-populate the form. */
  defaultValues?: Partial<ContactDetailsFormValues>;
  /**
   * Called when the user submits valid form data.
   * Return a Promise — resolves on success, rejects on failure.
   */
  onSave: (values: ContactDetailsFormValues) => Promise<void>;
}

// UK phone number: starts with 0, 10–11 digits, allows spaces and hyphens.
const UK_PHONE_RE = /^0[\d\s-]{9,10}$/;

export function ContactDetailsForm({
  defaultValues,
  onSave,
}: ContactDetailsFormProps) {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetailsFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      contactMethod: undefined,
      ...defaultValues,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (values: ContactDetailsFormValues) => {
    setSaveStatus('saving');
    try {
      await onSave(values);
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact details form"
      className="contact-details-form"
    >
      <Flex direction="column" gap="500">
        <Heading as="h1" size="lg">
          Contact details
        </Heading>

        {/* Success alert */}
        {saveStatus === 'success' && (
          <Alert
            colorScheme="positive"
            title="Details saved"
            text="Your contact details have been updated successfully."
            onClose={() => setSaveStatus('idle')}
          />
        )}

        {/* Error alert */}
        {saveStatus === 'error' && (
          <Alert
            colorScheme="danger"
            title="Something went wrong"
            text="We could not save your details. Please try again."
            onClose={() => setSaveStatus('idle')}
          />
        )}

        <fieldset className="contact-details-form__fieldset">
          <legend className="contact-details-form__legend">
            <Heading as="h2" size="sm">
              Personal information
            </Heading>
          </legend>

          <Flex direction="column" gap="400">
            {/* Full name */}
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters',
                },
              }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Full name"
                  type="text"
                  autoComplete="name"
                  required
                  validationStatus={fieldState.error ? 'invalid' : undefined}
                  validationText={fieldState.error?.message}
                />
              )}
            />

            {/* Email address */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  validationStatus={fieldState.error ? 'invalid' : undefined}
                  validationText={fieldState.error?.message}
                />
              )}
            />

            {/* Phone number */}
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: UK_PHONE_RE,
                  message: 'Enter a valid UK phone number starting with 0',
                },
              }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Phone number"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  helperText="UK numbers only, e.g. 07700 900000"
                  required
                  validationStatus={fieldState.error ? 'invalid' : undefined}
                  validationText={fieldState.error?.message}
                />
              )}
            />
          </Flex>
        </fieldset>

        <fieldset className="contact-details-form__fieldset">
          <legend className="contact-details-form__legend">
            <Heading as="h2" size="sm">
              Communication preferences
            </Heading>
          </legend>

          {/* Preferred contact method */}
          <Controller
            name="contactMethod"
            control={control}
            rules={{ required: 'Please select a preferred contact method' }}
            render={({ field, fieldState }) => (
              <Select
                label="Preferred contact method"
                placeholder="Select a method"
                required
                value={field.value ?? ''}
                onValueChange={field.onChange}
                validationStatus={fieldState.error ? 'invalid' : undefined}
                validationText={fieldState.error?.message}
              >
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="post">Post</SelectItem>
              </Select>
            )}
          />
        </fieldset>

        <Flex
          direction={{ mobile: 'column', tablet: 'row' }}
          justifyContent={{ mobile: 'start', tablet: 'end' }}
        >
          <Button
            type="submit"
            variant="emphasis"
            colorScheme="highlight"
            loading={saveStatus === 'saving'}
          >
            Save changes
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

export default ContactDetailsForm;
