/* eslint-disable @typescript-eslint/no-empty-object-type */
import { breakpoints } from '../core/breakpoints';
import { themes } from '../core/themes';

export type AppBreakpoints = typeof breakpoints;

export type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
