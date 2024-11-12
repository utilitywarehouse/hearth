import type { ComponentPropsWithoutRef } from 'react';

import { Responsive } from '../../types';

export interface BoxProps extends ComponentPropsWithoutRef<'div'> {
  padding?: Responsive<string>;
}
