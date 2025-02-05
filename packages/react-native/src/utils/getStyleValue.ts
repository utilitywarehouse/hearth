/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

const getStyleValue = (value: any, type: Record<string, any>) => {
  if (typeof value === 'string') {
    const key = value;
    return type[key] !== undefined ? type[key] : value;
  }
  return value;
};

export default getStyleValue;
