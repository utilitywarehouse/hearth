import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { CardInteraction } from '../Card/CardInteraction';
import { Container } from '../Container/Container';
import { DetailText } from '../DetailText/DetailText';
import { Flex } from '../Flex/Flex';
import { Grid } from '../Grid/Grid';
import { Heading } from '../Heading/Heading';
import { InlineLink } from '../InlineLink/InlineLink';
import { ToggleGroup } from '../ToggleGroup/ToggleGroup';
import { ToggleButtonCard } from './ToggleButtonCard';
import { useState } from 'react';
import { Placeholder } from '../../../docs/storybook-components/Placeholder';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components / ToggleButtonCard',
  component: ToggleGroup,
  argTypes: {
    type: { control: { type: 'radio' }, options: ['multiple', 'single'] },
  },
  args: {
    type: 'multiple',
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Playground: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: args => {
    const [value, setValue] = useState<string>('fixed');
    return (
      <Box maxWidth="750px">
        <ToggleGroup
          {...args}
          gap="300"
          type="single"
          value={value}
          direction={{ mobile: 'column', tablet: 'row' }}
          onValueChange={(value: string) => {
            if (value) setValue(value);
          }}
        >
          <ToggleButtonCard
            value="fixed"
            label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
            aria-labelledby="fixed-label fixed-secondary-label"
            aria-describedby="fixed-description"
          >
            <Flex direction="column" gap="200">
              <Heading id="fixed-label" size="md">
                Fixed
              </Heading>
              <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£163.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText id="fixed-description" as="p" size="md">
                Your energy rates will stay the same until December 2025
              </BodyText>
            </Flex>
          </ToggleButtonCard>
          <ToggleButtonCard
            value="variable"
            label={value === 'variable' ? 'Selected plan' : 'Select plan'}
            aria-labelledby="variable-label variable-secondary-label"
            aria-describedby="variable-description"
          >
            <Flex direction="column" gap="200">
              <Heading id="variable-label" size="md">
                Variable
              </Heading>
              <Flex id="variable-secondary-label" direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£153.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText id="variable-description" as="p" size="md">
                Your energy rates will stay the same until December 2025
              </BodyText>
            </Flex>
          </ToggleButtonCard>
        </ToggleGroup>
      </Box>
    );
  },
};

export const Single: Story = {
  render: args => {
    return (
      <ToggleGroup {...args} type="single" gap="200">
        {['One', 'Two', 'Three', 'Four'].map((label, value) => (
          <ToggleButtonCard key={value} value={`${value}`} label={label} aria-labelledby="">
            <Placeholder
              borderColor="subtle"
              backgroundColor="primary"
              width="100%"
              height="50px"
            />
          </ToggleButtonCard>
        ))}
      </ToggleGroup>
    );
  },
};

export const Multiple: Story = {
  render: args => {
    return (
      <ToggleGroup {...args} type="multiple" gap="200">
        {['One', 'Two', 'Three', 'Four'].map((label, value) => (
          <ToggleButtonCard key={value} value={`${value}`} label={label} aria-labelledby="">
            <Placeholder
              borderColor="subtle"
              backgroundColor="primary"
              width="100%"
              height="50px"
            />
          </ToggleButtonCard>
        ))}
      </ToggleGroup>
    );
  },
};

export const SingleWithOneAlwaysSelected: Story = {
  render: args => {
    const [value, setValue] = useState('2');
    return (
      <ToggleGroup
        {...args}
        type="single"
        gap="200"
        value={value}
        onValueChange={(value: string) => {
          if (value) setValue(value);
        }}
      >
        {['One', 'Two', 'Three', 'Four'].map((label, value) => (
          <ToggleButtonCard key={value} value={`${value}`} label={label} aria-labelledby="">
            <Placeholder
              borderColor="subtle"
              backgroundColor="primary"
              width="120px"
              height="50px"
            />
          </ToggleButtonCard>
        ))}
      </ToggleGroup>
    );
  },
};

export const StartAligned: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: args => {
    const [value, setValue] = useState<string>('fixed');
    return (
      <Box width="750px">
        <ToggleGroup
          {...args}
          gap="300"
          direction="column"
          type="single"
          value={value}
          onValueChange={(value: string) => {
            if (value) setValue(value);
          }}
        >
          <ToggleButtonCard
            value="fixed"
            label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
            aria-labelledby="fixed-label fixed-secondary-label"
            aria-describedby="fixed-description"
            alignItems="start"
          >
            <Flex direction="column" gap="200">
              <Heading id="fixed-label" size="md">
                Fixed
              </Heading>
              <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£163.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText id="fixed-description" as="p" size="md">
                Your energy rates will stay the same until December 2025
              </BodyText>
            </Flex>
          </ToggleButtonCard>
          <ToggleButtonCard
            value="variable"
            label={value === 'variable' ? 'Selected plan' : 'Select plan'}
            aria-labelledby="variable-label variable-secondary-label"
            aria-describedby="variable-description"
            alignItems="start"
          >
            <Flex direction="column" gap="200">
              <Heading id="variable-label" size="md">
                Variable
              </Heading>
              <Flex id="variable-secondary-label" direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£153.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText id="variable-description" as="p" size="md">
                Your energy rates will stay the same until December 2025
              </BodyText>
            </Flex>
          </ToggleButtonCard>
        </ToggleGroup>
      </Box>
    );
  },
};

