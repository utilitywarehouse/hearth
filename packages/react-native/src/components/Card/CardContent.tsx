import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useCardContext } from './Card.context';

const CardContent = ({ children, style, ...props }: ViewProps) => {
  const { noPadding, space } = useCardContext();
  styles.useVariants({
    noPadding,
    space,
  });
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

CardContent.displayName = 'CardContent';

const styles = StyleSheet.create(theme => ({
  container: {
    variants: {
      space: theme.globalStyle.variants.space,
      noPadding: {
        true: {
          padding: theme.components.card.mobile.paddingNone,
        },
        false: {
          padding: {
            base: theme.components.card.mobile.padding,
            md: theme.components.card.tablet.padding,
            lg: theme.components.card.desktop.padding,
          },
        },
      },
    },
  },
}));

export default CardContent;
