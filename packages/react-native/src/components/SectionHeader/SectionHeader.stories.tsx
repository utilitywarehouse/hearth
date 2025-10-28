import { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';
import { Link } from '../Link';
import SectionHeader from './SectionHeader';

const meta = {
  title: 'Stories / SectionHeader',
  component: SectionHeader,
  argTypes: {
    heading: {
      control: 'text',
      description: 'The heading text to be displayed.',
    },
    helperText: {
      control: 'text',
      description: 'The heading supporting text to be displayed.',
    },
  },
  args: {
    heading: 'This is the section heading',
    helperText: 'Helper text',
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    return <SectionHeader heading="This is the section heading" helperText="Helper text" />;
  },
};

export const KitchenSink: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    return (
      <Flex space="xl" direction="column" style={{ width: '100%' }}>
        <VariantTitle title="Default SectionHeader with helper text and link">
          <SectionHeader
            heading="Heading"
            helperText="Helper text"
            trailingContent={<Link>See more</Link>}
          />
        </VariantTitle>
        <VariantTitle title="SectionHeader with icon on the left of the link ">
          <SectionHeader
            heading="Heading"
            helperText="Helper text"
            trailingContent={
              <Link icon={SettingsMediumIcon} iconPosition="left">
                Settings
              </Link>
            }
          />
        </VariantTitle>
        <VariantTitle title="SectionHeader with no icon">
          <SectionHeader
            heading="Heading"
            helperText="Helper text"
            trailingContent={<Link showIcon={false}>Call to action</Link>}
          />
        </VariantTitle>
        <VariantTitle title="SectionHeader with badge">
          <SectionHeader
            heading="Heading"
            helperText="Helper text"
            badge={{ text: "I'm a badged" }}
          />
        </VariantTitle>
        <VariantTitle title="SectionHeader with badge and link">
          <SectionHeader
            heading="Heading"
            helperText="Helper text"
            trailingContent={<Link>Show more</Link>}
            badge={{ text: 'New' }}
          />
        </VariantTitle>
      </Flex>
    );
  },
};
