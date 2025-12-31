// Helper to convert value to percent as a whole number
export function valueToPercent(value: number, min: number, max: number): number {
  if (max === min) return 0;

  // Calculate raw percentage
  const rawPercent = ((value - min) / (max - min)) * 100;

  // Floor the value for standard progress
  let percent = Math.floor(rawPercent);

  // If progress has started but is < 1%, show 1% (Good for UX)
  if (rawPercent > 0 && percent < 1) {
    percent = 1;
  }

  // Final clamp to ensure we stay in 0-100 range
  return Math.max(0, Math.min(100, percent));
}
