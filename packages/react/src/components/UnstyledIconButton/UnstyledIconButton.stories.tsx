import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { UnstyledIconButton } from './UnstyledIconButton';
import {
  AddMediumIcon,
  CloseMediumIcon,
  CloseSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';

const sizes = ['md', 'sm'] as const;

const meta: Meta<typeof UnstyledIconButton> = {
  title: 'Components / UnstyledIconButton',
  component: UnstyledIconButton,
  argTypes: {
    children: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    size: { control: { type: 'radio' }, options: sizes },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
  args: {
    label: 'close',
  },
} satisfies Meta<typeof UnstyledIconButton>;

export default meta;
type Story = StoryObj<typeof UnstyledIconButton>;

export const Playground: Story = {
  render: (args: UnstyledIconButtonProps) => (
    <Flex direction="column">
      <Box padding="200">
        <UnstyledIconButton {...args}>
          {args.size === 'sm' ? <CloseSmallIcon /> : <CloseMediumIcon />}
        </UnstyledIconButton>
      </Box>
      <Box padding="200" backgroundColor="brand">
        <UnstyledIconButton {...args} inverted>
          {args.size === 'sm' ? <CloseSmallIcon /> : <CloseMediumIcon />}
        </UnstyledIconButton>
      </Box>
    </Flex>
  ),
};

export const WithCard: Story = {
  render: () => (
    <Box width="365px">
      <Card>
        <Flex direction="column" gap="150">
          <Flex justifyContent="between" alignItems="center">
            <Heading>This is a dismissable card</Heading>
            <UnstyledIconButton label="close" size="md">
              <CloseMediumIcon />
            </UnstyledIconButton>
          </Flex>
          <BodyText size="md">
            An Unstyled Icon Button has been used as a trigger for the dismissible action.
          </BodyText>
        </Flex>
      </Card>
    </Box>
  ),
};

export const AsLink: Story = {
  render: (args: Pick<UnstyledIconButtonProps, 'size' | 'disabled' | 'label'>) => {
    return (
      <Flex gap="200">
        <UnstyledIconButton {...args} asChild>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
            <AddMediumIcon />
          </a>
        </UnstyledIconButton>
        <UnstyledIconButton {...args} asChild loading>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
            <AddMediumIcon />
          </a>
        </UnstyledIconButton>
      </Flex>
    );
  },
};
