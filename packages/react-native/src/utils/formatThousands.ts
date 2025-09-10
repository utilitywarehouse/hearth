const formatThousands = (value: string) => {
  if (!value) return value;
  // Remove existing commas first
  const cleaned = value.replace(/,/g, '');
  // Allow leading minus, digits, optional decimal part
  const match = cleaned.match(/^(-)?(\d*)(\.\d*)?$/);
  if (!match) return value; // If it doesn't match a numeric pattern, return original (lets user continue typing)
  const [, sign = '', intPart = '', decimalPart = ''] = match;
  if (!intPart) return sign + intPart + decimalPart; // nothing to format yet
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + withCommas + (decimalPart || '');
};

export default formatThousands;
