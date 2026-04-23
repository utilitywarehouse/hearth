import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactDetailsForm } from './ContactDetailsForm';

// HearthProvider is required for Hearth components.
// In unit tests we mock it with a passthrough wrapper.
vi.mock('@utilitywarehouse/hearth-react', async () => {
  const actual = await vi.importActual('@utilitywarehouse/hearth-react');
  return actual;
});

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
    expect(screen.getByRole('combobox', { name: /preferred contact method/i })).toBeInTheDocument();
  });

  it('renders the save button', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // Required field validation
  // ---------------------------------------------------------------------------

  it('shows required errors for all fields when submitted empty', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a preferred contact method/i)).toBeInTheDocument();
    });

    expect(defaultOnSave).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // Full name validation
  // ---------------------------------------------------------------------------

  it('shows an error when full name is shorter than 2 characters', async () => {
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

  it('accepts a valid full name', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), 'Jane Smith');
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

  it('shows an error for an invalid email format', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/email address/i), 'not-an-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('accepts a valid email address', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(/enter a valid email address/i),
      ).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Phone validation
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

  async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText(/full name/i), 'Jane Smith');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '07700 900000');

    // Open the select and choose "Email"
    await user.click(screen.getByRole('combobox', { name: /preferred contact method/i }));
    await user.click(screen.getByRole('option', { name: /^email$/i }));

    await user.click(screen.getByRole('button', { name: /save changes/i }));
  }

  it('calls onSave with the correct values on valid submission', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    await fillAndSubmit(user);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledOnce();
      expect(onSave).toHaveBeenCalledWith({
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '07700 900000',
        contactMethod: 'email',
      });
    });
  });

  it('shows a success alert after onSave resolves', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    await fillAndSubmit(user);

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

    await fillAndSubmit(user);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i);
    });
  });

  // ---------------------------------------------------------------------------
  // Dismissing alerts
  // ---------------------------------------------------------------------------

  it('dismisses the success alert when its close button is clicked', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactDetailsForm onSave={onSave} />);

    await fillAndSubmit(user);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Pre-populated values
  // ---------------------------------------------------------------------------

  it('pre-populates fields when defaultValues are provided', () => {
    render(
      <ContactDetailsForm
        defaultValues={{
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '07900 112233',
          contactMethod: 'sms',
        }}
        onSave={defaultOnSave}
      />,
    );

    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('07900 112233');
  });

  // ---------------------------------------------------------------------------
  // Accessibility
  // ---------------------------------------------------------------------------

  it('marks invalid fields with aria-invalid', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/phone number/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
