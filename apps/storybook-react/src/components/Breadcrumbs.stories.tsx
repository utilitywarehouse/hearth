import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, BreadcrumbItem, Flex } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Stories / Breadcrumbs',
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
