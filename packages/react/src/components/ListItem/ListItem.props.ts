import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ListItemProps = ComponentPropsWithout<'li', RemovedProps>;
