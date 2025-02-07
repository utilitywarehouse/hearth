import type { ViewProps, ViewStyle, FlexAlignType } from 'react-native';

interface FlexProps extends ViewProps {
  direction?: 'row' | 'column';
  align?: FlexAlignType;
  justify?: ViewStyle['justifyContent'];
  wrap?: ViewStyle['flexWrap'];
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default FlexProps;
