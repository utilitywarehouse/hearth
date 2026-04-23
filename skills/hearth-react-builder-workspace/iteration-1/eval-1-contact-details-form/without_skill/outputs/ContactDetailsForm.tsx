'use client';

import { useState } from 'react';
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContactMethod = 'email' | 'sms' | 'post';

export interface ContactDetailsFormValues {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod | '';
}

export interface ContactDetailsFormProps {
  /** Pre-populate the form with existing values. */
  defaultValues?: Partial<ContactDetailsFormValues>;
  /**
   * Called with validated form data when the user submits.
   * Return a Promise — resolve on success, reject on failure.
   */
  onSave: (values: Omit<ContactDetailsFormValues, 'contactMethod'> & { contactMethod: ContactMethod }) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

// UK phone: starts with 0, 10–11 digits total (spaces/hyphens allowed)
const UK_PHONE_RE = /^0[\d\s-]{9,10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  contactMethod?: string;
}

function validate(values: ContactDetailsFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!UK_PHONE_RE.test(values.phone.trim())) {
    errors.phone = 'Enter a valid UK phone number starting with 0';
  }

  if (!values.contactMethod) {
    errors.contactMethod = 'Please select a preferred contact method';
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContactDetailsForm({ defaultValues, onSave }: ContactDetailsFormProps) {
  const [values, setValues] = useState<ContactDetailsFormValues>({
    fullName: defaultValues?.fullName ?? '',
    email: defaultValues?.email ?? '',
    phone: defaultValues?.phone ?? '',
    contactMethod: defaultValues?.contactMethod ?? '',
  });

  // Track which fields have been touched (blurred) so we only show errors after interaction
  const [touched, setTouched] = useState<Partial<Record<keyof ContactDetailsFormValues, boolean>>>(
    {}
  );

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  function handleChange(field: keyof ContactDetailsFormValues, value: string) {
    setValues(prev => ({ ...prev, [field]: value }));
    // Reset save status on any change so the banner doesn't linger
    if (saveStatus === 'success' || saveStatus === 'error') {
      setSaveStatus('idle');
    }
  }

  function handleBlur(field: keyof ContactDetailsFormValues) {
    setTouched(prev => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Mark all fields as touched so all errors are shown on submit
    setTouched({ fullName: true, email: true, phone: true, contactMethod: true });

    if (hasErrors) return;

    setSaveStatus('saving');
    try {
      await onSave(values as Omit<ContactDetailsFormValues, 'contactMethod'> & { contactMethod: ContactMethod });
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    }
  }

  // -------------------------------------------------------------------------
  // Helpers for inline validation display
  // -------------------------------------------------------------------------

  function validationStatus(field: keyof ContactDetailsFormValues) {
    if (!touched[field]) return undefined;
    return errors[field] ? ('invalid' as const) : ('valid' as const);
  }

  function validationText(field: keyof ContactDetailsFormValues) {
    if (!touched[field]) return undefined;
    return errors[field];
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact details form"
      className="contact-details-form"
    >
      <Flex direction="column" gap="500">
        <Heading as="h1" size="lg">
          Contact details
        </Heading>

        {/* Success banner */}
        {saveStatus === 'success' && (
          <Alert
            colorScheme="positive"
            title="Details saved"
            text="Your contact details have been updated successfully."
            onClose={() => setSaveStatus('idle')}
          />
        )}

        {/* Error banner */}
        {saveStatus === 'error' && (
          <Alert
            colorScheme="danger"
            title="Something went wrong"
            text="We could not save your details. Please try again."
            onClose={() => setSaveStatus('idle')}
          />
        )}

        {/* Personal information */}
        <fieldset className="contact-details-form__fieldset">
          <legend className="contact-details-form__legend">
            <Heading as="h2" size="sm">
              Personal information
            </Heading>
          </legend>

          <Flex direction="column" gap="400">
            <TextInput
              label="Full name"
              type="text"
              autoComplete="name"
              required
              value={values.fullName}
              onChange={e => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              validationStatus={validationStatus('fullName')}
              validationText={validationText('fullName')}
            />

            <TextInput
              label="Email address"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={values.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              validationStatus={validationStatus('email')}
              validationText={validationText('email')}
            />

            <TextInput
              label="Phone number"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              helperText="UK numbers only, e.g. 07700 900000"
              value={values.phone}
              onChange={e => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              validationStatus={validationStatus('phone')}
              validationText={validationText('phone')}
            />
          </Flex>
        </fieldset>

        {/* Communication preferences */}
        <fieldset className="contact-details-form__fieldset">
          <legend className="contact-details-form__legend">
            <Heading as="h2" size="sm">
              Communication preferences
            </Heading>
          </legend>

          <Select
            label="Preferred contact method"
            placeholder="Select a method"
            required
            value={values.contactMethod}
            onValueChange={value => {
              handleChange('contactMethod', value);
              handleBlur('contactMethod');
            }}
            validationStatus={validationStatus('contactMethod')}
            validationText={validationText('contactMethod')}
          >
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="post">Post</SelectItem>
          </Select>
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
