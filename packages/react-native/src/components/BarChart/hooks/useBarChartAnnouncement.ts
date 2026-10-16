import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

/**
 * Announces the selected bar to VoiceOver when the selection changes. Starts on the initial
 * selection so only later changes are announced.
 */
export const useBarChartAnnouncement = (
  activeIndex: number | null,
  description: string | undefined
) => {
  const previousActiveIndex = useRef(activeIndex);

  useEffect(() => {
    if (previousActiveIndex.current === activeIndex) {
      return;
    }
    previousActiveIndex.current = activeIndex;
    // Android announces the tooltip through its live region; iOS has no equivalent prop.
    if (Platform.OS === 'ios' && description) {
      AccessibilityInfo.announceForAccessibility(description);
    }
  }, [activeIndex, description]);
};
