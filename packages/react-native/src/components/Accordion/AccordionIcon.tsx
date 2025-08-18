import { Icon, IconProps } from '../../components/Icon';
import { useTheme } from '../../hooks';

const AccordionIcon = ({ as, ...props }: IconProps) => {
  const { color } = useTheme();
  return <Icon as={as} color={color.icon.primary} {...props} />;
};

AccordionIcon.displayName = 'AccordionIcon';

export default AccordionIcon;
