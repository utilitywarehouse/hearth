import { SectionHeader } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { VariantTitle } from '../../../docs/components';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / SectionHeader',
  component: SectionHeader,
  argTypes: {
    heading: {
      control: 'text',
      description:
        'The heading text to be displayed.',
    },
    helperText: {
      control: 'text',
      description:
        'The heading supporting text to be displayed.',
    },
    linkText: {
      control: 'text',
      description:
        'Link text to display',
    },
  },
  args: {
    heading: 'This is the section heading',
    helperText: 'Supporting text',
    linkText: 'See more',
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    return (
      <SectionHeader heading="This is the section heading" helperText="Supporting text" linkText='See more'/>
    );
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
          <SectionHeader heading="Heading" helperText="Supporting text" linkText="See more"/>
        </VariantTitle>
        <VariantTitle title="SectionHeader with icon on the left of the link ">
          <SectionHeader heading="Heading" helperText="Supporting text" linkText="Settings" linkIcon={SettingsMediumIcon} linkIconPosition='left'/>
        </VariantTitle>
        <VariantTitle title="SectionHeader with no icon">
          <SectionHeader heading="Heading" helperText="Supporting text" linkText="Call to action" linkShowIcon={false}/>
        </VariantTitle>
      </Flex>
    );
  },
};
