import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import FlexProps from './Flex.props';

const Flex = ({
  style,
  children,
  direction = 'column',
  align = 'flex-start',
  justify = 'flex-start',
  wrap = 'nowrap',
  spacing = 'md',
  space,
  ...rest
}: FlexProps) => {
  const propStyle: ViewStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
  };

  styles.useVariants({ spacing: space ?? spacing });

  return (
    <View style={[propStyle, styles.flex, style]} {...rest}>
      {children}
    </View>
  );
};

Flex.displayName = 'Flex';

const styles = StyleSheet.create(theme => ({
  flex: {
    display: 'flex',
    variants: {
      spacing: theme.globalStyle.variants.spacing,
    },
  },
}));

export default Flex;
