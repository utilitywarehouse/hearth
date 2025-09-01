const hexWithOpacity = (hex: string, opacity: number): string => {
  'worklet';
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Validate hex string format
  if (cleanHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error(`Invalid hex color format: ${hex}. Expected format: #RRGGBB or RRGGBB`);
  }

  // Convert hex to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default hexWithOpacity;
