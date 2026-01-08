import { BodyText, BodyTextProps } from '../../BodyText';

const ListItemHeading = ({ children, ...props }: BodyTextProps) => {
  return (
    <BodyText size="lg" {...props}>
      {children}
    </BodyText>
  );
};

ListItemHeading.displayName = 'ListItemHeading';

/**
 * @deprecated Use `ListItemHeading` instead.
 */
export const ListItemText = ListItemHeading;

ListItemText.displayName = 'ListItemText';

export default ListItemHeading;
