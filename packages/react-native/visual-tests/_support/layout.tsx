import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { DetailText } from '../../src/components/DetailText';

type VTGridProps = {
  children: ReactNode;
};

/** Vertical stack of `VTRow`s. Keeps dense stories consistently spaced. */
export const VTGrid = ({ children }: VTGridProps) => {
  const { theme } = useUnistyles();
  return <View style={{ gap: theme.space[150] }}>{children}</View>;
};

type VTRowProps = {
  /** Short label (a few words) shown above the row. Keep it fixed text. */
  label: string;
  children: ReactNode;
};

/** A labelled row of items that wraps instead of overflowing the content box. */
export const VTRow = ({ label, children }: VTRowProps) => {
  const { theme } = useUnistyles();
  return (
    <View style={{ gap: theme.space[50] }}>
      <DetailText>{label}</DetailText>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: theme.space[100],
        }}
      >
        {children}
      </View>
    </View>
  );
};

type VTInvertedStripProps = {
  children: ReactNode;
};

/**
 * Brand-coloured strip for `inverted` states, so they sit in the same story as
 * the standard states instead of needing a separate export.
 */
export const VTInvertedStrip = ({ children }: VTInvertedStripProps) => {
  const { theme } = useUnistyles();
  return (
    <View
      style={{
        padding: theme.space[100],
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.color.background.brand,
      }}
    >
      {children}
    </View>
  );
};
