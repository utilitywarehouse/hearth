import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from '@utilitywarehouse/hearth-react';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Stories / Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `Pagination` component to help users navigate through multiple pages of content.',
      },
    },
  },
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
  render: args => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
            Near start (page 2 of 100):
          </p>
          <Pagination
            currentPage={nearStartPage}
            totalPages={100}
            onPageChange={setNearStartPage}
          />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
            In middle (page 50 of 100):
          </p>
          <Pagination currentPage={middlePage} totalPages={100} onPageChange={setMiddlePage} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
            Near end (page 98 of 100):
          </p>
          <Pagination currentPage={nearEndPage} totalPages={100} onPageChange={setNearEndPage} />
        </div>
      </div>
    );
  },
};
