import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BodyText } from '../BodyText/BodyText';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Tab } from './Tab';
import { TabContent } from './TabContent';
import { Tabs } from './Tabs';
import { TabsList } from './TabsList';
import {
  ElectricityMediumIcon,
  BroadbandMediumIcon,
  MobileMediumIcon,
  InsuranceMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';

const sizes = ['md', 'lg'] as const;

const meta: Meta<typeof Tabs> = {
  title: 'Components / Tabs',
  component: Tabs,
  argTypes: {
    size: { control: { type: 'radio' }, options: sizes },
  },
  args: {
    defaultValue: 'account',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  render: args => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="account">Account</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="billing">Billing</Tab>
      </TabsList>
      <TabContent value="account">
        <BodyText>Manage your personal details and preferences.</BodyText>
      </TabContent>
      <TabContent value="security">
        <BodyText>Update your password and security settings.</BodyText>
      </TabContent>
      <TabContent value="billing">
        <BodyText>View invoices and update payment methods.</BodyText>
      </TabContent>
    </Tabs>
  ),
};

export const Sizes: Story = {
  args: {
    size: 'md',
  },
  render: () => (
    <Flex direction="column" gap="400">
      <Tabs size="md" defaultValue="a">
        <TabsList>
          <Tab value="a">Medium A</Tab>
          <Tab value="b">Medium B</Tab>
          <Tab value="c">Medium C</Tab>
        </TabsList>
        <TabContent value="a">
          <BodyText>Medium A panel</BodyText>
        </TabContent>
        <TabContent value="b">
          <BodyText>Medium B panel</BodyText>
        </TabContent>
        <TabContent value="c">
          <BodyText>Medium C panel</BodyText>
        </TabContent>
      </Tabs>

      <Tabs size="lg" defaultValue="a">
        <TabsList>
          <Tab value="a">Large A</Tab>
          <Tab value="b">Large B</Tab>
          <Tab value="c">Large C</Tab>
        </TabsList>
        <TabContent value="a">
          <BodyText>Large A panel</BodyText>
        </TabContent>
        <TabContent value="b">
          <BodyText>Large B panel</BodyText>
        </TabContent>
        <TabContent value="c">
          <BodyText>Large C panel</BodyText>
        </TabContent>
      </Tabs>
    </Flex>
  ),
};

export const WithScrolling: Story = {
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
      <TabContent value="one">
        <BodyText>One panel</BodyText>
      </TabContent>
      <TabContent value="two">
        <BodyText>Two panel</BodyText>
      </TabContent>
      <TabContent value="three">
        <BodyText>Three panel</BodyText>
      </TabContent>
      <TabContent value="four">
        <BodyText>Four panel</BodyText>
      </TabContent>
      <TabContent value="five">
        <BodyText>Five panel</BodyText>
      </TabContent>
      <TabContent value="six">
        <BodyText>Six panel</BodyText>
      </TabContent>
      <TabContent value="seven">
        <BodyText>Seven panel</BodyText>
      </TabContent>
      <TabContent value="eight">
        <BodyText>Eight panel</BodyText>
      </TabContent>
      <TabContent value="nine">
        <BodyText>Nine panel</BodyText>
      </TabContent>
      <TabContent value="ten">
        <BodyText>Ten panel</BodyText>
      </TabContent>
      <TabContent value="eleven">
        <BodyText>Eleven panel</BodyText>
      </TabContent>
      <TabContent value="twelve">
        <BodyText>Twelve panel</BodyText>
      </TabContent>
      <TabContent value="thirteen">
        <BodyText>Thirteen panel</BodyText>
      </TabContent>
      <TabContent value="fourteen">
        <BodyText>Fourteen panel</BodyText>
      </TabContent>
      <TabContent value="fifteen">
        <BodyText>Fifteen panel</BodyText>
      </TabContent>
      <TabContent value="sixteen">
        <BodyText>Sixteen panel</BodyText>
      </TabContent>
      <TabContent value="seventeen">
        <BodyText>Seventeen panel</BodyText>
      </TabContent>
      <TabContent value="eighteen">
        <BodyText>Eighteen panel</BodyText>
      </TabContent>
      <TabContent value="nineteen">
        <BodyText>Nineteen panel</BodyText>
      </TabContent>
      <TabContent value="twenty">
        <BodyText>Twenty panel</BodyText>
      </TabContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="one">
      <TabsList>
        <Tab value="one">
          <ElectricityMediumIcon /> Energy
        </Tab>
        <Tab value="two">
          <BroadbandMediumIcon /> Broadband
        </Tab>
        <Tab value="three">
          <MobileMediumIcon /> Mobile
        </Tab>
        <Tab value="four">
          <InsuranceMediumIcon /> Insurance
        </Tab>
      </TabsList>
      <TabContent value="one">
        <BodyText>One panel</BodyText>
      </TabContent>
      <TabContent value="two">
        <BodyText>Two panel</BodyText>
      </TabContent>
      <TabContent value="three">
        <BodyText>Three panel</BodyText>
      </TabContent>
      <TabContent value="four">
        <BodyText>Four panel</BodyText>
      </TabContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('account');
    const tabs = ['account', 'billing', 'usage'] as const;
    const next = () => {
      const index = tabs.indexOf(value as (typeof tabs)[number]);
      const nextIndex = (index + 1) % tabs.length;
      setValue(tabs[nextIndex]!);
    };
    return (
      <Flex direction="row" gap="400" alignItems="center">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <Tab value="account">Account</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="usage">Usage</Tab>
          </TabsList>
          <TabContent value="account">
            <BodyText>Account content</BodyText>
          </TabContent>
          <TabContent value="billing">
            <BodyText>Billing content</BodyText>
          </TabContent>
          <TabContent value="usage">
            <BodyText>Usage metrics content</BodyText>
          </TabContent>
        </Tabs>
        <Button onClick={next}>Next Tab</Button>
      </Flex>
    );
  },
};
