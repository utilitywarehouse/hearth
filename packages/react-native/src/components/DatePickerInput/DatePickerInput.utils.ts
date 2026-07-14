export const DEFAULT_FORMAT = 'DD/MM/YYYY';

export const maskDefaultFormat = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 8);
  const day = digitsOnly.slice(0, 2);
  const month = digitsOnly.slice(2, 4);
  const year = digitsOnly.slice(4, 8);

  return [day, month, year].filter(Boolean).join('/');
};
