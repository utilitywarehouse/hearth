import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const CardActions = ({ children, style, ...props }: PropsWithChildren<ViewProps>) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

CardActions.displayName = 'CardActions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CardActions;