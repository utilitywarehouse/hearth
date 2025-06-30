import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { ListItemContentProps } from '../ListItemContent/ListItemContent.props';

export interface ListItemLinkProps extends ComponentPropsWithout<'a', RemovedProps | 'children'> {
  heading: ListItemContentProps['heading'];
  helperText?: ListItemContentProps['helperText'];
  leadingIcon?: ListItemContentProps['leadingIcon'];
  trailingIcon?: ListItemContentProps['leadingIcon'];
}
