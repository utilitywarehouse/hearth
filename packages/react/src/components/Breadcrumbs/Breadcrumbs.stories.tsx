import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { BreadcrumbItem } from './BreadcrumbItem';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components / Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Kitchen sink covers all variations so we don't need a Gallery story
export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    return (
      <Flex direction="column">
        <Flex padding="400">
          <Breadcrumbs>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#" currentPage>
              Current page
            </BreadcrumbItem>
          </Breadcrumbs>
        </Flex>
        <Flex backgroundColor="brand" padding="400">
          <Breadcrumbs inverted>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#">Page</BreadcrumbItem>
            <BreadcrumbItem href="#" currentPage>
              Current page
            </BreadcrumbItem>
          </Breadcrumbs>
        </Flex>
      </Flex>
    );
  },
};
