import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { Pagination } from './Pagination';
import type { PaginationProps } from './Pagination.props';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components / Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    condensed: { control: 'boolean' },
    hideSkipButtons: { control: 'boolean' },
    as: { control: { type: 'radio' }, options: ['nav', 'div'] },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    condensed: false,
    hideSkipButtons: false,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const visiblePages = (canvasElement: HTMLElement) =>
  within(canvasElement)
    .getAllByRole('listitem')
    .map(item => item.textContent);

/** Visual matrix of Pagination props. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
  },
  render: (
    args: Pick<PaginationProps, 'currentPage' | 'totalPages' | 'condensed' | 'hideSkipButtons'>
  ) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 1);

    return (
      <Flex gap="400" direction="column">
        <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          condensed
        />
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          hideSkipButtons
        />
        <Pagination currentPage={currentPage} totalPages={7} onPageChange={setCurrentPage} />
        <Pagination currentPage={currentPage} totalPages={100} onPageChange={setCurrentPage} />
      </Flex>
    );
  },
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
  render: (
    args: Pick<PaginationProps, 'currentPage' | 'totalPages' | 'condensed' | 'hideSkipButtons'>
  ) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 1);

    return <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = (name: string) => canvas.getByRole('button', { name });

    await expect(visiblePages(canvasElement)).toEqual(['1', '2', '3', '4', '5', '...', '10']);
    await expect(button('Go to page 1')).toHaveAttribute('aria-current', 'page');
    await expect(button('Go to first page')).toHaveAttribute('aria-disabled', 'true');
    await expect(button('Go to previous page')).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(button('Go to page 5'));
    await expect(visiblePages(canvasElement)).toEqual(['1', '...', '4', '5', '6', '...', '10']);
    await expect(button('Go to page 5')).toHaveAttribute('aria-current', 'page');

    await userEvent.click(button('Go to last page'));
    await expect(visiblePages(canvasElement)).toEqual(['1', '...', '6', '7', '8', '9', '10']);
    await expect(button('Go to next page')).toHaveAttribute('aria-disabled', 'true');
    await expect(button('Go to last page')).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(button('Go to previous page'));
    await expect(button('Go to page 9')).toHaveAttribute('aria-current', 'page');

    await userEvent.click(button('Go to first page'));
    await expect(button('Go to page 1')).toHaveAttribute('aria-current', 'page');
    (document.activeElement as HTMLElement | null)?.blur();
  },
};

/** Set condensed to show a compact page range with fewer visible page numbers. */
export const Condensed: Story = {
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
  },
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        condensed
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Page 1 of 10')).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: /^Go to page/ })).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Go to next page' }));
    await expect(canvas.getByText('Page 2 of 10')).toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};

/** Set hideSkipButtons to remove the first/last page shortcuts. */
export const WithoutSkip: Story = {
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
  },
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        hideSkipButtons
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.queryByRole('button', { name: 'Go to first page' })
    ).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: 'Go to last page' })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
  },
};

/** With a small totalPages count, every page number is shown without truncation. */
export const FewPages: Story = {
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
  },
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Pagination currentPage={currentPage} totalPages={7} onPageChange={setCurrentPage} />;
  },
  play: async ({ canvasElement }) => {
    await expect(visiblePages(canvasElement)).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  },
};

/** With a large totalPages count, pages are truncated with an ellipsis around the current page. */
export const ManyPages: Story = {
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);

    return <Pagination currentPage={currentPage} totalPages={100} onPageChange={setCurrentPage} />;
  },
};

/** Pagination adapts its truncation near the start, middle, and end of a long page range. */
export const EdgeCases: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    const [nearStartPage, setNearStartPage] = useState(2);
    const [nearEndPage, setNearEndPage] = useState(98);
    const [middlePage, setMiddlePage] = useState(50);

    return (
      <Flex direction="column" gap="400">
        <Flex direction="column" gap="100">
          <BodyText size="sm" color="secondary">
            Near start (page 2 of 100):
          </BodyText>
          <Pagination
            currentPage={nearStartPage}
            totalPages={100}
            onPageChange={setNearStartPage}
          />
        </Flex>
        <Flex direction="column" gap="100">
          <BodyText size="sm" color="secondary">
            In middle (page 50 of 100):
          </BodyText>
          <Pagination currentPage={middlePage} totalPages={100} onPageChange={setMiddlePage} />
        </Flex>
        <Flex direction="column" gap="100">
          <BodyText size="sm" color="secondary">
            Near end (page 98 of 100):
          </BodyText>
          <Pagination currentPage={nearEndPage} totalPages={100} onPageChange={setNearEndPage} />
        </Flex>
      </Flex>
    );
  },
};

const onPaginationFormSubmit = fn();

/** Test-only: Pagination inside a form doesn't submit it, and renders as a named nav landmark. */
export const InsideForm: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onPaginationFormSubmit();
        }}
      >
        <Pagination
          as="nav"
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    onPaginationFormSubmit.mockClear();
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Go to next page' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Go to page 3' }));
    await expect(canvas.getByRole('button', { name: 'Go to page 3' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(onPaginationFormSubmit).not.toHaveBeenCalled();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};
