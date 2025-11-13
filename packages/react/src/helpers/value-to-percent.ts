// Helper to convert value to percent
export function valueToPercent(value: number, min: number, max: number): number {
  if (max === min) return 0;
  const percent = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, percent));
}
