import { Meta, StoryObj } from '@storybook/react-vite';
import { InlineLink } from '.';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { List } from '../List';

const meta = {
  title: 'Stories / InlineLink',
  component: InlineLink,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
      description: 'The text of the link.',
    },
    href: {
      type: 'string',
      control: 'text',
      description: 'The URL the link will navigate to.',
    },
    target: {
      options: ['_blank', '_self', '_parent', '_top'],
      control: 'select',
      description: 'The target of the link.',
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the link.',
    },
    inverted: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the link to be inverted. (To only be used on `purple` backgrounds)',
    },
  },
  args: {
    children: 'embedded link',
    href: 'https://www.uw.co.uk',
    target: '_blank',
    disabled: false,
    inverted: false,
  },
} satisfies Meta<typeof InlineLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: ({ children }) => {
    return (
      <Flex direction="column" spacing="sm">
        <List></List>
        <BodyText>
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
        <BodyText weight="semibold">
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
        <BodyText size="lg">
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
        <BodyText size="lg" weight="semibold">
          This is the body text style, and it contains an{' '}
          <InlineLink href="https://www.uw.co.uk" target="_blank">
            {children}
          </InlineLink>{' '}
          within this text. This works on white backgrounds
        </BodyText>
      </Flex>
    );
  },
};
