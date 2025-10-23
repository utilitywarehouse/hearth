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
          <ProgressStep id={'1'} state="completed" />
          <ProgressStep id={'2'} state="completed" />
          <ProgressStep id={'3'} state="active" />
          <ProgressStep id={'4'} state="uncompleted" />
        </ProgressStepper>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'1'} state="completed" />
        </Flex>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'3'} state="active" />
        </Flex>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'5'} state="uncompleted" />
        </Flex>
      </Flex>
    ),
  },
};

export const StepStates: Story = {
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
            <ProgressStep id={'1'} state="uncompleted" />
            <ProgressStep id={'2'} state="uncompleted" />
            <ProgressStep id={'3'} state="uncompleted" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="One Active Step">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} state="active" />
            <ProgressStep id={'2'} state="uncompleted" />
            <ProgressStep id={'3'} state="uncompleted" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="Mixed States">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} state="completed" />
            <ProgressStep id={'2'} state="completed" />
            <ProgressStep id={'3'} state="active" />
            <ProgressStep id={'4'} state="uncompleted" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="All Completed">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} state="completed" />
            <ProgressStep id={'2'} state="completed" />
            <ProgressStep id={'3'} state="completed" />
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
          <ProgressStep id="services-data" state="completed" />
          <ProgressStep id="customer-data" state="completed" />
          <ProgressStep id="shipping-data" state="active" />
          <ProgressStep id="payment-data" state="uncompleted" />
          <ProgressStep id="summary" state="uncompleted" />
        </ProgressStepper>
        <BodyText>Step 3 of 5</BodyText>
      </Flex>
    );
  },
};
