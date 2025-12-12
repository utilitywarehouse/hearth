import { ListItemContentProps } from './ListItemContent.props';

type ElementProps = React.ComponentPropsWithRef<'button'>;
export interface ListItemButtonProps
  extends ElementProps,
    Omit<ListItemContentProps, keyof ElementProps> {}
