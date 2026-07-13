export const normalizeValue = (value?: string | number) => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  return `${value}`;
};

export const getDecimalPlaces = (value?: number | string) => {
  if (value === undefined || value === null || value === '') {
    return 0;
  }

  const normalizedValue = `${value}`;
  const decimalPart = normalizedValue.split('.')[1];

  return decimalPart ? decimalPart.length : 0;
};

export const formatNumber = (value: number, precision: number) => {
  if (precision <= 0) {
    return `${Math.trunc(value)}`;
  }

  return value
    .toFixed(precision)
    .replace(/\.0+$/, '')
    .replace(/(\.\d*?)0+$/, '$1');
};

export const sanitizeValue = (value: string, allowNegative: boolean, allowDecimal: boolean) => {
  const strippedValue = value.replace(
    allowDecimal ? /[^\d,.-]/g : allowNegative ? /[^\d-]/g : /\D/g,
    ''
  );
  const normalizedValue = allowDecimal ? strippedValue.replace(/,/g, '.') : strippedValue;

  if (!allowNegative) {
    const unsignedValue = normalizedValue.replace(/-/g, '');

    if (!allowDecimal) {
      return unsignedValue;
    }

    const [integerPart = '', ...decimalParts] = unsignedValue.split('.');
    const decimalPart = decimalParts.join('');

    return decimalParts.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
  }

  const hasLeadingMinus = normalizedValue.startsWith('-');
  const unsignedValue = normalizedValue.replace(/-/g, '');

  if (!allowDecimal) {
    return `${hasLeadingMinus ? '-' : ''}${unsignedValue}`;
  }

  const [integerPart = '', ...decimalParts] = unsignedValue.split('.');
  const decimalPart = decimalParts.join('');
  const composedValue = decimalParts.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;

  return `${hasLeadingMinus ? '-' : ''}${composedValue}`;
};

export const parseValue = (value: string) => {
  if (!value || value === '-' || value === '.' || value === '-.') {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};

export const clampValue = (value: number, min?: number, max?: number) => {
  let nextValue = value;

  if (typeof min === 'number') {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === 'number') {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
};
