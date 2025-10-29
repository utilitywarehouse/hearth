import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import type ContainerProps from './Container.props';

const Container = ({
  style,
  children,
  space = 'md',

  ...props
}: ContainerProps) => {
  const { computedStyles, remainingProps } = useStyleProps(props);

  styles.useVariants({ space });
  return (
    <View style={[styles.container(computedStyles), style]} {...remainingProps}>
      {children}
    </View>
  );
};

Container.displayName = 'Container';

const styles = StyleSheet.create(theme => ({
  container: extra => ({
    paddingTop:
      typeof extra.padding === 'undefined' && typeof extra.paddingVertical === 'undefined'
        ? {
            base: theme.layout.mobile.container.paddingTop,
            md: theme.layout.tablet.container.paddingTop,
            lg: theme.layout.desktop.container.paddingTop,
          }
        : undefined,
    paddingBottom:
      typeof extra.padding === 'undefined' && typeof extra.paddingVertical === 'undefined'
        ? {
            base: theme.layout.mobile.container.paddingBottom,
            md: theme.layout.tablet.container.paddingBottom,
            lg: theme.layout.desktop.container.paddingBottom,
          }
        : undefined,
    marginHorizontal:
      typeof extra.margin === 'undefined' && typeof extra.marginHorizontal === 'undefined'
        ? {
            base: theme.layout.mobile.container.margin,
            md: theme.layout.tablet.container.margin,
            lg: theme.layout.desktop.container.margin,
          }
        : undefined,
    ...extra,
    variants: {
      space: theme.globalStyle.variants.space,
    },
  }),
}));

export default Container;
