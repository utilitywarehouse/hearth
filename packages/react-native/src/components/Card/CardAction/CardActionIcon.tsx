import { ComponentType } from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon, IconProps } from '../../Icon';

const CardActionIcon = ({ children, ...props }: IconProps & { as?: ComponentType }) => {
  return (
    <Icon
      {...props}
      style={
        Platform.OS === 'web'
          ? // @ts-expect-error - style prop type issue
            { ...(styles.icon as StyleProp<ViewStyle>), ...props.style }
          : ([styles.icon as StyleProp<ViewStyle>, props.style] as any)
      }
    >
      {children}
    </Icon>
  );
};

CardActionIcon.displayName = 'CardActionIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.color.icon.primary,
    width: theme.components.icon.md.width,
    height: theme.components.icon.md.height,
  },
}));

export default CardActionIcon;
