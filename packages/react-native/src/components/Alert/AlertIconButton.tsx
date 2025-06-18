import { ComponentType } from 'react';
import { ViewStyle } from 'react-native';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { UnstyledIconButton, UnstyledIconButtonProps } from '../UnstyledIconButton';

const AlertIconButton = ({
  style,
  icon = ChevronRightSmallIcon,
  ...props
}: Omit<UnstyledIconButtonProps, 'icon'> & { icon?: ComponentType }) => (
  <UnstyledIconButton {...props} size="sm" style={style as ViewStyle} icon={icon} />
);

AlertIconButton.displayName = 'AlertIconButton';

export default AlertIconButton;
