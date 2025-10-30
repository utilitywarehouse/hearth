import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressStepper, ProgressStep } from '.';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { Heading } from '../Heading';

const meta = {
  title: 'Stories / ProgressStepper',
  component: ProgressStepper,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgressStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: (
      <Flex space="xl" direction="column" align="center" style={{ flex: 1, minWidth: 200 }}>
        <ProgressStepper>
          <ProgressStep id={'1'} status="complete" />
          <ProgressStep id={'2'} status="complete" />
          <ProgressStep id={'3'} status="active" />
          <ProgressStep id={'4'} status="incomplete" />
        </ProgressStepper>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'1'} status="complete" />
        </Flex>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'3'} status="active" />
        </Flex>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'5'} status="incomplete" />
        </Flex>
      </Flex>
    ),
  },
};

export const StepStatuses: Story = {
  args: {
    children: <></>,
  },
  parameters: {
    controls: { exclude: ['space'] },
  },
  render: props => {
    return (
      <Flex space="xl" direction="column" align="center">
        <VariantTitle title="All Uncompleted Steps">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} status="incomplete" />
            <ProgressStep id={'2'} status="incomplete" />
            <ProgressStep id={'3'} status="incomplete" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="One Active Step">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} status="active" />
            <ProgressStep id={'2'} status="incomplete" />
            <ProgressStep id={'3'} status="incomplete" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="Mixed statuss">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} status="complete" />
            <ProgressStep id={'2'} status="complete" />
            <ProgressStep id={'3'} status="active" />
            <ProgressStep id={'4'} status="incomplete" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="All Completed">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} status="complete" />
            <ProgressStep id={'2'} status="complete" />
            <ProgressStep id={'3'} status="complete" />
          </ProgressStepper>
        </VariantTitle>
      </Flex>
    );
  },
};

export const BasicExample: Story = {
  args: {
    children: <></>,
  },
  render: props => {
    return (
      <Flex space="lg" direction="column" align="center">
        <Heading size="md">Progress Stepper</Heading>
        <BodyText>Shows progress through multi-step processes</BodyText>
        <ProgressStepper {...props}>
          <ProgressStep id="services-data" status="complete" />
          <ProgressStep id="customer-data" status="complete" />
          <ProgressStep id="shipping-data" status="active" />
          <ProgressStep id="payment-data" status="incomplete" />
          <ProgressStep id="summary" status="incomplete" />
        </ProgressStepper>
        <BodyText>Step 3 of 5</BodyText>
      </Flex>
    );
  },
};
