'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { ModalRootProps } from './Modal.props';

export const ModalRoot = (props: ModalRootProps) => <DialogPrimitive.Root {...props} modal />;

ModalRoot.displayName = 'ModalRoot';
