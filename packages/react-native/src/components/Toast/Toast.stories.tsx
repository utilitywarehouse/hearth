import type { Meta, StoryObj } from '@storybook/react-native';
import {
  InfoSmallIcon,
  TickSmallIcon,
  TrashSmallIcon,
  WarningSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import React from 'react';
import { Platform, View } from 'react-native';
import { Button } from '../Button';
import { ToastProvider, useToast } from './';

const meta: Meta = {
  title: 'Stories / Toast',
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof meta>;

const ViewWrap = ({ children }: { children: React.ReactNode }) => (
  <View
    style={
      Platform.OS === 'web'
        ? { width: 400, height: 400, position: 'relative', overflow: 'visible' }
        : { flex: 1 }
    }
  >
    <ToastProvider>{children}</ToastProvider>
  </View>
);

export const Playground: Story = {
  render: () => {
    return (
      <ViewWrap>
        <PlaygroundDemo />
      </ViewWrap>
    );
  },
};

const PlaygroundDemo = () => {
  const { addToast } = useToast();

  const showBasic = () => {
    addToast({ text: 'This is a simple toast message' });
  };

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button onPress={showBasic}>Show Toast</Button>
    </View>
  );
};

const BasicToastDemo = () => {
  const { addToast } = useToast();

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button onPress={() => addToast({ text: 'Settings saved successfully' })}>
        Show Basic Toast
      </Button>
    </View>
  );
};

export const BasicToast: Story = {
  render: () => (
    <ViewWrap>
      <BasicToastDemo />
    </ViewWrap>
  ),
};

const LongToastDemo = () => {
  const { addToast } = useToast();

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button
        onPress={() =>
          addToast({
            text: "Couldn't update top-up. Please check your connection and try again.",
            icon: WarningSmallIcon,
            actionText: 'Retry',
            onPress: () => console.log('Retry clicked'),
          })
        }
      >
        Show Long Toast
      </Button>
    </View>
  );
};

export const LongToastMessage = {
  render: () => (
    <ViewWrap>
      <LongToastDemo />
    </ViewWrap>
  ),
};

const WithIconDemo = () => {
  const { addToast } = useToast();

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button
        onPress={() =>
          addToast({
            text: 'Changes saved',
            icon: TickSmallIcon,
          })
        }
      >
        Show Success Toast
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Important information',
            icon: InfoSmallIcon,
          })
        }
      >
        Show Info Toast
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Please review your input',
            icon: WarningSmallIcon,
          })
        }
      >
        Show Warning Toast
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Item deleted',
            icon: TrashSmallIcon,
          })
        }
      >
        Show Destructive Toast
      </Button>
    </View>
  );
};

export const WithIcon: Story = {
  render: () => (
    <ViewWrap>
      <WithIconDemo />
    </ViewWrap>
  ),
};

const WithActionDemo = () => {
  const { addToast } = useToast();

  return (
    <View style={{ gap: 12, padding: 16, flex: 1 }}>
      <Button
        onPress={() =>
          addToast({
            text: 'File uploaded successfully',
            actionText: 'View file',
            onPress: () => console.log('View clicked'),
          })
        }
      >
        Show Toast With Action
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Changes saved',
            icon: TickSmallIcon,
            actionText: 'Undo',
            onPress: () => console.log('Undo clicked'),
          })
        }
      >
        Show With Icon & Action
      </Button>
    </View>
  );
};

export const WithAction: Story = {
  render: () => (
    <ViewWrap>
      <WithActionDemo />
    </ViewWrap>
  ),
};

const CustomDurationDemo = () => {
  const { addToast } = useToast();

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button
        onPress={() =>
          addToast({
            text: 'Quick message (2 seconds)',
            duration: 2000,
          })
        }
      >
        2 Second Toast
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Default duration (6 seconds)',
          })
        }
      >
        Default Duration
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Long message (10 seconds)',
            duration: 10000,
          })
        }
      >
        10 Second Toast
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Persistent (no auto-dismiss)',
            duration: 0,
          })
        }
      >
        No Auto-Dismiss
      </Button>
    </View>
  );
};

export const CustomDuration: Story = {
  render: () => (
    <ViewWrap>
      <CustomDurationDemo />
    </ViewWrap>
  ),
};

const StackedToastsDemo = () => {
  const { addToast } = useToast();

  const showMultiple = () => {
    addToast({ text: 'First toast', icon: TickSmallIcon });
    setTimeout(() => {
      addToast({ text: 'Second toast', icon: InfoSmallIcon });
    }, 500);
    setTimeout(() => {
      addToast({ text: 'Third toast', icon: TickSmallIcon });
    }, 1000);
  };

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button onPress={showMultiple}>Show Multiple Toasts</Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Another toast message',
          })
        }
      >
        Add Another
      </Button>
    </View>
  );
};

export const StackedToasts: Story = {
  render: () => (
    <ViewWrap>
      <StackedToastsDemo />
    </ViewWrap>
  ),
};

const ProgrammaticDismissDemo = () => {
  const { addToast, removeToast } = useToast();
  const [lastId, setLastId] = React.useState<string | null>(null);

  const showToast = () => {
    const id = addToast({
      text: 'This toast can be dismissed programmatically',
      duration: 0, // Don't auto-dismiss
    });
    setLastId(id);
  };

  const dismissLast = () => {
    if (lastId) {
      removeToast(lastId);
      setLastId(null);
    }
  };

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button onPress={showToast}>Show Persistent Toast</Button>
      <Button onPress={dismissLast} disabled={!lastId}>
        Dismiss Last Toast
      </Button>
    </View>
  );
};

export const ProgrammaticDismiss: Story = {
  render: () => (
    <ViewWrap>
      <ProgrammaticDismissDemo />
    </ViewWrap>
  ),
};

const DismissOptionsDemo = () => {
  const { addToast } = useToast();

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Button
        onPress={() =>
          addToast({
            text: 'Toast without dismiss button',
            showDismissIcon: false,
            duration: 3000,
          })
        }
      >
        Hide Dismiss Icon
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'Tap anywhere to dismiss',
            dismissOnPress: true,
            onPress: () => console.log('Toast pressed'),
            actionText: 'Action',
            duration: 0,
          })
        }
      >
        Dismiss On Press
      </Button>
      <Button
        onPress={() =>
          addToast({
            text: 'No dismiss button, press to dismiss',
            showDismissIcon: false,
            dismissOnPress: true,
            onPress: () => console.log('Toast pressed'),
            actionText: 'Action',
            duration: 0,
          })
        }
      >
        Both Options
      </Button>
    </View>
  );
};

export const DismissOptions: Story = {
  render: () => (
    <ViewWrap>
      <DismissOptionsDemo />
    </ViewWrap>
  ),
};