export const InteractiveContent: Story = {
  render: args => {
    const [value, setValue] = useState<string>('fixed');
    return (
      <Box width="750px">
        <ToggleGroup
          {...args}
          gap="300"
          type="single"
          value={value}
          onValueChange={(value: string) => {
            if (value) setValue(value);
          }}
        >
          <ToggleButtonCard
            value="fixed"
            label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
            aria-labelledby="fixed-label fixed-secondary-label"
            aria-describedby="fixed-description"
          >
            <Flex direction="column" gap="200">
              <Heading id="fixed-label" size="md">
                Fixed
              </Heading>
              <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£163.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText id="fixed-description" as="p" size="md">
                Your energy rates will stay the same until December 2025
              </BodyText>
              <CardInteraction secondary>
                <Button variant="ghost" size="sm" paddingNone>
                  Tariff price breakdown
                  <ChevronRightSmallIcon />
                </Button>
              </CardInteraction>
            </Flex>
          </ToggleButtonCard>
          <ToggleButtonCard
            value="variable"
            label={value === 'variable' ? 'Selected plan' : 'Select plan'}
            aria-labelledby="variable-label variable-secondary-label"
            aria-describedby="variable-description"
          >
            <Flex direction="column" gap="200">
              <Heading id="variable-label" size="md">
                Variable
              </Heading>
              <Flex id="variable-secondary-label" direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£153.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText id="variable-description" as="p" size="md">
                Your energy rates will stay the same until December 2025.{' '}
                <CardInteraction secondary asChild>
                  <InlineLink href="/tariff-price-breakdown">Tariff price breakdown</InlineLink>
                </CardInteraction>
              </BodyText>
            </Flex>
          </ToggleButtonCard>
        </ToggleGroup>
      </Box>
    );
  },
};

export const LayoutExample: Story = {
  render: args => {
    const [value, setValue] = useState<string>('fixed');
    return (
      <Container>
        <Grid defaultResponsiveColumns>
          <ToggleGroup
            gridColumnSpan="8"
            {...args}
            gap="300"
            type="single"
            value={value}
            onValueChange={(value: string) => {
              if (value) setValue(value);
            }}
          >
            <ToggleButtonCard
              value="fixed"
              label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
              aria-labelledby="fixed-label fixed-secondary-label"
              aria-describedby="fixed-description"
            >
              <Flex direction="column" gap="200">
                <Heading id="fixed-label" size="md" as="h2">
                  Off-peak Saver
                </Heading>
                <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
                  <DetailText size="3xl">£6.50</DetailText>
                  <BodyText size="md" color="secondary" as="span">
                    a month
                  </BodyText>
                </Flex>
                <BodyText id="fixed-description" as="p" size="md">
                  Unlimited free calls (up to 75 mins) to UK numbers from 7pm-7am and weekends
                </BodyText>
              </Flex>
            </ToggleButtonCard>
            <ToggleButtonCard
              value="variable"
              label={value === 'variable' ? 'Selected plan' : 'Select plan'}
              aria-labelledby="variable-label variable-secondary-label"
              aria-describedby="variable-description"
            >
              <Flex direction="column" gap="200">
                <Heading id="variable-label" size="md" as="h2">
                  Peak Saver
                </Heading>
                <Flex id="variable-secondary-label" direction="row" gap="100" alignItems="baseline">
                  <DetailText size="3xl">£13.00</DetailText>
                  <BodyText size="md" color="secondary" as="span">
                    a month
                  </BodyText>
                </Flex>
                <BodyText id="variable-description" as="p" size="md">
                  Unlimited free calls (up to 75 mins) to UK numbers anytime
                </BodyText>
              </Flex>
            </ToggleButtonCard>
          </ToggleGroup>
        </Grid>
      </Container>
    );
  },
};

export const ResponsiveDirection: Story = {
  render: args => {
    return (
      <ToggleGroup
        {...args}
        type="single"
        gap="200"
        direction={{ mobile: 'column', tablet: 'row' }}
      >
        {['One', 'Two', 'Three', 'Four'].map((label, value) => (
          <ToggleButtonCard key={value} value={`${value}`} label={label} aria-labelledby="">
            <Placeholder
              borderColor="subtle"
              backgroundColor="primary"
              width="100%"
              height="100px"
            />
          </ToggleButtonCard>
        ))}
      </ToggleGroup>
    );
  },
};
