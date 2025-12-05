'use client';

import * as React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { ComponentPropsWithout } from '../../types/component-props';

export type ModalRootProps = ComponentPropsWithout<typeof RadixDialog.Root, 'modal'>;
export const ModalRoot: React.FC<ModalRootProps> = props => <RadixDialog.Root {...props} modal />;
ModalRoot.displayName = 'ModalRoot';
