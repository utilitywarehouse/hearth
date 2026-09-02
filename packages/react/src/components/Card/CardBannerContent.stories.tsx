import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link/Link';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { Card } from './Card';
import { CardBannerContent } from './CardBannerContent';
import { ChevronRightSmallIcon, CloseSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof CardBannerContent> = {
  title: 'Components / Card / CardBannerContent',
  component: CardBannerContent,
  argTypes: {
    heading: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
  },
  args: {
    heading: 'This is a banner heading',
    description: 'Put your description here',
  },
};

export default meta;
type Story = StoryObj<typeof CardBannerContent>;

export const Playground: Story = {
  render: args => (
    <Card spacing="lg" justifyContent="between">
      <CardBannerContent {...args}>
        <Link href="#">
          Link
          <ChevronRightSmallIcon />
        </Link>
      </CardBannerContent>
      <UnstyledIconButton label="close">
        <CloseSmallIcon />
      </UnstyledIconButton>
    </Card>
  ),
};
