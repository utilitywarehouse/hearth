import * as React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';

const componentName = 'ModalRoot';

export const ModalRoot: React.FC<RadixDialog.DialogProps> = props => (
  <RadixDialog.Root {...props} />
);

ModalRoot.displayName = componentName;
