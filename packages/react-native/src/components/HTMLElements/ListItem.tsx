import { StyleSheet, View, ViewProps } from 'react-native';
import { ColorValue } from '../../types';
import { BodyText } from '../BodyText';

export interface ListStyleProps {
  /** Custom element (e.g. Image) to use as the bullet/marker. */
  listStyleImage?: React.ReactElement;
  /** Custom icon component to use as the bullet/marker. */
  listStyleIcon?: React.ComponentType<any>;
  /** Width of the custom bullet/marker. */
  listStyleWidth?: number;
  /** Height of the custom bullet/marker. */
  listStyleHeight?: number;
  /** Colour of the bullet/marker/number. */
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
