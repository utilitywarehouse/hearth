import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressBarLinear,
  ProgressBarLabel,
  ProgressBarValue,
  Flex,
  BodyText,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof ProgressBarLinear> = {
  title: 'Stories / ProgressBarLinear',
  component: ProgressBarLinear,
  parameters: {
    docs: {
      description: {
        component:
          '`ProgressBarLinear` displays the progress of a task or process in a linear bar format, with support for different visual states.',
      },
    },
  },
  argTypes: {
    colorScheme: { control: { type: 'radio' }, options: ['default', 'success', 'danger'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    colorScheme: 'default',
    value: 90,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBarLinear>;

export const Playground: Story = {
  render: args => {
    return (
      <ProgressBarLinear {...args}>
        <ProgressBarLabel label="Upload progress" />
        <ProgressBarValue value={`${args.value}%`} />
      </ProgressBarLinear>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <div>
          <BodyText marginBottom="100">Type: default</BodyText>
          <ProgressBarLinear type="default" value={90}>
            <ProgressBarLabel label="Upload progress" />
            <ProgressBarValue value="90%" />
          </ProgressBarLinear>
        </div>

        <div>
          <BodyText marginBottom="100">Type: success</BodyText>
          <ProgressBarLinear type="success" value={100}>
            <ProgressBarLabel label="Completed tasks" />
            <ProgressBarValue value="100%" />
          </ProgressBarLinear>
        </div>

        <div>
          <BodyText marginBottom="100">Type: danger</BodyText>
          <ProgressBarLinear type="danger" value={10}>
            <ProgressBarLabel label="Storage usage" />
            <ProgressBarValue value="10%" />
          </ProgressBarLinear>
        </div>
      </Flex>
    );
  },
};

export const OptionalContent: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <div>
          <BodyText marginBottom="100">With label and value</BodyText>
          <ProgressBarLinear type="default" value={75}>
            <ProgressBarLabel label="Processing files" />
            <ProgressBarValue value="75%" />
          </ProgressBarLinear>
        </div>

        <div>
          <BodyText marginBottom="100">With label only</BodyText>
          <ProgressBarLinear type="default" value={50}>
            <ProgressBarLabel label="Loading resources" />
          </ProgressBarLinear>
        </div>

        <div>
          <BodyText marginBottom="100">With value only</BodyText>
          <ProgressBarLinear type="default" value={25}>
            <ProgressBarValue value="25%" />
          </ProgressBarLinear>
        </div>

        <div>
          <BodyText marginBottom="100">With custom string value</BodyText>
          <ProgressBarLinear type="default" value={87}>
            <ProgressBarLabel label="Storage usage" />
            <ProgressBarValue value="8.7GB / 10GB" />
          </ProgressBarLinear>
        </div>

        <div>
          <BodyText marginBottom="100">No label or value</BodyText>
          <ProgressBarLinear type="default" value={60} />
        </div>
      </Flex>
    );
  },
};
