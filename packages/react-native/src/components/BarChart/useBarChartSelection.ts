import { useState } from 'react';
import { getActiveIndex } from './BarChart.utils';

interface UseBarChartSelectionOptions {
  selectedIndex?: number | null;
  defaultSelectedIndex?: number | null;
  length: number;
  /** Identifies the dataset; a change drops the uncontrolled selection back to its default. */
  dataKey: string;
}

/**
 * Tracks the selected bar for both controlled (`selectedIndex`) and uncontrolled use. `select`
 * only updates internal state when uncontrolled; the caller reports the change either way.
 */
export const useBarChartSelection = ({
  selectedIndex,
  defaultSelectedIndex,
  length,
  dataKey,
}: UseBarChartSelectionOptions) => {
  const [internalSelected, setInternalSelected] = useState(defaultSelectedIndex);
  const [selectedDataKey, setSelectedDataKey] = useState(dataKey);
  if (selectedDataKey !== dataKey) {
    // A new dataset starts from the default selection, not the previous dataset's pick.
    setSelectedDataKey(dataKey);
    setInternalSelected(defaultSelectedIndex);
  }
  const isControlled = selectedIndex !== undefined;
  const activeIndex = getActiveIndex({ selectedIndex, internalSelected, length });

  const select = (index: number) => {
    if (!isControlled) {
      setInternalSelected(index);
    }
  };

  return { activeIndex, select };
};
