import { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '.';
import { AccordionProps } from './Accordion.props';
import { BodyText } from '../../components';

const meta = {
  title: 'Stories / Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    collapsible: {
      control: 'boolean',
      description: 'Whether the accordion can be collapsed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The type of accordion',
    },
    noPadding: {
      control: 'boolean',
      description: 'Whether the accordion has no horizontal padding',
    },
    contentNoPadding: {
      control: 'boolean',
      description: 'Whether the accordion content has no padding',
    },
  },
  args: {
    collapsible: true,
    disabled: false,
    type: 'multiple',
    noPadding: false,
    contentNoPadding: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderAccordion = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem title="How do I place an order?">
      <AccordionHeader>
        <AccordionTrigger>
          {({ isExpanded }: { isExpanded: boolean }) => {
            return (
              <>
                <AccordionTitleText>How do I place an order?</AccordionTitleText>
                {isExpanded ? (
                  <AccordionIcon as={ChevronUpSmallIcon} />
                ) : (
                  <AccordionIcon as={ChevronDownSmallIcon} />
                )}
              </>
            );
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        <AccordionContentText>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </AccordionContentText>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem>
      <AccordionHeader>
        <AccordionTrigger>
          {({ isExpanded }: { isExpanded: boolean }) => {
            return (
              <>
                <AccordionTitleText>What payment methods do you accept?</AccordionTitleText>
                {isExpanded ? (
                  <AccordionIcon as={ChevronUpSmallIcon} />
                ) : (
                  <AccordionIcon as={ChevronDownSmallIcon} />
                )}
              </>
            );
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        <AccordionContentText>
          We accept all major credit cards, PayPal, and bank transfers.
        </AccordionContentText>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem title="What is your return policy?">
      <BodyText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, voluptatibus.
      </BodyText>
    </AccordionItem>
  </Accordion>
);

export const Playground: Story = {
  render: args => renderAccordion(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const orderTrigger = await canvas.findByRole('button', { name: /how do i place an order/i });
    const paymentTrigger = await canvas.findByRole('button', {
      name: /what payment methods do you accept/i,
    });

    // Initially collapsed.
    expect(orderTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(paymentTrigger).toHaveAttribute('aria-expanded', 'false');

    // Pressing a trigger expands its content.
    await userEvent.click(orderTrigger);
    await waitFor(() => expect(orderTrigger).toHaveAttribute('aria-expanded', 'true'));
    expect(
      canvas.getByText('Lorem ipsum dolor sit amet consectetur, adipisicing elit.')
    ).toBeInTheDocument();

    // type="multiple" (the default): expanding a second item does not collapse the first.
    await userEvent.click(paymentTrigger);
    await waitFor(() => expect(paymentTrigger).toHaveAttribute('aria-expanded', 'true'));
    expect(orderTrigger).toHaveAttribute('aria-expanded', 'true');

    // collapsible (default true): clicking an expanded trigger collapses it again,
    // independently of any other currently-expanded item.
    await userEvent.click(orderTrigger);
    await waitFor(() => expect(orderTrigger).toHaveAttribute('aria-expanded', 'false'));
    expect(paymentTrigger).toHaveAttribute('aria-expanded', 'true');
  },
};

export const SingleSelect: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: args => renderAccordion(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const orderTrigger = await canvas.findByRole('button', { name: /how do i place an order/i });
    const paymentTrigger = await canvas.findByRole('button', {
      name: /what payment methods do you accept/i,
    });

    await userEvent.click(orderTrigger);
    await waitFor(() => expect(orderTrigger).toHaveAttribute('aria-expanded', 'true'));

    // type="single": expanding a different item automatically collapses the
    // previously-expanded one.
    await userEvent.click(paymentTrigger);
    await waitFor(() => expect(paymentTrigger).toHaveAttribute('aria-expanded', 'true'));
    expect(orderTrigger).toHaveAttribute('aria-expanded', 'false');

    // collapsible (true): clicking the currently-expanded item again collapses it.
    await userEvent.click(paymentTrigger);
    await waitFor(() => expect(paymentTrigger).toHaveAttribute('aria-expanded', 'false'));
  },
};

export const SingleNotCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: false,
  },
  render: args => renderAccordion(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const orderTrigger = await canvas.findByRole('button', { name: /how do i place an order/i });

    await userEvent.click(orderTrigger);
    await waitFor(() => expect(orderTrigger).toHaveAttribute('aria-expanded', 'true'));

    // collapsible={false}: clicking the already-expanded trigger again does not
    // collapse it back.
    await userEvent.click(orderTrigger);
    await waitFor(() => expect(orderTrigger).toHaveAttribute('aria-expanded', 'true'));
  },
};
