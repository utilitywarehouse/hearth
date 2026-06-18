import type { Meta, StoryObj } from '@storybook/react-vite';
import { spaceTokens } from '../../tokens/space';
import { Container } from './Container';
import { Placeholder } from '../../../docs/storybook-components/Placeholder';

const meta: Meta<typeof Container> = {
  title: 'Layout / Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    align: { options: ['start', 'center', 'end'], control: { type: 'select' } },
    margin: { options: spaceTokens, control: { type: 'select' } },
    marginX: { options: spaceTokens, control: { type: 'select' } },
    marginY: { options: spaceTokens, control: { type: 'select' } },
    marginTop: { options: spaceTokens, control: { type: 'select' } },
    marginRight: { options: spaceTokens, control: { type: 'select' } },
    marginBottom: { options: spaceTokens, control: { type: 'select' } },
    marginLeft: { options: spaceTokens, control: { type: 'select' } },
    padding: { options: spaceTokens, control: { type: 'select' } },
    paddingX: { options: spaceTokens, control: { type: 'select' } },
    paddingY: { options: spaceTokens, control: { type: 'select' } },
    paddingTop: { options: spaceTokens, control: { type: 'select' } },
    paddingRight: { options: spaceTokens, control: { type: 'select' } },
    paddingBottom: { options: spaceTokens, control: { type: 'select' } },
    paddingLeft: { options: spaceTokens, control: { type: 'select' } },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof Container>;

export const Playground: Story = {
  render: args => (
    <Container {...args}>
      <Placeholder
        width="100%"
        height="84px"
        backgroundColor="secondary"
        borderColor="subtle"
        borderWidth="1"
      />
      <Placeholder
        width="100%"
        height="100px"
        backgroundColor="secondary"
        borderColor="subtle"
        borderWidth="1"
      />
      <Placeholder
        width="100%"
        height={{ mobile: '544px', desktop: '383px' }}
        backgroundColor="secondary"
        borderColor="subtle"
        borderWidth="1"
      />
    </Container>
  ),
  args: {
    spacing: 'xl',
  },
};

export const OverridePadding: Story = {
  render: args => (
    <Container {...args}>
      <Placeholder
        width="100%"
        height="84px"
        backgroundColor="secondary"
        borderColor="subtle"
        borderWidth="1"
      />
      <Placeholder
        width="100%"
        height="100px"
        backgroundColor="secondary"
        borderColor="subtle"
        borderWidth="1"
      />
      <Placeholder
        width="100%"
        height={{ mobile: '544px', desktop: '383px' }}
        backgroundColor="secondary"
        borderColor="subtle"
        borderWidth="1"
      />
    </Container>
  ),
  args: {
    paddingTop: '400',
    paddingBottom: '200',
    spacing: 'xl',
  },
};
