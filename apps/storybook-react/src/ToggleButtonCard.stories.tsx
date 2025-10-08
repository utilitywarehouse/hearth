import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ToggleGroup,
  ToggleButtonCard,
  Flex,
  Heading,
  DetailText,
  BodyText,
  Box,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Stories / ToggleButtonCard',
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
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
  render: args => {
    return (
      <Box width="750px">
        <ToggleGroup {...args}>
          <ToggleButtonCard value="fixed">
            <Flex direction="column" gap="200">
              <Heading size="md">Fixed</Heading>
              <Flex direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£163.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText as="p" size="md">
                Your energy rates will stay the same until December 2025
              </BodyText>
            </Flex>
          </ToggleButtonCard>
          <ToggleButtonCard value="variable">
            <Flex direction="column" gap="200">
              <Heading size="md">Variable</Heading>
              <Flex direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">£153.00</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  monthly estimate
                </BodyText>
              </Flex>
              <BodyText as="p" size="md">
                Your energy rates will stay the same until December 2025
              </BodyText>
            </Flex>
          </ToggleButtonCard>
        </ToggleGroup>
      </Box>
    );
  },
  args: {
    gap: '300',
  },
};
