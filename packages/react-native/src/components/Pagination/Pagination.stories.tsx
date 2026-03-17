import { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { Pagination } from './';

const meta = {
  title: 'Stories / Pagination',
  component: Pagination,
  args: {
    currentPage: 1,
    totalPages: 10,
    condensed: false,
    hideSkipButtons: false,
  },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    condensed: { control: 'boolean' },
    hideSkipButtons: { control: 'boolean' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: StoryObj<typeof meta.args>) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />;
  },
};

export const Condensed: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <Pagination
        condensed
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={10}
      />
    );
  },
};

export const WithoutSkipButtons: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);

    return (
      <Pagination
        currentPage={currentPage}
        hideSkipButtons
        onPageChange={setCurrentPage}
        totalPages={10}
      />
    );
  },
};

export const EdgeCases: Story = {
  render: () => {
    const [nearStartPage, setNearStartPage] = useState(2);
    const [middlePage, setMiddlePage] = useState(5);
    const [nearEndPage, setNearEndPage] = useState(9);

    return (
      <Flex direction="column" spacing="lg" style={{ width: '100%', maxWidth: 520 }}>
        <Flex direction="column" spacing="xs">
          <BodyText size="sm">Near start</BodyText>
          <Pagination currentPage={nearStartPage} onPageChange={setNearStartPage} totalPages={10} />
        </Flex>
        <Flex direction="column" spacing="xs">
          <BodyText size="sm">Middle</BodyText>
          <Pagination currentPage={middlePage} onPageChange={setMiddlePage} totalPages={10} />
        </Flex>
        <Flex direction="column" spacing="xs">
          <BodyText size="sm">Near end</BodyText>
          <Pagination currentPage={nearEndPage} onPageChange={setNearEndPage} totalPages={10} />
        </Flex>
      </Flex>
    );
  },
};
