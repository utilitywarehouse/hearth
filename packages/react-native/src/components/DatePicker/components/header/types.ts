import React from 'react';
import { ClassNames, NavigationPosition, Styles } from '../../types';

export type HeaderProps = {
  PrevIcon?: React.ReactNode;
  NextIcon?: React.ReactNode;
  navigationPosition?: NavigationPosition;
  styles?: Styles;
  classNames?: ClassNames;
};

export type NavigationProps = {
  styles?: Styles;
  classNames?: ClassNames;
};
