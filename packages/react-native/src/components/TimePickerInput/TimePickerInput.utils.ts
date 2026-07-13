export const DEFAULT_FORMAT_24 = 'HH:mm';
export const DEFAULT_FORMAT_12 = 'hh:mm A';

export const maskDefaultFormat = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
  const hours = digitsOnly.slice(0, 2);
  const minutes = digitsOnly.slice(2, 4);

  return [hours, minutes].filter(Boolean).join(':');
};
