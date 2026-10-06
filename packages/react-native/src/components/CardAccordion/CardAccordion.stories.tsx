import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { BodyText } from '../BodyText';
import { DescriptionList, DescriptionListItem } from '../DescriptionList';
import { CardAccordion, CardAccordionButton, CardAccordionFooter, CardAccordionItem } from '.';
import type { CardAccordionProps } from './CardAccordion.props';

const meta = {
  title: 'Stories / CardAccordion',
  component: CardAccordion,
  parameters: {
    // Moving between steps swaps each Card's variant/colorScheme, which react-native-unistyles
    // animates through a reanimated colour transition that throws a stray `UpdatePropsManager`
    // ReanimatedError on web. All assertions still pass — see UWDS-4922.
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: 'select', options: ['1a', '1b', '1c', '1d'] },
  },
} satisfies Meta<typeof CardAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const Steps = (args: CardAccordionProps) => (
  <View style={{ width: '100%', maxWidth: 600 }}>
    <CardAccordion {...args}>
      <CardAccordionItem
        value="1a"
        title="1a. Your new cover"
        summaryTitle="1a. Your home"
        summaryDescription={
          <DescriptionList>
            <DescriptionListItem heading="Cover type" description="Buildings and contents" />
            <DescriptionListItem heading="Address" description="1 Example Street, London" />
            <DescriptionListItem heading="Start date" description="31/08/2025" />
          </DescriptionList>
        }
      >
        <BodyText>Tell us about the cover you need.</BodyText>
        <CardAccordionFooter>
          <CardAccordionButton action="next" />
        </CardAccordionFooter>
      </CardAccordionItem>
      <CardAccordionItem
        value="1b"
        title="1b. About your property"
        description="Property type, ownership and rooms."
        summaryDescription={
          <DescriptionList>
            <DescriptionListItem heading="Property type" description="Semi-detached house" />
          </DescriptionList>
        }
      >
        <BodyText>Tell us about your property.</BodyText>
        <CardAccordionFooter>
          <CardAccordionButton action="next" />
          <CardAccordionButton action="previous" />
        </CardAccordionFooter>
      </CardAccordionItem>
      <CardAccordionItem
        value="1c"
        title="1c. How your home was built"
        summaryDescription={
          <DescriptionList>
            <DescriptionListItem heading="Year built" description="1930" />
          </DescriptionList>
        }
      >
        <BodyText>Tell us how your home was built.</BodyText>
        <CardAccordionFooter>
          <CardAccordionButton action="previous" />
          <CardAccordionButton action="next" />
        </CardAccordionFooter>
      </CardAccordionItem>
      <CardAccordionItem value="1d" title="1d. Use of your home">
        <BodyText>Tell us who lives in your home.</BodyText>
        <CardAccordionFooter>
          <CardAccordionButton action="previous" />
          <CardAccordionButton action="next">Finish</CardAccordionButton>
        </CardAccordionFooter>
      </CardAccordionItem>
    </CardAccordion>
  </View>
);

export const Playground: Story = {
  args: {
    onValueChange: fn(),
  },
  render: args => <Steps {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // The first step is current by default: only its content and Next button render.
    await expect(canvas.getByText('Tell us about the cover you need.')).toBeInTheDocument();
    await expect(canvas.queryByText('Tell us about your property.')).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();

    // Next completes the step: it collapses to its summary title and an Edit button.
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await waitFor(
      () => await expect(canvas.getByText('Tell us about your property.')).toBeInTheDocument()
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith('1b');
    await expect(canvas.queryByText('Tell us about the cover you need.')).not.toBeInTheDocument();
    await expect(canvas.getByText('1a. Your home')).toBeInTheDocument();
    await expect(canvas.getByText('Buildings and contents')).toBeInTheDocument();

    // Previous renders before Next in reading order, whatever order it's written in.
    const buttons = canvas.getAllByRole('button').map(button => button.textContent);
    await expect(buttons.indexOf('Previous')).toBeLessThan(buttons.indexOf('Next'));

    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await waitFor(
      () => await expect(canvas.getByText('Tell us how your home was built.')).toBeInTheDocument()
    );

    // Previous goes back one step.
    await userEvent.click(canvas.getByRole('button', { name: 'Previous' }));
    await waitFor(
      () => await expect(canvas.getByText('Tell us about your property.')).toBeInTheDocument()
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith('1b');

    // Edit reopens a completed step; its accessible name includes the step heading.
    await userEvent.click(canvas.getByRole('button', { name: 'Edit 1a. Your home' }));
    await waitFor(
      () => await expect(canvas.getByText('Tell us about the cover you need.')).toBeInTheDocument()
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith('1a');
    await expect(canvas.getByText('1a. Your new cover')).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: /^Edit/ })).not.toBeInTheDocument();
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue: '1c',
  },
  render: args => <Steps {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Steps before the default value start completed.
    await expect(canvas.getByText('Tell us how your home was built.')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Edit 1a. Your home' })).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Edit 1b. About your property' })
    ).toBeInTheDocument();
  },
};

const ControlledSteps = () => {
  const [value, setValue] = useState('1b');
  return (
    <View style={{ width: '100%', maxWidth: 600, gap: 16 }}>
      <BodyText>Current step: {value}</BodyText>
      <Steps value={value} onValueChange={setValue} />
    </View>
  );
};

export const Controlled: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => <ControlledSteps />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Current step: 1b')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(canvas.getByText('Current step: 1c')).toBeInTheDocument());
    await expect(canvas.getByText('Tell us how your home was built.')).toBeInTheDocument();
  },
};

const ValidatedSteps = () => {
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);
  return (
    <View style={{ width: '100%', maxWidth: 600 }}>
      <CardAccordion>
        <CardAccordionItem value="terms" title="1. Terms">
          <BodyText>{agreed ? 'Terms accepted.' : 'Accept the terms to continue.'}</BodyText>
          {showError ? <BodyText>You need to accept the terms.</BodyText> : null}
          <CardAccordionFooter>
            <CardAccordionButton
              action="next"
              onPress={event => {
                if (!agreed) {
                  event.preventDefault();
                  setShowError(true);
                  setAgreed(true);
                }
              }}
            />
          </CardAccordionFooter>
        </CardAccordionItem>
        <CardAccordionItem value="details" title="2. Your details">
          <BodyText>Tell us about yourself.</BodyText>
          <CardAccordionFooter>
            <CardAccordionButton action="previous" />
          </CardAccordionFooter>
        </CardAccordionItem>
      </CardAccordion>
    </View>
  );
};

export const Validation: Story = {
  parameters: {
    controls: { include: [] },
    // The press event is passed to `onPress`; stop the actions addon serialising it.
    actions: { disable: true },
  },
  render: () => <ValidatedSteps />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Calling event.preventDefault() in onPress keeps the user on the current step.
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await waitFor(
      () => await expect(canvas.getByText('You need to accept the terms.')).toBeInTheDocument()
    );
    await expect(canvas.queryByText('Tell us about yourself.')).not.toBeInTheDocument();

    // Once valid, Next moves on.
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(canvas.getByText('Tell us about yourself.')).toBeInTheDocument());
  },
};
