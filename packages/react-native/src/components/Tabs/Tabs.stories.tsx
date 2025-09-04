import { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Tab, TabPanel, Tabs, TabsList } from '../';

const meta = {
  title: 'Stories / Tabs',
  component: Tabs,
  args: {
    size: 'md',
    children: undefined,
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <Tab value="account">Account</Tab>
        <Tab value="billing">Billing</Tab>
        <Tab
          value="usage"
          badge={
            <Badge size="sm" variant="subtle" colorScheme="info">
              3
            </Badge>
          }
        >
          Usage
        </Tab>
      </>
    ),
  },
  render: ({ children, ...args }) => (
    <Tabs {...args} defaultValue="account">
      <TabsList>{children}</TabsList>
      <TabPanel value="account">Account content</TabPanel>
      <TabPanel value="billing">Billing content</TabPanel>
      <TabPanel value="usage">Usage metrics</TabPanel>
    </Tabs>
  ),
};

// Vertical story removed

export const Sizes: Story = {
  args: { children: null },
  render: () => (
    <>
      <Tabs size="sm" defaultValue="a">
        <TabsList>
          <Tab value="a">Small A</Tab>
          <Tab value="b">Small B</Tab>
          <Tab value="c">Small C</Tab>
        </TabsList>
        <TabPanel value="a">Small A panel</TabPanel>
        <TabPanel value="b">Small B panel</TabPanel>
        <TabPanel value="c">Small C panel</TabPanel>
      </Tabs>
      <Tabs size="md" defaultValue="a" style={{ marginTop: 24 }}>
        <TabsList>
          <Tab value="a">Medium A</Tab>
          <Tab value="b">Medium B</Tab>
          <Tab value="c">Medium C</Tab>
        </TabsList>
        <TabPanel value="a">Medium A panel</TabPanel>
        <TabPanel value="b">Medium B panel</TabPanel>
        <TabPanel value="c">Medium C panel</TabPanel>
      </Tabs>
    </>
  ),
};

export const Disabled: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="one" disabled>
      <TabsList>
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
        <Tab value="three">Three</Tab>
      </TabsList>
      <TabPanel value="one">One panel</TabPanel>
      <TabPanel value="two">Two panel</TabPanel>
      <TabPanel value="three">Three panel</TabPanel>
    </Tabs>
  ),
};
