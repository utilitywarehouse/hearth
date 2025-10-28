import { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptionList, DescriptionListItem } from '.';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta: Meta<typeof DescriptionList> = {
  title: 'Stories / DescriptionList',
  component: DescriptionList,
  parameters: { layout: 'centered' },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Orientation of heading & description pairs',
    },
    itemHeadingWidth: {
      control: 'number',
      description: 'Override width (px) for heading column when direction is row',
    },
    heading: {
      control: 'text',
      description:
        'Optional overall heading (renders a SectionHeader). Playground only – prefer SectionHeader directly when composing.',
    },
    helperText: {
      control: 'text',
      description: 'Supporting text shown under heading (Playground only).',
    },
  },
  args: {
    direction: 'column',
    heading: 'Account details',
    helperText: 'Static account metadata',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { heading: 'Account Number', description: '123456789' },
  { heading: 'Sort Code', description: '12-34-56' },
  { heading: 'Status', description: 'Active' },
];

export const Playground: Story = {
  render: args => (
    <DescriptionList {...args}>
      {sampleData.map(item => (
        <DescriptionListItem
          key={item.heading}
          heading={item.heading}
          description={item.description}
        />
      ))}
    </DescriptionList>
  ),
};

export const Row: Story = {
  args: { direction: 'row' },
  render: args => (
    <DescriptionList {...args}>
      {sampleData.map(item => (
        <DescriptionListItem
          key={item.heading}
          heading={item.heading}
          description={item.description}
        />
      ))}
    </DescriptionList>
  ),
};

export const Column: Story = {
  args: { direction: 'column' },
  render: args => (
    <DescriptionList {...args}>
      {sampleData.map(item => (
        <DescriptionListItem
          key={item.heading}
          heading={item.heading}
          description={item.description}
        />
      ))}
    </DescriptionList>
  ),
};

export const KitchenSink: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <Flex direction="column" space="lg" style={{ width: '100%' }}>
      <VariantTitle title="Row direction">
        <DescriptionList direction="row">
          {sampleData.map(item => (
            <DescriptionListItem
              key={item.heading}
              heading={item.heading}
              description={item.description}
            />
          ))}
        </DescriptionList>
      </VariantTitle>
      <VariantTitle title="Column direction">
        <DescriptionList direction="column">
          {sampleData.map(item => (
            <DescriptionListItem
              key={item.heading}
              heading={item.heading}
              description={item.description}
            />
          ))}
        </DescriptionList>
      </VariantTitle>
    </Flex>
  ),
};

export const WithLinks: Story = {
  parameters: { controls: { include: ['direction', 'itemHeadingWidth'] } },
  args: { direction: 'row' },
  render: args => (
    <DescriptionList {...args}>
      <DescriptionListItem
        heading="Account Number"
        description="123456789"
        linkText="Manage"
        linkHref="https://example.com/account"
        linkShowIcon
      />
      <DescriptionListItem
        heading="Status"
        description="Active"
        linkText="Change"
        linkHref="https://example.com/status"
      />
      <DescriptionListItem heading="Region" description="United Kingdom" />
    </DescriptionList>
  ),
};
