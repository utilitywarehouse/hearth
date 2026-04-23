import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@utilitywarehouse/hearth-react';
import { ContactDetailsForm } from './ContactDetailsForm';

const meta: Meta<typeof ContactDetailsForm> = {
  title: 'Components / ContactDetailsForm',
  component: ContactDetailsForm,
} satisfies Meta<typeof ContactDetailsForm>;

export default meta;
type Story = StoryObj<typeof ContactDetailsForm>;

export const Default: Story = {
  render: () => (
    <Box padding="400" maxWidth="640px">
      <ContactDetailsForm
        onSave={async values => {
          await new Promise(r => setTimeout(r, 1000));
          console.log('saved', values);
        }}
      />
    </Box>
  ),
};

export const PrePopulated: Story = {
  render: () => (
    <Box padding="400" maxWidth="640px">
      <ContactDetailsForm
        defaultValues={{
          fullName: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '07700 900000',
          contactMethod: 'email',
        }}
        onSave={async values => {
          await new Promise(r => setTimeout(r, 1000));
          console.log('saved', values);
        }}
      />
    </Box>
  ),
};

export const SaveError: Story = {
  render: () => (
    <Box padding="400" maxWidth="640px">
      <ContactDetailsForm
        defaultValues={{
          fullName: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '07700 900000',
          contactMethod: 'sms',
        }}
        onSave={async () => {
          await new Promise(r => setTimeout(r, 1000));
          throw new Error('Network error');
        }}
      />
    </Box>
  ),
};
