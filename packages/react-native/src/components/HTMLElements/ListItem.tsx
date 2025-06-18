import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { BodyText } from '../BodyText';

export interface ListItemProps extends ViewProps {
  children: React.ReactNode;
}

const ListItem = ({ children, style, ...rest }: ListItemProps) => {
  return (
    <View style={[styles.item, style]} {...rest}>
      {typeof children === 'string' ? <BodyText>{children}</BodyText> : children}
    </View>
  );
};

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default ListItem;
