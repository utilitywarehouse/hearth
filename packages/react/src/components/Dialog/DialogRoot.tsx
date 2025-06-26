import * as React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';

const componentName = 'DialogRoot';

export const DialogRoot: React.FC<RadixDialog.DialogProps> = props => (
  <RadixDialog.Root {...props} />
);

DialogRoot.displayName = componentName;
