// https://stackoverflow.com/questions/33076177/getting-name-initials-using-js
export function getInitials(name?: string) {
  if (!name) return undefined;
  const regex = new RegExp(/(\p{L}{1})\p{L}+/gu);
  const names = [...name.matchAll(regex)];
  const initials = (names.shift()?.[1] || '') + (names.pop()?.[1] || '');
  return initials;
}
