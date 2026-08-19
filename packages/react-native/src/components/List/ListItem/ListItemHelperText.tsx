import { BodyText, BodyTextProps } from '../../BodyText';

const ListItemHelperText = ({ children, ...props }: BodyTextProps) => {
  return (
    <BodyText size="md" color="secondary" {...props}>
      {children}
    </BodyText>
  );
};

ListItemHelperText.displayName = 'ListItemHelperText';

export default ListItemHelperText;
