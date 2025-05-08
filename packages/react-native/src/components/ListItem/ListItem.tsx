import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BodyText } from '../BodyText';

export interface ListItemProps {
  children: React.ReactNode;
  // Add any other specific props for ListItem here
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <View style={styles.item}>
      <BodyText>{children}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start for multi-line text
    // Add any other default styling for ListItem here
  },
});

export { ListItem };
