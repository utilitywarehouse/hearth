import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactDetailsForm } from './ContactDetailsForm';

const defaultOnSave = vi.fn();

function renderForm(onSave = defaultOnSave) {
  return render(<ContactDetailsForm onSave={onSave} />);
}

describe('ContactDetailsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  it('renders all four fields', () => {
    renderForm();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /preferred contact method/i }),
    ).toBeInTheDocument();
  });

  it('renders the Save changes button', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('pre-populates fields when defaultValues are provided', () => {
    render(
      <ContactDetailsForm
        defaultValues={{
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          phone: '07700 900000',
          contactMethod: 'email',
        }}
        onSave={defaultOnSave}
      />,
    );

    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Doe');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('jane@example.com');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('07700 900000');
  });

  // ---------------------------------------------------------------------------
  // Required field validation on submit
  // ---------------------------------------------------------------------------

  it('shows required-field errors for all fields when the form is submitted empty', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/please select a preferred contact method/i),
      ).toBeInTheDocument();
    });

    expect(defaultOnSave).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // Full name validation
  // ---------------------------------------------------------------------------

  it('shows an error when full name is a single character', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), 'A');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/full name must be at least 2 characters/i),
      ).toBeInTheDocument();
    });
  });

  it('clears the full name error once a valid name is entered', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), 'Jo');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(/full name must be at least 2 characters/i),
      ).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Email validation
  // ---------------------------------------------------------------------------

  it('shows an error for a malformed email address', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/email address/i), 'bad-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('accepts a well-formed email address', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/email address/i), 'user@example.com');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(/enter a valid email address/i),
      ).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Phone number validation
  // ---------------------------------------------------------------------------

  it('shows an error for a non-UK phone number', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/phone number/i), '12345');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/enter a valid uk phone number/i),
      ).toBeInTheDocument();
    });
  });

  it('accepts a valid UK mobile number with spaces', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/phone number/i), '07700 900000');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(/enter a valid uk phone number/i),
      ).not.toBeInTheDocument();
    });
  });

  it('accepts a valid UK landline without spaces', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/phone number/i), '02071234567');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(/enter a valid uk phone number/i),
      ).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Successful submission
  // ---------------------------------------------------------------------------

  async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText(/full name/i), 'Jane Smith');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '07700 900000');

    // Open Select dropdown and choose SMS
    await user.click(
      screen.getByRole('combobox', { name: /preferred contact method/i }),
    );
    await user.click(screen.getByRole('option', { name: /^sms$/i }));

    await user.click(screen.getByRole('button', { name: /save changes/i }));
  }

  it('calls onSave with correct values on valid submission', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledOnce();
      expect(onSave).toHaveBeenCalledWith({
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '07700 900000',
        contactMethod: 'sms',
      });
    });
  });

  it('shows a success alert after onSave resolves', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/details saved/i);
    });
  });

  // ---------------------------------------------------------------------------
  // Failed submission
  // ---------------------------------------------------------------------------

  it('shows an error alert when onSave rejects', async () => {
    const onSave = vi.fn().mockRejectedValue(new Error('Network error'));
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i);
    });
  });

  it('does not call onSave when the form has validation errors', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    // Submit without filling anything
    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    });

    expect(onSave).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // Alert dismissal
  // ---------------------------------------------------------------------------

  it('dismisses the success alert when its close button is clicked', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Accessibility
  // ---------------------------------------------------------------------------

  it('marks invalid text fields with aria-invalid after a failed submit', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/phone number/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('does not show validation errors on initial render', () => {
    renderForm();

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/enter a valid/i)).not.toBeInTheDocument();
  });

  it('shows inline errors after a field is blurred with invalid content', async () => {
    const user = userEvent.setup();
    renderForm();

    // Touch only the email field with bad content
    await user.type(screen.getByLabelText(/email address/i), 'nope');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    });

    // Other fields should not show errors yet
    expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/phone number is required/i)).not.toBeInTheDocument();
  });
});
