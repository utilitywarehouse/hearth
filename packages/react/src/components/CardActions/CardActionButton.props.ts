import type { ComponentPropsWithRef } from 'react';
import { CardActionContentProps } from './CardActionContent.props';

export interface CardActionButtonProps
  extends
    ComponentPropsWithRef<'button'>,
    Omit<CardActionContentProps, keyof ComponentPropsWithRef<'button'>> {}
