import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Playground: Story = {
  render: (
    args: Pick<PaginationProps, 'currentPage' | 'totalPages' | 'condensed' | 'hideSkipButtons'>
  ) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 1);

    return <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />;
  },
};

export const Condensed: Story = {
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
};

export const WithoutSkip: Story = {
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
};

export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Pagination currentPage={currentPage} totalPages={7} onPageChange={setCurrentPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);

    return <Pagination currentPage={currentPage} totalPages={100} onPageChange={setCurrentPage} />;
  },
};

export const EdgeCases: Story = {
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
