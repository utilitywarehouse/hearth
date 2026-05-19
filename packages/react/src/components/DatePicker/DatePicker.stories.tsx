import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Playground: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
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

export const FormUsage: Story = {
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

export const UsageInModal: Story = {
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
