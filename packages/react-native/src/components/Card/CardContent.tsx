import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useCardContext } from './Card.context';

const CardContent = ({ children, style, ...props }: ViewProps) => {
  const { noPadding, spacing } = useCardContext();
  styles.useVariants({
    noPadding,
    spacing,
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
      spacing: theme.globalStyle.variants.spacing,
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
