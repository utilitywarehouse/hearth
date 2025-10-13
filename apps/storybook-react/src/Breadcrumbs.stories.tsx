import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, BreadcrumbItem } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Stories / Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `Breadcrumbs` component when you need to help users understand and move between multiple levels of a website.',
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Playground: Story = {
  render: () => {
    return (
      <Breadcrumbs>
        <BreadcrumbItem href="#">Page</BreadcrumbItem>
        <BreadcrumbItem href="#">Page</BreadcrumbItem>
        <BreadcrumbItem href="#">Page</BreadcrumbItem>
        <BreadcrumbItem href="#">Page</BreadcrumbItem>
        <BreadcrumbItem href="#" currentPage>
          Current page
        </BreadcrumbItem>
      </Breadcrumbs>
    );
  },
};
