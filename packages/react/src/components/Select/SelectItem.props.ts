import { Select as RadixSelect } from 'radix-ui';

export type SelectItemProps = Omit<RadixSelect.SelectItemProps, 'textValue' | 'asChild'> & {};
