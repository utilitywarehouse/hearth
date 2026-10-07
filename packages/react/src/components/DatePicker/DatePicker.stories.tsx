import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Modal } from '../Modal/Modal';
import { ModalClose } from '../Modal/ModalClose';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalRoot } from '../Modal/ModalRoot';
import { ModalTrigger } from '../Modal/ModalTrigger';
import { DatePicker } from './DatePicker';
import { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components / DatePicker',
  component: DatePicker,
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    disableTodayIndicator: { control: { type: 'boolean' } },
  },
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
    disableTodayIndicator: false,
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        {...args}
      />
    );
  },
};

/** Opens the calendar popover on load — used for Chromatic snapshot testing of the expanded state. */
export const WithCalendarDisplayed: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 0, 15));
    return (
      <Flex direction="column" gap="400">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          data-testid="open-datepicker"
          {...args}
        />
      </Flex>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
    await screen.findByRole('button', { name: /January 2024/ });
    trigger.blur();
  },
};

/** Use DatePicker inside a native form element. */
export const FormUsage: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    return (
      <form>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          {...args}
        />
      </form>
    );
  },
};

/** Use DatePicker fields inside a Modal to select a date range. */
export const UsageInModal: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>();
    const [selectedToDate, setSelectedToDate] = useState<Date | null>();
    return (
      <Flex>
        <ModalRoot>
          <ModalTrigger>
            <Button>Trends date range</Button>
          </ModalTrigger>
          <Modal heading="Trends date range">
            <Flex direction="column" spacing="xl">
              <DatePicker
                label="From"
                helperText="Earliest: 01/2017"
                required
                selected={selectedFromDate}
                onChange={(date: Date | null) => setSelectedFromDate(date)}
              />
              <DatePicker
                label="To"
                helperText="Latest: 12/2025"
                required
                selected={selectedToDate}
                onChange={(date: Date | null) => setSelectedToDate(date)}
              />
            </Flex>
            <ModalFooter>
              <ModalClose>
                <Button variant="ghost" colorScheme="functional">
                  Cancel
                </Button>
              </ModalClose>
              <ModalClose>
                <Button variant="solid" colorScheme="highlight">
                  Apply
                </Button>
              </ModalClose>
            </ModalFooter>
          </Modal>
        </ModalRoot>
      </Flex>
    );
  },
};

/** Test-only: date format, week start, and cycling between the days, months and years views. */
export const ViewNavigation: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 0, 15));
    return (
      <DatePicker
        {...args}
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /^Label/ });

    await expect(trigger).toHaveTextContent('15/01/2024');

    await userEvent.click(trigger);
    const header = await screen.findByRole('button', { name: /January 2024/ });
    const dayNames = document.querySelectorAll('.react-datepicker__day-name');
    await expect(dayNames[0]).toHaveTextContent('M');
    await expect(screen.getByRole('button', { name: 'previous month' })).toBeInTheDocument();

    await userEvent.click(header);
    const yearHeader = await screen.findByRole('button', { name: /^2024/ });
    await expect(screen.queryByRole('button', { name: /previous/ })).not.toBeInTheDocument();

    await userEvent.click(yearHeader);
    await screen.findByRole('button', { name: 'previous year' });
    await userEvent.click(screen.getByText('2023'));
    await screen.findByRole('button', { name: /^2023/ });

    await userEvent.click(screen.getByText('Mar'));
    await screen.findByRole('button', { name: /March 2023/ });

    await userEvent.click(screen.getByRole('button', { name: /^March 2023/ }));
    await screen.findByRole('button', { name: /^2023/ });
    await userEvent.click(canvasElement);
    await waitFor(() =>
      expect(document.querySelector('.react-datepicker__month-container')).not.toBeInTheDocument()
    );

    await userEvent.click(trigger);
    await screen.findByRole('button', { name: /March 2023/ });
    trigger.blur();
  },
};

/** Test-only: a disabled DatePicker stays focusable but doesn't open, and hides validation text. */
export const DisabledState: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  args: { disabled: true, validationStatus: 'invalid', validationText: 'Disabled error' },
  render: args => <DatePicker {...args} selected={null} onChange={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /^Label/ });

    await expect(trigger).toHaveAttribute('aria-disabled', 'true');
    await expect(trigger).not.toBeDisabled();
    await expect(trigger).toHaveTextContent('DD/MM/YYYY');
    await expect(trigger).not.toHaveAttribute('aria-invalid');
    await expect(canvas.queryByText('Disabled error')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    await expect(
      document.querySelector('.react-datepicker__month-container')
    ).not.toBeInTheDocument();
    trigger.blur();
  },
};
