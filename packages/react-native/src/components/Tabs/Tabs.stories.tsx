import { Meta, StoryObj } from '@storybook/react-vite';
import {
  BroadbandMediumIcon,
  ElectricityMediumIcon,
  InsuranceMediumIcon,
  MobileMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { Platform } from 'react-native';
import { BodyText, Button, Flex, Tab, TabPanel, Tabs, TabsList } from '../';

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
      <TabPanel value="settings">
        <BodyText>Settings content</BodyText>
      </TabPanel>
    </Tabs>
  ),
};

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

export const WithScrolling: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="one">
      <TabsList>
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
        <Tab value="three">Three</Tab>
        <Tab value="four">Four</Tab>
        <Tab value="five">Five</Tab>
        <Tab value="six">Six</Tab>
        <Tab value="seven">Seven</Tab>
        <Tab value="eight">Eight</Tab>
        <Tab value="nine">Nine</Tab>
        <Tab value="ten">Ten</Tab>
        <Tab value="eleven">Eleven</Tab>
        <Tab value="twelve">Twelve</Tab>
        <Tab value="thirteen">Thirteen</Tab>
        <Tab value="fourteen">Fourteen</Tab>
        <Tab value="fifteen">Fifteen</Tab>
        <Tab value="sixteen">Sixteen</Tab>
        <Tab value="seventeen">Seventeen</Tab>
        <Tab value="eighteen">Eighteen</Tab>
        <Tab value="nineteen">Nineteen</Tab>
        <Tab value="twenty">Twenty</Tab>
      </TabsList>
      <TabPanel value="one">
        <BodyText>One panel</BodyText>
      </TabPanel>
      <TabPanel value="two">
        <BodyText>Two panel</BodyText>
      </TabPanel>
      <TabPanel value="three">
        <BodyText>Three panel</BodyText>
      </TabPanel>
      <TabPanel value="four">
        <BodyText>Four panel</BodyText>
      </TabPanel>
      <TabPanel value="five">
        <BodyText>Five panel</BodyText>
      </TabPanel>
      <TabPanel value="six">
        <BodyText>Six panel</BodyText>
      </TabPanel>
      <TabPanel value="seven">
        <BodyText>Seven panel</BodyText>
      </TabPanel>
      <TabPanel value="eight">
        <BodyText>Eight panel</BodyText>
      </TabPanel>
      <TabPanel value="nine">
        <BodyText>Nine panel</BodyText>
      </TabPanel>
      <TabPanel value="ten">
        <BodyText>Ten panel</BodyText>
      </TabPanel>
      <TabPanel value="eleven">
        <BodyText>Eleven panel</BodyText>
      </TabPanel>
      <TabPanel value="twelve">
        <BodyText>Twelve panel</BodyText>
      </TabPanel>
      <TabPanel value="thirteen">
        <BodyText>Thirteen panel</BodyText>
      </TabPanel>
      <TabPanel value="fourteen">
        <BodyText>Fourteen panel</BodyText>
      </TabPanel>
      <TabPanel value="fifteen">
        <BodyText>Fifteen panel</BodyText>
      </TabPanel>
      <TabPanel value="sixteen">
        <BodyText>Sixteen panel</BodyText>
      </TabPanel>
      <TabPanel value="seventeen">
        <BodyText>Seventeen panel</BodyText>
      </TabPanel>
      <TabPanel value="eighteen">
        <BodyText>Eighteen panel</BodyText>
      </TabPanel>
      <TabPanel value="nineteen">
        <BodyText>Nineteen panel</BodyText>
      </TabPanel>
      <TabPanel value="twenty">
        <BodyText>Twenty panel</BodyText>
      </TabPanel>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="one">
      <TabsList>
        <Tab value="one" icon={ElectricityMediumIcon}>
          Energy
        </Tab>
        <Tab value="two" icon={BroadbandMediumIcon}>
          Broadband
        </Tab>
        <Tab value="three" icon={MobileMediumIcon}>
          Mobile
        </Tab>
        <Tab value="four" icon={InsuranceMediumIcon}>
          Insurance
        </Tab>
      </TabsList>
      <TabPanel value="one">
        <BodyText>One panel</BodyText>
      </TabPanel>
      <TabPanel value="two">
        <BodyText>Two panel</BodyText>
      </TabPanel>
      <TabPanel value="three">
        <BodyText>Three panel</BodyText>
      </TabPanel>
      <TabPanel value="four">
        <BodyText>Four panel</BodyText>
      </TabPanel>
    </Tabs>
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

export const Controlled: Story = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState('account');
    const nextTab = () => {
      const tabs = ['account', 'billing', 'usage'];
      const currentIndex = tabs.indexOf(value);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setValue(tabs[nextIndex]);
    };
    return (
      <Flex align={Platform.OS === 'web' ? 'flex-start' : 'stretch'} space="lg">
        <Tabs value={value}>
          <TabsList>
            <Tab value="account">Account</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="usage">Usage</Tab>
          </TabsList>
          <TabPanel value="account">
            <BodyText>Account content</BodyText>
          </TabPanel>
          <TabPanel value="billing">
            <BodyText>Billing content</BodyText>
          </TabPanel>
          <TabPanel value="usage">
            <BodyText>Usage metrics content</BodyText>
          </TabPanel>
        </Tabs>

        <Button onPress={nextTab}>Next Tab</Button>
      </Flex>
    );
  },
};
