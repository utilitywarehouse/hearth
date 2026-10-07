import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { HelperText } from '../HelperText/HelperText';
import { CardAccordion } from './CardAccordion';
import { CardAccordionButton } from './CardAccordionButton';
import { CardAccordionFooter } from './CardAccordionFooter';
import { CardAccordionItem } from './CardAccordionItem';

const meta: Meta<typeof CardAccordion> = {
  title: 'Components / CardAccordion',
  component: CardAccordion,
};

export default meta;
type Story = StoryObj<typeof CardAccordion>;

/** A multi-step example combining CardAccordionItem, CardAccordionFooter, and CardAccordionButton. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
  },
  tags: ['!test'],
  render: () => {
    return (
      <Box width="600px">
        <CardAccordion>
          <CardAccordionItem
            value="1a"
            title="1a. Your new cover"
            summaryTitle="1a. Your home"
            summaryDescription={
              <Flex direction="column" gap="50">
                <HelperText>Your type of cover, address & policy start date.</HelperText>
                <BodyText size="lg">31/08/2025</BodyText>
              </Flex>
            }
          >
            <CardAccordionFooter>
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1b"
            title="1b. About your property"
            summaryDescription={
              <HelperText>
                Details about your property type, ownership, and number of rooms.
              </HelperText>
            }
          >
            <Box>Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="next" />
              <CardAccordionButton action="previous" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1c"
            title="1c. How your home was built"
            summaryDescription={
              <HelperText>Summary of your home’s age and construction.</HelperText>
            }
          >
            <Box>Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="previous" />
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1d"
            title="1d. Use of your home"
            summaryDescription={
              <HelperText>
                Details about who lives in your home and how the property is used.
              </HelperText>
            }
          >
            <Box>Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="previous" />
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
        </CardAccordion>
      </Box>
    );
  },
};

/** Test-only: Next, Previous and Edit move between steps, with summaries shown for previous steps. */
export const StepNavigation: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Box width="600px">
      <CardAccordion>
        <CardAccordionItem
          value="1"
          title="Step 1"
          summaryTitle="Step 1 summary"
          summaryDescription={<HelperText>Step 1 summary description</HelperText>}
        >
          <BodyText>Step 1 content</BodyText>
          <CardAccordionFooter>
            <CardAccordionButton action="next" />
          </CardAccordionFooter>
        </CardAccordionItem>
        <CardAccordionItem value="2" title="Step 2">
          <BodyText>Step 2 content</BodyText>
          <CardAccordionFooter>
            <CardAccordionButton action="previous" />
            <CardAccordionButton action="next" />
          </CardAccordionFooter>
        </CardAccordionItem>
        <CardAccordionItem value="3" title="Step 3">
          <BodyText>Step 3 content</BodyText>
        </CardAccordionItem>
      </CardAccordion>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Step 1 content')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Step 2' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Step 3' })).toBeDisabled();
    await expect(canvas.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(await canvas.findByText('Step 2 content')).toBeVisible();
    await expect(canvas.queryByText('Step 1 content')).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Step 1 summary' })).toBeInTheDocument();
    await expect(canvas.getByText('Step 1 summary description')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Step 2' })).toHaveFocus());

    await userEvent.click(canvas.getByRole('button', { name: 'Previous' }));
    await expect(await canvas.findByText('Step 1 content')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Step 2' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await canvas.findByText('Step 2 content');
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(await canvas.findByText('Step 3 content')).toBeVisible();
    await expect(canvas.getAllByRole('button', { name: 'Edit' })).toHaveLength(2);

    await userEvent.click(canvas.getAllByRole('button', { name: 'Edit' })[0]!);
    await expect(await canvas.findByText('Step 1 content')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Step 2' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Step 3' })).toBeDisabled();
    await expect(canvas.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};
