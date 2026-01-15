import { StyleSheet, View, ViewProps } from 'react-native';
import { ColorValue } from '../../types';
import { BodyText } from '../BodyText';

export interface ListStyleProps {
  listStyleImage?: React.ReactElement;
  listStyleIcon?: React.ComponentType<any>;
  listStyleWidth?: number;
  listStyleHeight?: number;
  listStyleColour?: ColorValue;
}

export interface ListItemProps extends ViewProps, ListStyleProps {
  children: ViewProps['children'];
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
    flexShrink: 1,
  },
});

export default ListItem;
