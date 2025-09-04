import { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText, Tab, TabPanel, Tabs, TabsList } from '../';

const meta = {
  title: 'Stories / Tabs',
  component: Tabs,
  args: {
    size: 'md',
    children: undefined,
  },
  argTypes: {
    size: { control: 'radio', options: ['md', 'lg'] },
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
        <Tab value="usage">Usage</Tab>
        <Tab value="settings">Settings</Tab>
        <Tab value="security">Security</Tab>
      </>
    ),
  },
  render: ({ children, ...args }) => (
    <Tabs {...args} defaultValue="account">
      <TabsList>{children}</TabsList>
      <TabPanel value="account">
        <BodyText>Account content</BodyText>
      </TabPanel>
      <TabPanel value="billing">
        <BodyText>Billing content</BodyText>
      </TabPanel>
      <TabPanel value="usage">
        <BodyText>Usage metrics</BodyText>
      </TabPanel>
    </Tabs>
  ),
};

// Vertical story removed

export const Sizes: Story = {
  args: { children: null },
  render: () => (
    <>
      <Tabs size="md" defaultValue="a">
        <TabsList>
          <Tab value="a">Medium A</Tab>
          <Tab value="b">Medium B</Tab>
          <Tab value="c">Medium C</Tab>
        </TabsList>
        <TabPanel value="a">
          <BodyText>Medium A panel</BodyText>
        </TabPanel>
        <TabPanel value="b">
          <BodyText>Medium B panel</BodyText>
        </TabPanel>
        <TabPanel value="c">
          <BodyText>Medium C panel</BodyText>
        </TabPanel>
      </Tabs>
      <Tabs size="lg" defaultValue="a" style={{ marginTop: 24 }}>
        <TabsList>
          <Tab value="a">Large A</Tab>
          <Tab value="b">Large B</Tab>
          <Tab value="c">Large C</Tab>
        </TabsList>
        <TabPanel value="a">
          <BodyText>Large A panel</BodyText>
        </TabPanel>
        <TabPanel value="b">
          <BodyText>Large B panel</BodyText>
        </TabPanel>
        <TabPanel value="c">
          <BodyText>Large C panel</BodyText>
        </TabPanel>
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
