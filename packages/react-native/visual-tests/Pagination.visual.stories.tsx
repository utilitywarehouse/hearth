import type { Meta, StoryObj } from '@storybook/react-native';
import { Pagination } from '../src/components/Pagination';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Pagination',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Paginations: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Start">
        <Pagination hideSkipButtons currentPage={1} totalPages={5} onPageChange={noop} />
      </VTRow>
      <VTRow label="Middle">
        <Pagination hideSkipButtons currentPage={3} totalPages={5} onPageChange={noop} />
      </VTRow>
      <VTRow label="End">
        <Pagination hideSkipButtons currentPage={5} totalPages={5} onPageChange={noop} />
      </VTRow>
      <VTRow label="Skip buttons">
        <Pagination currentPage={3} totalPages={5} onPageChange={noop} />
      </VTRow>
      <VTRow label="Condensed start">
        <Pagination condensed currentPage={1} totalPages={10} onPageChange={noop} />
      </VTRow>
      <VTRow label="Condensed middle">
        <Pagination condensed currentPage={5} totalPages={10} onPageChange={noop} />
      </VTRow>
      <VTRow label="Condensed end">
        <Pagination condensed currentPage={10} totalPages={10} onPageChange={noop} />
      </VTRow>
    </VTGrid>
  ),
};
