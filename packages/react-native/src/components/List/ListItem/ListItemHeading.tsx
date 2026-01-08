import { BodyText, BodyTextProps } from '../../BodyText';

const ListItemHeading = ({ children, ...props }: BodyTextProps) => {
  return (
    <BodyText size="lg" {...props}>
      {children}
    </BodyText>
  );
};

/**
 * @deprecated Use `ListItemHeading` instead.
 */
export const ListItemText = ListItemHeading;

ListItemHeading.displayName = 'ListItemHeading';
ListItemText.displayName = 'ListItemText';

export default ListItemHeading;
