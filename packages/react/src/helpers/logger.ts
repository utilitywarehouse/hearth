export const warn = (condition: boolean, message: string) => {
  if (process.env.NODE_ENV !== 'production' && condition) {
    console.warn(`[Hearth React Warning]: ${message}`);
  }
};
