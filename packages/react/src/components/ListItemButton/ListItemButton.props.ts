import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { ListItemContentProps } from '../ListItemContent/ListItemContent.props';

export interface ListItemButtonProps extends ComponentPropsWithout<'button', RemovedProps> {
  heading: ListItemContentProps['heading'];
  helperText?: ListItemContentProps['helperText'];
  leadingContent?: ListItemContentProps['leadingContent'];
  trailingContent?: ListItemContentProps['trailingContent'];
  badge?: ListItemContentProps['badge'];
  badgePlacement?: ListItemContentProps['badgePlacement'];
}
