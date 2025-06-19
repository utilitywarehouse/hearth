import { Icon, IconProps } from '../../components/Icon';
import { useTheme } from '../../hooks';

const AccordionIcon = ({ as, ...props }: IconProps) => {
  const { components } = useTheme();
  return <Icon as={as} color={components.icon.color} {...props} />;
};

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
