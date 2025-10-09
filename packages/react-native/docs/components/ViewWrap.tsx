import { Dimensions, Platform, View, ViewProps } from 'react-native';
import { UnistylesRuntime } from '../../src/core';

const ViewWrap = ({ children }: { children: ViewProps['children'] }) => (
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

export default ViewWrap;
