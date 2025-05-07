import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { BodyText } from '../BodyText';

export interface ListItemProps extends ViewProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children, style, ...rest }) => {
  return (
    <View style={[styles.item, style]} {...rest}>
      {typeof children === 'string' ? <BodyText>{children}</BodyText> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default ListItem;
