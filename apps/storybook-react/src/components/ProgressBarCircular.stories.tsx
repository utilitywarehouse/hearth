import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressBarCircular,
  ProgressBarLabel,
  ProgressBarValue,
  Flex,
  BodyText,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof ProgressBarCircular> = {
  title: 'Stories / ProgressBarCircular',
  component: ProgressBarCircular,
  parameters: {
    docs: {
      description: {
        component:
          '`ProgressBarCircular` displays the progress of a task or process in a circular format, with support for different visual states and sizes.',
      },
    },
  },
  argTypes: {
    type: { control: { type: 'radio' }, options: ['default', 'success', 'danger'] },
    size: { control: { type: 'radio' }, options: ['sm', 'md'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    type: 'default',
    size: 'md',
    value: 90,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBarCircular>;

export const Playground: Story = {
  render: (args: Story['args']) => {
    return (
      <ProgressBarCircular {...args}>
        <ProgressBarValue value={`${args?.value ?? 90}%`} />
        <ProgressBarLabel label="Complete" />
      </ProgressBarCircular>
    );
  },
};

export const AllVariants: Story = {
  argTypes: {
    type: { table: { disable: true }, control: false },
    value: { table: { disable: true }, control: false },
  },
  render: (args) => {
    return (
      <Flex direction="column" gap="400">
        <BodyText marginBottom="100">Type: default</BodyText>
        <Flex gap="300">
          <ProgressBarCircular type="default" value={10} size={args.size}>
            <ProgressBarValue value="10%" />
            <ProgressBarLabel label="Complete" />
          </ProgressBarCircular>
          <ProgressBarCircular type="default" value={20} size={args.size}>
            <ProgressBarValue value="20%" />
            <ProgressBarLabel label="Complete" />
          </ProgressBarCircular>
        </Flex>

        <BodyText marginBottom="100">Type: success</BodyText>
        <ProgressBarCircular type="success" value={100} size={args.size}>
          <ProgressBarValue value="100%" />
          <ProgressBarLabel label="Complete" />
        </ProgressBarCircular>

        <BodyText marginBottom="100">Type: danger</BodyText>
        <Flex gap="300">
          <ProgressBarCircular type="danger" value={10} size={args.size}>
            <ProgressBarValue value="10%" />
            <ProgressBarLabel label="Complete" />
          </ProgressBarCircular>
          <ProgressBarCircular type="danger" value={20} size={args.size}>
            <ProgressBarValue value="20%" />
            <ProgressBarLabel label="Complete" />
          </ProgressBarCircular>
        </Flex>
      </Flex>
    );
  },
};

export const Sizes: Story = {
  argTypes: {
    type: { table: { disable: true }, control: false },
    value: { table: { disable: true }, control: false },
    size: { table: { disable: true }, control: false },
  },
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <div>
          <BodyText marginBottom="100">Size: md (default)</BodyText>
          <Flex gap="300" alignItems="center">
            <ProgressBarCircular size="md" value={90}>
              <ProgressBarValue value="90%" />
              <ProgressBarLabel label="Complete" />
            </ProgressBarCircular>
            <ProgressBarCircular size="md" value={100} type="success">
              <ProgressBarValue value="100%" />
              <ProgressBarLabel label="Complete" />
            </ProgressBarCircular>
            <ProgressBarCircular size="md" value={120} type="danger">
              <ProgressBarValue value="120%" />
              <ProgressBarLabel label="Overuse" />
            </ProgressBarCircular>
          </Flex>
        </div>

        <div>
          <BodyText marginBottom="100">Size: sm (shows only value)</BodyText>
          <Flex gap="300" alignItems="center">
            <ProgressBarCircular size="sm" value={10} type="default">
              <ProgressBarValue value="10%" />
              <ProgressBarLabel label="Complete" />
            </ProgressBarCircular>
            <ProgressBarCircular size="sm" value={20} type="danger">
              <ProgressBarValue value="20%" />
              <ProgressBarLabel label="Complete" />
            </ProgressBarCircular>
            <ProgressBarCircular size="sm" value={100} type="success">
              <ProgressBarValue value="100%" />
              <ProgressBarLabel label="Complete" />
            </ProgressBarCircular>
          </Flex>
        </div>
      </Flex>
    );
  },
};

export const OptionalContent: Story = {
  argTypes: {
    type: { table: { disable: true }, control: false },
    value: { table: { disable: true }, control: false },
  },
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <div>
          <BodyText marginBottom="100">With label and value</BodyText>
          <ProgressBarCircular value={75} size={args.size}>
            <ProgressBarValue value="75%" />
            <ProgressBarLabel label="Processing" />
          </ProgressBarCircular>
        </div>

        <div>
          <BodyText marginBottom="100">With value only</BodyText>
          <ProgressBarCircular value={50} size={args.size}>
            <ProgressBarValue value="50%" />
          </ProgressBarCircular>
        </div>

        <div>
          <BodyText marginBottom="100">With label only</BodyText>
          <ProgressBarCircular value={25} size={args.size}>
            <ProgressBarLabel label="Loading" />
          </ProgressBarCircular>
        </div>

        <div>
          <BodyText marginBottom="100">With custom string value</BodyText>
          <ProgressBarCircular value={87} size={args.size}>
            <ProgressBarValue value="8.7GB" />
            <ProgressBarLabel label="of 10GB" />
          </ProgressBarCircular>
        </div>

        <div>
          <BodyText marginBottom="100">No label or value</BodyText>
          <ProgressBarCircular value={60} size={args.size} />
        </div>
      </Flex>
    );
  },
};
