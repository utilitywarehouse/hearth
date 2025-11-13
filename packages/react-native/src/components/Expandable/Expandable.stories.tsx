import { Meta, StoryObj } from '@storybook/react-native';
import {
  ChevronDownMediumIcon,
  ChevronUpMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { View } from 'react-native';
import { BodyText, Button, Card } from '../../components';
import Expandable from './Expandable';

const meta = {
  title: 'Stories / Expandable',
  component: Expandable,
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the content is expanded',
    },
    duration: {
      control: { type: 'number', min: 100, max: 1000, step: 50 },
      description: 'Animation duration in milliseconds',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
  args: {
    expanded: false,
    duration: 300,
  },
} satisfies Meta<typeof Expandable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: typeof meta.args) => {
    const [expanded, setExpanded] = useState(args.expanded ?? false);

    return (
      <>
        <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
        <Expandable {...args} expanded={expanded}>
          <Card>
            <BodyText>
              This is expandable content. It animates smoothly when toggled. You can put any content
              here, and it will expand and collapse with animation.
            </BodyText>
          </Card>
        </Expandable>
      </>
    );
  },
};

export const BasicExample: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <>
        <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
          Toggle Content
        </Button>
        <Expandable expanded={expanded}>
          <Card>
            <BodyText>This content expands and collapses with a smooth animation.</BodyText>
          </Card>
        </Expandable>
      </>
    );
  },
};

export const FastAnimation: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <>
        <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
          Fast Toggle
        </Button>
        <Expandable expanded={expanded} duration={150}>
          <Card>
            <BodyText>This expands and collapses quickly with a 150ms duration.</BodyText>
          </Card>
        </Expandable>
      </>
    );
  },
};

export const SlowAnimation: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <>
        <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
          Slow Toggle
        </Button>
        <Expandable expanded={expanded} duration={600}>
          <Card>
            <BodyText>This expands and collapses slowly with a 600ms duration.</BodyText>
          </Card>
        </Expandable>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <>
        <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
          {expanded ? 'Hide Details' : 'Show Details'}
        </Button>
        <Expandable expanded={expanded}>
          <Card>
            <BodyText>
              This is a longer piece of content that demonstrates how the Expandable component
              handles larger amounts of text. The animation smoothly transitions regardless of
              content length.
            </BodyText>
            <BodyText style={{ marginTop: 12 }}>
              You can include multiple paragraphs, and the component will measure the full height
              and animate accordingly.
            </BodyText>
            <BodyText style={{ marginTop: 12 }}>
              The animation uses Reanimated for optimal performance and smooth transitions.
            </BodyText>
          </Card>
        </Expandable>
      </>
    );
  },
};

export const MultipleExpandables: Story = {
  render: () => {
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);

    return (
      <View style={{ width: 300, gap: 16 }}>
        <View>
          <Button
            onPress={() => setExpanded1(!expanded1)}
            style={{ marginBottom: 8 }}
            iconPosition="right"
            icon={expanded1 ? ChevronUpMediumIcon : ChevronDownMediumIcon}
          >
            Section 1
          </Button>
          <Expandable expanded={expanded1}>
            <Card>
              <BodyText>Content for section 1</BodyText>
            </Card>
          </Expandable>
        </View>

        <View>
          <Button
            onPress={() => setExpanded2(!expanded2)}
            style={{ marginBottom: 8 }}
            iconPosition="right"
            icon={expanded2 ? ChevronUpMediumIcon : ChevronDownMediumIcon}
          >
            Section 2
          </Button>
          <Expandable expanded={expanded2}>
            <Card>
              <BodyText>Content for section 2 with more detailed information.</BodyText>
            </Card>
          </Expandable>
        </View>

        <View>
          <Button
            onPress={() => setExpanded3(!expanded3)}
            style={{ marginBottom: 8 }}
            iconPosition="right"
            icon={expanded3 ? ChevronUpMediumIcon : ChevronDownMediumIcon}
          >
            Section 3
          </Button>
          <Expandable expanded={expanded3}>
            <Card>
              <BodyText>
                Content for section 3 with even more information that spans multiple lines.
              </BodyText>
            </Card>
          </Expandable>
        </View>
      </View>
    );
  },
};

export const ControlledExample: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={{ width: 300 }}>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          <Button onPress={() => setExpanded(true)} style={{ flex: 1 }}>
            Expand
          </Button>
          <Button onPress={() => setExpanded(false)} style={{ flex: 1 }}>
            Collapse
          </Button>
        </View>
        <Expandable
          expanded={expanded}
          onExpandedChange={setExpanded}
          accessibilityLabel="Expandable content section"
        >
          <Card>
            <BodyText>
              This is a controlled expandable with separate expand and collapse buttons.
            </BodyText>
          </Card>
        </Expandable>
      </View>
    );
  },
};

export const DefaultExpanded: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(true);

    return (
      <View style={{ width: 300 }}>
        <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
          Toggle
        </Button>
        <Expandable expanded={expanded}>
          <Card>
            <BodyText>This content starts expanded by default.</BodyText>
          </Card>
        </Expandable>
      </View>
    );
  },
};

export const WithCallback: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    const [message, setMessage] = useState('Content is collapsed');

    const handleExpandedChange = (newExpanded: boolean) => {
      console.log(newExpanded);
      setMessage(newExpanded ? 'Content is expanded' : 'Content is collapsed');
    };

    return (
      <View style={{ width: 300 }}>
        <BodyText style={{ marginBottom: 8 }}>{message}</BodyText>
        <Button onPress={() => setExpanded(!expanded)} style={{ marginBottom: 16 }}>
          Toggle
        </Button>
        <Expandable expanded={expanded} onExpandedChange={handleExpandedChange}>
          <Card>
            <BodyText>This example demonstrates the onExpandedChange callback.</BodyText>
          </Card>
        </Expandable>
      </View>
    );
  },
};
