import { ListItemContentProps } from './ListItemContent.props';

type ElementProps = React.ComponentPropsWithRef<'a'>;

export interface ListItemLinkProps
  extends ElementProps, Omit<ListItemContentProps, keyof ElementProps> {}
