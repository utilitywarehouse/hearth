import { ListItemContentProps } from './ListItemContent.props';

type ElementProps = React.ComponentPropsWithRef<'a'>;

export interface ListItemLinkProps
  extends ElementProps, Omit<ListItemContentProps, keyof ElementProps> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
}
