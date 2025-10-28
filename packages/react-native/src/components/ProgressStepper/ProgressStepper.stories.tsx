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
          <ProgressStep id={'1'} state="complete" />
          <ProgressStep id={'2'} state="complete" />
          <ProgressStep id={'3'} state="active" />
          <ProgressStep id={'4'} state="incomplete" />
        </ProgressStepper>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'1'} state="complete" />
        </Flex>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'3'} state="active" />
        </Flex>
        <Flex direction="row" space="lg" style={{ width: '100%' }}>
          <ProgressStep id={'5'} state="incomplete" />
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
            <ProgressStep id={'1'} state="incomplete" />
            <ProgressStep id={'2'} state="incomplete" />
            <ProgressStep id={'3'} state="incomplete" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="One Active Step">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} state="active" />
            <ProgressStep id={'2'} state="incomplete" />
            <ProgressStep id={'3'} state="incomplete" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="Mixed States">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} state="complete" />
            <ProgressStep id={'2'} state="complete" />
            <ProgressStep id={'3'} state="active" />
            <ProgressStep id={'4'} state="incomplete" />
          </ProgressStepper>
        </VariantTitle>
        <VariantTitle title="All Completed">
          <ProgressStepper {...props}>
            <ProgressStep id={'1'} state="complete" />
            <ProgressStep id={'2'} state="complete" />
            <ProgressStep id={'3'} state="complete" />
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
          <ProgressStep id="services-data" state="complete" />
          <ProgressStep id="customer-data" state="complete" />
          <ProgressStep id="shipping-data" state="active" />
          <ProgressStep id="payment-data" state="incomplete" />
          <ProgressStep id="summary" state="incomplete" />
        </ProgressStepper>
        <BodyText>Step 3 of 5</BodyText>
      </Flex>
    );
  },
};
