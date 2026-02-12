import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
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

  const { computedStyles, remainingProps } = useStyleProps(rest);

  styles.useVariants({ spacing: space ?? spacing });

  return (
    <View style={[propStyle, styles.flex, computedStyles, style]} {...remainingProps}>
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
