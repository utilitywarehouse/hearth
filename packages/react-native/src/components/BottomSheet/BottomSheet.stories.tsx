import React, { useCallback, useRef } from 'react';
import { BottomSheet } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Button } from '../Button';
import { BodyText } from '../BodyText';
import { Dimensions, Platform, View } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const meta = {
  title: 'Stories / BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backdrop: {
      control: 'boolean',
      description: 'Whether to show a backdrop overlay when the sheet is open',
    },
    showHandle: {
      control: 'boolean',
      description: 'Whether to show the handle at the top of the sheet',
    },
    enablePanDownToClose: {
      control: 'boolean',
      description: 'Whether to allow swiping down to close the sheet',
    },
    snapPoints: {
      control: 'object',
      description: 'An array of snap points for the bottom sheet',
    },
  },
  args: {
    backdrop: true,
    showHandle: true,
    enablePanDownToClose: true,
    // snapPoints: ['25%', '50%', '75%'],
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const ViewWrap = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      width: Platform.OS === 'web' ? '100%' : Dimensions.get('window').width,
      height:
        Platform.OS === 'web'
          ? '100%'
          : Dimensions.get('window').height -
            UnistylesRuntime.insets.top -
            UnistylesRuntime.insets.bottom -
            33,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flex: 1,
      marginVertical: Platform.OS === 'web' ? 0 : -8,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    }}
  >
    {children}
  </View>
);

export const Playground: Story = {
  render: args => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const handleOpenPress = useCallback(() => {
      bottomSheetRef.current?.expand();
    }, []);

    return (
      <ViewWrap>
        <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

        <BottomSheet ref={bottomSheetRef} {...args}>
          <Box gap="200">
            <BodyText>This is a bottom sheet with content.</BodyText>
            <BodyText>You can swipe it up and down to close.</BodyText>
            <Button onPress={() => bottomSheetRef.current?.close()}>Close Bottom Sheet</Button>
          </Box>
        </BottomSheet>
      </ViewWrap>
    );
  },
};

// export const WithSnapPoints: Story = {
//   render: () => {
//     const bottomSheetRef = useRef(null);
//     const handleOpenPress = useCallback(() => {
//       bottomSheetRef.current?.expand();
//     }, []);

//     return (
//       <View style={{ width: '100%', height: '100%', paddingTop: 50 }}>
//         <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

//         <BottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%', '75%']}>
//           <Box gap="200">
//             <BodyText>This bottom sheet has multiple snap points.</BodyText>
//             <BodyText>Try swiping to see 25%, 50% and 75% heights.</BodyText>
//             <Button onPress={() => bottomSheetRef.current?.close()}>Close Bottom Sheet</Button>
//           </Box>
//         </BottomSheet>
//       </View>
//     );
//   },
// };

// export const DynamicHeight: Story = {
//   render: () => {
//     const bottomSheetRef = useRef(null);
//     const handleOpenPress = useCallback(() => {
//       bottomSheetRef.current?.expand();
//     }, []);

//     return (
//       <View style={{ width: '100%', height: '100%', paddingTop: 50 }}>
//         <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

//         <BottomSheet ref={bottomSheetRef} snapPoints={['CONTENT_HEIGHT']}>
//           <Box gap="200" padding="100">
//             <BodyText>This bottom sheet will resize based on its content height.</BodyText>
//             <Button onPress={() => bottomSheetRef.current?.close()}>Close Bottom Sheet</Button>
//           </Box>
//         </BottomSheet>
//       </View>
//     );
//   },
// };

// export const WithoutHandle: Story = {
//   render: () => {
//     const bottomSheetRef = useRef(null);
//     const handleOpenPress = useCallback(() => {
//       bottomSheetRef.current?.expand();
//     }, []);

//     return (
//       <View style={{ width: '100%', height: '100%', paddingTop: 50 }}>
//         <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

//         <BottomSheet ref={bottomSheetRef} showHandle={false} snapPoints={['25%', '50%']}>
//           <Box gap="200">
//             <BodyText>This bottom sheet doesn't show the handle at the top.</BodyText>
//             <Button onPress={() => bottomSheetRef.current?.close()}>Close Bottom Sheet</Button>
//           </Box>
//         </BottomSheet>
//       </View>
//     );
//   },
// };

// export const WithoutBackdrop: Story = {
//   render: () => {
//     const bottomSheetRef = useRef(null);
//     const handleOpenPress = useCallback(() => {
//       bottomSheetRef.current?.expand();
//     }, []);

//     return (
//       <View style={{ width: '100%', height: '100%', paddingTop: 50 }}>
//         <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

//         <BottomSheet ref={bottomSheetRef} backdrop={false} snapPoints={['25%', '50%']}>
//           <Box gap="200">
//             <BodyText>This bottom sheet doesn't show a backdrop overlay.</BodyText>
//             <Button onPress={() => bottomSheetRef.current?.close()}>Close Bottom Sheet</Button>
//           </Box>
//         </BottomSheet>
//       </View>
//     );
//   },
// };

// export const ComplexContent: Story = {
//   render: () => {
//     const bottomSheetRef = useRef(null);
//     const handleOpenPress = useCallback(() => {
//       bottomSheetRef.current?.expand();
//     }, []);

//     return (
//       <View style={{ width: '100%', height: '100%', paddingTop: 50 }}>
//         <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

//         <BottomSheet ref={bottomSheetRef} snapPoints={['50%', '90%']}>
//           <Box gap="200">
//             <BodyText weight="semiBold" size="lg">
//               Bottom Sheet with Complex Content
//             </BodyText>
//             <Divider />
//             <BodyText>This is a more complex bottom sheet with various content sections.</BodyText>

//             <Box gap="100">
//               <BodyText weight="semiBold">Features:</BodyText>
//               <BodyText>• Multiple snap points</BodyText>
//               <BodyText>• Custom styling</BodyText>
//               <BodyText>• Complex layout</BodyText>
//               <BodyText>• Custom handle and backdrop</BodyText>
//             </Box>

//             <Divider />

//             <Box flexDirection="row" justifyContent="space-between">
//               <Button variant="outline" onPress={() => bottomSheetRef.current?.close()}>
//                 Cancel
//               </Button>
//               <Button onPress={() => bottomSheetRef.current?.close()}>Confirm</Button>
//             </Box>
//           </Box>
//         </BottomSheet>
//       </View>
//     );
//   },
// };
