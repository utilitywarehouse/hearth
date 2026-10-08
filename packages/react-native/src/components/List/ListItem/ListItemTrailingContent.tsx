import { Children, isValidElement } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useListItemContext } from './ListItem.context';
import ListItemTrailingIcon from './ListItemTrailingIcon';

export interface ListItemTrailingContentProps extends ViewProps {
  /** Vertical alignment within the list item. Overrides `trailingContentAlignment` on `ListItem`.
   * @default 'flex-start', or 'center' when the content is a `ListItemTrailingIcon` */
  alignment?: ViewStyle['alignSelf'];
}

const ListItemTrailingContent = ({
  children,
  alignment,
  ...props
}: ListItemTrailingContentProps) => {
  const { trailingContentAlignment } = useListItemContext();

  // Trailing icons are centred; any other trailing content aligns to the top unless overridden.
  const isTrailingIcon = Children.toArray(children).some(
    child => isValidElement(child) && child.type === ListItemTrailingIcon
  );
  const resolvedAlignment =
    alignment ?? trailingContentAlignment ?? (isTrailingIcon ? 'center' : 'flex-start');

  return (
    <View {...props} style={[{ alignSelf: resolvedAlignment }, props.style]}>
      {children}
    </View>
  );
};

ListItemTrailingContent.displayName = 'ListItemTrailingContent';

export default ListItemTrailingContent;
